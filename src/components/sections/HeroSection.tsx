import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {

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
                className="glass-button-outline hover-scale text-deep-gray"
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


    </section>
  );
}