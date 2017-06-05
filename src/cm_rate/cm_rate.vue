<template>
	<div class="haha-rate-wrap">
		<i v-for='item in count' class="haha-rate-item"></i>
	</div>
</template>

<script>
import './cm_rate.scss'

export default {
	name:'cm-rate',
	props:[
		'count'
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
	},
	methods:{

	}
}
</script>
