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
    height: ~'calc(100% - 150 - 30px)';
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
    <card :user="userInfo"></card>
    <list :user-list="memberList" :session="session" :session-index.sync="sessionIndex"></list>
  </div>
  <div class="main">
    <title :session="session"></title>
    <message :session="session" :user="userInfo" :user-list="memberList"></message>
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
  getMemberList,
  getUserInfo,
  getSessionList,
}
from '../vuex/getters'

export default {

  components: {
    card, list, text, message, title
  },

  data() {
    return {
      sessionIndex: 0,
    }
  },

  computed: {
    session() {
      return this.sessionList[this.sessionIndex];
    }
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
      memberList: getMemberList,
      sessionList: getSessionList,
      userInfo: getUserInfo
    },
    actions: {}
  }
}

</script>
