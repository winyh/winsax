import React from "react"
import {
  Button,
  Row,
  Col,
  Card,
  Badge,
  Descriptions,
  Statistic,
  Space,
  Typography
} from "antd"
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons"
import { useState } from "react"
import { getLastYear } from "@/utils/util"
import reactLogo from "@/assets/react.svg"
import viteLogo from "/vite.svg"
import "./index.less"

const { Text } = Typography

const items = [
  {
    key: "1",
    label: "产品名称",
    children: "Winsax",
    span: 2
  },
  {
    key: "2",
    label: "版本号",
    children: "v0.0.5"
  },
  {
    key: "3",
    label: "开源协议",
    children: "Apache 2.0",
    span: 2
  },
  {
    key: "5",
    label: "定制研发",
    children: "3000 元起"
  },
  {
    key: "6",
    label: "状态",
    children: <Badge status="processing" text="运行中" />,
    span: 3
  },
  {
    key: "10",
    label: "服务器",
    children: (
      <>
        内(外)网IP:{" "}
        <Space>
          <span>192.168.1.1</span>{" "}
          <Text copyable type="warning">
            20.108.3.4
          </Text>
        </Space>
        <br />
        操作系统: arm64
        <br />
        CPU: 8 使用率 30%
        <br />
        内存: 3GB 使用率 50%
      </>
    )
  }
]

function Dashboard() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="订单量"
              value={11.28}
              precision={2}
              valueStyle={{
                color: "#cf1322"
              }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="退货数"
              value={9.3}
              precision={2}
              valueStyle={{
                color: "#3f8600"
              }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="访问量(今/昨天)" value={93} suffix="/ 100" />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="成交额 (CNY)" value={112893} precision={2} />
          </Card>
        </Col>

        <Col span={24}>
          <Card title="演示中心" bordered={false}>
            <div style={{ textAlign: "center" }}>
              <div>
                <a href="https://vitejs.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                  <img
                    src={reactLogo}
                    className="logo react"
                    alt="React logo"
                  />
                </a>
              </div>
              <h1>Vite + React + Antd</h1>
              <br />
              <Button
                type="default"
                onClick={() => setCount((count) => count + 1)}
              >
                数钱 🥰 {count}00 RMB
              </Button>
            </div>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="用户中心" bordered={false}>
            这是用户信息
          </Card>
        </Col>
        <Col span={12}>
          <Card title="系统监控" bordered={false}>
            <Descriptions bordered items={items} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
