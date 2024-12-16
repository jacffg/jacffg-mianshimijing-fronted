import {Button, Card} from "antd";
import {LockOutlined} from "@ant-design/icons";
import React from "react";
import {useRouter} from "next/navigation";

interface Props {
    questionBankId?: number; // 可选参数
    questionid: number; // 必传参数
}

/**
 * 未登录无权限访问的页面
 * @constructor
 */
const Loginforbidden: React.FC<Props> = ({questionBankId, questionid}) => {
    const router = useRouter();
    const doClick = () => {
        if(questionBankId) {
            router.push(
                `/user/login?url=/bank/${questionBankId}/question/${questionid}`,
            );
        } else {
            router.push(`/user/login?url=/question/${questionid}`);
        }
    }
    return (
        <div style={{width: "1200px"}}>
            <Card
                style={{
                    textAlign: "center",
                    padding: "32px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                <div style={{fontSize: "48px", color: "#aaa", marginBottom: "8px"}}>
                    <LockOutlined style={{fontSize: "60px", color: "#aaa"}}/>
                </div>
                <div
                    style={{
                        fontSize: "32px",
                        fontWeight: "bold",
                        marginBottom: "16px",
                        color: "#aaa",
                    }}
                >
                    登录后可查看答案
                </div>
                <Button
                    type="primary"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                    }}
                    onClick={doClick}
                >
                    去登录
                </Button>
            </Card>
        </div>
    );
};

export default Loginforbidden;
