<script lang="ts" setup>
import { ref, watch } from 'vue';
import { debounce } from '@/utils/index';

const emits = defineEmits<{ (event: 'changevalue', value: string): void }>();

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  maxLength: {
    type: Number,
    default: 50
  },
  delay: {
    type: Number,
    default: 200
  },
  value: {
    type: String,
    default: ''
  }
});

const inputValue = ref(props.value);
watch(
  inputValue,
  debounce((newVal: string) => {
    emits('changevalue', newVal);
  }, props.delay)
);
watch(() => props.value, (val) => {
  if (inputValue.value === val) {
    return;
  }

  inputValue.value = val;
});
</script>

<template>
  <div class="self_input">
    <div class="self_input_label" v-if="label">{{ label }}</div>
    <div class="self_input_main">
      <a-input
        v-model:value="inputValue"
        :placeholder="placeholder"
        :maxlength="maxLength"
        allow-clear
      />
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
