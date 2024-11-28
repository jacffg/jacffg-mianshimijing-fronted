"use server";
import Title from "antd/es/typography/Title";
import { Divider, Flex, message } from "antd";
import Link from "next/link";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import QuestionBankList from "@/components/QuestionBankList";
import QuestionList from "@/components/QuestionList";
import "./index.css";
import { VALUE } from "@typescript-eslint/scope-manager/dist/lib/base-config";
import VIPTag from "@/components/VIPTag";
import Test from "../components/questionSearchForm";
import QuestionTablePlus from "@/components/QuestionTablePlus";

/**
 * 主页
 * @constructor
 */
export default async function HomePage() {
  let questionBankList = [];
  let questionList = [];
  try {
    const res = await listQuestionBankVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionBankList = res.data.records ?? [];
  } catch (e) {
    message.error("获取题库列表失败，" + e.message);
  }

  try {
    const res = await listQuestionVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionList = res.data.records ?? [];
  } catch (e) {
    message.error("获取题目列表失败，" + e.message);
  }

  return (
    <div id="homePage" className="max-width-content">
        <Flex align="center" style={{ gap: "1120px" }}>
            {/* 使用 gap 设置子元素间距 */}
            <Title level={3} style={{ margin: 0 }}>最新题库</Title>
            <Link href={"/banks"} style={{ margin: 0 }}>查看更多</Link>
        </Flex>
        <div style={{marginBottom:10} }/>

      <QuestionBankList questionBankList={questionBankList} />
      <Divider />
      <Flex justify="space-between" align="center">
        <Title level={3}>面试题目</Title>
      </Flex>
      <QuestionList questionList={questionList} />
    </div>
  );
}
