import Title from './cm_title'
import Menu1 from './menu'
import swiper from './cm_swiper'
// 响应式组件不需要注册成vue组件，只需要执行一次
import Responsive from './cm_responsive'
// 轮播组件
import {SwiperComponent,SlideComponent} from './cm_swiper'
import Tabs from './cm_tabs'
import Badge from './cm_badge'
// 人物介绍
import Person from './mm_person'
import Concern from './mm_concern'
import Card from './mm_card'

const install = (Vue) => {
	Vue.component(Title.name, Title)
	Vue.component(Menu1.name, Menu1)
	Vue.component(SwiperComponent.name, SwiperComponent)
	Vue.component(SlideComponent.name, SlideComponent)
	Vue.component(Tabs.name, Tabs)
	Vue.component(Badge.name, Badge)
	Vue.component(Person.name, Person)
	Vue.component(Concern.name, Concern)
	Vue.component(Card.name, Card)
	Responsive()
}

export default install
