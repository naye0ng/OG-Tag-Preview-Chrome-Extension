<template>
  <div id="slack-card">
    <div class="slack-card-body">
      <div class="slack-contents" :class="{'exist-image': chrome_data.og_image != '' && isSquare}">
        <div class="slack-header">
          <img v-if="chrome_data.favicon != '' || chrome_data.og_image != ''" :src="chrome_data.favicon || chrome_data.og_image" class="favicon" />
          <span class="site-name">{{ chrome_data.og_site_name || chrome_data.url.split('/')[2].split('www.').reverse()[0] }}</span>
        </div>
        <div class="title">
          <a :href="chrome_data.url">{{ chrome_data.og_title || chrome_data.title }}</a>
        </div>
        <div class="description">{{ chrome_data.og_description }}</div>
      </div>
      <div class="card-img" v-if="chrome_data.og_image != '' && isSquare">
        <img :src="chrome_data.og_image"/>
      </div>
    </div>  
    <div class="card-img-2" v-if="chrome_data.og_image != '' && !isSquare" :class="{'vertical-img': isBigVertical}">
      <img :src="chrome_data.og_image"/>
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
#slack-card{
  position: relative;
  line-height:1.46666667;
  text-align: left;
  min-height: 75px;
  overflow: hidden;
}
#slack-card::before{
  content: "";
  position:absolute;
  width: 4px;
  height: 100%;
  left: 0;
  background-color: #ddd;
  border-radius: 8px;
}
#slack-card .slack-header, #slack-card .title{
  font-weight:700;
}
#slack-card .slack-header .favicon{
  height: 16px;
  margin-bottom: 3px;
  margin-right: 4px;

}
#slack-card .slack-header .favicon img{
  width:15px;
  height:15px;
}
#slack-card .title a{
  color: #1264a3!important;
}
.slack-contents{
  padding-left: 15px;
  padding-right: 12px;
}
.slack-contents.exist-image{
  width: calc(100% - 70px)
}
#slack-card .card-img{
  position: absolute;
  top:5px;
  right:0;
  width:70px;
  height: 70px;
  border-radius: 3px;
  overflow: hidden;
}
#slack-card .card-img img{
  width:70px;
  height: 70px;
}
#slack-card .card-img-2{
  overflow: hidden;
  width:360px;
  margin-top: 5px;
  margin-bottom: 3px;
  margin-left : 15px;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.1);
}
#slack-card .card-img-2 img{
  width:360px;
}
#slack-card .vertical-img{
  width: 40%;
}
#slack-card .vertical-img img{
  width: 100%;
}
#slack-card .slack-header{
  margin-bottom: 3px; 
}
#slack-card .description{
  margin-top: 3px; 
  word-break: break-word;
}
</style>
