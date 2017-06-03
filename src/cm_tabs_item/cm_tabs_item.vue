<template>
	<div v-show='$parent.swiping || $parent.currentActive === id' class="haha-tabs-item">
		<slot></slot>
	</div>
</template>

<script>
import './cm_tabs_item.scss'

export default {
	name:'cm-tabs-item',
	props:[
		'id'
	],
	components:{
		
	},
	computed:{

	},
	data(){
		return {

		}
	},
	created(){
		// console.log(this)
	},
	methods:{

	}
}
</script>
