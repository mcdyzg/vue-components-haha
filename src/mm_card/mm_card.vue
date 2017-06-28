<template>
	<a :href='data.link || ""'>
		<div class="haha-card-wrap">
			<img class="haha-card-img" :src="data.cover_240x140 ||''">
			<div class="haha-card-content">
				<span>{{courseTime(data.start_time)}}</span>
				<span class="haha-card-baoming">{{data.category || "暂无"}} </span>
			</div>
		</div>
	</a>
</template>

<script>
import './mm_card.scss'

export default {
	name:'mm-card',
	props:[
		'data'
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
		courseTime(time){
			let date = new Date(time)
			return `${date.getMonth()+1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`
		}
	}
}
</script>
