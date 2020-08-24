import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

if (window !== undefined) {
  window.__isMainApp__ = true;
}

export function rootContainer(container: React.ReactNode) {
  return (
    <ConfigProvider prefixCls="portalmain" locale={zhCN}>
      {container}
    </ConfigProvider>
  );
}
