import React, { Component, Fragment } from 'react'

// Material-UI components
import Button     from '@material-ui/core/Button'
import Chip       from '@material-ui/core/Chip'
import Paper      from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

// My components
import Icon      from '../../components/Icon'
import Header    from '../../components/Header'
import NotesList from './NotesList'

// Data
import data from '../../data.json'

// Style
import cssClass from './index.css'

class Activitie extends Component {
  state = {
    namespace: this.props.match.params.namespace,
  }
  componentWillMount = () => {
    const weekDay = this.state.namespace.split(/_/)[0]
    const item = data[weekDay].find((item) => {
      return item.namespace === this.state.namespace
    })

    this.state.item = item
  }
  goTo = (path) => {
    return () => {
      this.props.history.push(path)
    }
  }
  goBack = () => {
    this.props.history.goBack()
  }
  sortCommentList = (comments) => {
    const { allUsers } = this.props

    return comments.sort((a, b) => {
      if (allUsers[a.uid].name > allUsers[b.uid].name) return 1
      if (allUsers[a.uid].name < allUsers[b.uid].name) return -1

      return 0
    })
  }
  render = () => {
    const { goTo, goBack, sortCommentList } = this
    const { namespace } = this.state
    const { allNotes, allUsers } = this.props
    const commentsList = ((allNotes[namespace] || {}).comments || [])

    return (
      <Fragment>
        <Header
          leftActions={(
            <Icon onClick={goBack} faType="fas fa-arrow-left" />
          )}
        >
          II SIMAE - Atividade
        </Header>

        <div className={cssClass.content}>
          {this.state.item ? (
            <Fragment>
              <Typography
                variant="h6"
                color="inherit"
                align="center"
                className={cssClass.msgText}
              >
                {this.state.item.title}
              </Typography>
              <div style={{ textAlign: 'center' }}>
                <Chip
                  className={cssClass.chip}
                  label={
                    this.state.item.type === 'Banner'
                      ? "Banner"
                      : `${this.state.item.type} · ${this.state.item.time}`
                  }
                  color='default'
                />
              </div>

              <NotesList
                avgOrg={(allNotes[namespace] || {}).avgOrg || 0}
                avgCont={(allNotes[namespace] || {}).avgCont || 0}
                avgApres={(allNotes[namespace] || {}).avgApres || 0}
              />

              <div className={cssClass.comments}>
                {commentsList.length > 0 ? (
                  sortCommentList(commentsList).map((comment, index) => (
                    <Paper
                      key={index}
                      className={cssClass.comment}
                      elevation={1}
                    >
                      <Typography component="h6">
                        <b>{allUsers[comment.uid].name}</b>: {comment.text}
                      </Typography>
                    </Paper>
                  ))
                ) : (
                  <Paper elevation={1} className={cssClass.comment}>
                    <Typography align="center" component="h6">
                      Não há comentários ainda!
                    </Typography>
                  </Paper>
                )}
              </div>
            </Fragment>
          ) : (
            <div className={cssClass.alignCenter}>
              <Typography
                className={cssClass.msgText}
                variant="h6"
                color="inherit"
                align="center"
              >
                Código inválido!
              </Typography>
              <Button
                onClick={goTo('/activities')}
                variant="contained"
                color="primary"
              >
                Voltar
              </Button>
            </div>
          )}
        </div>
      </Fragment>
    )
  }
}

export default Activitie