"use client";
import { Avatar, Button, Card, List, Typography } from "antd";
import Link from "next/link";
import "./index.css";
import Meta from "antd/es/card/Meta";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { ShareAltOutlined } from "@ant-design/icons";
import React from "react";

interface Props {
  questionBankList: API.QuestionBankVO[];
}

/**
 * 题库列表组件
 * @param props
 * @constructor
 */
const QuestionBankList = (props: Props) => {
  const { questionBankList = [] } = props;

  const questionBankView = (questionBank: API.QuestionBankVO) => {
    return (
      <Card style={{ width: 310, height: 120 }}>
        <Link href={`/bank/${questionBank.id}`}>
          <Card.Meta
            avatar={
              <Avatar
                src={questionBank.picture}
                size={60}
                style={{ marginTop: 20 }}
                // shape="square"
              />
            }
            title={
                <Title
                    level={4}
                    style={{ marginBottom: 0, marginLeft: 10, marginTop: 10 }}
                >
                    {questionBank.title}
                </Title>
            }
            description={
              <Typography.Paragraph
                type="secondary"
                ellipsis={{ rows: 1 }}
                style={{
                    marginBottom: 20,
                    marginTop: 10,
                    marginLeft: 10,
                    fontSize: 17,
                }}
              >
                {questionBank.description}
              </Typography.Paragraph>
            }
          />
        </Link>
      </Card>
    );
  };

  return (
    <div className="question-bank-list">
      <List
        grid={{
          gutter: 16,
          column: 4,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
        }}
        dataSource={questionBankList}
        renderItem={(item) => <List.Item>{questionBankView(item)}</List.Item>}
      />
    </div>
  );
};

export default QuestionBankList;
