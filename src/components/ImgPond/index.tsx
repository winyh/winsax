import SuperForm from "@/components/SuperForm"
import { getFilesSrv } from "@/services/file.js"
import {
  CloseCircleOutlined,
  CloudUploadOutlined,
  ToTopOutlined
} from "@ant-design/icons"
import {
  Button,
  Checkbox,
  Col,
  Image,
  Input,
  message,
  Modal,
  Pagination,
  Row,
  Space,
  Spin
} from "antd"
import React, { useEffect, useRef, useState } from "react"

import styles from "./index.less"

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

/* limit 为1 时传出数据为一个图片的url, > 1 时传出的数据为图片url数组 */
export interface ImgPondProps {
  value?: T
  limit: Number
  onChange?: (value?: string) => void
}

const ImgPond: React.FC<ImgPondProps> = (props) => {
  const formRef = useRef<ActionType>()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imgVisible, setImgVisible] = useState(false)
  const [imgList, setImgList] = useState([])
  const [checkList, setCheckList] = useState([])
  const { value, onChange, limit = 8, width = 100, height = 100 } = props

  const [pagination, setPagination] = useState<object>({
    showQuickJumper: true,
    current: 1,
    pageSize: 10,
    total: 10,
    onChange: (current, pageSize) => paginationHandle(current, pageSize),
    onShowSizeChange: (current, pageSize) => paginationHandle(current, pageSize)
  })

  useEffect(() => {
    setCheckList(Array.isArray(value) ? value : [value])
  }, [])

  /*
   * @desc 分页处理
   * @params { current } number 当前页数
   * @params { pageSize } number 每页条数
   */
  const paginationHandle = (current, pageSize) => {
    const fromValues = formRef.current.form.getFieldsValue()
    getFileList({
      current,
      pageSize,
      ...fromValues
    })
  }

  const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value || ""
    if (onChange) {
      onChange(result)
    }
    setCheckList(result)
  }

  const showModal = () => {
    getFileList()
    setVisible(true)
  }

  const handleOk = () => {
    setCheckList(checkList)
    if (onChange) {
      if (limit == 1) {
        onChange(checkList[0])
      } else {
        let result = checkList.length > 0 ? JSON.stringify(checkList) : ""
        onChange(result)
      }
    }
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const showImgModal = () => {
    setImgVisible(true)
  }

  const handleImgOk = () => {
    setImgVisible(false)
  }

  const handleImgCancel = () => {
    setImgVisible(false)
  }

  const checkboxChange = (e, value) => {
    const checked = e.target.checked
    let imgs = checkList
    if (checked) {
      imgs.push(value)
    } else {
      imgs = imgs.filter((o) => o != value)
    }
    setCheckList(imgs)
  }

  const showImgUpload = () => {
    setImgVisible(true)
  }

  const onRemove = (value) => {
    let imgs = checkList.filter((o) => o != value)
    if (onChange) {
      if (limit == 1) {
        onChange(imgs[0])
      } else {
        let result = imgs.length > 0 ? JSON.stringify(imgs) : ""
        onChange(result)
      }
    }
    setCheckList(imgs)
    message.success(`删除成功！`)
  }

  const onTop = (value) => {
    checkList.map((item, index) => {
      if (item === value) {
        checkList.unshift(checkList.splice(index, 1)[0])
      }
    })
    let imgs = checkList
    if (onChange) {
      if (limit == 1) {
        onChange(imgs[0])
      } else {
        let result = imgs.length > 0 ? JSON.stringify(imgs) : ""
        onChange(result)
      }
    }
    setCheckList(imgs)
    message.success(`已设为主图！`)
  }

  const getFileList = async (params) => {
    setLoading(true)
    const { status, data } = await getFilesSrv(params)

    if (status) {
      const { current, pageSize, total, list } = data
      const newPagination = {
        ...pagination,
        current: current,
        pageSize: pageSize,
        total
      }
      setPagination(newPagination)
      setImgList(list)
    }
    setLoading(false)
  }

  const formData = [
    {
      label: "名称",
      name: "title",
      is: "Input"
    },
    {
      label: "分类",
      name: "category",
      is: "Input"
    },
    {
      label: "文件夹",
      name: "folder",
      is: "Input"
    }
  ]

  const onFinish = (values) => {
    getFileList(values)
  }

  const onReset = () => {
    getFileList()
  }

  return (
    <div>
      <Input type="hidden" value={value} onChange={changeHandle} />

      <Row gutter={8}>
        {checkList.map((item, index) => {
          return (
            <Col key={index}>
              <div className={styles.imgDefault}>
                <div className={styles.remove} onClick={() => onRemove(item)}>
                  <CloseCircleOutlined />
                </div>

                <Image width={width} height={height} src={item} />

                {checkList.length > 0 && index > 0 ? (
                  <div className={styles.top} onClick={() => onTop(item)}>
                    <ToTopOutlined />
                  </div>
                ) : null}
              </div>
            </Col>
          )
        })}

        {checkList.length >= limit ? null : (
          <Col>
            <div
              className={styles.imgManage}
              style={{ height, width }}
              onClick={() => showModal()}
            >
              <CloudUploadOutlined />
            </div>
          </Col>
        )}
      </Row>

      <Modal
        title="图片资源池"
        destroyOnClose
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="70%"
        bodyStyle={{ padding: "8px" }}
        footer={
          <div className={styles.foot}>
            <div className={styles.page}>
              <Pagination size="small" {...pagination} />
            </div>
            <Space>
              <Button onClick={() => handleCancel()}>取消</Button>
              <Button type="primary" onClick={() => handleOk()}>
                确定
              </Button>
            </Space>
          </div>
        }
      >
        <SuperForm
          ref={formRef}
          layout={layout}
          data={formData}
          onFinish={onFinish}
          onReset={onReset}
        />
        <Spin spinning={loading}>
          <Image.PreviewGroup>
            <div className={styles.imgBox}>
              {imgList.map((item, index) => {
                return (
                  <div className={styles.box} key={index}>
                    <div className={styles.check}>
                      <Checkbox
                        defaultChecked={checkList.includes(item.url)}
                        onChange={(e) => checkboxChange(e, item.url)}
                      ></Checkbox>
                    </div>
                    <Image width={100} height={100} src={item.url} />
                    <div className={styles.origin}>
                      {item.origin || item.title}
                    </div>
                  </div>
                )
              })}
            </div>
          </Image.PreviewGroup>
        </Spin>
      </Modal>
    </div>
  )
}

export default ImgPond
