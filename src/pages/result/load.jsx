import React from "react"
import { Button, Spin } from "antd"
import { useNavigate } from "react-router-dom"
import "./index.less"
const Loading = () => {
  const [spinning, setSpinning] = React.useState(false)
  const showLoader = () => {
    setSpinning(true)
    setTimeout(() => {
      setSpinning(false)
    }, 3000)
  }
  return <Spin spinning={spinning} tip="拼命加载中..." fullscreen />
}
export default Loading
