import React, { Component, Fragment } from 'react'

// Material-UI components
import Avatar from '@material-ui/core/Avatar'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

// My components
import Note from '../../components/Note'

// Data
import data from '../../data.json'

// Style
import cssClass from './Ranking.css'

// Utils
import sortByProp from '../../utils/sortByProp'

class Ranking extends Component {
  getActInfo = (namespace) => {
    const weekDay = namespace.substring(0, 3)
    const info = (data[weekDay] || [])
      .find(item => item.namespace === namespace)

    return info === undefined
      ? { isInvalid: true }
      : info
  }
  render = () => {
    const { isBanner, acts, propToSort, goTo } = this.props
    const { getActInfo } = this

    const allActs = sortByProp(acts, propToSort)
      .map(act => ({...act, ...getActInfo(act.namespace)}))
      .filter(act => !act.isInvalid)

    const filteredActs = isBanner
      ? allActs.filter(act => /^Banner/.test(act.type))
      : allActs

    return (
      <MenuList component="nav">
        {filteredActs.length === 0 ? (
          <Paper className={cssClass.message} elevation={1}>
            <Typography align="center" component="h6">
              Não há avaliações ainda!
            </Typography>
          </Paper>
        ) : (
          filteredActs.map((act) => {
            return(
            <MenuItem
              key={act.namespace}
              className={cssClass.menuItem}
              onClick={goTo(`/activitie/${act.namespace}`)}
              button
            >
              <ListItemIcon>
                <Note value={act[propToSort]} />
              </ListItemIcon>
              <div className={cssClass.itemContainer}>
                <Typography
                  className={cssClass.typeText}
                  variant="inherit"
                >
                  {act.type}
                </Typography>
                <Typography variant="inherit" noWrap>
                  {act.title}
                </Typography>
              </div>
            </MenuItem>
          )})
        )}
      </MenuList>
    )
  }
}

export default Ranking