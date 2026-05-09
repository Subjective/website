import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

interface ScrollAnimationWrapperProps {
  threshold?: number
  triggerOnce?: boolean
  children: React.ReactNode
  className?: string
  yDistance?: number
  animateInitial?: boolean
  animateInitialUp?: boolean
  initialOpacity?: number
  disabled?: boolean
  layout?: boolean | 'position' | 'size' | 'preserve-aspect'
}

const ScrollAnimationWrapper = ({
  children,
  threshold = 0.25,
  triggerOnce = true,
  className,
  yDistance = 100,
  animateInitial = true,
  animateInitialUp = false,
  initialOpacity = 0,
  disabled = false,
  layout = false,
}: ScrollAnimationWrapperProps): JSX.Element => {
  const [ref, inView, entry] = useInView({ threshold, triggerOnce })
  const controls = useAnimationControls()
  const shouldReduceMotion = useReducedMotion()
  const elementRef = useRef<HTMLDivElement | null>(null)
  const measuredInitialViewport = useRef(false)
  const initiallyVisible = useRef(false)
  const hasRevealed = useRef(false)

  const combinedRef = useCallback(
    (node: HTMLDivElement | null) => {
      elementRef.current = node
      ref(node)
    },
    [ref]
  )

  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current

    if (!element) {
      return
    }

    if (disabled || shouldReduceMotion) {
      controls.set({ opacity: 1, y: 0 })
      hasRevealed.current = true
      return
    }

    const rect = element.getBoundingClientRect()
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight
    const startsInViewport = rect.top < viewportHeight && rect.bottom > 0

    initiallyVisible.current = startsInViewport
    measuredInitialViewport.current = true

    if (startsInViewport && !animateInitial) {
      controls.set({ opacity: 1, y: 0 })
      hasRevealed.current = true
      return
    }

    controls.set({ opacity: initialOpacity, y: 0 })
  }, [animateInitial, controls, disabled, initialOpacity, shouldReduceMotion])

  useEffect(() => {
    if (!inView || !entry || (triggerOnce && hasRevealed.current)) {
      return
    }

    if (disabled || shouldReduceMotion) {
      controls.set({ opacity: 1, y: 0 })
      hasRevealed.current = true
      return
    }

    if (!measuredInitialViewport.current) {
      initiallyVisible.current = entry.isIntersecting
      measuredInitialViewport.current = true
    }

    if (initiallyVisible.current && !animateInitial) {
      controls.set({ opacity: 1, y: 0 })
      hasRevealed.current = true
      return
    }

    const viewportHeight =
      entry.rootBounds?.height || window.innerHeight || document.documentElement.clientHeight
    const enteringFromTop = entry.boundingClientRect.bottom <= viewportHeight
    const yStart = initiallyVisible.current
      ? animateInitialUp
        ? yDistance
        : -yDistance
      : enteringFromTop
      ? -yDistance
      : yDistance

    hasRevealed.current = true
    controls.set({ opacity: initialOpacity, y: yStart })
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    })
  }, [
    animateInitial,
    animateInitialUp,
    controls,
    disabled,
    entry,
    initialOpacity,
    inView,
    shouldReduceMotion,
    triggerOnce,
    yDistance,
  ])

  return (
    <motion.div
      initial={false}
      animate={controls}
      layout={layout}
      ref={combinedRef}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default ScrollAnimationWrapper
