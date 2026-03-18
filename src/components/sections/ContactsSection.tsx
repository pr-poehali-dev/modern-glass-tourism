import Icon from '@/components/ui/icon';

export default function ContactsSection() {
  return (
    <section id="contacts" className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-5xl">

        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-px bg-terracotta inline-block" />
            <span className="label-caps">Как нас найти</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl text-charcoal mb-4"
            style={{ fontFamily: '"Soyuz Grotesk", Georgia, serif', fontWeight: 700, letterSpacing: '-0.02em' }}
          >
            Контакты
          </h2>
          <p className="text-ink-muted text-lg">Забронируйте уже сейчас</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <p className="label-caps mb-3">Телефон / WhatsApp</p>
              <a
                href="https://wa.me/79184718383"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <Icon name="Phone" size={18} className="text-terracotta shrink-0" />
                <span
                  className="text-2xl sm:text-3xl text-charcoal group-hover:text-terracotta transition-colors"
                  style={{ fontFamily: '"Soyuz Grotesk", Georgia, serif', fontWeight: 700 }}
                >
                  +7 (918) 471-83-83
                </span>
              </a>
            </div>

            <div className="editorial-divider" />

            <div>
              <p className="label-caps mb-3">Адрес</p>
              <a
                href="https://yandex.ru/maps/?from=mapframe&ll=37.599902%2C45.543168&pt=37.599902%2C45.543168&source=mapframe&utm_source=mapframe&z=15"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <Icon name="MapPin" size={18} className="text-terracotta shrink-0 mt-1" />
                <span className="text-ink-muted text-base leading-relaxed group-hover:text-charcoal transition-colors">
                  Территория Урочище Кучугуры, 24/27, хутор Верхний,
                  Черноерковское сельское поселение,
                  Славянский район, Краснодарский край
                </span>
              </a>
            </div>

            <div className="editorial-divider" />

            <a
              href="https://wa.me/79184718383"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="editorial-button px-6 py-3 rounded-lg text-sm">
                <Icon name="MessageCircle" size={16} className="inline mr-2" />
                Написать в WhatsApp
              </button>
            </a>
          </div>

          {/* Map */}
          <div className="editorial-card-flat overflow-hidden rounded-xl">
            <div className="relative w-full h-[300px] sm:h-[380px] lg:h-[420px]">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.599902%2C45.543168&z=15&l=map&pt=37.599902,45.543168,pm2rdm"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="Карта расположения Горизонт"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
