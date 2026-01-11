
import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowLeft } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const AzkarList: React.FC = () => {
    const { azkar } = useContent();
    const { fontSize } = useSettings();
    const navigate = useNavigate();
    const [tab, setTab] = useState<'morning' | 'evening'>('morning');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filtered = azkar.filter(a => a.category === tab && a.status === 'published');

    return (
        <div className="min-h-screen bg-sand-50 dark:bg-gray-900 pb-32">
             <div className="sticky top-0 z-20 bg-sand-50/95 dark:bg-gray-900/95 backdrop-blur-md px-4 py-4 border-b border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-3">
                 <button onClick={() => navigate('/library')} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                     <ArrowLeft size={20} />
                 </button>
                 <h1 className="text-xl font-bold font-serif">Daily Azkar</h1>
            </div>

            <div className="p-4 space-y-4">
                <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-2">
                    <button 
                        onClick={() => setTab('morning')}
                        className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                            tab === 'morning' 
                            ? 'bg-white dark:bg-gray-700 shadow-sm text-orange-600' 
                            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                    >
                        <Sun size={18} /> Morning
                    </button>
                    <button 
                        onClick={() => setTab('evening')}
                        className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                            tab === 'evening' 
                            ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600' 
                            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                    >
                        <Moon size={18} /> Evening
                    </button>
                </div>

                <div className="space-y-4">
                    {filtered.map((item) => (
                        <div key={item.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-bold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-500 uppercase tracking-wider">{item.count ? `${item.count}x` : '1x'}</span>
                                {item.reference && <span className="text-xs text-gray-400">{item.reference}</span>}
                            </div>
                            
                            <p 
                                className="font-quran text-gray-800 dark:text-white text-right leading-loose mb-4"
                                style={{ fontSize: `${fontSize}px` }}
                                dir="rtl"
                            >
                                {item.arabic}
                            </p>
                            
                            {/* PREFER URDU TRANSLATION */}
                            {item.translationUrdu ? (
                                <p className="font-urdu text-lg text-gray-600 dark:text-gray-300 leading-loose mb-2 text-right" dir="rtl">
                                    {item.translationUrdu}
                                </p>
                            ) : (
                                <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-2">
                                    {item.translation}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AzkarList;
