
import React, { useState, useEffect } from 'react';
import { Copy, Check, Lock, Search, ArrowLeft } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 'all', label: 'All', color: 'bg-gray-100' },
  { id: 'morning', label: 'Morning', color: 'bg-orange-100 text-orange-700' },
  { id: 'night', label: 'Night', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'travel', label: 'Travel', color: 'bg-blue-100 text-blue-700' },
  { id: 'stress', label: 'Stress', color: 'bg-purple-100 text-purple-700' },
  { id: 'success', label: 'Success', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'general', label: 'General', color: 'bg-gray-100' },
];

const DuaList: React.FC = () => {
  const { duas, featureFlags } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const [selectedCategory, setSelectedCategory] = useState(() => {
      return sessionStorage.getItem('dua_category') || 'all';
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const scrollPos = sessionStorage.getItem('dua_scroll_pos');
    if (scrollPos) window.scrollTo(0, parseInt(scrollPos));
    return () => sessionStorage.setItem('dua_scroll_pos', window.scrollY.toString());
  }, []);

  useEffect(() => {
      sessionStorage.setItem('dua_category', selectedCategory);
  }, [selectedCategory]);

  if (!featureFlags.dua) {
      return (
          <div className="min-h-screen flex items-center justify-center p-6 text-center text-muted">
              <Lock size={48} className="mb-4 text-gray-300" />
              <p>This section is currently disabled.</p>
          </div>
      )
  }

  const filteredDuas = duas.filter(d => {
      const isPublished = d.status === 'published';
      const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
      const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            d.translation.toLowerCase().includes(searchTerm.toLowerCase());
      return isPublished && matchesCategory && matchesSearch;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-gray-900 pb-32">
      <div className="sticky top-0 z-20 bg-sand-50/95 dark:bg-gray-900/95 backdrop-blur-md px-4 py-4 border-b border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-3">
         <button onClick={() => navigate('/library')} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
             <ArrowLeft size={20} className="text-secondary dark:text-gray-300" />
         </button>
         <h1 className="text-xl font-bold font-serif text-primary dark:text-white">Daily Adhkar & Dua</h1>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                <Search size={18} />
            </div>
            <input 
                type="text" 
                placeholder="Search Duas..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none text-primary dark:text-white transition-all font-medium placeholder-gray-400"
            />
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {categories.map(cat => (
            <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                    px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300
                    ${selectedCategory === cat.id
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-none scale-105'
                        : 'bg-white dark:bg-gray-800 text-secondary dark:text-gray-400 border border-gray-100 dark:border-gray-700 hover:bg-gray-50'
                    }
                `}
            >
                {cat.label}
            </button>
            ))}
        </div>

        <div className="space-y-4">
            {filteredDuas.map(dua => (
            <div key={dua.id} className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-soft border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
                <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    categories.find(c => c.id === dua.category)?.color?.replace('bg-', 'bg-opacity-20 bg-') || 'bg-gray-100 text-gray-500'
                } dark:bg-opacity-10`}>
                    {dua.category}
                </span>
                <button 
                    onClick={() => handleCopy(`${dua.arabic}\n\n${dua.translation}`, dua.id)}
                    className="text-gray-300 hover:text-emerald-600 transition p-1"
                >
                    {copiedId === dua.id ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                </button>
                </div>
                
                <h3 className="font-bold text-lg text-primary dark:text-white mb-4">{dua.title}</h3>

                <p className="font-quran text-2xl text-right leading-loose mb-4 text-primary dark:text-emerald-300" dir="rtl">{dua.arabic}</p>
                
                {dua.transliteration && (
                <p className="text-xs text-emerald-700 dark:text-emerald-400 italic mb-2 font-semibold">{dua.transliteration}</p>
                )}
                
                {/* PREFER URDU TRANSLATION AS REQUESTED */}
                {dua.translationUrdu ? (
                     <p className="font-urdu text-lg text-secondary dark:text-gray-300 leading-loose mb-3 text-right" dir="rtl">{dua.translationUrdu}</p>
                ) : (
                    <p className="text-sm text-secondary dark:text-gray-300 leading-relaxed mb-3 font-medium">{dua.translation}</p>
                )}
                
                <div className="text-right border-t border-gray-100 dark:border-gray-700 pt-3">
                    <p className="text-[10px] text-muted dark:text-gray-500 font-bold uppercase tracking-wider">{dua.reference}</p>
                </div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DuaList;
