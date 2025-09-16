interface LogoProps {
  /** Logo image source */
  src?: string
  /** Alternative text for logo */
  alt?: string
  /** Size variant of the logo */
  size?: 'sm' | 'md' | 'lg'
  /** Additional CSS classes */
  className?: string
}

export function Logo({
  src = '/logo.png',
  alt = 'Sumak',
  size = 'md',
  className = 'rounded-lg',
}: LogoProps) {
  const sizeClasses = {
    sm: 'max-w-8 min-w-8 p-1',
    md: 'max-w-11 min-w-11 p-1.5',
    lg: 'max-w-14 min-w-14 p-2',
  }

  return (
    <div
      className={`cursor-pointer items-center bg-gradient-to-r from-[#59BAFF] to-purple-600 ${sizeClasses[size]} ${className}`}
    >
      <img src={src} alt={alt} />
    </div>
  )
}

export default Logo
