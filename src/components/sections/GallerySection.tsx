import Icon from '@/components/ui/icon';

export default function GallerySection() {
  const galleryImages = [
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600',
    'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600',
    'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600'
  ];

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extralight text-deep-gray mb-4 tracking-wide">
            Галерея
          </h2>
          <p className="text-xl text-warm-gray font-light">
            Взгляните на красоту нашего места
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, idx) => (
            <div key={idx} className="glass-card overflow-hidden rounded-2xl hover-scale group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={image} 
                  alt={`Галерея ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burnt-orange/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Icon name="Maximize2" size={32} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
