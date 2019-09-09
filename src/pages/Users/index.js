import React, { Component, Fragment } from 'react'

// Material-UI component
import ListItemIcon from '@material-ui/core/ListItemIcon'
import MenuItem     from '@material-ui/core/MenuItem'
import MenuList     from '@material-ui/core/MenuList'
import Paper        from '@material-ui/core/Paper'
import Typography   from '@material-ui/core/Typography'

// My components
import Header from '../../components/Header'
import Icon   from '../../components/Icon'
import Medal  from './Medal'

// Style
import cssClass from './index.css'

// Utils
import sortByProp from '../../utils/sortByProp'

class Users extends Component {
  getBestScores = (users) => {
    return [...users.map(v => v.score)]
      .sort((a, b) => b - a)
      .filter((v, i, arr) => arr.indexOf(v) === i)
      .filter((_, i) => i < 3)
  }
  goBack = (path) => {
    this.props.history.goBack()
  }
  render = () => {
    const { goBack } = this
    const { allUsers } = this.props

    let users

    users = Object.values(allUsers || {}).filter(user => !!user.score)
    users = sortByProp(users, 'name').reverse()
    users = sortByProp(users, 'score')

    return (
      <Fragment>
        <Header
          leftActions={(
            <Icon onClick={goBack} faType="fas fa-arrow-left" />
          )}
        >
          Top visitantes
        </Header>

        {users.length === 0 ? (
          <Paper className={cssClass.message} elevation={1}>
            <Typography align="center" component="h6">
              Ninguém com pontos ainda!
            </Typography>
          </Paper>
        ) : (
          <MenuList component="nav">
            {users.map((user, index) => (
              <MenuItem
                key={index}
                className={cssClass.menuItem}
                style={(
                  users.length - 1 !== index
                    ? { borderBottom: 'solid 1px #ddd' }
                    : {}
                )}
              >
                <ListItemIcon>
                  <Medal
                    bestScores={this.getBestScores(users)}
                    score={user.score}
                  />
                </ListItemIcon>
                <div className={cssClass.itemContainer}>
                  <Typography
                    className={cssClass.typeText}
                    variant="inherit"
                  >
                    {user.score}
                    {` `}
                    {user.score === 1 ? 'Ponto' : 'Pontos'} 
                  </Typography>
                  <Typography variant="inherit" noWrap>
                    {user.name}
                  </Typography>
                </div>
              </MenuItem>
            ))}
          </MenuList>
        )}
      </Fragment>
    )
  }
}

export default Users