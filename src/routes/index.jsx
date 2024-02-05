import { Navigate, useRoutes } from "react-router-dom"
import { Suspense, lazy } from "react"
import LayoutComponent from "@/layouts/index.jsx"
import Dashboard from "@/pages/home/dashboard/index.jsx"
import Workplace from "@/pages/home/workplace/index.jsx"
import Result403 from "@/pages/result/403.jsx"
import Result404 from "@/pages/result/404.jsx"
import Result500 from "@/pages/result/500.jsx"
import Login from "@/pages/user/login/index.jsx"
import Register from "@/pages/user/register/index.jsx"
import Forget from "@/pages/user/forget/index.jsx"
import UserInfo from "@/pages/user/info/index.jsx"

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
