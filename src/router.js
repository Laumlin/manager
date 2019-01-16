import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Home from './pages/Home'
import Admin from './admin'
import Buttons from './pages/Ui/Buttons'
import Modals from './pages/Ui/Modals'
import Loading from './pages/Ui/Loading'
import Notification from './pages/Ui/Notification'
import Messages from './pages/Ui/Messages'
import Tabs from './pages/Ui/Tabs'
import Gallery from './pages/Ui/Gallery'
import Carousel from './pages/Ui/Carousel'
import FormLogin from './pages/Form/Login'
import FormRegister from './pages/Form/Register'
import BasicTable from './pages/Table/BasicTable'
import HighRable from './pages/Table/HighTable'
import City from './pages/City'
import Order from './pages/Order'
import User from './pages/User'
import BikeMap from './pages/Map/bikeMap'
import Bar from './pages/Echarts/bar'
import Pie from './pages/Echarts/pie'
import Line from './pages/Echarts/line'
import RichText from './pages/Rich'
import Permission from './pages/Permission'
import NotMatch from './pages/NotMatch'
import Common from './common'
import OrderDetail from './pages/Order/detail'

class IRouter extends Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path='/common' render={() => 
              <Common>
                <Route path='/common/order/detail/:orderId' component={OrderDetail} />
              </Common>
            } />
            <Route path="/" render={() => 
              <Admin>
                <Switch>
                  <Route path='/home' component={Home} />
                  <Route path="/ui/buttons" component={Buttons} />
                  <Route path="/ui/modals" component={Modals} />
                  <Route path="/ui/loading" component={Loading} />
                  <Route path="/ui/notification" component={Notification} />
                  <Route path="/ui/messages" component={Messages} />
                  <Route path="/ui/tabs" component={Tabs} />
                  <Route path="/ui/gallery" component={Gallery} />
                  <Route path="/ui/carousel" component={Carousel} />    
                  <Route path="/form/login" component={FormLogin} />  
                  <Route path="/form/reg" component={FormRegister} />
                  <Route path="/table/basic" component={BasicTable} />  
                  <Route path="/table/high" component={HighRable} />       
                  <Route path="/city" component={City} />     
                  <Route path="/order" component={Order} />   
                  <Route path="/user" component={User} />     
                  <Route path="/bikeMap" component={BikeMap} />   
                  <Route path='/charts/bar' component={Bar} />
                  <Route path='/charts/pie' component={Pie} />
                  <Route path='/charts/line' component={Line} />
                  <Route path='/rich' component={RichText} />
                  <Route path='/permission' component={Permission} />
                  <Redirect to='/home' />
                  <Route component={NotMatch} />
                </Switch>
              </Admin>
            } />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}

export default IRouter