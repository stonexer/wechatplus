import Vue from 'vue'
import Router from 'vue-router'

import App from './components/App.vue'
import LoginView from './components/LoginView.vue'
import ChatView from './components/ChatView.vue'

// install router & resource
Vue.use(Router)

// routing
var router = new Router()
router.map({
  '/login': {
    component: LoginView
  },
  '/chat': {
  	component: ChatView
  }
})

router.beforeEach(function() {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/login'
})

router.start(App, 'app')
