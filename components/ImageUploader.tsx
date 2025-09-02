
import React, { useState, useCallback, useMemo } from 'react';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
  title: string;
  description: string;
  onFileSelect: (file: File) => void;
  file: File | null;
  id: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ title, description, onFileSelect, file, id }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center text-center transition-all duration-300">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-1 mb-4">{description}</p>
      
      <label
        htmlFor={id}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col justify-center items-center cursor-pointer transition-colors duration-300 ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain rounded-lg" />
        ) : (
          <div className="space-y-2 text-gray-500">
            <UploadIcon className="w-10 h-10 mx-auto" />
            <p className="font-semibold">Drag & drop an image</p>
            <p className="text-xs">or click to browse</p>
          </div>
        )}
      </label>
      <input
        type="file"
        id={id}
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
      {file && (
        <div className="mt-4 text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
          {file.name}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
