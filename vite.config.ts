import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      // dirs: [], // 指定自己的组件位置，设置为空数组可以不自动引入自己的组件
      resolvers: [AntDesignVueResolver()]
    })
  ],
  server: {
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.json', '.ts'] // 使用路径别名想省略的后缀名
  }
});
