<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const emits = defineEmits<{ (event: 'changeDate', value: string): void }>();

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请选择日期'
  }
});

const date = ref(props.value);

watch(date, (newVal) => {
  if (newVal === props.value) {
    return;
  }

  emits('changeDate', newVal);
});

watch(
  () => props.value,
  (val) => {
    if (date.value === val) {
      return;
    }

    date.value = val;
  }
);

const disabledDate = (current: Dayjs) => {
  return current > dayjs();
};
</script>

<template>
  <div class="date_input">
    <div class="date_input_label" v-if="label">{{ label }}</div>
    <div class="date_input_main">
      <a-date-picker
        v-model:value="date"
        :placeholder="placeholder"
        :disabled-date="disabledDate"
        valueFormat="YYYY-MM-DD"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.date_input {
  display: flex;
  align-items: center;
  height: 40px;

  .date_input_label {
    flex-shrink: 0;
    padding-right: 10px;
  }

  .date_input_main {
    flex: 1;
  }

  :deep(.ant-picker) {
    width: 100%;
  }
}
</style>
