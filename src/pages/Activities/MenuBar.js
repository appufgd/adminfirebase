import React, { Component } from 'react'

// Material-UI components
import Drawer       from '@material-ui/core/Drawer'
import List         from '@material-ui/core/List'
import ListItem     from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

// My components
import Icon from '../../components/Icon'

// Style
import cssClass from './MenuBar.css'

const MenuBar = ({
  menuIsOpen,
  toggleMenu,
  goTo,
  signOut
}) => (
  <Drawer open={menuIsOpen} onClose={toggleMenu}>
    <div
      tabIndex={0}
      role="button"
      onClick={toggleMenu}
      onKeyDown={toggleMenu}
    >
      <List>
        <ListItem
          button
          onClick={goTo('/trends?banners')}
          className={cssClass.listItem}
        >
          <ListItemIcon className={cssClass.listItemIcon}>
            <Icon disabled faType="fas fa-scroll" />
          </ListItemIcon>
          <ListItemText
            className={cssClass.listItemText}
            primary="Banners"
          />
        </ListItem>
        <ListItem
          button
          onClick={goTo('/users')}
          className={cssClass.listItem}
        >
          <ListItemIcon className={cssClass.listItemIcon}>
            <Icon disabled faType="fas fa-user" />
          </ListItemIcon>
          <ListItemText
            className={cssClass.listItemText}
            primary="Top visitantes"
          />
        </ListItem>
        <ListItem
          button
          onClick={goTo('/trends')}
          className={cssClass.listItem}
        >
          <ListItemIcon className={cssClass.listItemIcon}>
            <Icon disabled faType="fas fa-poll" />
          </ListItemIcon>
          <ListItemText
            className={cssClass.listItemText}
            primary="Top atividades"
          />
        </ListItem>
        <ListItem
          button
          onClick={signOut}
          className={cssClass.listItem}
        >
          <ListItemIcon className={cssClass.listItemIcon}>
            <Icon disabled faType="fas fa-sign-out-alt" />
          </ListItemIcon>
          <ListItemText
            className={cssClass.listItemText}
            primary="Sair"
          />
        </ListItem>
      </List>
    </div>
  </Drawer>
)

export default MenuBar