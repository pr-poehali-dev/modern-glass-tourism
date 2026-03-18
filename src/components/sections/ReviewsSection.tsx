import Icon from '@/components/ui/icon';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ReviewsSection() {
  const { ref, isVisible } = useScrollReveal();

  const reviews = [
    {
      name: 'Анна Петрова',
      rating: 5,
      text: 'Невероятное место! Первая линия моря, чистый пляж, удобная парковка. Обязательно вернёмся.',
      date: '15 августа 2024'
    },
    {
      name: 'Дмитрий Иванов',
      rating: 5,
      text: 'Отдыхали семьёй. Номера просторные, веранды большие и уютные. Бассейн с подогревом — огромный плюс!',
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
    <section id="reviews" className="py-10 md:py-14 px-4">
      <div className="container mx-auto max-w-5xl">

        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-px bg-terracotta inline-block" />
            <span className="label-caps">Впечатления гостей</span>
          </div>
          <h2 className="font-soyuz text-4xl sm:text-5xl text-charcoal mb-0">Отзывы</h2>
        </div>

        <div ref={ref} className={`grid sm:grid-cols-3 gap-5 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          {reviews.map((review, idx) => (
            <div key={idx} className="editorial-card p-5 sm:p-6 flex flex-col">
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="text-terracotta fill-terracotta" />
                ))}
              </div>

              <p className="font-aubrey text-ink-muted text-sm leading-relaxed flex-1 mb-5">
                «{review.text}»
              </p>

              <div className="editorial-divider mb-4" />
              <div className="flex items-center gap-3">
                <div
                  className="font-soyuz w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                  style={{ background: '#F06519', color: '#FDFDF1' }}
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-soyuz text-charcoal text-sm">{review.name}</p>
                  <p className="font-aubrey text-ink-muted text-xs">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}