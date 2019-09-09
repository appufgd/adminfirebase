import React, { Component, Fragment } from 'react'

// My components
import Header from '../../components/Header'
import Icon from '../../components/Icon'
import NotesTabs from './NotesTabs'
import Ranking from './Ranking'

class Trends extends Component {
  state = {
    tabIndex: 0,
    propToSort: 'avgGeneral'
  }
  handleTabChange = (_, newTabIndex) => {
    this.setState({
      tabIndex: newTabIndex,
      propToSort: ['avgGeneral', 'avgOrg', 'avgCont', 'avgApres'][newTabIndex]
    })
  }
  goTo = (path) => {
    return () => {
      this.props.history.push(path)
    }
  }
  goBack = () => {
    this.props.history.goBack()
  }
  getAvgsFromNotes = (notes) => {
    return Object.entries(notes).map(([
      namespace,
      { avgGeneral, avgOrg, avgCont, avgApres }
    ]) => {
      return {
        namespace,
        avgGeneral,
        avgOrg,
        avgCont,
        avgApres
      }
    })
  }
  render = () => {
    const isBanner = this.props.location.search === '?banners'
    const { goTo, goBack, handleTabChange, getAvgsFromNotes } = this
    const { tabIndex, propToSort } = this.state
    const { allNotes } = this.props

    return (
      <Fragment>
        <Header
          leftActions={(
            <Icon onClick={goBack} faType="fas fa-arrow-left" />
          )}
        >
          {isBanner
            ? 'Top banners'
            : 'Top atividades'}
        </Header>
        <NotesTabs
          tabIndex={tabIndex}
          handleTabChange={handleTabChange}
        />
        <Ranking
          isBanner={isBanner}
          acts={getAvgsFromNotes(allNotes)}
          propToSort={propToSort}
          goTo={goTo}
        />
      </Fragment>
    ) 
  }
}

export default Trends