import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Logo from '@/components/Logo';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Главная', id: 'home' },
    { name: 'Номера', id: 'rooms' },
    { name: 'Бронирование', id: 'booking' },
    { name: 'Отзывы', id: 'reviews' },
    { name: 'Контакты', id: 'contacts' }
  ];

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 editorial-nav">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Logo size={32} />
            <span className="font-soyuz text-xl font-bold tracking-tight text-charcoal">
              Горизонт
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className="font-aubrey text-sm text-ink-muted hover:text-charcoal transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
            <a href="tel:+79184718383">
              <button className="editorial-button font-aubrey px-4 py-2 text-sm rounded-lg">
                +7 (918) 471-83-83
              </button>
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-charcoal hover:text-terracotta transition-colors"
            aria-label="Меню"
          >
            <Icon name={isOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-paper z-40 transform transition-transform duration-300 ease-out shadow-lg border-l border-warm-border ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          <div className="space-y-1 flex-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className="font-aubrey w-full text-left px-4 py-3 text-charcoal hover:text-terracotta hover:bg-paper-warm rounded-lg transition-all duration-150 text-base"
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="border-t border-warm-border pt-5 pb-8">
            <a href="tel:+79184718383" className="block">
              <button className="editorial-button font-aubrey w-full py-3 rounded-lg text-sm">
                <Icon name="Phone" size={16} className="inline mr-2" />
                +7 (918) 471-83-83
              </button>
            </a>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-charcoal/30 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
