"use client";
import React, { useEffect, useState } from "react";
import {Card, Flex, Input, Menu, message, Space} from "antd";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import Title from "antd/es/typography/Title";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import QuestionCard from "@/components/QuestionCard";
import Link from "next/link";
import "./index.css";
import {CloseCircleOutlined, DoubleLeftOutlined, DoubleRightOutlined, SearchOutlined} from "@ant-design/icons";

export default function BankQuestionPage({ params }) {
  const { questionBankId, questionId } = params;
  const [searchText, setSearchText] = useState("");
  const [bank, setBank] = useState(null);
  const [question, setQuestion] = useState(null);
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [init, setInit] = useState<boolean>(true);



  const handleSearch = async () => {
    try {
      const res = await getQuestionBankVoByIdUsingGet({
        id: questionBankId,
        needQueryQuestionList: true,
        title: debouncedSearchText,
        pageSize: 200, // 可以自行扩展为分页实现
      });
      setBank(res.data);
    } catch (e) {
      message.error("获取题库列表失败，" + e.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
      setInit(false);
    }, 1000); // 延迟 1000 毫秒

    return () => clearTimeout(timer); // 清除上一次的定时器
  }, [searchText]);

  useEffect(() => {
    if (!init) {
      handleSearch();
    }
  }, [debouncedSearchText]);

  useEffect(() => {
    const fetchBankAndQuestion = async () => {
      try {
        const resBank = await getQuestionBankVoByIdUsingGet({
          id: questionBankId,
          needQueryQuestionList: true,
          pageSize: 200,
        });
        setBank(resBank.data);

        const resQuestion = await getQuestionVoByIdUsingGet({
          id: questionId,
        });
        setQuestion(resQuestion.data);
      } catch (e) {
        message.error("获取数据失败，" + e.message);
      }
    };

    fetchBankAndQuestion();
  }, [questionBankId, questionId]);

  if (!bank || !question) {
    return <div>加载中...</div>;
  }

  const questionMenuItemList = (bank?.questionPage?.records || [])
    .filter((q) => q.title.toLowerCase().includes(searchText.toLowerCase()))
    .map((q) => ({
      label: (
        <Link href={`/bank/${questionBankId}/question/${q.id}`}>{q.title}</Link>
      ),
      key: q.id,
    }));
  // 获取当前题目索引
  const currentQuestionIndex = (bank?.questionPage?.records || []).findIndex(
      (q) => q.id === questionId
  );

// 根据索引获取上一题和下一题的信息
  const prevQuestion =
      currentQuestionIndex > 0
          ? bank.questionPage.records[currentQuestionIndex - 1]
          : null;
  const nextQuestion =
      currentQuestionIndex < bank.questionPage.records.length - 1
          ? bank.questionPage.records[currentQuestionIndex + 1]
          : null;

  return (
    <div id="bankQuestionPage">
      <Flex gap={24}>
        <Sider width={240} theme="light" style={{ padding: "24px 0", maxHeight:100 }}>
          <Title level={4} style={{ padding: "0 20px" }}>
            {bank.title}
          </Title>
          <Input
            placeholder="搜索题目"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} // 只更新状态
            style={{
              margin: "3px 10px",
              marginBottom: "-6px",
              width: "220px",
              height: "50px",
            }}
            addonBefore={
              <SearchOutlined style={{ color: "rgba(0,0,0,0.45)" }} />
            }
            suffix={
              <CloseCircleOutlined
                style={{ color: "rgba(0,0,0,0.45)", cursor: "pointer" }}
                onClick={() => setSearchText("")} // 点击清空输入框内容
              />
            }
          />

          <Menu
            items={questionMenuItemList}
            selectedKeys={[question?.id]}
            style={{ maxHeight: "700px", overflowY: "auto" }}
          />
        </Sider>
        <Content>
          <QuestionCard question={question} questionBankId={questionBankId}/>
          <div  style={{width:"1100px"}}>
            <Card>
              <Space size={962}>
                <span>上一题</span>
                <span>下一题</span>
              </Space>
              <div style={{marginBottom:16}}/>

              <Flex justify="space-between" align="center">
                {prevQuestion ? (
                    <a href={`/bank/${questionBankId}/question/${prevQuestion.id}`}>
                      <DoubleLeftOutlined  disabled={false}/> {prevQuestion.title}
                    </a>
                ) : (
                    <a><DoubleLeftOutlined /></a>
                )}
                {nextQuestion ? (
                    <a href={`/bank/${questionBankId}/question/${nextQuestion.id}`}>
                      {nextQuestion.title}  <DoubleRightOutlined />
                    </a>
                ) : (
                    <a ><DoubleRightOutlined disabled={false} /></a>
                )}
              </Flex>

            </Card>
          </div>


        </Content>
      </Flex>
    </div>
  );
}