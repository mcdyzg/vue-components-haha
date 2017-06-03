<template>
<div 
	@touchstart='startDrag'
	@mousedown='startDrag'
	@touchmove="onDrag"
    @mousemove="onDrag"
	@touchend='endDrag'
	@mouseleave='endDrag'
	class="haha-tabs-container">
	<div 
		ref='wrap'
		class="haha-tabs-wrap">
		<slot></slot>
	</div>
</div>
</template>

<script>
import './cm_tabs_container.scss'
import arrayFindIndex from 'array-find-index';

export default {
	name:'cm-tabs-container',
	props:{
		value:{
			// type:String
		},
		swipeable: Boolean
	},
	components:{
		
	},
	computed:{

	},
	data(){
		return {
			start: { x: 0, y: 0 },
		    swiping: false,
		    pageWidth: 0,
		    currentActive: this.value
		}
	},
	watch:{
		value(val){
			this.currentActive = val;
		},
		currentActive(val, oldValue) {
			// 触发组将上的input事件
			this.$emit('input', val);
		    if (!this.swipeable) return;
		    const lastIndex = arrayFindIndex(this.$children,
		        item => item.id === oldValue);
		    this.swipeLeaveTransition(lastIndex);
		}
	},
	created(){

	},
	mounted(){
		if(!this.swipeable) return 

		this.wrap = this.$refs.wrap;
    	this.pageWidth = this.wrap.clientWidth;
    	this.limitWidth = this.pageWidth / 4;
	},
	updated(){
	},
	methods:{
		startDrag(evt){
			if (!this.swipeable) return;

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
				const child = this.$children[this.index]
				if(child) {
					this.currentActive = child.id
					return
				}
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
			const index = arrayFindIndex(this.$children, item => item.id === this.currentActive)
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
			if(typeof this.index !== 'number') {
				this.index = arrayFindIndex(this.$children,item => item.id === this.currentActive)
				this.swipeMove(-lastIndex * this.pageWidth)
			}
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
		    	  	fn.apply(this, arguments);
		    	}
		    	t.off(el, event, listener);
		  	};
		  	this.on(el, event, listener);
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
		}
	}
}
</script>
