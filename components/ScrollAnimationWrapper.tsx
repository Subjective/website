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
          continue
        }
        if (typeof ref === 'function') {
          ref(value)
        } else {
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
  const initiallyVisible = useRef<[boolean, boolean]>([false, false])

  const combinedRef = useSyncRefs(scope, ref)

  const animateElement = (
    yTranslationVector: Array<number>,
    duration = 0.5,
    transition: Array<number> = [0, 1]
  ) => {
    animate(
      scope.current,
      {
        opacity: transition,
        y: yTranslationVector,
      },
      { duration: duration, ease: 'easeOut' }
    )
  }

  useEffect(() => {
    if (entry) {
      if (!initiallyVisible[0]) {
        if (entry.isIntersecting) {
          initiallyVisible[1] = true
          // console.log('setting initially visible')
        }
        initiallyVisible[0] = true
      }
    }
  }, [entry])

  useEffect(() => {
    if (inView) {
      const bottomInView: boolean = entry.boundingClientRect.bottom <= entry.rootBounds.height
      const topInView: boolean =
        entry.boundingClientRect.top >= 0 && entry.boundingClientRect.top <= entry.rootBounds.height
      if (topInView) {
        // console.log('top in view!')
      }
      if (bottomInView) {
        // console.log('bottom in view!')
      }

      if (initiallyVisible[1]) {
        if (animateInitial) {
          // console.log('Initial animation!')
          animateInitialUp ? animateElement([yDistance, 0]) : animateElement([-yDistance, 0])
        } else {
          animateElement([0, 0], 0, [0, 1])
        }
      } else if (bottomInView) {
        // console.log('Entering from top!')
        animateElement([-yDistance, 0])
      } else {
        // console.log('Entering from bottom!')
        animateElement([yDistance, 0])
      }
    }
  }, [inView])

  return (
    <motion.div initial={{ opacity: 0 }} ref={combinedRef} className={className}>
      {children}
    </motion.div>
  )
}

export default ScrollAnimationWrapper
