import React, { Component, createRef } from 'react'

// Style
import cssClass from './ScannerEffect.css'

class ScannerEffect extends Component {
  effectRef = createRef()
  componentDidMount = () => {
    const divElement = this.effectRef.current

    divElement.style.height = `${divElement.offsetWidth}px`
  }
  render = () => (
    <div className={cssClass.root} ref={this.effectRef} />
  )
}

export default ScannerEffect