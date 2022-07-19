<script lang="ts" setup>
import { ref } from 'vue';

const size = ref(10);
</script>

<template>
  <SelfPagination :total="100" />
</template>

<style lang="scss" scoped></style>
