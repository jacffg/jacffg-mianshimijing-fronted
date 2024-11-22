"use client";
import { Card, Space, Button } from "antd";
import Title from "antd/es/typography/Title";
import TagList from "@/components/TagList";
import MdViewer from "@/components/MdViewer";
import "./index.css";
import VIPTag from "@/components/VIPTag";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import ACCESS_ENUM from "@/access/accessEnum";
import Forbidden from "@/app/forbidden";
import VIPForbidden from "@/app/VIPforbidden";
import DifficultTag from "@/components/DifficultTag";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"; // 引入眼睛图标

interface Props {
  question: API.QuestionVO;
}

/**
 * 题目卡片
 * @param props
 * @constructor
 */
const QuestionCard = (props: Props) => {
  const { question } = props;
  const [isAnswerVisible, setIsAnswerVisible] = useState(false); // 控制答案是否显示
  const loginUser = useSelector((state: RootState) => state.loginUser);

  if (
    question.isVip == 0 &&
    (loginUser.userRole == ACCESS_ENUM.USER ||
      loginUser.userRole == ACCESS_ENUM.NOT_LOGIN)
  ) {
    return (
      <div>
        <VIPForbidden />
      </div>
    );
  }

  // 切换答案显示状态
  const toggleAnswerVisibility = () => {
    setIsAnswerVisible(!isAnswerVisible);
  };

  return (
    <div className="question-card">
      <Card>
        <Title level={1} style={{ fontSize: 24 }}>
          {question.title}
        </Title>
        <div style={{ marginTop: "-10px" }}>
          <Space>
            <DifficultTag difficult={question.diffity} />
            {question?.isVip == 0 && <VIPTag />}
            <TagList tagList={question.tagList} />
          </Space>
        </div>

        <div style={{ marginBottom: 16 }} />
        <Title level={5} style={{ fontSize: 18 }}>
          描述：
        </Title>
        <MdViewer value={question.content} />
      </Card>
      <div style={{ marginBottom: 16 }} />
      <Card
        title="推荐答案"
        extra={
          <Button
            icon={isAnswerVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            onClick={toggleAnswerVisibility}
            style={{ border: "none" }}
          >
            {isAnswerVisible ? "隐藏答案" : "查看答案"}
          </Button>
        }
      >
        {isAnswerVisible && <MdViewer value={question.answer} />}
        {!isAnswerVisible && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            <EyeInvisibleOutlined
              style={{ fontSize: "60px", marginBottom: "8px" }}
            />
            <Title style={{marginTop:"20px",marginBottom:"25px"}}>答案已隐藏</Title>
            <Button type="primary" onClick={toggleAnswerVisibility}>
              显示答案
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default QuestionCard;
