"use client";
import { List, message, Space } from "antd";
import "./index.css";
import React, { useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import {getHotQuestionsUsingGet, getRelatedQuestionsUsingPost} from "@/api/questionController";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  questionId?: number;
}

/**
 * 相关题目组件
 * @param props
 * @constructor
 */
const RelatedQuestions = (props: Props) => {
  const { questionId = 0 } = props;
  const [questions, setQuestions] = useState<API.QuestionVO[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const router = useRouter();
  // 获取热门题目列表
  const getHotQuestions = async () => {
    try {
      const res = await getRelatedQuestionsUsingPost({
          id: questionId,
          num:8,
      });
      // 获取题目列表
      const questionList = res.data ?? [];
      setQuestions(questionList);

      // 提取题目标题并放入 titles 数组
      const extractedTitles = questionList.map((item) => item.title);
      setTitles(extractedTitles);
    } catch (e) {
      message.error("获取题库列表失败，" + e.message);
    }
  };

  useEffect(() => {
    getHotQuestions();
  }, []);

  return (
    <div>
      <div
        style={{
          width: 320,
          height: 70,
          // border: "red",
          // borderStyle: "solid",
          marginTop: 0,
          background: "linear-gradient(to bottom, #a2cdff, white)",
        }}
      ></div>
      <div
        style={{
          width: 290,
          height: 50,
          marginLeft: 10,
          marginTop: -60, // 控制与上方 div 的距离
          // marginBottom: 10, // 控制与下方内容的距离
        }}
      >
        <Space size={12} style={{ marginLeft: 15 }}>
          <Image src="/assets/books.png" height={32} width={32} alt="图片" />
          <Title level={4}>相关题目</Title>
        </Space>
      </div>
      {/*热门题目榜*/}
      <div>
        <List
          dataSource={questions}
          renderItem={(item) => (
            <List.Item
              onClick={() => router.push(`/question/${item.id}`)}
              className="hoverable-item" // 添加自定义类
            >
              <div
                style={{
                  marginLeft: 25,
                  fontSize: "16px",
                  whiteSpace: "nowrap", // 防止文本换行
                  overflow: "hidden", // 超出部分隐藏
                  textOverflow: "ellipsis", // 显示省略号
                  maxWidth: "220px", // 设置最大宽度
                  minWidth: "220px", // 设置最大宽度
                }}
              >
                {item.title}
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
export default RelatedQuestions;