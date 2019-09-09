import React, { Component } from 'react'

// Material-UI components
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

class NotesTabs extends Component {
  render() {
    const { tabIndex, handleTabChange } = this.props

    return (
      <AppBar position="static" color="default">
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
        >
          <Tab label="Geral" />
          <Tab label="Organização" />
          <Tab label="Conteúdo" />
          <Tab label="Apresentação" />
        </Tabs>
      </AppBar>
    )
  }
}

export default NotesTabs