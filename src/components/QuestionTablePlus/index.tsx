"use client";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import React, { useEffect, useRef, useState } from "react";
import TagList from "@/components/TagList";
import { Space, TablePaginationConfig } from "antd";
import Link from "next/link";
import "./index.css";
import VIPTag from "@/components/VIPTag";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";

interface Props {
  // 默认值（用于展示服务端渲染的数据）
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?: number;
}

/**
 * 题目表格组件
 *
 * @constructor
 */
const QuestionTablePlus: React.FC<Props> = (props: Props) => {
  const { defaultQuestionList = [], defaultTotal = 0 } = props;
  const actionRef = useRef<ActionType>();
  // 题目列表
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
    defaultQuestionList || [],
  );
  // 题目总数
  const [total, setTotal] = useState<number>(defaultTotal || 0);
  // 用于判断是否首次加载
  const [init, setInit] = useState<boolean>(true);

  useEffect(() => {
    // 当 defaultQuestionList 发生变化时，更新 questionList
    setQuestionList(defaultQuestionList);
    setTotal(defaultTotal);
  }, [defaultQuestionList, defaultTotal]);
  /**
   * 表格列配置
   */
  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: "题目",
      dataIndex: "title",
      valueType: "text",
      render: (_, record) => {
        return (
          <Link
            href={`/question/${record.id}`}
            style={{ fontSize: "16px", fontWeight: "bold" }}
          >
            {record.title}
          </Link>
        );
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
      title: "标签",
      dataIndex: "tagList",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => (
        <Space>
          <>
            {record?.isVip == 0 && <VIPTag />}
            <TagList tagList={record.tagList} />
          </>
        </Space>
      ),
    },
  ];

  return (
    <div id="question-table-plus">
      <ProTable<API.QuestionVO>
        actionRef={actionRef}
        size="middle"
        dataSource={questionList}
        pagination={
          {
            pageSize: 10,
            // showTotal: (total) => `总共 ${total} 条`,
            showSizeChanger: false,
            total,
          } as TablePaginationConfig
        }
        columns={columns}
        search={false} // 取消搜索行
        toolBarRender={false} // 取消操作区
      />
    </div>
  );
};

export default QuestionTablePlus;
