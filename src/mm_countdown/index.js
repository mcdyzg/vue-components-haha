import CountDown from './mm_countdown.vue'

CountDown.install = (Vue) => {
	Vue.component(CountDown.name, CountDown)
}

export default CountDown