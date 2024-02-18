import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function querySuper(url, params?: TableListParams) {
  return request(url, {
    params,
  });
}

export async function removeSomeSuper(url, params: { key: number[] }) {
  return request(url, {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function removeSuper(url, params: { key: number[] }) {
  return request(url, {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addSuper(url, params: TableListItem) {
  return request(url, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateSuper(url, params: TableListParams) {
  return request(url, {
    method: 'PUT',
    data: {
      ...params,
      method: 'update',
    },
  });
}
