import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

class PrivateRoute extends Component {
  render = () => {
    const { component: OriginalComponent, ...rest } = this.props

    return (
      <Route
        {...rest}
        render={props => (
          this.props.isLogged ? (
            this.props.onlyPublic ? (
              <Redirect to={{
                pathname: '/activities',
                state: { from: props.location }
              }} />
            ) : (
              <OriginalComponent {...props} />
            )
          ) : (
            this.props.onlyPublic ? (
              <OriginalComponent {...props} />
            ) : (
              <Redirect to={{
                pathname: '/',
                state: { from: props.location }
              }} />
            )
          )
        )}
      />
    )
  }
}

export default PrivateRoute