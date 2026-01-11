
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
    Moon, Sun, HandHeart, Calendar, 
    Compass, Star, Sparkles, Clock, ArrowRight, MapPin
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useContent } from '../context/ContentContext';
import { getPrayerTimes } from '../services/prayerService';

const Home: React.FC = () => {
  const { theme, setTheme } = useSettings();
  const { homeConfig, jummahConfig, featureFlags, prayerConfig } = useContent();
  const [greeting, setGreeting] = useState('');
  const [dateString, setDateString] = useState('');
  
  // Prayer Widget State
  const [nextPrayer, setNextPrayer] = useState<{name: string, time: Date, timeLeft: string} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const isFriday = new Date().getDay() === 5;

  const calculatePrayerTimes = useCallback((latitude: number, longitude: number) => {
        const times = getPrayerTimes(latitude, longitude, prayerConfig);
        
        const updateTimer = () => {
            const now = new Date();
            const list = [
                { name: 'Fajr', time: times.fajr },
                { name: 'Dhuhr', time: times.dhuhr },
                { name: 'Asr', time: times.asr },
                { name: 'Maghrib', time: times.maghrib },
                { name: 'Isha', time: times.isha },
            ];
            
            // Find next prayer
            let upcoming = list.find(p => p.time > now);
            // If none, next is Fajr tomorrow
            if (!upcoming) {
                upcoming = { name: 'Fajr', time: new Date(times.fajr.getTime() + 86400000) };
            }

            const diff = upcoming.time.getTime() - now.getTime();
            const h = Math.floor(diff / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            
            setNextPrayer({
                name: upcoming.name,
                time: upcoming.time,
                timeLeft: `${h}h ${m}m`
            });
        };

        updateTimer(); // Initial call
        const timer = setInterval(updateTimer, 60000); // Update every minute
        return () => clearInterval(timer);
  }, [prayerConfig]);

  const requestLocation = () => {
    if (!navigator.geolocation) {
        setLocationError("Location features require real device");
        return;
    }

    setLoadingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition((pos) => {
        setLoadingLocation(false);
        calculatePrayerTimes(pos.coords.latitude, pos.coords.longitude);
    }, (err) => {
        setLoadingLocation(false);
        
        let msg = err.message || "Location error";
        
        // Parse error codes
        if (err.code === 1) msg = "Permission denied";
        else if (err.code === 2) msg = "Location unavailable";
        else if (err.code === 3) msg = "Request timed out";
        
        // Detect Preview/Policy errors (common in iframes/webviews)
        if (msg.toLowerCase().includes("permissions policy") || msg.toLowerCase().includes("disabled")) {
            msg = "Location features require real device";
        }
        
        console.warn("Location Warning:", msg);
        setLocationError(msg);
        setNextPrayer(null); // Clear any stale data
    }, {
        timeout: 10000,
        maximumAge: 60000, 
        enableHighAccuracy: false // Coarse is enough and faster/more reliable
    });
  };

  useEffect(() => {
    // Greeting Logic - FIXED: Always show Arabic Salam
    setGreeting("ٱلسَّلَامُ عَلَيْكُمْ");
    
    const date = new Date();
    setDateString(date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' }));

    // Initial Location Request
    requestLocation();
  }, [calculatePrayerTimes]);

  const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="px-6 pt-16 pb-10 space-y-6 animate-fade-up">
      
      {/* 1. Islamic Header & Theme Toggle */}
      <header className="flex justify-between items-start relative z-10 mb-4">
          <div>
              <div className="flex items-center gap-2 mb-2">
                  <div className="h-[1px] w-6 bg-gold-500/80"></div>
                  <p className="text-xs font-bold text-gold-400 uppercase tracking-widest shadow-black drop-shadow-sm">
                      {dateString}
                  </p>
              </div>
              <h1 className="text-3xl font-quran font-semibold text-white leading-tight drop-shadow-md tracking-wide">
                  {greeting}
              </h1>
              <p className="text-emerald-200 text-sm font-medium mt-1">Welcome, Believer</p>
          </div>
          
          <button 
             onClick={toggleTheme}
             className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-all text-white"
          >
             {theme === 'dark' ? <Sun size={24} className="text-amber-400" /> : <Moon size={24} className="text-emerald-100" />}
          </button>
      </header>

      {/* 2. Prayer Times Widget */}
      <Link to={locationError ? "#" : "/prayer-times"} className={`block group ${locationError ? 'cursor-default' : ''}`}>
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-6 shadow-premium border border-white/20 dark:border-gray-700 relative overflow-hidden transition-transform active:scale-[0.99]">
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
            
            <div className="relative z-10 flex justify-between items-center">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
                        <Clock size={16} className={loadingLocation ? "animate-spin" : ""} />
                        <span className="text-xs font-bold uppercase tracking-widest">Next Prayer</span>
                    </div>
                    
                    {loadingLocation ? (
                         <div className="space-y-2">
                            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-4 w-20 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
                        </div>
                    ) : locationError ? (
                        <div className="flex flex-col items-start w-full">
                            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 leading-tight">
                                {locationError === "Location features require real device" 
                                 ? "Preview Mode Only" 
                                 : "Location Required"}
                            </h2>
                             <p className="text-xs text-gray-500 mt-1 mb-3 max-w-[200px] leading-relaxed">
                                {locationError}
                            </p>
                            <button 
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); requestLocation(); }}
                                className="pointer-events-auto flex items-center gap-1 text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-200 transition-colors"
                            >
                                <MapPin size={12} /> Retry Location
                            </button>
                        </div>
                    ) : nextPrayer ? (
                        <>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                {nextPrayer.name}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                Starts in <span className="text-emerald-600 dark:text-emerald-400 font-bold">{nextPrayer.timeLeft}</span>
                            </p>
                        </>
                    ) : null}
                </div>

                {!locationError && !loadingLocation && (
                    <div className="flex flex-col items-end gap-3 pl-2">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            <ArrowRight size={20} />
                        </div>
                        {nextPrayer && (
                            <span className="text-xs font-mono font-bold text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                {nextPrayer.time.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
      </Link>

      {/* 3. Jummah Card */}
      {isFriday && jummahConfig.enabled && (
        <Link to="/jummah" className="block group">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white shadow-lg shadow-emerald-900/50 border border-white/10 active:scale-[0.99] transition-transform duration-300">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative z-10 flex justify-between items-center">
                    <div>
                        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md mb-3 inline-block shadow-sm">
                            Friday Special
                        </span>
                        <h3 className="text-2xl font-serif font-bold text-white mb-1 drop-shadow-sm">Jummah Mubarak</h3>
                        <p className="text-emerald-50 text-sm font-semibold">Read Surah Al-Kahf</p>
                    </div>
                    <Calendar size={32} className="text-white opacity-90" />
                </div>
            </div>
        </Link>
      )}

      {/* 4. Daily Highlight Card (Bilingual Support) */}
      {homeConfig.highlight.enabled && (
         <div className="relative group rounded-3xl p-[1px] bg-gradient-to-b from-white/30 to-white/5">
             <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-premium border border-white/10 text-center overflow-hidden">
                 <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-gold-500/20 blur-[50px] rounded-full"></div>

                 <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400 flex items-center gap-2 drop-shadow-sm">
                            <Star size={10} fill="currentColor" />
                            {homeConfig.highlight.type} of the day
                            <Star size={10} fill="currentColor" />
                        </span>
                    </div>

                    <p className="font-quran text-3xl text-white leading-loose mb-6 dir-rtl drop-shadow-md font-medium">
                        {homeConfig.highlight.arabic}
                    </p>
                    
                    {/* Bilingual Highlight */}
                    <div className="space-y-2 mb-6">
                        {/* English */}
                        <p className="text-sm text-gray-100 font-medium leading-relaxed max-w-xs mx-auto italic drop-shadow-sm opacity-90">
                            "{homeConfig.highlight.translation}"
                        </p>
                        {/* Urdu (if present) */}
                        {homeConfig.highlight.translationUrdu && (
                             <p className="font-urdu text-lg text-emerald-200 leading-relaxed max-w-xs mx-auto drop-shadow-sm" dir="rtl">
                                {homeConfig.highlight.translationUrdu}
                            </p>
                        )}
                    </div>
                    
                    <div className="inline-block border-t border-white/20 pt-3 px-6">
                        <p className="text-xs font-bold text-emerald-300 uppercase tracking-widest shadow-black">
                            {homeConfig.highlight.reference}
                        </p>
                    </div>
                 </div>
             </div>
         </div>
      )}

      {/* 5. Action Grid */}
      <div className="grid grid-cols-2 gap-4">
         
         {/* Feature: Tasbeeh */}
         {featureFlags.tasbeeh && (
            <Link to="/tasbeeh" className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex flex-col justify-between h-40 active:scale-[0.98] transition-all hover:bg-white/15 group shadow-sm">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gold-400 group-hover:text-white transition-colors border border-white/10">
                    <HandHeart size={20} strokeWidth={2.5} />
                </div>
                <div>
                    <h3 className="font-bold text-white text-lg">Tasbeeh</h3>
                    <p className="text-xs text-gray-300 mt-1 font-medium">Digital Counter</p>
                </div>
            </Link>
         )}

         {/* Feature: Qibla Compass */}
         {featureFlags.qibla && (
            <Link to="/qibla" className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex flex-col justify-between h-40 active:scale-[0.98] transition-all hover:bg-white/15 group shadow-sm">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-teal-300 group-hover:text-white transition-colors border border-white/10">
                    <Compass size={20} strokeWidth={2.5} />
                </div>
                <div>
                    <h3 className="font-bold text-white text-lg">Qibla</h3>
                    <p className="text-xs text-gray-300 mt-1 font-medium">Finder Compass</p>
                </div>
            </Link>
         )}

        {/* Feature: 99 Names */}
        {featureFlags.names99 && (
            <Link to="/names99" className="col-span-2 bg-gradient-to-r from-indigo-900/60 to-purple-900/60 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex items-center justify-between active:scale-[0.99] transition-all hover:bg-white/15 group shadow-sm">
                <div>
                    <p className="text-[10px] text-purple-300 font-bold uppercase tracking-widest mb-1 shadow-black">Asma-ul-Husna</p>
                    <h3 className="font-serif text-xl font-bold text-white tracking-wide">99 Names of Allah</h3>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white shadow-glow group-hover:scale-110 transition-transform border border-white/20">
                    <Sparkles size={20} strokeWidth={2.5} />
                </div>
            </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
