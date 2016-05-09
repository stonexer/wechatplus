import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  wechatState: 'init',
  uuid: '',

  user: {},
  memberList: [],
  sessionList: [],
}

const mutations = {
  UUID (state, uuid) {
    state.uuid = uuid
    state.wechatState = 'uuid'
  },

  SCAN (state) {
    state.wechatState = 'scan'
  },

  CONFIRM (state) {
    state.wechatState = 'confirm'
  },

  USERINFO (state, user) {
    state.user = user
  },

  LOGIN (state) {
    state.wechatState = 'login'
  },

  FRIEND_LIST (state, friendList) {
    state.memberList = friendList

    for (let member of friendList) {
      state.sessionList.push({
        username: member['username'],
        messages: []
      })
    }

    state.user.avatar = friendList.find(member => member.username === state.user.UserName).avatar
    console.log(state.user.avatar)
  },

  LOGINERROR (state, err) {
    state.wechatState = 'init'
  },

  TEXTMESSAGE (state, message) {
    console.log('text-message', message)
    if (message.ToUserName === state.user.UserName) {
      // 收件人为自己
      state.sessionList.find(session => session.username === message.FromUserName).messages.push(message)
    } else if (message.FromUserName == state.user.UserName) {
      state.sessionList.find(session => session.username === message.ToUserName).messages.push(message)
    }
  },

  SENDMESSAGE (state, content, to) {
    state.sessionList.find(session => session.username === to).messages.push({
      Content: content,
      self: true,
      CreateTime: +new Date() / 1000
    })
  }
}

export default new Vuex.Store({
  state,
  mutations
})
