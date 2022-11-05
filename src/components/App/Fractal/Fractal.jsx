import React, {
  useLayoutEffect,
  useRef,
} from 'react'

import PropTypes from 'prop-types'

import drawFractal from './lib/fractal'

import Styles from './styles.module.sass'


export default function Fractal({}) {
  const ref = useRef()

  useLayoutEffect(() => {
    drawFractal(ref.current)
  }, [])
  
  return (
    <canvas
      className={ Styles.root }
      ref={ ref }
    />
  )
}

Fractal.propTypes = {
}
