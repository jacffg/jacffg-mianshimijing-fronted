"use client";
import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, message, Space } from "antd";
import React from "react";
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

interface Props {
  children: React.ReactNode;
}

/**
 * 全局通用布局
 * @param children
 * @constructor
 */
export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const menuItemStyle = {
    color: "#0d69e0", // 字体颜色
    fontWeight: "bold", // 字体加粗
    fontSize: "16px",
    icon: <SendOutlined />,
  };

  /**
   * 用户注销
   */
  const userLogout = async () => {
    try {
      await userLogoutUsingPost();
      message.success("已退出登录");
      dispatch(setLoginUser(DEFAULT_USER));
      router.push("/user/login");
    } catch (e) {
      message.error("操作失败，" + e.message);
    }
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
            title="面试鸭刷题平台"
            layout="top"
            logo={
              <Image
                  src="/assets/logo.png"
                  height={32}
                  width={32}
                  alt="面试鸭刷题网站 - 程序员鱼皮"
              />
            }
            location={{
              pathname,
            }}
            avatarProps={{
              src: loginUser.userAvatar || "/assets/logo.png",
              size: "small",
              title: loginUser.userName || "鱼皮鸭",
              render: (props, dom) => {
                if (!loginUser.id) {
                  return (
                      <div
                          onClick={() => {
                            router.push("/user/login");
                          }}
                      >
                        {dom}
                      </div>
                  );
                }
                return (
                    <Dropdown
                        menu={{
                          items: [
                            {
                              key: "logout",
                              icon: <LogoutOutlined />,
                              label: "退出登录",
                            },
                          ],
                          onClick: async (event: { key: React.Key }) => {
                            const { key } = event;
                            if (key === "logout") {
                              userLogout();
                            }
                          },
                        }}
                    >
                      {dom}
                    </Dropdown>
                );
              },
            }}
            actionsRender={(props) => {
              if (props.isMobile) return [];
              return [
                <SearchInput key="search" />,
                <a
                    key="github"
                    href="https://github.com/liyupi/mianshiya-next"
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
      </div>
  );
}
