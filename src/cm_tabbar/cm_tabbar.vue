<template>
	<div class="">
		<div
			:class='{active:fixed}'
			:style='{top:fixed?topOffset+"px":"auto"}'
			ref='haha_tabbar'
			class="haha-tabbar-container">
			<div ref='wrap' class="haha-tabbar-wrap">
				<slot></slot>
			</div>
		</div>
		<div
			v-if='fixed'
			:style='{height:wrapHeight}'
			class="haha-tabbar-container">

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

			if(scrollTop >= (this.originTop-this.topOffset)) {
				this.fixed = true;
			}else{
				this.fixed = false;
			}
		}
	},
	mounted(){
		this.$nextTick(function(){
			this.wrapHeight = window.getComputedStyle(this.$refs.haha_tabbar,null).height

			this.originTop = getOffset(this.$refs.haha_tabbar).top;

			window.addEventListener('scroll',this.checkScroll)
		})
	},
	beforeDestroy(){
		window.removeEventListener('scroll',this.checkScroll)
	}
}
</script>
