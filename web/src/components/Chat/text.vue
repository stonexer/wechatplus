<style lang="less">

.m-text {
  height: 150px;
  border-top: solid 1px #ddd;
  textarea {
    padding: 10px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
  }
}

</style>

<template>

<div class="m-text">
  <textarea placeholder="按 Enter 发送" v-model="text" @keyup="inputing"></textarea>
</div>

</template>

<script>

import {
  sendMessage
}
from '../../vuex/actions'

export default {
  props: ['session'],
  data() {
    return {
      text: ''
    };
  },
  methods: {
    inputing(e) {
      if (e.keyCode === 13 && this.text.length) {
        this.send(this.text, this.session.username)
        this.text = ''
      }
    }
  },
  vuex: {
    actions: {
      send: sendMessage
    }
  }

};

</script>
