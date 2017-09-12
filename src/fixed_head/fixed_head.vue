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
	props:[
	],
	components:{

	},
	computed:{

	},
	data(){
		return {
			showLogo:true,
		}
	},
	mounted(){
		window.onscroll = debounce(40, this.checkScroll)
	},
	methods:{
		checkScroll(){
            let nowTop = document.documentElement.scrollTop
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
