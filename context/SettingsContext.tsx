
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SettingsState, Language, VisibleTranslations, BookmarkItem } from '../types';

// Localization Dictionary
const translations = {
  en: {
    home: "Home",
    quran: "Quran",
    tasbeeh: "Tasbeeh",
    ask_ai: "Noor AI",
    settings: "Settings",
    daily_reminder: "Daily Reminder",
    continue_reading: "Continue Reading",
    search_surah: "Search Surah...",
    surah_not_found: "No Surah found",
    settings_title: "Settings",
    appearance: "Appearance",
    font_size: "Arabic Font Size",
    language: "App Language",
    translations: "Translations",
    donate: "Support Us",
    light: "Light",
    dark: "Dark",
    bookmarks: "Bookmarks",
    favorites: "Favorites",
    go_to_bookmark: "Go to saved ayah",
    download_required: "Content download required for this Surah"
  },
  ur: {
    home: "ہوم",
    quran: "قرآن",
    tasbeeh: "تسبیح",
    ask_ai: "نور AI",
    settings: "ترتیبات",
    daily_reminder: "آج کا پیغام",
    continue_reading: "تلاوت جاری رکھیں",
    search_surah: "سیرت تلاش کریں...",
    surah_not_found: "کوئی سورہ نہیں ملی",
    settings_title: "ترتیبات",
    appearance: "ظاہری شکل",
    font_size: "عربی فونٹ کا سائز",
    language: "ایپ کی زبان",
    translations: "ترجمہ",
    donate: "تعاون کریں",
    light: "لائٹ",
    dark: "ڈارک",
    bookmarks: "بک مارکس",
    favorites: "پسندیدہ",
    go_to_bookmark: "محفوظ شدہ آیت",
    download_required: "اس سورہ کے لیے ڈاؤن لوڈ درکار ہے"
  },
  hi: {
    home: "होम",
    quran: "कुरान",
    tasbeeh: "तस्बीह",
    ask_ai: "नूर AI",
    settings: "सेटिंग्स",
    daily_reminder: "आज का पैगाम",
    continue_reading: "पढ़ना जारी रखें",
    search_surah: "सूरह खोजें...",
    surah_not_found: "कोई सूरह नहीं मिली",
    settings_title: "सेटिंग्स",
    appearance: "दिखावट",
    font_size: "अरबी फ़ॉन्ट आकार",
    language: "ऐप की भाषा",
    translations: "अनुवाद",
    donate: "सहयोग करें",
    light: "लाइट",
    dark: "डार्क",
    bookmarks: "बुकमार्क",
    favorites: "पसंदीदा",
    go_to_bookmark: "सेव की गई आयत",
    download_required: "इस सूरह के लिए डाउनलोड आवश्यक है"
  }
};

interface SettingsContextType extends SettingsState {
  t: (key: keyof typeof translations['en']) => string;
  setTheme: (theme: 'light' | 'dark') => void;
  setFontSize: (size: number) => void;
  setLanguage: (lang: Language) => void;
  toggleTranslation: (lang: keyof VisibleTranslations) => void;
  setLastRead: (surah: number, ayah: number) => void; // Replaced setBookmark
  addBookmark: (surah: number, ayah: number) => void;
  removeBookmark: (id: string) => void;
  toggleFavorite: (surah: number) => void;
  setLastReadJuz: (juz: number) => void;
  isSettingsSheetOpen: boolean;
  setSettingsSheetOpen: (isOpen: boolean) => void;
}

const defaultSettings: SettingsState = {
  theme: 'light',
  fontSize: 28, // Default comfortable reading size
  language: 'en',
  visibleTranslations: { en: true, ur: false, hi: false },
  favorites: [],
  bookmarks: []
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettingsState] = useState<SettingsState>(() => {
    const saved = localStorage.getItem('appSettings_v3');
    const parsed = saved ? JSON.parse(saved) : defaultSettings;
    // Migration for new fields
    return { ...defaultSettings, ...parsed };
  });

  const [isSettingsSheetOpen, setSettingsSheetOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('appSettings_v3', JSON.stringify(settings));
    
    // Apply theme
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const setTheme = (theme: 'light' | 'dark') => setSettingsState(prev => ({ ...prev, theme }));
  const setFontSize = (fontSize: number) => setSettingsState(prev => ({ ...prev, fontSize }));
  const setLanguage = (language: Language) => setSettingsState(prev => ({ ...prev, language }));
  
  const toggleTranslation = (lang: keyof VisibleTranslations) => {
    setSettingsState(prev => ({
      ...prev,
      visibleTranslations: { ...prev.visibleTranslations, [lang]: !prev.visibleTranslations[lang] }
    }));
  };

  // Legacy single bookmark "Continue Reading"
  const setLastRead = (surah: number, ayah: number) => {
    setSettingsState(prev => ({ ...prev, bookmarkedSurah: surah, bookmarkedAyah: ayah }));
  };

  // New Multi-Bookmark System
  const addBookmark = (surah: number, ayah: number) => {
    setSettingsState(prev => {
        // Prevent duplicates for same ayah
        if (prev.bookmarks.some(b => b.surah === surah && b.ayah === ayah)) return prev;
        
        const newBookmark: BookmarkItem = {
            id: Date.now().toString(),
            surah,
            ayah,
            timestamp: Date.now()
        };
        return { ...prev, bookmarks: [newBookmark, ...prev.bookmarks] };
    });
  };

  const removeBookmark = (id: string) => {
      setSettingsState(prev => ({
          ...prev,
          bookmarks: prev.bookmarks.filter(b => b.id !== id)
      }));
  };

  const toggleFavorite = (surah: number) => {
      setSettingsState(prev => {
          const isFav = prev.favorites.includes(surah);
          return {
              ...prev,
              favorites: isFav 
                ? prev.favorites.filter(id => id !== surah) 
                : [...prev.favorites, surah]
          };
      });
  };

  const setLastReadJuz = (juz: number) => {
    setSettingsState(prev => ({ ...prev, lastReadJuz: juz }));
  };

  // Translation helper function
  const t = (key: keyof typeof translations['en']) => {
    return translations[settings.language][key] || translations['en'][key];
  };

  return (
    <SettingsContext.Provider value={{ 
        ...settings, 
        t, setTheme, setFontSize, setLanguage, toggleTranslation, 
        setLastRead, setLastReadJuz,
        addBookmark, removeBookmark, toggleFavorite,
        isSettingsSheetOpen, setSettingsSheetOpen
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
