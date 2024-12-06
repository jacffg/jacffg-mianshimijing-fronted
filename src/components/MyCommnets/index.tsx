"use client";
import React, { useEffect, useState } from "react";
import { List, Card, Typography, message } from "antd";
import Link from "next/link";
import { listMyCommentsUsingPost } from "@/api/commentController";
import dayjs from "dayjs";
import "./index.css"; // 引入自定义样式文件

const MyComments: React.FC = () => {
    const [myComments, setMyComments] = useState<API.MyCommentVO[]>([]);

    const getComments = async () => {
        try {
            const res = await listMyCommentsUsingPost();
            setMyComments(res.data||[]);
        } catch (e: any) {
            message.error("获取我的评论失败，" + e.message);
        }
    };

    useEffect(() => {
        getComments();
    }, []); // 空依赖数组意味着仅在组件挂载时请求一次

    return (
        <div className="my-comments-container">
            <Card title="我的评论" bordered={false} className="my-comments-card">
                <List
                    itemLayout="vertical"
                    dataSource={myComments}
                    renderItem={(item) => (
                        <List.Item key={item.id} className="my-comments-item">
                            <Card
                                type="inner"
                                className="comment-card"
                                title={
                                    <Typography.Text strong>
                                        <Link
                                            href={`/question/${item.questionId}`}
                                            className="comment-link"
                                        >
                                            {item.questionNum}. {item.questionTitle}
                                        </Link>
                                    </Typography.Text>
                                }
                                extra={
                                    <Typography.Text className="comment-update-time">
                                        更新时间：{dayjs(item.updateTime).format("YYYY-MM-DD HH:mm:ss")}
                                    </Typography.Text>
                                }
                            >
                                <Typography.Paragraph className="comment-content">
                                    <strong>评论内容：</strong> {item.content}
                                </Typography.Paragraph>
                            </Card>
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
};

export default MyComments;
