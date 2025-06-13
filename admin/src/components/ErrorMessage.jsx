import React from 'react';
import { MdError } from 'react-icons/md';

const ErrorMessage = ({ message }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
        <MdError className="text-red-500 text-4xl mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-700 mb-2">Error</h3>
        <p className="text-red-600">{message || 'Something went wrong. Please try again.'}</p>
      </div>
    </div>
  );
};

export default ErrorMessage; 