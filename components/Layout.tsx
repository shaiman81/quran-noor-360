
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import ReaderSettingsSheet from './ReaderSettingsSheet';
import { useSettings } from '../context/SettingsContext';

const Layout: React.FC = () => {
  const { 
    isSettingsSheetOpen, setSettingsSheetOpen,
    fontSize, setFontSize,
    visibleTranslations, toggleTranslation
  } = useSettings();
  
  const location = useLocation();

  return (
    <div className="flex flex-col h-[100dvh] relative overflow-hidden font-sans text-gray-900 dark:text-gray-100 transition-colors duration-500">
      
      {/* 
         GLOBAL BACKGROUND 
         Rich Gradient + Subtle Islamic Pattern
      */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-gray-950"></div>
      <div className="fixed inset-0 pointer-events-none z-0 bg-islamic-pattern opacity-30 mix-blend-overlay"></div>

      {/* Main Scrollable Area */}
      <main className="flex-1 overflow-y-auto w-full max-w-md mx-auto relative z-10 no-scrollbar pb-28 pt-safe-top overscroll-contain">
        <Outlet />
      </main>
      
      {/* Navigation Layer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
            <BottomNav />
        </div>
      </div>
      
      <ReaderSettingsSheet 
        isOpen={isSettingsSheetOpen}
        onClose={() => setSettingsSheetOpen(false)}
        fontSize={fontSize}
        setFontSize={setFontSize}
        visibleTranslations={visibleTranslations}
        toggleTranslation={toggleTranslation}
      />
    </div>
  );
};

export default Layout;
