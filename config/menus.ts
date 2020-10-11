const routes: RoutesOptions[] = [{ title: '主的menu', path: '/dashboard' }];
interface RoutesOptions {
  title: string;
  name?: string;
  entry_dev?: string;
  path?: string;
  icon?: React.ReactNode;
  children?: RoutesOptions[];
}

export default routes;
