import InfiniteScroll from './infinite-load.js'
import './infinite-load.scss'

InfiniteScroll.install = (Vue) => {
	Vue.directive('InfiniteScroll', InfiniteScroll);
}

export default InfiniteScroll
