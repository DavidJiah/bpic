import request from '@/utils/request';


export async function queryFilePage(data: any) {
  return request(`/api/file/page/`, {
    method: 'POST',
    data
  });
}

export async function queryIntersectionList() {
  return request('/api/biz/intersection/sys-info');
}

export async function queryIntersectionByid(intersectionId: string) {
  return request(`/api/biz/intersection/${intersectionId}/query`);
}

export async function queryEquipmentByIntersectionId(intersectionId: string) {
  return request(`/api/biz/intersection/${intersectionId}/equipment/details`);
}
export async function saveIntersection(data: any) {
  return request(`/api/biz/intersection/`, {
    method: 'POST',
    data 
  }); 
}
export async function queryIntersection() {
  return request(`/api/biz/intersection/original-info`); 
}


export async function saveEntranceExit(intersectionId: string,data: any) {
  return request(`/api/biz/intersection/${intersectionId}/entrance-exit`, {
    method: 'POST',
    data 
  }); 
}


