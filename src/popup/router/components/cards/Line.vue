<template>
  <div id="Line-card">
    <div class="card-img" v-if="chrome_data.og_image != ''">
      <img :src="chrome_data.og_image"/>
    </div>
    <div class="Line-card-body">
      <b-row class="Line-contents">
        <b-col class="card-text">
          <div class="title">{{ chrome_data.og_title || chrome_data.title }}</div>
          <div class="description one-line" >{{ chrome_data.og_description }}</div>
          <div class="site-name">{{ chrome_data.url.split('/')[2].split('www.').reverse()[0] }}</div>
        </b-col>
      </b-row> 
    </div> 
  </div>
</template>

<script>
import Vue from 'vue'
import store from '../../../../store'

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
#Line-card {
  text-align: left;
  color: #181818;
}
#Line-card .card-img{
  width: 100%;
  max-height: 150px;
  overflow: hidden;
  border-radius: 0;
}
#Line-card .card-img img{
  width: 100%;
}
#Line-card .card-text.col{
  padding: 5%;
  padding-left: 1em;
  padding-right: 1em;
}
#Line-card .title{
  font-weight: bold;
}
#Line-card .site-name{
  text-transform: lowercase;
  color: #07C;
}
</style>
