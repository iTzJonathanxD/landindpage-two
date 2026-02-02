import React from 'react';

const Badge = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className={`w-20 h-6 flex items-center justify-center rounded-t-full rounded-r-full ${className}`}>
      <svg className="w-4 h-4 text-white mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-3-3h-4a3 3 0 00-3 3v2h5m-6 0v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5m6 0h6"></path>
      </svg>
      <span className="text-white text-sm">{text}</span>
    </div>
  );
};

export default Badge;
