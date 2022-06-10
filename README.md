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
### 节流函数
函数第一次执行后，下次执行需要间隔一定的时间。详见[throttle](./src/utils/index.ts).  
### 防抖函数
延时执行函数，一定时间内多次触发，只执行最后触发的一次，可能永远不会执行。详见[debounce](./src/utils/index.ts).  
### 柯里化函数
将多变量函数拆解为单变量（或部分变量）的多个函数并依次调用。详见[curry](./src/utils/index.ts).  
### 文件切片
该方法接收三个参数，一个文件对象，一个开始切片位置，一个切片大小，返回切片数组。详见[fileSlice](./src/utils/index.ts).  
### 微信打开网页自动播放音视频
该方法只能解决使用微信打开网页后不能自动播放音视频的问题。chrome等浏览器不能自动播放，必须有交互后才能播放。详见[autoPlay](./src/utils/wxAutoPlay.ts).  
### 希尔排序方法
该方法接收两个参数，一个待排序数组，一个比较函数(可选)，返回一个数组，改变原数组。详见[shellSort](./src/utils/index.ts).  
