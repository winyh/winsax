import React from "react"
import { useLayoutEffect } from "react"
import { useRoutes, useLocation } from "react-router-dom"
import routes from "@/routes/index.jsx"
import "./App.less"

function App() {
  const genRouter = useRoutes(routes)
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [pathname])
  return <div>{genRouter}</div>
}

export default App
