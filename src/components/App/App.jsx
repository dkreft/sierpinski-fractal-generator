import React, {
  useCallback,
  useState,
} from 'react'

import PropTypes from 'prop-types'

import Controls from './Controls'
import Fractal from './Fractal'

import Styles from './styles.module.sass'

const PARAMS = new URLSearchParams(window.location.search)

const DEFAULTS = {
  length: 500,
  limit: 5,
  ratio: 0.5,
  shiftAngle: 60,
}
const LENGTH = 500
const LIMIT = Math.pow(2, 5) + 7
const RATIO = 0.5
const SHIFT_ANGLE = 60



export default function App() {
  // console.log(getDefaultState())
  const count = React.useRef(0)

  const [state, setState] = useState({
    length: getNumParam('length', LENGTH),
    limit: getNumParam('limit', LIMIT),
    ratio: getNumParam('ratio', RATIO),
    shiftAngle: getNumParam('shiftAngle', SHIFT_ANGLE),
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

function getDefaultState() {
  return Object
    .entries(DEFAULTS)
    .reduce((defaults, [key, value]) => ({
      ...defaults,
      [key]: getNumParam(key, value),
    }), {})
}

function getNumParam(name, defaultValue) {
  return Number(PARAMS.get(name)) || defaultValue
}
