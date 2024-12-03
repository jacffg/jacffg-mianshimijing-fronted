"use client";
import CreateModal from "./components/CreateModal";
import UpdateModal from "./components/UpdateModal";
import {
  deleteCommentUsingPost,
  listCommentByPageUsingPost,
} from "@/api/commentController";
import { AntDesignOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, message, Modal, Space, Typography } from "antd";
import React, { useRef, useState } from "react";
import TagList from "@/components/TagList";
import MdEditor from "@/components/MdEditor";
import "./index.css";
import VIPTag from "@/components/VIPTag";

/**
 * 评论管理页面
 *
 * @constructor
 */
const CommentAdminPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  // 是否显示更新所属题库窗口
  const [updateBankModalVisible, setUpdateBankModalVisible] =
    useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前题目点击的数据
  const [currentRow, setCurrentRow] = useState<API.Comment>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.Comment) => {
    if (!row) return true;
    // 显示确认对话框
    Modal.confirm({
      title: "确认删除",
      content: "确定要删除该评论吗？",
      onOk: async () => {
        try {
          await deleteCommentUsingPost({
            id: row.id as any,
          });
          message.success("删除成功");
          actionRef?.current?.reload();
          return true;
        } catch (error: any) {
          message.error("删除失败，" + error.message);
          return false;
        }
      },
      onCancel() {
        message.info("已取消删除");
      },
    });
  };
  /**
   * 表格列配置
   */
  const columns: ProColumns<API.Comment>[] = [
    {
      title: "id",
      dataIndex: "id",
      valueType: "text",
      hideInForm: true,
    },
    {
      title: "题目id",
      dataIndex: "questionId",
      valueType: "text",
    },
    {
      title: "评论人Id",
      dataIndex: "userId",
      valueType: "text",
      hideInForm: true,
    },
    {
      title: "父Id",
      dataIndex: "parentId",
      valueType: "text",
    },
    {
      title: "顶级Id",
      dataIndex: "ancestorId",
      valueType: "text",
      hideInForm: true,
    },
    {
      title: "内容",
      dataIndex: "content",
      valueType: "text",
      hideInSearch: true,
      width: 240,
      renderFormItem: (item, { fieldProps }, form) => {
        // 编写要渲染的表单项
        // value 和 onchange 会通过 form 自动注入
        return <MdEditor {...fieldProps} />;
      },
    },
    {
      title: "创建时间",
      sorter: true,
      dataIndex: "createTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },

    {
      title: "更新时间",
      sorter: true,
      dataIndex: "updateTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => (
        <Space size="small" >
          <Button
            style={{ color: "rgba(26,78,171,0.94)" }}
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Button>
          <Button type="dashed" danger onClick={() => handleDelete(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Comment>
        headerTitle={"评论管理表格"}
        actionRef={actionRef}
        rowKey="key"
        scroll={{
          x: true,
        }}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const { data, code } = await listCommentByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.CommentQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
        pagination={{
          pageSize: 6, // 每页显示5条记录
        }}
      />
      <CreateModal
        visible={createModalVisible}
        columns={columns}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />
      <UpdateModal
        visible={updateModalVisible}
        columns={columns}
        oldData={currentRow}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
        }}
      />
    </PageContainer>
  );
};
export default CommentAdminPage;
