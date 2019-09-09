import React, { Component, Fragment } from 'react'

// Material-UI components
import Typography from '@material-ui/core/Typography'

// My components
import Icon   from '../../components/Icon'
import Header from '../../components/Header'
import Form   from './Form'

// Style
import cssClass from './index.css'

class Login extends Component {
  goBack = () => {
    this.props.history.goBack()
  }
  render = () => {
    const { goBack } = this
    const { signIn } = this.props

    return (
      <Fragment>
        <Header
          leftActions={(
            <Icon onClick={goBack} faType="fas fa-arrow-left" />
          )}
        >
          Entrar
        </Header>

        <div className={cssClass.container}>
          <Typography
            className={cssClass.messageText}
            variant="h6"
            color="inherit"
            align="center"
          >
            Já está cadastrado? Então informe seus dados.
          </Typography>

          <Form signIn={signIn} />
        </div>
      </Fragment>
    )
  }
}

export default Login