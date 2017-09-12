import Head from './fixed_head.vue'

Head.install = (Vue) => {
	Vue.component(Head.name, Head)
}

export default Head
