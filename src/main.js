//入口文件

import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)
//每次刚进入网站，肯定会调用 main.js， 在刚调用的时候，先从本地存储中， 将购物车数据读出来
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
	state: { //this.$store.state.***
		car: car //将 购物车中的商品数据 用数组存起来， 数组中每一项就是一个对象， { id:商品id, count:商品数量,  
				// price: 商品单价, selected: 是否被选中 }
	},
	mutations: { //this.$store.commit('方法名称', '参数')
		addToCar(state, sharedata){
			var flag = false;
			state.car.forEach( item => {
				if(item.id == sharedata.id){
					flag = true;
					item.count += sharedata.count;
				}
				
			});
			if(!flag){
				state.car.push(sharedata);
			}

			//当更新 car 数组后， 将新的car存入本地内存
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		updateGoodsInfo(state, goodsinfo){
			//修改购物车种商品数量值
			// console.log(typeof goodsinfo.id)
			state.car.forEach( item => {
				// console.log(typeof item.id)
				if(item.id == goodsinfo.id){
					item.count = parseInt(goodsinfo.count);		
				}
				
			});

			//当更新 car 数组后， 将新的car存入本地内存
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		delGoodsInfo(state, id){
			state.car.forEach( (item, i) => {
				if(item.id == id){
					console.log(i)
					state.car.splice(i, 1)
				}
				
			})
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		updateGoodsSelected(state, info){
			state.car.forEach( (item, i) => {
				if(item.id == info.id){
					item.selected = info.selected
				}
				
			})
			localStorage.setItem('car', JSON.stringify(state.car))
		}
	},
	getters: { //this.$store.getters.***
		getAllCounts(state){
			var c = 0;
			state.car.forEach( item => {
				c += item.count;
			})
			return c
		},
		getGoodsCounts(state){
			var o = {};
			state.car.forEach( item => {
				o[item.id] = item.count;
			})
			return o;
		},
		getGoodsSelected(state){
			var o = {};
			state.car.forEach( item => {
				o[item.id] = item.selected;
			})
			return o;
		},
		getGoodsCountAndMount(state){
			var o = {
				count:0,
				mount:0
			}
			state.car.forEach( item => {
				if(item.selected){
					o.count += item.count;
					o.mount += item.price * item.count
				}
			})
			return o;
		}
	}
})

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
import VueRouter from 'vue-router'
// 1.2 手动安装
Vue.use(VueRouter)
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
	router,// 1.4 挂载路由对象到 VM 实例上
	store //挂载 store 状态管理
})