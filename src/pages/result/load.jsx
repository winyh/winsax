import React, { useState } from "react"
import { Button, Spin } from "antd"
import { useNavigate } from "react-router-dom"
import "./index.less"
const Loading = () => {
  const [spinning, setSpinning] = useState(true)
  return <Spin spinning={spinning} tip="加载资源中..." fullscreen />
}
export default Loading
