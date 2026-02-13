interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" fill="#0a0e1a" />
      <circle cx="32" cy="26" r="10" fill="#d56128" opacity="0.9" />
      <path d="M8 36 C16 30, 24 42, 32 36 C40 30, 48 42, 56 36" stroke="#d56128" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.8" />
      <path d="M8 44 C16 38, 24 50, 32 44 C40 38, 48 50, 56 44" stroke="#d56128" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M8 51 C16 45, 24 57, 32 51 C40 45, 48 57, 56 51" stroke="#d56128" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.3" />
    </svg>
  );
}
