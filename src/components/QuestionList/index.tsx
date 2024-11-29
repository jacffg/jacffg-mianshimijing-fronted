"use client";
import { Card, Col, Divider, Flex, Space } from "antd";
import "./index.css";
import QuestionRequestForm from "../questionSearchForm";
import React, { useState } from "react";
import QuestionTablePlus from "@/components/QuestionTablePlus";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import HotQuestions from "@/components/HotQuestions";
import HotTags from "@/components/HotTags";

interface Props {
  questionBankId?: number;
  questionList?: API.QuestionVO[];
  cardTitle?: string;
  searchTitle?: string;
  tag?: string;
}

/**
 * 题目列表组件
 * @param props
 * @constructor
 */
const QuestionList = (props: Props) => {
  const {
    cardTitle,
    questionBankId,
    questionList: initialQuestionList,
    searchTitle,
    tag,
  } = props;
  // 如果 props.questionList 有值，则使用它作为初始状态，否则使用空数组
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
    initialQuestionList || [],
  );

  const handleSearchResult = (newQuestionList: API.QuestionVO[]) => {
    setQuestionList(newQuestionList);
  };

  return (
    <Flex gap={0}>
      <Content>
        <Card
          className="question-list"
          title={cardTitle}
          style={{ width: 950 }}
        >
          <QuestionRequestForm
            onSearch={handleSearchResult}
            title={searchTitle}
            tag={tag}
          />
          <QuestionTablePlus
            defaultQuestionList={questionList}
            defaultTotal={questionList.length}
          />
        </Card>
      </Content>
      <Col>
        <Sider
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
          <div style={{marginBottom:32}}/>
        <Sider
          width={320}
          theme="light"
          style={{
            padding: "0",
            borderRadius: "12px", // 添加圆角
            overflow: "hidden", // 防止内容溢出影响圆角效果
          }}
        >
          <HotTags />
        </Sider>
      </Col>
    </Flex>
  );
};
export default QuestionList;
