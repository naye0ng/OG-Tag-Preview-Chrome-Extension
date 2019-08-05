<template>
  <b-container>
    <b-row id="search-section">
      <!-- 검색 창 -->
      <div id="search">
        <input type="text" class="search-string" placeholder="Enter URL" v-model="chrome_data.url"/>
        <button type="submit" class="search-btn">
          <font-awesome-icon class="social-icon" icon="search" />
        </button>
      </div>
    </b-row>
    <b-row id="social-btns-section">
      <div class="manual">
        <div class="title">OG tag Preview</div>
        <div class="description">This is a preview of how your website will look when it's shared on social media and messenger.</div>
      </div>
      <!-- 페이스북, 트위터, 네이버, 카카오톡 -->
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
    <b-row id="carousel-section">
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
          <!-- facebook slide -->
          <b-carousel-slide img-blank>
            <div class="facebook-card">
              <p>hi i'm facebook!</p>
            </div>
          </b-carousel-slide>
          <!-- twitter slide -->
          <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
            <p>
              1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
              a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
            </p>
          </b-carousel-slide>
          <!-- slack slide -->
          <b-carousel-slide img-blank>
            <!-- <slack/> -->
          </b-carousel-slide>
          <!-- line slide -->
          <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
            <p>3</p>
          </b-carousel-slide>
        </b-carousel>
      </div>
      <!-- table -->
      </b-row>
      <b-row>
        <div class="manual" style="padding-left: 10%;padding-right: 10%;">
          <div class="title">
            OG tag Debugger
            <b-form-checkbox v-model="checked" name="check-button" switch></b-form-checkbox>
            </div>
          <div class="description">
            You can use this to easily create and debug your OG tags.
            <br/>
            Let's move the switch to edit mode. 
            You can then create and copy your own Open Graph tags in edit mode.
            </div>
        </div>
        <div id="og-container">
          <div class="og-row">
            <div class="og-header">title</div>
            <div class="og-content">{{ chrome_data.title }}</div>
          </div>
          <div class="og-row">
            <div class="og-header">og:title</div>
            <div class="og-content">{{ chrome_data.og_title }}</div>
          </div>
          <div class="og-row">
            <div class="og-header">og:url</div>
            <div class="og-content">{{ chrome_data.og_url }}</div>
          </div>
          <div class="og-row">
            <div class="og-header">og:description</div>
            <div class="og-content">{{ chrome_data.og_description }}</div>
          </div>
          <div class="og-row">
            <div class="og-header">og:image</div>
            <div class="og-image">
              <img :src="chrome_data.og_image">
            </div>
          </div>
        </div>
    </b-row>
  </b-container>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import cheerio from 'cheerio'
import slack from '../components/slack'
import { constants } from 'crypto';

