import React from 'react'

// Material-UI components
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

// My components
import Icon from '../../components/Icon'

const styles = {
  title: {
    paddingLeft: 10,
    flexGrow: 1,
  },
}

const Header = ({ toggleMenu, goToScanner }) => (
  <AppBar position="static">
    <Toolbar>
      <Icon onClick={toggleMenu} faType="fas fa-bars" />

      <Typography variant="h6" color="inherit" style={styles.title}>
        II SIMAE - Atividades
      </Typography>
    </Toolbar>
  </AppBar>
)

export default Header