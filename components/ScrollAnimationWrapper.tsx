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
}

const ScrollAnimationWrapper = ({
  children,
  threshold = 0.25,
  triggerOnce = true,
  className,
  yDistance = 100,
}: ScrollAnimationWrapperProps): JSX.Element => {
  const [ref, inView, entry] = useInView({ threshold, triggerOnce })
  const [scope, animate] = useAnimate()

  const combinedRef = useSyncRefs(scope, ref)

  useEffect(() => {
    if (inView) {
      console.log("I'm in view!")
      const bottomInView: boolean = entry.boundingClientRect.bottom <= entry.rootBounds.height
      if (bottomInView) {
        console.log('Entering from top!')
        animate(
          scope.current,
          {
            opacity: [0, 1],
            y: [-yDistance, 0],
          },
          {
            duration: 0.5,
            ease: 'easeOut',
          }
        )
      } else {
        console.log('Entering from bottom!')
        animate(
          scope.current,
          {
            opacity: [0, 1],
            y: [yDistance, 0],
          },
          { duration: 0.5, ease: 'easeOut' }
        )
      }
    }
  }, [inView, entry, animate, scope, yDistance])

  return (
    <motion.div initial={{ opacity: 0 }} ref={combinedRef} className={className}>
      {children}
    </motion.div>
  )
}

export default ScrollAnimationWrapper
