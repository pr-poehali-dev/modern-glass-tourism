import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ReviewsSection() {
  const { ref, isVisible } = useScrollReveal();
  const reviews = [
    {
      name: 'Анна Петрова',
      rating: 5,
      text: 'Невероятное место! Первая линия моря, чистый пляж, удобная парковка. Обязательно вернемся.',
      date: '15 августа 2024'
    },
    {
      name: 'Дмитрий Иванов',
      rating: 5,
      text: 'Отдыхали семьей. Номера просторные, веранды большие и уютные. Бассейн с подогревом - огромный плюс!',
      date: '10 августа 2024'
    },
    {
      name: 'Елена Смирнова',
      rating: 5,
      text: 'Прекрасный вид из номера, просторная веранда. Идеальное место для романтического отдыха.',
      date: '5 августа 2024'
    }
  ];

  return (
    <section id="reviews" className="py-8 md:py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-deep-gray mb-4 tracking-wide">
            Отзывы гостей
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-warm-gray font-light">
            Что говорят о нас наши гости
          </p>
        </div>

        <div ref={ref} className={`grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          {reviews.map((review, idx) => (
            <Card key={idx} className="glass-card p-4 sm:p-6 hover-scale">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Icon key={i} name="Star" size={20} className="text-accent-orange fill-accent-orange" />
                ))}
              </div>
              
              <p className="text-sm sm:text-base text-warm-gray font-light mb-4 leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-3 mt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-burnt-orange to-accent-orange flex items-center justify-center">
                  <span className="text-white font-light text-lg">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-deep-gray font-light">{review.name}</p>
                  <p className="text-warm-gray/70 text-sm font-light">{review.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}