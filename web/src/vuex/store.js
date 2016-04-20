import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  wechatState: 'init',
  uuid: '',
  
  user: {},
  memberList: [],
  sessionList: []
}

const mutations = {
  INCREMENT (state, amount) {
    state.count = state.count + amount
  },
  
  UUID (state, uuid) {
    state.uuid = uuid
    state.wechatState = 'uuid'
  },
  
  SCAN (state) {
    console.log('mutation scan')
    state.wechatState = 'scan'
  },
  
  CONFIRM (state) {
    console.log('mutation confirm')
    state.wechatState = 'confirm'
  },
  
  USERINFO (state, user) {
    console.log('userinfo', user)
    state.user = user
  },
  
  LOGIN (state, memberList) {
    state.wechatState = 'login'
    state.memberList = memberList
    
    for(let member of memberList) {
      state.sessionList.push({
        UserName: member['UserName'],
        messages: []
      })
    }
  },
  
  LOGINERROR (state, err) {
    state.wechatState = 'init'
  },
  
  TEXTMESSAGE (state, message) {
    console.log('text-message', message)
    state.sessionList.find(session => session.UserName === message.FromUserName).messages.push(message)
    console.log('session', state.sessionList.find(session => session.UserName === message.FromUserName).messages.length)
  },
  
  SENDMESSAGE (state, content, to) {
    state.sessionList.find(session => session.UserName === to).messages.push({
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