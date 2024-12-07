"use client";
import React, {useEffect, useState} from "react";
import {Input, Button, message, Card, Typography, Flex} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import ACCESS_ENUM from "@/access/accessEnum";
import "./index.css";
import Image from "next/image";
import {getLoginUserUsingGet, updateMyUserUsingPost} from "@/api/userController";
import {setLoginUser} from "@/stores/loginUser";
import {exchangeUsingPost} from "@/api/redeemController";

const BeVip: React.FC = () => {
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const [userRole, setUserRole] = useState<string>(loginUser.userRole || "");
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const verifyCode = async (code: string) => {
    try {
      const res = await exchangeUsingPost({
        code: code
      });
      if (res.data == true) {
        message.success("兑换成功");
      }
      const newUser = await getLoginUserUsingGet();

      if (newUser.data) {
        // 更新全局用户状态
        dispatch(setLoginUser(newUser.data));
      }
      // setLikeShowAnswer(checked);
    } catch (e) {
      message.error("兑换失败，" + e.message);
    }
  };
  useEffect(() => {
    setUserRole(loginUser.userRole);
  }, [loginUser]);

  const handleExchange = async () => {
    setLoading(true);
    const isValid = await verifyCode(code);
    setLoading(false);
  };

  return (
    <div className="beVip">
      {userRole === ACCESS_ENUM.USER && (
          <div>
            <Card
                title="会员兑换"
                bordered={false}
                style={{
                  width: "100%", // 使容器宽度占满父级
                  margin: "auto",
                  padding: "30px", // 增加整体内边距
                  borderRadius: "12px", // 更圆的边角
                  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)", // 更大的阴影
                }}
            >
              <Typography.Title
                  level={3} // 调整标题字号
                  style={{
                    textAlign: "center",
                    marginBottom: "24px", // 标题和输入框间的间距
                    fontWeight: "bold",
                  }}
              >
                兑换专属VIP会员
              </Typography.Title>

              <div style={{ marginBottom: "24px" }}> {/* 增加输入框和按钮的间距 */}
                <div style={{ textAlign: "center" }}>
                  <Input
                      placeholder="请输入兑换码"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      style={{
                        width: "100%",
                        marginBottom: "24px", // 增加输入框的底部间距
                        padding: "12px", // 增大输入框的内边距
                        fontSize: "16px", // 增大字体
                      }}
                  />
                  <Button
                      type="primary"
                      block
                      loading={loading}
                      onClick={handleExchange}
                      style={{
                        height:50,
                        backgroundColor: "#4CAF50",
                        borderColor: "#4CAF50",
                        fontSize: "18px", // 增大按钮字体
                        padding: "12px", // 增大按钮内边距
                      }}
                  >
                    立即兑换
                  </Button>
                </div>
              </div>
            </Card>
          </div>
      )}


      {userRole === ACCESS_ENUM.VIP && (
          <div
              style={{
                display: "flex", // 使用flex布局
                justifyContent: "center", // 水平居中
                alignItems: "center", // 垂直居中
                color: "#fdf809", // 字体颜色不变
                fontWeight: "bold",
                fontSize: "20px",
                background: "linear-gradient(to right, #8A2BE2, #4B0082)", // 紫色渐变背景
                padding: "15px",
                borderRadius: "8px", // 圆角
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // 阴影
                marginTop: "20px", // 上间距
                animation: "fadeIn 1s ease-in-out", // 动画效果
                width: "100%", // 使容器宽度占满父级
                height: 300, // 使容器宽度占满父级
              }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Image
                  style={{ marginTop: 2 }}
                  src="/assets/vip.png"
                  height={30}
                  width={30}
                  alt="面试秘境刷题网站 - 程序员码羊"
              />
              <p>
                你已经是尊贵的会员了
              </p>
            </div>
          </div>
      )}
      {userRole === ACCESS_ENUM.ADMIN && (
          <div
              style={{
                display: "flex", // 使用flex布局
                justifyContent: "center", // 水平居中
                alignItems: "center", // 垂直居中
                color: "#fdf809", // 字体颜色不变
                fontWeight: "bold",
                fontSize: "20px",
                background: "linear-gradient(to right, #8A2BE2, #4B0082)", // 紫色渐变背景
                padding: "15px",
                borderRadius: "8px", // 圆角
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // 阴影
                marginTop: "20px", // 上间距
                animation: "fadeIn 1s ease-in-out", // 动画效果
                width: "100%", // 使容器宽度占满父级
                height: 300, // 使容器宽度占满父级
              }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Image
                  style={{ marginTop: 2 }}
                  src="/assets/vip.png"
                  height={30}
                  width={30}
                  alt="面试秘境刷题网站 - 程序员码羊"
              />
              <p>
                你已经是无敌的管理员了
              </p>
            </div>
          </div>
      )}


    </div>
  );
};

export default BeVip;
