<template>
	<div class="">
		<div

			ref='haha_tabbar'
			class="haha-tabbar-container">
			<div
				:class='{active:fixed}'
				:style='{top:fixed?topOffset+"px":"auto"}'
				ref='wrap'
				class="haha-tabbar-wrap">
				<slot></slot>
			</div>
			<div
				v-if='fixed'
				:style='{height:wrapHeight}'
				style="width:100%;">
			</div>
		</div>

	</div>
</template>

<script>
import './cm_tabbar.scss'
import getOffset from 'domtoolkit/getOffset'

export default {
	name:'cm-tabbar',
	props:{
		value:{
			type:String,
			default:'1'
		},
		topOffset:{
			type:Number,
			default:0,
		},
	},
	components:{

	},
	computed:{

	},
	data(){
		return {
			currentActive:this.value,
			// tabbar的原始getBoundingClientRect
			originTop: 0,
			// tabbar的高度，用于fixed的时候撑开原位置高度
			wrapHeight:'0px',
			fixed:false,
		}
	},
	watch:{
		value(val){
			this.currentActive = val;
		},
	},
	methods:{
		checkScroll(){
			const scrollTop = document.body.scrollTop;

			const originTop = getOffset(this.$refs.haha_tabbar).top

			if(scrollTop >= (originTop-this.topOffset)) {
				this.fixed = true;
			}else{
				this.fixed = false;
			}
		}
	},
	mounted(){
		this.$nextTick(function(){
			this.wrapHeight = window.getComputedStyle(this.$refs.haha_tabbar,null).height

			// this.originTop = getOffset(this.$refs.haha_tabbar).top
			//  + 56.69*this.$refs.haha_tabbar.getBoundingClientRect().width/414;

			window.addEventListener('scroll',this.checkScroll)
		})
	},
	beforeDestroy(){
		window.removeEventListener('scroll',this.checkScroll)
	}
}
</script>
