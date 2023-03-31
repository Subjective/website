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
        <li>
          I'm{' '}
          <strong>
            <i>Josh</i>
          </strong>
          .
        </li>
        <li>
          I'm a <i>programmer</i>.
        </li>
        <li>
          I'm a <i>lifelong learner</i>.
        </li>
        <li>
          I'm a <i>problem solver</i>.
        </li>
        <li>
          I'm an <i>aspiring entrepreneur</i>.
        </li>
        <li>
          I'm a <i>night owl</i>.
        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  )
}
