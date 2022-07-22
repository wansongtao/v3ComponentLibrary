<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const onChange = (date: string) => {
  console.log(date);
}
</script>

<template>
  <AntDatePicker label="开始日期" placeholder="请选择日期" :value="value" @change-date="onChange" />
</template>

<style lang="scss" scoped>

</style>