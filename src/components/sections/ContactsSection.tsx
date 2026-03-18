import Icon from '@/components/ui/icon';

export default function ContactsSection() {
  return (
    <section id="contacts" className="py-10 md:py-14 px-4">
      <div className="container mx-auto max-w-5xl">

        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-px bg-terracotta inline-block" />
            <span className="label-caps">Как нас найти</span>
          </div>
          <h2 className="font-soyuz text-4xl sm:text-5xl text-charcoal mb-0">Контакты</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-stretch">

          {/* Contact info */}
          <div className="editorial-card-flat p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <p className="label-caps mb-2">Телефон / WhatsApp</p>
              <a
                href="https://wa.me/79184718383"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <Icon name="Phone" size={18} className="text-terracotta shrink-0" />
                <span className="font-soyuz text-2xl sm:text-3xl text-charcoal group-hover:text-terracotta transition-colors">
                  +7 (918) 471-83-83
                </span>
              </a>
            </div>

            <div className="editorial-divider" />

            <div>
              <p className="label-caps mb-2">Адрес</p>
              <a
                href="https://yandex.ru/maps/?from=mapframe&ll=37.599902%2C45.543168&pt=37.599902%2C45.543168&source=mapframe&utm_source=mapframe&z=15"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <Icon name="MapPin" size={18} className="text-terracotta shrink-0 mt-0.5" />
                <span className="font-aubrey text-ink-muted text-base leading-relaxed group-hover:text-charcoal transition-colors">
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
              className="block"
            >
              <button className="editorial-button font-aubrey w-full py-3 rounded-lg text-sm">
                <Icon name="MessageCircle" size={16} className="inline mr-2" />
                Написать в WhatsApp
              </button>
            </a>
          </div>

          {/* Map — same height as the card on the left */}
          <div className="editorial-card-flat overflow-hidden rounded-xl min-h-[280px]">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=37.599902%2C45.543168&z=15&l=map&pt=37.599902,45.543168,pm2rdm"
              width="100%"
              height="100%"
              style={{ display: 'block', minHeight: '280px' }}
              frameBorder="0"
              allowFullScreen
              title="Карта расположения Горизонт"
            />
          </div>

        </div>
      </div>
    </section>
  );
}