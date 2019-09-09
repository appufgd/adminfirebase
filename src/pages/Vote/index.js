import React, { Component, Fragment } from 'react'

// Material-UI components
import Button       from '@material-ui/core/Button'
import List         from '@material-ui/core/List'
import ListItem     from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField    from '@material-ui/core/TextField'
import Typography   from '@material-ui/core/Typography'

// My components
import Icon   from '../../components/Icon'
import Header from '../../components/Header'
import Rating from './Rating'

// Styles
import cssClass from './index.css'

const styles = {
  listItem: {
    padding: '10px 0',
  },
  listItemBorder: {
    borderBottom: 'solid 1px #eee',
  },
  textHeader: {
    padding: '30px 25px 15px 25px',
  },
  container: {
    padding: '0 25px',
  },
  fullWidth: {
    width: '100%',
  },
}

class Vote extends Component {
  state = {
    ntOrg:     0,
    ntCont:    0,
    ntApres:   0,
    comment:   '',
    isSending: false 
  }
  onTypeComment = (event) => {
    const newComment = event.target.value

    if (newComment.length <= 120) {
      this.setState({
        comment: event.target.value
      })
    }
  }
  updateRating = (nt) => (newValue) => {
    this.setState({
      [nt]: newValue
    })
  }
  onSubmit = (event) => {
    event.preventDefault()
    this.setState({ isSending: true })

    const { namespace } = this.props.match.params
    const { ntOrg, ntCont, ntApres, comment } = this.state

    this.props.sendVote(namespace, ntOrg, ntCont, ntApres, comment, () => {
      this.setState({ isSending: false })
      this.goBack()
    })
  }
  goBack = () => {
    this.props.history.goBack()
  }
  render = () => {
    const { goBack, updateRating, onSubmit, onTypeComment } = this
    const { ntOrg, ntCont, ntApres, comment, isSending } = this.state

    return (
      <Fragment>
        <Header
          leftActions={(
            <Icon onClick={goBack} faType="fas fa-arrow-left" />
          )}
        >
          Seu feedback
        </Header>

        <form
          onSubmit={onSubmit}
          style={styles.container}
        >
          <div style={styles.textHeader}>
            <Typography
              variant="h6"
              color="inherit"
              align="center"
              style={{ color: 'gray' }}
            >
              Gostou dessa atividade? Deixei sua nota para ela!
            </Typography>
          </div>

          <List component="nav">
            <ListItem style={{...styles.listItem, ...styles.listItemBorder}}>
              <ListItemText primary="Organização" />
              <Rating
                value={ntOrg}
                onChange={updateRating('ntOrg')}
              />
            </ListItem>
            <ListItem style={{...styles.listItem, ...styles.listItemBorder}}>
              <ListItemText primary="Conteúdo" />
              <Rating
                value={ntCont}
                onChange={updateRating('ntCont')}
              />
            </ListItem>
            <ListItem style={styles.listItem}>
              <ListItemText primary="Apresentação" />
              <Rating
                value={ntApres}
                onChange={updateRating('ntApres')}
              />
            </ListItem>
          </List>

          <TextField
            style={{...styles.fullWidth}}
            className={cssClass.field}
            label="Seu comentário (opcional)"
            multiline
            rowsMax="3"
            value={comment}
            onChange={onTypeComment}
            margin="normal"
            helperText={`${comment.length}-120`}
            variant="filled"
          />

          <Button
            className={cssClass.submitButton}
            type="submit"
            disabled={isSending}
            variant="contained"
            color="primary"
            style={{padding: '10px 0', ...styles.fullWidth}}
          >
            Enviar
          </Button>
        </form>
      </Fragment>
    )
  }
}

export default Vote