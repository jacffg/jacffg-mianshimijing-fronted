"use client";
import {
    GithubFilled,
    LogoutOutlined,
    MailOutlined,
    SearchOutlined,
    SendOutlined,
    TeamOutlined,
    UpOutlined, UserOutlined,
    WechatOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Card, Dropdown, message, Space, Modal, Col, Row } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import { menus } from "../../../config/menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import getAccessibleMenus from "@/access/menuAccess";
import { userLogoutUsingPost } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import { DEFAULT_USER } from "@/constants/user";
import SearchInput from "@/layouts/BasicLayout/components/SearchInput";
import "./index.css";
import ACCESS_ENUM from "@/access/accessEnum";

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  // const [isVIP, setIsVIP] = useState(false);
  const isVIP = loginUser.userRole === ACCESS_ENUM.VIP;


  const [isHovered, setIsHovered] = useState(false);
  const [isHoverCard, setIsHoverCard] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHoverCard2, setIsHoverCard2] = useState(false);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const menuItemStyle = {
    color: "#0d69e0", // 字体颜色
    fontWeight: "bold", // 字体加粗
    fontSize: "16px",
    icon: <SendOutlined />,
  };

  // 用户注销
  const userLogout = async () => {
    try {
      await userLogoutUsingPost();
      message.success("已退出登录");
      dispatch(setLoginUser(DEFAULT_USER));
      // router.push("/user/login");
    } catch (e) {
      message.error("操作失败，" + e.message);
    }
  };

  const handleImageClick = (src: string) => {
    setPreviewImage(src);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };
  const handleMouseLeave = (
    setState: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setTimeout(() => {
      setState(false);
    }, 300); // 延迟 0.5 秒
  };
  return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        title="面试秘境"
        layout="top"
        logo={
          <Image
            src="/assets/logo.png"
            height={32}
            width={32}
            alt="面试秘境刷题网站 - 程序员鱼皮"
          />
        }
        location={{
          pathname,
        }}
        avatarProps={{
          src: loginUser.userAvatar || "/assets/logo.png",
          size: "large",
          // size: 600,
          title: (
            <span
              style={{
                color: "#504d4d", // 修改颜色
                fontSize: "16px", // 修改字体大小
                fontWeight: "bold", // 加粗
              }}
            >
              {loginUser.userName || "无名"}
            </span>
          ),
          render: (props, dom) => {
            if (!loginUser.id) {
              return (
                <div
                  onClick={() => {
                    router.push(`/user/login?url=${pathname}`);
                  }}
                >
                  {dom}
                </div>
              );
            }
            return (
              <div>
                  <Dropdown
                      menu={{
                          items: [
                              { key: 'userCenter', icon: <UserOutlined />, label: '个人中心' },
                              { key: 'logout', icon: <LogoutOutlined />, label: '退出登录' },
                          ],
                          onClick: async (event) => {
                              const { key } = event;
                              if (key === 'logout') {
                                  userLogout();
                              } else if (key === 'userCenter') {
                                  router.push('/user/center');
                              }
                          },
                      }}
                  >
                      {dom}
                  </Dropdown>


              </div>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          if (isVIP) {
            return [
              <SearchInput key="search" />,
              <a
                key="github"
                href="/user/center"
                target="_blank"
                style={{ width: 100, height: 45 }}
              >
                <Row style={{ marginTop: -14 }}>
                  <Image
                    style={{ marginTop: 16 }}
                    src="/assets/vip.png"
                    height={30}
                    width={30}
                    alt="面试秘境刷题网站 - 程序员鱼皮"
                  />
                  <span
                    style={{
                      marginTop: -3,
                      marginLeft: -4,
                      color: "#cb9014", // 设置文本颜色
                      fontSize: "17px", // 设置字体大小
                      fontWeight: "bold", // 设置字体加粗
                      padding: "4px 8px", // 内边距
                    }}
                  >
                    会员
                  </span>
                </Row>
              </a>,
              // <SearchInput key="search" />,
            ];
          }
          return [
            <SearchInput key="search" />,
            <a
              key="github"
              href="https://github.com/jacffg"
              target="_blank"
            >
              <GithubFilled key="GithubFilled" />
            </a>,
          ];
        }}
        headerTitleRender={(logo, title, _) => {
          return (
            <a href="/">
              {logo}
              {title}
            </a>
          );
        }}
        footerRender={() => {
          return <GlobalFooter />;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuDataRender={() => {
          return getAccessibleMenus(loginUser, menus);
        }}
        menuItemRender={(item, dom) => (
          <Link
            href={item.path || "/"}
            target={item.target}
            style={item.path == pathname ? menuItemStyle : undefined} // 添加内联样式
          >
            <Space>
              {item.path == pathname && <SendOutlined />}
              {dom}
            </Space>
          </Link>
        )}
      >
        {children}
      </ProLayout>

      {/* 悬浮栏 */}
      <div
        style={{
          position: "absolute",
          right: 23,
          bottom: 300,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#ffffff",
          borderRadius: "12px", // 添加圆角
        }}
      >
        {/*######*/}
        <div
          style={{
            position: "relative",
            cursor: "pointer",
          }}
          onMouseEnter={() => setIsHovered2(true)}
          onMouseLeave={() => handleMouseLeave(setIsHovered2)}
        >
          {/* 置顶按钮 */}
          <button
            style={{
              backgroundColor: "transparent", // 背景透明
              border: "none", // 无边框
              padding: "10px", // 图标间距
              cursor: "pointer", // 鼠标指针
              outline: "none", // 去掉按钮的默认轮廓
            }}
          >
            <MailOutlined style={{ fontSize: "24px", color: "#676767" }} />{" "}
            {/* 显示图标 */}
          </button>
        </div>
        {(isHovered2 || isHoverCard2) && (
          <div
            style={{
              position: "absolute",
              top: "-64px",
              left: "-270px", // 调整位置
              // top: "-66px",
              // left: "-245px", // 调整位置
              width: "234px", // 增加宽度以改善间距
              height: "250px", // 增加宽度以改善间距
              borderRadius: "12px", // 更圆润的角角
              overflow: "hidden",
              zIndex: 9999, // 确保在最上层显示
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)", // 加入阴影效果
              backgroundColor: "#fefefe", // 使用更浅的背景色
              padding: "20px", // 增加内边距以使内容更舒适
              transition: "all 0.3s ease-in-out", // 平滑过渡效果
              transform: "scale(1.05)", // 轻微放大效果
              textAlign: "left", // 内容居中
            }}
            onMouseEnter={() => setIsHoverCard2(true)}
            onMouseLeave={() => setIsHoverCard2(false)}
          >
            <Card bordered={false} style={{ width: "110%" }}>
              {/* 标题 */}
              <div
                style={{
                  marginBottom: "14px",
                  fontWeight: "bold",
                  fontSize: "15px",
                  color: "#333",
                }}
              >
                有意见或反馈请联系我们
              </div>

              {/* 邮箱信息 */}
              <div
                style={{
                  fontSize: "14px",
                  color: "#555",
                  marginBottom: "15px",
                }}
              >
                Email:{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#0d69e0",
                    marginTop: 10,
                  }}
                >
                  13517950816@163.com
                </span>
              </div>

              {/* 复制按钮 */}
              <button
                style={{
                  backgroundColor: "#0d69e0", // 按钮背景颜色
                  color: "#fff", // 按钮文字颜色
                  border: "none", // 无边框
                  padding: "8px 12px", // 按钮内边距
                  borderRadius: "8px", // 圆角按钮
                  cursor: "pointer", // 鼠标指针效果
                  fontSize: "14px", // 按钮文字大小
                  transition: "background-color 0.3s", // 按钮过渡效果
                }}
                onClick={() => {
                  navigator.clipboard
                    .writeText("13517950816@163.com")
                    .then(() => {
                      message.success("邮箱已复制！");
                    });
                }}
              >
                复制邮箱
              </button>
            </Card>
          </div>
        )}
        {/*###########*/}

        {/* 悬浮图标 */}
        <div
          style={{
            position: "relative",
            cursor: "pointer",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => handleMouseLeave(setIsHovered)} // 使用延迟的处理函数
        >
          <TeamOutlined style={{ fontSize: "24px", color: "#676767" }} />
          {(isHovered || isHoverCard) && (
            <div
              style={{
                position: "absolute",
                top: "-100px",
                // left: "-234px", // 调整位置
                left: "-270px", // 调整位置
                width: "220px", // 增加宽度
                height: "240px", // 增加高度
                borderRadius: "12px", // 更圆润的角度
                overflow: "hidden",
                zIndex: 9999, // 确保显示在最上层
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)", // 加入阴影效果
                backgroundColor: "white", // 卡片背景色
                padding: "10px", // 内边距
                transition: "all 0.3s ease-in-out", // 平滑的过渡效果
                transform: "scale(1.1)", // 使卡片放大 10%
              }}
              onMouseEnter={() => setIsHoverCard(true)}
              onMouseLeave={() => setIsHoverCard(false)}
            >
              <Card
                bordered={false} // 去除默认边框
                style={{
                  width: "100%",
                  height: "100%",
                  padding: 0, // 去除卡片内部的间距
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center", // 内容居中
                }}
              >
                {/* 文本内容 */}
                <div
                  style={{
                    marginBottom: "5px",
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#309cbe",
                  }}
                >
                  扫码加入面试刷题用户交流群
                </div>

                {/* 图片展示，使用next.js的Image组件并且设置图片的最大尺寸 */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px", // 图片圆角效果
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src="/assets/exchangeGroup.jpg" // 替换成实际图片路径
                    alt="Hovered Image"
                    layout="intrinsic" // 保持图片的原始宽高比
                    width={200} // 设置图片的最大宽度
                    height={200} // 设置图片的最大高度
                    objectFit="contain" // 等比缩放，确保图片完整显示
                    style={{ borderRadius: "10px" }}
                    onClick={() =>
                      handleImageClick("/assets/exchangeGroup.jpg")
                    } // 点击图片显示预览
                  />
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* 图片预览 Modal */}
      <Modal
        visible={previewImage !== null}
        onCancel={closePreview}
        footer={null}
        width={600}
        bodyStyle={{
          backgroundColor: "transparent", // 使内容区域背景透明
          padding: 0, // 去除内边距
        }}
        style={{
          backgroundColor: "transparent", // 使 Modal 背景透明
        }}
      >
        <Image
          src={previewImage || ""}
          alt="Preview"
          width={500}
          height={500}
          objectFit="contain"
        />
      </Modal>
    </div>
  );
}
