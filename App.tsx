
import React, { useState, useCallback } from 'react';
import { AppScreen, AnalysisResult } from './types';
import { analyzeSkinImage } from './services/geminiService';
import WelcomeScreen from './components/WelcomeScreen';
import CameraCapture from './components/CameraCapture';
import ImagePreview from './components/ImagePreview';
import Header from './components/Header';
import { AlertTriangle, Info } from './components/IconComponents';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.Welcome);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = (dataUrl: string) => {
    setImageDataUrl(dataUrl);
    setAnalysisResult(null);
    setError(null);
    setScreen(AppScreen.Preview);
  };

  const handleAnalyze = useCallback(async () => {
    if (!imageDataUrl) {
      setError("No image data to analyze.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      // The base64 string from data URL is "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..."
      // We need to extract the part after the comma.
      const base64Data = imageDataUrl.split(',')[1];
      const result = await analyzeSkinImage(base64Data);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError("An error occurred during analysis. The AI model may be unable to process this image. Please try a different one.");
    } finally {
      setIsLoading(false);
    }
  }, [imageDataUrl]);

  const reset = () => {
    setScreen(AppScreen.Welcome);
    setImageDataUrl(null);
    setAnalysisResult(null);
    setIsLoading(false);
    setError(null);
  };

  const renderScreen = () => {
    switch (screen) {
      case AppScreen.Camera:
        return <CameraCapture onCapture={handleImageSelected} onCancel={() => setScreen(AppScreen.Welcome)} />;
      case AppScreen.Preview:
        return (
          <ImagePreview
            imageDataUrl={imageDataUrl!}
            onAnalyze={handleAnalyze}
            onClear={reset}
            isLoading={isLoading}
            error={error}
            result={analysisResult}
          />
        );
      case AppScreen.Welcome:
      default:
        return <WelcomeScreen onUploadClick={handleImageSelected} onCameraClick={() => setScreen(AppScreen.Camera)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex flex-col">
      <Header onReset={reset} />
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl mx-auto">
          {renderScreen()}
        </div>
      </main>
      <footer className="w-full p-4 mt-8">
          <div className="max-w-3xl mx-auto bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-300 p-4 rounded-md" role="alert">
              <div className="flex items-center">
                  <div className="py-1">
                      <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4"/>
                  </div>
                  <div>
                      <p className="font-bold">Important Disclaimer</p>
                      <p className="text-sm">This tool provides an AI-based preliminary analysis and is not a substitute for professional medical diagnosis. Always consult with a qualified healthcare provider for any health concerns.</p>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  );
};

export default App;
