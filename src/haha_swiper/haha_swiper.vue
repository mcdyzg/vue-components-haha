<template>
	<div 
		@touchstart='startDrag'
		@mousedown='startDrag'
		@touchmove="onDrag"
    	@mousemove="onDrag"
    	@touchend='endDrag'
		@mouseleave='endDrag'
		class="haha-swiper-container">
		<div 
			ref='wrap'
			class="haha-swiper-wrap">
			<slot></slot>
		</div>
		<div v-if='pagination' class="haha-swiper-pagination">
			<div 
				:class='{active: currentActive===num}'
				class="haha-swiper-pagination-item" 
				v-for='num in childrenNum'>
			</div>
		</div>
	</div>
</template>

<script>
import './haha_swiper.scss'
import arrayFindIndex from 'array-find-index';

export default {
	name:'haha-swiper',
	props:{
		default:{
			type:Number,
			default:1
		},
		pagination:{
			type:Boolean,
			default:true
		}
	},
	watch:{
		currentActive(val, oldValue) {
			// 触发组将上的input事件
			// this.$emit('input', val);
		    // const lastIndex = arrayFindIndex(this.$children,
		        // item => item.id === oldValue);
		    this.swipeLeaveTransition(+oldValue);
		}
	},
	data(){
		return {
			start: { x: 0, y: 0 },
		    swiping: false,
		    pageWidth: 0,
		    currentActive: this.default,
		    childrenNum:0
		}
	},
	mounted(){
		this.childrenNum = this.$children.length;
		this.wrap = this.$refs.wrap;
    	this.pageWidth = this.wrap.clientWidth;
    	this.limitWidth = this.pageWidth / 4;

	},
	methods:{
		startDrag(evt){
			evt = evt.changedTouches ? evt.changedTouches[0] : evt;
			this.dragging = true;
			this.start.x = evt.pageX;
      		this.start.y = evt.pageY;
		},
		endDrag(evt){
			if (!this.swiping) return;

			const direction = this.offsetLeft > 0 ? -1 : 1
			const isChange = Math.abs(this.offsetLeft) > this.limitWidth

			if(isChange) {
				this.index += direction
				this.currentActive = (this.index+1)
				return
			}
			this.swipeLeaveTransition()
		},
		onDrag(evt){
			if (!this.dragging) return;

			let swiping;
			const e = evt.changedTouches ? evt.changedTouches[0] : evt;
			const offsetTop = e.pageY - this.start.y;
			const offsetLeft = e.pageX - this.start.x;
			const y = Math.abs(offsetTop)
			const x = Math.abs(offsetLeft)

			swiping = !(x < 5 || (x >= 5 && y >= x * 1.73))
			if(!swiping) return;
			evt.preventDefault();

			const len = this.$children.length - 1;
			// const index = arrayFindIndex(this.$children, item => item.id === this.currentActive)
			const index = +(this.currentActive)-1
			const currentPageOffset = index * this.pageWidth;
			const offset = offsetLeft - currentPageOffset
			const absOffset = Math.abs(offset)

			if(absOffset > len * this.pageWidth || (offset > 0 && offset < this.pageWidth)) {
				this.swiping = false
				return
			}

			this.offsetLeft = offsetLeft;
			this.index = index;
			this.swipeMove(offset)
		},
		swipeMove(offset) {
			this.wrap.style.webkitTransform = `translate3d(${offset}px,0,0)`
			this.swiping = true
		},
		swipeLeaveTransition(lastIndex = 0) {
			// if(typeof this.index !== 'number') {
			// 	this.index = arrayFindIndex(this.$children,item => item.id === this.currentActive)
			// 	this.swipeMove(-lastIndex * this.pageWidth)
			// }
			setTimeout(() => {
				this.wrap.classList.add('haha-swipe-transition')
				this.swipeMove(-this.index * this.pageWidth)

				this.once(this.wrap, 'webkitTransitionEnd', _ => {
					this.wrap.classList.remove('haha-swipe-transition');
			        this.wrap.style.webkitTransform = '';
			        this.swiping = false;
			        this.index = null;
				})
			},0)
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
			if (elem.removeEventListenerListener) {
			    elem.removeEventListenerListener(type, eventHandle, false);
			} else if (elem.detachEvent) {
			    elem.detachEvent('on' + type, eventHandle);
			} else {
			    elem['on' + type] = null;
			}
		},
		next(){
			this.currentActive = 2 ;
		},
		prev(){

		},
		setPage(){

		}
	}
}
</script>
