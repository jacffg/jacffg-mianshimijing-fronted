import React from "react";
import "./index.css";
import { Space } from "antd";

/**
 * 全局底部栏组件
 * @constructor
 */
export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="global-footer">
      <div>© {currentYear} 面试刷题平台</div>
      <div>
          <Space size={10}>
              <a href="https://github.com/jacffg" target="_blank">
                  作者:码羊
              </a>
              <div >|</div>
              <a href="https://beian.miit.gov.cn" target="_blank">
                  赣ICP备2024051536号
              </a>
          </Space>

      </div>
    </div>
  );
}
