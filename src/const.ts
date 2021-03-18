/*
 * @Author: Dad
 * @Date: 2021-03-10 11:48:30
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-18 17:49:14
 */
export const USER_ADMIN = 'Admin'; // 系统管理员
export const USER_ANON = 'Anon'; // 用户未登录时角色
export const USER_MANAGER = 'Manager'; // 项目经理
export const USER_ENGINEER = 'Engineer'; // 信控优化工程师

export const DEFAULT_PAGE_NUM = 1; // 默认页码
export const DEFAULT_PAGE_SIZE = 10; // 默认每页条数

export const DAY_VAL = 86400; //一天转换成秒
export const ZERO_MOMENT = 1615996801; //0点的时间戳

export const YEAR_FORMAT = 'yyyy/MM/dd';
export const MONTH_FORMAT = 'yyyy/MM';
export const DAY_FORMAT = 'HH/mm/ss';
export const DATA_FORMAT = ['yyyy/MM/dd', 'HH/mm/ss'];

export const MONTH_ALL = {
  1: '01月',
  2: '02月',
  3: '03月',
  4: '04月',
  5: '05月',
  6: '06月',
  7: '07月',
  8: '08月',
  9: '09月',
  10:'10月',
  11:'11月',
  12:'12月',
}

export const WEEK_ALL = {
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
  7: '星期日',
}

export const DATA_ALL = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: '11',
  12: '12',
  13: '13',
  14: '14',
  15: '15',
  16: '16',
  17: '17',
  18: '18',
  19: '19',
  20: '20',
  21: '21',
  22: '22',
  23: '23',
  24: '24',
  25: '25',
  26: '26',
  27: '27',
  28: '28',
  29: '29',
  30: '30',
  31: '31',
}

export const AREA_1 = 1; //片区
export const AREA_2 = 2; //路段
export const AREA_3 = 3; //离散子区

export const POSITION_NORTH = 1; //北
export const POSITION_SOUTH = 2; //东
export const POSITION_EAST = 3; //南
export const POSITION_WEST = 4; //西

//东南西北
export const POSITION_ALL ={
  [POSITION_NORTH]:'北',
  [POSITION_SOUTH]:'南',
  [POSITION_EAST]:'东',
  [POSITION_WEST]:'西',
}

//地域类型
export const AREAList = {
  [AREA_1]: '片区',
  [AREA_2]: '路段',
  [AREA_3]: '离散子区',
};

export const AREA_SHAPE_1 = 1; //十字路口
export const AREA_SHAPE_2 = 2; //T字路口
export const AREA_SHAPE_3 = 3; //一字路口

//路口形状
export const AREASHAPEList = {
  [AREA_SHAPE_1]: '十字路口',
  [AREA_SHAPE_2]: 'T字路口',
  [AREA_SHAPE_3]: '一字路口',
};

//台账二级菜单list
export const EAM_MENU_LIST = [
  {
    key: 'intersection',
    tab: '路口信息',
  },
  {
    key: 'flow',
    tab: '流量管理',
  },
  {
    key: 'light',
    tab: '信号灯管理',
  },
  {
    key: 'facilities',
    tab: '设备设施管理',
  },
  {
    key: 'environment',
    tab: '路口环境因素',
  },
  {
    key: 'fileAndImg',
    tab: '图片与文件管理',
  },
  {
    key: 'maintenance',
    tab: '路口维护记录',
  },
];

export const IMAGE_MANAGER_TYPE_1 = '航拍图';
export const IMAGE_MANAGER_TYPE_2 = '渠化图';
export const IMAGE_MANAGER_TYPE_3 = '路口设施设备图';
export const IMAGE_MANAGER_TYPE_4 = '周围环境因素图';
export const IMAGE_MANAGER_TYPE_5 = '信号机接线图';
export const IMAGE_MANAGER_TYPE_6 = '管网图';
export const IMAGE_MANAGER_TYPE_7 = '路口流量图';

