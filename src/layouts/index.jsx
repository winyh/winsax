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
import whaleLogo from "/whale.svg"
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
    getItem("分析页", "1"),
    getItem("工作台", "2")
  ]),
  getItem("用户系统", "user", <TeamOutlined />, [
    getItem("用户列表", "5"),
    getItem("个人中心", "6")
  ]),
  getItem("权限系统", "permission", <SafetyCertificateOutlined />, [
    getItem("后台用户", "9"),
    getItem("角色管理", "10"),
    getItem("组织管理", "Submenu", null, [
      getItem("组织列表", "7"),
      getItem("部门管理", "8"),
      getItem("岗位管理", "11")
    ])
  ]),
  getItem("客服中心", "call", <CommentOutlined />, [
    getItem("意见反馈", "13"),
    getItem("评论列表", "14"),
    getItem("申请列表", "15")
  ]),
  getItem("统一消息", "message", <AlertOutlined />, [
    getItem("短信通知", "17"),
    getItem("邮件通知", "18"),
    getItem("消息类型", "19")
  ]),
  getItem("基础数据", "basic", <DatabaseOutlined />, [
    getItem("文件管理", "21"),
    getItem("行政区划", "22"),
    getItem("常见问题", "23"),
    getItem("快捷入口", "24"),
    getItem("菜单管理", "221")
  ]),
  getItem("系统设置", "system", <SettingOutlined />, [
    getItem("系统信息", "25"),
    getItem("系统字典", "26"),
    getItem("全局参数", "27"),
    getItem("日志记录", "28")
  ]),
  getItem("数据备份", "backup", <CloudServerOutlined />, [
    getItem("备份记录", "29"),
    getItem("定时任务", "30")
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
          <Link to="/winsax/dashboard">
            <Flex align="center">
              <img width={28} src={whaleLogo} />
              <h1 className="title">虎鲸系统</h1>
            </Flex>
          </Link>
          <Dropdown menu={{ items: menuItems }}>
            <Button type="text" size="large">
              <Flex align="center">
                <img width={28} src={whaleLogo} />
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
