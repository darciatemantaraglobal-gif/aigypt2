interface FloatingDotsProps {
  count?: number
  className?: string
}

const DOT_CONFIGS = [
  [12, 18, 7.2, 0.0], [78, 65, 8.5, 0.8], [34, 82, 6.8, 1.4],
  [55, 25, 9.1, 0.3], [88, 42, 7.6, 1.9], [22, 55, 8.0, 0.6],
  [67, 88, 6.4, 1.1], [43, 12, 8.8, 0.2],
]

export function FloatingDots({ count = 6, className = '' }: FloatingDotsProps) {
  const dots = DOT_CONFIGS.slice(0, count)

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {dots.map(([left, top, duration, delay], i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#A855F7]"
          style={{
            width: '2.5px',
            height: '2.5px',
            left: `${left}%`,
            top: `${top}%`,
            animation: `dotFloat ${duration}s ease-in-out ${delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
