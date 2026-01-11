

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { 
    LayoutDashboard, BookHeart, Book, Calendar, Heart, 
    Settings, LogOut, Plus, Search, Trash2, Edit3, 
    Save, X, Bell, Menu, Shield, Sun, DollarSign,
    ChevronRight, ArrowUpRight, CheckCircle2, MoreHorizontal,
    Home as HomeIcon, Star, GripVertical, FileText, Sparkles, UploadCloud, Loader2, Hexagon
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Dua, Hadith, JummahConfig, ManzilItem, AzkarItem, HomeConfig, QuranPdf, AllahName, Kalima } from '../types';
import AdminLogin from './AdminLogin';
import { NAMES_99_FULL } from '../data/names99';

// --- Types & View State ---
type ViewState = 'dashboard' | 'home_controls' | 'duas' | 'hadiths' | 'manzil' | 'azkar' | 'kalima' | 'quran_pdfs' | 'names99' | 'jummah' | 'donation' | 'settings' | 'reminder';

// --- Main Layout ---
const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = loading
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          setIsAuthenticated(!!user);
      });
      return () => unsubscribe();
  }, []);

  async function adminSignOut() {
    if(!window.confirm("Confirm forceful logout?")) return;
    try {
        await signOut(auth);
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "#/admin-login";
        window.location.reload(); 
    } catch (e) {
        console.error(e);
        window.location.href = "#/admin-login";
    }
  }

  if (isAuthenticated === null) {
      return (
          <div className="h-screen flex items-center justify-center bg-gray-50">
              <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
          </div>
      );
  }

  if (!isAuthenticated) {
      return <AdminLogin />;
  }

  return (
    <div className="flex h-screen bg-[#F3F4F6] dark:bg-gray-900 overflow-hidden font-sans text-gray-800 dark:text-gray-100">
        
        {isSidebarOpen && (
            <div 
                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm md:hidden"
                onClick={() => setIsSidebarOpen(false)}
            ></div>
        )}

        {/* Sidebar */}
        <aside className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-2xl md:shadow-none transition-transform duration-300 ease-in-out flex flex-col
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0
        `}>
            {/* Sidebar Header */}
            <div className="h-20 flex items-center px-8 border-b border-gray-100 dark:border-gray-700 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-200 dark:shadow-none">
                        Q
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">Noor 360</h1>
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Admin Console</p>
                    </div>
                </div>
            </div>
            
            {/* Sidebar Nav */}
            <nav className="p-4 space-y-1 overflow-y-auto flex-1 custom-scrollbar">
                <div className="mb-6">
                    <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Overview</p>
                    <NavItem icon={LayoutDashboard} label="Dashboard" active={currentView === 'dashboard'} onClick={() => { setCurrentView('dashboard'); setIsSidebarOpen(false); }} />
                    <NavItem icon={HomeIcon} label="Home Controls" active={currentView === 'home_controls'} onClick={() => { setCurrentView('home_controls'); setIsSidebarOpen(false); }} />
                </div>

                <div className="mb-6">
                    <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Content Library</p>
                    <NavItem icon={Sparkles} label="99 Names" active={currentView === 'names99'} onClick={() => { setCurrentView('names99'); setIsSidebarOpen(false); }} />
                    <NavItem icon={FileText} label="Quran PDFs" active={currentView === 'quran_pdfs'} onClick={() => { setCurrentView('quran_pdfs'); setIsSidebarOpen(false); }} />
                    <NavItem icon={Hexagon} label="6 Kalimas" active={currentView === 'kalima'} onClick={() => { setCurrentView('kalima'); setIsSidebarOpen(false); }} />
                    <NavItem icon={BookHeart} label="Duas Collection" active={currentView === 'duas'} onClick={() => { setCurrentView('duas'); setIsSidebarOpen(false); }} />
                    <NavItem icon={Book} label="Hadiths" active={currentView === 'hadiths'} onClick={() => { setCurrentView('hadiths'); setIsSidebarOpen(false); }} />
                    <NavItem icon={Shield} label="Manzil Verses" active={currentView === 'manzil'} onClick={() => { setCurrentView('manzil'); setIsSidebarOpen(false); }} />
                    <NavItem icon={Sun} label="Daily Azkar" active={currentView === 'azkar'} onClick={() => { setCurrentView('azkar'); setIsSidebarOpen(false); }} />
                </div>
                
                <div className="mb-6">
                    <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">App Features</p>
                    <NavItem icon={Calendar} label="Jummah Special" active={currentView === 'jummah'} onClick={() => { setCurrentView('jummah'); setIsSidebarOpen(false); }} />
                    <NavItem icon={Bell} label="Daily Reminder" active={currentView === 'reminder'} onClick={() => { setCurrentView('reminder'); setIsSidebarOpen(false); }} />
                    <NavItem icon={DollarSign} label="Donation Config" active={currentView === 'donation'} onClick={() => { setCurrentView('donation'); setIsSidebarOpen(false); }} />
                    <NavItem icon={Settings} label="App Settings" active={currentView === 'settings'} onClick={() => { setCurrentView('settings'); setIsSidebarOpen(false); }} />
                </div>
            </nav>

            <div className="p-4 border-t border-gray-100 dark:border-gray-700 shrink-0">
                <button 
                    onClick={adminSignOut} 
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 transition-all group"
                >
                    <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Sign Out
                </button>
            </div>
        </aside>

        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 h-20 flex items-center justify-between px-6 z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Menu size={24} />
                    </button>
                    <h2 className="font-bold text-xl text-gray-800 dark:text-white capitalize tracking-tight">
                        {currentView === 'names99' ? '99 Names of Allah' : currentView === 'dashboard' ? 'Overview' : currentView.replace(/_/g, ' ')}
                    </h2>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
                <div className="max-w-6xl mx-auto">
                    {currentView === 'dashboard' && <Dashboard setView={setCurrentView} />}
                    {currentView === 'home_controls' && <HomeControls />}
                    {currentView === 'names99' && <AllahNamesManager />}
                    {currentView === 'quran_pdfs' && <QuranPdfManager />}
                    {currentView === 'duas' && <DuaManager />}
                    {currentView === 'hadiths' && <HadithManager />}
                    {currentView === 'manzil' && <ManzilManager />}
                    {currentView === 'azkar' && <AzkarManager />}
                    {currentView === 'kalima' && <KalimaManager />}
                    {currentView === 'jummah' && <JummahManager />}
                    {currentView === 'settings' && <SettingsManager />}
                    {currentView === 'donation' && <DonationManager />}
                    {currentView === 'reminder' && <ReminderManager />}
                </div>
            </main>
        </div>
    </div>
  );
};

const NavItem = ({ icon: Icon, label, active, onClick }: any) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 mx-2 rounded-xl text-sm font-medium transition-all duration-200 relative group overflow-hidden ${
            active 
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-none' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
        }`}
        style={{ width: 'calc(100% - 1rem)' }}
    >
        <Icon size={18} className={`relative z-10 ${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white'}`} />
        <span className="relative z-10">{label}</span>
        {active && <div className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full"></div>}
    </button>
);

