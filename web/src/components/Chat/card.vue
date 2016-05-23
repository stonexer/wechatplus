<style lang="less">

.m-card {
  padding: 12px;
  border-bottom: solid 1px #24272C;
  margin: 20px 0 0 0;
  footer {
    margin-top: 10px;
  }
  .avatar,
  .name {
    vertical-align: middle;
  }
  .avatar {
    border-radius: 2px;
  }
  .name {
    display: inline-block;
    margin: 0 0 0 15px;
    font-size: 16px;
  }
  .search {
    padding: 0 10px;
    width: 100%;
    font-size: 12px;
    color: #fff;
    height: 30px;
    line-height: 30px;
    border: solid 1px #3a3a3a;
    border-radius: 4px;
    outline: none;
    background-color: #26292E;
  }
}

</style>

<template>

<div class="m-card">
  <header>
    <img class="avatar" width="40" height="40" :alt="user.NickName" :src="user.avatar">
    <p class="name">{{user.NickName}}</p>
  </header>
  <footer>
    <input class="search" type="text" placeholder="搜索用户 ..." :value="query" @input="updateQuery">
  </footer>
</div>

</template>

<script>
import {
  getSearchQuery
} from '../../vuex/getters'

import {
  changeSearchQuery
} from '../../vuex/actions'

export default {
  props: ['user'],

  methods: {
    updateQuery (e) {
      this.changeSearchQuery(e.target.value)
    }
  },

  vuex: {
    getters: {
      query: getSearchQuery
    },
    actions: {
      changeSearchQuery: changeSearchQuery
    }
  }
};

</script>
