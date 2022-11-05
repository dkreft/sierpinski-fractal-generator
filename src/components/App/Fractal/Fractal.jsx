import React, {
  useEffect,
  useRef,
} from 'react'

import drawFractal from './lib/fractal'

import Styles from './styles.module.sass'

const DIRECTION = 0
const LENGTH = 500
const LIMIT = Math.pow(2, 5) + 7



export default function Fractal() {
  const ref = useRef()

  useEffect(() => {
    const canvas = ref.current
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const params = new URLSearchParams(window.location.search)

    drawFractal(canvas, {
      direction: Number(params.get('direction') || DIRECTION),
      length: Number(params.get('length') || LENGTH),
      limit: Number(params.get('limit') || LIMIT),
    })
  }, [])

  return (
    <canvas
      className={ Styles.root }
      ref={ ref }
    />
  )
}
