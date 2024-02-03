import React, { useState } from "react"
import { Layout, Flex, Image, Dropdown, Button } from "antd"
import { useRoutes, Outlet, Link, useNavigate } from "react-router-dom"
import { Space, Typography, Menu } from "antd"
import {
  DashboardOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  CommentOutlined,
  AlertOutlined,
  GithubOutlined,
  LogoutOutlined,
  UserOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  DatabaseOutlined,
  CloudServerOutlined
} from "@ant-design/icons"
import { getCurrentYear } from "@/utils/util"
import viteLogo from "/vite.svg"
import "./index.less"

const { Text } = Typography

const { Header, Footer, Sider, Content } = Layout

const siderStyle = {
  position: "fixed",
  left: 0,
  top: 64,
  bottom: 0
}

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  }
}
const items = [
  getItem("控制台", "dashboard", <DashboardOutlined />, [
    getItem("Option 1", "1"),
    getItem("Option 2", "2"),
    getItem("Option 3", "3"),
    getItem("Option 4", "4")
  ]),
  getItem("用户系统", "user", <TeamOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "Submenu", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8")
    ])
  ]),
  getItem("权限系统", "permission", <SafetyCertificateOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12")
  ]),
  getItem("客服中心", "call", <CommentOutlined />, [
    getItem("Option 13", "13"),
    getItem("Option 14", "14"),
    getItem("Option 15", "15"),
    getItem("Option 16", "16")
  ]),
  getItem("统一消息", "message", <AlertOutlined />, [
    getItem("Option 17", "17"),
    getItem("Option 18", "18"),
    getItem("Option 19", "19"),
    getItem("Option 20", "20")
  ]),
  getItem("基础数据", "basic", <DatabaseOutlined />, [
    getItem("Option 21", "21"),
    getItem("Option 22", "22"),
    getItem("Option 23", "23"),
    getItem("Option 24", "24")
  ]),
  getItem("系统设置", "system", <SettingOutlined />, [
    getItem("Option 25", "25"),
    getItem("Option 26", "26"),
    getItem("Option 27", "27"),
    getItem("Option 28", "28")
  ]),
  getItem("数据备份", "backup", <CloudServerOutlined />, [
    getItem("Option 29", "29"),
    getItem("Option 30", "30"),
    getItem("Option 31", "31"),
    getItem("Option 32", "32")
  ])
]

const rootSubmenuKeys = [
  "dashboard",
  "user",
  "permission",
  "call",
  "message",
  "basic",
  "system",
  "backup"
]

const LayoutComponent = () => {
  const [openKeys, setOpenKeys] = useState(["dashboard"])
  const navigate = useNavigate()

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const menuItems = [
    {
      label: "个人中心",
      key: "1",
      icon: <UserOutlined />,
      onClick: () => navigate("/winsax/user/info")
    },
    {
      type: "divider"
    },
    {
      label: "退出登录",
      key: "2",
      icon: <LogoutOutlined />,
      onClick: () => navigate("/winsax/login")
    }
  ]

  return (
    <Layout className="layout">
      <Header className="head">
        <Flex align="center" justify="space-between">
          <Link to="/winsax">
            <Flex align="center">
              <img width={28} src={viteLogo} />
              <h1 className="title">虎鲸系统</h1>
            </Flex>
          </Link>
          <Dropdown menu={{ items: menuItems }}>
            <Button type="text" size="large">
              <Flex align="center">
                <img width={28} src={viteLogo} />
                <span className="name">winyh</span>
              </Flex>
            </Button>
          </Dropdown>
        </Flex>
      </Header>
      <Layout>
        <Sider style={siderStyle} className="asider" reverseArrow={true}>
          <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{
              width: 256
            }}
            items={items}
          />
        </Sider>
        <Layout>
          <Content className="content">
            <Outlet />
          </Content>
          <Footer className="foot">
            <Flex justify="center" align="center">
              <Space>
                <Text>
                  @2020 ~ {getCurrentYear()}{" "}
                  <Link to="https://winyh.github.io/winsax" target="_blank">
                    虎鲸系统
                  </Link>
                </Text>
                <Link to="https://github.com/winyh/winsax" target="_blank">
                  <GithubOutlined></GithubOutlined>
                </Link>
              </Space>
            </Flex>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default LayoutComponent
