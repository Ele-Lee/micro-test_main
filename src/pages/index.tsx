import React, { useEffect } from 'react';
import styles from './index.less';
import { MicroApp } from 'umi';

export default () => {
  useEffect(() => {}, []);

  return (
    <div>
      <h1 className={styles.title}>fater Page index</h1>
      <MicroApp name="subapp1" />
      <MicroApp name="subapp2" />
    </div>
  );
};
