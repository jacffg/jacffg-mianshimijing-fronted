"use server";
import {Card, Col, Flex, message, Slider} from "antd";
import {getQuestionVoByIdUsingGet} from "@/api/questionController";
import QuestionCard from "@/components/QuestionCard";
import "./index.css";
import {Content} from "antd/es/layout/layout";
import HotTags from "@/components/HotTags";
import React from "react";
import Sider from "antd/es/layout/Sider";
import HotQuestions from "@/components/HotQuestions";
import {Span} from "next/dist/server/lib/trace/tracer";
import RelatedQuestions from "@/components/RelatedQuestions";

/**
 * 题目详情页
 * @constructor
 */
export default async function QuestionPage({params}) {
    const {questionId} = params;

    // 获取题目详情
    let question = undefined;
    try {
        const res = await getQuestionVoByIdUsingGet({
            id: questionId,
        });
        question = res.data;
    } catch (e) {
        message.error("获取题目详情失败，" + e.message);
    }
    // 错误处理
    if (!question) {
        return <div>获取题目详情失败，请刷新重试</div>;
    }

    return (
        <div id="questionPage">
            <Flex gap={23}>
                <Content>
                    <QuestionCard question={question}/>
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
                        <RelatedQuestions questionId={questionId}/>
                    </Sider>
                    <div style={{marginBottom: 24}}/>
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
                        <HotQuestions/>
                    </Sider>
                </Col>
            </Flex>
        </div>
    );
}
