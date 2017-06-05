<template>
	<transition name='fade'>
	<div class="haha-modal-wrap" v-if='showModal' >
		<div @click='this.overlayClick' class="haha-modal-overlay" :style='overlayStyle'></div>
		<div class="haha-modal" :style='modalStyle' >
			<slot>
			    <div style="text-align:center;padding:20px 10px;" >
					<svg class="icon" style="margin: 15px 0;" viewBox="0 0 1024 1024"  width="3rem" height="3rem"><path d="M516.461 20.457c-274.346 0-496.742 222.394-496.742 496.742s222.394 496.742 496.742 496.742 496.742-222.394 496.742-496.742-222.394-496.742-496.742-496.742zM516.461 964.278c-246.527 0-447.079-200.547-447.079-447.079s200.547-447.079 447.079-447.079 447.079 200.547 447.079 447.079-200.547 447.079-447.079 447.079z" fill="#ff5600" ></path><path d="M741.978 291.67c-12.099-12.117-31.79-12.117-43.905 0l-181.633 181.633-181.633-181.633c-12.102-12.117-31.795-12.117-43.905 0-12.117 12.102-12.117 31.79 0 43.905l181.633 181.633-181.633 181.633c-12.117 12.102-12.117 31.79 0 43.905 6.032 6.061 13.984 9.073 21.942 9.073 7.926 0 15.886-3.03 21.942-9.073l181.633-181.633 181.633 181.633c6.061 6.061 14.002 9.073 21.942 9.073s15.886-3.03 21.942-9.073c12.117-12.102 12.117-31.79 0-43.905l-181.669-181.633 181.633-181.633c12.117-12.102 12.117-31.79 0-43.905z" fill="#ff5600" ></path></svg>
					<div class="error-text">{{msg}}</div>
					
				</div>
			</slot>
		</div>
		<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAilBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2N2iNAAAALXRSTlMA450kA+8VNrHz+/goCnPaZiCVW8maEeu/LKVTMQaOa7dvPxmqxKddQ8uEykX+X2rqAAAD5klEQVRo3qzU626iUBSG4W8DG9ggyFkR8ay1tt/9397E6SRMAy0u5flHArx7rQTwKPe63/jFXBvS6Hnhb/ZXF1OytyvFAWq1tTGJ2W1Okvpcxo1nVxHaKq29Ji7PmiTntxleVG0LkmYXrx30OOt4Z0gW2+qVIcqQNNbVwY+cq2XIsHx2HHsVkLs8wogo35HByoacmwUMrdmDI1shg8yFUKIZWCkelloBdQKJdEku1xBZ358RHCvXXLxBLF9Q53hMW5K+iye4Plm2eMDxg2GCJyUhP44YVSsqD0/zFFU9epNmccQLjgX1yCEPhn6El0Q+zeHXOQwvLV7UXmh+maXWPDl4mXOhrvGDo6LfYgKOT3XEoLZgEWESUcGixZCSysVEXEULA3KGHibjhczRk2puMaGEuv+3XNLHpHwu++GFi0m5Cyb4plrwDRN7o67wv4xLTG7JDOjYQbBGn5dXeEyVe+ipg8BGZ0ULfQ2pbDzCVmSDHour7mIWhCn6Tuwqow2e0JOGwQzdt15iwJ5dZbTBPToDL3ZDzjDAsbrKaMPCgBlDF19i7oDxirwB7Bjjy5wNBBVBAw3n+GvNRQtBRdCAs+AadzdmgKAiaAAZb/+2dYCgImrg8LUvm9qBtDLe6PZlA9jyBAgqogZw4hbAhQkEFWEDCS8AFGsIKsIGairApXEgqAgbcAxdXHkGBBVhAzjzE3tmEFTEDWTcY8MYkoq0gZgb+GwgqggbaOjjnR5kFVkDHt+hmEJW+RQ1kFJBs4KsEogaqKhhGEFWkTUQ0YCEgHPi3QkCpDBiK94pWxYxjGQNaSWigWYlbMxllYoairasYf2p1o5WG4TBKAC7mBiFGkGH0rrJ1ovJLv73f70xEM6NNTkaUvsA5YOK5s/5j1aUkssbXsZQA29l+MtYykgaUII/K5M4zmAVJxM+9YRBKa1849BiDChBhxaOX8qAEnL8YpDgDCj+QQIjEWtA8Y9EGO78Bq1guMtl0IRBKBhTMXDTBhTvwJ1N0hIGpeDq8CGDJgxK0YNYXOcIg1FGaXAxJQxK+RLnuWLD4BVcsbfDgh5GkFKshgWe2GOGEaTMq7GHJ8CxMIIU+yjAQRR1XYk+Sxc8j7myW4uiLqlDtaw38ePBTkyfIuhMGtkifAYcK3xOEKOvPmQVeSGQYLXx+/mUJQ3WTT86gnETc91cnN10BKOyz1wBYplZHDGKdzH2DGvZNAvmLKvVkVW5qomlf7dv6T+fq76wu4hxxkrJ/y+5cszlSM3HqPtWzeeuzM6aD/4014hIVT4qLJWViDTu8Dlkp6V61S7Vq6zuczu6dqleTfZVSmQR6nB/HKye8nVLWgoAAAAASUVORK5CYII=" v-if='showCloseBtn === undefined ? true:showCloseBtn' @click='this.innerClose' class="haha-modal-close-btn" />
	</div>
	</transition>
