// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** doQuestionFavour POST /api/question_favour/ */
export async function doQuestionFavourUsingPost(
  body: API.QuestionFavourAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/question_favour/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getisCollect GET /api/question_favour/getisCollect */
export async function getisCollectUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getisCollectUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/question_favour/getisCollect', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listFavourQuestionByPage POST /api/question_favour/list/page */
export async function listFavourQuestionByPageUsingPost(
  body: API.QuestionFavourQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestion_>('/api/question_favour/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyFavourQuestionByPage POST /api/question_favour/my/list/page */
export async function listMyFavourQuestionByPageUsingPost(
  body: API.QuestionQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestionVO_>('/api/question_favour/my/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
