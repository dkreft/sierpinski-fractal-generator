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
      <span className={ Styles.label }>
        Angle:
      </span>
      <input
        className={ Styles.input }
        defaultValue={ state.shiftAngle }
        name="shiftAngle"
        onChange={ onChange }
        type="number"
      />

      <span className={ Styles.label }>
        Limit:
      </span>
      <input
        className={ Styles.input }
        defaultValue={ state.limit }
        min="1"
        name="limit"
        onChange={ onChange }
        type="number"
      />

      <span className={ Styles.label }>
        Length:
      </span>
      <input
        className={ Styles.input }
        defaultValue={ state.length }
        name="length"
        onChange={ onChange }
        step={ 10 }
        type="number"
      />

      <span className={ Styles.label }>
        Ratio:
      </span>
      <input
        className={ Styles.input }
        defaultValue={ state.ratio }
        max={ 0.99 }
        name="ratio"
        onChange={ onChange }
        step={ 0.01 }
        type="number"
      />
    </div>
  )
}

Controls.propTypes = {
  handleChange: PropTypes.func.isRequired,
}
