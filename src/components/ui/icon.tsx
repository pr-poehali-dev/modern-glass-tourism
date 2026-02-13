import React from 'react';
import type { LucideProps } from 'lucide-react';
import {
  Waves,
  ArrowRight,
  Droplets,
  PawPrint,
  Star,
  Menu,
  X,
  Phone,
  ChevronRight,
  ChevronLeft,
  Check,
  Send,
  CircleAlert,
} from 'lucide-react';

const iconMap: Record<string, React.FC<LucideProps>> = {
  Waves,
  ArrowRight,
  Droplets,
  PawPrint,
  Star,
  Menu,
  X,
  Phone,
  ChevronRight,
  ChevronLeft,
  Check,
  Send,
  CircleAlert,
};

interface IconProps extends LucideProps {
  name: string;
  fallback?: string;
}

const Icon: React.FC<IconProps> = ({ name, fallback = 'CircleAlert', ...props }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    const FallbackIcon = iconMap[fallback];
    if (!FallbackIcon) {
      return <span className="text-xs text-gray-400">[icon]</span>;
    }
    return <FallbackIcon {...props} />;
  }

  return <IconComponent {...props} />;
};

export default Icon;
