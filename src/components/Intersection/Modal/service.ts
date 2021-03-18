import request from '@/utils/request';
 
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
  return request(`/api/biz/intersection/${intersectionId}/entrance-exit/`, {
    method: 'POST',
    data 
  }); 
}


