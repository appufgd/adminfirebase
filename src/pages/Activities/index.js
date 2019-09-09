import React, { Component, Fragment } from 'react'

// Material-UI components
import AppBar       from '@material-ui/core/AppBar'
import Avatar       from '@material-ui/core/Avatar'
import ButtonBase   from '@material-ui/core/ButtonBase'
import Drawer       from '@material-ui/core/Drawer'
import Fab          from '@material-ui/core/Fab'
import List         from '@material-ui/core/List'
import ListItem     from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem     from '@material-ui/core/MenuItem'
import MenuList     from '@material-ui/core/MenuList'
import Tab          from '@material-ui/core/Tab'
import Tabs         from '@material-ui/core/Tabs'
import Typography   from '@material-ui/core/Typography'

// My components
import Header  from '../../components/Header'
import Icon    from '../../components/Icon'
import Note    from '../../components/Note'
import MenuBar from './MenuBar'

// Data
import data from '../../data.json'

// Style
import cssClass from './index.css'


import Img from 'react-image'


const styles = {
  content: {
    padding: '25px',
  },
  menuItem: {
    padding: '20px 15px',
  },
  itemContainer: {
    overflow: 'hidden',
    whiteSspace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  typeText: {
    display: 'block',
    color: 'gray',
    fontStyle: 'italic',
  },
  imgFull:{width: '100vw',},
}

const DAY = (new Date()).getDay()

class Activities extends Component {
  state = {
    //tabIndex: DAY < 1 || DAY > 5 ? 0 : DAY - 1,
    tabIndex: DAY < 1 || DAY > 2 ? 0 : DAY - 1,
    menuIsOpen: false
  }
  handleChange = (_, index) => {
    this.setState({
      tabIndex: index
    })
  }
  toggleMenu = () => {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen
    })
  }
  getWeekNamespace = (index) => {
    //return ['seg', 'ter', 'qua', 'qui', 'sex'][index]
    return ['seg', 'ter'][index]
  }
  goTo = (path) => {
    return () => {
      this.props.history.push(path)
    }
  }
  render = () => {
    const { tabIndex, menuIsOpen } = this.state
    const { allNotes, signOut } = this.props
    const { handleChange, toggleMenu, getWeekNamespace, goTo } = this

    return (
      <Fragment>
        <Header
          leftActions={(
            <Icon onClick={toggleMenu} faType="fas fa-bars" />
          )}
        >
          II SIMAE - Atividades
        </Header>

        <MenuBar
          menuIsOpen={menuIsOpen}
          toggleMenu={toggleMenu}
          goTo={goTo}
          signOut={signOut}
        />

        <Img style={styles.imgFull} src="https://images.even3.com.br/HkFuxA6SzpG615t8hH3BjkUiDjA=/1300x536/smart/even3.blob.core.windows.net/banner/capa_simae_even3_Prancheta1.2f6010ce2c12431ea453.png" />

        <AppBar position="static" color="default">
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
          >
            <Tab label="Seg" />
            <Tab label="Ter" />

          </Tabs>
        </AppBar>
        
        <MenuList component="nav">
          {data[getWeekNamespace(tabIndex)].map((act) => (
            <MenuItem
              key={act.namespace}
              button
              onClick={goTo(`/activitie/${act.namespace}`)}
              style={styles.menuItem}
            >
              <ListItemIcon>
                <Note value={
                  (allNotes[act.namespace] || {}).avgGeneral || 0}
                />
              </ListItemIcon>
              <div style={styles.itemContainer}>
                <Typography
                  variant="inherit"
                  style={styles.typeText}
                >
                  {act.time} · {act.type}
                </Typography>
                <Typography variant="inherit" noWrap>
                  {act.title}
                </Typography>
              </div>
            </MenuItem>
          ))}
        </MenuList>

        <Fab
          className={cssClass.fabBtn}
          onClick={goTo('/scanner')}
          color="secondary"
        >
          <i style={{ fontSize: '1.5em' }} className="fas fa-qrcode" />
        </Fab>
      </Fragment>
    )
  }
}

export default Activities