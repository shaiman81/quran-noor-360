
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
    AppContentState, Dua, Hadith, Announcement, DonationConfig, 
    HomeConfig, DailyReminder, FeatureFlags, JuzSegment, PrayerConfig, JummahConfig, ManzilItem, AzkarItem, QuranPdf, AllahName, Kalima
} from '../types';
import { DUAS, HADITHS, MANZIL_DATA, AZKAR_DATA } from '../data/content';
import { JUZ_MAP as DEFAULT_JUZ_MAP } from '../data/juz_meta';
import { db, auth } from '../services/firebase';
import { 
    doc, onSnapshot, updateDoc, setDoc, 
    collection, addDoc, deleteDoc, query, orderBy 
} from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Default Fallback State
const defaultContent: AppContentState = {
  duas: DUAS.map(d => ({...d, status: 'published', priority: 0})),
  hadiths: HADITHS.map(h => ({...h, status: 'published', priority: 0})),
  manzil: MANZIL_DATA,
  azkar: AZKAR_DATA,
  kalimas: [], // Initial state
  quranPdfs: [],
  allahNames: [], 
  announcement: {
    enabled: false,
    text: "Ramadan Mubarak! Join our special night prayers.",
  },
  donationConfig: {
    upiId: "example@upi",
    supportMessage: "This app is developed to serve the Ummah. Your contribution helps keep the servers running.",
    enabledApps: { gpay: true, phonepe: true, paytm: true, bhim: true }
  },
  homeConfig: {
    welcomeText: "Assalamu Alaikum",
    showNotice: false,
    noticeText: "",
    highlight: {
        enabled: true,
        type: 'ayah',
        title: "Verse of the Day",
        arabic: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
        translation: "For indeed, with hardship [will be] ease.",
        translationUrdu: "پس یقیناً مشکل کے ساتھ آسانی ہے۔",
        reference: "Quran 94:5"
    }
  },
  dailyReminder: {
    enabled: true,
    text: "The best among you are those who have the best manners.",
    arabic: "إِنَّ مِنْ خِيَارِكُمْ أَحْلَاقًا",
    translation: "Verily, the best of you are the best in character.",
    time: "08:00",
  },
  featureFlags: {
    dua: true, hadith: true, tasbeeh: true,
    dailyReminder: true, juz: true, jummah: true, qibla: true, names99: true,
    kalima: true
  },
  adminPasswordHash: "", 
  uploadedSurahs: {}, 
  juzMap: DEFAULT_JUZ_MAP,
  prayerConfig: { calculationMethod: 'Karachi', madhab: 'hanafi' },
  jummahConfig: {
      enabled: true,
      highlightTitle: "It's Jummah!",
      highlightMessage: "Don't forget to read Surah Al-Kahf.",
      checklist: ["Ghusl", "Clean Clothes", "Miswak", "Itar", "Surah Kahf", "Durood"],
      recommendedSurahs: [18, 62, 63],
      extraReadings: [{ title: "Durood Shareef", text: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ" }]
  }
};

interface ContentContextType extends AppContentState {
  isAdmin: boolean;
  loading: boolean;
  loginAdmin: (email: string, pass: string) => Promise<void>;
  
  updateDuas: (duas: Dua[]) => Promise<void>;
  updateHadiths: (hadiths: Hadith[]) => Promise<void>;
  updateManzil: (manzil: ManzilItem[]) => Promise<void>;
  updateAzkar: (azkar: AzkarItem[]) => Promise<void>;
  updateKalimas: (kalimas: Kalima[]) => Promise<void>; // NEW
  updateQuranPdfs: (pdfs: QuranPdf[]) => Promise<void>;
  updateAllahNames: (names: AllahName[]) => Promise<void>;
  
  updateAnnouncement: (data: Announcement) => Promise<void>;
  updateDonationConfig: (data: DonationConfig) => Promise<void>;
  updateHomeConfig: (data: HomeConfig) => Promise<void>;
  updateDailyReminder: (data: DailyReminder) => Promise<void>;
  updateFeatureFlags: (data: FeatureFlags) => Promise<void>;
  updateJummahConfig: (config: JummahConfig) => Promise<void>;
  updateJuzMap: (map: Record<number, JuzSegment[]>) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<AppContentState>(defaultContent);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Data Listeners (Firestore) - Public Read Only
  useEffect(() => {
    const unsubscribers: (() => void)[] = [];

    const safeOnSnapshot = (ref: any, callback: (snap: any) => void) => {
        const unsub = onSnapshot(ref, callback, (error: any) => {
            console.warn(`Firestore Error:`, error.code);
        });
        unsubscribers.push(unsub);
        return unsub;
    };

    // A. Config Listener
    const configRef = doc(db, "app_content", "main_config");
    safeOnSnapshot(configRef, (docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            setContent(prev => ({
                ...prev,
                ...data,
                featureFlags: { ...prev.featureFlags, ...data.featureFlags },
                homeConfig: { ...prev.homeConfig, ...data.homeConfig },
                highlight: { ...prev.homeConfig.highlight, ...data.homeConfig?.highlight },
                dailyReminder: { ...prev.dailyReminder, ...data.dailyReminder },
                jummahConfig: { ...prev.jummahConfig, ...data.jummahConfig },
                juzMap: data.juzMap || prev.juzMap
            }));
        }
        setLoading(false);
    });

    // B. Collections
    const qDuas = query(collection(db, "duas"), orderBy("priority", "desc")); 
    safeOnSnapshot(qDuas, (snapshot) => {
        const list: Dua[] = [];
        snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() } as Dua));
        if(list.length > 0) setContent(prev => ({ ...prev, duas: list }));
    });

    const qHadith = query(collection(db, "hadiths"), orderBy("priority", "desc"));
    safeOnSnapshot(qHadith, (snapshot) => {
        const list: Hadith[] = [];
        snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() } as Hadith));
        if(list.length > 0) setContent(prev => ({ ...prev, hadiths: list }));
    });

    const qManzil = query(collection(db, "manzil"), orderBy("order", "asc"));
    safeOnSnapshot(qManzil, (snapshot) => {
        const list: ManzilItem[] = [];
        snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() } as ManzilItem));
        if(list.length > 0) setContent(prev => ({ ...prev, manzil: list }));
    });

    const qAzkar = query(collection(db, "azkar"), orderBy("priority", "desc"));
    safeOnSnapshot(qAzkar, (snapshot) => {
        const list: AzkarItem[] = [];
        snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() } as AzkarItem));
        if(list.length > 0) setContent(prev => ({ ...prev, azkar: list }));
    });

    const qKalima = query(collection(db, "kalimas"), orderBy("order", "asc"));
    safeOnSnapshot(qKalima, (snapshot) => {
        const list: Kalima[] = [];
        snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() } as Kalima));
        if(list.length > 0) setContent(prev => ({ ...prev, kalimas: list }));
    });

    const qPdfs = query(collection(db, "quran_pdfs"), orderBy("createdAt", "desc"));
    safeOnSnapshot(qPdfs, (snapshot) => {
        const list: QuranPdf[] = [];
        snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() } as QuranPdf));
        setContent(prev => ({ ...prev, quranPdfs: list }));
    });

    const qNames = query(collection(db, "allah_names"), orderBy("order", "asc"));
    safeOnSnapshot(qNames, (snapshot) => {
        const list: AllahName[] = [];
        snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() } as AllahName));
        setContent(prev => ({ ...prev, allahNames: list }));
    });

    const safetyTimeout = setTimeout(() => setLoading(false), 3000);

    return () => {
        clearTimeout(safetyTimeout);
        unsubscribers.forEach(unsub => unsub());
    }
  }, []); 

  // --- Actions ---

  const loginAdmin = async (email: string, pass: string) => {
      await signInWithEmailAndPassword(auth, email, pass);
      setIsAdmin(true);
  };

  const safeWrite = async (operation: () => Promise<any>) => {
      if (!auth.currentUser) return; 
      try {
          await operation();
      } catch (e: any) {
          console.error("Write Operation Failed:", e);
      }
  };

  const updateConfigField = (field: string, data: any) => safeWrite(async () => {
      const ref = doc(db, "app_content", "main_config");
      await setDoc(ref, { [field]: data }, { merge: true });
  });

  const updateAnnouncement = (data: Announcement) => updateConfigField('announcement', data);
  const updateDonationConfig = (data: DonationConfig) => updateConfigField('donationConfig', data);
  const updateHomeConfig = (data: HomeConfig) => updateConfigField('homeConfig', data);
  const updateDailyReminder = (data: DailyReminder) => updateConfigField('dailyReminder', data);
  const updateFeatureFlags = (data: FeatureFlags) => updateConfigField('featureFlags', data);
  const updateJummahConfig = (data: JummahConfig) => updateConfigField('jummahConfig', data);
  const updateJuzMap = (data: Record<number, JuzSegment[]>) => updateConfigField('juzMap', data);

  const syncCollection = (collectionName: string, newItems: any[], currentItems: any[]) => safeWrite(async () => {
      for (const item of newItems) {
          const docRef = doc(db, collectionName, item.id);
          await setDoc(docRef, item);
      }
      const newIds = new Set(newItems.map(i => i.id));
      const oldIds = currentItems.map(i => i.id);
      for(const oldId of oldIds) {
          if(!newIds.has(oldId)) {
              await deleteDoc(doc(db, collectionName, oldId));
          }
      }
  });

  const updateDuas = (items: Dua[]) => syncCollection("duas", items, content.duas);
  const updateHadiths = (items: Hadith[]) => syncCollection("hadiths", items, content.hadiths);
  const updateManzil = (items: ManzilItem[]) => syncCollection("manzil", items, content.manzil);
  const updateAzkar = (items: AzkarItem[]) => syncCollection("azkar", items, content.azkar);
  const updateKalimas = (items: Kalima[]) => syncCollection("kalimas", items, content.kalimas); // NEW
  const updateQuranPdfs = (items: QuranPdf[]) => syncCollection("quran_pdfs", items, content.quranPdfs);
  const updateAllahNames = (items: AllahName[]) => syncCollection("allah_names", items, content.allahNames);

  const updatePrayerConfig = (config: PrayerConfig) => {
      setContent(prev => ({...prev, prayerConfig: config}));
  };
  
  const verifyAdminPassword = (p: string) => false;
  const updateAdminPassword = (p: string) => {};
  const uploadSurah = () => {};
  const resetContent = () => {};

  return (
    <ContentContext.Provider value={{
      ...content,
      isAdmin,
      adminUser: auth.currentUser,
      loading,
      loginAdmin,
      logoutAdmin: async () => {},
      updateDuas,
      updateHadiths,
      updateManzil,
      updateAzkar,
      updateKalimas, // NEW
      updateQuranPdfs,
      updateAllahNames,
      updateAnnouncement,
      updateDonationConfig,
      updateHomeConfig,
      updateDailyReminder,
      updateFeatureFlags,
      updateJummahConfig,
      updateJuzMap,
      updatePrayerConfig, 
      verifyAdminPassword,
      updateAdminPassword,
      uploadSurah,
      resetContent
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
};
