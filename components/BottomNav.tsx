
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Home, Settings, Moon } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

// Custom Mosque Icon (4 Minarets + Central Dome)
const MosqueIcon = ({ size, ...props }: any) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    {/* Base Floor */}
    <path d="M2 21h20" />
    
    {/* Outer Tall Minarets */}
    <path d="M4 21V8l-1.5-2" />
    <path d="M20 21V8l1.5-2" />
    
    {/* Inner Short Minarets */}
    <path d="M7 21v-7l-1-1.5" />
    <path d="M17 21v-7l1-1.5" />
    
    {/* Central Dome Structure */}
    <path d="M8 14h8v7" /> {/* Walls of main hall (partial) */}
    <path d="M8 14c0-3 1.5-5 4-5s4 2 4 5" /> {/* Dome */}
    <path d="M12 9V7" /> {/* Spire on dome */}
    
    {/* Door */}
    <path d="M10 21v-3a2 2 0 0 1 4 0v3" />
  </svg>
);

const BottomNav: React.FC = () => {
  const { t } = useSettings();

  const navItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/quran', icon: BookOpen, label: t('quran') },
    { path: '/library', icon: MosqueIcon, label: "Ibadat" },
    { path: '/jummah', icon: Moon, label: "Jummah" },
    { path: '/settings', icon: Settings, label: t('settings') },
  ];

  return (
    <nav className="px-4 pb-6 pt-0">
        {/* Glassmorphic Floating Bar */}
        <div className="
            relative 
            bg-gray-900/90 
            backdrop-blur-xl
            border border-white/10
            rounded-3xl 
            shadow-premium
            flex justify-between items-center 
            h-[80px] 
            px-2
        ">
            {navItems.map((item) => (
            <NavLink
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center w-full h-full group"
            >
                {({ isActive }) => (
                <>
                    <div className={`
                        mb-1 transition-transform duration-300
                        ${isActive ? '-translate-y-1' : ''}
                    `}>
                        <item.icon 
                            size={22} 
                            strokeWidth={isActive ? 2.5 : 2} 
                            className={`transition-colors duration-300 ${
                                isActive 
                                ? 'text-gold-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' 
                                : 'text-gray-400 group-hover:text-gray-200'
                            }`}
                            fill={isActive ? "currentColor" : "none"}
                            fillOpacity={isActive ? 0.2 : 0}
                        />
                    </div>
                    
                    <span className={`
                        text-[10px] font-bold tracking-wide transition-all duration-300
                        ${isActive ? 'text-white opacity-100 translate-y-0' : 'text-gray-500 opacity-70 group-hover:text-gray-300'}
                    `}>
                        {item.label}
                    </span>

                    {/* Active Glow Dot */}
                    <div className={`
                        absolute bottom-2 w-1 h-1 rounded-full bg-gold-400 shadow-[0_0_5px_rgba(251,191,36,1)] transition-all duration-300
                        ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                    `}></div>
                </>
                )}
            </NavLink>
            ))}
        </div>
    </nav>
  );
};

export default BottomNav;
