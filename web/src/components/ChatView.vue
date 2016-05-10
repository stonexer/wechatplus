<style lang="less">

::-webkit-scrollbar {
    display: none;
}

#chat {
  width: 800px;
  height: 600px;
  overflow: hidden;
  border-radius: 3px;
  .sidebar,
  .main {
    height: 100%;
  }
  .sidebar {
    float: left;
    width: 200px;
    color: #f4f4f4;
    background-color: #2e3238;
  }
  .main {
    position: relative;
    overflow: hidden;
    background-color: #eee;
  }
  .m-text {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  .m-message {
    height: ~'calc(100% - 180px)';
  }
  .m-title {
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #2e3238;
    color: #FFF;
  }
}

</style>

<template>

<div id="chat">
  <div class="sidebar">
    <card :user="user"></card>
    <list :session="session"></list>
  </div>
  <div class="main">
    <title :session="session"></title>
    <message :session="session" :user="user"></message>
    <text :session="session"></text>
  </div>
</div>

</template>

<script>

import card from './Chat/card.vue'
import list from './Chat/list.vue'
import text from './Chat/text.vue'
import message from './Chat/message.vue'
import title from './Chat/title.vue'

import {
  getWechatState,
  getSession,
  getUserInfo
}
from '../vuex/getters'

export default {

  components: {
    card, list, text, message, title
  },

  watch: {
    wechatState() {
      if (this.wechatState === 'init') {
        this.$router.go('/login')
      }
    }
  },

  vuex: {
    getters: {
      wechatState: getWechatState,
      session: getSession,
      user: getUserInfo
    },
    actions: {}
  }
}

</script>
