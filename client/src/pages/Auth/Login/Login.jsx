import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Form, Row, Input } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setEmail, setPassword } from '../../../../store/reducers/AuthSlice'
import PasswordInput from '../../../common/customPassword/passwordInput'

const Login = () => {
  const { email, password } = useSelector((s) => s.authSlice)
  const dispatch = useDispatch()

  const handleInputEmail = (e) => {
    dispatch(setEmail(e.target.value))
  }

  const handleInputPassword = (e) => {
    dispatch(setPassword(e.target.value))
  }

  return (
    <Row>
      <Card title="Login" style={{ width: '30rem' }}>
        <Form
          name="normal_login"
          className=""
          initialValues={{
            remember: true
          }}
          onFinish={null}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="" />}
              placeholder="Username"
              onChange={handleInputEmail}
              value={email}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!'
              }
            ]}
          >
            <PasswordInput
              prefix={<LockOutlined className="" />}
              type="password"
              placeholder="Password"
              onChange={handleInputPassword}
              value={password}
            />
          </Form.Item>
          <Form.Item className="w-full flex items-center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="" className="ml-[200px] text-right">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item className="flex justify-center">
            <Button type="submit" htmlType="submit" className="flex justify-between">
              Log in
            </Button>
            Or <Link to="/registration">register now!</Link>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  )
}

export default Login
