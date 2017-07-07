import Infiniteload from './cm_infiniteload.js'

Infiniteload.install = (Vue) => {
	Vue.directive('InfiniteScroll', Infiniteload);
}

export default Infiniteload
