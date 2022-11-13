import React, {
  useCallback,
} from 'react'

import PropTypes from 'prop-types'

import Styles from './styles.module.sass'


export default function Controls({ handleChange, state }) {
  const onChange = useCallback((e) => {
    e.stopPropagation()
    e.preventDefault()

    handleChange({
      name: e.target.name,
      value: e.target.value,
    })
  }, [handleChange])
  
  return (
    <div className={ Styles.root }>
      Angle:
      <input
        onChange={ onChange }
        type="number"
        name="shiftAngle"
        defaultValue={ state.shiftAngle }
      />
      <br />
      Limit:
      <input
        onChange={ onChange }
        type="number"
        name="limit"
        defaultValue={ state.limit }
        min="1"
      />
      <br />
      Length:
      <input
        onChange={ onChange }
        type="number"
        name="length"
        defaultValue={ state.length }
        step={ 10 }
      />
      <br/>
      Ratio:
      <input
        onChange={ onChange }
        type="number"
        name="ratio"
        defaultValue={ state.ratio }
        step={ 0.01 }
        max={ 0.99 }
      />
    </div>
  )
}

Controls.propTypes = {
  handleChange: PropTypes.func.isRequired,
}
