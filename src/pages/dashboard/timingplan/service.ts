import request from '@/utils/request';

export async function updateControlPlan(
  intersectionId: string,controlPlanId: string,
  controlPlan: any,
  phaseList: any) {
    return request(`/api/biz/intersection/${intersectionId}/control-plan/${controlPlanId}`, {
      method: 'PATCH',
      data: { 
        controlPlan,
        phaseList
      }
    });
}

export async function queryControlPlan(intersectionId: string ) {
    return request(`/api/biz/intersection/${intersectionId}?queries=controlPlanList`);
}
export async function querySubControlPlan(intersectionId: string,controlPlanId: string ) {
  return request(`/api/biz/intersection/${intersectionId}/control-plan/${controlPlanId}`);
}

export async function addControlPlan(intersectionId: string,data: any ) {
  return request(`/api/biz/intersection/${intersectionId}/control-plan/`,{
    method: 'POST',
    data
  });
}

export async function deleteControlPlan(intersectionId: string,controlPlanId: string ) {
  return request(`/api/biz/intersection/${intersectionId}/control-plan/${controlPlanId}`,{method: 'DELETE'  });
}

export async function savePlanSchedule(intersectionId: string,data: any ) {
  return request(`/api/biz/intersection/${intersectionId}/plan-schedule/`,{
    method: 'POST',
    data
  });
}

export async function delPlanSchedule(intersectionId: string,planScheduleId: string ) {
  return request(`/api/biz/intersection/${intersectionId}/plan-schedule/${planScheduleId}`,{
    method: 'DELETE'
  });
}
export async function updataPlanSchedule(intersectionId: string,planScheduleId: string,data: any ) {
  return request(`/api/biz/intersection/${intersectionId}/plan-schedule/${planScheduleId}`,{
    method: 'PATCH',
    data
  });
}

export async function queryPlanSchedule( intersectionId: any) {
  return request(`/api/biz/intersection/${intersectionId}?queries=planScheduleList`);
}

export async function queryControlStrategyList( intersectionId: any) {
  return request(`/api/biz/intersection/${intersectionId}?queries=controlStrategyList`);
}

export async function saveControlStrategy(intersectionId: string,data: any ) {
  return request(`/api//biz/intersection/${intersectionId}/control-strategy/`,{
    method: 'POST',
    data
  });
}
export async function delControlStrategy(intersectionId: string,controlStrategyId: string ) {
  return request(`/api/biz/intersection/${intersectionId}/control-strategy/${controlStrategyId}`,{
    method: 'DELETE'
  });
}
export async function updataControlStrategy(intersectionId: string,controlStrategyId: string,data: any ) {
  return request(`/api/biz/intersection/${intersectionId}/control-strategy/${controlStrategyId}`,{
    method: 'PATCH',
    data
  });
}

export async function queryControlPlanList( intersectionId: any) {
  return request(`/api/biz/intersection/${intersectionId}?queries=controlPlanList`);
}










