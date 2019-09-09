import React, { Component } from 'react'

// My components
import Header        from '../../components/Header'
import Icon          from '../../components/Icon'
import Reader        from './Reader'
import ScannerEffect from './ScannerEffect'

// Style
import cssClass from './index.css'

class Scanner extends Component {
  goBack = () => {
    this.props.history.goBack()
  }
  goToVote = (namespace) => {
    this.props.history.push(`/vote/${namespace}`)
  }
  render = () => {
    const { goBack, goToVote } = this

    return (
      <div className={cssClass.root}>
        <Header
          leftActions={(
            <Icon onClick={goBack} faType="fas fa-arrow-left" />
          )}
        >
          Código QR
        </Header>

        <div className={cssClass.readerContent}>
          <div className={cssClass.readerContainer}>
            <ScannerEffect />
            <Reader goToVote={goToVote} />
          </div>
        </div>
      </div>
    )
  }
}

export default Scanner