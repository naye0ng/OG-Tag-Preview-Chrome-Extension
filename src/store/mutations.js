import * as types from './mutation-types';

export default {
  [types.UPDATE_FOO](state, payload) {
    state.foo = payload;
  },
  [types.UPDATE_META_DATA](state, payload){
    state.metaData = Object.assign({},payload);
  }
};
