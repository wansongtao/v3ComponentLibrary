<script setup lang="ts"></script>

<template>
  <h1 class="title">所有模块如下</h1>
  <router-view></router-view>
</template>

<style>
@import url('./styles/base.css');
@import url('./styles/common.css');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.title {
  margin: 20px auto;
  font-size: 24px;
  text-align: center;
}
</style>
