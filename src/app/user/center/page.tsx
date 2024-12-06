"use client";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
  Switch,
} from "antd";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import { useEffect, useState } from "react";
import "./index.css";
import { EditOutlined } from "@ant-design/icons";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import {
  getLoginUserUsingGet,
  updateMyUserUsingPost,
} from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import Image from "next/image";
import FavourQuestionTable from "@/components/FavourQuestionTable";
import MyCommnets from "@/components/MyCommnets";
import BeVip from "@/components/BeVIP";

/**
 * 用户中心页面
 * @constructor
 */
export default function UserCenterPage() {
  const loginUser = useSelector((state: RootState) => state.loginUser);
  // 便于复用，新起一个变量
  const user = loginUser;
  const dispatch = useDispatch<AppDispatch>();
  // 控制菜单栏 Tab
  const [activeTabKey, setActiveTabKey] = useState<string>("record");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [userAvatarText, setUserAvatarText] = useState("");
  const [userAvatar, setUserAvatar] = useState(user.userAvatar);
  const [form] = Form.useForm();
  const [likeShowAnswer, setLikeShowAnswer] = useState(
    user.likeShowAnswer == 1,
  );
  // 打开弹窗
  const showModal = () => {
    form.setFieldsValue({
      userName: user.userName,
      userProfile: user.userProfile,
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setUserAvatar(user.userAvatar);
    setIsModalOpen(false);
  };
  // 确认提交表单
  const handleFormSubmit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          const res = await updateMyUserUsingPost({
            userName: values.userName,
            userAvatar: userAvatar,
            userProfile: values.userProfile,
          });
          if (res.code == 0) {
            message.success("修改信息成功");
          }

          const newUser = await getLoginUserUsingGet();

          if (newUser.data) {
            // 更新全局用户状态
            dispatch(setLoginUser(newUser.data));
          }
        } catch (e) {
          message.error("修改信息失败，" + e.message);
        }
        setIsModalOpen(false);
      })
      .catch((info) => {
        console.error("验证失败:", info);
      });
  };

  // 打开编辑头像弹窗
  const showModal2 = () => {
    setUserAvatarText("");
    setIsModalOpen2(true);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  // 模拟头像修改弹窗
  const handleFormSubmit2 = () => {
    if (userAvatarText) {
      setUserAvatar(userAvatarText);
    }
    setUserAvatarText("");
    setIsModalOpen2(false);
  };

  useEffect(() => {
    const fetchAvatar = async () => {
      if (user.id) {
        await setUserAvatar(user.userAvatar); // 等待数据加载完成再设置
        await setLikeShowAnswer(user.likeShowAnswer == 1); // 等待数据加载完成再设置
      }
    };
    fetchAvatar();
  }, [user]);
  //是否展示答案
  const onChange = async (checked: boolean) => {
    try {
      const res = await updateMyUserUsingPost({
        likeShowAnswer: checked ? 1 : 0,
      });
      if (res.code == 0) {
        message.success("修改成功");
      }

      const newUser = await getLoginUserUsingGet();

      if (newUser.data) {
        // 更新全局用户状态
        dispatch(setLoginUser(newUser.data));
      }
      // setLikeShowAnswer(checked);
    } catch (e) {
      message.error("修改失败，" + e.message);
    }
  };

  return (
    <div id="userCenterPage">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={7}>
          <Card style={{ textAlign: "center", marginLeft: 50 }}>
            <div>
              <Flex justify="space-between">
                <p style={{ fontSize: 17 }}>个人信息</p>
                <div>
                  {/* 图标，点击时触发弹窗 */}
                  <div
                    onClick={showModal}
                    style={{
                      fontSize: "20px",
                      cursor: "pointer",
                      marginTop: -5,
                    }}
                  >
                    <EditOutlined />
                  </div>

                  <Modal
                    title="修改资料"
                    visible={isModalOpen}
                    onOk={handleFormSubmit}
                    onCancel={handleCancel}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Form form={form} layout="vertical">
                      {/* 头像 */}
                      <Form.Item label="头像" name="userAvatar">
                        <img
                          src={userAvatar}
                          alt="avatar"
                          style={{
                            width: "80px", // 固定宽度
                            height: "80px", // 固定高度
                            borderRadius: "50%", // 圆形
                          }}
                        />

                        <Button type="link" onClick={showModal2}>
                          修改
                        </Button>
                      </Form.Item>
                      {/* 昵称 */}
                      <Form.Item
                        label="用户名"
                        name="userName"
                        rules={[{ required: true, message: "请输入昵称" }]}
                      >
                        <Input placeholder="请输入昵称" />
                      </Form.Item>

                      {/* 个人简介 */}
                      <Form.Item label="个人简介" name="userProfile">
                        <Input.TextArea
                          placeholder="请输入你的个人简介"
                          rows={4}
                        />
                      </Form.Item>
                    </Form>
                  </Modal>
                  <Modal
                    title="修改头像"
                    visible={isModalOpen2}
                    onOk={handleFormSubmit2}
                    onCancel={handleCancel2}
                    okText="确定"
                    cancelText="取消"
                    style={{ marginTop: 120 }}
                  >
                    <Input.TextArea
                      placeholder="请输入新的头像的url地址"
                      style={{ marginTop: 16, marginBottom: 10 }}
                      rows={3}
                      value={userAvatarText}
                      onChange={(e) => setUserAvatarText(e.target.value)} // 更新状态
                    />
                  </Modal>
                </div>
              </Flex>
            </div>
            <Divider />
            <Avatar src={user.userAvatar|| "/assets/logo.png"} size={72} />
            <div style={{ marginBottom: 16 }} />
            <Meta
              title={
                <div>
                  <Space>
                    <Title level={4} style={{ marginBottom: 0 }}>
                      {user.userName}
                    </Title>
                    {user?.userRole == "vip" && (
                      <div>
                        <Image
                          style={{ marginTop: 8 }}
                          src="/assets/vip.png"
                          height={30}
                          width={30}
                          alt="面试秘境刷题网站 - 程序员鱼皮"
                        />
                      </div>
                    )}
                  </Space>
                </div>
              }
              description={
                <>
                  <Paragraph type="secondary">
                    {user.userProfile ? user.userProfile : "暂无简历"}
                  </Paragraph>
                  <div style={{ marginTop: 26 }}>
                    <Flex
                      justify="space-between"
                      align="center"
                      style={{ width: "100%" }}
                    >
                      <p style={{ fontWeight: "bold", color: "#191c19" }}>
                        默认展示答案
                      </p>
                      <Switch checked={likeShowAnswer} onChange={onChange} />
                    </Flex>
                  </div>
                </>
              }
            />
          </Card>
        </Col>
        <Col xs={24} md={17}>
          <Card
            tabList={[
              {
                key: "record",
                label: "刷题记录",
              },
              {
                key: "favour",
                label: "收藏",
              },
              {
                key: "comment",
                label: "评论",
              },
              {
                key: "beVip",
                label: "成为会员",
              },
            ]}
            activeTabKey={activeTabKey}
            onTabChange={(key: string) => {
              setActiveTabKey(key);
            }}
            style={{ width: 900 }}
          >
            {activeTabKey === "record" && <>aaa</>}
            {activeTabKey === "favour" && (
              <>
                <div>
                  <FavourQuestionTable />
                </div>
              </>
            )}
            {activeTabKey === "comment" && (
              <>
                <div>
                  <MyCommnets />
                </div>
              </>
            )}
            {activeTabKey === "beVip" && (
                <>
                  <div>
                    <BeVip />
                  </div>
                </>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
