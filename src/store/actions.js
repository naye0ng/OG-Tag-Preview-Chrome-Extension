import * as types from './mutation-types';

export const setFoo = ({ commit }, payload) => {
  commit(types.UPDATE_FOO, payload);
};
export const setMetaData = ({ commit }, payload) => {
  commit(types.UPDATE_META_DATA, payload);
};
