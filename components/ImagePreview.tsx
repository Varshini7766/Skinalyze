
import React from 'react';
import { AnalysisResult } from '../types';
import { Sparkles, XCircle, AlertTriangle, CheckCircle } from './IconComponents';
import ResultDisplay from './ResultDisplay';

interface ImagePreviewProps {
  imageDataUrl: string;
  onAnalyze: () => void;
  onClear: () => void;
  isLoading: boolean;
  error: string | null;
  result: AnalysisResult | null;
}

const LoadingSpinner: React.FC = () => (
    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-10">
        <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-white mt-4 font-semibold">AI is analyzing...</p>
    </div>
);

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageDataUrl, onAnalyze, onClear, isLoading, error, result }) => {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center animate-fade-in">
        <div className="w-full bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="relative w-full aspect-square max-h-[400px] mx-auto rounded-lg overflow-hidden mb-6 border border-slate-300 dark:border-slate-600">
                {isLoading && <LoadingSpinner />}
                <img src={imageDataUrl} alt="Skin preview" className="w-full h-full object-contain" />
            </div>

            <div className="flex justify-center space-x-4">
                <button
                    onClick={onClear}
                    className="px-6 py-2.5 rounded-full text-sm font-semibold bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors flex items-center"
                >
                    <XCircle className="h-5 w-5 mr-2" />
                    Start Over
                </button>
                <button
                    onClick={onAnalyze}
                    disabled={isLoading || !!result}
                    className="px-8 py-2.5 rounded-full text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors flex items-center shadow-lg"
                >
                    <Sparkles className="h-5 w-5 mr-2" />
                    {result ? 'Analyzed' : 'Analyze Now'}
                </button>
            </div>
        </div>

        {error && (
            <div className="mt-6 w-full bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-600 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg relative flex items-start" role="alert">
                <AlertTriangle className="h-5 w-5 mr-3 mt-1 text-red-500" />
                <div>
                    <strong className="font-bold">Analysis Failed.</strong>
                    <span className="block sm:inline ml-1">{error}</span>
                </div>
            </div>
        )}
        
        {result && (
            <div className="mt-6 w-full">
                <ResultDisplay result={result} />
            </div>
        )}
    </div>
  );
};

export default ImagePreview;