const Dashboard = ({ setView }: { setView: (v: ViewState) => void }) => {
    const { duas, hadiths, quranPdfs, kalimas } = useContent();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-emerald-900 dark:to-gray-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2">Welcome Back, Admin</h2>
                    <p className="text-gray-300 max-w-lg">
                        Manage your app's content, configure settings, and ensure the Ummah gets the best experience.
                    </p>
                    <div className="flex gap-3 mt-6">
                        <button onClick={() => setView('home_controls')} className="bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition shadow-lg shadow-emerald-900/20">
                            Configure Home
                        </button>
                        <button onClick={() => setView('kalima')} className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2">
                            <Hexagon size={16} /> Manage Kalimas
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Kalimas" value={kalimas?.length || 0} icon={Hexagon} color="purple" onClick={() => setView('kalima')} />
                <StatCard label="Total Duas" value={duas.length} icon={BookHeart} color="emerald" onClick={() => setView('duas')} />
                <StatCard label="Total Hadiths" value={hadiths.length} icon={Book} color="blue" onClick={() => setView('hadiths')} />
                <StatCard label="PDF Qurans" value={quranPdfs?.length || 0} icon={FileText} color="orange" onClick={() => setView('quran_pdfs')} />
            </div>
        </div>
    );
};

const KalimaManager = () => {
    const { kalimas, updateKalimas } = useContent();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Partial<Kalima>>({});
    const [deleteItem, setDeleteItem] = useState<Kalima | null>(null);

    const handleSave = () => {
        if (!editingItem.title || !editingItem.arabic) return;
        
        const newItem = { 
            ...editingItem, 
            id: editingItem.id || Date.now().toString(),
            status: editingItem.status || 'draft',
            order: editingItem.order || kalimas.length + 1
        } as Kalima;
        
        const list = kalimas.find(n => n.id === newItem.id) 
            ? kalimas.map(n => n.id === newItem.id ? newItem : n) 
            : [...kalimas, newItem];
            
        list.sort((a,b) => a.order - b.order);
        updateKalimas(list);
        setIsDrawerOpen(false);
    };

    return (
        <div>
            <PageHeader 
                title="6 Kalimas" 
                addLabel="Add Kalima" 
                searchValue=""
                onSearchChange={() => {}}
                onAdd={() => { setEditingItem({ status: 'published', order: kalimas.length + 1 }); setIsDrawerOpen(true); }} 
            />
            <ContentTable 
                items={kalimas} 
                columns={[{key: 'order', label: '#'}, {key: 'title', label: 'Title'}, {key: 'arabic', label: 'Arabic'}]}
                onEdit={(item: any) => { setEditingItem(item); setIsDrawerOpen(true); }}
                onDelete={(item: any) => setDeleteItem(item)}
            />
            <Drawer isOpen={isDrawerOpen} title={editingItem.id ? "Edit Kalima" : "New Kalima"} onClose={() => setIsDrawerOpen(false)} onSave={handleSave}>
                 <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                     <span className="font-bold text-sm">Status</span>
                     <SelectInput label="" value={editingItem.status || 'draft'} onChange={v => setEditingItem({...editingItem, status: v as any})} options={['draft', 'published']} />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <TextInput label="Order #" value={editingItem.order?.toString()} onChange={v => setEditingItem({...editingItem, order: parseInt(v) || 0})} />
                    <TextInput label="Title" value={editingItem.title} onChange={v => setEditingItem({...editingItem, title: v})} placeholder="e.g. First Kalima (Tayyab)" />
                 </div>

                 <TextArea label="Arabic" value={editingItem.arabic} onChange={v => setEditingItem({...editingItem, arabic: v})} dir="rtl" font="font-quran text-2xl" />
                 <TextInput label="Transliteration" value={editingItem.transliteration} onChange={v => setEditingItem({...editingItem, transliteration: v})} />
                 <TextArea label="Urdu Translation" value={editingItem.translationUrdu} onChange={v => setEditingItem({...editingItem, translationUrdu: v})} dir="rtl" font="font-urdu text-xl" />
                 <TextArea label="English Translation" value={editingItem.translationEn} onChange={v => setEditingItem({...editingItem, translationEn: v})} />
            </Drawer>
            <ConfirmModal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={() => { if(deleteItem) updateKalimas(kalimas.filter(n => n.id !== deleteItem.id)); setDeleteItem(null); }} message="Delete this Kalima?" />
        </div>
    );
};

