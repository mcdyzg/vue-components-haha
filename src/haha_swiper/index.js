import HahaSwiper from './haha_swiper'
import HahaSwiperItem from './haha_swiper_item'

const install = (Vue) => {
	Vue.component(Swiper.name, Swiper)
	Vue.component(SwiperItem.name, SwiperItem)
}

export default install

export {
	HahaSwiper,
	HahaSwiperItem
}