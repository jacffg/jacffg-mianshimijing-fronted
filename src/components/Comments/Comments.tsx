import {
  Avatar,
  Button,
  Card,
  Col,
  List,
  message,
  Row,
  Space,
  Typography,
} from "antd";

import React, { useEffect, useState } from "react";
import {
    addCommentUsingPost, deleteCommentUsingPost,
    getCommentByQuestionIdUsingGet,
} from "@/api/commentController";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import ACCESS_ENUM from "@/access/accessEnum";
import CommentVO = API.CommentVO;
import VIPTag from "@/components/VIPTag";
import TextArea from "antd/es/input/TextArea";
import { Simulate } from "react-dom/test-utils";
import cancel = Simulate.cancel;

interface Props {
  questionId: number; // 必传参数
}

/**
 * 题目评论区
 * @constructor
 */
const Comments: React.FC<Props> = (props) => {
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const { questionId } = props;
  // 使用 useState 来存储 TextArea 的输入值
  const [commentText, setCommentText] = useState("");
  const [showCount, setShowCount] = useState(3); // 默认显示 4 条
  const [replieCommentText, setReplieCommentText] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [parentId, setParentId] = useState();
  const [commentAreaId, setCommentAreaId] = useState<number>();
  const [comments, setCommnets] = useState<CommentVO[]>([]); // 控制答案是否显示

  // 处理输入框内容变化
  const handleTextChange = (e) => {
    setCommentText(e.target.value); // 更新输入框的值
  };
  // 处理输入框内容变化
  const handleReplieTextChange = (e) => {
    setReplieCommentText(e.target.value); // 更新输入框的值
  };
  // 点击展开按钮显示所有回复
  const handleExpand = () => {
    setShowCount(comments.length); // 显示所有回复
  };
  // 点击收起按钮，显示前 4 条
  const handleCollapse = () => {
    setShowCount(3); // 只显示 4 条
  };

  //获取评论
  const getCommets = async () => {
    if (!questionId) {
      return;
    }
    try {
      const res = await getCommentByQuestionIdUsingGet({
        questionId: questionId,
      });
      setCommnets(res.data);
    } catch (e) {
      message.error("获取题目评论，" + e.message);
    }
  };
  //评论
  const doComment = async () => {
    if (!questionId) {
      return;
    }
    try {
      const res = await addCommentUsingPost({
        questionId: questionId,
        content: commentText,
      });
      if (res.code == 0) {
        setCommentText("");
        getCommets();
        message.success("评论成功");
      }
    } catch (e) {
      message.error("评论失败，" + e.message);
    }
  };

  useEffect(() => {
    getCommets();
  }, []);

  //回复显示
  const respond = async (item: CommentVO) => {
    //设置回复区域
    if (item.ancestorId == null) {
      //一级评论
      setCommentAreaId(item.id);
    } else {
      setCommentAreaId(item.ancestorId);
    }
    setParentId(item.id);
    setPlaceholder(`回复@${item.user?.userName}`);
  };

  //取消
  const doCancel = async () => {
    setPlaceholder("");
    setCommentAreaId(-1);
    setReplieCommentText("");
    setParentId(null);
  };

  //发送回复
  const doReplie = async (item: CommentVO) => {
    if (!questionId) {
      return;
    }
    if (!parentId) {
      return;
    }
    try {
      const res = await addCommentUsingPost({
        questionId: questionId,
        content: replieCommentText,
        parentId: parentId,
      });
      if (res.code == 0) {
        getCommets();
        doCancel();
        message.success("回复成功");
      }
    } catch (e) {
      message.error("回复失败，" + e.message);
    }
  };

  //删除评论
  const doDelete = async (id: number) => {
    if (!id) {
      return;
    }

    try {
      const res = await deleteCommentUsingPost({
        id: id,
      });
      if (res.code == 0) {
        getCommets();
        message.success("删除评论成功");
      }
    } catch (e) {
      message.error("删除评论失败，" + e.message);
    }
  };
  const RepliesView = (replie: API.CommentVO) => {
    return (
      <Card
        style={{
          border: "none", // 去掉卡片的边框
          marginLeft: -20,
          marginTop: -10,
          // borderColor:"red",
          // borderStyle:"solid",
          paddingTop: -10, // 减少上方的内边距
          paddingBottom: -10, // 减少下方的内边距
          minHeight: 0,
        }}
        bodyStyle={{
          paddingTop: 0, // 缩短上方的内边距
          paddingBottom: 0, // 缩短下方的内边距
        }}
      >
        <Card.Meta
          avatar={
            <Avatar
              src={replie.user?.userAvatar || "/assets/logo.png"}
              size={30}
              style={{ marginTop: 10 }}
            />
          }
          description={
            // 评论
            <div>
              <Typography.Paragraph
                style={{
                  marginTop: -5,
                  marginLeft: 0,
                  fontSize: 16,
                  lineHeight: 1.5, // 行高使文字不显得紧凑
                  color: "#333", // 设置文字颜色
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center", // 垂直居中对齐
                    flexWrap: "wrap", // 当内容过长时换行
                  }}
                >
                  <span
                    style={{
                      fontStyle: "italic",
                      fontWeight: "bold", // 回复者加粗
                      color: "#36200e", // 设置颜色
                    }}
                  >
                    {replie.user?.userName}
                  </span>
                  <div style={{ marginLeft: 4, marginTop: 1.5 }}>
                    {replie.user?.userRole !== ACCESS_ENUM.NOT_LOGIN &&
                      replie.user?.userRole !== ACCESS_ENUM.USER && (
                        <VIPTag size={5} padding={1.5} />
                      )}
                  </div>
                  <span style={{ color: "#392542", marginLeft: "7px" }}>
                    回复：
                  </span>

                  <span
                    style={{
                      fontWeight: "bold", // 被回复者加粗
                      color: "#11cdd5", // 设置颜色
                      marginLeft: "5px",
                    }}
                  >
                    @{replie.repliedUser?.userName}
                  </span>
                </div>

                <div
                  style={{
                    marginTop: 5,
                    padding: "5px 10px", // 给回复内容添加内边距
                    backgroundColor: "#f8f9fa", // 设置轻微的背景色
                    borderRadius: "4px", // 给背景色加圆角
                  }}
                >
                  {replie.content}
                </div>
              </Typography.Paragraph>

              <Row align="middle" style={{ width: "100%" }}>
                {/* 创建时间 */}
                <Col>
                  <Typography.Paragraph
                    type="secondary"
                    style={{
                      marginLeft: 10,
                      marginTop: -14,
                    }}
                  >
                    {dayjs(replie.createTime).format("YYYY-MM-DD HH:mm:ss")}
                  </Typography.Paragraph>
                </Col>

                {/* 回复按钮 */}
                <Col>
                  <div
                    onClick={() => respond(replie)} // 这里将参数传递给 respond 函数
                    style={{
                      width: 50,
                      height: 30,
                      marginTop: -30,
                      marginLeft: 10,
                      display: "flex",
                      justifyContent: "center", // 居中对齐
                      alignItems: "center", // 垂直居中
                      cursor: "pointer", // 手指样式
                      borderRadius: "4px", // 给按钮加上圆角
                      transition: "background-color 0.3s", // 平滑过渡效果
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#effcfa"; // 悬浮时的背景颜色
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "white"; // 恢复原始背景颜色
                    }}
                  >
                    回复
                  </div>
                </Col>
                {loginUser.id==replie.user?.id&&(
                    <div>
                        {/* 删除按钮 */}
                        <Col>
                            <div
                                onClick={() => doDelete(replie.id)} // 这里将参数传递给 respond 函数
                                style={{
                                    width: 50,
                                    height: 25,
                                    marginTop: -35,
                                    marginLeft: 820,
                                    color: "red",
                                    display: "flex",
                                    fontWeight: "bold",
                                    justifyContent: "center", // 居中对齐
                                    alignItems: "center", // 垂直居中
                                    cursor: "pointer", // 手指样式
                                    borderRadius: "4px", // 给按钮加上圆角
                                    transition: "background-color 0.3s", // 平滑过渡效果
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#b4aa97"; // 悬浮时的背景颜色
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "white"; // 恢复原始背景颜色
                                }}
                            >
                                删除
                            </div>
                        </Col>
                    </div>
                )}
              </Row>
            </div>
          }
        />
      </Card>
    );
  };
  const CommentView = (commet: API.CommentVO) => {
    return (
      <Card
        style={{
          // border: "none"
          marginBottom: -17,
        }}
      >
        <Card.Meta
          avatar={
            <Avatar
              src={commet.user?.userAvatar || "/assets/logo.png"}
              size={40}
              style={{ marginTop: 8 }}
            />
          }
          title={
            <Space style={{ marginTop: -20 }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <Title
                  level={5}
                  style={{
                    marginBottom: 0,
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                >
                  {commet.user?.userName}
                </Title>
                <div style={{ marginTop: 11 }}>
                  {commet.user?.userRole != ACCESS_ENUM.NOT_LOGIN &&
                    commet.user?.userRole != ACCESS_ENUM.USER && (
                      <VIPTag size={6} padding={1.5} />
                    )}
                </div>
              </div>
            </Space>
          }
          description={
            // 评论
            <div>
              <Typography.Paragraph
                style={{
                  marginTop: -15,
                  marginLeft: 10,
                  fontSize: 17,
                  minWidth: 300,
                }}
              >
                <div
                  style={{
                    marginTop: 5,
                    padding: "5px 10px", // 给回复内容添加内边距
                    backgroundColor: "#f8f9fa", // 设置轻微的背景色
                    borderRadius: "8px", // 给背景色加圆角
                  }}
                >
                  {commet.content}
                </div>
              </Typography.Paragraph>
              <Row align="middle" style={{ width: "100%", minWidth: 300 }}>
                {/* 创建时间 */}
                <Col>
                  <Typography.Paragraph
                    type="secondary"
                    ellipsis={{ rows: 1 }}
                    style={{
                      marginLeft: 10,
                      marginTop: -10,
                    }}
                  >
                    {dayjs(commet.createTime).format("YYYY-MM-DD HH:mm:ss")}
                  </Typography.Paragraph>
                </Col>

                {/* 回复按钮 */}
                <Col>
                  <div
                    onClick={() => respond(commet)} // 这里将参数传递给 respond 函数
                    style={{
                      width: 50,
                      height: 25,
                      marginTop: -25,
                      marginLeft: 10,

                      display: "flex",
                      justifyContent: "center", // 居中对齐
                      alignItems: "center", // 垂直居中
                      cursor: "pointer", // 手指样式
                      borderRadius: "4px", // 给按钮加上圆角
                      transition: "background-color 0.3s", // 平滑过渡效果
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#effcfa"; // 悬浮时的背景颜色
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "white"; // 恢复原始背景颜色
                    }}
                  >
                    回复
                  </div>
                </Col>
                    {loginUser.id==commet.user?.id&&(
                        <div>
                            {/* 删除按钮 */}
                            <Col>
                                <div
                                    onClick={() => doDelete(commet.id)} // 这里将参数传递给 respond 函数
                                    style={{
                                        width: 50,
                                        height: 25,
                                        marginTop: -25,
                                        marginLeft: 690,
                                        color: "red",
                                        display: "flex",
                                        fontWeight: "bold",
                                        justifyContent: "center", // 居中对齐
                                        alignItems: "center", // 垂直居中
                                        cursor: "pointer", // 手指样式
                                        borderRadius: "4px", // 给按钮加上圆角
                                        transition: "background-color 0.3s", // 平滑过渡效果
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = "#b4aa97"; // 悬浮时的背景颜色
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = "white"; // 恢复原始背景颜色
                                    }}
                                >
                                    删除
                                </div>
                            </Col>
                        </div>
                    )}
              </Row>
              <div>
                {commet.replies.length > 0 && (
                  <div>
                    <List
                      grid={{
                        gutter: 10, // 设置行间距为 10px
                        column: 1, // 每行显示 1 列
                      }}
                      dataSource={commet.replies?.slice(0, showCount)} // 仅显示指定数量的回复
                      renderItem={(item) => (
                        <List.Item>{RepliesView(item)}</List.Item>
                      )}
                    />
                    {commet.replies.length > 3 && showCount === 3 && (
                      <Button type="link" onClick={handleExpand}>
                        展开全部
                      </Button>
                    )}

                    {commet.replies.length > 3 && showCount > 3 && (
                      <Button type="link" onClick={handleCollapse}>
                        收起
                      </Button>
                    )}
                  </div>
                )}
              </div>
              {commentAreaId == commet.id && (
                // {commentAreaId == commentAreaId && (
                <div
                  style={{
                    padding: "16px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // 阴影效果
                    borderRadius: "8px", // 圆角边框
                    border: "1px solid #f0f0f0", // 边框颜色
                    backgroundColor: "#ffffff", // 背景颜色
                    maxWidth: "900px", // 最大宽度限制
                  }}
                >
                  <TextArea
                    placeholder={placeholder}
                    autoSize={{ minRows: 4, maxRows: 6 }}
                    value={replieCommentText} // 将 TextArea 的值绑定到 commentText 状态
                    onChange={handleReplieTextChange} // 在输入框内容变化时更新状态
                    style={{
                      width: "100%",
                      borderRadius: "6px", // 圆角
                      border: "1px solid #d9d9d9", // 输入框边框
                      padding: "8px",
                      marginBottom: "8px", // 输入框和按钮之间的间距
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div></div>
                    <Button
                      type="dashed"
                      style={{
                        borderRadius: "6px", // 圆角按钮
                        padding: "8px 16px", // 增加按钮高度
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // 按钮阴影
                        marginLeft: 715,
                      }}
                      onClick={doCancel} // 取消
                    >
                      取消
                    </Button>
                    <Button
                      type="primary"
                      style={{
                        borderRadius: "6px", // 圆角按钮
                        padding: "8px 16px", // 增加按钮高度
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // 按钮阴影
                        marginLeft: 15,
                      }}
                      onClick={doReplie} // 回复
                    >
                      回复
                    </Button>
                  </div>
                </div>
              )}
            </div>
          }
        />
      </Card>
    );
  };
  return (
    <div id="commentsPage" style={{ width: "1100px" }}>
      <Card
        title={"回答讨论"}
        style={{
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="question-bank-list">
          <Card
            style={{
              border: "none", // 去掉卡片的边框
              //  borderColor:"red",
              //  borderStyle:"solid",
            }}
            // bodyStyle={{
            //     paddingTop: 0, // 缩短上方的内边距
            //     paddingBottom: 0, // 缩短下方的内边距
            // }}
          >
            <Card.Meta
              avatar={
                <Avatar
                  src={loginUser?.userAvatar || "/assets/logo.png"}
                  size={40}
                  style={{ marginTop: 8 }}
                />
              }
              description={
                <div
                  style={{
                    padding: "16px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // 阴影效果
                    borderRadius: "8px", // 圆角边框
                    border: "1px solid #f0f0f0", // 边框颜色
                    backgroundColor: "#ffffff", // 背景颜色
                    maxWidth: "900px", // 最大宽度限制
                  }}
                >
                  <TextArea
                    placeholder="快来和大家讨论吧"
                    autoSize={{ minRows: 4, maxRows: 6 }}
                    value={commentText} // 将 TextArea 的值绑定到 commentText 状态
                    onChange={handleTextChange} // 在输入框内容变化时更新状态
                    style={{
                      width: "100%",
                      borderRadius: "6px", // 圆角
                      border: "1px solid #d9d9d9", // 输入框边框
                      padding: "8px",
                      marginBottom: "8px", // 输入框和按钮之间的间距
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div></div>
                    <Button
                      type="primary"
                      style={{
                        borderRadius: "6px", // 圆角按钮
                        padding: "8px 16px", // 增加按钮高度
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // 按钮阴影
                        marginLeft: 790,
                      }}
                      onClick={doComment} // 点击按钮时调用 doComment 函数
                    >
                      提交
                    </Button>
                  </div>
                </div>
              }
            />
          </Card>
          <List
            grid={{
              gutter: 10, // 设置行间距为 10px
              column: 1, // 每行显示 1 列
            }}
            dataSource={comments}
            renderItem={(item) => <List.Item>{CommentView(item)}</List.Item>}
          />
        </div>
      </Card>
    </div>
  );
};

export default Comments;
