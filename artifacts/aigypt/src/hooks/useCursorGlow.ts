import { useEffect, useRef, useState } from 'react'

export function useCursorGlow(containerRef: React.RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  const rafRef = useRef<number>()
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouchDevice || prefersReduced) return

    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      targetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
      setIsActive(true)
    }

    const handleMouseLeave = () => setIsActive(false)

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.08
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.08
      setPosition({ x: currentRef.current.x, y: currentRef.current.y })
      rafRef.current = requestAnimationFrame(animate)
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [containerRef])

  return { position, isActive }
}
