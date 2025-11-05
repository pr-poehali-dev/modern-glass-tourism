import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            {[
              { icon: 'MapPin', title: 'Адрес', text: 'г. Сочи, ул. Морская, 123' },
              { icon: 'Phone', title: 'Телефон', text: '+7 (999) 123-45-67' },
              { icon: 'Mail', title: 'Email', text: 'info@horizon-resort.ru' },
              { icon: 'Clock', title: 'Режим работы', text: 'Круглосуточно' }
            ].map((contact) => (
              <Card key={contact.title} className="glass-card p-6 hover-scale">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-burnt-orange to-accent-orange flex items-center justify-center flex-shrink-0">
                    <Icon name={contact.icon} size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-warm-gray/70 text-sm font-light">{contact.title}</p>
                    <p className="text-deep-gray font-light text-lg">{contact.text}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="glass-elevated p-8">
            <h3 className="text-2xl font-light text-deep-gray mb-6 tracking-wide">
              Напишите нам
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="contact-name">Имя</Label>
                <Input id="contact-name" placeholder="Ваше имя" className="glass-input" />
              </div>

              <div>
                <Label htmlFor="contact-email">Email</Label>
                <Input id="contact-email" type="email" placeholder="your@email.com" className="glass-input" />
              </div>

              <div>
                <Label htmlFor="contact-message">Сообщение</Label>
                <Textarea id="contact-message" placeholder="Ваш вопрос..." rows={4} className="glass-input" />
              </div>

              <Button className="w-full glass-button font-light">
                Отправить
                <Icon name="Send" size={18} className="ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
