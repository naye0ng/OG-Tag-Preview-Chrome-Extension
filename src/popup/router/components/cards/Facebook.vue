<template>
  <div id="facebook-card">
    <div class="card-img" v-if="chrome_data.og_image != '' && !isSquare" :class="{'vertical-img': isBigVertical}">
      <img :src="chrome_data.og_image"/>
    </div>
    <div class="facebook-card-body">
      <b-row class="facebook-contents">
        <b-col cols="3" class="card-img" v-if="chrome_data.og_image != '' && isSquare" :class="{'square-img':isSquare}">
          <img :src="chrome_data.og_image"/>
        </b-col>
        <b-col align-self="center" class="card-text padding-3per">
          <div class="site-name">{{ chrome_data.url.split('/')[2].split('www.').reverse()[0].toUpperCase() }}</div>
          <div class="title">{{ chrome_data.og_title || chrome_data.title }}</div>
          <div class="description two-line" v-if="isSquare">{{ chrome_data.og_description }}</div>
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
      isSquare : true,
      isBigVertical : false,
    }
  },
  methods:{
    watchStoreMetaData(){
      store.watch(() => store.getters.metaData, metaData =>{
        this.chrome_data = Object.assign({}, this.chrome_data, metaData)
        this.getImageRatio(this.chrome_data.og_image,this.setIsSquare)
      })
    },
    getImageRatio(url, callback){
      var img = new Image();
      img.src = url
      img.onload = function(){
        callback(img.width,img.height)
      }
    },
    setIsSquare(w,h){
      this.isSquare = Math.abs(w-h) <= 10 ? true : false
      if(h > w+10) this.isBigVertical = true
    }
  },
  created(){
    this.watchStoreMetaData()
  }
};
</script>
<style>
#facebook-card {
  text-align: left;
  color: #4b4f56;
}
#facebook-card .col, #facebook-card .row, #facebook-card .col-3{
  margin: 0;
  padding:0;
}
#facebook-card .card-img {
  overflow: hidden;
  border-radius: 0;
}
#facebook-card .card-img img{
  width: 100%;
  height:100%;
}
#facebook-card .vertical-img{
  width: 100%;
  height: 250px;
}
#facebook-card .vertical-img img{
  position: relative;
  width: 100%;
  height: auto;
  top: -50%;
}
#facebook-card .padding-3per{
  padding: 3%!important;
}
#facebook-card .facebook-contents{
  background-color: #f5f6f7;
}
#facebook-card .site-name{ 
  margin-bottom: 3px; 
  font-size: 11px;
}
#facebook-card .description{ 
  margin-top: 5px; 
}
#facebook-card .title{
  color:#181818;  
  font-weight: 700;
  font-size: 14px;
}
</style>
