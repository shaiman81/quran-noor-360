
import React, { useEffect, useState, useCallback } from 'react';
import { AlertTriangle, Compass, RotateCw, MapPin, Navigation, RefreshCw, LocateFixed } from 'lucide-react';
import { getQiblaDirection } from '../services/prayerService';

const QiblaCompass: React.FC = () => {
  const [heading, setHeading] = useState<number>(0);
  const [qibla, setQibla] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isIOS, setIsIOS] = useState(false);
  const [hasCompassPermission, setHasCompassPermission] = useState(false);

  // Detect iOS
  useEffect(() => {
    const isIOSDevice = [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    
    setIsIOS(isIOSDevice);
    
    // Check if sensors are even supported (Desktop check)
    if (!window.DeviceOrientationEvent) {
        setError("Location features require real device (Sensors missing)");
        setLocationStatus('error');
    } else if (!isIOSDevice) {
        // Auto-start for Android/Other
        startCompass(); 
    }
  }, []);

  const initLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Location features require real device");
      setLocationStatus('error');
      return;
    }

    setLocationStatus('loading');
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const qiblaDir = getQiblaDirection(latitude, longitude);
        setQibla(qiblaDir);
        setLocationStatus('success');
      },
      (err) => {
        // Parse error message
        let msg = err.message || "Location access denied.";
        if (err.code === 1) msg = "Location permission denied.";
        else if (err.code === 2) msg = "GPS unavailable.";
        else if (err.code === 3) msg = "Timeout.";
        
        // Check for preview/iframe policies
        if (msg.toLowerCase().includes("permissions policy") || msg.toLowerCase().includes("disabled")) {
            msg = "Location features require real device";
        }
        
        console.warn("Qibla Location Error:", msg);
        setError(msg);
        setLocationStatus('error');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }, []);

  // Handle Sensor Data
  const handleOrientation = useCallback((event: any) => {
    let compass = 0;
    
    if (event.webkitCompassHeading) {
        // iOS
        compass = event.webkitCompassHeading;
    } else if (event.alpha !== null) {
        // Android
        if (event.absolute === true || event.absolute === undefined) {
             compass = Math.abs(360 - event.alpha);
        } else {
             compass = Math.abs(360 - event.alpha); 
        }
    }
    
    setHeading(compass);
    setHasCompassPermission(true); // Data received successfully
  }, []);

  const startCompass = async () => {
      // iOS 13+ Permission
      if (isIOS && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
          try {
              const permission = await (DeviceOrientationEvent as any).requestPermission();
              if (permission === 'granted') {
                  setHasCompassPermission(true);
                  window.addEventListener('deviceorientation', handleOrientation, true);
              } else {
                  alert("Compass permission denied.");
              }
          } catch (e) {
              alert("Error requesting compass permission.");
          }
      } else {
          // Android / Older iOS
          try {
              const win = window as any;
              if ('ondeviceorientationabsolute' in win) {
                  win.addEventListener('deviceorientationabsolute', handleOrientation, true);
              } else {
                  window.addEventListener('deviceorientation', handleOrientation, true);
              }
              // We tentatively assume it works, but `handleOrientation` will confirm it by setting state
          } catch (e) {
              console.error("Compass start error", e);
          }
      }
  };

  useEffect(() => {
      // Only init location if sensors didn't already fail
      if (locationStatus !== 'error') {
        initLocation();
      }
      
      return () => {
          window.removeEventListener('deviceorientation', handleOrientation);
          const win = window as any;
          if ('ondeviceorientationabsolute' in win) {
              win.removeEventListener('deviceorientationabsolute', handleOrientation);
          }
      };
  }, [initLocation]);

  const compassRotation = -heading; 
  const isAligned = qibla !== null && Math.abs(heading - qibla) < 5;

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-gray-900 p-6 pb-32 flex flex-col items-center justify-start pt-12">
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold font-serif text-gray-800 dark:text-white flex items-center justify-center gap-2">
            <Compass className="text-emerald-600" size={32} /> Qibla Finder
        </h1>
        <p className="text-gray-500 text-sm mt-1">Calibrate by waving device in Figure-8</p>
      </div>

      {/* Permissions / Error State */}
      <div className="w-full max-w-xs space-y-3 mb-6">
          {locationStatus === 'error' && (
              <button 
                onClick={initLocation}
                className="w-full bg-red-100 text-red-700 border border-red-200 p-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm active:scale-95 transition"
              >
                  <MapPin size={18} /> {error?.includes("real device") ? "Check Device" : "Enable Location (GPS)"}
              </button>
          )}
          
          {/* Show button if no data received yet (permission not confirmed) */}
          {!hasCompassPermission && locationStatus !== 'error' && (
              <button 
                onClick={startCompass}
                className="w-full bg-blue-100 text-blue-700 border border-blue-200 p-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm active:scale-95 transition"
              >
                  <RotateCw size={18} /> Enable Compass Sensor
              </button>
          )}
      </div>

      {/* COMPASS VISUAL */}
      <div className="relative w-80 h-80 flex items-center justify-center mb-8">
        
        {/* Static Indicator (Phone Heading) */}
        <div className="absolute -top-12 z-20 flex flex-col items-center">
             <div className="w-1 h-8 bg-red-500 rounded-full shadow-glow"></div>
             <Navigation size={32} className="text-red-500 fill-current rotate-0 mt-1" />
        </div>

        {/* Rotating Dial */}
        <div 
            className={`
                w-full h-full rounded-full 
                border-[12px] ${isAligned ? 'border-emerald-500 shadow-[0_0_60px_rgba(16,185,129,0.5)]' : 'border-white dark:border-gray-700'} 
                bg-gray-100 dark:bg-gray-800 shadow-2xl 
                relative transition-transform duration-200 ease-out will-change-transform
            `}
            style={{ transform: `rotate(${compassRotation}deg)` }}
        >
            {/* Inner Ring */}
            <div className="absolute inset-4 rounded-full border border-gray-300 dark:border-gray-600"></div>

            {/* Directions (N, S, E, W) fixed to the dial */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 font-bold text-red-500 text-2xl">N</div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-bold text-gray-400 text-xl">S</div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-xl">E</div>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-xl">W</div>

            {/* Degree Ticks */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
                <div 
                    key={deg}
                    className="absolute top-0 left-1/2 w-0.5 h-full"
                    style={{ transform: `translateX(-50%) rotate(${deg}deg)` }}
                >
                    <div className="w-full h-3 bg-gray-300 dark:bg-gray-600"></div>
                </div>
            ))}

            {/* Qibla Pointer (If location found) */}
            {qibla !== null && (
                <div 
                    className="absolute top-1/2 left-1/2 w-full h-full"
                    style={{ transform: `translate(-50%, -50%) rotate(${qibla}deg)` }}
                >
                     {/* The Arrow pointing to Qibla Angle */}
                     <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                         <div className="w-12 h-12 bg-black rounded-lg border-2 border-gold-400 flex items-center justify-center shadow-lg relative z-10">
                            <div className="w-10 h-[1px] bg-gold-400/50 absolute top-3"></div>
                            <div className="w-[1px] h-10 bg-gold-400/50 absolute left-3"></div>
                         </div>
                         <div className="w-1 h-32 bg-gradient-to-b from-emerald-500 to-transparent rounded-full -mt-2"></div>
                     </div>
                </div>
            )}
        </div>

        {/* Center Pivot */}
        <div className="absolute w-20 h-20 bg-white dark:bg-gray-700 rounded-full shadow-inner border-4 border-gray-50 dark:border-gray-600 flex items-center justify-center z-30">
            {locationStatus === 'loading' ? (
                <RefreshCw className="animate-spin text-emerald-500" />
            ) : locationStatus === 'error' ? (
                <AlertTriangle className="text-red-500" />
            ) : (
                <LocateFixed className="text-emerald-600" />
            )}
        </div>
      </div>

      {/* Info Stats */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Heading</p>
              <p className="text-2xl font-mono text-gray-800 dark:text-white">{Math.round(heading)}°</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl shadow-sm text-center border border-emerald-100 dark:border-emerald-800/50">
              <p className="text-xs text-emerald-600 uppercase font-bold tracking-wider">Qibla</p>
              <p className="text-2xl font-mono text-emerald-700 dark:text-emerald-400">
                  {qibla ? `${Math.round(qibla)}°` : '--'}
              </p>
          </div>
      </div>

      {/* Location Status Text */}
      <div className="mt-6 text-center">
          {locationStatus === 'success' && (
              <p className="text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full inline-block">
                  GPS Active • High Accuracy
              </p>
          )}
          {locationStatus === 'error' && (
              <p className="text-xs text-red-500 bg-red-50 px-3 py-1 rounded-full inline-block">
                  {error || "Location Error"}
              </p>
          )}
      </div>

    </div>
  );
};

export default QiblaCompass;
