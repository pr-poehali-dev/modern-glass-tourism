import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function ContactsSection() {
  return (
    <section id="contacts" className="py-12 md:py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-deep-gray mb-4 tracking-wide">
            Контакты
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-warm-gray font-light">
            Забронируйте уже сейчас
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto items-start">
          <div className="p-6 sm:p-8 md:p-10 space-y-6">
            <div className="space-y-4">
              <p className="text-warm-gray/70 text-sm sm:text-base font-light uppercase tracking-wider">
                Телефон
              </p>
              <a 
                href="https://wa.me/79184718383" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-2xl sm:text-3xl md:text-4xl font-light text-deep-gray hover:text-burnt-orange transition-colors duration-300"
              >
                +7 (918) 471-83-83
              </a>
            </div>

            <div className="space-y-4 pt-4 border-t border-warm-gray/10">
              <p className="text-warm-gray/70 text-sm sm:text-base font-light uppercase tracking-wider">
                Адрес
              </p>
              <a
                href="https://yandex.ru/maps/?from=mapframe&ll=37.599902%2C45.543168&pt=37.599902%2C45.543168&source=mapframe&utm_source=mapframe&z=15"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-base sm:text-lg md:text-xl font-light text-deep-gray hover:text-burnt-orange transition-colors duration-300 leading-relaxed"
              >
                Территория Урочище Кучугуры, 24/27, хутор Верхний, Черноерковское сельское поселение, Славянский район, Краснодарский край
              </a>
            </div>
          </div>

          <Card className="glass-card p-2 overflow-hidden">
            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-lg overflow-hidden">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.599902%2C45.543168&z=15&l=map&pt=37.599902,45.543168,pm2rdm"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="rounded-lg"
                title="Карта расположения Горизонт"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}