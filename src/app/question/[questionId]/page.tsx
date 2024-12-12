// pages/question/[questionId]/page.jsx
"use client";
import { Card, Col, Flex, message, Spin } from "antd"; // 导入 Spin 组件用于加载指示器
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import QuestionCard from "@/components/QuestionCard";
import "./index.css";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import HotQuestions from "@/components/HotQuestions";
import RelatedQuestions from "@/components/RelatedQuestions";
import {useEffect, useState} from "react";

/**
 * 题目详情页
 * @constructor
 */
export default function QuestionPage({ params }) {
  const { questionId } = params;
  const [question, setQuestion] = useState<API.QuestionVO | null>(null);
  const [loading, setLoading] = useState(true);

  const getQuestion = async () => {
    if (!questionId) {
      setLoading(false);
      return;
    }
    try {
      const res = await getQuestionVoByIdUsingGet({
        id: questionId,
      });
      if (res.code === 0) {
        setQuestion(res.data);
      } else {
        message.error("获取题目错误: " + res.message);
      }
    } catch (e) {
      message.error("获取题目错误: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuestion();
  }, [questionId]); // 确保在 questionId 改变时重新请求数据

  if (loading) {
    return (
        <div className="loader" style={{ textAlign: "center", marginTop: "50px" }}>
          {/*<Spin size="large" />*/}
          {/*<p>加载中...</p>*/}
        </div>
    );
  }

  if (!question) {
    return <div>题目未找到</div>;
  }

  return (
      <div id="questionPage">
        <Flex gap={23}>
          <Content>
            <QuestionCard defaultQuestion={question} />
          </Content>
          <Col>
            <Sider
                className="sider"
                width={320}
                theme="light"
                style={{
                  padding: "0",
                  borderRadius: "12px", // 添加圆角
                  overflow: "hidden", // 防止内容溢出影响圆角效果
                }}
            >
              <RelatedQuestions questionId={questionId} />
            </Sider>
            <div style={{ marginBottom: 24 }} />
            <Sider
                className="sider"
                width={320}
                theme="light"
                style={{
                  padding: "0",
                  borderRadius: "12px", // 添加圆角
                  overflow: "hidden", // 防止内容溢出影响圆角效果
                }}
            >
              <HotQuestions />
            </Sider>
          </Col>
        </Flex>
      </div>
  );
}