import { Reducer, Subscription } from 'umi';
import MicroStorage from '@grfe/micro-store/src';
import { apps, routes as originRoutes } from '../../config';
import { omitByKey } from '@/utils/recursive';

export type MainAppModelState = {
  routes: any[];
  apps: any[];
};
export interface IMainAppModel {
  state: MainAppModelState;
  effects: {};
  reducers: {
    save: Reducer<MainAppModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { init: Subscription };
}

const MainAppModel: IMainAppModel = {
  state: {
    routes: [],
    apps: [],
  },
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
  },
  subscriptions: {
    init({ dispatch, history }) {
      dispatch({
        type: 'save',
        payload: {
          apps,
          routes: originRoutes,
        },
      });
      const ss = new MicroStorage({
        state: {
          routes: {
            subapp1: [],
          },
        },
        isMain: true,
      });
      ss.watch('MAIN_APP/routes/subapp1', (newVal, oldVal) => {
        console.log(
          '%celelee test:',
          'background:#000;color:#e1a31f',
          newVal,
          oldVal,
        );
        dispatch({
          type: 'save',
          payload: {
            routes: [...originRoutes, ...omitByKey(newVal, 'icon')],
            apps,
          },
        });
      });
    },
  },
};
export default MainAppModel;