export default {
  data() {
    return {
      // carousel
      slide: 0,
      sliding: false,
      // app data
      chrome_data : {},
      //radio
      checked: false,

    };
  },
  components : {
    slack
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    // using chrome api
    geCurrenttUrl(chrome_data, getMetaTags) {
      var queryInfo = {
        active: true,
        currentWindow: true,
      }
      chrome.tabs.query((queryInfo), function (tabs) {
        Vue.set(chrome_data,'url',tabs[0].url)
        Vue.set(chrome_data,'title',tabs[0].title)
        getMetaTags(chrome_data)
      })
    },
    // web crawling
    getMetaTags(chrome_data){
      axios.get(chrome_data.url)
        .then(function (response) {
          const $ = cheerio.load(response.data)
          // https://github.com/joshbuchea/HEAD
          // https://css-tricks.com/essential-meta-tags-social-media/
          // Essential META Tags
          chrome_data.og_url = $("meta[property='og:url']").attr("content") || ''
          chrome_data.og_title = $("meta[property='og:title']").attr("content") || ''
          chrome_data.og_description = $("meta[property='og:description']").attr("content") || ''
          chrome_data.og_image = $("meta[property='og:image']").attr("content") || ''
          chrome_data.twitter_card = $("meta[name='twitter:card']").attr("content") || ''

          // Non-Essential, But Recommended
          chrome_data.og_site_name = $("meta[property='og:site_name']").attr("content")
          chrome_data.og_image_alt = $("meta[property='og:image:alt']").attr("content")
          chrome_data.twitter_image_alt = $("meta[name='twitter:image:alt']").attr("content")

          // Non-Essential, But Required for Analytics
          chrome_data.fb_app_id= $("meta[property='fb:app_id']").attr("content")
          chrome_data.twitter_site= $("meta[name='twitter:site']").attr("content")
          chrome_data.twitter_creator = $("meta[name='twitter:creator']").attr("content")
          chrome_data.twitter_title = $("meta[name='twitter:title']").attr("content")
          chrome_data.twitter_description = $("meta[name='twitter:description']").attr("content")
          chrome_data.twitter_image = $("meta[name='twitter:image']").attr("content")
          chrome_data.twitter_creator = $("meta[name='twitter:creator']").attr("content")
          console.log(chrome_data)
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    // social button
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
  },
  mounted(){
    this.geCurrenttUrl(this.chrome_data, this.getMetaTags)
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
.manual{
  margin: 5px 0 15px;
}
.manual .title{
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: 550;
  color: #181818;
}
.manual .description{
  font-size: 12px;
  /* font-weight: 550; */
  color: rgba(0, 0, 0, 0.6);
}
.manual .custom-control.custom-switch{
  display: inline-block;
  margin-left: 10px;
}
.custom-control-input:checked ~ .custom-control-label::before {
    border-color: #ff5252!important;
    background-color: #ff5252!important;
}
.custom-control-input:focus ~ .custom-control-label::before{
  box-shadow: none!important;
}
#search-section,
#social-btns-section {
  padding-left: 10%;
  padding-right: 10%;
}
#search {
  width: 100%;
  margin: 20px 0;
  position: relative;
  overflow: hidden;
}
#search input.search-string {
  width: calc(100% - 45px);
  height: 45px;
  margin: 0;
  padding-left: 15px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-left: 1.5px solid rgba(0, 0, 0, 0.6);
  border-top: 1.5px solid rgba(0, 0, 0, 0.6);
  border-bottom: 1.5px solid rgba(0, 0, 0, 0.6);
  border-right: none;
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
}
#search .search-btn {
  position: absolute;
  width: 45px;
  height: 45px;
  right: 0;
  margin: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-right: 1.5px solid rgba(0, 0, 0, 0.6);
  border-top: 1.5px solid rgba(0, 0, 0, 0.6);
  border-bottom: 1.5px solid rgba(0, 0, 0, 0.6);
  border-left: none;
  border: 1.5px solid rgba(0, 0, 0, 0.6);
  color: rgba(0, 0, 0, 0.6);
}
#search input.search-string:focus {
  border-color: #ff5252;
  color: #181818;
}
#search input.search-string:focus + .search-btn {
  border-color: #ff5252;
  background-color: #ff5252;
  color: #ffffff;
}
/* Carousel Buttons */
#social-btns {
  width: 100%;
  /* margin-top: 10px; */
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
  color: rgba(0, 0, 0, 0.6);
  /* box-shadow: rgba(66, 92, 89, 0.3) 0px 0px 8px; */
}
#social-btns .social-btn .social-icon {
  font-size: 23px;
}
#social-btns .social-btn:hover {
  /* background-color: #f4f6f5; */
  color: #181818; /*#3E4242;*/
}
#social-btns .social-btn.selected-btn {
  background-color: #ff5252; /*#425C59;*/
  color: #fff;
}
#carousel {
  margin-top: 50px;
}
/* OG TAG LIST */
#og-container {
  width: 100%;
}
#og-container .og-row {
  padding: 15px 10%;
  font-size: 12px;
}
#og-container .og-row:nth-child(2n-1) {
  /* padding: 15px 10%; */
  background-color: #f6f6f6;
}
#og-container .og-header {
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03rem;
  color: #ff5252;/*rgba(0,0,0,.6);*/
}
#og-container .og-content {
  font-size: 14px;
  font-weight: 500;
}
#og-container  .og-image img{
  width:100%;
}
/* #og-container{
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
} */
</style>
