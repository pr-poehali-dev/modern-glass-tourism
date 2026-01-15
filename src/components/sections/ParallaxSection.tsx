import { useEffect, useState } from 'react';

export default function ParallaxSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          willChange: 'transform'
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80"
          alt="Вид на море"
          className="w-full h-[120%] object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/40 via-transparent to-[#0a0e1a]/60" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-deep-gray mb-4 tracking-wide">
            Отдых на берегу моря
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-warm-gray font-light max-w-2xl mx-auto">
            Насладитесь комфортом и красотой Азовского побережья
          </p>
        </div>
      </div>
    </section>
  );
}
