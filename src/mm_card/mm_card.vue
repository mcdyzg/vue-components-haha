<template>
	<a :href='data.link || ""'>
		<div class="haha-card-wrap">
			<img class="haha-card-img" :src="data.cover_750x300 ||''">
			<div class="haha-card-content">
				<span>{{data.start_date}}</span>
				<span class="haha-card-baoming">{{data.category || "暂无"}} </span>
			</div>
			<img
				v-if='data.live'
				class="haha-card-icon"
			 	src="https://cdn.xueyuan.xiaobao100.com/shield/image/zhibozhong.png">
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
			let minute = date.getMinutes();
			if(minute.toString().length === 1) {
				minute ='0'+minute;
			}
			return `${date.getMonth()+1}月${date.getDate()}日 ${date.getHours()}:${minute}`
		}
	}
}
</script>
