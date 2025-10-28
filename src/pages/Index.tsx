import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    roomType: '',
    guests: 2
  });

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1220] to-[#121826]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Waves" size={32} className="text-burnt-orange" />
            <span className="text-2xl font-light tracking-wide text-deep-gray">
              Azure Bay
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {['Главная', 'Номера', 'Бронирование', 'Галерея', 'Отзывы', 'Контакты'].map((item, idx) => (
              <button
                key={item}
                onClick={() => scrollToSection(['home', 'rooms', 'booking', 'gallery', 'reviews', 'contacts'][idx])}
                className="text-deep-gray/90 hover:text-burnt-orange transition-colors font-light"
              >
                {item}
              </button>
            ))}
          </div>

          <Button className="glass-button font-light">
            <Icon name="Phone" size={18} className="mr-2" />
            Позвонить
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl lg:text-7xl font-extralight leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-burnt-orange via-accent-orange to-warm-gray bg-clip-text text-transparent">
                  Ваш райский
                </span>
                <br />
                <span className="text-deep-gray">уголок у моря</span>
              </h1>
              
              <p className="text-xl text-warm-gray leading-relaxed font-light">
                Первая линия моря, подогреваемый бассейн и комфортабельные номера 
                для незабываемого отдыха
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="glass-button hover-scale font-light"
                  onClick={() => scrollToSection('booking')}
                >
                  Забронировать
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-burnt-orange/50 text-deep-gray hover:bg-burnt-orange/20 font-light backdrop-blur-xl"
                  onClick={() => scrollToSection('rooms')}
                >
                  Посмотреть номера
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                {[
                  { icon: 'Waves', text: 'Первая линия' },
                  { icon: 'Droplets', text: 'Бассейн' },
                  { icon: 'Home', text: 'Комфорт' }
                ].map((feature) => (
                  <div key={feature.text} className="glass-card p-4 text-center hover-scale">
                    <Icon name={feature.icon} size={32} className="mx-auto mb-2 text-burnt-orange" />
                    <p className="text-sm font-light text-deep-gray/90">{feature.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="glass-elevated rounded-3xl overflow-hidden aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800" 
                  alt="Вид на море"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-card p-6 max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Star" size={24} className="text-accent-orange fill-accent-orange" />
                  <span className="text-3xl font-light text-deep-gray">4.9</span>
                </div>
                <p className="text-sm text-warm-gray font-light">Средняя оценка гостей</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extralight text-deep-gray mb-4 tracking-wide">
              Наши номера
            </h2>
            <p className="text-xl text-warm-gray font-light">
              Выберите идеальный вариант для вашего отдыха
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Стандарт',
                price: '3 500',
                icon: 'Home',
                features: ['2 человека', 'Балкон', 'Wi-Fi', 'Кондиционер']
              },
              {
                title: 'Комфорт',
                price: '5 000',
                icon: 'Hotel',
                features: ['2-3 человека', 'Вид на море', 'Мини-бар', 'Сейф'],
                featured: true
              },
              {
                title: 'Люкс',
                price: '7 500',
                icon: 'Crown',
                features: ['4 человека', 'Панорамный вид', 'Джакузи', 'VIP обслуживание']
              }
            ].map((room) => (
              <Card 
                key={room.title} 
                className={`glass-card p-6 hover-scale ${room.featured ? 'ring-2 ring-burnt-orange/50' : ''}`}
              >
                {room.featured && (
                  <div className="bg-gradient-to-r from-burnt-orange to-accent-orange text-white text-xs font-light px-3 py-1 rounded-full inline-block mb-4 tracking-wider">
                    ПОПУЛЯРНЫЙ
                  </div>
                )}
                
                <Icon name={room.icon} size={40} className="text-burnt-orange mb-4" />
                
                <h3 className="text-2xl font-light text-deep-gray mb-2 tracking-wide">
                  {room.title}
                </h3>
                
                <div className="mb-6">
                  <span className="text-4xl font-extralight text-burnt-orange">{room.price}</span>
                  <span className="text-warm-gray font-light"> ₽/ночь</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {room.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-warm-gray font-light">
                      <Icon name="Check" size={18} className="text-burnt-orange" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full glass-button font-light"
                  onClick={() => {
                    setBookingData({ ...bookingData, roomType: room.title });
                    scrollToSection('booking');
                  }}
                >
                  Забронировать
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 px-4 bg-gradient-to-br from-burnt-orange/10 to-transparent">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-extralight text-deep-gray mb-4 tracking-wide">
              Забронировать номер
            </h2>
            <p className="text-xl text-warm-gray font-light">
              Заполните форму и мы свяжемся с вами
            </p>
          </div>

          <Card className="glass-elevated p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Имя</Label>
                <Input 
                  id="name"
                  placeholder="Ваше имя"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  className="glass-input"
                />
              </div>

              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input 
                  id="phone"
                  placeholder="+7 (___) ___-__-__"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                  className="glass-input"
                />
              </div>

              <div>
                <Label htmlFor="checkIn">Заезд</Label>
                <Input 
                  id="checkIn"
                  type="date"
                  value={bookingData.checkIn}
                  onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                  className="glass-input"
                />
              </div>

              <div>
                <Label htmlFor="checkOut">Выезд</Label>
                <Input 
                  id="checkOut"
                  type="date"
                  value={bookingData.checkOut}
                  onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                  className="glass-input"
                />
              </div>

              <div>
                <Label htmlFor="roomType">Тип номера</Label>
                <select 
                  id="roomType"
                  value={bookingData.roomType}
                  onChange={(e) => setBookingData({ ...bookingData, roomType: e.target.value })}
                  className="w-full px-3 py-2 glass-input rounded-md"
                >
                  <option value="">Выберите номер</option>
                  <option value="Стандарт">Стандарт</option>
                  <option value="Комфорт">Комфорт</option>
                  <option value="Люкс">Люкс</option>
                </select>
              </div>

              <div>
                <Label htmlFor="guests">Гостей</Label>
                <Input 
                  id="guests"
                  type="number"
                  min="1"
                  max="6"
                  value={bookingData.guests}
                  onChange={(e) => setBookingData({ ...bookingData, guests: parseInt(e.target.value) })}
                  className="glass-input"
                />
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="message">Комментарий</Label>
              <Textarea 
                id="message"
                placeholder="Дополнительные пожелания..."
                rows={4}
                className="glass-input"
              />
            </div>

            <Button className="w-full mt-8 glass-button text-lg py-6 font-light">
              Отправить заявку
              <Icon name="Send" size={20} className="ml-2" />
            </Button>
          </Card>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extralight text-deep-gray mb-4 tracking-wide">
              Галерея
            </h2>
            <p className="text-xl text-warm-gray font-light">
              Наша территория и номера
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
              'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
              'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
              'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
              'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400',
              'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400',
              'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400',
              'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400'
            ].map((src, idx) => (
              <div 
                key={idx} 
                className="glass-card overflow-hidden rounded-2xl aspect-square hover-scale"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <img 
                  src={src}
                  alt={`Галерея ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 px-4 bg-gradient-to-br from-transparent to-burnt-orange/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extralight text-deep-gray mb-4 tracking-wide">
              Отзывы гостей
            </h2>
            <p className="text-xl text-warm-gray font-light">
              Что говорят наши гости
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Анна Смирнова',
                rating: 5,
                text: 'Потрясающее место! Вид на море из окна просто завораживает. Бассейн всегда чистый и теплый. Обязательно вернемся!'
              },
              {
                name: 'Дмитрий Иванов',
                rating: 5,
                text: 'Отличное соотношение цены и качества. Персонал очень внимательный. Территория ухоженная, все продумано до мелочей.'
              },
              {
                name: 'Елена Петрова',
                rating: 5,
                text: 'Идеальное место для отдыха с семьей. Дети в восторге от бассейна! Номера комфортные, всё необходимое есть.'
              }
            ].map((review, idx) => (
              <Card 
                key={idx} 
                className="glass-card p-6 animate-fade-in"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-accent-orange fill-accent-orange" />
                  ))}
                </div>
                
                <p className="text-warm-gray mb-4 italic font-light">
                  "{review.text}"
                </p>
                
                <p className="font-normal text-deep-gray">
                  {review.name}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts Section */}
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

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              {[
                { icon: 'MapPin', title: 'Адрес', text: 'г. Сочи, ул. Приморская, 1' },
                { icon: 'Phone', title: 'Телефон', text: '+7 (800) 123-45-67' },
                { icon: 'Mail', title: 'Email', text: 'info@azurebay.ru' },
                { icon: 'Clock', title: 'Режим работы', text: 'Круглосуточно' }
              ].map((contact) => (
                <Card key={contact.title} className="glass-card p-6 flex items-center gap-4 hover-scale">
                  <div className="glass-elevated p-3 rounded-xl">
                    <Icon name={contact.icon} size={28} className="text-burnt-orange" />
                  </div>
                  <div>
                    <p className="font-normal text-deep-gray mb-1">{contact.title}</p>
                    <p className="text-warm-gray font-light">{contact.text}</p>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="glass-elevated p-8 h-fit">
              <h3 className="text-2xl font-light text-deep-gray mb-6 tracking-wide">Быстрая связь</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="contact-name">Имя</Label>
                  <Input id="contact-name" placeholder="Ваше имя" className="glass-input" />
                </div>
                
                <div>
                  <Label htmlFor="contact-phone">Телефон</Label>
                  <Input id="contact-phone" placeholder="+7 (___) ___-__-__" className="glass-input" />
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

      {/* Footer */}
      <footer className="bg-[#070a12] text-white py-12 px-4 border-t border-white/5">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Waves" size={32} className="text-burnt-orange" />
            <span className="text-2xl font-light tracking-wide text-deep-gray">Azure Bay</span>
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
            © 2025 Azure Bay. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}