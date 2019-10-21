import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopCarContainer from './components/tabbar/ShopCarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'


// 3.创建路由对象
var router = new VueRouter({
	routes:[
		{ path: '/', redirect: '/home' },
		{ path: '/home', component: HomeContainer},
		{ path: '/member', component: MemberContainer},
		{ path: '/shopcar', component: ShopCarContainer},
		{ path: '/search', component: SearchContainer}
	],
	linkActiveClass: 'mui-active' //用与替换 router-link-active
})

export default router