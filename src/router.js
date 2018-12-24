import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Admin from './admin'
import Buttons from './pages/Ui/Buttons'
import Modals from './pages/Ui/Modals'
import Loading from './pages/Ui/Loading'
import Notification from './pages/Ui/Notification'
import NotMatch from './pages/NotMatch'


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
                <Route path="/admin/ui/modals" component={Modals}></Route>
                <Route path="/admin/ui/loading" component={Loading}></Route>
                <Route path="/admin/ui/notification" component={Notification}></Route>
                <Route component={NotMatch}></Route>
              </Switch>
            </Admin>
          } />
        </App>
      </HashRouter>
    )
  }
}

export default IRouter