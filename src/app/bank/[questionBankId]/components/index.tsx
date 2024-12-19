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
        bodyStyle={{
          padding: 24,
          borderRadius: "12px",
        }}
      >
        <div style={{ textAlign: "left" }}>
          {/* 标题部分 */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <span
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#1f1f1f", // 更加醒目的标题颜色
              }}
            >
              🔗 分享此题库
            </span>
          </div>

          {/* 分隔线 */}
          <div style={{ marginBottom: 16, borderTop: "1px solid #e4e4e4" }} />

          {/* 分享链接部分 */}
          <div style={{ marginBottom: 32 }}>
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#595959",
                display: "block",
                marginBottom: 8,
              }}
            >
              分享链接：
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#ffffff", // 白色背景让内容突出
                padding: "10px 16px",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", // 轻微阴影让内容有层次感
              }}
            >
              <Paragraph
                copyable
                style={{
                  margin: 0,
                  flex: 1,
                  color: "#333",
                  fontSize: 14,
                  wordBreak: "break-all",
                }}
              >
                {window.location.href}
              </Paragraph>
            </div>
          </div>

          {/* 分隔线 */}
          <div style={{ margin: "24px 0", borderTop: "1px solid #e4e4e4" }} />

          {/* 二维码部分 */}
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#595959",
                marginBottom: 16,
              }}
            >
              二维码分享：
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff", // 二维码区域白色背景
                padding: 16,
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <QRCode value={window.location.href} size={180} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
