import React from 'react'
import PropTypes from 'prop-types'

import Fractal from './Fractal'

import Styles from './styles.module.sass'


export default function App() {
  return (
    <div className={ Styles.root }>
      <Fractal />
    </div>
  )
}
