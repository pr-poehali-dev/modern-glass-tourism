import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface RoomsSectionProps {
  onBookRoom: (roomType: string) => void;
}

export default function RoomsSection({ onBookRoom }: RoomsSectionProps) {
  const rooms = [
    {
      title: 'Комфорт',
      price: '6 000',
      icon: 'Home',
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
      icon: 'Crown',
      description: 'Двухкомнатный коттедж для четырех человек. Индивидуальный выход к бассейну, первая линия с панорамным окном, открывающим бесподобный вид на море. Спальня с двухместной кроватью, большим шифоньером для хранения вещей. Просторный зал с раскладывающимся диваном, комодом и столиком.',
      features: [
        'Собственный выход к бассейну',
        'Панорамное окно с видом на море',
        'Две комнаты (до 4 человек)',
        'Бесплатный Wi-Fi',
        'Сплит-система',
        'Полностью оборудованная кухня',
        'Телевизор со спутниковыми каналами'
      ],
      featured: true
    }
  ];

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
              
              <div className="mb-4">
                <span className="text-4xl font-extralight text-burnt-orange">{room.price}</span>
                <span className="text-warm-gray font-light"> ₽/сутки</span>
              </div>

              <p className="text-warm-gray/80 font-light text-sm mb-6 leading-relaxed">
                {room.description}
              </p>

              <ul className="space-y-2 mb-6">
                {room.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-warm-gray font-light text-sm">
                    <Icon name="Check" size={16} className="text-burnt-orange mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full glass-button font-light"
                onClick={() => onBookRoom(room.title)}
              >
                Забронировать
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
