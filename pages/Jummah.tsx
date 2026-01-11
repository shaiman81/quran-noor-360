
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, BookOpen, Star, Sparkles, ArrowLeft, ArrowRight, Bookmark } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SURAH_LIST } from '../data/quran_meta';
import { useNavigate } from 'react-router-dom';

const Jummah: React.FC = () => {
    const { jummahConfig, featureFlags, duas } = useContent();
    const navigate = useNavigate();

    if (!featureFlags.jummah || !jummahConfig.enabled) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 text-center text-gray-500">
                <p>Jummah section is currently disabled.</p>
            </div>
        );
    }

    const jummahDuas = duas.filter(d => d.category === 'jummah');

    return (
        <div className="min-h-screen bg-sand-50 dark:bg-gray-900 pb-24 animate-fade-in-up">
            {/* Graphic Header */}
            <div className="bg-gradient-to-br from-emerald-800 to-teal-600 text-white p-6 pt-8 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-400 opacity-10 rounded-full blur-2xl"></div>
                
                <div className="flex items-center gap-3 mb-6 relative z-10">
                    <button onClick={() => navigate('/')} className="p-2 bg-white/10 rounded-full backdrop-blur-md hover:bg-white/20 transition">
                         <ArrowLeft size={20} />
                    </button>
                    <span className="font-bold text-lg tracking-wide opacity-90">Jummah Mubarak</span>
                </div>

                <div className="relative z-10 mb-2">
                    <div className="inline-flex items-center gap-2 mb-3 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        <Sparkles size={14} className="text-yellow-300" />
                        <span className="text-[10px] font-bold tracking-widest uppercase">{jummahConfig.highlightTitle}</span>
                    </div>
                    <p className="font-serif text-2xl leading-relaxed opacity-95">{jummahConfig.highlightMessage}</p>
                </div>
            </div>

            <div className="p-5 space-y-6 -mt-4 relative z-20">
                
                {/* 1. Hadith Card */}
                <section className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-soft border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-5">
                         <Bookmark size={80} className="text-emerald-500" />
                     </div>
                     <h3 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2 relative z-10">
                        <Sparkles size={18} className="text-emerald-500" /> Significance of Friday
                     </h3>
                     <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-3 relative z-10">
                         "The best day on which the sun has risen is Friday; on it Adam was created, on it he was made to enter Paradise, on it he was expelled from it."
                     </p>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest relative z-10">Sahih Muslim</p>
                </section>

                {/* 2. Checklist (Horizontal Scroll) */}
                <section>
                    <h3 className="font-bold text-gray-800 dark:text-white mb-4 ml-2 flex items-center gap-2">
                        <CheckCircle2 size={20} className="text-emerald-500" />
                        Sunnah Checklist
                    </h3>
                    
                    <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar">
                        {jummahConfig.checklist.map((item, idx) => (
                            <div 
                                key={idx} 
                                className="shrink-0 w-32 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center gap-3"
                            >
                                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800">
                                    <CheckCircle2 size={20} />
                                </div>
                                <span className="text-sm font-bold text-gray-700 dark:text-gray-200 leading-tight">{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. Recommended Surahs */}
                <section>
                    <h3 className="font-bold text-gray-800 dark:text-white mb-3 ml-2 flex items-center gap-2">
                        <BookOpen size={18} className="text-blue-500" />
                        Recommended Reading
                    </h3>
                    <div className="space-y-3">
                        {jummahConfig.recommendedSurahs.map(id => {
                            const meta = SURAH_LIST.find(s => s.number === id);
                            if(!meta) return null;
                            return (
                                <Link 
                                    key={id} 
                                    to={`/quran/${id}`}
                                    className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-emerald-500 transition-all active:scale-[0.99] group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-blue-50 dark:bg-blue-900/20 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            {id}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 dark:text-white text-lg">{meta.englishName}</h4>
                                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{meta.englishNameTranslation}</p>
                                        </div>
                                    </div>
                                    <ArrowRight size={18} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* 4. Special Duas */}
                {(jummahDuas.length > 0) && (
                    <section>
                        <h3 className="font-bold text-gray-800 dark:text-white mb-3 ml-2 flex items-center gap-2">
                            <Star size={18} className="text-yellow-500" />
                            Special Duas
                        </h3>
                        <div className="space-y-3">
                            {jummahDuas.map(dua => (
                                <div key={dua.id} className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-800 p-5 rounded-2xl border border-amber-100 dark:border-gray-700 relative overflow-hidden">
                                    <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-3 text-sm uppercase tracking-wide">{dua.title}</h4>
                                    <p className="font-quran text-2xl text-right text-gray-800 dark:text-gray-200 mb-4 leading-loose">{dua.arabic}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 italic border-l-2 border-amber-300 pl-3">{dua.translation}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Jummah;
