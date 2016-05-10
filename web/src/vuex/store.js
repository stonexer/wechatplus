import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  wechatState: 'init',
  uuid: '',

  user: null,
  memberList: [],
  sessionList: [],

  query: ''
}

const mutations = {

  // 微信状态
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

  LOGIN (state) {
    state.wechatState = 'login'
  },

  LOGINERROR (state, err) {
    state.wechatState = 'init'
  },

  // 用户数据
  USERINFO (state, user) {
    state.user = user
  },

  FRIEND_LIST (state, friendList) {
    state.memberList = friendList

    for (let member of friendList) {
      state.sessionList.push({
        username: member['username'],
        nickname: member['nickname'],
        messages: []
      })
    }
    // 登陆用户头像
    state.user.avatar = friendList.find(member => member.username === state.user.UserName).avatar
  },

  // 消息
  TEXTMESSAGE (state, message) {
    if (message.ToUserName === state.user.UserName) {
      // 收件人为自己
      state.sessionList.find(session => session.username === message.FromUserName).messages.push(message)
    } else if (message.FromUserName == state.user.UserName) {
      // 发件人为自己
      message.self = true
      state.sessionList.find(session => session.username === message.ToUserName).messages.push(message)
    }
  },

  SENDMESSAGE (state, content, to) {
    state.sessionList.find(session => session.username === to).messages.push({
      Content: content,
      self: true,
      CreateTime: +new Date() / 1000
    })
  },

  // 界面
  CHANGE_SEARCH_QUERY (state, query) {
    state.query = query
  }
}

export default new Vuex.Store({
  state,
  mutations
})
