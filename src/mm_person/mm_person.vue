<template>
	<div class="haha-people-container">
		<img src="https://f10.baidu.com/it/u=1483638295,2914570561&fm=72" class="hpc-headimg" />
		<div class="hpc-right-content">
			<div class="hpc-name">
				我是高晓松
			</div>
			<div class="hpc-contern">
				1833人已关注
			</div>
			<div class="hpc-news">
				最新课程：晓松奇谈世界很小晓松奇谈世界很小晓松奇谈世界很小晓松奇谈世界很小
			</div>
			<Contern class='hpc-contern-btn' :selected='false'></Contern>
		</div>
	</div>
</template>

<script>
import './mm_person.scss'
import Contern from '../mm_concern'

export default {
	name:'mm-person',
	props:[
	],
	components:{
		Contern
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
