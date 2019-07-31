<template>
  <b-container>
    <!-- 검색 창 -->
    <b-row>
      <div id="search">
        <input type="text" class="search-string" placeholder="Enter URL" />
        <button type="submit" class="search-btn">  
          <font-awesome-icon class="social-icon" icon='search'/>
        </button> 
      </div>
    </b-row>
    <!-- Carousel -->
    <b-row>
        <!-- 페이스북, 트위터, 네이버, 카카오톡 -->
        <div id="carousel-social-btn-wrap">
          <button class="social-btn selected-btn">
            <font-awesome-icon class="social-icon" :icon="['fab', 'facebook-f']" />
            <p class="social-name">facebook</p>
          </button>
          <button class="social-btn">
            <font-awesome-icon class="social-icon" :icon="['fab', 'twitter']" />
            <p class="social-name">twitter</p>
          </button>
          <button class="social-btn">
            <font-awesome-icon class="social-icon" :icon="['fab', 'slack']" />
            <p class="social-name">slack</p>
          </button>
          <button class="social-btn">
            <font-awesome-icon class="social-icon" :icon="['fab', 'line']" />
            <p class="social-name">line</p>
          </button>
        </div>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      slide: 1,
      sliding: null
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  }
};
</script>

<style>
body {
  min-width: 500px;
  min-height: 800px;
}
body > * {
  box-sizing: border-box!important;
}

#search{
  width: 100%;
  padding : 20px;
  height: 165px;
  position: relative;
  overflow: hidden;
  background-color: #343d46;
}
#search input.search-string{
  width: calc(100% - 45px);
  height: 45px;
  margin: 0;
  padding-left: 15px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: none;
  color: #343d46;
}
#search .search-btn{
  position:absolute;
  width: 45px;
  height: 45px;
  right:20px;
  margin:0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: none;
  color: #343d46;
}
/*
#search input.search-string{
  width: 100%;
  height: 45px;
  padding-left: 15px;
  background: #2b303b;
  border-radius: 5px;
  border: none;
  color : #343d46;
  font-size: 14px;
} */
#carousel-social-btn-wrap{
  padding: 20px;
}
#carousel-social-btn-wrap .social-btn{
  width: 63px;
  height: 70px;
  padding:0;
  padding-top: 13px;
  margin-right: 10px;
  border-radius: 7%;
  border: none;
  background-color: #F4F6F5;
  text-align: center;
  color:#425C59;
}
#carousel-social-btn-wrap .social-btn .social-icon{
  font-size: 23px;
}
#carousel-social-btn-wrap .social-btn .social-name{
  margin-top:5px;
  font-size: 10px;
  font-weight:600;
  letter-spacing: 0.03rem;
}
#carousel-social-btn-wrap .social-btn:hover{
  /* background-color: #BFBFBF; */
  color:#343d46;/*#3E4242;*/
}
#carousel-social-btn-wrap .social-btn.selected-btn{
  background-color: #425C59;
  color:#fff;
}

</style>
