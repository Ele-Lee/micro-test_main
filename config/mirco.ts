const app: AppOptions[] = [
  {
    title: '子应用Aitem1',
    name: 'subapp1',
    entry_dev: '//localhost:8100',
    icon: 'UserOutlined',
    prefetch: true,
  },
  // {
  //   title: '子应用B',
  //   name: 'subapp2',
  //   entry_dev: '//localhost:8200',
  //   icon: 'UserOutlined',
  //   prefetch: true,
  // },
  {
    title: '人员管理',
    name: 'ram',
    entry_dev: '//localhost:8101',
    icon: 'UserOutlined',
    prefetch: true,
  },
];
interface AppOptions {
  title: string;
  name: string;
  entry_dev: string;
  icon?: React.ReactNode;
  prefetch: boolean;
}

export default app;
