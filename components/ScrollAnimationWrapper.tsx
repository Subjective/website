import { useCallback, useEffect, useRef } from 'react'
import { motion, useAnimate } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const useSyncRefs = (
  ...refs: (React.MutableRefObject<Element> | ((instance: Element) => void) | null)[]
) => {
  const cache = useRef(refs)

  useEffect(() => {
    cache.current = refs
  }, [refs])

  return useCallback(
    (value: Element) => {
      for (const ref of cache.current) {
        if (ref == null) {
          console.log('ref is null')
          continue
        }
        if (typeof ref === 'function') {
          console.log('ref is a function. Returning called function')
          ref(value)
        } else {
          console.log('returning the value: ', value)
          ref.current = value
        }
      }
    },
    [cache]
  )
}

interface ScrollAnimationWrapperProps {
  threshold?: number
  triggerOnce?: boolean
  children: React.ReactNode
  className?: string
  yDistance?: number
  animateInitial?: boolean
  animateInitialUp?: boolean
}

const ScrollAnimationWrapper = ({
  children,
  threshold = 0.25,
  triggerOnce = true,
  className,
  yDistance = 100,
  animateInitial = true,
  animateInitialUp = false,
}: ScrollAnimationWrapperProps): JSX.Element => {
  const [ref, inView, entry] = useInView({ threshold, triggerOnce })
  const [scope, animate] = useAnimate()

  const combinedRef = useSyncRefs(scope, ref)

  const animateElement = (yTranslationVector: Array<number>, duration = 0.5) => {
    animate(
      scope.current,
      {
        opacity: [0, 1],
        y: yTranslationVector,
      },
      { duration: duration, ease: 'easeOut' }
    )
  }

  useEffect(() => {
    console.log('useEffect')
    if (inView) {
      const bottomInView: boolean = entry.boundingClientRect.bottom <= entry.rootBounds.height
      const topInView: boolean =
        entry.boundingClientRect.top >= 0 && entry.boundingClientRect.top <= entry.rootBounds.height
      if (topInView) {
        console.log('top in view!')
      }
      if (bottomInView) {
        console.log('bottom in view!')
      }

      if (bottomInView && topInView) {
        if (animateInitial) {
          console.log('Initial animiation!')
          animateInitialUp ? animateElement([yDistance, 0]) : animateElement([-yDistance, 0])
        }
      } else if (bottomInView) {
        console.log('Entering from top!')
        animateElement([-yDistance, 0])
      } else {
        console.log('Entering from bottom!')
        animateElement([yDistance, 0])
      }
    }
  }, [inView])

  return (
    <motion.div
      initial={{ opacity: animateInitial ? 0 : 1 }}
      ref={combinedRef}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default ScrollAnimationWrapper
