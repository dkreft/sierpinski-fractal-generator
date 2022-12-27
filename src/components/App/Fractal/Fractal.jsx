import React, {
  useEffect,
  useRef,
} from 'react'

import useSize from '@react-hook/size'

import drawFractal from './lib/fractal'

import Styles from './styles.module.sass'


export default function Fractal(props) {
  const ref = useRef()

  const canvasSize = useSize(ref)

  useEffect(() => {
    const canvas = ref.current

    canvas.width = canvasSize[0]
    canvas.height = canvasSize[1]

    drawFractal(canvas, props)
  }, [canvasSize, props])

  return (
    <canvas
      className={ Styles.root }
      ref={ ref }
    />
  )
}
