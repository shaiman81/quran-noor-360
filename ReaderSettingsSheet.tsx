
import React from 'react';
import { Settings2, X, Type, Languages, Check } from 'lucide-react';
import { VisibleTranslations } from '../types';

interface ReaderSettingsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  visibleTranslations: VisibleTranslations;
  toggleTranslation: (lang: keyof VisibleTranslations) => void;
}

const ReaderSettingsSheet: React.FC<ReaderSettingsSheetProps> = ({ 
  isOpen, 
  onClose,
  fontSize,
  setFontSize,
  visibleTranslations,
  toggleTranslation
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]" 
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl z-[70] p-6 shadow-2xl max-w-md mx-auto animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg flex items-center gap-2 text-gray-800 dark:text-gray-100">
            <Settings2 size={20} /> Reader Settings
          </h3>
          <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300">
            <X size={18}/>
          </button>
        </div>

        <div className="mb-8">
          <label className="text-sm font-bold text-gray-500 uppercase mb-3 block flex items-center gap-2">
            <Type size={16} /> Arabic Font Size
          </label>
          <div className="flex items-center gap-4">
            <span className="text-lg font-quran text-gray-800 dark:text-gray-200">ا</span>
            <input 
              type="range" 
              min="20" 
              max="60" 
              value={fontSize} 
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <span className="text-3xl font-quran text-gray-800 dark:text-gray-200">ا</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-gray-500 uppercase mb-3 block flex items-center gap-2">
            <Languages size={16} /> Translations
          </label>
          <div className="space-y-3">
            <TranslationToggle 
              label="English" 
              isActive={visibleTranslations.en} 
              onClick={() => toggleTranslation('en')} 
            />
            <TranslationToggle 
              label="Urdu (اردو)" 
              isActive={visibleTranslations.ur} 
              onClick={() => toggleTranslation('ur')} 
            />
            <TranslationToggle 
              label="Hindi (हिंदी)" 
              isActive={visibleTranslations.hi} 
              onClick={() => toggleTranslation('hi')} 
            />
          </div>
        </div>
      </div>
    </>
  );
};

const TranslationToggle: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex justify-between items-center p-4 rounded-xl border transition-all ${
      isActive 
      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-800 dark:text-emerald-400' 
      : 'bg-gray-50 dark:bg-gray-800 border-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`}
  >
    <span className="font-medium">{label}</span>
    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isActive ? 'bg-emerald-500 text-white' : 'bg-gray-300 dark:bg-gray-700'}`}>
      {isActive && <Check size={14} strokeWidth={3} />}
    </div>
  </button>
);

export default ReaderSettingsSheet;
