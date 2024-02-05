/*
 * @desc 构造组件
 * @params { is } string 组件标签name值, 如果组件含有子组件则传入.连接符
 * @params { children } 子组件
 * @params { restProps } 剩余参数
 */

// import ImgPond from "@/components/ImgPond/index.tsx"

import {
  Affix,
  Alert,
  Anchor,
  AutoComplete,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Carousel,
  Cascader,
  Checkbox,
  Col,
  Collapse,
  ConfigProvider,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Form,
  Grid,
  Image,
  Input,
  InputNumber,
  Layout,
  List,
  Mentions,
  Menu,
  message,
  Modal,
  notification,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  Rate,
  Result,
  Row,
  Select,
  Skeleton,
  Slider,
  Space,
  Spin,
  Statistic,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  Timeline,
  TimePicker,
  Tooltip,
  Transfer,
  Tree,
  TreeSelect,
  Typography,
  Upload
} from "antd"

const arr = {
  Affix,
  Alert,
  Anchor,
  AutoComplete,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Carousel,
  Cascader,
  Checkbox,
  Col,
  Collapse,
  ConfigProvider,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Form,
  Grid,
  Image,
  Input,
  InputNumber,
  Layout,
  List,
  Mentions,
  Menu,
  Modal,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  Rate,
  Result,
  Row,
  Select,
  Skeleton,
  Slider,
  Space,
  Spin,
  Statistic,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Timeline,
  Tooltip,
  Transfer,
  Tree,
  TreeSelect,
  Typography,
  Upload,
  message,
  notification
  // ImgPond
}

const Component = ({ is, children, ...restProps }) => {
  let NodeTag = null

  if (is && is.indexOf(".") !== -1) {
    const tags = is.split(".")
    NodeTag = arr[tags[0]][tags[1]]
  } else {
    NodeTag = arr[is]
    if (!NodeTag) {
      console.error("is 组件类型未设定，请检查！") // 不中断程序
    }
  }

  if (!NodeTag) return false

  return <NodeTag {...restProps}>{children}</NodeTag>
}

export default Component
