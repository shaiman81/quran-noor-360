
import React, { useEffect } from 'react';
import { Hexagon, ArrowLeft, Loader2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const KalimaList: React.FC = () => {
    const { kalimas, featureFlags } = useContent();
    const { fontSize } = useSettings();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const publishedItems = kalimas.filter(m => m.status === 'published');

    if (!featureFlags.kalima) return null;

    return (
        <div className="min-h-screen bg-sand-50 dark:bg-gray-900 pb-32">
            <div className="sticky top-0 z-20 bg-sand-50/95 dark:bg-gray-900/95 backdrop-blur-md px-4 py-4 border-b border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-3">
                 <button onClick={() => navigate('/library')} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                     <ArrowLeft size={20} />
                 </button>
                 <h1 className="text-xl font-bold font-serif">6 Kalimas</h1>
            </div>

            <div className="p-4 space-y-6">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-2xl flex items-start gap-3 border border-purple-100 dark:border-purple-800">
                    <Hexagon className="text-purple-600 shrink-0 mt-1" size={24} />
                    <div>
                        <h3 className="font-bold text-purple-800 dark:text-purple-200 text-sm">Fundamentals of Faith</h3>
                        <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                            Memorize and understand the six declarations of faith.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {publishedItems.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">
                             <p>Content is loading or empty.</p>
                             <p className="text-xs mt-2">Check back soon.</p>
                        </div>
                    ) : (
                        publishedItems.map((item, index) => (
                            <div key={item.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-4 border-b border-gray-50 dark:border-gray-700 pb-2">
                                    <span className="text-xs font-bold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-500">{index + 1}</span>
                                    <h4 className="font-bold text-sm text-gray-600 dark:text-gray-300 uppercase">{item.title}</h4>
                                </div>
                                
                                <p 
                                    className="font-quran text-gray-800 dark:text-white text-right leading-loose mb-4"
                                    style={{ fontSize: `${fontSize}px` }}
                                    dir="rtl"
                                >
                                    {item.arabic}
                                </p>
                                
                                <div className="space-y-3">
                                    {/* Urdu Translation - Primary */}
                                    <p className="font-urdu text-lg text-emerald-700 dark:text-emerald-400 text-right leading-loose border-r-2 border-emerald-200 pr-3" dir="rtl">
                                        {item.translationUrdu}
                                    </p>
                                    
                                    {/* English Translation - Secondary */}
                                    {item.translationEn && (
                                         <p className="text-sm text-gray-500 dark:text-gray-400 border-l-2 border-gray-200 pl-3 leading-relaxed">
                                            {item.translationEn}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default KalimaList;
