import React from 'react'
import Typed from 'typed.js'

export default function TypedBios() {
  const el = React.useRef(null)
  const typed = React.useRef(null)

  React.useEffect(() => {
    typed.current = new Typed(el.current, {
      stringsElement: '#bios',
      typeSpeed: 40,
      backSpeed: 10,
      loop: true,
      backDelay: 1000,
    })
    return () => typed.current.destroy()
  }, [])

  return (
    <div className="sm:text-1xl text-2xl md:text-4xl">
      <ul id="bios" className="hidden">
        <li>I'm Josh.</li>
        <li>I'm a programmer.</li>
        <li>I'm a programmer.</li>
        <li>I'm a lifelong learner.</li>
        <li>I'm a problem solver.</li>
        <li>I'm an aspiring entrepreneur</li>
        <li>I'm a night owl.</li>
        <li>I'm a</li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  )
}
