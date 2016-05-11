<style lang="less">

.login-content {
  position: relative;
  margin: 0;
  width: 100%;
  height: 600px;
}

.scanQR {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  margin: -150px 0px 0px -158px;
  .message {
    color: #FFF;
  }
  #qrcode {
    height: 256px;
  }
  .progress {
    margin-top: 20px;
    width: 300px;
  }
}

</style>

<template>

<div class="login-content">
  <div class="scanQR">
    <div id="qrcode" v-el:qr-code></div>
    <h2 class="message">{{message}}</h2>
    <div class="progress">
      <progressbar :now="waitTime" :type=" waitTime > 50 ? 'success' : waitTime > 20 ? 'warning' : 'danger' " striped animated></progressbar>
    </div>
  </div>
</div>

</template>

<script>

import {
  getUUID, getWechatState
} from '../vuex/getters'

import {
  wechatStart
} from '../vuex/actions'

import {
  progressbar
} from 'vue-strap'

module.exports = {

  name: 'LoginView',

  data() {
    return {
      waitTime: 100,
      message: ''
    }
  },

  components: {
    progressbar,
  },

  methods: {
    showQR() {
      this.waitTime = 100

      const qrCode = 'https://login.weixin.qq.com/l/' + this.uuid
      this.$els.qrCode.innerHTML = ''
      new QRCode(this.$els.qrCode, qrCode)

      let countdown = setInterval(() => {
        this.waitTime -= 2
        if (this.waitTime <= 0) {
          clearInterval(countdown);
        }
      }, 500)
    }
  },

  created() {
    this.start()
  },

  watch: {
    uuid() {
        this.showQR()
      },
      wechatState() {
        if (this.wechatState === 'init') {
          this.start()
        } else if (this.wechatState === 'scan') {
          this.message = '已扫描，等待确认'
        } else if (this.wechatState === 'confirm') {
          this.message = '已确认，等待登陆'
        } else if (this.wechatState === 'login') {
          this.$router.go('/chat')
        }
      }
  },

  vuex: {
    getters: {
      uuid: getUUID,
      wechatState: getWechatState,
    },
    actions: {
      start: wechatStart
    }
  }
}

</script>
