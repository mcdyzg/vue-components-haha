import Title from './cm_title'
import Menu1 from './menu'
import swiper from './cm_swiper'
// 响应式组件不需要注册成vue组件，只需要执行一次
import Responsive from './cm_responsive'
// 轮播组件
import {SwiperComponent,SlideComponent} from './cm_swiper'

const install = (Vue) => {
	Vue.component(Title.name, Title)
	Vue.component(Menu1.name, Menu1)
	Vue.component(SwiperComponent.name, SwiperComponent)
	Vue.component(SlideComponent.name, SlideComponent)
	Responsive()
}

export default install
