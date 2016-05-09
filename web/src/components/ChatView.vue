<style lang="less">

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
    height: ~'calc(100% - 160px)';
  }
}

</style>

<template>

<div id="chat">
  <div class="sidebar">
    <card :user="userInfo" :search.sync="search"></card>
    <list :user-list="memberList" :session="session" :session-index.sync="sessionIndex" :search="search"></list>
  </div>
  <div class="main">
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

import {
  getWechatState, getMemberList, getUserInfo, getSessionList
}
from '../vuex/getters'

export default {

  components: {
    card, list, text, message
  },

  data() {
    return {
      search: '',
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
