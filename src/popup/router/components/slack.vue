<template>
  <div id="slack-card">
    <div class="card-body">
      <div class="slack-header">
        <div class="favicon">
        </div>
        <div class="site-name">{{ chrome_data.og_site_name }}</div>
      </div>
      <div class="title">{{ chrome_data.og_title || chrome_data.title }} </div>
      <div class="description">{{ chrome_data.og_description }}</div>
    </div>
    <div class="card-img">
      <!-- <img :src="chrome_data.og_image"/> -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import store from '../../../store'

export default {
  data() {
    return {
      chrome_data : {},
    }
  },
  methods:{
    watchStoreMetaData(){
      store.watch(() => store.getters.metaData, metaData =>{
        this.chrome_data = Object.assign({}, this.chrome_data, metaData)
      })
    }
  },
  created(){
    this.watchStoreMetaData()
  }
};
</script>
<style>
#slack-card > *{
  text-align: left;
}
</style>
