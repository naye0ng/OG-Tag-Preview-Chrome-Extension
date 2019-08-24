<template>
  <div id="twitter-card">
    <!-- <div v-if="chrome_data.twitter_card.trim() ==''" class="unable-twitter-card">
      Unable to render Card preview
    </div> -->
    <div class="card-img summary_large_image" v-if="chrome_data.twitter_card.trim() == 'summary_large_image'">
      <img :src="chrome_data.twitter_image || chrome_data.og_image"/>
    </div>
    <div class="twitter-card-body">
      <div class="card-img summary_image" v-if="chrome_data.twitter_card.trim() != 'summary_large_image'" >
        <img :src="chrome_data.twitter_image || chrome_data.og_image"/>
      </div>
      <div class="card-text" :class="{'summary' : chrome_data.twitter_card.trim() != 'summary_large_image'}">
        <div class="title">{{ chrome_data.twitter_title || chrome_data.og_title || chrome_data.title }}</div>
        <div class="description two-line" >{{ chrome_data.twitter_description|| chrome_data.og_description }}</div>
        <div class="site-name">{{ chrome_data.url.split('/')[2].split('www.').reverse()[0] }}</div>
      </div>
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
#twitter-card {
  text-align: left;
  color: #181818;
}
#twitter-card .unable-twitter-card{
  margin: 30px auto;
  line-height: 24px;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
}
#twitter-card .card-img{
  overflow: hidden;
  border-radius: 0;
}
#twitter-card .summary_large_image{
  width: 100%;
  height: 220px;
}
#twitter-card .summary_large_image img{
  width: 100%;
  height:auto;
}
#twitter-card .summary_image{
  width: 125px;
  height: 125px;
}
#twitter-card .summary_image img{
  width: 100%;
  height:100%;
}
#twitter-card .card-img.summary_image, #twitter-card .card-text{
  display: inline-block;
  float: left;
}
#twitter-card .card-text.summary{
  width: calc(100% - 125px);
}
#twitter-card .card-text{
  padding: .75em;
  padding-left: 1em;
  padding-right: 1em;
  border-top: 1px solid #E1E8ED;
}
#twitter-card .title{
  font-weight: bold;
}
#twitter-card .site-name{
  text-transform: lowercase;
  color: #8899A6;
}
</style>
