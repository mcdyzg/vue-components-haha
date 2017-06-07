<template>
	<div>
		<div @click='show = !show'>
			<slot name='header' />
		</div>
		<transition name='slide' >
			<div v-show='show'>
				<slot name='content' />
			</div>
		</transition>
	</div>
</template>

<script>
import './cm_dropdown.scss'

export default {
	name:'cm-dropdown',
	props:[
	],
	components:{
		
	},
	computed:{

	},
	data(){
		return {
			show:true
		}
	},
	methods:{

	}
}
</script>
<style scoped>
.slide-enter-active, .slide-leave-active {
  	transition: all 0.5s;
}
.slide-enter,.slide-leave-active{
	opacity: 0;
	/*height:0px;*/
}
</style>
