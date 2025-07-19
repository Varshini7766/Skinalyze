
import React, { useRef } from 'react';
import { Camera, Upload } from './IconComponents';

interface WelcomeScreenProps {
  onUploadClick: (dataUrl: string) => void;
  onCameraClick: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onUploadClick, onCameraClick }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onUploadClick(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Skin Analysis Assistant</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Get started by providing an image of the skin area.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={triggerFileUpload}
          className="group flex flex-col items-center justify-center p-6 bg-slate-100 dark:bg-slate-700 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-slate-600/50 transition-all duration-300"
        >
          <Upload className="h-10 w-10 text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 transition-colors" />
          <span className="mt-4 font-semibold text-slate-700 dark:text-slate-200">Upload Image</span>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Select a photo from your device</p>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <button
          onClick={onCameraClick}
          className="group flex flex-col items-center justify-center p-6 bg-slate-100 dark:bg-slate-700 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-slate-600/50 transition-all duration-300"
        >
          <Camera className="h-10 w-10 text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 transition-colors" />
          <span className="mt-4 font-semibold text-slate-700 dark:text-slate-200">Use Camera</span>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Take a live picture</p>
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
