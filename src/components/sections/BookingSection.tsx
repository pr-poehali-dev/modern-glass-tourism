import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import func2url from '../../../backend/func2url.json';

interface BookingData {
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  guests: number;
}

interface BookingSectionProps {
  bookingData: BookingData;
  onBookingChange: (data: Partial<BookingData>) => void;
}

export default function BookingSection({ bookingData, onBookingChange }: BookingSectionProps) {
  const { ref, isVisible } = useScrollReveal();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isVisible) {
        setForceVisible(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isVisible]);
  const [availabilityInfo, setAvailabilityInfo] = useState<{
    available: boolean;
    available_count: number;
    checking: boolean;
  }>({ available: false, available_count: 0, checking: false });

  useEffect(() => {
    let isCancelled = false;

    const checkAvailability = async () => {
      if (!bookingData.checkIn || !bookingData.checkOut || !bookingData.roomType) {
        setAvailabilityInfo({ available: false, available_count: 0, checking: false });
        return;
      }

      if (new Date(bookingData.checkIn) >= new Date(bookingData.checkOut)) {
        setAvailabilityInfo({ available: false, available_count: 0, checking: false });
        return;
      }

      setAvailabilityInfo(prev => ({ ...prev, checking: true }));
      
      try {
        const response = await fetch(func2url['check-availability'], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            room_type: bookingData.roomType,
            check_in_date: bookingData.checkIn,
            check_out_date: bookingData.checkOut
          })
        });

        if (isCancelled) return;

        const data = await response.json();

        if (response.ok) {
          setAvailabilityInfo({
            available: data.available,
            available_count: data.available_count,
            checking: false
          });
        } else {
          setAvailabilityInfo({ available: false, available_count: 0, checking: false });
        }
      } catch (error) {
        if (!isCancelled) {
          setAvailabilityInfo({ available: false, available_count: 0, checking: false });
        }
      }
    };

    const timer = setTimeout(checkAvailability, 400);
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [bookingData.checkIn, bookingData.checkOut, bookingData.roomType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingData.name || !bookingData.phone || !bookingData.checkIn || 
        !bookingData.checkOut || !bookingData.roomType || !bookingData.guests) {
      toast({
        title: 'Заполните все поля',
        description: 'Все поля формы обязательны для заполнения',
        variant: 'destructive'
      });
      return;
    }

    if (!availabilityInfo.available) {
      toast({
        title: 'Даты недоступны',
        description: 'Выбранные даты заняты. Пожалуйста, выберите другие даты',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(func2url['create-booking'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guest_name: bookingData.name,
          guest_phone: bookingData.phone,
          check_in_date: bookingData.checkIn,
          check_out_date: bookingData.checkOut,
          room_type: bookingData.roomType,
          guests_count: bookingData.guests
        })
      });

      const data = await response.json();

      if (response.ok) {
        const checkInFormatted = new Date(bookingData.checkIn).toLocaleDateString('ru-RU');
        const checkOutFormatted = new Date(bookingData.checkOut).toLocaleDateString('ru-RU');
        
        const whatsappMessage = `Добрый день! Хотел бы забронировать номер "${bookingData.roomType}".

📅 Заезд: ${checkInFormatted}
📅 Выезд: ${checkOutFormatted}
👥 Количество гостей: ${bookingData.guests}
👤 Имя: ${bookingData.name}
📱 Телефон: ${bookingData.phone}`;

        const whatsappUrl = `https://wa.me/79184718383?text=${encodeURIComponent(whatsappMessage)}`;
        
        window.open(whatsappUrl, '_blank');
        
        toast({
          title: '✅ Переход в WhatsApp',
          description: 'Завершите бронирование в чате с администратором',
        });
        
        onBookingChange({
          name: '',
          phone: '',
          checkIn: '',
          checkOut: '',
          roomType: '',
          guests: 1
        });
        setAvailabilityInfo({ available: false, available_count: 0, checking: false });
      } else {
        toast({
          title: 'Ошибка бронирования',
          description: data.error || 'Не удалось создать бронирование',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить заявку. Попробуйте позже',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="booking" className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-2xl">

        <div className="mb-10 md:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-px bg-terracotta inline-block" />
            <span className="label-caps">Онлайн-бронирование</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl text-charcoal mb-4"
            style={{ fontFamily: '"Soyuz Grotesk", Georgia, serif', fontWeight: 700, letterSpacing: '-0.02em' }}
          >
            Забронировать номер
          </h2>
          <p className="text-ink-muted text-lg">
            Заполните форму — мы свяжемся с вами в WhatsApp
          </p>
        </div>

        <div ref={ref} className={`editorial-card-flat p-6 sm:p-8 scroll-reveal ${isVisible || forceVisible ? 'visible' : ''}`}>
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4 md:gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="label-caps">Имя</Label>
                <Input
                  id="name"
                  placeholder="Ваше имя"
                  value={bookingData.name}
                  onChange={(e) => onBookingChange({ name: e.target.value })}
                  className="editorial-input"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="label-caps">Телефон</Label>
                <Input
                  id="phone"
                  placeholder="+7 (___) ___-__-__"
                  value={bookingData.phone}
                  onChange={(e) => onBookingChange({ phone: e.target.value })}
                  className="editorial-input"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="checkIn" className="label-caps">Заезд</Label>
                <Input
                  id="checkIn"
                  type="date"
                  value={bookingData.checkIn}
                  onChange={(e) => onBookingChange({ checkIn: e.target.value })}
                  className="editorial-input"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="checkOut" className="label-caps">Выезд</Label>
                <Input
                  id="checkOut"
                  type="date"
                  value={bookingData.checkOut}
                  onChange={(e) => onBookingChange({ checkOut: e.target.value })}
                  className="editorial-input"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="roomType" className="label-caps">Тип номера</Label>
                <select
                  id="roomType"
                  value={bookingData.roomType}
                  onChange={(e) => onBookingChange({ roomType: e.target.value })}
                  className="editorial-input w-full h-10 px-3 rounded-md text-sm"
                  style={{ fontFamily: '"Aubrey", Georgia, serif' }}
                >
                  <option value="">Выберите номер</option>
                  <option value="Комфорт">Комфорт — 6 000 ₽/сутки</option>
                  <option value="Премиум">Премиум — 10 000 ₽/сутки</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="guests" className="label-caps">Количество гостей</Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="6"
                  value={bookingData.guests}
                  onChange={(e) => onBookingChange({ guests: parseInt(e.target.value) })}
                  className="editorial-input"
                />
              </div>
            </div>

            <div className="editorial-divider my-5" />

            <button
              type="submit"
              disabled={isLoading || availabilityInfo.checking || !availabilityInfo.available || !bookingData.name || !bookingData.phone}
              className="editorial-button w-full py-3.5 rounded-lg text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Отправляем...' :
               availabilityInfo.checking ? 'Проверяем даты...' :
               !bookingData.checkIn || !bookingData.checkOut || !bookingData.roomType ? 'Заполните даты и тип номера' :
               !availabilityInfo.available ? 'Даты недоступны' :
               'Перейти к бронированию'}
              {!isLoading && !availabilityInfo.checking && availabilityInfo.available && (
                <Icon name="Send" size={16} className="inline ml-2" />
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}