import { Button, Card } from "antd";
import { LockOutlined } from "@ant-design/icons";
import QuestionCard from "@/components/QuestionCard";
import React from "react";

/**
 * 无权限访问的页面
 * @constructor
 */
const VIPForbidden = () => {
  return (
    <div style={{ width: "1100px" }}>
      <Card
        style={{
          textAlign: "center",
          padding: "32px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{ fontSize: "48px", color: "#faad14", marginBottom: "16px" }}
        >
          <LockOutlined />
        </div>
        <div
          style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}
        >
          会员专属内容
        </div>
        <div style={{ fontSize: "16px", color: "#888", marginBottom: "24px" }}>
          对不起，本题目为会员专属，请先开通 VIP 后访问。
        </div>
        <Button
          type="primary"
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          开通 VIP
        </Button>
      </Card>
    </div>
  );
};

export default VIPForbidden;
