<script lang="ts" setup>
import { ref } from 'vue';
import AntSelect from '@/components/AntSelect/index.vue';

const value = ref('');
const options = ref([
  {
    label: '苹果',
    value: '0'
  },
  {
    label: '菠萝',
    value: '1'
  },
  {
    label: '桔子',
    value: '2'
  }
]);

const onChangeValue = (value: string) => {
  console.log(value);
}
</script>

<template>
  <AntSelect
    label="选择器："
    placeholder="请选择"
    :value="value"
    :options="options"
    @change-value="onChangeValue"
  />
</template>

<style lang="scss" scoped></style>
