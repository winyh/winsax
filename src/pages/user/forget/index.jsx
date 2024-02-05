import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Checkbox, Form, Input, Card, Flex, Space } from "antd"

import "./index.less"

const Forget = () => {
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log("Received values of form: ", values)
    navigate("/winsax/dashboard")
  }
  return (
    <Flex className="forget" align="center" justify="center">
      <Card title="找回密码" style={{ width: 360 }}>
        <Form
          name="normal_Forget"
          className="Forget-form"
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
              placeholder="请输入账号"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入新密码！"
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入新密码"
            />
          </Form.Item>
          <Form.Item
            name="confirm_password"
            rules={[
              {
                required: true,
                message: "请确认新密码！"
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请确认新密码"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              提交
            </Button>
            <div className="register-link">
              Or <Link to="/winsax/login">已有账号，立即登录</Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  )
}
export default Forget
