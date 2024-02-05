import React, { useImperativeHandle, useState, useEffect } from "react"
import Component from "../Component"
import { Row, Col, Form, Button, Space } from "antd"
import { DownOutlined, UpOutlined } from "@ant-design/icons"

/*
 * @desc 超级表单
 * @params { data } array 表单项
 * @params { initialValues } object 初始化值
 * @params { layout } object 表单单项布局
 * @params { span } number 表单项切分
 * @params { onFinish } function 表单验证成功
 * @params { onFinishFailed } function 表单验证失败
 * @params { btnAction } boolean 是否隐藏提交和重置操作，默认true
 * @params { ref } ref 节点
 */
const SuperForm = (
  {
    data = [],
    initialValues,
    layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    },
    span,
    limit = 100,
    onFinish,
    onFinishFailed,
    onReset,
    rulesValid = false,
    btnAction = true,
    btnText = "查询"
  },
  ref
) => {
  const [form] = Form.useForm()

  const [expand, setExpand] = useState(false)
  const [loading, setLoading] = useState(false)

  useImperativeHandle(ref, () => ({
    form
  }))

  useEffect(() => form.resetFields(), [initialValues])

  /*
   * @desc 请求数据时 查询按钮的 Loading 状态控制
   */
  const getDataCallBack = (status) => {
    setLoading(status)
  }

  const handleFinish = (values) => {
    onFinish ? onFinish(values, getDataCallBack) : null
  }

  const handleFinishFailed = (params) => {
    onFinishFailed ? onFinishFailed(params) : null
  }

  const handleReset = () => {
    form.resetFields()
    if (onReset) {
      onReset()
    }
  }

  const handleExpand = () => {
    setExpand(!expand)
  }

  const tailLayout = {
    wrapperCol: { offset: layout.labelCol.span, span: layout.wrapperCol.span }
  }

  // 实际展示数据
  const showData = () => (expand ? data : data.slice(0, limit))

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      initialValues={initialValues}
      scrollToFirstError={true}
      {...layout}
    >
      <Row>
        {showData().map((item, index) => {
          let {
            label,
            name,
            rules,
            valuePropName,
            hideInSearch,
            hideInForm,
            labelCol,
            wrapperCol,
            itemSpan,
            extra,
            ...restProps
          } = item

          if (itemSpan) {
            return (
              <Col key={index} span={itemSpan}>
                <Form.Item
                  label={label}
                  name={name}
                  extra={extra}
                  labelCol={labelCol}
                  wrapperCol={wrapperCol}
                  rules={rulesValid ? rules : null}
                  valuePropName={valuePropName}
                >
                  <Component {...restProps}></Component>
                </Form.Item>
              </Col>
            )
          } else {
            return (
              <Col key={index} span={span}>
                <Form.Item
                  label={label}
                  name={name}
                  extra={extra}
                  rules={rulesValid ? rules : null}
                  valuePropName={valuePropName}
                >
                  <Component {...restProps}></Component>
                </Form.Item>
              </Col>
            )
          }
        })}

        {btnAction && data.length > 0 ? (
          <Col span={span}>
            <Form.Item {...tailLayout}>
              <Space>
                <Button type="primary" htmlType="submit" loading={loading}>
                  {btnText}
                </Button>

                <Button htmlType="button" onClick={handleReset}>
                  重置
                </Button>

                {limit < data.length ? (
                  <Button type="link" onClick={handleExpand}>
                    {expand ? "收起" : "展开"}
                    {expand ? <UpOutlined /> : <DownOutlined />}
                  </Button>
                ) : null}
              </Space>
            </Form.Item>
          </Col>
        ) : null}
      </Row>
    </Form>
  )
}

export default React.forwardRef(SuperForm)
