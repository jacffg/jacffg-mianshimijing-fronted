"use client";
import { Tag } from "antd";

/**
 * VIP 标签组件
 * @param props
 * @constructor
 */
interface Props {
    size?: number; // 字体大小
    padding?:number//边距
}
const VIPTag = (props:Props) => {
    const {size=16,padding = 4} = props;

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
      padding: `${padding}px ${padding * 2}px`, // 动态内边距
    fontSize: size, // 字体大小
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