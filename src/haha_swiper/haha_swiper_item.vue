<template>
	<div v-show='$parent.swiping || $parent.currentActive === index' class="haha-swiper-item">
		<slot />
	</div>
</template>

<script>

import arrayFindIndex from 'array-find-index';

export default {
	name:'haha-swiper-item',
	props:[
	],
	components:{
		
	},
	computed:{

	},
	data(){
		return {
			index:arrayFindIndex(this.$parent.$children, item => item._uid === this._uid)+1
		}
	},
	created(){
	},
	methods:{

	}
}
</script>
<style scoped lang="scss">
.haha-swiper-item{
	flex-shrink:0;
	width:100%;
}
</style>
