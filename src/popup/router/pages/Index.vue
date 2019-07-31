<template>
  <b-container>
    <b-row>
      <!-- 검색 창 -->
      <div id="search">
        <input type="text" class="search-string" placeholder="Enter URL" />
        <button type="submit" class="search-btn">
          <font-awesome-icon class="social-icon" icon="search" />
        </button>
      </div>
      <!-- 페이스북, 트위터, 네이버, 카카오톡 -->
      <div id="carousel-social-btn-wrap">
        <button
          class="social-btn"
          :class="{'selected-btn' : isFacebook()}"
          v-on:click="pushSocialBtn(0)"
        >
          <font-awesome-icon class="social-icon" :icon="['fab', 'facebook-f']" />
          <p class="social-name">facebook</p>
        </button>
        <button
          class="social-btn"
          :class="{'selected-btn' : isTwitter()}"
          v-on:click="pushSocialBtn(1)"
        >
          <font-awesome-icon class="social-icon" :icon="['fab', 'twitter']" />
          <p class="social-name">twitter</p>
        </button>
        <button
          class="social-btn"
          :class="{'selected-btn' : isSlack()}"
          v-on:click="pushSocialBtn(2)"
        >
          <font-awesome-icon class="social-icon" :icon="['fab', 'slack']" />
          <p class="social-name">slack</p>
        </button>
        <button
          class="social-btn"
          :class="{'selected-btn' : isLine()}"
          v-on:click="pushSocialBtn(3)"
        >
          <font-awesome-icon class="social-icon" :icon="['fab', 'line']" />
          <p class="social-name">line</p>
        </button>
      </div>
      <div id="carousel">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide img-blank>
            <div class="facebook-card">
              <p>hi i'm facebook!</p>
            </div>
          </b-carousel-slide>
          <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
            <p>
              1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
              a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
            </p>
          </b-carousel-slide>
          <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
            <p>2</p>
          </b-carousel-slide>
          <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
            <p>3</p>
          </b-carousel-slide>
        </b-carousel>
      </div>
      <!-- table -->
      <div id="og-container">
        <div class="og-row">
          <div class="og-header">OG:TITLE</div>
          <div class="og-content">개발새발유후후후후</div>
        </div>
        <div class="og-row">
          <div class="og-header">OG:URL</div>
          <div class="og-content">개발새발유후후후후</div>
        </div>
        <div class="og-row">
          <div class="og-header">OG:DESCRIPTION</div>
          <div class="og-content">개발새발유후후후후</div>
        </div>
        <div class="og-row">
          <div class="og-header">OG:IMAGE</div>
          <div class="og-image">개발새발유후후후후</div>
        </div>
      </div>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: false
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    pushSocialBtn(target) {
      this.slide = target;
    },
    isFacebook() {
      return this.slide == 0 ? true : false;
    },
    isTwitter() {
      return this.slide == 1 ? true : false;
    },
    isSlack() {
      return this.slide == 2 ? true : false;
    },
    isLine() {
      return this.slide == 3 ? true : false;
    }
  }
};
</script>

<style>
body {
  min-width: 500px;
  min-height: 800px;
}
body > * {
  box-sizing: border-box !important;
}
#search {
  width: 100%;
  padding: 20px;
  height: 130px;
  position: relative;
  overflow: hidden;
  background-color: #425c59;
  border-bottom-right-radius: 50%;
}
#search input.search-string {
  width: calc(100% - 45px);
  height: 45px;
  margin: 0;
  padding-left: 15px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: none;
  color: #343d46;
  font-size: 13px;
}
#search .search-btn {
  position: absolute;
  width: 45px;
  height: 45px;
  right: 20px;
  margin: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: none;
  color: #425c59;
}
#search .search-btn:before {
  content: "";
  position: absolute;
  height: 80%;
  top: 10%;
  left: 0;
  border-left: 2px solid #425c59;
  border-radius: 2px;
}
#carousel-social-btn-wrap {
  position: absolute;
  top: 70px;
  padding: 20px;
}
#carousel-social-btn-wrap .social-btn {
  width: 65px;
  height: 65px;
  padding: 0;
  padding-top: 12px;
  margin-right: 10px;
  border-radius: 7%;
  border: none;
  background-color: #fff;
  text-align: center;
  color: #425c59;
  box-shadow: rgba(66, 92, 89, 0.3) 0px 0px 8px;
}
#carousel-social-btn-wrap .social-btn .social-icon {
  font-size: 23px;
}
#carousel-social-btn-wrap .social-btn .social-name {
  margin-top: 2px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.03rem;
}
#carousel-social-btn-wrap .social-btn:hover {
  background-color: #f4f6f5;
  color: #343d46; /*#3E4242;*/
}
#carousel-social-btn-wrap .social-btn.selected-btn {
  background-color: #cc5a15; /*#425C59;*/
  color: #fff;
}
#carousel {
  margin-top: 50px;
}

/* OG TAG LIST */
#og-container{
  width:100%;
  margin-top: 130px;
  padding: 20px;
  position:relative;
  background-color: #425c59;
  color: #fff;
  font-size: 12px;
}
#og-container::before{
  content:'';
  z-index: -1;
  position: absolute;
  width: 100%;
  height:130px;
  top:-65px;
  left:0;
  background-color: #425c59;
  border-top-left-radius: 50%;
}
#og-container .og-header{
  font-weight: 600;
  letter-spacing: 0.08rem;
}
</style>
