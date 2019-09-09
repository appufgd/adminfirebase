import React, { Component } from 'react'

// Material-UI component
import Avatar from '@material-ui/core/Avatar'

class Medal extends Component {
  state = {
    st: this.props.bestScores[0],
    nd: this.props.bestScores[1],
    rd: this.props.bestScores[2]
  }
  getStyle = (score) => {
    switch (score) {
      case this.state.st:
        return ({
          color: '#bdad24',
          backgroundColor: '#f2e99c',
        })
      case this.state.nd:
        return ({
          color: '#718d9a',
          backgroundColor: '#cfdae0',
        })
      case this.state.rd:
        return ({
          color: '#ae813e',
          backgroundColor: '#eec78d',
        })
      default:
        return ({
          color: '#333',
          backgroundColor: '#ddd',
        })
    }
  }
  getIcon = (score) => {
    switch (score) {
      case this.state.st:
      case this.state.nd:
      case this.state.rd:
        return 'fas fa-medal'
      default:
        return 'fas fa-user'
    }
  }
  render = () => (
    <Avatar style={this.getStyle(this.props.score)}>
      <i className={this.getIcon(this.props.score)} />
    </Avatar>
  )
}

export default Medal