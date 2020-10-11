import { defineConfig } from 'umi';
// @ts-ignore
import getSymlinks from 'get-symlinks';
import * as fs from 'fs';
import { apps } from './config';
import { routes as routesConfig } from './config';

export default defineConfig({
  layout: false,
  dva: {
    hmr: true,
  },
  mlayout: {
    routesConfig,
  },
  plugins: ['../../../micro-layout/lib'],
  qiankun: {
    master: {
      // 注册子应用信息
      apps: apps.map(item => ({ name: item.name, entry: item.entry_dev })),
      sandbox: { strictStyleIsolation: true },
      prefetch: 'all',
    },
  },
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [{ path: '/', component: '@/pages/index' }],
  chainWebpack: (config, { webpack }) => {
    let symlinks = getSymlinks.sync(['./node_modules/**'], {
      onlyDirectories: true,
      deep: 1,
    });
    symlinks.forEach((path: string) => {
      let _path = fs.realpathSync(path);
      config.module.rule('ts-in-node_modules').include.add(_path);
    });
  },
  externals: {
    '@grfe/micro-store': 'window["@grfe/micro-store"]',
  },
  headScripts: [
    { src: 'https://static.guorou.net/lib/micro_store@0.0.1-beta2.js' },
  ],
  lessLoader: {},
  extraBabelPlugins: [
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false,
      },
    ],
  ],
  favicon:
    'https://p.geitu.net/15/6ggS9_.jpg?x-oss-process=image/resize,w_256,limit_1',
  // favicon: 'https://i.52112.com/icon/jpg/256/20190116/28061/1395736.jpg',
  proxy: {
    '/portalapi': {
      target: 'http://portal.test.guorou.net',
      changeOrigin: true,
    },
  },
});
