import * as types from './mutation-types';

export default {
  [types.UPDATE_FOO](state, payload) {
    state.foo = payload;
  },
  [types.PDATE_META_DATA](state, payload) {
    state.metaData = payload;
  },
};
