<template>
	<transition name='fade'>
		<div v-if='visible' class="haha-toast">
			{{message}}
		</div>
	</transition>
</template>

<script>
import './cm_toast.scss'

export default {
	name:'cm-toast',
	components:{

	},
	watch:{
		// visible(newVal){
		// 	if(newVal){
		//
		// 	}
		// }
	},
	data(){
		return {
			visible:false,
			message:'请稍候重试'
		}
	},
	mounted(){
		this.startTimer();
	},
	methods:{
		startTimer(){
			setTimeout(()=>{
				this.visible = false;
				this.$el.addEventListener('transitionend',this.destroyElement)
			},3000)
		},

		destroyElement() {
	        this.$el.removeEventListener('transitionend', this.destroyElement);
	        this.$destroy(true);
	        this.$el.parentNode.removeChild(this.$el);
	    },
	}
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  	transition: all 0.5s;
}
.fade-enter,.fade-leave-active{
	opacity: 0;
}
</style>
