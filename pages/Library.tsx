
import React from 'react';
import { Link } from 'react-router-dom';
import { BookHeart, Bookmark, Shield, Sun, Hexagon } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Library: React.FC = () => {
    const { featureFlags } = useContent();

    return (
        <div className="p-6 space-y-6 animate-fade-in-up pb-32">
            <h1 className="text-3xl font-bold font-serif text-gray-900 dark:text-white mb-2">Ibadat</h1>
            <p className="text-gray-500 text-sm -mt-4">Daily Spiritual Tools</p>

            <div className="grid grid-cols-2 gap-4">
                
                {/* 1. Duas */}
                <LibraryCard 
                    to="/dua"
                    title="Duas"
                    desc="Daily Supplications"
                    icon={BookHeart}
                    color="rose"
                />

                {/* 2. Hadith */}
                <LibraryCard 
                    to="/hadith"
                    title="Hadith"
                    desc="Prophetic Wisdom"
                    icon={Bookmark}
                    color="blue"
                />

                {/* 3. Manzil */}
                <LibraryCard 
                    to="/manzil"
                    title="Manzil"
                    desc="Protection"
                    icon={Shield}
                    color="emerald"
                />

                {/* 4. Daily Azkar */}
                <LibraryCard 
                    to="/azkar"
                    title="Azkar"
                    desc="Morning/Evening"
                    icon={Sun}
                    color="orange"
                />

                {/* 5. 6 Kalimas (New Feature) */}
                {featureFlags.kalima && (
                    <LibraryCard 
                        to="/kalima"
                        title="6 Kalimas"
                        desc="Faith Fundamentals"
                        icon={Hexagon}
                        color="purple"
                    />
                )}

            </div>
        </div>
    );
};

const LibraryCard = ({ to, title, desc, icon: Icon, color }: any) => {
    const colorClasses: any = {
        rose: 'bg-rose-50 border-rose-100 text-rose-600 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-400',
        blue: 'bg-blue-50 border-blue-100 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400',
        emerald: 'bg-emerald-50 border-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400',
        orange: 'bg-orange-50 border-orange-100 text-orange-600 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400',
        purple: 'bg-purple-50 border-purple-100 text-purple-600 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-400',
    };

    return (
        <Link 
            to={to} 
            className={`p-5 rounded-3xl border shadow-sm flex flex-col justify-between h-40 relative overflow-hidden group active:scale-[0.98] transition-all ${colorClasses[color]}`}
        >
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110">
                <Icon size={64} />
            </div>

            <div className="w-10 h-10 rounded-2xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-2 relative z-10">
                <Icon size={20} />
            </div>

            <div className="relative z-10">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 leading-tight">
                    {title}
                </h3>
                <p className="text-[10px] font-bold uppercase opacity-70 tracking-wide">{desc}</p>
            </div>
        </Link>
    );
};

export default Library;
