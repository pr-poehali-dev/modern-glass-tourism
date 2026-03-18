import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { useScrollReveal } from '@/hooks/useScrollReveal';

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
  const { ref, isVisible } = useScrollReveal();

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
      description: 'Номер для двоих (третье спальное место предоставляется по запросу). Светлый и уютный. В нём расположена двухспальная кровать, кухонная зона, шкаф для хранения вещей, обеденный столик, ванная комната с душем.',
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
      description: 'Двухкомнатный коттедж для четырёх человек. Индивидуальный выход к бассейну, первая линия с панорамным окном, открывающим бесподобный вид на море. Спальня с двухместной кроватью, большим шифоньером. Просторный зал с раскладывающимся диваном, комодом и столиком.',
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
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedRoom(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = '';
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
      <section id="rooms" className="py-10 md:py-14 px-4">
        <div className="container mx-auto max-w-5xl">

          {/* Section header */}
          <div className="mb-8 md:mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-terracotta inline-block" />
              <span className="label-caps">Размещение</span>
            </div>
            <h2 className="font-soyuz text-4xl sm:text-5xl text-charcoal mb-4">
              Наши номера
            </h2>
            <p className="font-aubrey text-ink-muted text-lg max-w-md">
              Выберите идеальный вариант для вашего отдыха
            </p>
          </div>

          <div ref={ref} className={`grid md:grid-cols-2 gap-6 scroll-reveal ${isVisible ? 'visible' : ''}`}>
            {rooms.map((room) => (
              <div key={room.title} className="editorial-card overflow-hidden group">
                {/* Image */}
                <div className="relative h-52 sm:h-60 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-3 right-3 bg-[#FDFDF1]/90 backdrop-blur-sm px-3 py-1.5 rounded-md border border-warm-border font-soyuz">
                    <span className="text-xl text-charcoal font-bold">{room.price}</span>
                    <span className="font-aubrey text-xs text-ink-muted ml-1">₽/сутки</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="font-soyuz text-2xl text-charcoal mb-2">{room.title}</h3>
                  <p className="font-aubrey text-ink-muted text-sm leading-relaxed mb-5">
                    {room.shortDescription}
                  </p>
                  <div className="editorial-divider mb-5" />
                  <div className="flex gap-3">
                    <button
                      className="editorial-button-outline flex-1 py-2.5 text-sm rounded-lg"
                      onClick={() => openModal(room)}
                    >
                      Подробнее
                      <Icon name="ChevronRight" size={15} className="inline ml-1" />
                    </button>
                    <button
                      className="editorial-button flex-1 py-2.5 text-sm rounded-lg"
                      onClick={() => onBookRoom(room.title)}
                    >
                      Забронировать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative bg-paper max-w-3xl w-full max-h-[92vh] overflow-y-auto rounded-xl border border-warm-border shadow-xl">
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 p-2 bg-paper rounded-lg border border-warm-border hover:bg-paper-warm transition-colors"
            >
              <Icon name="X" size={18} className="text-charcoal" />
            </button>

            {/* Gallery */}
            <div className="relative h-52 sm:h-72 md:h-80 bg-paper-warm overflow-hidden rounded-t-xl">
              <img
                src={selectedRoom.gallery[currentImageIndex]}
                alt={`${selectedRoom.title} — фото ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-paper/80 backdrop-blur-sm rounded-lg border border-warm-border hover:bg-paper transition-colors"
              >
                <Icon name="ChevronLeft" size={18} className="text-charcoal" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-paper/80 backdrop-blur-sm rounded-lg border border-warm-border hover:bg-paper transition-colors"
              >
                <Icon name="ChevronRight" size={18} className="text-charcoal" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {selectedRoom.gallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentImageIndex ? 'bg-terracotta w-6' : 'bg-paper/60 w-1.5'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-soyuz text-3xl text-charcoal">{selectedRoom.title}</h3>
                <div className="text-right shrink-0">
                  <div className="font-soyuz text-2xl text-charcoal font-bold">
                    {selectedRoom.price} ₽
                  </div>
                  <div className="font-aubrey text-xs text-ink-muted">за сутки</div>
                </div>
              </div>

              <p className="font-aubrey text-ink-muted leading-relaxed mb-6">{selectedRoom.description}</p>

              <div className="editorial-divider mb-5" />
              <h4 className="label-caps mb-4">Оснащение</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-7">
                {selectedRoom.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-ink-muted">
                    <span className="w-1 h-1 rounded-full bg-terracotta shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <button
                className="editorial-button w-full py-3 rounded-lg text-base"
                onClick={() => { onBookRoom(selectedRoom.title); closeModal(); }}
              >
                Забронировать этот номер
                <Icon name="ArrowRight" size={16} className="inline ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}