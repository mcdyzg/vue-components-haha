<template>
	<div class="haha-mm-toolbar">
		<!-- <div @click='$emit("shareClick")' class="haha-mm-toolbar-item"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAbCAMAAAC3FHQgAAAAV1BMVEX///9mZmZtbW2CgoJqamrNzc37+/vv7+/R0dGwsLCNjY29vb3z8/Ovr6/y8vKIiIiEhIR+fn7W1taZmZnl5eXd3d24uLi3t7enp6eenp6VlZV0dHRvb28e+2t6AAAAvElEQVQoz42R2w6DIBBE3QFBELzU3tv//84a1MAiIZ3wwHJgMzs0Z3UWsF1TlqEgU4Qd7Sq+tge1JYqD4h+q+hEYexWKC3hnLbZK6HW/EDFXKsCA3R2Eh08n6uPtD9GieRojRc2X3KNMqGoqFAzknaftxHkhpTAucwUzrAftd69aNhHW9dRtvN2yNG5vIpn6GEKSEzCFJK8vSuVzk3NKRW18klWKnIpqZ1N1NYBNlIunccaISRbk/Cyx/cIP7acFmqBJw7oAAAAASUVORK5CYII=">分享</div> -->
		<!-- <div @click='$emit("giftClick")' class="haha-mm-toolbar-item"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAMAAAA3HE0QAAAAclBMVEVmZmb///9wcHBxcXGXl5f+/v77+/vc3NyoqKhoaGjv7+/n5+fU1NSQkJB8fHxubm6zs7OdnZ34+Pjx8fHp6eno6OjNzc3IyMjCwsK4uLitra2ioqJ1dXVsbGz6+vrz8/Pg4ODOzs6/v7+6urqKioqGhob3peWBAAAAv0lEQVQoz+2RVw7DIBBEh2Yb915iOz33v2IgIIWPYC6Q+WDLPGkXLYhR9qin1uZiekm2dqaAaa1Qqhahi5YDu0R5cYAFtL5zgEeERAW2nKRPNA5QIldvvOlmLstUFSmkA0icdegZZsX1Ou9AHYAh/cQRLBdmuRmFAxRoMpugrK+CiJHiZoAoofCKJhESHOoEhph4FSsbIAcCgkBwRHDJ8Df1IJ+0+Qe+QOXzdwtwH8AtkFHPJTILkIH/mFLxQXtv7bsHFUOspHcAAAAASUVORK5CYII=">送好友</div>
		<div @click='$emit("inviteClick")' class="haha-mm-toolbar-item"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAfCAMAAADHso01AAAAVFBMVEVmZmb///+Xl5dtbW39/f2KiopwcHDo6Oj6+vrw8PC4uLh+fn6urq719fXp6enX19fR0dHNzc3JycnCwsLBwcGlpaWdnZ2RkZGGhoZ2dnZqamqtra3waTydAAAAr0lEQVQoz73Ryw7CIBRF0d0LAra+7dv//0/boCWkvZ2YuEfASs4EiqyyzO8511Dr/GDqofFtnHm8rfgihiwjl8Tescr5hYXuWGQdO2Rhw1eTYxaG3NLb7xzi8cCnQ+QQ2co2S5jZtmyP09qJGzSmsZyA7XGYsDI6mwpw2rgjpnDqdc7xfCLLlSFhKNc/PDxtRPsc2Kq62wnvFVr99drzv8w+yh4L3unqPIUXoyyLL96vMAVfMAbbvgAAAABJRU5ErkJggg==">邀请卡</div> -->
		<div
			@click='$emit("buyClick")'
			:style='{background:background}'
			 class='haha-mm-toolbar-btn'>{{text || '暂无'}}</div>
	</div>
</template>

<script>
import './mm_toolbar.scss'

export default {
	name:'mm-toolbar',
	props:[
		'background',
		'text',
	],
	components:{

	},
	computed:{
		// buytext(){
		// 	return this.hasBuy ? '去听课':'立即报名'
		// }
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
