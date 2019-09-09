import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'

const styles = {
  root: {
    fontSize: '1em',
  },
  themeGreen: {
    color: '#2e8232',
    backgroundColor: '#b9e487',
  },
  themeYellow: {
    color: '#a28220',
    backgroundColor: '#e6dc86',
  },
  themeRed: {
    color: '#a9261c',
    backgroundColor: '#eabbb8',
  },
  themeOrange: {
    color: '#ffffff',
    backgroundColor: '#f9a825',
  },
}

class Note extends Component {
  addComma = (num) => {
    return num.toFixed(1).replace(/\./, ',')
  }
  getNoteColors = (value) => {
    if (value > 3.5) return styles.themeGreen
    //else if (value > 1.5) return styles.themeYellow
    else if (value > 1.5) return styles.themeOrange
    return styles.themeOrange
  }
  render() {
    const { value } = this.props

    return (
      <Avatar
        style={{
          ...styles.root,
          ...this.getNoteColors(value)
        }}
      >
        {this.addComma(value)}
      </Avatar>
    )
  }
}

export default Note