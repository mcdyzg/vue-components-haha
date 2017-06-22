<template>
	<transition name='slide'>
		<div
			v-if='show'
			@click='scrollTop'
			class="haha-backToTop"></div>
	</transition>
</template>

<script>
import './cm_backtop.scss'

export default {
	name:'cm-backtop',
	props:{
		// scrollTop是多少时隐藏
		offsetTop:{
			type:Number,
			default:200,
		},
	},
	components:{

	},
	computed:{

	},
	data(){
		return {
			show:false,
		}
	},
	created(){
	},
	methods:{
		scrollTop(){
			// this.show = true;
			window.scrollTo(0,0)
			this.$emit('click')
		},
		checkScroll(){
			document.body.scrollTop >= this.offsetTop ? this.show = true : this.show = false;
		}
	},
	mounted(){
		this.$nextTick(function(){
			// if(document.body.scrollTop >)
			window.addEventListener('scroll',this.checkScroll)
		})
	},
	beforeDestroy(){
		window.removeEventListener('scroll',this.checkScroll)
	}
}
</script>
<style scoped>
.slide-enter-active, .slide-leave-active {
  	transition: all 0.5s;
}
.slide-enter,.slide-leave-active{
	transform:translate(0,50px);
	opacity: 0;
}
</style>
