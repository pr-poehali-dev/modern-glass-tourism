import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function ContactsSection() {
  return (
    <section id="contacts" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extralight text-deep-gray mb-4 tracking-wide">
            Контакты
          </h2>
          <p className="text-xl text-warm-gray font-light">
            Свяжитесь с нами любым удобным способом
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: 'MapPin', title: 'Адрес', text: 'г. Сочи, ул. Морская, 123' },
            { icon: 'Phone', title: 'Телефон', text: '+7 (999) 123-45-67' },
            { icon: 'Mail', title: 'Email', text: 'info@horizon-resort.ru' }
          ].map((contact) => (
            <Card key={contact.title} className="glass-card p-6 hover-scale">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-burnt-orange to-accent-orange flex items-center justify-center flex-shrink-0">
                  <Icon name={contact.icon} size={26} className="text-white" />
                </div>
                <div>
                  <p className="text-warm-gray/70 text-sm font-light mb-1">{contact.title}</p>
                  <p className="text-deep-gray font-light text-lg">{contact.text}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
