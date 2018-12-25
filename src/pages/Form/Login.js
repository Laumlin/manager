import React, { Component } from 'react'
import { Card, Form, Input, Button } from 'antd'
const FormItem = Form.Item

class FormLogin extends Component {
  render() {
    return (
      <div>
        <Card title='登录行内表单' style={{marginBottom: 10}}>
          <Form layout='inline'>
            <FormItem>
              <Input placeholder='请输入用户名' />
            </FormItem>
            <FormItem>
              <Input placeholder='请输入密码' />
            </FormItem>
            <FormItem>
              <Button type='primary'>登录</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default FormLogin