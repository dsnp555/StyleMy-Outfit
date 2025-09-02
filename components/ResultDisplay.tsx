
import React from 'react';
import type { GeneratedResult } from '../types';
import { ArrowPathIcon } from './Icons';


interface ResultDisplayProps {
  result: GeneratedResult;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  return (
    <div className="max-w-2xl mx-auto text-center animate-fade-in">
      <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Your New Look!</h2>
      <div className="bg-white p-4 rounded-xl shadow-2xl border border-gray-200">
        {result.imageUrl ? (
          <img
            src={result.imageUrl}
            alt="Generated virtual try-on"
            className="w-full h-auto object-contain rounded-lg"
          />
        ) : (
          <div className="h-96 flex items-center justify-center bg-gray-100 rounded-lg">
            <p className="text-gray-500">Image could not be generated.</p>
          </div>
        )}
      </div>
      {result.text && (
        <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 text-indigo-800 p-4 rounded-r-lg">
          <p className="italic">{result.text}</p>
        </div>
      )}
      <button
        onClick={onReset}
        className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
      >
        <ArrowPathIcon className="w-5 h-5 mr-2" />
        Try Another Outfit
      </button>
    </div>
  );
};

export default ResultDisplay;
