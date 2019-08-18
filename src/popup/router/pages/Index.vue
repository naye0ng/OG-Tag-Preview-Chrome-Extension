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
  width: 500px;
}
body > * {
  box-sizing: border-box !important;
}
</style>
