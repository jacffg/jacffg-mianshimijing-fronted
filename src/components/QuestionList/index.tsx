"use client";
import {Card} from "antd";
import "./index.css";
import QuestionRequestForm from "../questionSearchForm";
import {useState} from "react";
import QuestionTablePlus from "@/components/QuestionTablePlus";

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
  const { cardTitle, questionBankId,questionList: initialQuestionList,searchTitle,tag} = props;
  // 如果 props.questionList 有值，则使用它作为初始状态，否则使用空数组
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(initialQuestionList || []);


    const handleSearchResult = (newQuestionList: API.QuestionVO[]) => {
      setQuestionList(newQuestionList);
    }

    return (
        <Card className="question-list" title={cardTitle} style={{width: 900}}>
          <QuestionRequestForm onSearch={handleSearchResult} title={searchTitle} tag={tag}/>
            <QuestionTablePlus defaultQuestionList={questionList} defaultTotal={questionList.length}  />
        </Card>
    );
  };
export default QuestionList;
