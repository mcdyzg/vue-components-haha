<template>
	<div class="haha-countdown" :class='{active:closedown===0}' @click='countdown'>
		{{context}}
		<slot />
	</div>
</template>

<script>
import './mm_countdown.scss'

export default {
	name:'mm-countdown',
	props:[
		'duration'
	],
	components:{

	},
	computed:{
		context(){
			return this.closedown === 0 ? '发送验证码' : `重新发送 ${this.closedown}`
		}
	},
	data(){
		return {
			allowClick:true,
			Interval:'',
			closedown:0
		}
	},
	created(){
	},
	methods:{
		countdown(e){

			if(!this.allowClick) return

			this.allowClick = false;
			this.closedown = this.duration === undefined ? 60 : +(this.duration)
			this.Interval = setInterval(()=> {
				this.closedown--
				if(this.closedown === 0) {
					clearInterval(this.Interval)
					this.allowClick = true;
					return;
				}
			},1000)
			this.$emit('onClick',e);
		}
	}
}
</script>
