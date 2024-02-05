import { Navigate, useRoutes } from "react-router-dom"
import { Suspense, lazy } from "react"
import LayoutComponent from "@/layouts/index.jsx"

// 组件懒加载
const Dashboard = lazy(() => import("@/pages/home/dashboard/index.jsx"))
const Workplace = lazy(() => import("@/pages/home/workplace/index.jsx"))

const Result403 = lazy(() => import("@/pages/result/403.jsx"))
const Result404 = lazy(() => import("@/pages/result/404.jsx"))
const Result500 = lazy(() => import("@/pages/result/500.jsx"))

const Login = lazy(() => import("@/pages/user/login/index.jsx"))
const Register = lazy(() => import("@/pages/user/register/index.jsx"))
const Forget = lazy(() => import("@/pages/user/forget/index.jsx"))
const UserInfo = lazy(() => import("@/pages/user/info/index.jsx"))
const UserList = lazy(() => import("@/pages/user/list/index.jsx"))

const Admin = lazy(() => import("@/pages/permission/admin/index.jsx"))
const Role = lazy(() => import("@/pages/permission/role/index.jsx"))

const Feedback = lazy(() => import("@/pages/call/feedback/index.jsx"))
const Comment = lazy(() => import("@/pages/call/comment/index.jsx"))
const Apply = lazy(() => import("@/pages/call/apply/index.jsx"))

const Email = lazy(() => import("@/pages/message/email/index.jsx"))
const Sms = lazy(() => import("@/pages/message/sms/index.jsx"))
const MessageType = lazy(() => import("@/pages/message/type/index.jsx"))

const Area = lazy(() => import("@/pages/basic/area/index.jsx"))
const File = lazy(() => import("@/pages/basic/file/index.jsx"))
const Menu = lazy(() => import("@/pages/basic/menu/index.jsx"))
const Question = lazy(() => import("@/pages/basic/question/index.jsx"))
const Quick = lazy(() => import("@/pages/basic/quick/index.jsx"))

const Dictionary = lazy(() => import("@/pages/system/dictionary/index.jsx"))
const SystemEmail = lazy(() => import("@/pages/system/email/index.jsx"))
const SystemInfo = lazy(() => import("@/pages/system/info/index.jsx"))
const SystemLog = lazy(() => import("@/pages/system/log/index.jsx"))
const SystemMap = lazy(() => import("@/pages/system/map/index.jsx"))
const SystemParameter = lazy(() => import("@/pages/system/parameter/index.jsx"))
const SystemSeo = lazy(() => import("@/pages/system/seo/index.jsx"))

const BackupList = lazy(() => import("@/pages/backup/list/index.jsx"))
const Regular = lazy(() => import("@/pages/backup/regular/index.jsx"))

const routes = [
  {
    path: "/winsax",
    element: <LayoutComponent />,
    children: [
      {
        path: "403",
        element: <Result403 />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "workplace",
        element: <Workplace />
      },
      {
        path: "user/info",
        element: (
          <Suspense>
            <UserInfo />
          </Suspense>
        )
      },
      {
        path: "user/list",
        element: <UserList />
      },
      {
        path: "permission/9",
        element: (
          <Suspense>
            <UserInfo />
          </Suspense>
        )
      },
      {
        path: "permission/admin",
        element: <Admin />
      },
      {
        path: "permission/role",
        element: <Role />
      },
      {
        path: "permission/organization",
        children: [
          {
            path: "list",
            element: <Role />
          },
          {
            path: "department",
            element: <Role />
          },
          {
            path: "post",
            element: <Role />
          }
        ]
      },
      {
        path: "call",
        element: <Feedback />,
        children: [
          {
            path: "feedback",
            element: <Feedback />
          },
          {
            path: "comment",
            element: <Comment />
          },
          {
            path: "apply",
            element: <Apply />
          }
        ]
      },
      {
        path: "message",
        children: [
          {
            path: "email",
            element: <Email />
          },
          {
            path: "sms",
            element: <Sms />
          },
          {
            path: "type",
            element: <MessageType />
          }
        ]
      },
      {
        path: "basic",
        children: [
          {
            path: "file",
            element: <File />
          },
          {
            path: "area",
            element: <Area />
          },
          {
            path: "question",
            element: <Question />
          },
          {
            path: "quick",
            element: <Quick />
          },
          {
            path: "menu",
            element: <Menu />
          }
        ]
      },
      {
        path: "system",
        children: [
          {
            path: "info",
            element: <SystemInfo />
          },
          {
            path: "dictionary",
            element: <Dictionary />
          },
          {
            path: "parameter",
            element: <SystemParameter />
          },
          {
            path: "log",
            element: <SystemLog />
          },
          {
            path: "seo",
            element: <SystemSeo />
          },
          {
            path: "email",
            element: <SystemEmail />
          },
          {
            path: "map",
            element: <SystemMap />
          }
        ]
      },
      {
        path: "backup",
        children: [
          {
            path: "list",
            element: <BackupList />
          },
          {
            path: "regular",
            element: <Regular />
          }
        ]
      },
      {
        path: "test",
        element: (
          <Suspense>
            <div>Test Suspense</div>
          </Suspense>
        )
      }
    ]
  },
  {
    path: "/winsax/login",
    element: <Login />
  },
  {
    path: "/winsax/register",
    element: <Register />
  },
  {
    path: "/winsax/forget",
    element: <Forget />
  },
  {
    path: "*",
    element: <Result404 />
  },
  {
    path: "/winsax/500",
    element: <Result500 />
  }
]

export default routes
