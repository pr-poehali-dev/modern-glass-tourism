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
            Свяжитесь с нами любым удобным способом
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <Card className="glass-card p-4 sm:p-6 hover-scale">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-burnt-orange to-accent-orange flex items-center justify-center flex-shrink-0">
                <Icon name="MapPin" size={22} className="sm:w-[26px] sm:h-[26px] text-white" />
              </div>
              <div>
                <p className="text-warm-gray/70 text-sm font-light mb-1">Адрес</p>
                <p className="text-deep-gray font-light text-base sm:text-lg break-words">
                  Территория Урочище Кучугуры, 24/27, хутор Верхний, Черноерковское сельское поселение, Славянский район, Краснодарский край
                </p>
              </div>
            </div>
          </Card>

          <a 
            href="https://wa.me/79184718383" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="glass-card p-4 sm:p-6 hover-scale h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-burnt-orange/20">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-burnt-orange to-accent-orange flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={22} className="sm:w-[26px] sm:h-[26px] text-white" />
                </div>
                <div>
                  <p className="text-warm-gray/70 text-sm font-light mb-1">Телефон</p>
                  <p className="text-deep-gray font-light text-base sm:text-lg break-words">
                    +7 (918) 471-83-83
                  </p>
                  <p className="text-burnt-orange text-xs sm:text-sm font-light mt-2">
                    Нажмите для WhatsApp
                  </p>
                </div>
              </div>
            </Card>
          </a>
        </div>
      </div>
    </section>
  );
}