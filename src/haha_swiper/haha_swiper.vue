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
			:style='{transform:`translate3d(${-(currentActive-1)*pageWidth}px,0,0)`}'
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
		},
		autoplay:{
			type:Boolean,
			default:true
		}
	},
	computed:{
	},
	watch:{
		currentActive(val, oldValue) {
			// 触发组将上的input事件
			// this.$emit('input', val);
		    // const lastIndex = arrayFindIndex(this.$children,
		        // item => item.id === oldValue);
		    this.swipeLeaveTransition(+val);
		}
	},
	data(){
		return {
			start: { x: 0, y: 0 },
		    swiping: false,
		    pageWidth: 0,
		    currentActive: this.default,
		    childrenNum:0,
			interval:'',
		}
	},
	mounted(){
		this.childrenNum = this.$children.length;
		this.wrap = this.$refs.wrap;
    	this.pageWidth = this.wrap.clientWidth;
    	this.limitWidth = this.pageWidth / 4;

		this.AutoPlay();

	},
	methods:{
		AutoPlay(){
			if(this.autoplay) {
				this.interval = setInterval(()=>{
					this.next();
				},3000)
			}
		},
		startDrag(evt){
			this.dragging = true;
			evt = evt.changedTouches ? evt.changedTouches[0] : evt;
			this.start.x = evt.pageX;
      		this.start.y = evt.pageY;
			// 取消自动轮播
			clearInterval(this.interval)
		},
		endDrag(evt){
			if (!this.swiping) return;

			const len = this.$children.length - 1;
			const direction = this.offsetLeft > 0 ? -1 : 1
			let isChange = Math.abs(this.offsetLeft) > this.limitWidth
			// 如果移动的超出边界，返回原位置
			if(Math.abs(this.offset) > len * this.pageWidth || this.offset > 0) {
				isChange = false;
			}

			if(isChange) {
				this.index += direction
				this.currentActive = (this.index+1)
				this.AutoPlay()
				return
			}

			this.AutoPlay()
			this.swipeLeaveTransition()
		},
		onDrag(evt){
			if (!this.dragging) return;

			let swiping;
			const e = evt.changedTouches ? evt.changedTouches[0] : evt;
			// 移动的垂直距离
			const offsetTop = e.pageY - this.start.y;
			// 移动的水平距离
			const offsetLeft = e.pageX - this.start.x;
			const y = Math.abs(offsetTop)
			const x = Math.abs(offsetLeft)
			swiping = !(x < 5 || (x >= 5 && y >= x * 1.73))
			if(!swiping) return;
			evt.preventDefault();


			// 当前的轮播所在的index
			const index = +(this.currentActive)-1
			// 当前轮播的偏移位置
			const currentPageOffset = index * this.pageWidth;
			// 包裹层将要偏移的位置
			const offset = offsetLeft - currentPageOffset
			// 移动的距离
			// const absOffset = Math.abs(offset)


			this.offset = offset;
			this.offsetLeft = offsetLeft;
			this.index = index;
			this.swipeMove(offset)
		},
		swipeMove(offset) {
			this.wrap.style.webkitTransform = `translate3d(${offset}px,0,0)`
			this.swiping = true
		},
		swipeLeaveTransition(nowIndex = 0) {
			// setTimeout(() => {
				this.wrap.classList.add('haha-swipe-transition')
				const index = (this.index === null ? nowIndex-1 : this.index)
				this.swipeMove(-index * this.pageWidth)

				this.once(this.wrap, 'webkitTransitionEnd', _ => {
					this.wrap.classList.remove('haha-swipe-transition');
			        // this.wrap.style.webkitTransform = '';
			        this.swiping = false;
			        this.index = null;

				})
			// },0)
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
		next(){
			this.currentActive < this.childrenNum ? this.currentActive++ : this.currentActive = 1
		},
		prev(){
			this.currentActive > 1 ? this.currentActive-- : this.currentActive = this.childrenNum

		},
		setPage(){

		}
	}
}
</script>
