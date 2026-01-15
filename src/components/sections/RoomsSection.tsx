import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface RoomsSectionProps {
  onBookRoom: (roomType: string) => void;
}

interface Room {
  title: string;
  price: string;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  features: string[];
}

export default function RoomsSection({ onBookRoom }: RoomsSectionProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const rooms: Room[] = [
    {
      title: 'Комфорт',
      price: '6 000',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80'
      ],
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
      gallery: [
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
        'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80',
        'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=1200&q=80'
      ],
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

  const openModal = (room: Room) => {
    setSelectedRoom(room);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedRoom(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedRoom.gallery.length);
    }
  };

  const prevImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedRoom.gallery.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      <section id="rooms" className="py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-deep-gray mb-4 tracking-wide">
              Наши номера
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-warm-gray font-light">
              Выберите идеальный вариант для вашего отдыха
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {rooms.map((room) => (
              <Card 
                key={room.title} 
                className="glass-card overflow-hidden hover-scale"
              >
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-burnt-orange/90 backdrop-blur-sm text-white px-3 sm:px-4 py-1.5 sm:py-2">
                    <span className="text-lg sm:text-2xl font-extralight">{room.price}</span>
                    <span className="text-xs sm:text-sm font-light"> ₽/сутки</span>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-light text-deep-gray mb-2 tracking-wide">
                    {room.title}
                  </h3>
                  
                  <p className="text-warm-gray/80 font-light text-sm mb-4 leading-relaxed">
                    {room.shortDescription}
                  </p>

                  <div className="flex gap-3">
                    <Button 
                      variant="outline"
                      className="flex-1 glass-card border-burnt-orange/20 hover:bg-burnt-orange/5 font-light"
                      onClick={() => openModal(room)}
                    >
                      Подробнее
                      <Icon name="ChevronRight" size={16} className="ml-2" />
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

      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={closeModal}
          />
          
          <div className="relative bg-[#070a12]/95 backdrop-blur-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 glass-card p-2 hover-scale"
            >
              <Icon name="X" size={24} className="text-deep-gray" />
            </button>

            <div className="relative h-64 sm:h-80 md:h-96 bg-black">
              <img
                src={selectedRoom.gallery[currentImageIndex]}
                alt={`${selectedRoom.title} - фото ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 glass-card p-2 sm:p-3 hover-scale"
              >
                <Icon name="ChevronLeft" size={20} className="sm:w-6 sm:h-6 text-white" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 glass-card p-2 sm:p-3 hover-scale"
              >
                <Icon name="ChevronRight" size={20} className="sm:w-6 sm:h-6 text-white" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {selectedRoom.gallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex 
                        ? 'bg-burnt-orange w-8' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <h3 className="text-2xl sm:text-3xl font-light text-deep-gray tracking-wide">
                  {selectedRoom.title}
                </h3>
                <div className="text-left sm:text-right">
                  <span className="text-2xl sm:text-3xl font-extralight text-burnt-orange">{selectedRoom.price}</span>
                  <span className="text-warm-gray font-light text-sm sm:text-base"> ₽/сутки</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-warm-gray/90 font-light leading-relaxed mb-6">
                {selectedRoom.description}
              </p>

              <h4 className="text-lg sm:text-xl font-light text-deep-gray mb-4 tracking-wide">
                Удобства
              </h4>
              <ul className="grid sm:grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
                {selectedRoom.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-warm-gray font-light">
                    <Icon name="Check" size={18} className="text-burnt-orange mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full glass-button font-light text-base sm:text-lg py-4 sm:py-6"
                onClick={() => {
                  onBookRoom(selectedRoom.title);
                  closeModal();
                }}
              >
                Забронировать номер
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}