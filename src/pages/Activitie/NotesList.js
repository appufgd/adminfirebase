import React, { Component, Fragment } from 'react'

// Material-UI components
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'

// My components
import Icon from '../../components/Icon'

const styles = {
  listItem: {
    display: 'flex',
    padding: '10px 0',
    fontFamily: 'Helvetica, Verdana, Arial, sans-serif'
  },
  menuItemTitle: {
    flex: 1,
  },
}

const NoteListItem = ({ title, note }) => (
  <ListItem style={styles.listItem}>
    <Typography variant='inherit' style={styles.menuItemTitle}>
      {title}
    </Typography>
    <ListItemIcon style={{ marginRight: 0 }}>
      <span>
        <i
          style={{ color: '#f39c12' }}
          className='fas fa-star'
        />
        {` `}
        {note.toFixed(1).replace('.', ',')}
      </span>
    </ListItemIcon>
  </ListItem>
)

const NotesList = ({ avgOrg, avgCont, avgApres }) => (
  <List dense={false} style={{ marginTop: 15 }}>
    <NoteListItem title='Organização' note={avgOrg} />
    <NoteListItem title='Conteúdo' note={avgCont} />
    <NoteListItem title='Apresentação' note={avgApres} />
  </List>
)

export default NotesList