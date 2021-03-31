import request from '@/utils/request';

export async function updateControlPlan(
  intersectionId: string,
  controlPlanId: string,
  controlPlan: any,
  phaseList: any) {
    debugger
    return request(`/api/biz/intersection/${intersectionId}/control-plan/${controlPlanId}`, { // 编辑信号配时方案
      method: 'PATCH',
      data: { 
        controlPlan,
        phaseList
      }
    });
}

export async function queryControlPlan(intersectionId: string ) { // 获取信号配时方案
  return request(`/api/biz/intersection/${intersectionId}?queries=controlPlanList`);
}

export async function querySubControlPlan(intersectionId: string,controlPlanId: string ) {
  return request(`/api/biz/intersection/${intersectionId}/control-plan/${controlPlanId}`);
}

export async function addControlPlan(intersectionId: string,data: any ) { //新增信号配时方案
  debugger
  return request(`/api/biz/intersection/${intersectionId}/control-plan/`,{
    method: 'POST',
    data
  });
}

export async function deleteControlPlan(intersectionId: string,controlPlanId: string ) { // 删除信号配时方案
  return request(`/api/biz/intersection/${intersectionId}/control-plan/${controlPlanId}`,{
    method: 'DELETE'
  });
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

export async function queryTimePlanList( intersectionId: any) { // 查询日计划列表
  return request(`/api/biz/intersection/${intersectionId}?queries=dailyPlanList`);
}

export async function saveTimePlanApi(intersectionId: string, data: any ) { //新增日计划
  return request(`/api/biz/intersection/${intersectionId}/daily-plan/`,{
    method: 'POST',
    data
  });
}

export async function updataTimePlanApi(intersectionId: string,dailyPlanId: any, data: any ) { //更改日计划
  return request(`/api/biz/intersection/${intersectionId}/daily-plan/${dailyPlanId}`,{
    method: 'PATCH',
    data
  });
}

export async function deteleTimePlanApi(intersectionId: string,dailyPlanId: any ) { // 删除日计划
  return request(`/api/biz/intersection/${intersectionId}/daily-plan/${dailyPlanId}`,{
    method: 'DELETE'
  });
}

export async function getTimePlan( intersectionId: any, dailyPlanId: any) { // 查询单个日计划详情
  return request(`/api/biz/intersection/${intersectionId}/daily-plan/${dailyPlanId}`);
}










