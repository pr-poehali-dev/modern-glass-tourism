import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

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
  return (
    <section id="booking" className="py-20 px-4">
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

          <Button className="w-full mt-6 glass-button font-light">
            Отправить заявку
            <Icon name="Send" size={18} className="ml-2" />
          </Button>
        </Card>
      </div>
    </section>
  );
}