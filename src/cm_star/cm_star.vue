<template>
	<div class="haha-star-wrap">
		<div @click='$emit("onChangeStar",item)' v-for='item in 5'>
			<star v-if='item <= +count' class='haha-star-item' />
			<notstar v-else class='haha-star-item' />
		</div>
	</div>
</template>

<script>
import './cm_star.scss'
import star from './svg/star.vue'
import notstar from './svg/notstar.vue'
console.log(star)

export default {
	name:'cm-star',
	props:{
		count:{
			type:Number,
			default:0,
		},
	},
	components:{
		star,
		notstar,
	}
}
</script>
