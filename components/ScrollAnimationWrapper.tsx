import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface ScrollAnimationWrapperProps {
  threshold?: number
  triggerOnce?: boolean
  children: React.ReactNode
}

const ScrollAnimationWrapper = ({
  children,
  threshold = 0.5,
  triggerOnce = true,
}: ScrollAnimationWrapperProps): JSX.Element => {
  const { ref, inView, entry } = useInView({ threshold, triggerOnce })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const bottomInView = entry?.boundingClientRect.bottom <= entry?.rootBounds?.height
  const itemVariants = {
    hidden: { opacity: 0, y: bottomInView ? 100 : -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <motion.div ref={ref} variants={itemVariants} initial="hidden" animate={controls}>
      {children}
    </motion.div>
  )
}

export default ScrollAnimationWrapper
