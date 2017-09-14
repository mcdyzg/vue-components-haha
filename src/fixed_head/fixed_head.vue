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
	data(){
		return {
			showLogo:true,
			lastTop:0,
		}
	},
	mounted(){
		window.onscroll = debounce(20, this.checkScroll)
	},
	methods:{
		checkScroll(){
            let nowTop = document.documentElement.scrollTop || document.body.scrollTop
			nowTop - this.lastTop >= 0 ? this.showLogo = true : this.showLogo = false;
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
