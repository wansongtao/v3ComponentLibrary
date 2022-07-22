import { ref } from 'vue';

/**
 * ant-design的table组件的复选框功能
 * @returns 
 */
const useTableSelection = () => {
  const checkedKeys = ref<(string | number)[]>([]);
  const rowSelection = ref({
    checkStrictly: false,
    onChange: (keys: (string | number)[]) => {
      checkedKeys.value = keys;
    }
  });

  return {
    checkedKeys,
    rowSelection
  };
};

export default useTableSelection;