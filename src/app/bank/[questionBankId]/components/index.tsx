"use client";
import { Avatar, Button, Card, Modal, Input, message, QRCode } from "antd";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import BankQuestionList from "@/components/BankQuestionList";
import { ShareAltOutlined } from "@ant-design/icons";
import React, { useState } from "react";

export default function BankPageClient({ bank }: { bank: any }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleShareClick = () => {
    setModalVisible(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      message.success("复制成功！");
    } catch {
      message.error("复制失败，请手动复制。");
    }
  };

  const firstQuestionId =
    bank.questionPage?.records && bank.questionPage.records.length > 0
      ? bank.questionPage.records[0].id
      : undefined;

  return (
    <div id="bankPage" className="max-width-content">
      <Card>
        <Meta
          avatar={
            <Avatar
              src={bank.picture}
              size={120}
              style={{ marginTop: 20 }}
              shape="square"
            />
          }
          title={
            <Title
              level={2}
              style={{ marginBottom: 0, marginLeft: 10, marginTop: 10 }}
            >
              {bank.title}
            </Title>
          }
          description={
            <>
              <Paragraph
                type="secondary"
                style={{
                  marginBottom: 20,
                  marginTop: 20,
                  marginLeft: 10,
                  fontSize: 17,
                }}
              >
                {bank.description}
              </Paragraph>
              <Button
                type="primary"
                shape="round"
                href={`/bank/${bank.id}/question/${firstQuestionId}`}
                target="_blank"
                disabled={!firstQuestionId}
                style={{ marginLeft: 10 }}
              >
                开始刷题
              </Button>
              <Button
                type="dashed"
                shape="round"
                icon={<ShareAltOutlined />}
                disabled={!firstQuestionId}
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  color: "#313b60",
                  backgroundColor: "#dad9ce",
                }}
                onClick={handleShareClick}
              >
                分享
              </Button>
            </>
          }
        />
      </Card>
      <div style={{ marginBottom: 16 }} />
      <BankQuestionList
        questionBankId={bank.id}
        questionList={bank.questionPage?.records ?? []}
      />
      <Modal
        title={null}
        open={isModalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        centered
        bodyStyle={{ padding: 24 }}
      >
        <div style={{ textAlign: "left" }}>
          {/* 标题部分 */}
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <span
              style={{ fontSize: 20, fontWeight: "bold", color: "#3c3c3c" }}
            >
              🔗 分享此题库
            </span>
          </div>
          <div style={{ marginBottom: 16, borderTop: "1px solid #f0f0f0" }} />

          {/* 分享链接部分 */}
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 16, fontWeight: 500, color: "#595959" }}>
              分享链接：
            </span>
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 8 }}
            >
              <Input
                value={window.location.href}
                readOnly
                style={{ flex: 1, marginRight: 8 }}
              />
              <Button
                type="primary"
                onClick={handleCopy}
                style={{ padding: "0 16px" }}
              >
                复制
              </Button>
            </div>
          </div>

          <div style={{ margin: "12px 0", borderTop: "1px solid #f0f0f0" }} />

          {/* 二维码部分 */}
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "#595959",
                marginBottom: 16,
              }}
            >
              二维码分享：
            </div>
            <div style={{ textAlign: "center" }}>
              <QRCode value={window.location.href} size={200} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
