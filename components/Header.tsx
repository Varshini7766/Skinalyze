
import React from 'react';
import { Activity } from './IconComponents';

interface HeaderProps {
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={onReset}>
            <Activity className="h-7 w-7 text-indigo-500" />
            <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
              Skinalyze
            </h1>
          </div>
          <button
            onClick={onReset}
            className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
