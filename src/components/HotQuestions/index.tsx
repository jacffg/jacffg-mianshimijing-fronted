"use client";
import { Flex, List, message, Space } from "antd";
import "./index.css";
import React, { useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import {getHotQuestionsUsingGet, listQuestionVoByPageUsingPost} from "@/api/questionController";
import { FireOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface Props {}

/**
 * 热门题目组件
 * @param props
 * @constructor
 */
const HotQuestions = (props: Props) => {
  const [questions, setQuestions] = useState<API.QuestionVO[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const router = useRouter();
  // 获取热门题目列表
  const getHotQuestions = async () => {
    try {
      const res = await getHotQuestionsUsingGet({
        pageSize: 10,
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
          background: "linear-gradient(to bottom, #ffe886, white)",
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
        <Flex justify="space-between" align="center">
          <Title level={4}>热门题目榜</Title>
          <Link href="/">更多</Link>
        </Flex>
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
              <div>
                <Flex
                  style={{ justifyContent: "space-between", width: "100%" }}
                >
                  <div
                    style={{
                      marginLeft: 12,
                      fontSize: "16px",
                      whiteSpace: "nowrap", // 防止文本换行
                      overflow: "hidden", // 超出部分隐藏
                      textOverflow: "ellipsis", // 显示省略号
                      maxWidth: "200px", // 设置最大宽度
                      minWidth: "200px", // 设置最大宽度
                    }}
                  >
                    {item.title}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "25px", // 这里添加了自动左侧边距以实现右对齐
                    }}
                  >
                    <Space size={5}>
                      <div>
                        <FireOutlined />
                      </div>
                      <span>{item.viewNum}</span>
                    </Space>
                  </div>
                </Flex>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
export default HotQuestions;
