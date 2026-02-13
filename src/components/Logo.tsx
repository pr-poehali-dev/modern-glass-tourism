interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = '' }: LogoProps) {
  return (
    <img
      src="/logo.svg"
      alt="Горизонт"
      width={size}
      height={size}
      className={className}
      loading="eager"
    />
  );
}
