<template>
 <b-container>
    <b-row class="social-btns-wrap">
      <div id="social-btns">
        <button
          class="social-btn"
          :class="{'selected-btn' : isFacebook()}"
          v-on:click="pushSocialBtn(0)"
        >
          <font-awesome-icon class="social-icon" :icon="['fab', 'facebook-f']" />
        </button>
        <button
          class="social-btn"
          :class="{'selected-btn' : isTwitter()}"
          v-on:click="pushSocialBtn(1)"
        >
          <font-awesome-icon class="social-icon" :icon="['fab', 'twitter']" />
        </button>
        <button
          class="social-btn"
          :class="{'selected-btn' : isSlack()}"
          v-on:click="pushSocialBtn(2)"
        >
          <font-awesome-icon class="social-icon" :icon="['fab', 'slack']" />
        </button>
        <button
          class="social-btn"
          :class="{'selected-btn' : isLine()}"
          v-on:click="pushSocialBtn(3)"
        >
          <font-awesome-icon class="social-icon" :icon="['fab', 'line']" />
        </button>
      </div>
    </b-row>
    <b-row class="carousel-wrap">
      <div id="carousel">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="400000"
          controls
          indicators
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <!-- facebook slide -->
          <b-carousel-slide img-blank>
            <div class="card-container">
              <Facebook />
            </div>
          </b-carousel-slide>
          <!-- twitter slide -->
          <b-carousel-slide img-blank>
            <div class="min-card-container">
              <Twitter />
            </div>
          </b-carousel-slide>
          <!-- slack slide -->
          <b-carousel-slide img-blank>
            <div class="card-container padding-3per">
              <Slack />
            </div>
          </b-carousel-slide>
          <!-- line slide -->
          <b-carousel-slide img-blank>
            <div class="min-card-container">
              <LineMessenger />
            </div>
          </b-carousel-slide>
        </b-carousel>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import Vue from 'vue'
import Facebook from './cards/Facebook'
import Twitter from './cards/Twitter'
import Slack from './cards/Slack'
import LineMessenger from './cards/Line'

export default {
  data() {
    return {
      slide: 0,
      sliding: false,
    }
  },
  components: {
    Facebook,
    Twitter,
    Slack,
    LineMessenger,
  },
  methods:{
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
    },
  }
};
</script>
<style>
/*  Social Buttons Style */
.social-btns-wrap{
  padding-left: 7%;
  padding-right: 7%;
}
#social-btns {
  width: 100%;
}
#social-btns .social-btn {
  width: 45px;
  height: 45px;
  padding: 0;
  padding-top: 3px;
  margin-right: 10px;
  border-radius: 7%;
  border: none;
  background-color: #f6f6f6;
  text-align: center;
  color: #111c27;
}
#social-btns .social-btn .social-icon {
  font-size: 23px;
}
#social-btns .social-btn:hover {
  color: #82ad43;
}
#social-btns .social-btn.selected-btn {
  background: #82ad43;
  color: #fff;
}

/*  Carousel Style */
.carousel-wrap{
  min-width: 100%;
  min-height: 400px;
}
#carousel {
  width: 100%;
}
#carousel .col, #carousel .row, #carousel .col-3{
  margin: 0;
  padding:0;
}
#carousel .carousel-indicators, 
#carousel .carousel-control-next, 
#carousel .carousel-control-prev{
  display: none;
}
.card-container{
  overflow: hidden;
  background: #fff;
  border-radius: 5px;
}
.min-card-container{
  margin-left:7%;
  margin-right:7%;
  overflow: hidden;
  background: #fff;
  border-radius: 5px;
}
.padding-3per{
  padding: 3%;
}
#carousel .carousel-caption {
  position: relative;
  width: 100%;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  padding: 0;
  color: #181818;
  text-shadow: none;
  font-size: 13px;
  overflow: hidden; 
}
#carousel .carousel-item > img{
  min-height: 0;
  max-height: 0;
}
#carousel .carousel-item {
  padding: 5%;
}
</style>
