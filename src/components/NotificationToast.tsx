"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface NotificationToastProps {
  message: string;
  type: "success" | "error" | "info" | "warning";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function NotificationToast({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  duration = 4000 
}: NotificationToastProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-100 border-green-400 text-green-800";
      case "error":
        return "bg-red-100 border-red-400 text-red-800";
      case "warning":
        return "bg-yellow-100 border-yellow-400 text-yellow-800";
      case "info":
      default:
        return "bg-blue-100 border-blue-400 text-blue-800";
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
      default:
        return "ℹ️";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm w-full transition-all duration-300 ${
        isAnimating 
          ? "transform translate-x-0 opacity-100" 
          : "transform translate-x-full opacity-0"
      }`}
    >
      <div className={`border-l-4 p-4 rounded-lg shadow-lg ${getTypeStyles()}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getTypeIcon()}</span>
            <p className="text-sm font-medium">{message}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsAnimating(false);
              setTimeout(onClose, 300);
            }}
            className="ml-2 text-current hover:bg-transparent"
          >
            ✕
          </Button>
        </div>
      </div>
    </div>
  );
}