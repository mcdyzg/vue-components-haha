<template>
	<div @click='$emit("concern")' class="haha-components-concern" :style="{'border-color':color,color:color}" >
	<svg class='hcc-icon' v-if='!selected' viewBox="0 0 1024 1024" width="0.8rem" height="0.8rem"><path d="M568.479339 456.002638 568.479339 59.983139 455.915657 59.983139 455.915657 456.002638 59.896158 456.002638 59.896158 568.56632 455.915657 568.56632 455.915657 964.585819 568.479339 964.585819 568.479339 568.56632 964.498838 568.56632 964.498838 456.002638Z" fill="#f95c25"></path></svg>
		<span class="hcc-text">{{selected?'已关注':'关注'}}</span>
	</div>
</template>

<script>
import './mm_concern.scss'

export default {
	name:'mm-concern',
	props:[
		'text',
		'selected'
	],
	components:{
		
	},
	computed:{
		color(){
			return this.selected ? '#9a9a9a':'#f95c25'
		}
	},
	data(){
		return {
			choosed:false,
		}
	},
	created(){
		// this.$emit('concern')
	},
	methods:{
		
	}
}
</script>
