import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';

const withLoadingSpinner = (WrappedComponent) => {
  return function WithLoadingComponent(props) {
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }, []);

    if (isInitialLoading) {
      return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="text-center">
            <Loader className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-semibold">Loading BookVerse...</p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withLoadingSpinner;