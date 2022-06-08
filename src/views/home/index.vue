<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="home-container">
    <template v-for="item in router.options.routes" :key="item.name">
      <router-link :to="item.path" v-if="item.path !== '/'">
        {{ (item.meta && item.meta.title) || item.name }}
      </router-link>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  display: flex;
  flex-wrap: wrap;

  a {
    display: block;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 14px;
    color: #000;
    border: 1px solid #999;
  }
}
</style>
