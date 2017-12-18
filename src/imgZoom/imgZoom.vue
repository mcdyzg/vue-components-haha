<template>
<div ref='imgZoomWrap' @click='destroyElement' v-show='visible' class="haha-img-zoom-wrap">
    <transition name='fade'>
		<div v-if='visible' class="haha-img-zoom-overlay">
		</div>
	</transition>
    <div ref='imgZoom' class="haha-img-zoom-content">

    </div>
</div>

</template>

<script>
import './imgZoom.scss'

export default {
	name:'haha-img-zoom',
	components:{

	},
	watch:{
		// visible(newVal){
		// 	if(newVal){
		//
		// 	}
		// }
	},
    mounted(){
        this.$refs.imgZoom.appendChild(this.imgdom)

        // 阻止body滚动
        this.$refs.imgZoomWrap.addEventListener('touchmove',function(e){
            e.preventDefault()
        })
    },
	data(){
		return {
			visible:false,
		}
	},
	methods:{
		destroyElement() {
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
