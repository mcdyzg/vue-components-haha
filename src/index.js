import Title from './cm_title'
import Menu1 from './menu'
import swiper from './cm_swiper'
// 响应式组件不需要注册成vue组件，只需要执行一次
import Responsive from './cm_responsive'
// 轮播组件
import {SwiperComponent,SlideComponent} from './cm_swiper'
import TabsContainer from './cm_tabs_container'
import TabsItem from './cm_tabs_item'
import Badge from './cm_badge'
// tab头部组件
import Tabbar from './cm_tabbar'
import TabbarItem from './cm_tabbar_item'
// 人物介绍
import Person from './mm_person'
import Concern from './mm_concern'
import Card from './mm_card'
// 课程详情页的底部工具条
import Toolbar from './mm_toolbar'
// 模态框组件
import Modal from './cm_modal'
// 评分组件
import Rate from './cm_rate'

const install = (Vue) => {
	Vue.component(Title.name, Title)
	Vue.component(Menu1.name, Menu1)
	Vue.component(SwiperComponent.name, SwiperComponent)
	Vue.component(SlideComponent.name, SlideComponent)
	Vue.component(TabsContainer.name, TabsContainer)
	Vue.component(TabsItem.name, TabsItem)
	Vue.component(Badge.name, Badge)
	Vue.component(Person.name, Person)
	Vue.component(Concern.name, Concern)
	Vue.component(Card.name, Card)
	Vue.component(Tabbar.name, Tabbar)
	Vue.component(TabbarItem.name, TabbarItem)
	Vue.component(Toolbar.name, Toolbar)
	Vue.component(Modal.name, Modal)
	Vue.component(Rate.name, Rate)
	Responsive()
}

export default install
