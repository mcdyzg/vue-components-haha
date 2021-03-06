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
// 发送验证码的倒计时组件
import CountDown from './mm_countdown'
// 下拉列表组件
import DropDown from './cm_dropdown'
// 轮播组件2.0
import { HahaSwiper, HahaSwiperItem } from './haha_swiper'
// Toast组件
import Toast from './cm_toast'
// 返回顶部组件
import BackTop from './cm_backtop'
// import cm_infiniteload from './cm_infiniteload'
import InfiniteLoad from './infinite-load'
// 下拉上拉刷新组件
import loadmore from './loadmore'
// 平滑滚动下拉上拉刷新组件
import scroller from './scroller'
// 评分组件
import cm_star from './cm_star'
// 倒计时组件2.0
import countdown from './countdown'
// 顶部悬浮头部，页面上滑显示，下滑隐藏
import FixedHead from './fixed_head'
// dialog组件，ios风格确认框
import Dialog from './dialog'
//注册imgZoom组件，组件里执行了Vue.prototype.$imgZoom = imgZoomFunction;注册成全局组件
import imgZoom from './imgZoom'



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
	Vue.component(CountDown.name, CountDown)
	Vue.component(DropDown.name, DropDown)
	Vue.component(HahaSwiper.name, HahaSwiper)
	Vue.component(HahaSwiperItem.name, HahaSwiperItem)
	Vue.component(BackTop.name, BackTop)
	Vue.component(loadmore.name, loadmore)
	Vue.component(scroller.name, scroller)
	Vue.component(cm_star.name, cm_star)
	Vue.component(countdown.name, countdown)
	Vue.component(FixedHead.name, FixedHead)
	// 像dialog这样的组件只能用方法调用，所以不需要注册一个组件，以下可省略，整体引用的时候只需要import Dialog from './dialog'即可，组件里自带Vue.prototype.$dialog = DialogFunction;
	// Vue.component(Dialog.name, Dialog)
	// Vue.use(cm_infiniteload)
	Vue.use(InfiniteLoad)

	Responsive()

	// Vue.prototype.$toast = Toast;
}

export default install
