<template>
	<div @click='onClick' :class='{active:isSendingD}' class="haha-countdown2">
		{{text}}
	</div>
</template>

<script>
import './countdown.scss'

export default {
	name:'countdown',
	props:{
		normalText:{
			type:String,
			default:'发送验证码'
		},
		activeText:{
			type:String,
			default:'重新发送'
		},
		isSending:{
			type:Boolean,
			default:false,
		},
		count:{
			type:Number,
			default:60,
		},
	},
	data(){
		return {
			// 倒计时秒数
			countD:+(this.count) || 60,

			// 是否正在发送
			isSendingD:this.isSending,

			// 验证码框内的文案
			text:this.normalText || '发送验证码',
		}
	},
	created(){
	},
	methods:{
		// 验证码组件被点击
		onClick(){
			// 由外部控制验证码组件可不可以点，内部只做是否倒计时的控制
			if(!this.isSending) {
				this.$emit('click')
			}
		},
		countdown(callback){
			if(this.isSendingD) return

			// 进入倒计时
			// 是倒计时状态变为true
			this.isSendingD = true
			// 重置倒计时秒数
			this.countD = this.count
			// 文案变成倒计时状态
			this.text = this.activeText + this.countD
			this.Interval = setInterval(()=> {
				// 每秒减一
				this.countD--
				// 倒计时文案更新
				this.text = this.activeText+this.countD
				// 如果倒计时结束了，清除定时器，使状态变为可以倒计时，文案变成正常状态文案
				if(this.countD === 0) {
					clearInterval(this.Interval)
					this.isSendingD = false;
					this.text = this.normalText
					callback()
					return;
				}
			},1000)
		},
	},
}
</script>
