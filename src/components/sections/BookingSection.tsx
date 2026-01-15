import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
  const [availabilityInfo, setAvailabilityInfo] = useState<{
    available: boolean;
    available_count: number;
    checking: boolean;
  }>({ available: false, available_count: 0, checking: false });

  useEffect(() => {
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
        setAvailabilityInfo({ available: false, available_count: 0, checking: false });
      }
    };

    const timer = setTimeout(checkAvailability, 500);
    return () => clearTimeout(timer);
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
        toast({
          title: '🎉 Бронирование создано!',
          description: `Номер ${data.booking_id} забронирован на ${data.total_nights} ночей. Мы свяжемся с вами в ближайшее время`,
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
    <section id="booking" className="py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-deep-gray mb-4 tracking-wide">
            Забронировать номер
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-warm-gray font-light">
            Заполните форму и мы свяжемся с вами
          </p>
        </div>

        <Card ref={ref} className={`glass-elevated p-3 sm:p-6 md:p-8 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div>
              <Label htmlFor="name">Имя</Label>
              <Input 
                id="name"
                placeholder="Ваше имя"
                value={bookingData.name}
                onChange={(e) => onBookingChange({ name: e.target.value })}
                className="glass-input"
              />
            </div>

            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input 
                id="phone"
                placeholder="+7 (___) ___-__-__"
                value={bookingData.phone}
                onChange={(e) => onBookingChange({ phone: e.target.value })}
                className="glass-input"
              />
            </div>

            <div>
              <Label htmlFor="checkIn">Заезд</Label>
              <Input 
                id="checkIn"
                type="date"
                value={bookingData.checkIn}
                onChange={(e) => onBookingChange({ checkIn: e.target.value })}
                className="glass-input"
              />
            </div>

            <div>
              <Label htmlFor="checkOut">Выезд</Label>
              <Input 
                id="checkOut"
                type="date"
                value={bookingData.checkOut}
                onChange={(e) => onBookingChange({ checkOut: e.target.value })}
                className="glass-input"
              />
            </div>

            <div>
              <Label htmlFor="roomType">Тип номера</Label>
              <select
                id="roomType"
                value={bookingData.roomType}
                onChange={(e) => onBookingChange({ roomType: e.target.value })}
                className="glass-input w-full"
              >
                <option value="">Выберите номер</option>
                <option value="Комфорт">Комфорт</option>
                <option value="Премиум">Премиум</option>
              </select>
            </div>

            <div>
              <Label htmlFor="guests">Количество гостей</Label>
              <Input 
                id="guests"
                type="number"
                min="1"
                max="6"
                value={bookingData.guests}
                onChange={(e) => onBookingChange({ guests: parseInt(e.target.value) })}
                className="glass-input"
              />
            </div>
          </div>

          <Button 
            type="submit"
            disabled={isLoading || availabilityInfo.checking || !availabilityInfo.available || !bookingData.name || !bookingData.phone}
            className="w-full mt-4 sm:mt-6 glass-button font-light text-sm sm:text-base py-5 sm:py-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Отправляем...' : 
             availabilityInfo.checking ? 'Проверяем даты...' :
             !bookingData.checkIn || !bookingData.checkOut || !bookingData.roomType ? 'Заполните даты и тип номера' :
             !availabilityInfo.available ? 'Даты недоступны' :
             'Забронировать'}
            {!isLoading && !availabilityInfo.checking && availabilityInfo.available && <Icon name="Send" size={18} className="ml-2" />}
          </Button>

          {bookingData.checkIn && bookingData.checkOut && bookingData.roomType && !availabilityInfo.checking && (
            <div className={`mt-4 p-3 rounded border transition-all ${
              availabilityInfo.available 
                ? 'bg-green-500/10 border-green-500/30 text-green-200' 
                : 'bg-red-500/10 border-red-500/30 text-red-200'
            }`}>
              <p className="text-sm text-center font-light">
                {availabilityInfo.available 
                  ? `✅ Доступно ${availabilityInfo.available_count} ${availabilityInfo.available_count === 1 ? 'номер' : 'номера'}` 
                  : '❌ Все номера заняты на эти даты'}
              </p>
            </div>
          )}
          </form>
        </Card>
      </div>
    </section>
  );
}