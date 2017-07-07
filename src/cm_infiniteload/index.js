import Infiniteload from './cm_infiniteload.js'
import './cm_infiniteload.scss'

Infiniteload.install = (Vue) => {
	Vue.directive('InfiniteScroll', Infiniteload);
}

export default Infiniteload
