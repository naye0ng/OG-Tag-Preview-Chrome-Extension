<template>
  <b-container>
    <b-row class="search-wrap">
      <div id="search">
        <input type="text" class="search-string" placeholder="Enter URL" v-model="url" @keyup.enter="setStoreUrl()"/>
        <button type="submit" class="search-btn" @click="setStoreUrl()">
          <font-awesome-icon class="social-icon" icon="search"/>
        </button>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import Vue from 'vue'
import store from '../../../store'

export default {
  data() {
    return {
      url : '',
    }
  },
  methods:{
    watchStoreUrl(){
      store.watch(() => store.getters.url, url =>{
        this.url= url
      })
    },
    setStoreUrl(){
      store.dispatch('setUrl',this.url)
    }
  },
  created() {
    this.watchStoreUrl()
  }
};
</script>
<style>
.search-wrap {
  padding-left: 7%;
  padding-right: 7%;
}
#search {
  width: 100%;
  margin: 20px 0;
  position: relative;
  overflow: hidden;
}
#search input.search-string {
  width: calc(100% - 45px);
  height: 45px;
  margin: 0;
  padding-left: 15px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-left: 1.5px solid rgba(0, 0, 0, 0.6);
  border-top: 1.5px solid rgba(0, 0, 0, 0.6);
  border-bottom: 1.5px solid rgba(0, 0, 0, 0.6);
  border-right: none;
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
}
#search .search-btn {
  position: absolute;
  width: 45px;
  height: 45px;
  right: 0;
  margin: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-right: 1.5px solid rgba(0, 0, 0, 0.6);
  border-top: 1.5px solid rgba(0, 0, 0, 0.6);
  border-bottom: 1.5px solid rgba(0, 0, 0, 0.6);
  border-left: none;
  border: 1.5px solid rgba(0, 0, 0, 0.6);
  color: rgba(0, 0, 0, 0.6);
}
#search input.search-string:focus {
  border-color: #ff5252;
  color: #181818;
}
#search input.search-string:focus + .search-btn {
  border-color: #ff5252;
  background-color: #ff5252;
  color: #ffffff;
}
</style>
