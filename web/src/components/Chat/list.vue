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
    margin: 0 0 0 15px;
  }
}

</style>

<template>

<div class="m-list">
  <ul>
    <li v-for="item in userList | search" :class="{ active: session.UserName === item.UserName }" @click="select(item)">
      <img class="avatar" width="30" height="30" :alt="item.NickName" :src="'http://wx2.qq.com' + item.HeadImgUrl">
      <p class="name">{{item.NickName}}</p>
    </li>
  </ul>
</div>

</template>

<script>

export default {
  props: ['userList', 'sessionIndex', 'session', 'search'],
  methods: {
    select(value) {
      this.sessionIndex = this.userList.indexOf(value);
    }
  },
  filters: {
    search(list) {
      return list.filter(item => item.NickName.indexOf(this.search) > -1);
    }
  }
};

</script>
