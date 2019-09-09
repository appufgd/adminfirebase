import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// Firebase
import * as firebase from 'firebase'
import fbConfig from './fbConfig.json'

// Material-UI components
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { yellow } from '@material-ui/core/colors'
import { orange } from '@material-ui/core/colors'

// react-router components
import { HashRouter } from 'react-router-dom'
import { Switch, Route, withRouter } from 'react-router'

// My components
import Loading from './components/Loading'
import PrivateRoute from './components/PrivateRoute'

// My pages
import Activitie  from './pages/Activitie'
import Activities from './pages/Activities'
import Error404   from './pages/Error404'
import Login      from './pages/Login'
import Register   from './pages/Register'
import Scanner    from './pages/Scanner'
import Trends     from './pages/Trends'
import Users      from './pages/Users'
import Vote       from './pages/Vote'

// Style
import cssClass from './index.css'

const app = firebase.initializeApp(fbConfig)

const theme = createMuiTheme({
  palette: {
    secondary: { main: orange[800] }
  }
})

class App extends Component {
  state = {
    uid     : null,
    allNotes: null,
    allUsers: null,
  }
  componentWillMount = () => {
    this.setUid()
    this.setAllNotes()
    this.setAllUsers()
  }
  setUid = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        uid: (firebase.auth().currentUser || {}).uid
      })
    })
  }
  setAllNotes = () => {
    const ref = firebase.database().ref('votes')

    ref.once('value', snapshot => {
      const data = Object.values(snapshot.val() || {})
      const allNotes = {}

      for (let index = 0; index < data.length; index++) {
        const newItem = data[index]
        const hasItem = !!allNotes[newItem.namespace]
        const item = allNotes[newItem.namespace] || {
          avgOrg    : 0,
          avgCont   : 0,
          avgApres  : 0,
          avgGeneral: 0,
          comments  : []
        }

        if (hasItem) {
          item.avgOrg = (item.avgOrg + newItem.ntOrg) / 2
          item.avgCont = (item.avgCont + newItem.ntCont) / 2
          item.avgApres = (item.avgApres + newItem.ntApres) / 2
          item.avgGeneral = (item.avgGeneral
            + (newItem.ntOrg + newItem.ntCont + newItem.ntApres) / 3) / 2
        } else {
          item.avgOrg = newItem.ntOrg
          item.avgCont = newItem.ntCont
          item.avgApres = newItem.ntApres
          item.avgGeneral = (newItem.ntOrg + newItem.ntCont + newItem.ntApres) / 3
        }

        if (newItem.comment) {
          item.comments.push({
            uid: newItem.uid,
            text: newItem.comment
          })
        }

        allNotes[newItem.namespace] = item
      }

      this.setState({
        allNotes
      })
    })
  }
  setAllUsers = () => {
    const ref = firebase.database().ref('users')

    ref.once('value', snapshot => {
      this.setState({
        allUsers: snapshot.val() || {}
      })
    })
  }
  signIn = (email, password) => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(({ user: { uid } }) => {
            this.setState({ uid })
          })
          .catch(error => {
            const errorCode = error.code
            const errorMessage = error.message

            window.alert(`[Erro interno #${errorCode}] ${errorMessage}`)
          })
      })
  }
  signOut = () => {
    if (window.confirm('Deseja sair?')) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.setState({ uid: undefined })
        }).catch(error => {
          const errorCode = error.code
          const errorMessage = error.message

          window.alert(`[Erro interno #${errorCode}] ${errorMessage}`)
        })
    }
  }
  registerUser = (name, email, password) => {
    //window.alert('O evento já foi finalizado, você não pode mais se cadastrar.')
    //return
    
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user: { uid } }) => {
        this.setState({ uid })
        this.addUserToDb(uid, email, name)
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message

        window.alert(`[Erro interno #${errorCode}] ${errorMessage}`)
      })
  }
  sendVote = (namespace, ntOrg, ntCont, ntApres, comment, onSuccess) => {
    //window.alert('O evento já foi finalizado, você não pode mais se cadastrar.')
    //return
    
    const uid = this.state.uid
    const ref = firebase.database().ref('votes')

    ref
      .orderByChild('namespace').equalTo(namespace)
      .once('value', snapshot => {
        const values = Object.values(snapshot.val() || {})
        const hasVoted = !!values.find(item => {
          return item.namespace === namespace && item.uid === uid
        })

        if (hasVoted) {
          window.alert('Já votou!')
          return
        }

        ref
          .push()
          .set({ uid, namespace, ntOrg, ntCont, ntApres, comment })

        firebase
          .database()
          .ref(`users/${uid}`)
          .once('value', snapshot => {
            const user = snapshot.val() || {}
            const totalScore = 1 + (!!comment ? 1 : 0)

            firebase
              .database()
              .ref(`users/${uid}`)
              .update({
                ...user,
                score: (user.score || 0) + totalScore
              })
              .then(() => {
                window.alert('Feedback enviado!')

                if (typeof onSuccess === 'function') {
                  onSuccess()
                }
              })
          })
      })
  }
  addUserToDb = (uid, email, name) => {
    firebase
      .database()
      .ref(`users/${uid}`)
      .set({
        email: email,
        name: name
      })
  }
  render = () => {
    if (this.state.uid === null)
      return <Loading message="Autenticando..." />

    if (this.state.allNotes === null)
      return <Loading message="Buscando notas..." />

    if (this.state.allUsers === null)
      return <Loading message="Buscando usuários..." />

    return (
      <MuiThemeProvider theme={theme}>
        <HashRouter>
          <Switch>
            <PrivateRoute
              exact
              path='/'
              isLogged={!!this.state.uid}
              onlyPublic={true}
              component={props => (
                <Register {...props} registerUser={this.registerUser} />
              )}
            />
            <PrivateRoute
              exact
              path='/activitie/:namespace'
              isLogged={!!this.state.uid}
              component={props => (
                <Activitie
                  {...props}
                  allNotes={this.state.allNotes}
                  allUsers={this.state.allUsers}
                />
              )}
            />
            <PrivateRoute
              exact
              path='/activities'
              isLogged={!!this.state.uid}
              component={props => (
                <Activities
                  {...props}
                  signOut={this.signOut}
                  allNotes={this.state.allNotes}
                />
              )}
            />
            <PrivateRoute
              exact
              path='/login'
              isLogged={!!this.state.uid}
              onlyPublic={true}
              component={props => (
                <Login {...props} signIn={this.signIn} />
              )}
            />
            <PrivateRoute
              exact
              path='/scanner'
              isLogged={!!this.state.uid}
              component={Scanner}
            />
            <PrivateRoute
              exact
              path='/trends'
              isLogged={!!this.state.uid}
              component={props => (
                <Trends {...props} allNotes={this.state.allNotes} />
              )}
            />
            <PrivateRoute
              exact
              path='/users'
              isLogged={!!this.state.uid}
              component={props => (
                <Users {...props} allUsers={this.state.allUsers} />
              )}
            />
            <PrivateRoute
              exact
              path='/vote/:namespace'
              isLogged={!!this.state.uid}
              component={props => (
                <Vote {...props} sendVote={this.sendVote} />
              )}
            />
            <Route component={Error404}/>
          </Switch>
        </HashRouter>
      </MuiThemeProvider>
    )
  }
}

const root = document.getElementById('root')

ReactDOM.render(<App />, root)
