
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Globe } from 'lucide-react';
import { JUZ_NAMES } from '../data/juz_meta';
import { useSettings } from '../context/SettingsContext';
import { fetchJuz } from '../services/quranService';

const JuzReader: React.FC = () => {
  const { juzId } = useParams();
  const navigate = useNavigate();
  const { fontSize, visibleTranslations } = useSettings(); 
  
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  const id = Number(juzId);

  useEffect(() => {
      const loadJuz = async () => {
          setLoading(true);
          setError(null);
          if(!id || id < 1 || id > 30) {
              setError("Invalid Para Number");
              setLoading(false);
              return;
          }

          const result = await fetchJuz(id);
          if(result) {
              setData(result);
          } else {
              setError("API Connection Failed");
          }
          setLoading(false);
      };
      
      window.scrollTo(0,0);
      loadJuz();
  }, [id]);

  const goBack = () => {
    // Return to Para list tab
    navigate('/quran/read', { state: { tab: 'para' } }); 
  };

  if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-sand-50 dark:bg-gray-900">
            <div className="flex flex-col items-center gap-4 text-emerald-600">
                <Loader2 size={32} className="animate-spin" />
                <p>Loading Para {id}...</p>
            </div>
        </div>
      );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-sand-50 dark:bg-gray-900 text-center">
        <div className="max-w-sm bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-red-100 dark:border-red-900/30">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto text-red-500 mb-4">
                <Globe size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">API Connection Failed</h2>
            <p className="text-sm text-gray-500 mt-2">
                This feature requires the <strong>api.alquran.cloud</strong> service.
            </p>
            <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 text-left border border-emerald-100 dark:border-emerald-800">
                <strong>Preview Warning:</strong> If you are testing this in a browser preview/sandbox, this API call is likely blocked by CORS. The code is correct and will work on a real device.
            </div>
            <button onClick={goBack} className="mt-4 w-full py-2.5 rounded-xl font-bold text-white bg-emerald-600 shadow-lg shadow-emerald-200 dark:shadow-none">
                Back to List
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-gray-900 pb-20">
      <div className="sticky top-0 bg-sand-50/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-sand-200 dark:border-gray-800 z-50 px-4 py-3 shadow-sm flex items-center gap-4">
        <button 
          onClick={goBack}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 active:scale-95 transition"
        >
          <ArrowLeft size={24} className="text-secondary dark:text-gray-200" />
        </button>
        <div>
          <h1 className="font-bold text-lg text-primary dark:text-white">{JUZ_NAMES[id] || `Juz ${id}`}</h1>
          <p className="text-xs text-muted dark:text-gray-500 uppercase tracking-widest font-bold">Para {id}</p>
        </div>
      </div>

      <div className="max-w-md mx-auto pt-4 px-3">
        {data.map((surahSection, sIdx) => (
            <div key={sIdx} className="mb-8">
                {/* Surah Header in Juz View */}
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg mb-4 text-center border border-emerald-100 dark:border-emerald-800">
                    <h3 className="font-bold text-emerald-800 dark:text-emerald-300">{surahSection.surah.englishName}</h3>
                    <p className="text-xs text-emerald-600 dark:text-emerald-500 font-quran">{surahSection.surah.name}</p>
                </div>

                {surahSection.ayahs.map((ayah: any) => (
                    <div key={ayah.number} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-3">
                        <div className="flex justify-between items-center mb-3">
                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded font-bold">
                                {surahSection.surah.number}:{ayah.number}
                            </span>
                        </div>
                        
                        <p 
                            className="font-quran text-right text-gray-800 dark:text-gray-100 mb-4 leading-loose"
                            style={{ fontSize: `${fontSize}px` }}
                            dir="rtl"
                        >
                            {ayah.text}
                        </p>

                        <div className="space-y-3">
                            {visibleTranslations.en && ayah.translation?.en && (
                                <p className="text-sm text-gray-600 dark:text-gray-300 border-l-2 border-gray-200 pl-3">
                                    {ayah.translation.en}
                                </p>
                            )}
                            {visibleTranslations.ur && ayah.translation?.ur && (
                                <p className="text-lg font-urdu text-right text-gray-600 dark:text-gray-300 border-r-2 border-gray-200 pr-3" dir="rtl">
                                    {ayah.translation.ur}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        ))}
      </div>
      
      <div className="text-center py-8 text-xs text-gray-400 uppercase tracking-widest font-bold">
        End of Para {id}
      </div>
    </div>
  );
};

export default JuzReader;
