import React, { Component } from 'react'
import { Form, Input, Icon, Button, message } from 'antd'
import './index.less'
import axios from './../../axios'
import { connect } from 'react-redux'
import { setLoginStatus } from './../../store/actionCreator'
import { Redirect } from 'react-router-dom'
const FormItem = Form.Item

class Login extends Component{

  toLogin = () => {
    const userInfo = this.props.form.getFieldsValue()
    this.props.login(userInfo)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      this.props.loginStatus ? <Redirect to='/home' /> :
      <div className='login-wrap'>
        <Form style={{width: 300}}>
          <FormItem>
            {
              getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }]
              })(
                <Input prefix={<Icon type='user' />} />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type='lock' />} type="password" placeholder='Password' />
              )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.toLogin} >
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

Login = Form.create()(Login)

const mapStateToProps = (state) => {
  return {
    loginStatus: state.loginStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login(userInfo) {
      axios.ajax({
        url: '/login',
      }).then(res => {
        if (res.code === 0) {
           const { username, password } = res.result
           if (userInfo.userName === username && userInfo.password === password) {
             dispatch(setLoginStatus(true))
             message.success('登录成功！')
           } else {
             message.warning('登录失败！')
           }
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)