import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface RoomsSectionProps {
  onBookRoom: (roomType: string) => void;
}

export default function RoomsSection({ onBookRoom }: RoomsSectionProps) {
  const [expandedRoom, setExpandedRoom] = useState<string | null>(null);

  const rooms = [
    {
      title: 'Комфорт',
      price: '6 000',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
      shortDescription: 'Номер для двоих с кухонной зоной и верандой',
      description: 'Номер для двоих (третье спальное место предоставляется по запросу). Светлый и уютный. В нем расположена двухспальная кровать, кухонная зона, шкаф для хранения вещей, обеденный столик, ванная комната с душем.',
      features: [
        'Бесплатный Wi-Fi',
        'Сплит-система',
        'Кухонная зона с индукционной плитой',
        'Холодильник и микроволновка',
        'Телевизор со спутниковыми каналами',
        'Просторная веранда'
      ]
    },
    {
      title: 'Премиум',
      price: '10 000',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      shortDescription: 'Двухкомнатный коттедж с панорамным видом на море',
      description: 'Двухкомнатный коттедж для четырех человек. Индивидуальный выход к бассейну, первая линия с панорамным окном, открывающим бесподобный вид на море. Спальня с двухместной кроватью, большим шифоньером для хранения вещей. Просторный зал с раскладывающимся диваном, комодом и столиком.',
      features: [
        'Собственный выход к бассейну',
        'Панорамное окно с видом на море',
        'Две комнаты (до 4 человек)',
        'Бесплатный Wi-Fi',
        'Сплит-система',
        'Полностью оборудованная кухня',
        'Телевизор со спутниковыми каналами'
      ]
    }
  ];

  const toggleExpanded = (title: string) => {
    setExpandedRoom(expandedRoom === title ? null : title);
  };

  return (
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

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {rooms.map((room) => (
            <Card 
              key={room.title} 
              className="glass-card overflow-hidden hover-scale"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-burnt-orange/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                  <span className="text-2xl font-extralight">{room.price}</span>
                  <span className="text-sm font-light"> ₽/сутки</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-light text-deep-gray mb-2 tracking-wide">
                  {room.title}
                </h3>
                
                <p className="text-warm-gray/80 font-light text-sm mb-4 leading-relaxed">
                  {room.shortDescription}
                </p>

                {expandedRoom === room.title && (
                  <div className="mb-4 space-y-4">
                    <p className="text-warm-gray/80 font-light text-sm leading-relaxed">
                      {room.description}
                    </p>

                    <ul className="space-y-2">
                      {room.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-warm-gray font-light text-sm">
                          <Icon name="Check" size={16} className="text-burnt-orange mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    className="flex-1 glass-card border-burnt-orange/20 hover:bg-burnt-orange/5 font-light"
                    onClick={() => toggleExpanded(room.title)}
                  >
                    {expandedRoom === room.title ? 'Скрыть' : 'Подробнее'}
                    <Icon name={expandedRoom === room.title ? "ChevronUp" : "ChevronDown"} size={16} className="ml-2" />
                  </Button>
                  
                  <Button 
                    className="flex-1 glass-button font-light"
                    onClick={() => onBookRoom(room.title)}
                  >
                    Забронировать
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
