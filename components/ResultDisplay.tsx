
import React from 'react';
import { AnalysisResult } from '../types';
import { CheckCircle, AlertTriangle } from './IconComponents';

interface ResultDisplayProps {
  result: AnalysisResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const confidencePercentage = (result.confidence * 100).toFixed(0);
  const isConcerning = !result.isNormal;

  const cardBgColor = isConcerning ? 'bg-orange-50 dark:bg-orange-900/20' : 'bg-green-50 dark:bg-green-900/20';
  const cardBorderColor = isConcerning ? 'border-orange-200 dark:border-orange-700/50' : 'border-green-200 dark:border-green-700/50';
  const iconColor = isConcerning ? 'text-orange-500' : 'text-green-600 dark:text-green-400';
  const textColor = isConcerning ? 'text-orange-900 dark:text-orange-100' : 'text-green-900 dark:text-green-100';
  const confidenceColor = isConcerning ? 'bg-orange-200 text-orange-800' : 'bg-green-200 text-green-800';
  const IconComponent = isConcerning ? AlertTriangle : CheckCircle;

  return (
    <div className={`w-full ${cardBgColor} p-6 rounded-xl shadow-lg border ${cardBorderColor} animate-fade-in`}>
      <div className="flex items-start">
        <IconComponent className={`h-8 w-8 mr-4 flex-shrink-0 ${iconColor}`} />
        <div>
          <h3 className={`text-2xl font-bold ${textColor}`}>
            {result.condition}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">AI Preliminary Finding</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Visual Description</h4>
            <p className="text-slate-600 dark:text-slate-400">{result.description}</p>
        </div>
        
        <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Confidence Level</h4>
            <div className="flex items-center">
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                    <div className={`${isConcerning ? 'bg-orange-500' : 'bg-green-500'} h-2.5 rounded-full`} style={{ width: `${confidencePercentage}%` }}></div>
                </div>
                <span className={`ml-4 text-sm font-bold py-0.5 px-2.5 rounded-full ${confidenceColor}`}>
                    {confidencePercentage}%
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
