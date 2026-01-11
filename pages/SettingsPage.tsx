
import React from 'react';
import { 
  Moon, Sun, Globe, Shield, Type, Heart, 
  Info, AlertTriangle, FileText, Lock, Mail, ChevronRight, Settings, Users
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { Link, useNavigate } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  const { 
    theme, setTheme, 
    language, setLanguage, 
    fontSize, setFontSize,
    t 
  } = useSettings();
  const navigate = useNavigate();

  return (
    <div className="px-6 pt-8 pb-32 min-h-screen">
      <h1 className="text-3xl font-serif font-bold mb-8 text-white tracking-tight drop-shadow-sm">{t('settings_title')}</h1>

      {/* 1. PREFERENCES GROUP */}
      <div className="space-y-6 mb-10">
        <h2 className="text-xs font-bold text-gray-300 uppercase tracking-widest pl-2">Preferences</h2>
        <div className="bg-white dark:bg-gray-800 rounded-[24px] shadow-premium border border-gray-50 dark:border-gray-800 overflow-hidden">
            
            {/* Language */}
            <div className="p-5 border-b border-gray-50 dark:border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Globe size={16} />
                        </div>
                        <span className="font-bold text-sm text-primary dark:text-white">Language</span>
                    </div>
                </div>
                <div className="flex p-1 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    {['en', 'ur', 'hi'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang as any)}
                            className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                                language === lang 
                                ? 'bg-white dark:bg-gray-600 text-primary dark:text-white shadow-sm ring-1 ring-black/5' 
                                : 'text-muted hover:text-secondary dark:hover:text-gray-300'
                            }`}
                        >
                            {lang === 'en' ? 'English' : lang === 'ur' ? 'اردو' : 'हिंदी'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Theme */}
            <div className="p-5 border-b border-gray-50 dark:border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                            <Moon size={16} />
                        </div>
                        <span className="font-bold text-sm text-primary dark:text-white">Appearance</span>
                    </div>
                </div>
                <div className="flex p-1 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <button
                        onClick={() => setTheme('light')}
                        className={`flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                        theme === 'light' ? 'bg-white text-primary shadow-sm ring-1 ring-black/5' : 'text-muted'
                        }`}
                    >
                        <Sun size={14} /> Light
                    </button>
                    <button
                        onClick={() => setTheme('dark')}
                        className={`flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                        theme === 'dark' ? 'bg-gray-600 text-white shadow-sm' : 'text-muted'
                        }`}
                    >
                        <Moon size={14} /> Dark
                    </button>
                </div>
            </div>

            {/* Font Size */}
            <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <Type size={16} />
                        </div>
                        <span className="font-bold text-sm text-primary dark:text-white">Arabic Size</span>
                    </div>
                    <span className="text-xs font-mono text-muted bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-medium">{fontSize}px</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-quran text-muted">ا</span>
                    <input 
                        type="range" 
                        min="20" 
                        max="60" 
                        value={fontSize} 
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-emerald-600"
                    />
                    <span className="text-2xl font-quran text-primary dark:text-white">ا</span>
                </div>
            </div>
        </div>
      </div>

      {/* 2. SUPPORT & INFO GROUP */}
      <div className="space-y-6">
        <h2 className="text-xs font-bold text-gray-300 uppercase tracking-widest pl-2">App & Legal</h2>
        <div className="bg-white dark:bg-gray-800 rounded-[24px] shadow-premium border border-gray-50 dark:border-gray-800 overflow-hidden divide-y divide-gray-50 dark:divide-gray-800">
            <ListItem to="/donate" icon={Heart} color="text-rose-500" bg="bg-rose-50 dark:bg-rose-900/20" label="Support Development" subLabel="Optional Donation" />
            <ListItem to="/info/about" icon={Info} color="text-blue-500" bg="bg-blue-50 dark:bg-blue-900/20" label="About Noor 360" />
            <ListItem to="/info/privacy" icon={Shield} color="text-emerald-500" bg="bg-emerald-50 dark:bg-emerald-900/20" label="Privacy Policy" />
            <ListItem to="/info/contact" icon={Mail} color="text-purple-500" bg="bg-purple-50 dark:bg-purple-900/20" label="Contact Us" />
        </div>
      </div>

      <div className="text-center text-[10px] font-bold text-gray-400 dark:text-gray-600 mt-8 uppercase tracking-widest">
          Version 1.0.0
      </div>
    </div>
  );
};

const ListItem = ({ to, icon: Icon, color, bg, label, subLabel }: any) => (
    <Link to={to} className="flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group">
        <div className="flex items-center gap-4">
            <div className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center ${color}`}>
                <Icon size={18} />
            </div>
            <div>
                <span className="font-bold text-sm text-primary dark:text-white block">{label}</span>
                {subLabel && <span className="text-[10px] text-muted font-medium">{subLabel}</span>}
            </div>
        </div>
        <ChevronRight size={16} className="text-gray-300 dark:text-gray-600 group-hover:text-emerald-500 transition-colors" />
    </Link>
);

export default SettingsPage;
