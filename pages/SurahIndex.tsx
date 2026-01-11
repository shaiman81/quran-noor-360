
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, BookOpen, Layers, Heart, History, PlayCircle, ArrowLeft } from 'lucide-react';
import { SURAH_LIST } from '../data/quran_meta';
import { JUZ_NAMES } from '../data/juz_meta';
import { useSettings } from '../context/SettingsContext';
import { useContent } from '../context/ContentContext';

const SurahIndex: React.FC = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Tab State: Check location state first (from JuzReader back button), then session, then default
  const [activeTab, setActiveTab] = useState<'surah' | 'para' | 'favorites'>(() => {
      if (location.state && location.state.tab) return location.state.tab;
      const saved = sessionStorage.getItem('quran_active_tab');
      return (saved === 'surah' || saved === 'para' || saved === 'favorites') ? saved as any : 'surah';
  });

  const { t, favorites, bookmarkedSurah, bookmarkedAyah } = useSettings();
  const { featureFlags } = useContent(); // juzMap no longer needed for display list since we use static list 1-30
  const navigate = useNavigate();

  useEffect(() => {
    const scrollPos = sessionStorage.getItem('quran_scroll_pos');
    if (scrollPos) window.scrollTo(0, parseInt(scrollPos));
    return () => sessionStorage.setItem('quran_scroll_pos', window.scrollY.toString());
  }, []);

  useEffect(() => {
    sessionStorage.setItem('quran_active_tab', activeTab);
  }, [activeTab]);

  const handleTabChange = (tab: any) => {
      setActiveTab(tab);
  };

  const filteredSurahs = useMemo(() => {
    let list = SURAH_LIST;
    
    // Filter by Favorites if tab is active
    if (activeTab === 'favorites') {
        list = list.filter(s => favorites.includes(s.number));
    }

    return list.filter(surah => 
        surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.englishNameTranslation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(surah.number).includes(searchTerm)
    );
  }, [searchTerm, activeTab, favorites]);

  // Always 30 Juz
  const availableJuzList = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => i + 1);
  }, []);

  // Find Metadata for Last Read
  const lastReadSurahMeta = bookmarkedSurah ? SURAH_LIST.find(s => s.number === bookmarkedSurah) : null;

  return (
    <div className="p-5 min-h-screen pb-32 animate-fade-in-up bg-sand-50 dark:bg-gray-900">
      
      <div className="flex items-center gap-3 mb-6">
         <button onClick={() => navigate('/quran')} className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition">
             <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
         </button>
         <h1 className="text-2xl font-bold font-serif text-gray-900 dark:text-white">Al-Quran (Text)</h1>
      </div>
      
      {/* LAST SEEN SECTION - Visible on All Tabs */}
      {lastReadSurahMeta && bookmarkedAyah && (
        <div className="mb-6">
            <Link 
                to={`/quran/${bookmarkedSurah}#ayah-${bookmarkedAyah}`}
                className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-emerald-900 dark:to-emerald-800 rounded-2xl p-4 flex items-center justify-between text-white shadow-lg shadow-gray-200 dark:shadow-emerald-900/20 group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10 flex items-center gap-3">
                    <div className="bg-white/20 p-2.5 rounded-full">
                        <History size={20} className="text-emerald-300" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider mb-0.5">Last Seen</p>
                        <h3 className="font-bold text-lg leading-none">{lastReadSurahMeta.englishName}</h3>
                        <p className="text-xs text-gray-300 mt-1">Ayah {bookmarkedAyah}</p>
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-2 pr-2">
                    <span className="text-xs font-bold text-emerald-300 group-hover:text-white transition-colors">Continue</span>
                    <PlayCircle size={24} fill="currentColor" className="text-white" />
                </div>
            </Link>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative mb-6 group">
        <div className="absolute inset-0 bg-emerald-200 dark:bg-emerald-900/30 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity"></div>
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center overflow-hidden">
            <div className="pl-4 text-gray-400">
               <Search size={20} />
            </div>
            <input
            type="text"
            placeholder={activeTab === 'para' ? "Search Para..." : t('search_surah')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none py-4 px-3 focus:outline-none focus:ring-0 text-gray-800 dark:text-gray-100 placeholder-gray-400 font-medium"
            />
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="bg-gray-100 dark:bg-gray-800/50 p-1 rounded-xl flex gap-1 mb-6">
        {[
            { id: 'surah', label: 'Surah', icon: BookOpen },
            ...(featureFlags.juz ? [{ id: 'para', label: 'Para', icon: Layers }] : []),
            { id: 'favorites', label: 'Favorites', icon: Heart },
        ].map((tab) => (
            <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
            >
                <tab.icon size={16} fill={tab.id === 'favorites' && activeTab === 'favorites' ? "currentColor" : "none"} />
                {tab.label}
            </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-3">
        {(activeTab === 'surah' || activeTab === 'favorites') ? (
            filteredSurahs.map((surah) => {
                const isFav = favorites.includes(surah.number);
                return (
                    <div key={surah.number} className="relative group">
                         <Link 
                            to={`/quran/${surah.number}`}
                            className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-emerald-500/50 hover:shadow-md transition-all active:scale-[0.99]"
                        >
                            <div className="relative w-12 h-12 flex items-center justify-center mr-4 shrink-0">
                                <svg className="absolute inset-0 w-full h-full text-emerald-100 dark:text-emerald-900/40" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z" />
                                </svg>
                                <span className="relative z-10 font-bold text-sm text-emerald-700 dark:text-emerald-400">{surah.number}</span>
                            </div>

                            <div className="flex-1 min-w-0 pr-10">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg truncate">{surah.englishName}</h3>
                                    <span className="font-quran text-xl text-gray-400 dark:text-gray-500 ml-2">{surah.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                    <span className="uppercase tracking-wide">{surah.revelationType}</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span>{surah.numberOfAyahs} Ayahs</span>
                                </div>
                            </div>
                            
                            {isFav && (
                                <div className="absolute top-4 right-4 text-emerald-500">
                                    <Heart size={16} fill="currentColor" />
                                </div>
                            )}
                        </Link>
                    </div>
                );
            })
        ) : (
            <>
                {featureFlags.juz ? (
                  <>
                    {availableJuzList.filter(j => String(j).includes(searchTerm) || JUZ_NAMES[j]?.toLowerCase().includes(searchTerm.toLowerCase())).map((juz) => (
                        <Link 
                            key={juz} 
                            to={`/juz/${juz}`}
                            className="block bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-emerald-500/50 hover:shadow-md transition-all active:scale-[0.99]"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="bg-gray-100 dark:bg-gray-700 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 text-lg">
                                        {juz}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-white text-lg">{JUZ_NAMES[juz] || `Para ${juz}`}</h3>
                                        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">JUZ {juz}</span>
                                    </div>
                                </div>
                                <div className="text-gray-300 dark:text-gray-600">
                                    <Layers size={20} />
                                </div>
                            </div>
                        </Link>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-10 text-gray-400">Para section disabled.</div>
                )}
            </>
        )}

        {filteredSurahs.length === 0 && activeTab !== 'para' && (
            <div className="text-center py-12 flex flex-col items-center">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-3">
                    {activeTab === 'favorites' ? <Heart size={32} className="text-gray-400" /> : <Search size={32} className="text-gray-400" />}
                </div>
                <p className="text-gray-400 font-medium">
                    {activeTab === 'favorites' ? "No favorites yet." : "No matches found"}
                </p>
            </div>
        )}
      </div>
    </div>
  );
};

export default SurahIndex;
