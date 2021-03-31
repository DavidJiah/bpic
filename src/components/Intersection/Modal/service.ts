import request from '@/utils/request';
 
export async function saveIntersection(data: any) {
  return request(`/api/biz/intersection/`, {
    method: 'POST',
    data 
  }); 
}

export async function updateIntersection(intersectionId:any,data: any) {
  return request(`/api/biz/intersection/${intersectionId}`, {
    method: 'PATCH',
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

export async function updateEntranceExit(intersectionId: string,data: any) {
  return request(`/api/biz/intersection/${intersectionId}/entrance-exit/`, {
    method: 'PUT',
    data
  });
}

export async function getEntranceExit(intersectionId: string) {
  return request(`/api/biz/intersection/${intersectionId}/entrance-exit/`, {
    method: 'GET',
  });
}

