import React, {
  useEffect,
  useRef,
} from 'react'

import drawFractal from './lib/fractal'

import Styles from './styles.module.sass'


export default function Fractal() {
  const ref = useRef()

  useEffect(() => {
    const canvas = ref.current

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    drawFractal(canvas)
  }, [])

  return (
    <canvas
      className={ Styles.root }
      ref={ ref }
    />
  )
}