const DuaManager = () => {
    const { duas, updateDuas } = useContent();
    const [searchTerm, setSearchTerm] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Partial<Dua>>({});
    const [deleteItem, setDeleteItem] = useState<Dua | null>(null);

    const filtered = duas.filter(d => d.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSave = () => {
        if (!editingItem.title || !editingItem.translation) return;
        const newItem = { 
            ...editingItem, 
            id: editingItem.id || Date.now().toString(), 
            category: editingItem.category || 'general',
            status: editingItem.status || 'draft',
            priority: editingItem.priority || 0
        } as Dua;
        const list = duas.find(d => d.id === newItem.id) ? duas.map(d => d.id === newItem.id ? newItem : d) : [newItem, ...duas];
        updateDuas(list);
        setIsDrawerOpen(false);
    };

    return (
        <div>
            <PageHeader 
                title="Dua Library" 
                addLabel="Add New Dua" 
                searchValue={searchTerm} 
                onSearchChange={setSearchTerm} 
                onAdd={() => { setEditingItem({ status: 'published', priority: 0 }); setIsDrawerOpen(true); }} 
            />
            <ContentTable 
                items={filtered} 
                columns={[{key: 'title', label: 'Title'}, {key: 'category', label: 'Category'}, {key: 'priority', label: 'Order'}]}
                onEdit={(item: any) => { setEditingItem(item); setIsDrawerOpen(true); }}
                onDelete={(item: any) => setDeleteItem(item)}
            />
            <Drawer isOpen={isDrawerOpen} title={editingItem.id ? "Edit Dua" : "New Dua"} onClose={() => setIsDrawerOpen(false)} onSave={handleSave}>
                <div className="grid grid-cols-2 gap-4">
                     <SelectInput label="Status" value={editingItem.status || 'draft'} onChange={v => setEditingItem({...editingItem, status: v as any})} options={['draft', 'published']} />
                     <TextInput label="Priority (Higher = First)" value={editingItem.priority?.toString()} onChange={v => setEditingItem({...editingItem, priority: parseInt(v) || 0})} placeholder="0" />
                </div>
                <TextInput label="Title" value={editingItem.title} onChange={v => setEditingItem({...editingItem, title: v})} placeholder="e.g. Waking Up" />
                <SelectInput 
                    label="Category" 
                    value={editingItem.category || 'general'} 
                    onChange={v => setEditingItem({...editingItem, category: v as any})}
                    options={['morning', 'night', 'travel', 'stress', 'success', 'general', 'jummah']}
                />
                <TextArea label="Arabic Text" value={editingItem.arabic} onChange={v => setEditingItem({...editingItem, arabic: v})} dir="rtl" font="font-quran" />
                <TextArea label="Urdu Translation" value={editingItem.translationUrdu} onChange={v => setEditingItem({...editingItem, translationUrdu: v})} dir="rtl" font="font-urdu text-xl" />
                <TextArea label="English Translation" value={editingItem.translation} onChange={v => setEditingItem({...editingItem, translation: v})} />
                <TextInput label="Reference" value={editingItem.reference} onChange={v => setEditingItem({...editingItem, reference: v})} placeholder="e.g. Bukhari" />
            </Drawer>
            <ConfirmModal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={() => { if(deleteItem) updateDuas(duas.filter(d => d.id !== deleteItem.id)); setDeleteItem(null); }} message="Are you sure you want to delete this Dua?" />
        </div>
    );
};

const HadithManager = () => {
    const { hadiths, updateHadiths } = useContent();
    const [searchTerm, setSearchTerm] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Partial<Hadith>>({});
    const [deleteItem, setDeleteItem] = useState<Hadith | null>(null);

    const filtered = hadiths.filter(h => h.text.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSave = () => {
        if (!editingItem.text) return;
        const newItem = { 
            ...editingItem, 
            id: editingItem.id || Date.now().toString(),
            status: editingItem.status || 'draft',
            priority: editingItem.priority || 0
        } as Hadith;
        const list = hadiths.find(h => h.id === newItem.id) ? hadiths.map(h => h.id === newItem.id ? newItem : h) : [newItem, ...hadiths];
        updateHadiths(list);
        setIsDrawerOpen(false);
    };

    return (
        <div>
             <PageHeader 
                title="Hadith Collection" 
                addLabel="Add Hadith" 
                searchValue={searchTerm} 
                onSearchChange={setSearchTerm} 
                onAdd={() => { setEditingItem({ status: 'published', priority: 0 }); setIsDrawerOpen(true); }} 
            />
            <ContentTable 
                items={filtered} 
                columns={[{key: 'category', label: 'Category'}, {key: 'source', label: 'Source'}, {key: 'priority', label: 'Order'}]}
                onEdit={(item: any) => { setEditingItem(item); setIsDrawerOpen(true); }}
                onDelete={(item: any) => setDeleteItem(item)}
            />
             <Drawer isOpen={isDrawerOpen} title={editingItem.id ? "Edit Hadith" : "New Hadith"} onClose={() => setIsDrawerOpen(false)} onSave={handleSave}>
                 <div className="grid grid-cols-2 gap-4">
                     <SelectInput label="Status" value={editingItem.status || 'draft'} onChange={v => setEditingItem({...editingItem, status: v as any})} options={['draft', 'published']} />
                     <TextInput label="Priority" value={editingItem.priority?.toString()} onChange={v => setEditingItem({...editingItem, priority: parseInt(v) || 0})} placeholder="0" />
                </div>
                 <TextInput label="Category" value={editingItem.category} onChange={v => setEditingItem({...editingItem, category: v})} placeholder="e.g. Charity" />
                 <TextArea label="Arabic (Optional)" value={editingItem.arabic} onChange={v => setEditingItem({...editingItem, arabic: v})} dir="rtl" />
                 <TextArea label="Urdu Translation" value={editingItem.translationUrdu} onChange={v => setEditingItem({...editingItem, translationUrdu: v})} dir="rtl" font="font-urdu text-xl" />
                 <TextArea label="English Text" value={editingItem.text} onChange={v => setEditingItem({...editingItem, text: v})} />
                 <TextInput label="Source" value={editingItem.source} onChange={v => setEditingItem({...editingItem, source: v})} placeholder="e.g. Sahih Muslim" />
            </Drawer>
            <ConfirmModal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={() => { if(deleteItem) updateHadiths(hadiths.filter(h => h.id !== deleteItem.id)); setDeleteItem(null); }} message="Delete this Hadith?" />
        </div>
    );
};

const ManzilManager = () => {
    const { manzil, updateManzil } = useContent();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Partial<ManzilItem>>({});
    const [deleteItem, setDeleteItem] = useState<ManzilItem | null>(null);

    const handleSave = () => {
        if (!editingItem.name || !editingItem.arabic) return;
        const newItem = { 
            ...editingItem, 
            id: editingItem.id || Date.now().toString(),
            order: editingItem.order || manzil.length + 1,
            status: editingItem.status || 'draft'
        } as ManzilItem;
        const list = manzil.find(m => m.id === newItem.id) ? manzil.map(m => m.id === newItem.id ? newItem : m) : [...manzil, newItem];
        list.sort((a,b) => a.order - b.order);
        updateManzil(list);
        setIsDrawerOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                 <h1 className="text-2xl font-bold">Manzil Verses</h1>
                 <button onClick={() => { setEditingItem({ status: 'published' }); setIsDrawerOpen(true); }} className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-200 dark:shadow-none flex items-center gap-2"><Plus size={18} /> Add Verse</button>
            </div>
            <ContentTable 
                items={manzil} 
                columns={[{key: 'order', label: '#'}, {key: 'name', label: 'Verse Name'}]}
                onEdit={(item: any) => { setEditingItem(item); setIsDrawerOpen(true); }}
                onDelete={(item: any) => setDeleteItem(item)}
            />
            <Drawer isOpen={isDrawerOpen} title={editingItem.id ? "Edit Verse" : "New Verse"} onClose={() => setIsDrawerOpen(false)} onSave={handleSave}>
                 <SelectInput label="Status" value={editingItem.status || 'draft'} onChange={v => setEditingItem({...editingItem, status: v as any})} options={['draft', 'published']} />
                 <TextInput label="Verse Name" value={editingItem.name} onChange={v => setEditingItem({...editingItem, name: v})} placeholder="e.g. Al-Fatiha" />
                 <TextInput label="Order" value={editingItem.order?.toString()} onChange={v => setEditingItem({...editingItem, order: parseInt(v) || 0})} />
                 <TextArea label="Arabic Text" value={editingItem.arabic} onChange={v => setEditingItem({...editingItem, arabic: v})} dir="rtl" font="font-quran" />
                 <TextArea label="Urdu Translation" value={editingItem.translationUrdu} onChange={v => setEditingItem({...editingItem, translationUrdu: v})} dir="rtl" font="font-urdu text-xl" />
                 <TextArea label="English Translation" value={editingItem.translation} onChange={v => setEditingItem({...editingItem, translation: v})} />
            </Drawer>
            <ConfirmModal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={() => { if(deleteItem) updateManzil(manzil.filter(m => m.id !== deleteItem.id)); setDeleteItem(null); }} message="Delete this verse?" />
        </div>
    )
};

const AzkarManager = () => {
    const { azkar, updateAzkar } = useContent();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Partial<AzkarItem>>({});
    const [deleteItem, setDeleteItem] = useState<AzkarItem | null>(null);

    const handleSave = () => {
        if (!editingItem.arabic) return;
        const newItem = { 
            ...editingItem, 
            id: editingItem.id || Date.now().toString(), 
            category: editingItem.category || 'morning',
            status: editingItem.status || 'draft',
            priority: editingItem.priority || 0
        } as AzkarItem;
        const list = azkar.find(a => a.id === newItem.id) ? azkar.map(a => a.id === newItem.id ? newItem : a) : [newItem, ...azkar];
        updateAzkar(list);
        setIsDrawerOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                 <h1 className="text-2xl font-bold">Daily Azkar</h1>
                 <button onClick={() => { setEditingItem({ status: 'published', priority: 0 }); setIsDrawerOpen(true); }} className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-200 dark:shadow-none flex items-center gap-2"><Plus size={18} /> Add Azkar</button>
            </div>
            <ContentTable 
                items={azkar} 
                columns={[{key: 'category', label: 'Type'}, {key: 'count', label: 'Count'}, {key: 'priority', label: 'Order'}]}
                onEdit={(item: any) => { setEditingItem(item); setIsDrawerOpen(true); }}
                onDelete={(item: any) => setDeleteItem(item)}
            />
            <Drawer isOpen={isDrawerOpen} title={editingItem.id ? "Edit Azkar" : "New Azkar"} onClose={() => setIsDrawerOpen(false)} onSave={handleSave}>
                <div className="grid grid-cols-2 gap-4">
                     <SelectInput label="Status" value={editingItem.status || 'draft'} onChange={v => setEditingItem({...editingItem, status: v as any})} options={['draft', 'published']} />
                     <TextInput label="Priority" value={editingItem.priority?.toString()} onChange={v => setEditingItem({...editingItem, priority: parseInt(v) || 0})} placeholder="0" />
                </div>
                <SelectInput label="Category" value={editingItem.category || 'morning'} onChange={v => setEditingItem({...editingItem, category: v as any})} options={['morning', 'evening']} />
                <TextInput label="Count" value={editingItem.count?.toString()} onChange={v => setEditingItem({...editingItem, count: parseInt(v) || undefined})} placeholder="e.g. 33" />
                <TextArea label="Arabic" value={editingItem.arabic} onChange={v => setEditingItem({...editingItem, arabic: v})} dir="rtl" font="font-quran" />
                <TextArea label="Urdu Translation" value={editingItem.translationUrdu} onChange={v => setEditingItem({...editingItem, translationUrdu: v})} dir="rtl" font="font-urdu text-xl" />
                <TextArea label="English Translation" value={editingItem.translation} onChange={v => setEditingItem({...editingItem, translation: v})} />
                <TextInput label="Reference" value={editingItem.reference} onChange={v => setEditingItem({...editingItem, reference: v})} />
            </Drawer>
            <ConfirmModal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={() => { if(deleteItem) updateAzkar(azkar.filter(a => a.id !== deleteItem.id)); setDeleteItem(null); }} message="Delete this Azkar?" />
        </div>
    )
};

const HomeControls = () => {
    const { homeConfig, featureFlags, updateHomeConfig, updateFeatureFlags } = useContent();
    const [data, setData] = useState(homeConfig);
    const [flags, setFlags] = useState(featureFlags);

    const handleSaveFlags = () => {
        updateFeatureFlags(flags);
        updateHomeConfig(data);
    };

    return (
        <ConfigLayout title="Home Dashboard Controls" description="Manage what users see on the main screen" onSave={handleSaveFlags}>
             <div className="space-y-6">
                 
                 <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                     <h3 className="font-bold mb-4 text-emerald-600">Feature Toggles</h3>
                     <div className="grid grid-cols-2 gap-4">
                         <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                             <span className="text-sm font-medium">Tasbeeh Card</span>
                             <Toggle checked={flags.tasbeeh} onChange={e => setFlags({...flags, tasbeeh: e})} />
                         </div>
                         <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                             <span className="text-sm font-medium">Qibla Card</span>
                             <Toggle checked={flags.qibla} onChange={e => setFlags({...flags, qibla: e})} />
                         </div>
                         <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                             <span className="text-sm font-medium">99 Names of Allah</span>
                             <Toggle checked={flags.names99} onChange={e => setFlags({...flags, names99: e})} />
                         </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                             <span className="text-sm font-medium">6 Kalimas</span>
                             <Toggle checked={flags.kalima} onChange={e => setFlags({...flags, kalima: e})} />
                         </div>
                     </div>
                 </div>

                 <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                     <div className="flex justify-between items-center mb-4">
                         <h3 className="font-bold">Daily Highlight Card</h3>
                         <Toggle checked={data.highlight.enabled} onChange={e => setData({...data, highlight: {...data.highlight, enabled: e}})} />
                     </div>
                     <div className="grid grid-cols-2 gap-4 mb-4">
                         <SelectInput label="Content Type" value={data.highlight.type} onChange={v => setData({...data, highlight: {...data.highlight, type: v as any}})} options={['dua', 'hadith', 'ayah']} />
                         <TextInput label="Card Title" value={data.highlight.title} onChange={v => setData({...data, highlight: {...data.highlight, title: v}})} placeholder="e.g. Verse of the Day" />
                     </div>
                     <TextArea label="Arabic Text" value={data.highlight.arabic} onChange={v => setData({...data, highlight: {...data.highlight, arabic: v}})} dir="rtl" />
                     <TextArea label="Urdu Translation" value={data.highlight.translationUrdu} onChange={v => setData({...data, highlight: {...data.highlight, translationUrdu: v}})} dir="rtl" font="font-urdu text-xl" />
                     <TextArea label="English Translation" value={data.highlight.translation} onChange={v => setData({...data, highlight: {...data.highlight, translation: v}})} />
                     <TextInput label="Reference" value={data.highlight.reference} onChange={v => setData({...data, highlight: {...data.highlight, reference: v}})} />
                 </div>

                 <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                     <h3 className="font-bold mb-4">Greeting</h3>
                     <TextInput label="Welcome Subtitle" value={data.welcomeText} onChange={v => setData({...data, welcomeText: v})} />
                 </div>
             </div>
        </ConfigLayout>
    );
}

const AllahNamesManager = () => {
    const { allahNames, updateAllahNames } = useContent();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Partial<AllahName>>({});
    const [deleteItem, setDeleteItem] = useState<AllahName | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [uploading, setUploading] = useState(false);

    const filtered = allahNames.filter(n => 
        n.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) || 
        n.arabic.includes(searchTerm)
    );

    const handleSave = () => {
        if (!editingItem.arabic || !editingItem.transliteration) return;
        
        const newItem = { 
            ...editingItem, 
            id: editingItem.id || Date.now().toString(),
            active: editingItem.active ?? true,
            createdAt: editingItem.createdAt || Date.now(),
            order: editingItem.order || allahNames.length + 1,
            meaning: {
                en: editingItem.meaning?.en || '',
                ur: editingItem.meaning?.ur || ''
            }
        } as AllahName;
        
        const list = allahNames.find(n => n.id === newItem.id) 
            ? allahNames.map(n => n.id === newItem.id ? newItem : n) 
            : [...allahNames, newItem];
            
        list.sort((a,b) => a.order - b.order);
        updateAllahNames(list);
        setIsDrawerOpen(false);
    };

    const seedDatabase = async () => {
        if(!window.confirm("This will upload all 99 Names to the database. Continue?")) return;
        setUploading(true);
        try {
            const formattedNames: AllahName[] = NAMES_99_FULL.map((n, idx) => ({
                id: `name_${n.order}`,
                active: true,
                createdAt: Date.now(),
                order: n.order,
                arabic: n.arabic,
                transliteration: n.transliteration,
                meaning: {
                    en: n.en,
                    ur: n.ur
                }
            }));
            await updateAllahNames(formattedNames);
            alert("Successfully uploaded 99 Names!");
        } catch (e) {
            alert("Error uploading names");
            console.error(e);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">99 Names of Allah</h1>
                    <p className="text-gray-500 text-sm">Manage your content collection</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-3 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                        <input 
                            className="pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none w-full md:w-64 shadow-sm"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {allahNames.length < 99 && (
                        <button 
                            onClick={seedDatabase} 
                            disabled={uploading}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl font-bold shadow-lg shadow-purple-200 dark:shadow-none flex items-center gap-2 transition active:scale-95 disabled:opacity-50"
                        >
                            {uploading ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />} 
                            <span className="hidden sm:inline">Upload All 99</span>
                        </button>
                    )}
                    <button 
                        onClick={() => { setEditingItem({ active: true, order: allahNames.length + 1, meaning: { en: '', ur: '' } }); setIsDrawerOpen(true); }} 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-200 dark:shadow-none flex items-center gap-2 transition active:scale-95"
                    >
                        <Plus size={18} /> <span className="hidden sm:inline">Add Name</span>
                    </button>
                </div>
            </div>

            <ContentTable 
                items={filtered} 
                columns={[{key: 'order', label: '#'}, {key: 'transliteration', label: 'Name (Eng)'}, {key: 'arabic', label: 'Arabic'}]}
                onEdit={(item: any) => { setEditingItem(item); setIsDrawerOpen(true); }}
                onDelete={(item: any) => setDeleteItem(item)}
            />
            <Drawer isOpen={isDrawerOpen} title={editingItem.id ? "Edit Name" : "Add New Name"} onClose={() => setIsDrawerOpen(false)} onSave={handleSave}>
                 <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                     <span className="font-bold text-sm">Visible in App</span>
                     <Toggle checked={editingItem.active} onChange={e => setEditingItem({...editingItem, active: e})} />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <TextInput label="Order #" value={editingItem.order?.toString()} onChange={v => setEditingItem({...editingItem, order: parseInt(v) || 0})} />
                    <TextInput label="Transliteration" value={editingItem.transliteration} onChange={v => setEditingItem({...editingItem, transliteration: v})} placeholder="e.g. Ar-Rahman" />
                 </div>

                 <TextArea label="Arabic" value={editingItem.arabic} onChange={v => setEditingItem({...editingItem, arabic: v})} dir="rtl" font="font-quran text-2xl" />
                 
                 <div className="space-y-4 pt-2">
                    <h3 className="font-bold text-sm text-emerald-600 uppercase tracking-wider border-b pb-2">Meanings</h3>
                    <TextInput label="English Meaning" value={editingItem.meaning?.en || ''} onChange={v => setEditingItem({...editingItem, meaning: {...editingItem.meaning, en: v} as any})} placeholder="e.g. The Most Gracious" />
                    <TextInput label="Urdu Meaning" value={editingItem.meaning?.ur || ''} onChange={v => setEditingItem({...editingItem, meaning: {...editingItem.meaning, ur: v} as any})} placeholder="e.g. نہایت مہربان" />
                 </div>

                 <TextArea label="Short Description / Benefit (Optional)" value={editingItem.desc || ''} onChange={v => setEditingItem({...editingItem, desc: v})} />
            </Drawer>
            <ConfirmModal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={() => { if(deleteItem) updateAllahNames(allahNames.filter(n => n.id !== deleteItem.id)); setDeleteItem(null); }} message="Delete this name?" />
        </div>
    );
}

const QuranPdfManager = () => {
    const { quranPdfs, updateQuranPdfs } = useContent();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Partial<QuranPdf>>({});
    const [deleteItem, setDeleteItem] = useState<QuranPdf | null>(null);

    const handleSave = () => {
        if (!editingItem.title || !editingItem.url) return;
        const newItem = { 
            ...editingItem, 
            id: editingItem.id || Date.now().toString(),
            active: editingItem.active ?? true,
            createdAt: editingItem.createdAt || Date.now()
        } as QuranPdf;
        
        const list = quranPdfs.find(p => p.id === newItem.id) ? quranPdfs.map(p => p.id === newItem.id ? newItem : p) : [newItem, ...quranPdfs];
        updateQuranPdfs(list);
        setIsDrawerOpen(false);
    };

    return (
        <div>
            <PageHeader 
                title="Quran PDFs" 
                addLabel="Add PDF" 
                searchValue=""
                onSearchChange={() => {}}
                onAdd={() => { setEditingItem({ active: true }); setIsDrawerOpen(true); }} 
            />
            <ContentTable 
                items={quranPdfs} 
                columns={[{key: 'title', label: 'Title'}, {key: 'url', label: 'PDF URL'}]}
                onEdit={(item: any) => { setEditingItem(item); setIsDrawerOpen(true); }}
                onDelete={(item: any) => setDeleteItem(item)}
            />
            <Drawer isOpen={isDrawerOpen} title={editingItem.id ? "Edit PDF" : "New PDF"} onClose={() => setIsDrawerOpen(false)} onSave={handleSave}>
                 <div className="flex items-center justify-between mb-4">
                     <span className="font-bold text-sm">Active Status</span>
                     <Toggle checked={editingItem.active} onChange={e => setEditingItem({...editingItem, active: e})} />
                 </div>
                 <TextInput label="Title" value={editingItem.title} onChange={v => setEditingItem({...editingItem, title: v})} placeholder="e.g. 13 Line Quran" />
                 <TextInput label="PDF URL" value={editingItem.url} onChange={v => setEditingItem({...editingItem, url: v})} placeholder="https://..." />
                 <TextArea label="Description (Optional)" value={editingItem.description} onChange={v => setEditingItem({...editingItem, description: v})} />
            </Drawer>
            <ConfirmModal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={() => { if(deleteItem) updateQuranPdfs(quranPdfs.filter(p => p.id !== deleteItem.id)); setDeleteItem(null); }} message="Delete this PDF?" />
        </div>
    );
}

const JummahManager = () => {
    const { jummahConfig, updateJummahConfig } = useContent();
    const [data, setData] = useState(jummahConfig);
    return (
        <ConfigLayout title="Jummah Settings" description="Configure the Friday special section" onSave={() => updateJummahConfig(data)}>
             <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                 <div>
                     <span className="font-bold text-emerald-800 dark:text-emerald-400">Enable Jummah Tab</span>
                     <p className="text-xs text-emerald-600 dark:text-emerald-500">Show/Hide the Friday section in app</p>
                 </div>
                 <Toggle checked={data.enabled} onChange={e => setData({...data, enabled: e})} />
             </div>
             <TextInput label="Banner Title" value={data.highlightTitle} onChange={v => setData({...data, highlightTitle: v})} />
             <TextArea label="Banner Message" value={data.highlightMessage} onChange={v => setData({...data, highlightMessage: v})} />
             <div className="pt-2">
                 <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Checklist Items (Comma Separated)</label>
                 <textarea 
                    className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border-none outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
                    value={data.checklist.join(', ')}
                    onChange={e => setData({...data, checklist: e.target.value.split(',').map(s => s.trim())})}
                    rows={4}
                 />
             </div>
        </ConfigLayout>
    )
}

const DonationManager = () => {
    const { donationConfig, updateDonationConfig } = useContent();
    const [data, setData] = useState(donationConfig);
    return (
        <ConfigLayout title="Donation Settings" description="Manage UPI ID and support text" onSave={() => updateDonationConfig(data)}>
             <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800/30 text-amber-800 dark:text-amber-200 text-sm">
                 <b>Note:</b> Donations are strictly optional and do not remove ads.
             </div>
            <TextInput label="UPI ID" value={data.upiId} onChange={v => setData({...data, upiId: v})} />
            <TextArea label="Support Message" value={data.supportMessage} onChange={v => setData({...data, supportMessage: v})} />
        </ConfigLayout>
    )
}

const ReminderManager = () => {
    const { dailyReminder, updateDailyReminder } = useContent();
    const [data, setData] = useState(dailyReminder);
    return (
        <ConfigLayout title="Daily Reminder" description="Set the featured content on home screen" onSave={() => updateDailyReminder(data)}>
             <div className="flex items-center justify-between mb-4">
                 <span className="font-bold">Enable Widget</span>
                 <Toggle checked={data.enabled} onChange={e => setData({...data, enabled: e})} />
             </div>
            <TextArea label="Arabic" value={data.arabic} onChange={v => setData({...data, arabic: v})} dir="rtl" font="font-quran" />
            <TextArea label="Translation" value={data.translation} onChange={v => setData({...data, translation: v})} />
        </ConfigLayout>
    )
}

const SettingsManager = () => {
    const { homeConfig, updateHomeConfig } = useContent();
    const [data, setData] = useState(homeConfig);
    return (
        <ConfigLayout title="App Settings" description="General app configuration" onSave={() => updateHomeConfig(data)}>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-4">
                <Toggle checked={data.showNotice} onChange={e => setData({...data, showNotice: e})} />
                <span className="font-bold text-sm">Show Notice Banner</span>
            </div>
            {data.showNotice && <TextInput label="Notice Text" value={data.noticeText} onChange={v => setData({...data, noticeText: v})} />}
        </ConfigLayout>
    )
}

const ConfigLayout = ({ title, description, children, onSave }: any) => (
    <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-gray-500 text-sm mt-1">{description}</p>
            </div>
            <div className="p-8 space-y-6">
                {children}
            </div>
            <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                <button onClick={() => { onSave(); alert('Settings Saved'); }} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 dark:shadow-none transition flex items-center gap-2">
                    <Save size={18} /> Save Changes
                </button>
            </div>
        </div>
    </div>
);

const StatCard = ({ label, value, icon: Icon, color, onClick }: any) => {
    const colorStyles: any = {
        emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
        blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
        purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
        orange: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
    };

    return (
        <button onClick={onClick} className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-left hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${colorStyles[color]} transition-colors`}>
                    <Icon size={24} />
                </div>
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-full text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-gray-600 transition">
                    <ArrowUpRight size={16} />
                </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
        </button>
    );
};

const TextInput = ({ label, value, onChange, placeholder }: any) => (
    <div>
        <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wide">{label}</label>
        <input 
            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
        />
    </div>
);

const TextArea = ({ label, value, onChange, dir, font }: any) => (
    <div>
        <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wide">{label}</label>
        <textarea 
            className={`w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-emerald-500 outline-none min-h-[120px] transition-all ${font || ''}`}
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            dir={dir}
        />
    </div>
);

const SelectInput = ({ label, value, onChange, options }: any) => (
    <div>
        <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wide">{label}</label>
        <div className="relative">
            <select 
                value={value} 
                onChange={e => onChange(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-emerald-500 outline-none appearance-none capitalize"
            >
                {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
            </select>
            <ChevronRight className="absolute right-4 top-4 text-gray-400 rotate-90 pointer-events-none" size={18} />
        </div>
    </div>
);

const Toggle = ({ checked, onChange }: any) => (
    <button 
        onClick={() => onChange(!checked)}
        className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'}`}
    >
        <div className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </button>
);

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }: any) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl max-w-sm w-full border border-gray-100 dark:border-gray-700 transform transition-all scale-100">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mb-4 mx-auto">
                    <Trash2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-center mb-2">Confirm Delete</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center text-sm mb-6">{message}</p>
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl font-bold text-gray-700 dark:text-gray-300">Cancel</button>
                    <button onClick={onConfirm} className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-200 dark:shadow-none transition">Delete</button>
                </div>
            </div>
        </div>
    );
};

