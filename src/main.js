//入口文件

import Vue from 'vue'

import app from './App.vue'

import { Header } from 'mint-ui'
Vue.component( Header.name, Header)

//导入 MUI 样式
import './lib/mui/css/mui.min.css'


var vm = new Vue({
	el: '#app',
	render: c => c(app)
})