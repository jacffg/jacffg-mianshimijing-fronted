"use client";
import { Tag } from "antd";

/**
 * VIP 标签组件
 * @param props
 * @constructor
 */
const VIPTag = () => {
  const tagStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px", // 标签之间的间距
    margin: "16px 0", // 上下外边距
  };

  const customTagStyle = {
    backgroundColor: "#ffb902", // 背景颜色
    color: "#ffffff", // 文字颜色
    border: "none", // 移除默认边框
    padding: "4px 8px", // 内边距
    fontSize: "16px", // 字体大小
    transition: "background-color 0.3s, color 0.3s", // 平滑过渡效果
  };

  return (
      <div style={tagStyle}>
        <Tag
            key={"vip"}
            style={customTagStyle}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = customTagStyle.backgroundColor;
              e.currentTarget.style.color = customTagStyle.color;
            }}
        >
          VIP
        </Tag>
      </div>
  );
};

export default VIPTag;