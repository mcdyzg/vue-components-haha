<template>
	<div class="haha-tabbar-container">
		<div ref='wrap' class="haha-tabbar-wrap">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import './cm_tabbar.scss'

export default {
	name:'cm-tabbar',
	props:{
		value:{
			type:String,
			default:'1'
		}
	},
	components:{
		
	},
	computed:{

	},
	data(){
		return {
			currentActive:this.value
		}
	},
	watch:{
		value(val){
			this.currentActive = val;
		},
	},
	methods:{

	}
}
</script>
