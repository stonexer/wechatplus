<template>

  <router-view>
  </router-view>

</template>

<script>

import store from '../vuex/store'

module.exports = {
  
  store,
  
	data () {
		return {
			name: 'wechat+',
		}
	},
  
  events: {
  }
}

</script>