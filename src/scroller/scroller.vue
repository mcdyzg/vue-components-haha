<template>
	<div class='haha-scroller-wrap' style='background:#eee;'>
		<div
			@mousedown='mousedown'
			@mouseup='mouseup'
			@mousemove='mousemove'
			@touchstart='touchstart'
			@touchmove='touchmove'
			@touchend='touchend'
			class="haha-scroller-content"
			:class="{'haha-scroller-transition':!touch}">
			<div
				v-if='_events.onRefresh && showRefresh'
				class="haha-scroller-spin-top" >
				<loading/>
			</div>
			<slot></slot>
			<div
				v-if='_events.onInfinite'
				class="haha-scroller-spin-bottom" >
				<loading/>
			</div>
		</div>
	</div>

</template>

<script>
import './scroller.scss'
import loading from './loading'


export default {
	name:'scroller',
	props:[
		// 'onRefresh'
	],
	components:{
		loading
	},
	computed:{

	},
	data(){
		return {
			touch:false,
	        lastY:0,
	        offsetY:0,

			lastTwoY:0,

			target:'',

			showRefresh:false,
		}
	},
	created(){
	},
	methods:{
		mousedown(e){
			this.touch = true
            this.lastY = e.clientY;
			this.lastTwoY = this.lastY
		},
		mouseup(e){
			this.touch = false
			let temY = (this.lastY - this.lastTwoY)*6;
			this.offsetY += temY;
			let target = e.currentTarget
			e.currentTarget.style.transform =`translate(0px,${this.offsetY}px)`
			this.once(e.currentTarget,'webkitTransitionEnd',_=>{
				this.$nextTick(()=>{
					let contentH = +(getComputedStyle(document.querySelector('.haha-scroller-content')).height).slice(0,-2)
					let containerH = +(getComputedStyle(document.querySelector('.haha-scroller-wrap')).height).slice(0,-2)

					if(Math.abs(this.offsetY)+containerH > contentH && this.offsetY <0) {
						this.offsetY = -(contentH-containerH)
						target.style.transform =`translate(0px,${this.offsetY}px)`
					}else if(this.offsetY > 0){
						this.offsetY = 0
						target.style.transform =`translate(0px,${this.offsetY}px)`
					}
				})

			})
		},
		mousemove(e){
			e.preventDefault();
            if(this.touch){
				this.lastTwoY = this.lastY
                let temY = e.clientY - this.lastY;
                this.offsetY += temY;
                e.currentTarget.style.transform =`translate(0px,${this.offsetY}px)`
                this.lastY = e.clientY;
            }
		},
		touchstart(e){
			this.touch = true
            this.lastY = e.touches[0].clientY;
			this.lastTwoY = this.lastY
		},
		touchmove(e){
			e.preventDefault()
			if(this.touch){
				this.lastTwoY = this.lastY
                let temY = e.touches[0].clientY - this.lastY;
                this.offsetY += temY;
                e.currentTarget.style.transform =`translate(0px,${this.offsetY}px)`
                this.lastY = e.touches[0].clientY;
            }
		},
		touchend(e){

			this.touch = false
			let temY = (this.lastY - this.lastTwoY)*4;
			console.log(this.offsetY)

			let hasRefresh = false
			// 如果触发了上拉刷新
			if(this.offsetY > 46) {
				hasRefresh = this._events.onRefresh && this._events.onRefresh.length !== 0
				hasRefresh && this._events.onRefresh[0]()
				this.showRefresh = true
			}

			this.offsetY += temY;
			let target = e.currentTarget
			this.target = target
			e.currentTarget.style.transform =`translate(0px,${this.offsetY}px)`
			this.once(e.currentTarget,'webkitTransitionEnd',_=>{
				this.$nextTick(()=>{
					let contentH = +(getComputedStyle(document.querySelector('.haha-scroller-content')).height).slice(0,-2)
					let containerH = +(getComputedStyle(document.querySelector('.haha-scroller-wrap')).height).slice(0,-2)

					if(Math.abs(this.offsetY)+containerH > contentH && this.offsetY <0) {
						// 如果下拉加载更多
						let hasInfinite = this._events.onInfinite && this._events.onInfinite.length !== 0
						hasInfinite && this._events.onInfinite[0]()

						let offY = hasInfinite ? 46:0
						this.offsetY = -(contentH-containerH)
						target.style.transform =`translate(0px,${this.offsetY-offY}px)`
					}else if(this.offsetY > 0){

						this.offsetY = 0
						let offY = hasRefresh ? 46:0
						target.style.transform =`translate(0px,${offY}px)`
					}
				})

			})
			// console.log(e.changedTouches[0].clientY-this.lastTwoY)
		},
		finishRefresh(){
			this.target.style.transform =`translate(0px,${this.offsetY}px)`
			this.showRefresh = false
		},
		finishInfinite(){
			this.target.style.transform =`translate(0px,${this.offsetY}px)`
		},
		once(el, event, fn) {
			let t = this;
		  	let listener = function() {
		    	if (fn) {
		    	  	fn.apply(t, arguments);
		    	}
		    	t.off(el, event, listener);
		  	};
		  	t.on(el, event, listener);
		},
		on(elem, type, eventHandle){
		  	if (elem == null || typeof elem === 'undefined') {
		    	return;
		  	}
		  	if (elem.addEventListener) {
		    	elem.addEventListener(type, eventHandle, false);
		  	} else if (elem.attachEvent) {
		  	  	elem.attachEvent('on' + type, eventHandle);
		  	} else {
		  	  	elem['on' + type] = eventHandle;
		  	}
		},
		off(elem, type, eventHandle){
			if (elem == null || typeof elem === 'undefined') {
		    	return;
		  	}
			if (elem.removeEventListener) {
			    elem.removeEventListener(type, eventHandle, false);
			} else if (elem.detachEvent) {
			    elem.detachEvent('on' + type, eventHandle);
			} else {
			    elem['on' + type] = null;
			}
		},
	}
}
</script>
