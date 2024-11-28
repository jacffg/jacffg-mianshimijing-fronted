"use client";
import CreateModal from "./components/CreateModal";
import UpdateModal from "./components/UpdateModal";
import {
  deleteQuestionUsingPost,
  listQuestionByPageUsingPost,
} from "@/api/questionController";
import { AntDesignOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, message, Modal, Space, Typography } from "antd";
import React, { useRef, useState } from "react";
import TagList from "@/components/TagList";
import MdEditor from "@/components/MdEditor";
import UpdateBankModal from "@/app/admin/question/components/UpdateBankModal";
import "./index.css";
import VIPTag from "@/components/VIPTag";
import {listQuestionBankVoByPageUsingPost} from "@/api/questionBankController";

/**
 * 题目管理页面
 *
 * @constructor
 */
const QuestionAdminPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  // 是否显示更新所属题库窗口
  const [updateBankModalVisible, setUpdateBankModalVisible] =
    useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前题目点击的数据
  const [currentRow, setCurrentRow] = useState<API.Question>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.Question) => {
    if (!row) return true;
    // 显示确认对话框
    Modal.confirm({
      title: "确认删除",
      content: "确定要删除该用户吗？",
      onOk: async () => {
        try {
          await deleteQuestionUsingPost({
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
  const columns: ProColumns<API.Question>[] = [
    {
      title: "id",
      dataIndex: "id",
      valueType: "text",
      hideInForm: true,
    },
    {
      title: "所属题库",
      dataIndex: "questionBankId",
      valueType: "select", // 设置为下拉框
      hideInTable: false, // 显示在表格中
      hideInSearch: false, // 显示在搜索中
      fieldProps: {
        placeholder: "请选择题库",
        showSearch: true, // 支持搜索
        filterOption: (input, option) => {
          if (!option?.label) return false;
          return option.label.toLowerCase().includes(input.toLowerCase());
        },
        onChange: (value, option) => {
          console.log("当前选中题库:", option); // 可选：调试用
        },
      },
      request: async () => {
        try {
          // 调用后端接口获取题库列表
          const res = await listQuestionBankVoByPageUsingPost({
            pageSize: 100, // 控制数据量，根据需求调整
          });
          if (res.code !== 0) {
            message.error("获取题库列表失败");
            return [];
          }

          const result = res.data?.records || [];

          // 将返回的数据格式化为下拉框选项
          return result.map((item: { id: number; title: string }) => ({
            label: item.title,
            value: item.id,
          }));
        } catch (error) {
          message.error("请求题库列表时出错");
          return [];
        }
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
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
      title: "答案",
      dataIndex: "answer",
      valueType: "text",
      hideInSearch: true,
      width: 640,
      renderFormItem: (item, { fieldProps }, form) => {
        // 编写要渲染的表单项
        // value 和 onchange 会通过 form 自动注入
        return <MdEditor {...fieldProps} />;
      },
    },
    {
      title: "标签",
      dataIndex: "tags",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      request: async () => {
        // 假设从后端获取所有可用标签
        const tags = [
          { label: "JavaScript", value: "JavaScript" },
          { label: "布局", value: "布局" },
          { label: "CSS", value: "CSS" },
        ];
        return tags;
      },
      render: (_, record) => {
        const tagList = JSON.parse(record.tags || "[]");
        return <div>
          <Space>
            <>
              {record?.isVip == 0 && <VIPTag />}
              <TagList tagList={tagList} />
            </>
          </Space>
        </div>
      },
    },
    {
      title: "难度",
      dataIndex: "diffity",
      valueEnum: {
        easy: {
          text: "简单",
        },
        middle: {
          text: "中等",
        },
        hard: {
          text: "困难",
        },
      },
      render: (text, record) => (
          <span
              style={{
                color:
                    record.diffity === "easy"
                        ? "green"
                        : record.diffity === "middle"
                            ? "#ee9e0b"
                            : "red",
                fontSize: '16px',
                fontWeight: 'bold'  // 添加这行使文本加粗
              }}
          >
          {record.diffity === "easy"
              ? "简单"
              : record.diffity === "middle"
                  ? "中等"
                  : "困难"}
        </span>
      ),
    },
    {
      title: "是否为会员专属",
      dataIndex: "isVip",
      valueEnum: {
        0: {
          text: "是",
        },
        1: {
          text: "否",
        },
      },
      hideInTable: true,
    },
    {
      title: "创建用户",
      dataIndex: "userId",
      valueType: "text",
      hideInForm: true,
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
      title: "编辑时间",
      sorter: true,
      dataIndex: "editTime",
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
          <Button
            style={{ color: "rgba(86,164,166,0.94)" }}
            onClick={() => {
              setCurrentRow(record);
              setUpdateBankModalVisible(true);
            }}
          >
            修改所属题库
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
      <ProTable<API.Question>
        headerTitle={"题目管理表格"}
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

          const { data, code } = await listQuestionByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);

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
      <UpdateBankModal
        visible={updateBankModalVisible}
        questionId={currentRow?.id}
        onCancel={() => {
          setUpdateBankModalVisible(false);
        }}
      />
    </PageContainer>
  );
};
export default QuestionAdminPage;
