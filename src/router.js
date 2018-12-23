import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Admin from './admin'
import Buttons from './pages/Ui/Buttons'

class IRouter extends Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Route path="/login" component={Login} />
          <Route path="/admin" render={() => 
            <Admin>
              <Switch>
                <Route path="/admin/ui/buttons" component={Buttons}></Route>
              </Switch>
            </Admin>
          } />
        </App>
      </HashRouter>
    )
  }
}

export default IRouter