import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="py-10 md:py-14 px-4 border-t border-warm-border bg-paper">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo size={30} />
            <span
              className="text-xl text-charcoal"
              style={{ fontFamily: '"Soyuz Grotesk", Georgia, serif', fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              Горизонт
            </span>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <p className="text-ink-muted text-sm">Туристическая база на первой линии моря</p>
          </div>
        </div>

        <div className="editorial-divider my-7" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-ink-muted text-xs">© 2025 Горизонт. Все права защищены.</p>
          <p className="text-ink-muted text-xs">
            ИП Камышанский Сергей Александрович · ИНН 234903871201 · ОГРН 323237500361307
          </p>
        </div>
      </div>
    </footer>
  );
}
