<template>
    <b-container id="debug-container">
        <div class="container-title">
          <font-awesome-icon icon="bug"/>
          OG Tag Debugger
        </div>
        <div class="info-card">
            <div class="tag-sect" v-for="(value, key)  in chrome_data" v-if="value">
                <div class="tag-title">{{ key }}</div>
                <div class="tag-value">{{ value }}</div>
            </div>
            <!-- <div class="tag-sect">
                <div class="tag-title">og:url</div>
                <div class="tag-value">{{ chrome_data.og_url }}</div>
            </div>
            <div class="tag-sect">
                <div class="tag-title">og:title</div>
                <div class="tag-value">{{ chrome_data.og_title }}</div>
            </div>
            <div class="tag-sect">
                <div class="tag-title">og:description</div>
                <div class="tag-value">{{ chrome_data.og_description }}</div>
            </div>
            <div class="tag-sect">
                <div class="tag-title">og:image</div>
                <div class="tag-value">{{ chrome_data.og_image }}</div>
            </div>
            <div class="tag-sect">
                <div class="tag-title">og:twitter_card</div>
                <div class="tag-value">{{ chrome_data.twitter_card }}</div>
            </div> -->
        </div>
    </b-container>
</template>

<script>
import Vue from "vue";
import store from '../../../store'

export default {
    data() {
        return {
            chrome_data: {},
        }
    },
    methods: {
        watchStoreMetaData() {
            store.watch(() => store.getters.metaData, metaData => {
                this.chrome_data = Object.assign({}, this.chrome_data, metaData)
            })
        }
    },
    created() {
        this.watchStoreMetaData()
    }
};
</script>

<style>
#debug-container {
    position: relative;
    padding: 3% 7%;
    background-color: #82ad43;
    /* border-top-left-radius: 10%; */
}
#debug-container:before {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 50px;
    top: -25px;
    left: 0;
    background-color: #82ad43;
    transform: skew(0deg, 4deg);
}

#debug-container .row,
#debug-container .col {
    margin: 0;
    padding: 0;
}

.container-title {
    margin-bottom: 5%;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
}

.info-card {
    margin: 7% 0 3%;
    padding: 3% 3%;
    background-color: #f5f6f7;
    border-radius: 5px;
}
.tag-sect{
  padding: 2%;
}
.tag-title {
    font-size: 13px;
    font-weight: 600;
}
.tag-value {
    font-size: 13.5px;
    color: #4b4f56;
}
</style>
