import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Checkbox, Form, Input, Card, Flex, Space } from "antd"

import "./index.less"

const Login = () => {
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log("Received values of form: ", values)
    navigate("/winsax/dashboard")
  }
  return (
    <Flex className="login" align="center" justify="center">
      <Card title="用户登录" style={{ width: 360 }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入账号!"
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="任意账号"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码！"
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="任意密码"
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住状态</Checkbox>
              </Form.Item>

              <Link to="/winsax/forget">忘记密码</Link>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
            <div className="register">
              Or <Link to="/winsax/register">立即注册</Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  )
}
export default Login
