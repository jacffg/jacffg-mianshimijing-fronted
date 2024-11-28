"use client";
import { Flex, List, message, Space } from "antd";
import "./index.css";
import React, { useEffect, useState, useRef } from "react";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { FireOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import {getHotTagsUsingGet} from "@/api/questionController";

interface Props {}

const HotTags = (props: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [hotTagsVOs, setHotTagsVOs] = useState<API.HotTagsVO[]>([]);
  const router = useRouter();

  const getHotTags =  async () => {
    try {
      const res =   await getHotTagsUsingGet();
        const list = res.data ?? [];
        setHotTagsVOs(list);

    } catch (e) {
      message.error("获取热门标签失败，" + e.message);
    }
  };

  useEffect(() => {
    getHotTags();
  }, []); // 空依赖数组意味着仅在组件挂载时请求一次

  return (
    <div>
      <div
        style={{
          width: 320,
          height: 70,
          marginTop: 0,
          background: "linear-gradient(to bottom, #ffe886, white)",
        }}
      ></div>
      <div
        style={{
          width: 290,
          height: 50,
          marginLeft: 10,
          marginTop: -60,
        }}
      >
        <Flex justify="space-between" align="center">
          <Title level={4}>热门标签榜</Title>
          <Link href="/">更多</Link>
        </Flex>
      </div>
      <div>
        <List
          dataSource={hotTagsVOs}
          renderItem={(item) => (
            <List.Item
              onClick={() => router.push(`/questions?tag=${item}`)}
              className="hoverable-item"
            >
              <div>
                <Flex
                  style={{ justifyContent: "space-between", width: "100%" }}
                >
                  <div
                    style={{
                      marginLeft: 12,
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "200px",
                      minWidth: "200px",
                    }}
                  >
                    {item.tag}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "25px",
                    }}
                  >
                    <Space size={5}>
                      <div>
                        <FireOutlined />
                      </div>
                      <span>{item.hotNum}</span>
                    </Space>
                  </div>
                </Flex>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
export default HotTags;
