<script lang="ts" setup>
const emits = defineEmits<{
  (event: 'update:visible', value: boolean): void;
  (event: 'updateSuccess'): void;
}>();
const props = defineProps({
  visible: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: '详情'
  }
});

const onCancel = () => {
  emits('update:visible', false);
};


const onUpdateRemark = () => {
  emits('update:visible', false);
  emits('updateSuccess');
};
</script>

<template>
  <a-modal
    :visible="visible"
    :title="title"
    @cancel="onCancel"
    @ok="onUpdateRemark"
  >
    <slot>
      <p>不过是大梦一场空</p>
      <p>不过孤影照惊鸿</p>
    </slot>
  </a-modal>
</template>

<style lang="scss" scoped></style>
