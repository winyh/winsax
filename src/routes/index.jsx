import { Navigate, useRoutes } from "react-router-dom"
import { Suspense } from "react"
import LayoutComponent from "@/layouts/index.jsx"
import Demo from "@/pages/demo/index.jsx"
import Login from "@/pages/user/login/index.jsx"
import UserInfo from "@/pages/user/info/index.jsx"

const routes = [
  {
    path: "/winsax",
    element: <LayoutComponent />,
    children: [
      {
        path: "demo",
        element: <Demo />
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
    element: <div>开发中 💪...</div>
  },
  {
    path: "/winsax/forget",
    element: <div>开发中 💪...</div>
  },
  {
    path: "*",
    element: <div>404</div>
  }
]

export default routes
