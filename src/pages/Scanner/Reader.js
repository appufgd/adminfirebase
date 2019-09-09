import React, { Component, createRef } from 'react'

// QR Code Scanner utils
import QrScanner from 'qr-scanner'
import QrScannerWorkerPath from '!!file-loader!../../../node_modules/qr-scanner/qr-scanner-worker.min.js'

QrScanner.WORKER_PATH = QrScannerWorkerPath

// Style
import cssClass from './Reader.css'

// Data
import data from '../../data.json'

const flatData = (() => {
  const newArr = []
  const values = Object.values(data)

  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values[i].length; j++) {
      newArr.push(values[i][j])
    }
  }

  return newArr
})()

class Reader extends Component {
  qrCodeRef = createRef()
  componentDidMount = () => {
    const videoElement = this.qrCodeRef.current
    this.scanner = new QrScanner(videoElement, this.onScan)

    this.scanner.start()
  }
  componentWillUnmount = () => {

    // Será esperado 3 segundos para dar tempo de
    // esperar a câmera ligar para só então desligar
    setTimeout(() => {
      this.scanner.destroy()
      this.scanner = null
    }, 3000)
  }
  onScan = (result) => {
    const isValid = !!flatData.find((item) => item.namespace === result)

    if (isValid) {
      this.props.goToVote(result)
    } else {
      window.alert('Esse código não é válido!')
    }
  }
  render = () => (
    <video
      ref={this.qrCodeRef}
      className={cssClass.root}
      muted
      playsInline
    />
  )
}

export default Reader
