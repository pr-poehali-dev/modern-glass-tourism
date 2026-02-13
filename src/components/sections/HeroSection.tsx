import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useEffect, useRef, useCallback } from 'react';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const y = window.scrollY;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${y * 0.4}px)`;
      }
      if (wrapperRef.current) {
        const fadeStart = 300;
        const fadeEnd = 800;
        const opacity = Math.max(0, Math.min(1, 1 - (y - fadeStart) / (fadeEnd - fadeStart)));
        wrapperRef.current.style.opacity = String(opacity);
      }
      rafRef.current = 0;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  return (
    <section id="home" className="pt-24 md:pt-32 pb-8 md:pb-12 px-4 relative">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 animate-fade-in relative">
            <div className="absolute inset-0 backdrop-blur-sm bg-black/20 rounded-lg -m-4 sm:-m-6 -z-10"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extralight leading-tight tracking-tight relative">
              <span className="text-burnt-orange drop-shadow-lg">
                Ваш райский
              </span>
              <br />
              <span className="text-deep-gray drop-shadow-lg">уголок у моря</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-warm-gray leading-relaxed font-light relative drop-shadow-md">
              Первая линия моря, подогреваемый бассейн и комфортабельные номера 
              для незабываемого отдыха
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-4 pt-2 sm:pt-4">
              <Button 
                size="lg" 
                className="glass-button hover-scale font-light"
                onClick={() => onNavigate('booking')}
              >
                Забронировать
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-burnt-orange/50 text-deep-gray hover:bg-burnt-orange/10 hover:border-burnt-orange transition-all duration-300 font-light backdrop-blur-xl"
                onClick={() => onNavigate('rooms')}
              >
                Посмотреть номера
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-8">
              {[
                { icon: 'Waves', text: 'Первая линия' },
                { icon: 'Droplets', text: 'Бассейн' },
                { icon: 'PawPrint', text: 'С питомцами' }
              ].map((feature) => (
                <div key={feature.text} className="glass-card p-2 sm:p-4 text-center hover-scale">
                  <Icon name={feature.icon} size={24} className="sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-burnt-orange" />
                  <p className="text-xs sm:text-sm font-light text-deep-gray/90">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="hidden md:block absolute -bottom-6 -right-6 glass-card p-6 max-w-xs z-10">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="Star" size={24} className="text-accent-orange fill-accent-orange" />
                <span className="text-3xl font-light text-deep-gray">5.0</span>
              </div>
              <p className="text-sm text-warm-gray font-light">Средняя оценка гостей</p>
            </div>
          </div>
        </div>
      </div>

      <div 
        ref={wrapperRef}
        className="absolute left-0 right-0 bottom-0 h-[60vh] overflow-hidden pointer-events-none -z-10"
      >
        <div
          ref={parallaxRef}
          className="relative w-full h-full"
          style={{ willChange: 'transform' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80" 
            alt="Закат над морем"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            style={{
              maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)'
            }}
          />
        </div>
      </div>
    </section>
  );
}
