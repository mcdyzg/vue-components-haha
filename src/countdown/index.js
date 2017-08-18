import CountDown from './countdown.vue'

CountDown.install = (Vue) => {
	Vue.component(CountDown.name, CountDown)
}

export default CountDown
