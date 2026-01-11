
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { ContentProvider } from './context/ContentContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import QuranList from './pages/QuranList'; 
import SurahIndex from './pages/SurahIndex'; 
import QuranReader from './pages/QuranReader';
import JuzReader from './pages/JuzReader';
import PdfViewer from './pages/PdfViewer';
import DuaList from './pages/DuaList';
import HadithList from './pages/HadithList';
import Tasbeeh from './pages/Tasbeeh';
import Library from './pages/Library';
import ManzilList from './pages/ManzilList';
import AzkarList from './pages/AzkarList';
import KalimaList from './pages/KalimaList'; // NEW
import SettingsPage from './pages/SettingsPage';
import Donate from './pages/Donate';
import InfoPage from './pages/InfoPage';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import PrayerTimesPage from './pages/PrayerTimes';
import QiblaCompass from './pages/QiblaCompass';
import Jummah from './pages/Jummah';
import NamesList from './pages/NamesList';

const AppInitializer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasInitialized = React.useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
        hasInitialized.current = true;
        const isPublicRoute = location.pathname === '/' || location.pathname.startsWith('/quran') || location.pathname.startsWith('/library');
        const isAdminRoute = location.pathname.startsWith('/admin');

        if (!isPublicRoute && !isAdminRoute) {
            setTimeout(() => {
                navigate('/', { replace: true });
            }, 0);
        }
    }
  }, [navigate, location]);

  return null;
};

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <ContentProvider>
        <HashRouter>
          <AppInitializer />
          <Routes>
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              
              <Route path="quran" element={<QuranList />} /> 
              <Route path="quran/read" element={<SurahIndex />} /> 
              <Route path="quran/:surahId" element={<QuranReader />} /> 
              <Route path="quran/pdf/:id" element={<PdfViewer />} /> 
              <Route path="juz/:juzId" element={<JuzReader />} />

              <Route path="library" element={<Library />} />
              <Route path="dua" element={<DuaList />} />
              <Route path="hadith" element={<HadithList />} />
              <Route path="manzil" element={<ManzilList />} />
              <Route path="azkar" element={<AzkarList />} />
              <Route path="kalima" element={<KalimaList />} /> 
              <Route path="tasbeeh" element={<Tasbeeh />} />
              <Route path="prayer-times" element={<PrayerTimesPage />} />
              <Route path="qibla" element={<QiblaCompass />} />
              <Route path="jummah" element={<Jummah />} />
              <Route path="names99" element={<NamesList />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="donate" element={<Donate />} />
              <Route path="info/:section" element={<InfoPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </HashRouter>
      </ContentProvider>
    </SettingsProvider>
  );
};

export default App;
