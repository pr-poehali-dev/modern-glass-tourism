import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section id="home" className="pt-24 md:pt-32 pb-10 md:pb-14 px-4">
      <div className="container mx-auto max-w-5xl">

        {/* Label */}
        <div className="flex items-center gap-2 mb-8 animate-fade-in">
          <span className="w-6 h-px bg-terracotta inline-block" />
          <span className="label-caps">Туристическая база · Азовское море</span>
        </div>

        {/* Heading */}
        <h1
          className="font-soyuz text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-charcoal mb-8 animate-fade-in"
          style={{ animationDelay: '0.05s', lineHeight: 1.0, letterSpacing: '-0.03em' }}
        >
          Ваш райский
          <br />
          <span className="text-terracotta">уголок у моря</span>
        </h1>

        {/* Description */}
        <p
          className="font-aubrey text-lg md:text-xl text-ink-muted max-w-xl mb-10 leading-relaxed animate-fade-in"
          style={{ animationDelay: '0.12s' }}
        >
          Первая линия моря, подогреваемый бассейн и комфортабельные номера
          для незабываемого отдыха в Краснодарском крае.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3 mb-10 animate-fade-in" style={{ animationDelay: '0.18s' }}>
          <button
            className="editorial-button font-aubrey px-6 py-3 rounded-lg text-base"
            onClick={() => onNavigate('booking')}
          >
            Забронировать
            <Icon name="ArrowRight" size={18} className="inline ml-2" />
          </button>
          <button
            className="editorial-button-outline font-aubrey px-6 py-3 rounded-lg text-base"
            onClick={() => onNavigate('rooms')}
          >
            Посмотреть номера
          </button>
        </div>

        {/* Stats row */}
        <div className="editorial-divider mb-10 animate-fade-in" style={{ animationDelay: '0.22s' }} />
        <div className="grid grid-cols-3 gap-6 sm:gap-12 animate-fade-in" style={{ animationDelay: '0.26s' }}>
          {[
            { icon: 'Waves', value: 'Первая линия', note: 'прямой выход к морю' },
            { icon: 'Droplets', value: 'Бассейн', note: 'с подогревом' },
            { icon: 'PawPrint', value: 'С питомцами', note: 'приветствуем' },
          ].map((item) => (
            <div key={item.value} className="space-y-1">
              <Icon name={item.icon} size={20} className="text-terracotta mb-2" />
              <p className="font-soyuz text-sm font-bold text-charcoal">{item.value}</p>
              <p className="font-aubrey text-xs text-ink-muted">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}