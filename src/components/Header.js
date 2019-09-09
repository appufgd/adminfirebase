import React, { Component, Fragment } from 'react'

// Material-UI components
import AppBar     from '@material-ui/core/AppBar'
import Toolbar    from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

// My components
import cssClass from './Header.css'

const Header = ({ children, leftActions, rightActions }) => (
  <AppBar color='secondary' position='static'>
    <Toolbar>
      <div className={cssClass.leftBtn}>
        {leftActions}
      </div>

      <Typography className={cssClass.grow} variant='h6' color='inherit'>
        {children}
      </Typography>

      {rightActions}
    </Toolbar>
  </AppBar>
)

export default Header