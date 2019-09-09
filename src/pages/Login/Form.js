import React, { Component } from 'react'

// Material-UI components
import TextField from '@material-ui/core/TextField'
import Button    from '@material-ui/core/Button'

// Style
import cssClass from './Form.css'

class Form extends Component {
  state = {
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
    const { loginEmail, loginPassword } = this.state

    this.props.signIn(loginEmail, loginPassword)
  }
  render = () => {
    const { onSubmit, handleChange } = this
    const { loginEmail, loginPassword } = this.state

    return (
      <form onSubmit={onSubmit}>
        <div className={cssClass.fieldsContainer}>
          <TextField
            label="Seu e-mail"
            className={cssClass.field}
            type="email"
            onChange={handleChange('loginEmail')}
            value={loginEmail}
            margin="normal"
          />
          <TextField
            label="Sua senha secreta"
            className={cssClass.field}
            type="password"
            onChange={handleChange('loginPassword')}
            value={loginPassword}
            margin="normal"
          />
        </div>

        <Button
          className={cssClass.submitBtn}
          type="submit"
          variant="contained"
          color="primary"
        >
          Entre agora!
        </Button>
      </form>
    )
  }
}

export default Form