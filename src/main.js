//入口文件

import Vue from 'vue'

import app from './App.vue'

// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component( Header.name, Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
Vue.use(MintUI)

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//导入 MUI 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 1.1 导入路由
import VueRourer from 'vue-router'
// 1.2 手动安装
Vue.use(VueRourer)
// 1.3 导入 自己的 Router.js 路由模块
import router from "./router.js"
// 导入时间插件
import moment from "moment"
Vue.filter("dateFormat", function(dataStr, pattern=" YYYY-MM-DD HH:MM:SS"){
	return moment(dataStr).format(pattern)
})

//2.1 导入并安装 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 请求的全局根路径
Vue.http.options.root = "http://www.liulongbin.top:3005"


var vm = new Vue({
	el: '#app',
	render: c => c(app),
	router // 1.4 怪哉路由对象到 VM 实例上
})