</template>

<script>
import './cm_modal.scss'

/**
 * modal
 * @module components/modal
 * @desc 模态框组件
 *
 * @param {string[]} value - 选中值的数组
 * @param {string} title - 标题
 *
 *
 * @example
 * <cm-modal 
      :overlayClose='true'
      msg='haha'
      @onClose=''
      :show='false'>
    </cm-modal>
 */

export default {
	name:'cm-modal',
	props:[
		// 模态框的样式
		'modalStyle',
		// 遮罩层的样式
		'overlayStyle',
		// 是否显示
		'show',
		// 错误信息
		'msg',
		// 是否显示关闭按钮
		'showCloseBtn',
		// 遮罩点击是否隐藏
		'overlayClose',
		// 倒计时几秒消失，number
		'time'
	],
	data () {
		return {
			closedown:this.time,
			Interval:'',

			showModal:this.show,
		}
	},
	mounted(){
		this.show ? this.$emit('onShow'):this.$emit('onHide')

		// // 设置自动关闭的定时器
		// if(this.show === true && this.time !== undefined && (typeof (+this.time) === 'number') ) {
		// 	this.closedown = this.time;
		// 	this.Interval = setInterval(()=>{
		// 		if(this.closedown === 0) {
		// 			this.$emit('onClose')
		// 			clearInterval(this.Interval)
		// 		}else {
		// 			this.closedown--
		// 		}
		// 	},1000)
		// }
	},
	updated(){
		this.show ? this.$emit('onShow'):this.$emit('onHide')
	},
	watch:{
		show(val){
			this.showModal = val;
			// 设置自动关闭的定时器
			if( val === true && this.time !== undefined && (typeof (+this.time) === 'number')) {
				this.closedown = this.time;
				this.Interval = setInterval(()=>{
					console.log(111)
					if(this.closedown === 0) {
						this.$emit('onClose')
						clearInterval(this.Interval)
					}else {
						this.closedown--
					}
				},1000)
			}
		}
	},
	methods: {
		innerClose(){
			clearInterval(this.Interval)
			this.$emit('onClose')
		},
		overlayClick(){
			if(this.overlayClose){
				clearInterval(this.Interval)
				this.$emit('onClose')
			}
		}
	}
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  	transition: all 0.5s;
}
.fade-enter,.fade-leave-active{
	opacity: 0;
}
</style>
