import Wechat4u from 'wechat4u'

let wechat = null

export const wechatStart = function ({
  dispatch,
  state
}) {
  wechat = new Wechat4u()

  wechat.on('uuid', uuid => {
    dispatch('UUID', uuid)
  })

  wechat.on('scan', () => {
    dispatch('SCAN')
  })

  wechat.on('confirm', () => {
    dispatch('CONFIRM')
  })

  wechat.on('login', () => {
    dispatch('USERINFO', wechat.user)

    setTimeout(() => {
      dispatch('FRIEND_LIST', wechat.friendList)
      dispatch('LOGIN')
    },0)
  })

  wechat.on('logout', () => {
    wechat = null
    dispatch('LOGINERROR')
  })

  wechat.on('error', err => console.log(err))

  wechat.on('text-message', message => {
    dispatch('TEXTMESSAGE', message)
  })

  wechat.start().catch(err => {
    console.log('LOGIN ERROR')
    dispatch('LOGINERROR', err)
  })
}

export const sendMessage = function ({
  dispatch,
  state
}, content, to) {
  wechat.sendMsg(content, to)

  dispatch('SENDMESSAGE', content, to)
}

export const changeSearchQuery = function ({
  dispatch,
  state
}, query) {
  dispatch('CHANGE_SEARCH_QUERY', query)
}
