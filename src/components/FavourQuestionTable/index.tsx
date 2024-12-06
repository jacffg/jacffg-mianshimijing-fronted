"use client";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import React, { useRef, useState } from "react";
import TagList from "@/components/TagList";
import { Space, TablePaginationConfig } from "antd";
import Link from "next/link";
import "./index.css";
import VIPTag from "@/components/VIPTag";
import { listMyFavourQuestionByPageUsingPost } from "@/api/questionFavourController";

interface Props {
  // 默认值（用于展示服务端渲染的数据）
  // userid: number
}

/**
 * 收藏题目表格组件
 *
 * @constructor
 */
const FavourQuestionTable: React.FC = (props: Props) => {
  // const { userid } = props;
  const actionRef = useRef<ActionType>();
  // 题目列表
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>([]);
  // 题目总数
  const [total, setTotal] = useState<number>();

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
      render: (_, record) => {
        return <Link href={`/question/${record.id}`}>{record.title}</Link>;
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
            fontSize: "16px",
            fontWeight: "bold", // 添加这行使文本加粗
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
      title: "标签",
      dataIndex: "tags",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => (
        <Space>
          <>
            {record.isVip == 0 && <VIPTag />}
            <TagList tagList={record.tagList} />
          </>
        </Space>
      ),
    },
  ];

  return (
    <div className="FavourQuestion-table">
      <ProTable<API.QuestionVO>
        actionRef={actionRef}
        size="small"
        search={{
          labelWidth: "auto",
          style: {
            height: "50px", // 调整搜索框的高度
            marginTop: -30,
            marginBottom:80,
          },

          collapsed: false, // 设置搜索框默认不折叠
          layout: "inline", // 设置为inline布局，将所有搜索框放在一列
        }}
        form={
          {
            // initialValues: defaultSearchParams,
          }
        }
        dataSource={questionList}
        pagination={
          {
            pageSize: 12,
            showTotal: (total) => `总共 ${total} 条`,
            showSizeChanger: false,
            total,
          } as TablePaginationConfig
        }
        request={async (params, filter) => {
          const { data, code } = await listMyFavourQuestionByPageUsingPost({
            ...params,
            ...filter,
          } as API.QuestionQueryRequest);

          // 更新结果
          const newData = data?.records || [];
          const newTotal = data?.total || 0;
          // 更新状态
          setQuestionList(newData);
          setTotal(newTotal);

          return {
            success: code === 0,
            data: newData,
            total: newTotal,
          };
        }}
        options={{
          // 禁用刷新、密度、设置等操作按钮
          density: false,
          reload: false,
          setting: false,
        }}
        columns={columns}
      />
    </div>
  );
};
export default FavourQuestionTable;
