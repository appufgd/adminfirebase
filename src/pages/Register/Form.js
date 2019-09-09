import React, { Component } from 'react'

// Material-UI components
import Button    from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

// Style
import cssClass from './Form.css'

class Form extends Component {
  state = {
    loginName:     '',
    loginEmail:    '',
    loginPassword: '',
  }
  handleChange = (stateName) => {
    return (event) => {
      this.setState({
        [stateName]: event.target.value
      })
    }
  }
  onSubmit = (event) => {
    event.preventDefault()
    const { loginName, loginEmail, loginPassword } = this.state

    this.props.registerUser(loginName, loginEmail, loginPassword)
  }
  render = () => {
    return (
      <form onSubmit={this.onSubmit}>
        <div className={cssClass.fieldsContainer}>
          <TextField
            label="Seu nome completo"
            className={cssClass.field}
            onChange={this.handleChange('loginName')}
            value={this.state.loginName}
            margin="normal"
          />
          <TextField
            label="Seu e-mail"
            className={cssClass.field}
            type="email"
            onChange={this.handleChange('loginEmail')}
            value={this.state.loginEmail}
            margin="normal"
          />
          <TextField
            label="Uma senha secreta"
            className={cssClass.field}
            type="password"
            onChange={this.handleChange('loginPassword')}
            value={this.state.loginPassword}
            margin="normal"
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={cssClass.submitBtn}
        >
          Cadastre-se agora!
        </Button>
      </form>
    )
  }
}

export default Form