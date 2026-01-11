
import React, { useEffect, useState, useMemo } from 'react';
import { ArrowLeft, Sparkles, Search, Globe, AlignLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useSettings } from '../context/SettingsContext';

const NamesList: React.FC = () => {
    const { allahNames, featureFlags } = useContent();
    const { language } = useSettings();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    
    // Smooth Scroll on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Filter Logic
    const filteredNames = useMemo(() => {
        if (!allahNames) return [];
        const term = searchTerm.toLowerCase();
        
        return allahNames
            .filter(n => n.active) // Only show active names to users
            .filter(n => 
                n.transliteration.toLowerCase().includes(term) ||
                n.meaning.en.toLowerCase().includes(term) ||
                n.meaning.ur.includes(term) ||
                n.arabic.includes(term)
            );
    }, [allahNames, searchTerm]);

    if (!featureFlags.names99) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sand-50 dark:bg-gray-900 text-gray-500">
                <p>Feature currently disabled.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sand-50 dark:bg-gray-900 pb-32">
             {/* Sticky Header */}
             <div className="sticky top-0 z-20 bg-sand-50/95 dark:bg-gray-900/95 backdrop-blur-md px-4 py-4 border-b border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-3">
                 <button onClick={() => navigate('/')} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                     <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
                 </button>
                 <div className="flex-1">
                     <h1 className="text-xl font-bold font-serif text-gray-800 dark:text-white">Asma-ul-Husna</h1>
                 </div>
                 <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                     <Sparkles size={18} className="text-purple-600 dark:text-purple-400" />
                 </div>
            </div>

            <div className="p-4 space-y-6">
                
                {/* Hero Banner */}
                <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-6 text-white shadow-lg shadow-purple-900/20">
                     <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                     <h2 className="font-bold text-xl mb-1 relative z-10">99 Names of Allah</h2>
                     <p className="text-sm text-purple-100 opacity-90 relative z-10 leading-relaxed max-w-xs">
                        "Allah has ninety-nine names, i.e. one-hundred minus one, and whoever knows them will go to Paradise." (Bukhari)
                     </p>
                </div>

                {/* Search Bar */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Search size={18} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search names (English, Arabic, Urdu)..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none text-gray-800 dark:text-white transition-all font-medium placeholder-gray-400"
                    />
                </div>

                {/* Loading State */}
                {allahNames.length === 0 && (
                    <div className="grid grid-cols-2 gap-4 animate-pulse">
                        {[1,2,3,4,5,6].map(i => (
                            <div key={i} className="bg-white dark:bg-gray-800 h-40 rounded-2xl"></div>
                        ))}
                    </div>
                )}

                {/* Dynamic Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {filteredNames.map((name) => (
                        <div key={name.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center hover:border-purple-200 dark:hover:border-purple-800/50 transition-colors group">
                            
                            {/* Order Badge */}
                            <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 flex items-center justify-center text-xs font-bold text-gray-400 mb-3 font-mono">
                                {name.order}
                            </div>
                            
                            {/* Arabic Name */}
                            <p className="font-quran text-3xl text-gray-800 dark:text-white mb-2 drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                                {name.arabic}
                            </p>
                            
                            {/* Transliteration */}
                            <h3 className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mb-1">
                                {name.transliteration}
                            </h3>
                            
                            {/* Translation (Language Aware) */}
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-tight px-2">
                                {language === 'ur' ? name.meaning.ur : name.meaning.en}
                            </p>

                            {/* Description Tooltip Indicator (Future Feature) */}
                            {name.desc && (
                                <div className="mt-3 pt-3 border-t border-gray-50 dark:border-gray-700/50 w-full">
                                    <p className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed">
                                        {name.desc}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {filteredNames.length === 0 && allahNames.length > 0 && (
                    <div className="text-center py-10 text-gray-400">
                        No names found matching "{searchTerm}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default NamesList;
