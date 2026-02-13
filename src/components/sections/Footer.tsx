import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-[#070a12] text-white py-8 md:py-12 px-4 border-t border-white/5">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
          <Logo size={36} className="sm:w-10 sm:h-10" />
          <span className="text-xl sm:text-2xl font-light tracking-wide text-deep-gray">Горизонт</span>
        </div>
        <p className="text-sm sm:text-base text-warm-gray mb-4 md:mb-6 font-light">
          Туристическая база на первой линии моря
        </p>
        <div className="text-warm-gray/60 text-xs sm:text-sm font-light space-y-1">
          <p>© 2025 Горизонт. Все права защищены.</p>
          <p>ИП Камышанский Сергей Александрович</p>
          <p>ИНН 234903871201 • ОГРН 323237500361307</p>
        </div>
      </div>
    </footer>
  );
}