const ContentTable = ({ items, columns, onEdit, onDelete }: any) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                        {columns.map((c: any) => (
                            <th key={c.key} className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{c.label}</th>
                        ))}
                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {items.length === 0 ? (
                         <tr><td colSpan={columns.length + 2} className="px-6 py-12 text-center text-gray-400 font-medium">No content found in database.</td></tr>
                    ) : (
                        items.map((item: any) => (
                            <tr key={item.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold uppercase ${
                                        item.active === true || item.status === 'published' 
                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                                        : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                                    }`}>
                                        {item.active ? 'Active' : (item.status || 'Draft')}
                                    </span>
                                </td>
                                {columns.map((c: any) => (
                                    <td key={c.key} className="px-6 py-4 text-gray-700 dark:text-gray-300 max-w-xs truncate">
                                        {item[c.key]}
                                    </td>
                                ))}
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => onEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                            <Edit3 size={16} />
                                        </button>
                                        <button onClick={() => onDelete(item)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    </div>
  );

const Drawer = ({ isOpen, title, onClose, onSave, children }: any) => (
    <>
        <div 
            className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        ></div>
        <div className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-white dark:bg-gray-800 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full">
                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition text-gray-500">
                        <X size={20} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {children}
                </div>
                <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 text-sm font-bold text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition">
                        Cancel
                    </button>
                    <button onClick={onSave} className="flex-1 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-200 dark:shadow-none transition flex items-center justify-center gap-2">
                        <Save size={18} /> Save Changes
                    </button>
                </div>
            </div>
        </div>
    </>
);

const PageHeader = ({ title, addLabel, searchValue, onSearchChange, onAdd }: any) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
            <p className="text-gray-500 text-sm">Manage your content collection</p>
        </div>
        <div className="flex gap-3">
            <div className="relative group">
                <Search className="absolute left-3 top-3 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                    className="pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none w-full md:w-64 shadow-sm"
                    placeholder="Search..."
                    value={searchValue || ''}
                    onChange={e => onSearchChange(e.target.value)}
                />
            </div>
            <button 
                onClick={onAdd} 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-200 dark:shadow-none flex items-center gap-2 transition active:scale-95"
            >
                <Plus size={18} /> <span className="hidden sm:inline">{addLabel}</span>
            </button>
        </div>
    </div>
);

export default AdminPanel;
