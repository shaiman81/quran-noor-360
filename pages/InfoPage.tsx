
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, FileText, Info, Lock, MapPin, Mail, AlertTriangle } from 'lucide-react';

const InfoPage: React.FC = () => {
  const { section } = useParams();
  const navigate = useNavigate();

  const renderContent = () => {
    switch (section) {
      case 'about':
        return (
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Quran Noor 360</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Version 1.0.0
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              Quran Noor 360 is a comprehensive Islamic companion app designed to facilitate daily worship and learning. 
              Our mission is to provide authentic, easy-to-access Islamic resources in a respectful and ad-supported free environment.
            </p>
            
            <h4 className="font-bold mt-4">Key Features</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>Digital Quran with Translation (English, Urdu, Hindi)</li>
              <li>Juz (Para) wise reading</li>
              <li>Authentic Dua & Hadith collections</li>
              <li>Qibla Direction (Sensor based)</li>
              <li>Prayer Times (Location based)</li>
              <li>Digital Tasbeeh Counter</li>
              <li>AI Islamic Assistant (Educational)</li>
            </ul>

            <h4 className="font-bold mt-4">Developer</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Developed by [Developer/Studio Name]. <br/>
              Dedicated to serving the Ummah.
            </p>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-200">
              Your privacy is important to us. This policy explains how we handle your data.
            </p>

            <h4 className="font-bold text-gray-800 dark:text-white mt-2">1. Location Data</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              We collect precise location data ONLY to calculate accurate Prayer Times and Qibla direction relative to your position. 
              This data is processed locally on your device and is not stored on our servers or tracked historically.
            </p>

            <h4 className="font-bold text-gray-800 dark:text-white mt-2">2. Internet Access</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              We use internet access to:
              <ul className="list-disc list-inside ml-2 mt-1">
                <li>Display Google AdMob advertisements.</li>
                <li>Fetch AI responses for the Assistant feature.</li>
                <li>Download content updates if available.</li>
              </ul>
            </p>

            <h4 className="font-bold text-gray-800 dark:text-white mt-2">3. Third-Party Services</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Google AdMob:</strong> We use Google AdMob to display ads. AdMob may collect data (such as device ID) to provide personalized ads based on your interests.
            </p>

            <h4 className="font-bold text-gray-800 dark:text-white mt-2">4. Data Safety</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              We do not sell your personal data. We do not require account creation or login for basic features.
            </p>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 dark:text-white">1. Free Usage</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              This app is free to use. To support development and server costs, we display advertisements.
            </p>

            <h4 className="font-bold text-gray-800 dark:text-white mt-2">2. Advertisements</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Ads are an integral part of this application. By using this app, you agree to see advertisements.
            </p>

            <h4 className="font-bold text-gray-800 dark:text-white mt-2">3. Donations</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-bold bg-amber-50 dark:bg-amber-900/20 p-2 rounded border border-amber-200 dark:border-amber-800">
              Donations are strictly optional. A donation is a gift to support the developer and DOES NOT remove advertisements or unlock special features.
            </p>

            <h4 className="font-bold text-gray-800 dark:text-white mt-2">4. Disclaimer</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Authenticity:</strong> We strive for 100% accuracy in Quran text and translations from verified sources. However, errors may exist. Please verify with a scholar if in doubt.<br/><br/>
              <strong>Religious Rulings:</strong> This app provides information only. It does not provide Fatwas. For religious rulings, consult a qualified local scholar.
            </p>
          </div>
        );

      case 'permissions':
        return (
          <div className="space-y-4">
            <div className="flex gap-3 items-start p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                <MapPin className="text-emerald-500 shrink-0" size={24} />
                <div>
                    <h4 className="font-bold text-sm">Location (Fine/Coarse)</h4>
                    <p className="text-xs text-gray-500 mt-1">
                        Required for Qibla Compass and Prayer Times calculation. Not used for tracking.
                    </p>
                </div>
            </div>

             <div className="flex gap-3 items-start p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                <Lock className="text-blue-500 shrink-0" size={24} />
                <div>
                    <h4 className="font-bold text-sm">Internet / Network State</h4>
                    <p className="text-xs text-gray-500 mt-1">
                        Required to load Ads, AI Assistant, and update content.
                    </p>
                </div>
            </div>
            
            <div className="flex gap-3 items-start p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                <FileText className="text-orange-500 shrink-0" size={24} />
                <div>
                    <h4 className="font-bold text-sm">Storage (Optional)</h4>
                    <p className="text-xs text-gray-500 mt-1">
                        May be used to cache Quran data for offline reading.
                    </p>
                </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4 text-center py-10">
             <Mail size={48} className="mx-auto text-emerald-600 dark:text-emerald-400 mb-4" />
             <h3 className="font-bold text-xl">Get in Touch</h3>
             <p className="text-gray-600 dark:text-gray-300 text-sm">
                 For feedback, bug reports, or suggestions, please email us at:
             </p>
             <a href="mailto:support@qurannoor360.com" className="inline-block mt-4 text-lg font-bold text-emerald-600 dark:text-emerald-400 underline">
                 support@qurannoor360.com
             </a>
             <p className="text-xs text-gray-400 mt-8">
                 We try to respond within 24-48 hours.
             </p>
          </div>
        );
        
      default:
        return <div>Section not found</div>;
    }
  };

  const titles: Record<string, string> = {
      about: "About App",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      permissions: "Permissions",
      contact: "Contact Us"
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3 z-10 shadow-sm">
            <button onClick={() => navigate('/settings')} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <ArrowLeft size={24} className="text-gray-600 dark:text-gray-300"/>
            </button>
            <h2 className="font-bold text-lg text-gray-800 dark:text-white">{titles[section || ''] || 'Info'}</h2>
        </div>

        {/* Content */}
        <div className="p-6 max-w-lg mx-auto leading-relaxed">
            {renderContent()}
        </div>
    </div>
  );
};

export default InfoPage;
