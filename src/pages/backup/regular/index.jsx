import React from "react"
import { Button } from "antd"
import SuperForm from "@/components/SuperForm"
import { useNavigate } from "react-router-dom"
import "./index.less"

const onFinish = (values) => {}

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo)
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

const formData = [
  {
    label: "所属城市",
    name: "area_id",
    is: "Select",
    style: { width: "100%" },
    options: []
  },
  {
    label: "最少几人",
    name: "min_user_num",
    is: "InputNumber",
    style: { width: "100%" },
    min: 2,
    rules: [{ required: true, message: "请输入几人团!" }]
  },
  {
    label: "最多几人",
    name: "max_user_num",
    is: "InputNumber",
    style: { width: "100%" },
    min: 0,
    rules: [{ required: true, message: "请输入数量限制!" }]
  },
  {
    label: "单人限量",
    name: "limit_buy_num",
    is: "InputNumber",
    style: { width: "100%" },
    min: 0,
    rules: [{ required: true, message: "请输入数量限制!" }]
  },
  {
    label: "团购优惠",
    name: "discount",
    is: "InputNumber",
    style: { width: "100%" },
    min: 0,
    rules: [{ required: true, message: "请输入团购优惠!" }]
  },
  {
    label: "开始结束",
    name: "active_at",
    is: "DatePicker.RangePicker",
    style: { width: "100%" },
    showTime: true,
    rules: [{ required: true, message: "请选择时间!" }]
  },
  {
    label: "排序",
    name: "sort",
    is: "InputNumber",
    style: { width: "100%" },
    min: 0
  },
  {
    label: "团购状态",
    name: "status",
    options: [],
    is: "Select"
  },
  {
    label: "关联商品",
    name: "product_id",
    is: "Select",
    style: { width: "100%" },
    showSearch: true,
    filterOption: (input, option) => {
      return option.label.indexOf(input.toLowerCase()) >= 0
    },
    options: []
  }
]

const App = () => {
  const navigate = useNavigate()
  const goHome = () => {
    navigate("/winsax/dashboard")
  }
  return (
    <>
      <Button type="primary" onClick={goHome}>
        返回首页
      </Button>

      <SuperForm
        data={formData}
        span={8}
        layout={layout}
        rulesValid={true}
        btnText="提交"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      ></SuperForm>
    </>
  )
}
export default App
