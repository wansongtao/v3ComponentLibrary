<script lang="ts" setup>
import { ref, watch } from 'vue';
import { debounce } from '@/utils/index';

const emit = defineEmits<{
  (event: 'changepag', data: { page: number; size: number }): void;
}>();
const props = defineProps({
  total: {
    type: Number,
    default: 0
  },
  currPage: {
    type: Number,
    default: 1
  },
  size: {
    type: Number,
    default: 10
  },
  delay: { // 防抖时间，单位毫秒，设置为0则不防抖
    type: Number,
    default: 300
  }
});

const current = ref<number>(props.currPage);
const pageSize = ref<number>(props.size);
const onChange = debounce((page: number, size: number) => {
  emit('changepag', { page, size });
}, props.delay);

watch([() => props.currPage, () => props.size], ([page, size]) => {
  current.value = page;
  pageSize.value = size;
});
</script>

<template>
  <div class="self_pagination">
    <a-pagination
      v-model:current="current"
      v-model:pageSize="pageSize"
      show-quick-jumper
      :total="total"
      :show-total="(total: number) => `共${total}条`"
      :pageSizeOptions="['10', '20', '30', '40']"
      :showSizeChanger="true"
      @change="onChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.self_pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 0 20px;
  width: 100%;
  height: 50px;

  .ant-pagination {
    position: relative;

    :deep(.ant-pagination-total-text) {
      position: absolute;
      top: 0;
      left: -175px;
    }

    :deep(.ant-select) {
      position: absolute;
      top: 0;
      left: -104px;
    }
  }
}
</style>
