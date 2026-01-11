
import React, { useEffect } from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const ManzilList: React.FC = () => {
    const { manzil } = useContent();
    const { fontSize } = useSettings();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const publishedItems = manzil.filter(m => m.status === 'published');

    return (
        <div className="min-h-screen bg-sand-50 dark:bg-gray-900 pb-32">
            <div className="sticky top-0 z-20 bg-sand-50/95 dark:bg-gray-900/95 backdrop-blur-md px-4 py-4 border-b border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-3">
                 <button onClick={() => navigate('/library')} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                     <ArrowLeft size={20} />
                 </button>
                 <h1 className="text-xl font-bold font-serif">Manzil</h1>
            </div>

            <div className="p-4 space-y-6">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl flex items-start gap-3 border border-emerald-100 dark:border-emerald-800">
                    <Shield className="text-emerald-600 shrink-0 mt-1" size={24} />
                    <div>
                        <h3 className="font-bold text-emerald-800 dark:text-emerald-200 text-sm">Protection & Healing</h3>
                        <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                            Regular recitation of Manzil provides protection from Magic, Evil Eye, and other harmful things.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {publishedItems.map((item, index) => (
                        <div key={item.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-4 border-b border-gray-50 dark:border-gray-700 pb-2">
                                <span className="text-xs font-bold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-500">#{index + 1}</span>
                                <h4 className="font-bold text-sm text-gray-400 uppercase">{item.name}</h4>
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
                                 <p className="font-urdu text-lg text-gray-600 dark:text-gray-300 border-r-2 border-emerald-200 pr-3 leading-loose text-right" dir="rtl">
                                    {item.translationUrdu}
                                </p>
                            ) : (
                                <p className="text-sm text-gray-600 dark:text-gray-300 border-l-2 border-emerald-200 pl-3 leading-relaxed">
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

export default ManzilList;
