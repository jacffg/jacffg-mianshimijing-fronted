// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** getQuestionFavourStatict GET /api/statistic/question/favour_count */
export async function getQuestionFavourStatictUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionFavourStatictUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListQuestionFavourCountDTO_>(
    '/api/statistic/question/favour_count',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** getQuestionViewNumStatict GET /api/statistic/question/viewNum_count */
export async function getQuestionViewNumStatictUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionViewNumStatictUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListQuestionViewCountDTO_>(
    '/api/statistic/question/viewNum_count',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
