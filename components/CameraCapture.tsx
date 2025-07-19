
import React, { useRef, useEffect, useState } from 'react';
import { Camera, XCircle } from './IconComponents';

interface CameraCaptureProps {
  onCapture: (dataUrl: string) => void;
  onCancel: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    let activeStream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          activeStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          setStream(activeStream);
          if (videoRef.current) {
            videoRef.current.srcObject = activeStream;
          }
        } else {
          setError("Your browser does not support camera access.");
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setError("Could not access the camera. Please check permissions in your browser settings.");
      }
    };

    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        onCapture(dataUrl);
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h2 className="text-xl font-bold text-center mb-4">Position Camera</h2>
      {error ? (
        <div className="text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-md text-center">{error}</div>
      ) : (
        <div className="relative w-full aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-600">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
          <div className="absolute inset-0 border-8 border-white/50 rounded-lg pointer-events-none"></div>
        </div>
      )}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={onCancel}
          className="px-6 py-2.5 rounded-full text-sm font-semibold bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors flex items-center"
        >
          <XCircle className="h-5 w-5 mr-2" />
          Cancel
        </button>
        <button
          onClick={handleCapture}
          disabled={!stream || !!error}
          className="px-8 py-2.5 rounded-full text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors flex items-center shadow-lg"
        >
          <Camera className="h-5 w-5 mr-2"/>
          Capture Photo
        </button>
      </div>
    </div>
  );
};

export default CameraCapture;
