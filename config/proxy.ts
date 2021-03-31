/*
 * @Author: Dad
 * @Date: 2021-03-16 18:03:22
 * @LastEditTime: 2021-03-24 15:59:12
 * @LastEditors: Dad
 * @Description: 
 */
/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/': {
      // target: 'http://192.168.31.72:9080',
      target: 'http://116.63.45.33:8888',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
