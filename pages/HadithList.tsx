
import React, { useEffect } from 'react';
import { Book, Lock, ArrowLeft } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useNavigate } from 'react-router-dom';

const HadithList: React.FC = () => {
  const { hadiths, featureFlags } = useContent();
  const navigate = useNavigate();

  useEffect(() => {
    const scrollPos = sessionStorage.getItem('hadith_scroll_pos');
    if (scrollPos) window.scrollTo(0, parseInt(scrollPos));
    return () => sessionStorage.setItem('hadith_scroll_pos', window.scrollY.toString());
  }, []);

  if (!featureFlags.hadith) {
      return (
          <div className="min-h-screen flex items-center justify-center p-6 text-center text-gray-500">
              <div className="flex flex-col items-center">
                <Lock size={48} className="mb-4 text-gray-300 mx-auto" />
                <p>This section is currently disabled.</p>
              </div>
          </div>
      )
  }

  const publishedHadiths = hadiths.filter(h => h.status === 'published');

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-gray-900 pb-32">
      <div className="sticky top-0 z-20 bg-sand-50/95 dark:bg-gray-900/95 backdrop-blur-md px-4 py-4 border-b border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate('/library')} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
             <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
        <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-lg text-blue-600 dark:text-blue-400">
            <Book size={20} />
        </div>
        <h1 className="text-xl font-bold">Authentic Hadiths</h1>
      </div>

      <div className="p-4 space-y-4">
        <p className="text-gray-500 text-sm mb-4">Short, verified sayings for daily reflection.</p>

        <div className="space-y-4">
            {publishedHadiths.map(hadith => (
            <div key={hadith.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 dark:bg-blue-900/10 rounded-bl-full -mr-8 -mt-8"></div>
                
                <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-bold text-gray-500 mb-2">
                    {hadith.category}
                </span>
                
                {hadith.arabic && (
                    <p className="font-arabic text-xl text-right mb-3 text-gray-800 dark:text-gray-200" dir="rtl">
                        {hadith.arabic}
                    </p>
                )}
                
                {/* PREFER URDU TRANSLATION */}
                {hadith.translationUrdu ? (
                     <p className="font-urdu text-lg text-gray-700 dark:text-gray-300 font-medium leading-loose text-right" dir="rtl">
                        "{hadith.translationUrdu}"
                    </p>
                ) : (
                    <p className="text-base text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                        "{hadith.text}"
                    </p>
                )}
                
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 text-right">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Reference: {hadith.source}</span>
                </div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HadithList;
