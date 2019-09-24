<template> 
  <div>
    <section id="preview">
      <SearchBar />
      <CarouselCards />
    </section>
    <section id="debug">
      <DebugTool />
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import store from '../../../store'
import SearchBar from '../components/SearchBar'
import CarouselCards from '../components/CarouselCards'
import DebugTool from '../components/DebugTool'

export default {
  data() {
    return {
    };
  },
  components : {
    SearchBar,
    CarouselCards,
    DebugTool,
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
  position: relative;
  width: 550px;
  background: url('/images/stars.png') center center no-repeat,linear-gradient(to bottom,#181818, #111c27);
}
body > * {
  box-sizing: border-box !important;
}
.one-line{
  width:100%;
  display:-webkit-box;
  -webkit-line-clamp:1;
  -webkit-box-orient:vertical;
  line-height:20px;
  overflow:hidden;
  text-overflow:ellipsis;
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
