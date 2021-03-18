import request from '@/utils/request';

export async function queryList() {
  return request('/api/biz/intersection/sys-info');
}

export async function queryEnvFactor(params: any) {
  return request(`/api/biz/intersection/${params.intersectionId}/env-factor/query`, {
    method: 'POST'
  });
}

export async function deleteEnvFactor(params: any) {
  return request(`/api/biz/intersection/${params.intersectionId}/env-factor/${params.id}`, {
    method: 'DELETE'
  });
}

export async function fileList(businessId: string,businessType: any) {
  return request(`/api/file/list?businessId=${businessId}&businessType=${businessType}`);
}

export async function saveEnvFactor(intersectionId: string,data: any) {
  return request(`/api/biz/intersection/${intersectionId}/env-factor/`, {
    method: 'POST',
    data
  });
}

export async function updateEnvFactor(intersectionId: string,data: any) {
  return request(`/api/biz/intersection/${intersectionId}/env-factor/${data.id}`, {
    method: 'PATCH',
    data
  });
}

export async function queryFilePage(data: any) {
  return request(`/api/file/page/`, {
    method: 'POST',
    data
  });
}
export async function delFile(id: string) {
  return request(`/api/file/${id}`, {
    method: 'DELETE'
  });
}
