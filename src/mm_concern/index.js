import Concern from './mm_concern.vue'

Concern.install = (Vue) => {
	Vue.component(Concern.name, Concern)
}

export default Concern