<style lang="less">

.m-list {
  height: unit(600 - 121, px);
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  li {
    padding: 12px 15px;
    border-bottom: 1px solid #292C33;
    cursor: pointer;
    transition: background-color .1s;
    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }
    &.active {
      background-color: rgba(255, 255, 255, 0.1);
    }
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
    max-width: 120px;
    margin: 0 0 0 15px;
  }
}

</style>

<template>

<div class="m-list">
  <ul>
    <li v-for="item in memberList | search" :class="{ active: session.username === item.username }" @click="select(item.username)">
      <img class="avatar" width="30" height="30" :alt="item.nickname" :src="item.avatar">
      <p class="name">{{item.nickname}}</p>
    </li>
  </ul>
</div>

</template>

<script>

import {
  getMemberList,
  getSearchQuery
} from '../../vuex/getters'

import {
  selectMember
} from '../../vuex/actions'

export default {
  props: ['sessionIndex', 'session'],
  filters: {
    search(list) {
      return list.filter(item => item.nickname.indexOf(this.query) > -1 || item.py.toLowerCase().indexOf(this.query.toLowerCase()) > -1)
    }
  },
  vuex: {
    getters: {
      memberList: getMemberList,
      query: getSearchQuery
    },
    actions: {
      select: selectMember
    }
  }
};

</script>
