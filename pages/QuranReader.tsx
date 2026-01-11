
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Share2, Settings2, Loader2, AlertCircle, Heart, WifiOff, Globe } from 'lucide-react';
import { SURAH_LIST } from '../data/quran_meta';
import { useSettings } from '../context/SettingsContext';
import { fetchSurah } from '../services/quranService';
import { Surah, Ayah } from '../types';

const QuranReader: React.FC = () => {
  const { surahId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    fontSize, 
    visibleTranslations, 
    setLastRead, bookmarkedSurah, bookmarkedAyah,
    setSettingsSheetOpen,
    favorites, toggleFavorite
  } = useSettings();
  
  const [surah, setSurah] = useState<Surah | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const topRef = useRef<HTMLDivElement>(null);

  // Scroll to top on new surah
  useEffect(() => {
    if (!location.hash) {
        window.scrollTo(0, 0);
    }
  }, [surahId, location.hash]);

  // Fetch Data
  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(null);
      setSurah(null);

      const id = Number(surahId);
      if (!id || id < 1 || id > 114) {
          setError("Invalid Surah Number");
          setLoading(false);
          return;
      }

      const data = await fetchSurah(id);
      
      if (data) {
          // Merge with static metadata for consistent display names if API misses them
          const meta = SURAH_LIST.find(s => s.number === id);
          if (meta) {
              data.revelationType = meta.revelationType;
              data.englishNameTranslation = meta.englishNameTranslation;
          }
          setSurah(data);
      } else {
          setError("API Error: Unable to fetch content.");
      }
      setLoading(false);
    };

    loadContent();
  }, [surahId]);

  // Handle Hash Scroll (Ayah Linking)
  useEffect(() => {
    if (!loading && surah && location.hash) {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Highlight effect
                element.classList.add('ring-2', 'ring-emerald-500');
                setTimeout(() => element.classList.remove('ring-2', 'ring-emerald-500'), 2000);
            }, 500);
        }
    }
  }, [loading, surah, location.hash]);

  const handleShare = (ayah: Ayah) => {
    if (surah && navigator.share) {
      navigator.share({
        title: `${surah.englishName} ${surah.number}:${ayah.number}`,
        text: `${ayah.text}\n\n${ayah.translation?.en || ''}`,
      }).catch(console.error);
    }
  };

  const handleAyahClick = (ayahNum: number) => {
      setLastRead(Number(surahId), ayahNum);
  }

  const handleBack = () => {
    navigate('/quran/read', { state: { tab: 'surah' } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4 text-emerald-600 dark:text-emerald-400">
          <Loader2 size={40} className="animate-spin" />
          <p className="text-sm font-medium animate-pulse text-secondary dark:text-gray-300">Fetching Authentic Content...</p>
        </div>
      </div>
    );
  }

  if (error || !surah) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-sand-50 dark:bg-gray-900">
         <div className="text-center space-y-4 max-w-sm bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-red-100 dark:border-red-900/30">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto text-red-500">
                <Globe size={32} />
            </div>
            
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">API Connection Failed</h2>
                <p className="text-sm text-gray-500 mt-2">
                    If you are in the <strong>AI Studio Preview</strong>, the Quran API (api.alquran.cloud) is likely blocked by CORS policies. 
                </p>
                <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 text-left border border-emerald-100 dark:border-emerald-800">
                    <strong>Note:</strong> This app uses the authentic live API. It will work correctly on:
                    <ul className="list-disc list-inside mt-1 ml-1 opacity-80">
                        <li>Real Mobile Devices</li>
                        <li>Production Deployments</li>
                        <li>Environments without CORS restrictions</li>
                    </ul>
                </div>
            </div>

            <div className="flex gap-3 pt-2">
                <button onClick={handleBack} className="flex-1 py-2.5 rounded-xl font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700">
                    Back to List
                </button>
                <button onClick={() => window.location.reload()} className="flex-1 py-2.5 rounded-xl font-bold text-white bg-emerald-600 shadow-lg shadow-emerald-200 dark:shadow-none">
                    Retry
                </button>
            </div>
         </div>
      </div>
    );
  }

  const isSurahFavorite = favorites.includes(surah.number);

  return (
    <div className="pb-24 bg-sand-50 dark:bg-gray-900 min-h-screen" ref={topRef}>
      
      {/* Navbar */}
      <div className="sticky top-0 bg-sand-50/95 dark:bg-gray-900/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-sand-200 dark:border-gray-800 z-30 shadow-sm">
        <button onClick={handleBack} className="p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-secondary dark:text-gray-300 transition">
          <ArrowLeft size={24} />
        </button>
        <div className="text-center flex flex-col items-center">
            <h2 className="font-bold text-primary dark:text-gray-100 flex items-center gap-2">
                {surah.englishName}
            </h2>
          <p className="text-[10px] text-muted dark:text-gray-500 uppercase tracking-widest font-bold">{surah.revelationType} • {surah.numberOfAyahs} Ayahs</p>
        </div>
        <div className="flex items-center -mr-2">
             <button 
                onClick={() => toggleFavorite(surah.number)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-secondary dark:text-gray-300 transition active:scale-90"
             >
                <Heart size={24} fill={isSurahFavorite ? "currentColor" : "none"} className={isSurahFavorite ? "text-red-500" : ""} />
             </button>
             <button onClick={() => setSettingsSheetOpen(true)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-secondary dark:text-gray-300 transition">
                <Settings2 size={24} />
            </button>
        </div>
      </div>

      {surah.number !== 1 && surah.number !== 9 && (
        <div className="py-8 text-center mt-2">
            <p className="font-quran text-2xl text-primary dark:text-emerald-300 drop-shadow-sm select-none">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
        </div>
      )}

      {/* Ayahs Container */}
      <div className="px-3 md:px-6 space-y-4">
        {surah.ayahs.map((ayah) => {
            const isLastRead = bookmarkedSurah === surah.number && bookmarkedAyah === ayah.number;
            
            return (
            <div 
                key={ayah.number} 
                id={`ayah-${ayah.number}`} 
                onClick={() => handleAyahClick(ayah.number)}
                className={`relative bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-soft border transition-all duration-300 ${isLastRead ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-sand-100 dark:border-gray-700'}`}
            >
                <div className="flex justify-between items-center mb-6 border-b border-dashed border-gray-100 dark:border-gray-700 pb-3">
                    <div className="flex items-center gap-2">
                        <span className="bg-sand-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-400 font-bold px-3 py-1 rounded-full text-xs shadow-sm">
                            {surah.number}:{ayah.number}
                        </span>
                        {isLastRead && <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Last Seen</span>}
                    </div>
                    <div className="flex gap-1 text-gray-400">
                        <button onClick={(e) => { e.stopPropagation(); handleShare(ayah); }} className="p-2 rounded-full hover:bg-emerald-50 dark:hover:bg-gray-700 transition">
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>

                <div className="text-right mb-6 w-full">
                    <p 
                        className="font-quran text-primary dark:text-gray-100"
                        style={{ 
                          fontSize: `${fontSize}px`,
                          lineHeight: '2.4' 
                        }}
                        dir="rtl"
                    >
                    {ayah.text}
                    </p>
                </div>

                <div className="space-y-4">
                    {visibleTranslations.en && ayah.translation?.en && (
                        <div className="text-left border-l-2 border-emerald-200 dark:border-emerald-800 pl-4">
                            <p className="text-secondary dark:text-gray-300 text-[1.05rem] leading-relaxed font-serif font-medium">{ayah.translation.en}</p>
                        </div>
                    )}
                    {visibleTranslations.ur && ayah.translation?.ur && (
                        <div className="text-right border-r-2 border-blue-200 dark:border-blue-800 pr-4 mt-3">
                            <p className="font-urdu text-secondary dark:text-gray-300 text-xl leading-loose" dir="rtl">{ayah.translation.ur}</p>
                        </div>
                    )}
                </div>
            </div>
            );
        })}
      </div>
    </div>
  );
};

export default QuranReader;
