import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
  size?: "small" | "medium" | "large";
}

const Loading: React.FC<LoadingProps> = ({
  message = "Loading...",
  size = "medium",
}) => {
  // Determine size classes
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  }[size];

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className={`${sizeClasses} text-blue-500 animate-spin`} />
        <p className="text-gray-600 font-medium animate-pulse">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
