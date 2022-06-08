# vue3组件库（Vue 3 + TypeScript）
vue3个人组件库，工作、学习积累，包含常用js方法、常用css、一些封装组件。  
主要使用了vue3、vite、pnpm、ts、vue-router4技术。模块化路由，即在每个页面级组件单独配置自己的路由，然后在router文件引入。

## js常用方法
### 元素转图片方法
使用html2canvas库将页面元素转换为图片。该方法接收两个参数，一个dom元素，一个配置对象。详见[domToImage](./src/utils/domToImg.ts)方法.  