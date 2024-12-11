"use client";
import React, { useEffect, useState } from "react";
import {
  Input,
  message,
  Select,
  Button,
  Tag,
  Dropdown,
  Menu,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import {listQuestionVoByPageSentinelUsingPost, listQuestionVoByPageUsingPost} from "@/api/questionController";

// 定义 Props 接口
interface Props
  extends Omit<React.ComponentPropsWithoutRef<"form">, "onSubmit"> {
  questionBankId?: number;
  onSearch: (questions: API.QuestionVO[]) => void;
}

const difficultyOptions = [
  { value: "", label: "全部" },
  { value: "easy", label: "简单" },
  { value: "middle", label: "中等" },
  { value: "hard", label: "困难" },
];

const membershipOptions = [
  { value: "", label: "全部" },
  { value: "true", label: "是" },
  { value: "false", label: "否" },
];

const predefinedTags = [
  "JavaScript",
  "基础",
  "React",
  "TypeScript",
  "HTML",
  "CSS",
];

const BankQuestionRequestForm: React.FC<Props> = ({
  questionBankId: propQuestionBankId,
  onSearch,
}) => {
  // 使用 props 传递的 questionBankId 初始化状态
  const [questionBankId, setQuestionBankId] = useState<string | undefined>(
    propQuestionBankId !== undefined
      ? propQuestionBankId.toString()
      : undefined,
  );
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [membership, setMembership] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [questionBankList, setQuestionBankList] = useState<
    API.QuestionBankVO[]
  >([]);
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>([]);
  const [isCleared, setIsCleared] = useState(false); // 新的状态用于标识是否已清空
  // 获取题库列表
  const getQuestionBankList = async (request: API.QuestionQueryRequest) => {
    try {
      const res = await listQuestionBankVoByPageUsingPost(request);
      setQuestionBankList(res.data?.records ?? []);
      // 调用父组件传递的回调函数，将结果传递出去
    } catch (e) {
      message.error("获取题库列表失败，" + e.message);
    }
    ``;
  };

  useEffect(() => {
    getQuestionBankList({
      pageSize: 200,
      sortField: "createTime",
      sortOrder: "descend",
    });
  }, []);

  const handleClear = () => {
    // 设置状态
    setTitle("");
    setDifficulty("");
    setMembership("");
    setTagInput("");
    setTags([]);
    setIsCleared(true); // 设置标识状态
  };

  const handleSearch = async () => {
    const request: API.QuestionQueryRequest = {
      sortField: "createTime",
      sortOrder: "descend",
      questionBankId: questionBankId ? Number(questionBankId) : undefined,
      title: title || undefined,
      isVip: membership === "true" ? 0 : membership === "false" ? 1 : undefined,
      tags: tags.length > 0 ? tags : undefined,
      diffity: difficulty || undefined,
    };
    try {
      const res = await listQuestionVoByPageSentinelUsingPost(request);
      setQuestionList(res.data?.records ?? []);
      onSearch(res.data?.records ?? []);
    } catch (e) {
      message.error("获取题库列表失败，" + e.message);
    }
  };

  useEffect(() => {
    if (isCleared) {
      handleSearch();
      setIsCleared(false); // 重置标识状态
    }
  }, [isCleared, handleSearch]);

  //监听难度和会员选项
  useEffect(() => {
    handleSearch();
  }, [membership, difficulty]);

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput(""); // 清空输入框
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const menu = (
    <Menu>
      {predefinedTags.map((tag) => (
        <Menu.Item key={tag} onClick={() => addTag(tag)}>
          {tag}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div id="questionform" style={{ marginTop: 1, marginBottom: 16 }}>
      <form style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <Space size={18}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ marginRight: "8px", fontSize: 18 }}>题目：</label>
            <Input
              placeholder="请输入题目"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: 260, height: 40 }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label
              style={{ marginRight: "8px", marginLeft: "16px", fontSize: 18 }}
            >
              难度：
            </label>
            <Select
              value={difficulty}
              onChange={(value) => setDifficulty(value)}
              options={difficultyOptions}
              style={{ width: 150, height: 40 }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label
              style={{ marginRight: "8px", marginLeft: "16px", fontSize: 18 }}
            >
              会员专属：
            </label>
            <Select
              value={membership}
              onChange={(value) => setMembership(value)}
              options={membershipOptions}
              style={{ width: 150, height: 40 }}
            />
          </div>
        </Space>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: 720,
            gap: 25,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <label
              style={{
                marginRight: "16px",
                marginLeft: "8px",
                fontSize: 18,
                width: 90,
              }}
            >
              标签搜索：
            </label>
            <Dropdown overlay={menu}>
              <Button
                type="default"
                icon={<PlusOutlined />}
                style={{
                  padding: "10px 20px", // 调整按钮内边距
                  fontSize: "16px", // 调整按钮内文字大小
                  height: "40px", // 调整按钮高度
                }}
              >
                添加标签
              </Button>
            </Dropdown>
            <Input
              placeholder="直接输入标签"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onPressEnter={() => addTag(tagInput)}
              style={{ width: 250, marginLeft: 18, height: 40 }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                padding: "8px",
                backgroundColor: "#f0f2f5",
                borderRadius: "4px",
                border: "1px solid #d9d9d9",
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
                marginRight: "20px",
                minWidth: "250px",
                maxWidth: "250px",
                minHeight: "40px",
              }}
            >
              {tags.map((tag) => (
                <Tag
                  key={tag}
                  closable
                  onClose={() => removeTag(tag)}
                  style={{ margin: "4px" }}
                >
                  {tag}
                </Tag>
              ))}
            </div>
            <div
              style={{
                gap: "60px",
              }}
            >
              <Space size={20}>
                <Button
                  type="primary"
                  style={{
                    padding: "10px 20px", // 调整按钮内边距
                    fontSize: "16px", // 调整按钮内文字大小
                    height: "40px", // 调整按钮高度
                  }}
                  onClick={handleClear}
                >
                  重置
                </Button>
                <Button
                  type="primary"
                  style={{
                    padding: "10px 20px", // 调整按钮内边距
                    fontSize: "16px", // 调整按钮内文字大小
                    height: "40px", // 调整按钮高度
                  }}
                  onClick={handleSearch}
                >
                  搜索
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BankQuestionRequestForm;
