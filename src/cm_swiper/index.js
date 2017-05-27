import SwiperComponent from './swiper.vue'
import SlideComponent from './slide.vue'
import './swiper.scss'
if (typeof window !== 'undefined') {
	window.Swiper = Swiper
}
 
var swiper = {
  install: function(Vue) {
    Vue.component('swiper', SwiperComponent)
    Vue.component('swiper-slide', SlideComponent)
  }
}

export default swiper
export {
	SwiperComponent,
	SlideComponent
}
