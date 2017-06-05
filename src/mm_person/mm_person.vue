<template>
	<div class="haha-people-container">
		<img :src="headimg ||''" class="hpc-headimg" />
		<div class="hpc-right-content">
			<div class="hpc-name">
				{{personName || '暂无'}}
			</div>
			<div class="hpc-intro">
				{{personIntro || '暂无'}}
			</div>
		</div>
	</div>
</template>

<script>
import './mm_person.scss'
// import Contern from '../mm_concern'

export default {
	name:'mm-person',
	props:[
		'headimg',
		'personName',
		'personIntro'
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
