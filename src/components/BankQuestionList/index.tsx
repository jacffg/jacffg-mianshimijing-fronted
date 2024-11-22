"use client";
import { Card } from "antd";
import "./index.css";
import QuestionRequestForm from "../questionSearchForm";
import { useState } from "react";
import QuestionTablePlus from "@/components/QuestionTablePlus";
import BankQuestionTable from "@/components/BankQuestionTable";
import BankQuestionRequestForm from "@/components/BankQuestionSearchForm";

interface Props {
  questionBankId?: number;
  questionList?: API.QuestionVO[];
  cardTitle?: string;
}

/**
 * 题库题目列表组件
 * @param props
 * @constructor
 */
const BankQuestionList = (props: Props) => {
  const {
    cardTitle,
    questionBankId,
    questionList: initialBankQuestionList,
  } = props;

  // 如果 props.questionList 有值，则使用它作为初始状态，否则使用空数组
  const [questionList, setBankQuestionList] = useState<API.QuestionVO[]>(
    initialBankQuestionList || [],
  );

  const handleSearchResult = (newBankQuestionList: API.QuestionVO[]) => {
    setBankQuestionList(newBankQuestionList);
  };

  return (
    <Card
      className="question-list"
      title={
        <span style={{ fontSize: "20px", fontWeight: "bold", color: "#6c6c6c" }}>
          题目列表
        </span>
      }
      style={{ width: 1200 }}
    >
      <BankQuestionRequestForm
        questionBankId={questionBankId}
        onSearch={handleSearchResult}
      />
      <BankQuestionTable
        defaultQuestionList={questionList}
        defaultTotal={questionList.length}
      />
    </Card>
  );
};
export default BankQuestionList;
