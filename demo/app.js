import Vue from 'vue'
import App from './App.vue'

// 全局可引用
import All from '..'
Vue.use(All)

// import { cm_title,menu,cm_swiper,cm_responsive } from '..'
// Vue.use(cm_title)
// Vue.use(cm_responsive)
// Vue.use(menu)
// Vue.use(cm_swiper)

new Vue({
	el: '#app',
	data() {
		return {

		}
	},
	template: '<App/>',
	components: { App },
	created() {
	}
})
