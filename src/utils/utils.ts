/*
 * @Author: Dad
 * @Date: 2021-03-10 16:35:45
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-20 18:22:59
 */
import { parse } from 'querystring';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

// 时分转时间戳
export const dateTime_to_timestamp = (date: any) => {
  var time = date.split(' ')[1]
  var s = 0;
  var hour = time.split(':')[0]
  var min = time.split(':')[1]
  s = (Number(hour * 3600) + Number(min * 60)) * 1000;
  return s;
}

// 时间戳转时分
export const timestamp_to_dateTime = (date: any) => {
  const time = Number(date) / 1000;
  const h = Math.floor(time / 3600);
  const m = Math.floor((time % 3600) / 60);
  const hh = h < 10 ? `0${h}` : h;
  const mm = m < 10 ? `0${m}` : m;
  return `${hh}:${mm}`;
};

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/');
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    return value.toString().padStart(2, '0');
  });
  return time_str;
}

/**
 *
 * @param {*} data  时间戳
 */
export function toHHmmss(data: any) {
  const hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = parseInt((data % (1000 * 60)) / 1000);
  const s =
    (hours < 10 ? '0' + hours : hours) +
    ':' +
    (minutes < 10 ? '0' + minutes : minutes) +
    ':' +
    (seconds < 10 ? '0' + seconds : seconds);
  return s;
}
/**
 *  时间转 时间戳
 * @param {*} date
 */
export function toHHmmssTime(date: any) {
  return (
    date.getHours() * 60 * 60 * 1000 + date.getMinutes() + 60 * 1000 + date.getSeconds() * 1000
  );
}

export function base64ToBlob(urlData: string) {
  const arr = urlData?.split(',');
  const mime = arr[0]?.match(/:(.*?);/)[1] || 'image/png';
  const bytes = window.atob(arr[1]); // 去掉url的头，并转化为byte
  // 处理异常,将ascii码小于0的转换为大于0
  const ab = new ArrayBuffer(bytes.length);
  // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
  let ia = new Uint8Array(ab);

  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }

  return new Blob([ab], {
    type: mime,
  });
}
