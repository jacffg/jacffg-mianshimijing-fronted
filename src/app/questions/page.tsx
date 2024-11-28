"use client";
import Title from "antd/es/typography/Title";
import {useState} from "react";
import "./index.css";
import QuestionList from "@/components/QuestionList";

/**
 * 题目列表页面
 * @constructor
 */
export default function QuestionsPage({ searchParams }) {
  const { searchTitle: searchTitle, tag: tag } = searchParams;

  // 定义状态存储题目列表和总数
  const [questionList, setQuestionList] = useState([]);
  const [total, setTotal] = useState(0);

  // 使用 useEffect 钩子进行异步请求
  // useEffect(() => {
  //   alert("fklsd")
  //   const fetchData = async () => {
  //     try {
  //       const res = await listQuestionVoByPageUsingPost({
  //         title: searchTitle,
  //         pageSize: 150,
  //         sortField: "createTime",
  //         sortOrder: "descend",
  //       });
  //       setQuestionList(res.data.records ?? []);
  //       setTotal(res.data.total ?? 0);
  //     } catch (e) {
  //       message.error("获取题目列表失败，" + e.message);
  //     }
  //   };
  //
  //   fetchData();
  // }, [searchTitle]); // 当 searchText 变化时重新请求数据

  return (
    <div id="questionsPage" className="max-width-content">
      <Title level={3}>题目列表</Title>
      <QuestionList questionList={questionList} searchTitle={searchTitle} tag={tag}/>
    </div>
  );
}
