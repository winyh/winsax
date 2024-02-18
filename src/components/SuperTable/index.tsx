import SuperForm from '@/components/SuperForm';
import { DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Popconfirm, Space, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { addSuper, querySuper, removeSomeSuper, removeSuper, updateSuper } from './service';
import styles from './style.less';

const { confirm } = Modal;

/*
 * @desc 超级表格
 * @params { columns } array 表头设置
 * @params { rowKey } object 表格唯一键， 默认id
 * @params { title } string 表格标题
 * @params { url } string 基础url
 * @params { queryUrl } string 查询url
 * @params { delSomeUrl } string 删除多条url
 * @params { rowSelection } object | string 多选配置 
 * @params { layout } string 顶部查询表单项单项布局
 * @params { span } string 顶部查询表单栅格
 * @params { data } array 表单数据项
 * @params { limit } number 表单数据项限制条数，超出收起折叠
 * @params { customTool } array 更多的顶部工具操作
 * @params { actionMore } array 更多的表格操作
 * @params { isAction } boolean 是否隐藏表格末尾的操作项
 * @params { isTool } boolean 是否展示表格右上角操作区
 * @params { width } string  默认值 50% 
 * @params { isPage } boolean  默认值 true 是否开启分页。 false 时， url 对应接口需要满足增删改查均不分页
 * @params { ref } ref 节点
 /*
 * @desc actionMore 结构
  export interface actionMoreType {
    text: string;
    type: string;
    callFn?: function;
  }
 */

const SuperTable = (
  {
    columns = [],
    rowKey = 'id',
    title,
    scroll,
    url = '',
    queryUrl = '',
    delSomeUrl,
    rowSelection = '',
    rowSelectionBk,
    layout,
    span = 12,
    data = [],
    limit,
    customTool = [],
    actionMore = [],
    isAction = true,
    isTool = true,
    width = '50%',
    isPage = true,
    selectionType = 'radio',
    ...restProps
  },
  ref,
) => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [type, setType] = useState<boolean>(true);
  const [record, setRecord] = useState<object>({});
  const [selectedRows, setSelectedRows] = useState<array>([]);
  const [dataSource, setDataSource] = useState<array>([]);
  const [pagination, setPagination] = useState<object>({
    showQuickJumper: true,
    current: 1,
    pageSize: 10,
    total: 10,
    onChange: (current, pageSize) => paginationHandle(current, pageSize),
    onShowSizeChange: (current, pageSize) => paginationHandle(current, pageSize),
  });

  useImperativeHandle(ref, () => ({
    reload,
  }));

  /*
   * @desc 数据初始化
   * @params { params } object 查询参数
   */
  const getData = async (params = {}, callback) => {
    setLoading(true);
    callback ? callback(true) : null;
    const { status, data, message } = await querySuper(queryUrl, params);

    if (status) {
      if (isPage) {
        const { current, pageSize, total, list } = data;
        const newPagination = {
          ...pagination,
          current,
          pageSize,
          total,
        };
        setPagination(newPagination);
        setDataSource(list);
      } else {
        setDataSource(data);
      }
    }
    setLoading(false);
    callback ? callback(false) : null;
  };

  useEffect(() => {
    getData();
  }, []);

  /*
   * @desc 分页处理
   * @params { current } number 当前页数
   * @params { pageSize } number 每页条数
   */
  const paginationHandle = (current, pageSize) => {
    setSelectedRows([]);
    getData({
      current,
      pageSize,
    });
  };

  /*
   * @desc 单条删除
   * @params { current } number 当前页数
   * @params { pageSize } number 每页条数
   */
  const delSingle = async (record) => {
    const hide = message.loading('正在删除');
    const res = await removeSuper(`${url}/` + record[rowKey]);
    if (res.status) {
      hide();
      message.success('删除成功，即将刷新');
      getData();
    }
  };

  const reload = () => {
    getData();
  };

  /*
   * @desc model 弹出
   */
  const showModal = () => {
    setVisible(true);
  };

  /*
   * @desc model确认
   */
  const handleOk = () => {
    setConfirmLoading(true);
    formRef.current.form
      .validateFields()
      .then(async (values) => {
        /* 后面加的转换运算 */
        // formData.map((item) => {
        //   if (item.trans && item.trans.includes('*')) {
        //     values = {
        //       ...values,
        //       [item.name]: values[item.name] * item.trans.split('*')[1],
        //     };
        //   }
        //   if (item.trans && item.trans.includes('/')) {
        //     values = {
        //       ...values,
        //       [item.name]: values[item.name] / item.trans.split('/')[1],
        //     };
        //   }
        // });
        /* 后面加的转换运算 */

        var res = {};
        if (type) {
          res = await addSuper(url, values);
        } else {
          res = await updateSuper(`${url}/` + record[rowKey], values);
        }

        if (res.status) {
          message.success(res.message);
        } else {
          message.error(res.message);
        }

        setConfirmLoading(false);
        setVisible(false);
        getData();
      })
      .catch((errorInfo) => {
        setConfirmLoading(false);
      });
  };

  /*
   * @desc model取消
   */
  const handleCancel = (e) => {
    setVisible(false);
  };

  /*
   * @desc 批量删除
   */
  const delSome = () => {
    confirm({
      title: `您想删除当前选中的 ${selectedRows.length} 项吗?`,
      icon: <ExclamationCircleOutlined />,
      content: '删除后不可恢复！',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在批量删除');
        const res = await removeSomeSuper(delSomeUrl, {
          key: selectedRows.map((item) => item.id),
        });
        if (res.status) {
          hide();
          message.success('批量删除成功，即将刷新');
          getData();
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const rowSelectionConfig = !rowSelection
    ? ''
    : {
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectedRows(selectedRows);
          if (rowSelectionBk) {
            rowSelectionBk(selectedRows);
          }
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          name: record.name,
        }),
        type: selectionType,
      };

  const TableTitle = () => (
    <div className={styles.toolwin}>
      <div className={styles.toolwinLeft}>{title}</div>
      <div className={styles.toolwinRight}>
        {customTool.length > 0 ? (
          <Space>
            {customTool.map((item, index) => {
              return (
                <Button
                  key={index}
                  type={item.type || 'default'}
                  onClick={() => {
                    item.callFn(item.action);
                  }}
                >
                  {item.text}
                </Button>
              );
            })}
          </Space>
        ) : null}

        {isTool ? (
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setType(true);
                setRecord({});
                showModal();
              }}
            >
              新增
            </Button>

            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={delSome}
              disabled={selectedRows.length === 0}
            >
              删除
            </Button>
          </Space>
        ) : (
          ''
        )}
      </div>
    </div>
  );

  const action = {
    title: '操作',
    key: 'action',
    fixed: 'right',
    render: (text, record) => (
      <Space size="middle">
        {actionMore.length > 0
          ? actionMore.map((item, index) => {
              return (
                <a
                  key={index}
                  onClick={() => {
                    item.callFn(item.type, record);
                  }}
                >
                  {item.text}
                </a>
              );
            })
          : null}
        <a
          onClick={() => {
            setType(false);
            setRecord(record);
            showModal();
          }}
        >
          修改
        </a>
        <Popconfirm
          title="您确定要删除吗?"
          onConfirm={() => delSingle(record)}
          okText="确定"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>
      </Space>
    ),
  };

  const newColumns = isAction ? columns.concat([action]) : columns;

  const searchData = data.filter((item) => !item.hideInSearch);

  const formData = data.filter((item) => (type ? !item.hideInForm : !item.hideInUpdate));

  /*
   * @desc 查询表单成功函数
   */
  const onFinish = (values, callback) => {
    // 时间格式处理
    Object.keys(values).map((item) => {
      if (Array.isArray(values[item])) {
        if (values[item][0]._isAMomentObject && values[item][1]._isAMomentObject) {
          values.start_at = moment(values[item][0]).format('YYYY-MM-DD HH:mm:ss');
          values.end_at = moment(values[item][1]).format('YYYY-MM-DD HH:mm:ss');
          delete values[item];
        }
      } else {
        if (values[item] && values[item]._isAMomentObject) {
          values[item] = moment(values[item]).format('YYYY-MM-DD HH:mm:ss');
        }
      }
    });

    getData(values, callback);
  };

  /*
   * @desc 查询表单重置函数
   */
  const onReset = () => {
    getData();
  };

  return (
    <div className={styles.superTable} ref={ref}>
      <div className={styles.searchWinForm}>
        <SuperForm
          ref={formRef}
          data={searchData}
          limit={limit}
          span={span}
          layout={layout}
          onFinish={onFinish}
          onReset={onReset}
        ></SuperForm>
      </div>
      <div className={styles.showWinTable}>
        <TableTitle />
        <Table
          columns={newColumns}
          dataSource={dataSource}
          rowKey={rowKey}
          rowSelection={rowSelectionConfig}
          loading={loading}
          scroll={scroll}
          pagination={isPage ? pagination : null}
          {...restProps}
        />
      </div>

      <Modal
        title={type ? '新增' : '修改'}
        open={visible}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
        confirmLoading={confirmLoading}
        bodyStyle={{ paddingBottom: '0' }}
        destroyOnClose
        width="50%"
      >
        <SuperForm
          ref={formRef}
          data={formData}
          span={12}
          layout={layout}
          initialValues={record}
          rulesValid={true}
          btnAction={false}
        ></SuperForm>
      </Modal>
    </div>
  );
};

export default React.forwardRef(SuperTable);
