
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, FileText, Download, Play, ChevronRight, Loader2, ArrowRight, Book } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const QuranList: React.FC = () => {
  const { quranPdfs } = useContent();
  const navigate = useNavigate();
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number | 'completed'>>({});
  const [blobUrls, setBlobUrls] = useState<Record<string, string>>({});

  const activePdfs = quranPdfs.filter(pdf => pdf.active);

  const handlePdfClick = async (pdf: any) => {
      // If already downloaded, open it
      if (blobUrls[pdf.id]) {
          navigate(`/quran/pdf/${pdf.id}`, { state: { blobUrl: blobUrls[pdf.id], title: pdf.title } });
          return;
      }
      
      // If currently downloading, do nothing
      if (typeof downloadProgress[pdf.id] === 'number') return;

      // Start Download
      try {
          setDownloadProgress(prev => ({ ...prev, [pdf.id]: 1 }));
          const response = await fetch(pdf.url);
          if (!response.body) throw new Error('ReadableStream not supported');

          const contentLength = +response.headers.get('Content-Length') || 0;
          const reader = response.body.getReader();
          let receivedLength = 0;
          const chunks = [];

          while(true) {
              const { done, value } = await reader.read();
              if (done) break;
              chunks.push(value);
              receivedLength += value.length;
              if (contentLength) {
                  const progress = Math.round((receivedLength / contentLength) * 100);
                  setDownloadProgress(prev => ({ ...prev, [pdf.id]: progress }));
              }
          }

          const blob = new Blob(chunks, { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          setBlobUrls(prev => ({ ...prev, [pdf.id]: url }));
          setDownloadProgress(prev => ({ ...prev, [pdf.id]: 'completed' }));
          
          // Wait a moment before auto-opening to show completion
          setTimeout(() => {
             navigate(`/quran/pdf/${pdf.id}`, { state: { blobUrl: url, title: pdf.title } });
          }, 500);

      } catch (error) {
          console.error("Download failed", error);
          setDownloadProgress(prev => {
              const newState = { ...prev };
              delete newState[pdf.id];
              return newState;
          });
      }
  };

  return (
    <div className="px-6 pt-16 pb-32 min-h-screen animate-fade-up">
      <div className="mb-8 relative z-10">
          <div className="flex items-center gap-2 mb-2">
              <div className="h-[2px] w-8 bg-emerald-500"></div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Library</span>
          </div>
          <h1 className="text-3xl font-serif font-medium text-white mb-2">The Holy Quran</h1>
          <p className="text-gray-400 text-sm">Select your preferred reading format.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
          
          {/* Card 1: Interactive Quran (Main) */}
          <Link 
            to="/quran/read" 
            className="col-span-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-6 shadow-premium border border-white/10 group relative overflow-hidden active:scale-[0.99] transition-transform"
          >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <BookOpen size={100} className="text-white" />
              </div>
              
              <div className="relative z-10 flex items-center justify-between">
                  <div>
                      <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 inline-block">
                          Recommended
                      </span>
                      <h3 className="font-serif text-2xl text-white font-bold mb-1">Al-Quran</h3>
                      <p className="text-emerald-100 text-sm">Interactive • Translations • Audio</p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-lg group-hover:scale-110 transition-transform">
                      <ArrowRight size={20} />
                  </div>
              </div>
          </Link>

          {/* Dynamic PDF Cards */}
          {activePdfs.map(pdf => {
              const progress = downloadProgress[pdf.id];
              const isDownloading = typeof progress === 'number';
              const isReady = progress === 'completed' || blobUrls[pdf.id];

              return (
                  <button 
                    key={pdf.id}
                    onClick={() => handlePdfClick(pdf)}
                    className={`
                        col-span-1 h-48 rounded-3xl p-5 text-left relative overflow-hidden border transition-all duration-300 group
                        ${isReady 
                            ? 'bg-emerald-900/40 border-emerald-500/30 hover:bg-emerald-900/60' 
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }
                    `}
                  >
                      {/* Progress Bar Overlay (Bottom) */}
                      {isDownloading && (
                          <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                      )}

                      <div className="flex flex-col justify-between h-full relative z-10">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-inner ${isReady ? 'bg-emerald-500 text-white' : 'bg-white/10 text-gray-400'}`}>
                              <FileText size={20} />
                          </div>

                          <div>
                              <h3 className="font-bold text-white text-lg leading-tight mb-1 line-clamp-2">{pdf.title}</h3>
                              <p className="text-xs text-gray-400 font-medium">{pdf.description || "PDF Format"}</p>
                          </div>

                          <div className="flex items-center gap-2 mt-2">
                              {isDownloading ? (
                                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                                      <Loader2 size={10} className="animate-spin" /> {progress}%
                                  </span>
                              ) : isReady ? (
                                  <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-lg text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                                      <Book size={12} /> Read
                                  </span>
                              ) : (
                                  <span className="px-3 py-1.5 bg-white/10 text-gray-300 rounded-lg text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 group-hover:bg-white/20 transition-colors">
                                      <Download size={12} /> Download
                                  </span>
                              )}
                          </div>
                      </div>
                  </button>
              );
          })}
      </div>
    </div>
  );
};

export default QuranList;