// 图片管理类型
export const IMAGE_MANAGER_TYPE = {
  [IMAGE_MANAGER_TYPE_1]: '航拍图',
  [IMAGE_MANAGER_TYPE_2]: '渠化图',
  [IMAGE_MANAGER_TYPE_3]: '路口设施设备图',
  [IMAGE_MANAGER_TYPE_4]: '周围环境因素图',
  [IMAGE_MANAGER_TYPE_5]: '信号机接线图',
  [IMAGE_MANAGER_TYPE_6]: '管网图',
  [IMAGE_MANAGER_TYPE_7]: '路口流量图',
};
export const FILE_MANAGER_TYPE_1 = '类型一';
export const FILE_MANAGER_TYPE_2 = '类型二';
export const FILE_MANAGER_TYPE_3 = '类型三';
export const FILE_MANAGER_TYPE_4 = '类型四';
export const FILE_MANAGER_TYPE_5 = '类型五';

// 图片管理类型
export const FILE_MANAGER_TYPE = {
  [FILE_MANAGER_TYPE_1]: '类型一',
  [FILE_MANAGER_TYPE_2]: '类型二',
  [FILE_MANAGER_TYPE_3]: '类型三',
  [FILE_MANAGER_TYPE_4]: '类型四',
  [FILE_MANAGER_TYPE_5]: '类型五',
};

// 舆情类型
export const OPINION_TYPE = [
  {value: '红绿灯配时', key: 1},
  {value: '放行方式', key: 2},
  {value: '设备故障', key: 3},
  {value: '行人过街时间', key: 4},
  {value: '配时方案与时段波动', key: 5},
  {value: '绿波效果', key: 6},
  {value: '其他', key: 7},
];

//巡检二级菜单list
export const PATROL_MENU_LIST = [
  {
    key: 'task',
    tab: '巡检任务',
  },
  {
    key: 'intersectionPatrol',
    tab: '路口巡检',
  },
  {
    key: 'pathPatrol',
    tab: '路径巡检',
  },
  {
    key: 'pathMaintain',
    tab: '路线维护',
  },
];

/** 状态 */
export const TYPE_1 = 'Success';
export const TYPE_2 = 'Error';

export const TYPE_ALL = {
  [TYPE_1]: '成功',
  [TYPE_2]: '失败',
};

// 时间计划
export const TIME_PLAN = [
  {value:'关灯', key:1, color:'#bfbfbf'},
  {value:'黄闪', key:2, color:'#fdff00'},
  {value:'全红', key:3, color:'#ff0000'},
];

// 天气
export const WEATHER_LIST = [
  {value: '晴', key: 1},
  {value: '多云', key: 2},
  {value: '霾', key: 3},
  {value: '阴', key: 4},
  {value: '小雨', key: 5},
  {value: '中雨', key: 6},
  {value: '大雨', key: 7},
  {value: '暴雨', key: 8},
  {value: '特大暴雨', key: 9},
  {value: '阵雨', label: 10},
  {value: '冻雨', key: 11},
  {value: '雷阵雨', key: 12},
  {value: '雷阵雨', key: 13},
  {value: '小雪', key: 14},
  {value: '中雪', key: 15},
  {value: '大雪', key: 16},
  {value: '阵雪', key: 17},
  {value: '雨夹雪', key: 18},
];

// 巡检方式
export const PARTOL_WAY = [
  {value: '视屏', key: 1},
  {value: '现场', key: 2},
  {value: '信控平台', key: 3},
];

// 设备状态
export const EQUIPMENT_STATUS = [
  {value: '正常', key: 1},
  {value: '不正常', key: 2},
];

// 审核状态
export const AUDIT_STATUS = [
  {value: '未提交', key: 1},
  {value: '审核中', key: 2},
  {value: '审核通过', key: 3},
  {value: '已驳回', key: 4},
];