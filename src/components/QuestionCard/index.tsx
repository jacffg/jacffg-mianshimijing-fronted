"use client";
import {
  Button,
  Card,
  Divider,
  Input,
  message,
  Modal,
  QRCode,
  Space,
  Spin,
} from "antd";
import Title from "antd/es/typography/Title";
import TagList from "@/components/TagList";
import MdViewer from "@/components/MdViewer";
import "./index.css";
import VIPTag from "@/components/VIPTag";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import ACCESS_ENUM from "@/access/accessEnum";
import VIPForbidden from "@/components/VIPforbidden/VIPforbidden";
import DifficultTag from "@/components/DifficultTag";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LikeFilled,
  LikeOutlined,
  ShareAltOutlined,
  StarFilled,
  StarOutlined,
  SmileOutlined,
  LoadingOutlined,
  RobotOutlined, LockOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Loginforbidden from "@/components/LoginForbidden/Loginforbidden";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import { aiGenerateQuestionUsingPost } from "@/api/questionController";
import Comments from "@/components/Comments/Comments";

interface Props {
  question: API.QuestionVO;
  questionBankId?: number;
}

/**
 * 题目卡片
 * @param props
 * @constructor
 */
const QuestionCard = (props: Props) => {
  const router = useRouter();
  const { question, questionBankId } = props;
  const [isAnswerVisible, setIsAnswerVisible] = useState(false); // 控制答案是否显示
  const loginUser = useSelector((state: RootState) => state.loginUser);

  const [isLoding, setIsLoding] = useState(false); // 生成中
  const [isLIke, setIsLike] = useState(true); // 是否点赞
  const [isCollect, setIsCollect] = useState(true); // 是否收藏
  const [isModalVisible, setModalVisible] = useState(false);
  const [aiContent, setAiContent] = useState<string>("");

  const isNotVip = (loginUser.userRole == ACCESS_ENUM.USER ||
      loginUser.userRole == ACCESS_ENUM.NOT_LOGIN) //是否为vip
  const isNotVisible =
    question.isVip == 0 &&isNotVip;
  const isLogin = loginUser.userRole != ACCESS_ENUM.NOT_LOGIN;


  // 控制菜单栏 Tab
  const [activeTabKey, setActiveTabKey] = useState<string>("questionAnswer");
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      message.success("复制成功！");
    } catch {
      message.error("复制失败，请手动复制。");
    }
  };
  // 切换答案显示状态
  const toggleAnswerVisibility = () => {
    setIsAnswerVisible(!isAnswerVisible);
  };
  //点赞
  const doLike = () => {
    if (loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
      message.error("请先登录");
      if (questionBankId) {
        router.push(
          `/user/login?url=/bank/${questionBankId}/question/${question.id}`,
        );
      } else {
        router.push(`/user/login?url=/question/${question.id}`);
      }
      return;
    }
    alert("点赞");
  };
  //收藏
  const doCollect = () => {
    if (loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
      message.error("请先登录");
      if (questionBankId) {
        router.push(
          `/user/login?url=/bank/${questionBankId}/question/${question.id}`,
        );
      } else {
        router.push(`/user/login?url=questions/${question.id}`);
      }
      return;
    }
  };
  //分享
  const doShare = () => {
    setModalVisible(true);
  };

  const aiGenete = async () => {
    setIsLoding(true);
    try {
      const res = await aiGenerateQuestionUsingPost({
        questionId: question.id,
      });
      setAiContent(res.data.answer);
      // setAiContent("fhasdk");
      setIsAnswerVisible(true);
    } catch (e) {
      message.error("获取ai生成失败，" + e.message);
    }
    setIsLoding(false);
  };
  return (
    <div className="question-card" style={{ width: "1100px" }}>
      <Card>
        <Title level={1} style={{ fontSize: 24 }}>
          {question.questionNum}、{question.title}
        </Title>
        <div style={{ marginTop: "-10px" }}>
          <Space>
            <DifficultTag difficult={question.diffity} />
            {question?.isVip == 0 && <VIPTag />}
            <TagList tagList={question.tagList} />
          </Space>
        </div>

        <div style={{ marginBottom: 16 }} />
        <Title level={5} style={{ fontSize: 18 }}>
          描述：
        </Title>
        <MdViewer value={question.content} />
        <Divider />
        <Space
          size={250}
          style={{ fontSize: "16px", color: "#555", marginLeft: 22 }}
        >
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <EyeOutlined
              style={{
                marginRight: "8px",
                color: "#b77ace",
                fontSize: "21px", // 调整字体大小
                strokeWidth: "1.3", // 加粗线条宽度
              }}
            />
            <span>{question.viewNum}</span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={doLike}
          >
            {!isLIke && (
              <LikeOutlined style={{ marginRight: "8px", color: "#FF4D4F" }} />
            )}
            {isLIke && (
              <LikeFilled style={{ marginRight: "8px", color: "#FF4D4F" }} />
            )}
            <span>点赞</span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={doCollect}
          >
            {!isCollect && (
              <StarOutlined style={{ marginRight: "8px", color: "#FADB14" }} />
            )}
            {isCollect && (
              <StarFilled style={{ marginRight: "8px", color: "#FADB14" }} />
            )}
            <span>收藏</span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={doShare}
          >
            <ShareAltOutlined
              style={{ marginRight: "8px", color: "#1890FF" }}
            />
            <span>分享</span>
          </div>
        </Space>
      </Card>
      <div style={{ marginBottom: 16 }} />
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
              🔗 分享此题目
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

      {!isLogin && (
        <div>
          <Loginforbidden
            questionBankId={questionBankId}
            questionid={question.id}
          />
        </div>
      )}
      {isNotVisible && isLogin && (
        <div>
          <VIPForbidden />
        </div>
      )}
      {!isNotVisible && isLogin && (
        <div>
          <Card
            tabList={[
              {
                key: "questionAnswer",
                label: "题目答案",
              },
              {
                key: "AiAnswer",
                label: "Ai生成",
              },
            ]}
            activeTabKey={activeTabKey}
            onTabChange={(key: string) => {
              setActiveTabKey(key);
            }}
            tabBarExtraContent={
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                {activeTabKey === "AiAnswer"   &&(
                  <Button
                    onClick={aiGenete}
                    disabled={(isLoding || isNotVip)}
                    type="primary"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "0 16px",
                    }}
                  >
                    {isLoding ? (
                      <>
                        <LoadingOutlined />
                        <span>生成中...</span>
                      </>
                    ) : (
                      <>
                        <RobotOutlined />
                        <span>生成 AI 答案</span>
                      </>
                    )}
                  </Button>
                )}
                <Button
                  icon={
                    isAnswerVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />
                  }
                  onClick={toggleAnswerVisibility}
                  style={{ border: "none" }}
                >
                  {isAnswerVisible ? "隐藏答案" : "查看答案"}
                </Button>
              </div>
            }
          >
            {activeTabKey === "AiAnswer" && aiContent && isAnswerVisible && (
              <MdViewer value={aiContent} />
            )}
            {activeTabKey === "questionAnswer" && isAnswerVisible && (
                <MdViewer value={question.answer} />
            )}
            {activeTabKey === "AiAnswer" && isNotVip  && (
                <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center", // 居中对齐文本
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
                    会员专属功能
                  </div>
                  <div
                      style={{ fontSize: "16px", color: "#888", marginBottom: "24px" }}
                  >
                    对不起，本功能为会员专属，请先开通 VIP 后使用。
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
                </div>

            )}

            {!isAnswerVisible &&!(activeTabKey === "AiAnswer" && isNotVip) && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <EyeInvisibleOutlined
                  style={{
                    fontSize: "60px",
                    color: "#aaa",
                    marginBottom: "8px",
                  }} // 修改图标颜色
                />
                <Title
                  style={{
                    color: "#aaa",
                    marginTop: "20px",
                    marginBottom: "25px",
                  }}
                >
                  答案已隐藏
                </Title>
                <Button type="primary" onClick={toggleAnswerVisibility}>
                  显示答案
                </Button>
              </div>
            )}
          </Card>
          <div style={{marginBottom:16}}/>
          <Comments questionId={question.id}/>
        </div>
      )}

      <div style={{ marginBottom: 16 }} />
    </div>
  );
};

export default QuestionCard;
