<template>
	<transition name='slide' appear>
        <div v-if='showLogo' class="haha-fixed-head">
			<slot></slot>
        </div>
    </transition>
</template>

<script>
import './fixed_head.scss'
import {debounce} from 'throttle-debounce'

export default {
	name:'fixed-head',
	props:{
		// 距离顶部多少px时才会显示
		offsetTop:{
			type:Number,
			default:0,
		},
	},
	data(){
		return {
			showLogo:true,
			lastTop:0,
		}
	},
	mounted(){
		window.onscroll = debounce(10, this.checkScroll)
		// window.onscroll = this.checkScroll
	},
	methods:{
		checkScroll(){
			// 现在的滚动高度
            let nowTop = document.documentElement.scrollTop || document.body.scrollTop

			// 如果小于设置高度，默认显示
			if(nowTop <= this.offsetTop) {
				this.showLogo = true
				return
			}

			if(nowTop - this.lastTop >= 0) {
				this.showLogo = false
			}else{
				this.showLogo = true;
			}
			// ((nowTop - this.lastTop >= 0) && (nowTop >= 0)) ? this.showLogo = true : this.showLogo = false;
            this.lastTop = nowTop
		}
	}
}
</script>
<style lang='scss' scoped>
.slide-enter-active, .slide-leave-active {
	transition: all 0.5s;
}
.slide-enter,.slide-leave-active{
	opacity: 0;
	transform: translateY(-100%);
}
</style>
