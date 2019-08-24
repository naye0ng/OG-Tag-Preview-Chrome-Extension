<template>
  <b-container >
    <b-row align-h="end">
      <b-col class="debug-btn">DEBUGGER</b-col>
    </b-row>
  </b-container>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {};
  },
  components: {},
  methods: {}
};
</script>
<style>
.debug-btn{
  cursor: pointer;
  max-width:20%!important;
  min-width:20%!important;
  text-align: center;
  padding: 15px 0;
  margin-right:3%;
  background-color: #82ad43;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color:#fff;
  font-weight: 600;
  letter-spacing: 0.05rem;
  font-size:12px;
}
.debug-btn:hover{
  background-color: #688a35;
}
</style>
