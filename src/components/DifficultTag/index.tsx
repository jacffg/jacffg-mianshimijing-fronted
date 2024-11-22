"use client";
import { Tag } from "antd";

interface Props {
  difficult?: "easy" | "middle" | "hard"; // 难度等级
}

/**
 * 难度 标签组件
 * @param props
 * @constructor
 */
const DIfficutyTag = ({ difficult }: Props) => {
  const tagStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px", // 标签之间的间距
    margin: "16px 0", // 上下外边距
  };

  // 根据 'difficult' prop 返回不同的标签样式
  const getTagStyle = () => {
    switch (difficult) {
      case "easy":
        return {
          backgroundColor: "#4CAF50", // 绿色表示 easy
          color: "#ffffff", // 文字颜色为白色
        };
      case "middle":
        return {
          backgroundColor: "#ffb902", // 橙色表示 middle
          color: "#ffffff", // 文字颜色为白色
        };
      case "hard":
        return {
          backgroundColor: "#ea2e21", // 红色表示 hard
          color: "#ffffff", // 文字颜色为白色
        };
      default:
        return {
          backgroundColor: "#ffb902", // 默认是橙色
          color: "#ffffff",
        };
    }
  };

  const customTagStyle = {
    ...getTagStyle(), // 合并获取的标签样式
    border: "none", // 去掉默认边框
    padding: "4px 8px", // 内边距
    fontSize: "16px", // 字体大小
    transition: "background-color 0.3s, color 0.3s", // 平滑过渡效果
  };

  // 根据 'difficult' 设置中文标签内容
  let difficultyText = "";
  switch (difficult) {
    case "easy":
      difficultyText = "简单";
      break;
    case "middle":
      difficultyText = "中等";
      break;
    case "hard":
      difficultyText = "困难";
      break;
    default:
      difficultyText = "简单"; // 默认设置为 "简单"
  }

  return (
      <div style={tagStyle}>
        <Tag
            key={"difficulty-tag"}
            style={customTagStyle}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = customTagStyle.backgroundColor;
              e.currentTarget.style.color = customTagStyle.color;
            }}
        >
          {difficultyText} {/* 显示中文难度 */}
        </Tag>
      </div>
  );
};

export default DIfficutyTag;
