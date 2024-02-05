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
        path: "page2",
        element: (
          <Suspense>
            <div>2</div>
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
