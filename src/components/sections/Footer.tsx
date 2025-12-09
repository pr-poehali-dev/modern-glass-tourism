import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-[#070a12] text-white py-8 md:py-12 px-4 border-t border-white/5">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
          <Icon name="Waves" size={28} className="sm:w-8 sm:h-8 text-burnt-orange" />
          <span className="text-xl sm:text-2xl font-light tracking-wide text-deep-gray">Горизонт</span>
        </div>
        <p className="text-sm sm:text-base text-warm-gray mb-4 md:mb-6 font-light">
          Туристическая база на первой линии моря
        </p>
        <div className="flex justify-center gap-4 sm:gap-6 mb-4 md:mb-6">
          {['Instagram', 'Facebook', 'MessageCircle'].map((icon) => (
            <button key={icon} className="glass-card p-2 sm:p-3 rounded-full hover-scale">
              <Icon name={icon} size={18} className="sm:w-5 sm:h-5 text-deep-gray" />
            </button>
          ))}
        </div>
        <p className="text-warm-gray/60 text-sm font-light">
          © 2025 Горизонт. Все права защищены.
        </p>
      </div>
    </footer>
  );
}