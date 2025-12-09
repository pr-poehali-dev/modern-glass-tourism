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

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {[
            { icon: 'MapPin', title: 'Адрес', text: 'г. Сочи, ул. Морская, 123' },
            { icon: 'Phone', title: 'Телефон', text: '+7 (999) 123-45-67' },
            { icon: 'Mail', title: 'Email', text: 'info@horizon-resort.ru' }
          ].map((contact) => (
            <Card key={contact.title} className="glass-card p-4 sm:p-6 hover-scale sm:col-span-1 last:sm:col-span-2 last:md:col-span-1">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-burnt-orange to-accent-orange flex items-center justify-center flex-shrink-0">
                  <Icon name={contact.icon} size={22} className="sm:w-[26px] sm:h-[26px] text-white" />
                </div>
                <div>
                  <p className="text-warm-gray/70 text-sm font-light mb-1">{contact.title}</p>
                  <p className="text-deep-gray font-light text-base sm:text-lg break-words">{contact.text}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}