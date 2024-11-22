"use client";
import { Tag } from "antd";
import { useRouter } from "next/navigation";

interface Props {
    tagList?: string[];
}

/**
 * 标签列表组件
 * @param props
 * @constructor
 */
const TagList = (props: Props) => {
    const { tagList = [] } = props;
    const router = useRouter();

    const tagListStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px', // 标签之间的间距
        margin: '16px 0', // 上下外边距
    };

    const customTagStyle = {
        backgroundColor: '#c1bfc4', // 背景颜色
        color: '#111010', // 文字颜色
        border: 'none', // 移除默认边框
        borderRadius: '4px', // 圆角
        padding: '4px 8px', // 内边距
        fontSize: '14px', // 字体大小
        cursor: 'pointer', // 鼠标悬停时变为手指形状
        transition: 'background-color 0.3s, color 0.3s', // 平滑过渡效果
    };

    const customTagHoverStyle = {
        backgroundColor: 'rgb(145,165,220)', // 悬浮时的背景颜色
    };

    const handleTagClick = (tag: string) => {
        // 在这里实现跳转逻辑，假设 tag 值是目标路径的一部分
        router.push(`/questions?tag=${tag}`); // 根据需要修改跳转路径
    };

    return (
        <div style={tagListStyle}>
            {tagList.map((tag) => (
                <Tag
                    key={tag}
                    style={customTagStyle}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = customTagHoverStyle.backgroundColor}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = customTagStyle.backgroundColor}
                    onClick={() => handleTagClick(tag)} // 点击标签时触发跳转
                >
                    {tag}
                </Tag>
            ))}
        </div>
    );
};

export default TagList;
