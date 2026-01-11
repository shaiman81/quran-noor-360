
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PdfViewer: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { blobUrl, title } = state || {};

  useEffect(() => {
    if (!blobUrl) {
      navigate('/quran', { replace: true });
    }
  }, [blobUrl, navigate]);

  if (!blobUrl) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col h-[100dvh]">
      {/* Viewer Header */}
      <div className="h-16 bg-gray-900/90 backdrop-blur-md flex items-center justify-between px-4 border-b border-gray-800 shrink-0 z-10">
        <div className="flex items-center gap-3 overflow-hidden">
            <button 
                onClick={() => navigate('/quran')} 
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 text-white transition shrink-0"
            >
                <ArrowLeft size={20} />
            </button>
            <h1 className="text-white font-bold truncate text-sm">{title || "PDF Reader"}</h1>
        </div>
      </div>

      {/* Native Iframe Viewer */}
      {/* Uses the blob URL directly. On supported mobile WebViews/Browsers, this renders the PDF or triggers the native PDF handler within the frame. */}
      <div className="flex-1 bg-white relative w-full h-full">
         <iframe 
            src={blobUrl} 
            className="w-full h-full border-none block"
            title={title || "PDF Document"}
            style={{ width: '100%', height: '100%' }}
         />
      </div>
    </div>
  );
};

export default PdfViewer;
