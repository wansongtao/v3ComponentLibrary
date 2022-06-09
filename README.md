# vue3组件库（Vue 3 + TypeScript）
vue3个人组件库，工作、学习积累，包含常用js方法、常用css、一些封装组件。  
主要使用了vue3、vite、pnpm、ts、vue-router4技术。模块化路由，即在每个页面级组件单独配置自己的路由，然后在router文件引入。

## 常用css
有移动端的1px方案、超出一行换行、超出多行换行、禁止选中文本、自定义光标颜色、自定义滚动条等，详见[styles/common](./src/styles/common.css).

## js常用方法
### 元素转图片
使用html2canvas库将页面元素转换为图片。该方法接收两个参数，一个dom元素，一个配置对象。详见[domToImage](./src/utils/domToImg.ts)方法.  
### 获取任意数据的类型
原理Object.prototype.toString.call方法。详见[getDataType](./src/utils/index.ts).  
### 将一些内容添加到剪切板
原理：创建一个多行文本框，然后选中文本，最后调用document.execCommand方法。该方法只接收一个字符串类型的参数。详见[clipboard](./src/utils/index.ts).  
### 时间格式化
原理：使用正则匹配。该方法接收两个参数：第一个参数Date对象，默认当前时间；第二个参数格式字符串，默认yyyy/MM/dd HH:mm:ss。返回对应的格式字符串。详见[formatTime](./src/utils/index.ts).  
### 函数式编程实现
该方法接收多个函数型参数，返回一个函数。从左往右执行每个函数，上个函数的返回值会作为下个函数的参数。详见[compose](./src/utils/index.ts).  
