<template>
	<transition appear name='fade'>
		<div :class='className' v-if='visible' class="haha-dialog-wrap">

			<div class="haha-dialog-content">
				<div class="haha-dialog-text">
					{{message}}
				</div>
				<!-- <div class="border-top"></div> -->
				<div class="haha-dialog-btn-wrap">
					<div @click='close'>
						{{cancelText}}
					</div>
					<div @click='sure'>
						{{okText}}
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import './dialog.scss'

export default {
	name:'cm-dialog',
	data(){
		return {
			visible:false,
			// 通知内容
			message:'通知',
			className:'',
			// 确认按钮文本
			okText: '确认关闭',
			// 取消按钮文本
			cancelText: '取消',
			// 点确认的回调
			success(){
			},
			// 点取消的回调
			cancel(){
			}
		}
	},
	methods:{
		sure(){
			if(!this.visible) return
			this.success()
			this.visible = false
			this.$el.addEventListener('transitionend',this.destroyElement)
		},
		close(){
			if(!this.visible) return
			this.cancel()
			this.visible = false
			this.$el.addEventListener('transitionend',this.destroyElement)
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
