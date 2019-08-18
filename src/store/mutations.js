import * as types from './mutation-types';

export default {
  // [types.UPDATE_FOO](state, payload) {
  //   state.foo = payload
  // },
  [types.UPDATE_URL](state, payload){
    state.url = payload
  },
  [types.UPDATE_META_DATA](state, payload){
    state.metaData = Object.assign({},payload)
  }
};
