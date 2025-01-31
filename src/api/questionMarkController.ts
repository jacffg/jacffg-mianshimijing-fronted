// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** addQuestionMark POST /api/questionMark/add */
export async function addQuestionMarkUsingPost(
  body: API.QuestionMarkAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/questionMark/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteQuestionMark POST /api/questionMark/delete */
export async function deleteQuestionMarkUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/questionMark/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editQuestionMark POST /api/questionMark/edit */
export async function editQuestionMarkUsingPost(
  body: API.QuestionMarkEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/questionMark/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getQuestionMarkVOById GET /api/questionMark/get/vo */
export async function getQuestionMarkVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionMarkVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseQuestionMarkVO_>('/api/questionMark/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getMark GET /api/questionMark/getMark */
export async function getMarkUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMarkUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseQuestionMarkVO_>('/api/questionMark/getMark', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listQuestionMarkByPage POST /api/questionMark/list/page */
export async function listQuestionMarkByPageUsingPost(
  body: API.QuestionMarkQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestionMark_>('/api/questionMark/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listQuestionMarkVOByPage POST /api/questionMark/list/page/vo */
export async function listQuestionMarkVoByPageUsingPost(
  body: API.QuestionMarkQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestionMarkVO_>('/api/questionMark/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyQuestionMarkVOByPage POST /api/questionMark/my/list/page/vo */
export async function listMyQuestionMarkVoByPageUsingPost(
  body: API.QuestionMarkQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestionMarkVO_>('/api/questionMark/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateQuestionMark POST /api/questionMark/update */
export async function updateQuestionMarkUsingPost(
  body: API.QuestionMarkUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/questionMark/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
