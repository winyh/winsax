import React from "react"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import "./index.less"
const App = () => {
  const navigate = useNavigate()
  const goHome = () => {
    navigate("/winsax/dashboard")
  }
  return (
    <Button type="primary" onClick={goHome}>
      返回首页
    </Button>
  )
}
export default App
