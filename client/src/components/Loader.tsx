import { Loader2 } from "lucide-react";

export function Loader({ isLoading = true, message = "Loading Dashboard..." }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />

          <div className="absolute inset-0 h-12 w-12 rounded-full bg-blue-100 animate-ping opacity-20"></div>
        </div>
        
        <div className="text-center">
          <p className="text-lg font-medium text-gray-800">{message}</p>
          <p className="text-sm text-gray-500 mt-1">Please wait a moment</p>
        </div>
        
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};
