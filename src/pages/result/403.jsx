import React from "react"
import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"
import "./index.less"
const Result403 = () => {
  const navigate = useNavigate()
  const goHome = () => {
    navigate("/winsax/dashboard")
  }
  return (
    <Result
      status="403"
      title="403"
      subTitle="对不起, 您无权限访问该页面."
      extra={
        <Button type="primary" onClick={goHome}>
          返回首页
        </Button>
      }
    />
  )
}
export default Result403
