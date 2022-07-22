<script lang="ts" setup>
import { ref, watch } from 'vue';
import { DefaultOptionType } from 'ant-design-vue/es/vc-select/Select';

interface IProps {
  label?: string;
  placeholder?: string;
  value?: string;
  options?: DefaultOptionType[];
}

const emits = defineEmits<{ (event: 'changeValue', value: string): void }>();

const props = withDefaults(defineProps<IProps>(), {
  label: '',
  placeholder: ''
});

const inputVal = ref();
watch(inputVal, (value) => {
  if (value === props.value) {
    return;
  }

  emits('changeValue', value as string);
});

watch(
  () => props.value,
  (val) => {
    if (inputVal.value === val) {
      return;
    }

    if (val === '') {
      inputVal.value = undefined;
      return;
    }

    inputVal.value = val;
  }
);
</script>

<template>
  <div class="self_input">
    <div class="self_input_label" v-if="label">{{ label }}</div>
    <div class="self_input_main">
      <a-select
        v-model:value="inputVal"
        :placeholder="placeholder"
        :options="options"
        allowClear
        style="width: 100%; text-align: left;"
      >
      </a-select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.self_input {
  display: flex;
  align-items: center;
  height: 40px;

  .self_input_label {
    flex-shrink: 0;
    padding-right: 10px;
  }

  .self_input_main {
    flex: 1;
  }
}
</style>
