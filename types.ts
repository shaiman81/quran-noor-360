
export interface Ayah {
  number: number;
  text: string; // Arabic
  translation: {
    en: string;
    hi?: string;
    ur?: string;
  };
}

export interface SurahMeta {
  number: number;
  name: string; // Arabic Name
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Surah extends SurahMeta {
  ayahs: Ayah[];
}

// Para/Juz Mapping Types
export interface JuzSegment {
  surah: number;
  start: number; // Start Ayah
  end: number;   // End Ayah
}

// --- CONTENT TYPES (Now with CMS fields) ---

export type ContentStatus = 'draft' | 'published';

export interface Dua {
  id: string;
  status: ContentStatus;
  priority: number; // For ordering
  category: 'morning' | 'night' | 'travel' | 'stress' | 'success' | 'general' | 'jummah';
  title: string;
  arabic: string;
  transliteration?: string;
  translation: string; // English
  translationUrdu?: string; // NEW
  reference?: string;
  isFavorite?: boolean;
}

export interface Hadith {
  id: string;
  status: ContentStatus;
  priority: number;
  source: string;
  arabic?: string;
  text: string; // English
  translationUrdu?: string; // NEW
  category: string;
}

export interface ManzilItem {
  id: string;
  status: ContentStatus;
  order: number; 
  name: string; 
  arabic: string;
  translation: string; // English
  translationUrdu?: string; // NEW
}

export interface AzkarItem {
  id: string;
  status: ContentStatus;
  priority: number;
  category: 'morning' | 'evening' | 'general';
  title: string;
  arabic: string;
  translation: string; // English
  translationUrdu?: string; // NEW
  reference?: string;
  count?: number; 
}

// --- NEW FEATURE: 6 KALIMAS ---
export interface Kalima {
  id: string;
  order: number;
  status: ContentStatus;
  title: string; // e.g., "First Kalima (Tayyab)"
  arabic: string;
  transliteration: string;
  translationEn: string;
  translationUrdu: string;
}

// --- NEW: 99 NAMES TYPES ---
export interface AllahName {
  id: string;
  order: number;
  active: boolean;
  arabic: string;
  transliteration: string;
  meaning: {
    en: string;
    ur: string;
  };
  desc?: string; 
  createdAt: number;
}

export type Language = 'en' | 'hi' | 'ur';

export interface VisibleTranslations {
  en: boolean;
  hi: boolean;
  ur: boolean;
}

export interface BookmarkItem {
  id: string;
  surah: number;
  ayah: number;
  timestamp: number;
}

export interface SettingsState {
  theme: 'light' | 'dark';
  fontSize: number; 
  language: Language;
  visibleTranslations: VisibleTranslations;
  bookmarkedSurah?: number; 
  bookmarkedAyah?: number; 
  lastReadJuz?: number; 
  favorites: number[]; 
  bookmarks: BookmarkItem[]; 
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

// --- ADMIN & DYNAMIC CONTENT TYPES ---

export interface QuranPdf {
  id: string;
  title: string;
  description: string;
  url: string; 
  active: boolean;
  createdAt: number;
}

export interface Announcement {
  enabled: boolean;
  text: string;
  startDate?: string;
  endDate?: string;
}

export interface DonationConfig {
  upiId: string;
  supportMessage: string;
  qrCodeImage?: string; 
  enabledApps: {
    gpay: boolean;
    phonepe: boolean;
    paytm: boolean;
    bhim: boolean;
  };
}

export interface HomeHighlightConfig {
    enabled: boolean;
    type: 'dua' | 'hadith' | 'ayah';
    title: string;
    arabic: string;
    translation: string; // English
    translationUrdu?: string; // NEW
    reference: string;
}

export interface HomeConfig {
  welcomeText: string; 
  showNotice: boolean;
  noticeText: string;
  highlight: HomeHighlightConfig;
}

export interface DailyReminder {
  enabled: boolean;
  text: string;
  arabic?: string;
  translation: string;
  time: string; 
}

export interface FeatureFlags {
  dua: boolean;
  hadith: boolean;
  tasbeeh: boolean;
  dailyReminder: boolean;
  juz: boolean; 
  jummah: boolean;
  qibla: boolean; 
  names99: boolean; 
  kalima: boolean; // NEW
}

export interface PrayerConfig {
  calculationMethod: 'MWL' | 'Egyptian' | 'Karachi' | 'UmmAlQura' | 'Dubai' | 'Moonsighting' | 'NorthAmerica' | 'Tehran';
  madhab: 'hanafi' | 'shafi';
}

export interface JummahConfig {
    enabled: boolean;
    highlightTitle: string;
    highlightMessage: string;
    checklist: string[]; 
    recommendedSurahs: number[]; 
    extraReadings: { title: string; text: string }[]; 
}

export interface AppContentState {
  duas: Dua[];
  hadiths: Hadith[];
  manzil: ManzilItem[];
  azkar: AzkarItem[];
  kalimas: Kalima[]; // NEW
  quranPdfs: QuranPdf[];
  allahNames: AllahName[]; 
  announcement: Announcement;
  donationConfig: DonationConfig;
  homeConfig: HomeConfig;
  dailyReminder: DailyReminder;
  featureFlags: FeatureFlags;
  adminPasswordHash: string; 
  lastLogin?: number;
  uploadedSurahs: Record<number, Surah>;
  juzMap: Record<number, JuzSegment[]>; 
  prayerConfig: PrayerConfig;
  jummahConfig: JummahConfig;
}
