import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 animate-ping">
            <Icon name="Waves" size={80} className="text-burnt-orange/30 mx-auto" />
          </div>
          <Icon name="Waves" size={80} className="text-burnt-orange mx-auto relative" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-extralight text-deep-gray tracking-wide">
            Горизонт
          </h1>
          <div className="flex justify-center gap-1">
            <div className="w-2 h-2 bg-burnt-orange rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-burnt-orange rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-burnt-orange rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
