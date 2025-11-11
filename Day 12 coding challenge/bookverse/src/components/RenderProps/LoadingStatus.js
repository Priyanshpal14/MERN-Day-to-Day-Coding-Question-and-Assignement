import React from 'react';
import { Loader } from 'lucide-react';

const LoadingStatus = ({ children }) => {
  return children({
    renderLoader: (message = "Loading...") => (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader className="w-8 h-8 text-purple-600 animate-spin mx-auto mb-3" />
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    ),
    renderError: (error) => (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-semibold mb-2">Error Loading Data</p>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    )
  });
};

export default LoadingStatus;