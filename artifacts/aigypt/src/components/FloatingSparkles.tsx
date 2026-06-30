import { Sparkles } from 'lucide-react'

export interface SparkleConfig {
  left: string
  top: string
  duration: number
  delay: number
  size: number
}

interface FloatingSparklesProps {
  configs: SparkleConfig[]
  className?: string
}

export function FloatingSparkles({ configs, className = '' }: FloatingSparklesProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {configs.map((cfg, i) => (
        <Sparkles
          key={i}
          size={cfg.size}
          className="absolute text-[#A855F7] opacity-50"
          style={{
            left: cfg.left,
            top: cfg.top,
            animation: `sparkleFloat ${cfg.duration}s ease-in-out ${cfg.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
