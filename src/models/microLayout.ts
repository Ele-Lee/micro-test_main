import { Reducer, Subscription, Action } from 'umi';
import MicroStorage from '@grfe/micro-store';
import { apps, menus as originMenus } from '../../config';
import { omitByKey } from '@/utils/recursive';
import _cloneDeep from 'lodash/cloneDeep';
import { MenuConfig, AppOption } from '@grfe/micro-layout/lib/typings/typing';

export type MainAppModelState = {
  menus: MenuConfig[];
  apps: AppOption[];
};
export interface IMainAppModel {
  state: MainAppModelState;
  effects: {};
  reducers: {
    save: Reducer<MainAppModelState>;
    saveRoute: Reducer<MainAppModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { init: Subscription };
}

const defaultState = {
  menus: [],
  apps: [],
};

const MainAppModel: IMainAppModel = {
  state: defaultState,
  effects: {},
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
    saveRoute(state, action) {
      if (!state) return defaultState;
      const newRoutes = _cloneDeep(state?.menus);
      action.payload.forEach((item: any) => {
        const tmp = newRoutes?.find(item2 => item2.title === item.title);
        if (tmp) {
          tmp.children = item.children;
        }
      });

      return {
        ...state,
        menus: newRoutes,
      };
    },
  },
  subscriptions: {
    init({ dispatch, history }) {
      dispatch({
        type: 'save',
        payload: {
          apps,
          menus: originMenus.concat(apps),
        },
      });

      const menus: { [n: string]: any[] } = {};
      apps.forEach(({ name }) => {
        menus[name] = [];
      });
      const ss = new MicroStorage({
        state: {
          menus,
        },
        isMain: true,
      });
      for (const app of apps) {
        ss.watch('MAIN_APP/menus/' + app.name, (newVal: any, oldVal: any) => {
          dispatch({
            type: 'saveRoute',
            payload: [...omitByKey(newVal, 'icon')],
          });
        });
      }
    },
  },
};
export default MainAppModel;
