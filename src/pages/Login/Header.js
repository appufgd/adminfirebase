import React from 'react'

// Material-UI components
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

// My components
import Icon from '../../components/Icon'

const styles = {
  grow: {
    flexGrow: 1,
  },
}

const Header = ({ text, onClickBackBtn }) => (
  <AppBar position="static">
    <Toolbar>
      <Icon
        onClick={onClickBackBtn}
        faType="fas fa-arrow-left"
      />

      <Typography variant="h6" color="inherit" style={styles.grow}>
        {text}
      </Typography>
    </Toolbar>
  </AppBar>
)

export default Header