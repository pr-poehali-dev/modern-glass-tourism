import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-[#070a12] text-white py-12 px-4 border-t border-white/5">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Icon name="Waves" size={32} className="text-burnt-orange" />
          <span className="text-2xl font-light tracking-wide text-deep-gray">Горизонт</span>
        </div>
        <p className="text-warm-gray mb-6 font-light">
          Туристическая база на первой линии моря
        </p>
        <div className="flex justify-center gap-6 mb-6">
          {['Instagram', 'Facebook', 'MessageCircle'].map((icon) => (
            <button key={icon} className="glass-card p-3 rounded-full hover-scale">
              <Icon name={icon} size={20} className="text-deep-gray" />
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
