import TabbarItem from './cm_tabbar_item.vue'

TabbarItem.install = (Vue) => {
	Vue.component(TabbarItem.name, TabbarItem)
}

export default TabbarItem