import React from "react"
import { Link } from "react-router-dom"
import { Button, Row, Col, Card, Divider, Flex, Space, Typography } from "antd"
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons"
import { useState } from "react"
import "./index.less"

const { Text } = Typography

function Dashboard() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <Card title="欢迎您，winyh" bordered={false}>
            开心每一天
          </Card>
        </Col>
        <Col span={18}>
          <Card title="快捷入口" bordered={false}>
            <Flex gap="small" wrap="wrap" align="center">
              <Link to="/winsax/user/info">个人中心</Link>
              <Divider type="vertical" />
              <Link to="/winsax/user/info">消息通知</Link>
              <Divider type="vertical" />
              <Link to="/winsax/user/info">留言回复</Link>
            </Flex>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
