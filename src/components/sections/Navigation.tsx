import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Waves" size={32} className="text-burnt-orange" />
          <span className="text-2xl font-light tracking-wide text-deep-gray">
            Горизонт
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          {['Главная', 'Номера', 'Бронирование', 'Галерея', 'Отзывы', 'Контакты'].map((item, idx) => (
            <button
              key={item}
              onClick={() => onNavigate(['home', 'rooms', 'booking', 'gallery', 'reviews', 'contacts'][idx])}
              className="text-deep-gray/90 hover:text-burnt-orange transition-colors font-light"
            >
              {item}
            </button>
          ))}
        </div>

        <Button className="glass-button font-light">
          <Icon name="Phone" size={18} className="mr-2" />
          Позвонить
        </Button>
      </div>
    </nav>
  );
}
