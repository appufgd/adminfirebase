import React, { Component, Fragment } from 'react'

// Material-UI components
import AppBar     from '@material-ui/core/AppBar'
import Button     from '@material-ui/core/Button'
import Toolbar    from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

// My components
import Header from '../../components/Header'
import Form from './Form'

// Style
import cssClass from './index.css'

class Register extends Component {
  goTo = (path) => {
    return () => {
      this.props.history.push(path)
    }
  }
  render = () => {
    const { registerUser } = this.props

    return (
      <Fragment>
        <Header
          rightActions={(
            <Button onClick={this.goTo('/login')} color='inherit'>
              Entrar
            </Button>
          )}
        >
          II SIMAE
        </Header>

        <div className={cssClass.content}>
          <div className={cssClass.texts}>
            <Typography
              className={cssClass.textsTitle}
              variant='h5'
              color='inherit'
              align='center'
            >
              SEJA BEM VINDO!
            </Typography>
            <Typography
              className={cssClass.textsSubtitle}
              color='inherit'
              align='center'
            >
              Informe alguns dados abaixo para poder continuar com o
              aplicativo.
            </Typography>
          </div>

          <Form registerUser={registerUser} />
        </div>
      </Fragment>
    )
  }
}

export default Register