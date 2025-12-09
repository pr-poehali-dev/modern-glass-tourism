import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Главная', id: 'home' },
    { name: 'Номера', id: 'rooms' },
    { name: 'Бронирование', id: 'booking' },
    { name: 'Галерея', id: 'gallery' },
    { name: 'Отзывы', id: 'reviews' },
    { name: 'Контакты', id: 'contacts' }
  ];

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Waves" size={32} className="text-burnt-orange" />
            <span className="text-2xl font-light tracking-wide text-deep-gray">
              Горизонт
            </span>
          </div>

          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="glass-button font-light"
          >
            <Icon name={isOpen ? "X" : "Menu"} size={24} />
          </Button>
        </div>
      </nav>

      {/* Бургер-меню */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#070a12]/95 backdrop-blur-xl z-40 transform transition-transform duration-300 shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-6">
          <div className="space-y-2 flex-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className="w-full text-left px-6 py-4 text-deep-gray hover:text-burnt-orange hover:bg-burnt-orange/5 rounded-lg transition-all font-light text-lg"
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="border-t border-white/5 pt-6 pb-8">
            <a href="tel:+79991234567" className="block">
              <Button className="w-full glass-button font-light justify-center">
                <Icon name="Phone" size={18} className="mr-2" />
                +7 (999) 123-45-67
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Оверлей */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
