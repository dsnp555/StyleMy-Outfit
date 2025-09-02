
import React, { useState, useCallback } from 'react';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import Header from './components/Header';
import Footer from './components/Footer';
import Spinner from './components/Spinner';
import { virtualTryOn } from './services/geminiService';
import type { GeneratedResult } from './types';
import { SparklesIcon } from './components/Icons';

const App: React.FC = () => {
  const [personImage, setPersonImage] = useState<File | null>(null);
  const [outfitImage, setOutfitImage] = useState<File | null>(null);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTryOn = useCallback(async () => {
    if (!personImage || !outfitImage) {
      setError("Please upload both images before trying on.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const generatedResult = await virtualTryOn(personImage, outfitImage);
      setResult(generatedResult);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [personImage, outfitImage]);

  const handleReset = () => {
    setPersonImage(null);
    setOutfitImage(null);
    setResult(null);
    setError(null);
    setIsLoading(false);
  };
  
  const isButtonDisabled = !personImage || !outfitImage || isLoading;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900">Your Virtual Fitting Room</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Upload a photo of yourself and an outfit you like. Our AI will show you how it looks on you in seconds.
          </p>
        </div>

        {isLoading && <Spinner />}

        {!isLoading && !result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ImageUploader
              title="Upload Your Photo"
              description="For best results, use a clear, full-body photo."
              onFileSelect={setPersonImage}
              file={personImage}
              id="person-uploader"
            />
            <ImageUploader
              title="Upload Outfit Photo"
              description="A photo of the clothing on a plain background works best."
              onFileSelect={setOutfitImage}
              file={outfitImage}
              id="outfit-uploader"
            />
          </div>
        )}

        {error && (
            <div className="text-center text-red-600 bg-red-100 border border-red-400 p-4 rounded-lg max-w-md mx-auto mt-8">
              <p className="font-semibold">Oops! Something went wrong.</p>
              <p>{error}</p>
            </div>
        )}
        
        {!isLoading && result && (
          <ResultDisplay result={result} onReset={handleReset} />
        )}

        {!result && (
          <div className="text-center mt-12">
            <button
              onClick={handleTryOn}
              disabled={isButtonDisabled}
              className={`inline-flex items-center justify-center px-12 py-4 border border-transparent text-lg font-semibold rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100`}
            >
              <SparklesIcon className="w-6 h-6 mr-3" />
              {isLoading ? 'Styling Your Look...' : 'Try It On!'}
            </button>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default App;
