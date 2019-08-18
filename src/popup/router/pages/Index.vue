<template> 
  <section id="preview">
    <SearchBar />
    <CarouselCards />
  </section>
</template>

<script>
import Vue from 'vue'
import store from '../../../store'
import SearchBar from '../components/SearchBar'
import CarouselCards from '../components/CarouselCards'

export default {
  data() {
    return {
    };
  },
  components : {
    SearchBar,
    CarouselCards,
  },
  methods: {
    getCurrentTabUrl() {
      var queryInfo = {
        active: true,
        currentWindow: true,
      }
      chrome.tabs.query((queryInfo), function (tabs) {
        store.dispatch('setUrl',tabs[0].url)
      })
    }
  },
  created(){
    this.getCurrentTabUrl()
  }
};
</script>

<style>
body {
  width: 550px;
}
body > * {
  box-sizing: border-box !important;
}
#preview{
  background: url('/images/stars.png') center center no-repeat,linear-gradient(to bottom,#181818, #111c27);
}
.two-line{
  width:100%;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  line-height:20px;
  overflow:hidden;
  text-overflow:ellipsis;
}
</style>
