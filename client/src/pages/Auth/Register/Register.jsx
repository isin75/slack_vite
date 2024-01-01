import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Form, Input, Row, Space, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../../common/customPassword/passwordInput'
import { registerUser } from '../../../../store/reducers/AuthSlice'

const Register = () => {
  const { status } = useSelector((s) => s.authSlice)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const nameHandle = (e) => {
    setName(e.target.value)
  }

  const emailHandle = (e) => {
    setEmail(e.target.value)
  }

  const passwordHandle = (e) => {
    setPassword(e.target.value)
  }

  const handleClickSubmit = () => {
    dispatch(registerUser({ name, email, password }))
    setName('')
    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    if (status === 'resolve') {
      navigate('/login')
    }
  }, [])

  return (
    <Row align="middle" justify="center">
      <Card title="Registration" style={{ width: '30rem' }}>
        <Form onFinish={handleClickSubmit}>
          <Form.Item
            name="Name"
            rules={[
              {
                required: true,
                message: 'Please input your Name!'
              }
            ]}
          >
            <Input placeholder="Name" onChange={nameHandle} value={name} />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!'
              }
            ]}
          >
            <Input type="email" placeholder="Email" onChange={emailHandle} value={email} />
          </Form.Item>
          <PasswordInput name="password" placeholder="Password" />
          <PasswordInput
            name="confirmPassword"
            placeholder="Repeat password"
            onChange={passwordHandle}
            value={password}
          />
          <Form.Item className="flex justify-center">
            <Button type="submit" htmlType="submit" className="flex justify-between">
              Register
            </Button>
          </Form.Item>
          {/* <CustomButton
            type="primary"
            htmlType="submit"
            onClick={() => handleClick()}
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Register
          </CustomButton> */}
        </Form>
        <Space direction="vertical" size="large">
          <Typography.Text>
            Have an account? <Link to="/login">Login</Link>
          </Typography.Text>
        </Space>
      </Card>
    </Row>
  )
}

export default Register
