#这是我的项目

##制作首页APP组件
1. 完成 Header 区域， 使用的是 Mint-UI 中的 Header 组件
2. 制作底部的 Tabbar 区域， 使用的是 MUI 中的 Tabar.html 组件
3. 在中间区域放置一个 Router-view

##加载首页轮播图数据

##改造 九宫格 样式

##改造 新闻资讯 路由链接

##新闻资讯 页面制作

##实现新闻列表点击 跳转新闻详情

##实现新闻详情页面的布局和渲染

##单独封装一个评论子组件

##获取所有的评论数据

##实现点击加载更多的事件

##实现发表评论

##改造图片分享按钮

##绘制 图片列表 组件页面结构

##制作顶部滑动条的坑
1. 
1. 我们在初始化 滑动条 的时候，导入的mui.js， 但是控制台报错：ncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
 + 经过我们合理的推测， 可能是 mui.js 中 用到了 'caller', 'callee', and 'arguments' 等东西， 但是 bundle.js 中，默认启用严格模式， 所以这两者冲突了
 + 解决方案：
    1. 把 mui.js 中的 非严格 模式的代码改掉，但是不现实;
    2. 把 webpack 打包时的严格模式禁用掉