import React from 'react';
import { GoogleLoginButton } from './GoogleLogin';

interface GoogleLoginSectionProps {
  onGoogleLogin: () => void;
  isGoogleLoading: boolean;
  disabled?: boolean;
  className?: string;
}

export const GoogleLoginSection: React.FC<GoogleLoginSectionProps> = ({
  onGoogleLogin,
  isGoogleLoading,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            Hoặc
          </span>
        </div>
      </div>
      
      <GoogleLoginButton 
        onClick={onGoogleLogin}
        isLoading={isGoogleLoading}
        disabled={disabled}
        variant="outline"
        className="border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-sm transition-all duration-200"
      />
    </div>
  );
};
