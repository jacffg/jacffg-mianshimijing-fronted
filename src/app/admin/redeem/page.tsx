"use client";
import CreateModal from "./components/CreateModal";
import UpdateModal from "./components/UpdateModal";
import {
  deleteUserUsingPost,
  listUserByPageUsingPost,
} from "@/api/userController";
import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, message, Modal, Space, Typography } from "antd";
import React, { useRef, useState } from "react";
import {
  deleteRedeemUsingPost,
  listRedeemVoByPageUsingPost,
} from "@/api/redeemController";

/**
 * 用户管理页面
 *
 * @constructor
 */
const RedeemAdminPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.User>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.User) => {
    if (!row) return true;

    // 显示确认对话框
    Modal.confirm({
      title: "确认删除",
      content: "确定要删除该用户吗？",
      onOk: async () => {
        try {
          await deleteRedeemUsingPost({
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
  const columns: ProColumns<API.User>[] = [
    {
      title: "id",
      dataIndex: "id",
      valueType: "text",
      hideInForm: true,
    },
    {
      title: "兑换码",
      dataIndex: "code",
      valueType: "text",
    },
    {
      title: "是否被使用",
      dataIndex: "isUsed",
      valueEnum: {
        0: {
          text: "否",
        },
        1: {
          text: "是",
        },
      },
    },
    {
      title: "使用用户",
      dataIndex: "userId",
      valueType: "text",
    },
    {
      title: "使用时间",
      sorter: true,
      dataIndex: "useTime",
      valueType: "dateTime",
    },
    {
      title: "过期时间",
      sorter: true,
      dataIndex: "expirationTime",
      valueType: "dateTime",
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
        <Space size="middle">
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
      <ProTable<API.User>
        headerTitle={"用户管理表格"}
        actionRef={actionRef}
        rowKey="key"
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


          const { data, code } = await listRedeemVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.UserQueryRequest);

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
export default RedeemAdminPage;
