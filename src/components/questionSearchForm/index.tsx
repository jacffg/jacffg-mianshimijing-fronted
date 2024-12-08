"use client";
import React, { useEffect, useState } from "react";
import { Input, message, Select, Button, Tag, Dropdown, Menu, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import {listQuestionVoByPageUsingPost, searchQuestionVoByPageUsingPost} from "@/api/questionController";
import "./index.css"; // 引入 CSS 文件

// 定义 Props 接口
interface Props
    extends Omit<React.ComponentPropsWithoutRef<"form">, "onSubmit"> {
  title?: string;
  tag?: string;
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

const QuestionRequestForm: React.FC<Props> = ({
                                                title: propTitle,
                                                tag: propTag,
                                                onSearch,
                                              }) => {
  // 使用 props 传递的 questionBankId 初始化状态
  const [title, setTitle] = useState<string | undefined>(
      propTitle !== undefined ? propTitle : undefined,
  );
  const [questionBankId, setQuestionBankId] = useState<string | undefined>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [membership, setMembership] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>(
      propTag !== undefined ? [propTag] : [],
  );
  const [questionBankList, setQuestionBankList] = useState<API.QuestionBankVO[]>([]);
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>([]);
  const [isCleared, setIsCleared] = useState(false); // 新的状态用于标识是否已清空
  const [isChanged, setIsChanged] = useState(false); // 新的状态用于标识是否已清空

  // 获取题库列表
  const getQuestionBankList = async (request: API.QuestionQueryRequest) => {
    try {
      const res = await listQuestionBankVoByPageUsingPost(request);
      setQuestionBankList(res.data?.records ?? []);
    } catch (e) {
      message.error("获取题库列表失败，" + e.message);
    }
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
    setQuestionBankId("");
    setTitle("");
    setDifficulty("");
    setMembership("");
    setTagInput("");
    setTags([]);
    setIsCleared(true); // 设置标识状态
  };

  const handleSearch = async () => {
    const request: API.QuestionQueryRequest = {
      questionBankId: questionBankId ? Number(questionBankId) : undefined,
      searchText: title || undefined,
      title:title,
      isVip: membership === "true" ? 0 : membership === "false" ? 1 : undefined,
      tags: tags.length > 0 ? tags : undefined,
      diffity: difficulty || undefined,
      pageSize:199
    };
    try {
      const res = await searchQuestionVoByPageUsingPost(request);
      console.log(res.data.records);
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

  /**
   * 监听 URL 搜索地址变化
   */
  useEffect(() => {
    setTitle(propTitle);
    setIsChanged(true);
  }, [propTitle, propTag]);

  /**
   * 监听 URL 搜索地址变化
   */
  useEffect(() => {
    if (isChanged) {
      handleSearch();
      setIsChanged(false); // 重置标识状态
    }
  }, [isChanged, handleSearch]);

  // 监听难度和会员选项
  useEffect(() => {
    handleSearch();
  }, [membership, difficulty, questionBankId]);

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
      <div id="questionSearchform" style={{ marginTop: 16, marginBottom: 16 }}>
        <form style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <Space size={18}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label style={{ marginRight: "8px" }}>题库：</label>
              <Select
                  showSearch
                  value={questionBankId}
                  onChange={(value) => setQuestionBankId(value)}
                  options={[
                    { label: "全部", value: "" }, // 添加这个选项
                    ...questionBankList.map((questionBank) => ({
                      label: questionBank.title,
                      value: questionBank.id,
                    })),
                  ]}
                  style={{ width: 165 }}
                  filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                  }
                  placeholder="请选择题库"
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label style={{ marginRight: "8px" }}>搜索：</label>
              <Input
                  placeholder="请输入搜索词"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onPressEnter={handleSearch} // 添加 onPressEnter 事件处理函数
                  style={{ width: 180 }}
              />

            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label style={{ marginRight: "8px" }}>难度：</label>
              <Select
                  value={difficulty}
                  onChange={(value) => setDifficulty(value)}
                  options={difficultyOptions}
                  style={{ width: 100 }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label style={{ marginRight: "8px" }}>会员专属：</label>
              <Select
                  value={membership}
                  onChange={(value) => setMembership(value)}
                  options={membershipOptions}
                  style={{ width: 100 }}
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
              <label style={{ marginRight: "8px", width: 70 }}>标签搜索：</label>
              <Dropdown overlay={menu}>
                <Button type="default" icon={<PlusOutlined />}>
                  添加标签
                </Button>
              </Dropdown>
              <Input
                  placeholder="直接输入标签"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onPressEnter={() => addTag(tagInput)}
                  style={{ width: 200, marginLeft: 18, height: 35 }}
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
                    gap: "6px",
                  }}
              >
                <Space>
                  <Button type="primary" onClick={handleClear}>
                    重置
                  </Button>
                  <Button type="primary" onClick={handleSearch}>
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

export default QuestionRequestForm;