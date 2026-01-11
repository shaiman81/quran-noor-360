
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, Mail, AlertTriangle } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginAdmin } = useContent();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
        await loginAdmin(email, password);
        // Authentication state change is handled by ContentContext and AdminPanel wrapper.
        // We navigate to /admin which will mount AdminPanel.
        // If already inside AdminPanel (rendered via conditional), this url change triggers re-evaluation.
        navigate('/admin', { replace: true });
    } catch (err: any) {
        console.error("Login failed:", err);
        let msg = 'Invalid credentials.';
        if (err.code === 'auth/network-request-failed') {
            msg = 'Network error.';
        } else if (err.code === 'auth/too-many-requests') {
            msg = 'Too many failed attempts.';
        }
        setError(msg);
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative z-50 flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="absolute top-4 left-4">
             <button 
                onClick={() => navigate('/')} 
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-100 dark:border-gray-700 flex items-center justify-center active:scale-95 transition-transform"
             >
                 <ArrowLeft size={22} className="text-gray-600 dark:text-gray-300" />
             </button>
        </div>

      <div className="w-full max-w-sm bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400">
            <Lock size={32} />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Admin Portal</h1>
        <p className="text-sm text-gray-500 mb-6">Secure Cloud Access</p>

        <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Admin Email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 outline-none text-left"
                    required
                    disabled={loading}
                />
            </div>
            
            <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 outline-none text-left"
                    required
                    disabled={loading}
                />
            </div>

            {error && (
                <div className="flex items-center gap-2 text-red-500 text-xs font-bold bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-left">
                    <AlertTriangle size={16} className="shrink-0" />
                    {error}
                </div>
            )}
            
            <button 
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 dark:shadow-none active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Authenticating...
                    </>
                ) : 'Login to Database'}
            </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
