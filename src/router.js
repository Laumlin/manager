import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Admin from './admin'

class IRouter extends Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
        </App>
      </HashRouter>
    )
  }
}

export default IRouter