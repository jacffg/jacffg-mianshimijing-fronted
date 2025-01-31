// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** addRedeem POST /api/redeem/add */
export async function addRedeemUsingPost(
  body: API.RedeemAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/redeem/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteRedeem POST /api/redeem/delete */
export async function deleteRedeemUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/redeem/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editRedeem POST /api/redeem/edit */
export async function editRedeemUsingPost(
  body: API.RedeemEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/redeem/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** exchange POST /api/redeem/exchange */
export async function exchangeUsingPost(
  body: API.ExchangeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/redeem/exchange', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getRedeemVOById GET /api/redeem/get/vo */
export async function getRedeemVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRedeemVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseRedeemVO_>('/api/redeem/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listRedeemByPage POST /api/redeem/list/page */
export async function listRedeemByPageUsingPost(
  body: API.RedeemQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageRedeem_>('/api/redeem/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listRedeemVOByPage POST /api/redeem/list/page/vo */
export async function listRedeemVoByPageUsingPost(
  body: API.RedeemQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageRedeemVO_>('/api/redeem/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyRedeemVOByPage POST /api/redeem/my/list/page/vo */
export async function listMyRedeemVoByPageUsingPost(
  body: API.RedeemQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageRedeemVO_>('/api/redeem/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateRedeem POST /api/redeem/update */
export async function updateRedeemUsingPost(
  body: API.RedeemUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/redeem/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
