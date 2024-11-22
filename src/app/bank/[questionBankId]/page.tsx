import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import BankPageClient from "@/app/bank/[questionBankId]/components";

export default async function BankPage({ params }: { params: { questionBankId: string } }) {
    const { questionBankId } = params;
    let bank = undefined;

    try {
        const res = await getQuestionBankVoByIdUsingGet({
            id: questionBankId,
            needQueryQuestionList: true,
            pageSize: 200,
        });
        bank = res.data;
    } catch (e) {
        console.error("获取题库列表失败: ", e.message);
    }

    if (!bank) {
        return <div>获取题库详情失败，请刷新重试</div>;
    }

    return <BankPageClient bank={bank} />;
}
