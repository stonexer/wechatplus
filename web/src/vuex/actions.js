import wechat4u from 'wechat4u'

let wechat = null

export const wechatStart = function ({ dispatch, state }) {
  wechat = new wechat4u()
  
  wechat.on('uuid', uuid => {
    console.log('GET UUID')
    dispatch('UUID', uuid)
  })
  wechat.on('scan', () => {
    console.log('SCAN')
    dispatch('SCAN')
  })
  wechat.on('confirm', () => {
    console.log('CONFIRM')
    dispatch('CONFIRM')
  })
  wechat.on('login', () => {
    dispatch('USERINFO', wechat.user)
    setTimeout(() => {
      dispatch('LOGIN', wechat.contactList)
    }, 0)
  })
  wechat.on('text-message', message => {
    dispatch('TEXTMESSAGE', message)
  })
  
  wechat.start().catch( err => {
    console.log('LOGIN ERROR')
    dispatch('LOGINERROR', err)
  })
}

export const sendMessage = function ({ dispatch, state }, content, to) {
  wechat.sendMsg(content, to)
  
  dispatch('SENDMESSAGE', content, to)
}