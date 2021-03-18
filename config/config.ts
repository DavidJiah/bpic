/*
 * @Author: Dad
 * @Date: 2021-03-08 16:42:19
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-13 14:17:58
 */
// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import { router } from './routerConfig';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {
    dark: true, // 开启暗色主题
  },
  dva: {
    hmr: true,
  },
  define: {
    'process.env.IMAGE_URL': 'http://116.63.45.33:8888/file/download/',
  },
  history: {
    type: 'hash',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: router,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  base: '/bpic/',
  publicPath: '/bpic/',
  outputPath: 'bpic',
});
