import React from 'react'

// Material-UI components
import IconButton from '@material-ui/core/IconButton'

// Style
import cssClass from './Icon.css'

const Icon = ({ faType, disabled, onClick }) => (
  <IconButton
    className={cssClass.button}
    disabled={disabled}
    onClick={onClick}
    color="inherit"
  >
    <span className={cssClass.icon}>
      <i className={faType} />
    </span>
  </IconButton>
)

export default Icon