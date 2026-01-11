
import React from 'react';
import { Heart, Copy, ShieldCheck, ArrowRight, Wallet, QrCode } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useNavigate } from 'react-router-dom';

const Donate: React.FC = () => {
  const { donationConfig } = useContent();
  const navigate = useNavigate();

  const handleCopy = () => {
      navigator.clipboard.writeText(donationConfig.upiId);
      alert('UPI ID Copied');
  };

  const constructUpiLink = () => {
    const baseURL = "upi://pay";
    const params = new URLSearchParams({
        pa: donationConfig.upiId,
        pn: "Noor Al Huda Support",
        cu: "INR",
    });
    return `${baseURL}?${params.toString()}`;
  };

  return (
    <div className="p-6 space-y-8 min-h-screen text-center pb-32 animate-fade-in-up">
      <div className="flex justify-start">
         <button onClick={() => navigate('/')} className="text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
             &larr; Back
         </button>
      </div>

      <div className="relative inline-block">
        <div className="absolute inset-0 bg-emerald-500 opacity-20 rounded-full blur-xl"></div>
        <div className="relative bg-gradient-to-tr from-emerald-500 to-teal-400 h-24 w-24 rounded-[2rem] flex items-center justify-center mx-auto text-white shadow-xl shadow-emerald-200 dark:shadow-none">
            <Heart size={48} fill="currentColor" />
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white tracking-tight">Support Our Mission</h1>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
          {donationConfig.supportMessage}
        </p>
      </div>

      {/* Payment Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-soft border border-gray-100 dark:border-gray-700 relative overflow-hidden">
        
        {/* QR Section */}
        {donationConfig.qrCodeImage && (
            <div className="mb-6">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 inline-block">
                    <img src={donationConfig.qrCodeImage} alt="QR" className="w-40 h-40 object-contain rounded-lg" />
                </div>
            </div>
        )}

        {/* Copy ID */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 flex items-center justify-between border border-gray-200 dark:border-gray-700 mb-6 group active:scale-[0.98] transition-transform cursor-pointer" onClick={handleCopy}>
            <div className="text-left">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">UPI ID</p>
                <p className="font-mono font-bold text-gray-800 dark:text-gray-200">{donationConfig.upiId}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm text-gray-400 group-hover:text-emerald-500 transition-colors">
                <Copy size={18} />
            </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3">
             <a href={constructUpiLink()} className="bg-emerald-600 text-white p-4 rounded-xl font-bold text-sm shadow-lg shadow-emerald-200 dark:shadow-none flex items-center justify-center gap-2 hover:bg-emerald-700 transition">
                 <Wallet size={18} /> Pay Now
             </a>
             <button onClick={handleCopy} className="bg-white dark:bg-gray-700 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 p-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                 <Copy size={18} /> Copy ID
             </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest opacity-60">
             <ShieldCheck size={12} /> Secure Direct Transfer
        </div>
      </div>
    </div>
  );
};

export default Donate;
