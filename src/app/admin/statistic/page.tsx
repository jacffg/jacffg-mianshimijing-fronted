"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import ReactECharts from "echarts-for-react";
import { Card, Divider, InputNumber, message } from "antd";
import {
  getQuestionFavourStatictUsingGet,
  getQuestionViewNumStatictUsingGet,
} from "@/api/statisticController";

const StatisticPage: React.FC = () => {
  const [questionViewCountList, setQuestionViewCountList] = useState<API.QuestionViewCountDTO[]>([]);
  const [questionFavourCountList, setQuestionFavourCountList] = useState<API.QuestionFavourCountDTO[]>([]);
  const [viewNumCount, setViewNumCount] = useState<number>(10); // 控制浏览量显示数量
  const [favourNumCount, setFavourNumCount] = useState<number>(10); // 控制收藏量显示数量

  const getQuestionViewCountList = async (num: number) => {
    try {
      const res = await getQuestionViewNumStatictUsingGet({ num });
      if (res.code === 0) {
        setQuestionViewCountList(res.data);
      }
    } catch (e: any) {
      message.error("获取浏览量前十的题目失败，" + e.message);
    }
  };

  const getQuestionFavourCountList = async (num: number) => {
    try {
      const res = await getQuestionFavourStatictUsingGet({ num });
      if (res.code === 0) {
        setQuestionFavourCountList(res.data);
      }
    } catch (e: any) {
      message.error("获取收藏数前十的题目失败，" + e.message);
    }
  };

  useEffect(() => {
    getQuestionViewCountList(viewNumCount);
    getQuestionFavourCountList(favourNumCount);
  }, [viewNumCount, favourNumCount]);

  const questionViewCount = () => ({
    title: { text: "题目浏览量统计", left: "center" },
    tooltip: { trigger: "item" },
    legend: { orient: "vertical", left: "left" },
    series: [
      {
        name: "浏览量",
        type: "pie",
        radius: "50%",
        data: questionViewCountList.map((item) => ({
          value: item.viewNum,
          name: item.question,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  });

  const questionFavourCount = () => ({
    title: { text: "题目收藏数统计", left: "center" },
    tooltip: { trigger: "item" },
    legend: { orient: "vertical", left: "left" },
    series: [
      {
        name: "收藏量",
        type: "pie",
        radius: "50%",
        data: questionFavourCountList.map((item) => ({
          value: item.favourNum,
          name: item.question,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  });

  return (
      <div id="statisticPage">
        <Card>
          <div style={{ marginBottom:32, marginTop:10,textAlign: "center", fontWeight: "bold", color: "#e71d1d" ,fontSize:16}}>
            <span>浏览量前</span>
            <InputNumber
                min={0}
                value={viewNumCount}
                onChange={(value) => setViewNumCount(value || null)}
                style={{ width: 100, marginLeft: 8 }}
            /><span style={{marginLeft:10}}>N 个</span>
          </div>
          <ReactECharts option={questionViewCount()} style={{ height: "400px", width: "100%" }} />

          <Divider style={{ borderWidth: "1px", borderColor: "#000" }} />

          <div style={{ marginBottom:32, marginTop:20,textAlign: "center", fontWeight: "bold", color: "#e71d1d" ,fontSize:16}}>
            <span>收藏数前</span>
            <InputNumber
                min={1}
                value={favourNumCount}
                onChange={(value) => setFavourNumCount(value || null)}
                style={{ width: 100, marginLeft: 8 }}
            /><span style={{marginLeft:10}}>N 个</span>
          </div>
          <ReactECharts option={questionFavourCount()} style={{ height: "400px", width: "100%" }} />
        </Card>
      </div>
  );
};

export default StatisticPage;
