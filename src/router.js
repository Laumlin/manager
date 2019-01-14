import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
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
import NotMatch from './pages/NotMatch'
import Common from './common'
import OrderDetail from './pages/Order/detail'


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
                <Route path="/admin/ui/messages" component={Messages}></Route>
                <Route path="/admin/ui/tabs" component={Tabs}></Route>
                <Route path="/admin/ui/gallery" component={Gallery}></Route>
                <Route path="/admin/ui/carousel" component={Carousel}></Route>    
                <Route path="/admin/form/login" component={FormLogin}></Route>  
                <Route path="/admin/form/reg" component={FormRegister}></Route>
                <Route path="/admin/table/basic" component={BasicTable}></Route>  
                <Route path="/admin/table/high" component={HighRable}></Route>       
                <Route path="/admin/city" component={City}></Route>     
                <Route path="/admin/order" component={Order}></Route>   
                <Route path="/admin/user" component={User}></Route>     
                <Route path="/admin/bikeMap" component={BikeMap}></Route>   
                <Route path='/admin/charts/bar' component={Bar}></Route>
                <Route path='/admin/charts/pie' component={Pie}></Route>
                <Route path='/admin/charts/line' component={Line}></Route>
                <Route path='/admin/rich' component={RichText}></Route>
                <Route component={NotMatch}></Route>
              </Switch>
            </Admin>
          } />
          <Route path='/common' render={() => 
            <Common>
              <Route path='/common/order/detail/:orderId' component={OrderDetail} />
            </Common>
          } />
        </App>
      </HashRouter>
    )
  }
}

export default IRouter