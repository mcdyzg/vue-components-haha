import Badge from './cm_badge.vue'

Badge.install = (Vue) => {
	Vue.component(Badge.name, Badge)
}

export default Badge