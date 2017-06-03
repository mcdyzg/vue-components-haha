<template>
	<div 
		@click='changeTab'
		:class='{active: $parent.currentActive === index}' 
		class="haha-tabbar-item">
		<slot></slot>
	</div>
</template>

<script>
import './cm_tabbar_item.scss'
import arrayFindIndex from 'array-find-index';

export default {
	name:'cm-tabbar-item',
	props:[
	],
	components:{
		
	},
	computed:{

	},
	data(){
		return {
			index:(arrayFindIndex(this.$parent.$children, item => item._uid === this._uid)+1).toString()
		}
	},
	methods:{
		changeTab(){
			this.$parent.$emit('input', this.index);
		}
	}
}
</script>
