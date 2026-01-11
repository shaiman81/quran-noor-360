
import React, { useEffect, useState, useMemo } from 'react';
import { Clock, MapPin, Calendar, Settings, AlertCircle } from 'lucide-react';
import { getPrayerTimes } from '../services/prayerService';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';

const PrayerTimesPage: React.FC = () => {
    const { prayerConfig } = useContent();
    const [times, setTimes] = useState<any>(null);
    const [nextPrayer, setNextPrayer] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState<string>('');
    const [locationStatus, setLocationStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [errorMsg, setErrorMsg] = useState('');

    // 1. Fetch Location & Calculate
    useEffect(() => {
        if (!navigator.geolocation) {
            setErrorMsg("Location features require real device");
            setLocationStatus('error');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const t = getPrayerTimes(pos.coords.latitude, pos.coords.longitude, prayerConfig);
                setTimes(t);
                setLocationStatus('success');
            },
            (err) => {
                let msg = err.message || "Location error";
                if (err.code === 1) msg = "Permission denied";
                else if (err.code === 2) msg = "Unavailable";
                else if (err.code === 3) msg = "Timeout";
                
                if (msg.toLowerCase().includes("permissions policy") || msg.toLowerCase().includes("disabled")) {
                    msg = "Location features require real device";
                }

                console.warn("Prayer Times Location Error:", msg);
                setErrorMsg(msg);
                setLocationStatus('error');
            },
            { timeout: 10000 }
        );
    }, [prayerConfig]);

    // 2. Timer for "Next Prayer"
    useEffect(() => {
        if (!times) return;

        const interval = setInterval(() => {
            const now = new Date();
            const list = [
                { name: 'Fajr', time: times.fajr },
                { name: 'Sunrise', time: times.sunrise }, // Not a prayer but important
                { name: 'Dhuhr', time: times.dhuhr },
                { name: 'Asr', time: times.asr },
                { name: 'Maghrib', time: times.maghrib },
                { name: 'Isha', time: times.isha },
            ];

            // Find next
            let upcoming = list.find(p => p.time > now);
            
            // If none found, next is Fajr tomorrow
            if (!upcoming) {
                upcoming = { name: 'Fajr (Tomorrow)', time: new Date(times.fajr.getTime() + 86400000) }; 
            }

            setNextPrayer(upcoming.name);

            const diffMs = upcoming.time.getTime() - now.getTime();
            const hrs = Math.floor(diffMs / 3600000);
            const mins = Math.floor((diffMs % 3600000) / 60000);
            const secs = Math.floor((diffMs % 60000) / 1000);

            setTimeLeft(`${hrs}h ${mins}m ${secs}s`);

        }, 1000);

        return () => clearInterval(interval);
    }, [times]);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const prayerList = useMemo(() => {
        if (!times) return [];
        return [
            { id: 'fajr', name: 'Fajr', time: times.fajr },
            { id: 'dhuhr', name: 'Dhuhr', time: times.dhuhr },
            { id: 'asr', name: 'Asr', time: times.asr },
            { id: 'maghrib', name: 'Maghrib', time: times.maghrib },
            { id: 'isha', name: 'Isha', time: times.isha },
        ];
    }, [times]);

    if (locationStatus === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sand-50 dark:bg-gray-900">
                 <div className="flex flex-col items-center gap-2 text-emerald-600 animate-pulse">
                     <MapPin size={32} />
                     <p>Locating...</p>
                 </div>
            </div>
        );
    }

    if (locationStatus === 'error') {
        return (
            <div className="min-h-screen p-6 flex flex-col items-center justify-center text-center bg-sand-50 dark:bg-gray-900">
                <div className="bg-red-50 p-6 rounded-full mb-4 dark:bg-red-900/20">
                    <AlertCircle size={40} className="text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {errorMsg === "Location features require real device" ? "Preview Mode" : "Location Access Needed"}
                </h2>
                <p className="text-gray-500 mb-6 max-w-xs mx-auto text-sm">
                    {errorMsg === "Location features require real device" 
                     ? "This feature relies on GPS sensors not available in this preview environment. Please test on a real device."
                     : "Please enable location permissions to calculate accurate prayer times for your area."}
                </p>
                <button onClick={() => window.location.reload()} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 dark:shadow-none hover:bg-emerald-700 transition">
                    Retry Connection
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sand-50 dark:bg-gray-900 pb-10">
            {/* Header / Hero */}
            <div className="bg-emerald-600 text-white p-6 pb-12 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                
                <div className="flex justify-between items-start mb-6">
                    <div>
                         <h1 className="text-2xl font-bold font-serif">Prayer Times</h1>
                         <p className="text-emerald-100 text-xs flex items-center gap-1 mt-1">
                             <MapPin size={10} /> Auto-Detected Location
                         </p>
                    </div>
                    <div className="text-right">
                        <p className="text-emerald-100 text-xs">{new Date().toLocaleDateString(undefined, { weekday: 'long' })}</p>
                        <p className="font-bold">{new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="text-center mt-4 mb-2">
                    <p className="text-emerald-200 text-sm uppercase tracking-widest font-bold mb-1">Next Prayer</p>
                    <h2 className="text-4xl font-bold mb-1">{nextPrayer}</h2>
                    <p className="text-xl font-mono opacity-90">{timeLeft}</p>
                </div>
            </div>

            {/* List */}
            <div className="px-6 -mt-8 relative z-10 space-y-3">
                {prayerList.map((p) => {
                    const isNext = nextPrayer?.includes(p.name);
                    
                    return (
                        <div 
                            key={p.id} 
                            className={`flex justify-between items-center p-4 rounded-2xl shadow-sm border transition-all ${
                                isNext 
                                ? 'bg-white dark:bg-gray-800 border-emerald-500 ring-1 ring-emerald-500 transform scale-105' 
                                : 'bg-white/80 dark:bg-gray-800/80 border-transparent hover:bg-white dark:hover:bg-gray-800'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    isNext ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
                                }`}>
                                    <Clock size={20} />
                                </div>
                                <span className={`font-bold text-lg ${isNext ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {p.name}
                                </span>
                            </div>
                            <span className="font-mono font-bold text-xl text-gray-800 dark:text-white">
                                {formatTime(p.time)}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Footer Config Note */}
            <div className="px-6 mt-8 text-center">
                <p className="text-xs text-gray-400 mb-2">
                    Method: {prayerConfig.calculationMethod} • Asr: {prayerConfig.madhab === 'hanafi' ? 'Hanafi' : 'Shafi/Maliki/Hanbali'}
                </p>
                <Link to="/settings" className="inline-flex items-center gap-1 text-xs text-emerald-600 font-bold">
                    <Settings size={12} /> Configure Calculation Settings
                </Link>
            </div>
        </div>
    );
};

export default PrayerTimesPage;
