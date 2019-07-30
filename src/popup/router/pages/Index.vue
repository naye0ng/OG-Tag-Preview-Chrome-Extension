<template>
  <b-container>
    <!-- 검색 창 -->
    <b-row>
      <!-- <div id="search">
        <input type="text" class="search-string" placeholder="Enter URL" />
        <button type="submit" class="search-btn">  
         <font-awesome-icon :icon="['fas', 'spinner']" /> 
          <i class="fa fa-search"></i>
        </button> 
      </div>-->
    </b-row>
    <!-- Carousel -->
    <b-row>
      <div>
        <!-- 페이스북, 트위터, 네이버, 카카오톡 -->
        <div id="carousel-social-btn-wrap">
          <button class="social-btn">
            <font-awesome-icon class="social-icon" :icon="['fab', 'facebook-f']" />
          </button>
          <button class="social-btn">
            <font-awesome-icon class="social-icon" :icon="['fab', 'twitter']" />
          </button>
          <button class="social-btn">
            <font-awesome-icon class="social-icon" :icon="['fab', 'slack']" />
          </button>
          <button class="social-btn">
            <font-awesome-icon class="social-icon" :icon="['fab', 'line']" />
          </button>
        </div>

        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="10000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <!-- Text slides with image -->
          <b-carousel-slide
            caption="First slide"
            text="Nulla vitae elit libero, a pharetra augue mollis interdum."
            img-src="https://picsum.photos/1024/480/?image=52"
          ></b-carousel-slide>

          <!-- Slides with custom text -->
          <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
            <h1>Hello world!</h1>
          </b-carousel-slide>

          <!-- Slides with image only -->
          <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

          <!-- Slides with img slot -->
          <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
          <b-carousel-slide>
            <img
              slot="img"
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              src="https://picsum.photos/1024/480/?image=55"
              alt="image slot"
            />
          </b-carousel-slide>

          <!-- Slide with blank fluid image to maintain slide aspect ratio -->
          <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
              a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
            </p>
          </b-carousel-slide>
        </b-carousel>
        <!-- <p class="mt-4">
          Slide #: {{ slide }}
          <br />
          Sliding: {{ sliding }}
        </p> -->
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
/*
#search{
  width: 100%;
  padding : 30px 15px;
  height: 165px;
  position: relative;
  overflow: hidden;
  background-color: #343d46;

}
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
#carousel-social-btn-wrap .social-btn{
  width: 60px;
  height: 60px;
  padding-top: 2px;
  border-radius: 50%;
  text-align: center;
}
#carousel-social-btn-wrap .social-btn .social-icon{
  font-size: 30px;
  line-height: 1rem;
}
</style>
