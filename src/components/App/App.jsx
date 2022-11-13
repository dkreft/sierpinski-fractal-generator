import React, {
  useCallback,
  useState,
} from 'react'

import PropTypes from 'prop-types'

import Controls from './Controls'
import Fractal from './Fractal'

import Styles from './styles.module.sass'

const PARAMS = new URLSearchParams(window.location.search)

const DIRECTION = 0
const LENGTH = 500
const LIMIT = Math.pow(2, 5) + 7
const RATIO = 0.5
const SHIFT_ANGLE = 60



export default function App() {
  const [state, setState] = useState({
    direction: Number(PARAMS.get('direction') || DIRECTION),
    length: Number(PARAMS.get('length') || LENGTH),
    limit: Number(PARAMS.get('limit') || LIMIT),
    ratio: Number(PARAMS.get('ratio') || RATIO),
    shiftAngle: Number(PARAMS.get('shiftAngle') || SHIFT_ANGLE),
  })

  const handleChange = useCallback(({ name, value }) => {
    setState((oldState) => ({
      ...oldState,
      [name]: Number(value),
    }))
  }, [setState])

  return (
    <div className={ Styles.root }>
      <Fractal
        direction={ state.direction }
        length={ state.length }
        limit={ state.limit }
        ratio={ state.ratio }
        shiftAngle={ state.shiftAngle }
      />
      <Controls
        handleChange={ handleChange }
        state={ state }
      />
    </div>
  )
}
