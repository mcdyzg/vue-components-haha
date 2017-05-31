<template>
  <div id="app">
    <cm-title 
      :showMore='true'
      moreLink='http://www.baidu.com'
      title='课程直播' />
    <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide :key='index' v-for="(banner,index) in bnaners">
          <img :src="banner">
        </swiper-slide>
    </swiper>
    <cm-tabs />
    <cm-badge>共四节课</cm-badge>
    <bottom-menu />
  </div>
</template>

<script>
// 组件内可用
// import TopTitle from '../dist'

export default {
  name: 'app',
  components:{
  	// TopTitle
  },
  data(){
    return {
      bnaners:['http://p3.pstatp.com/large/213a0005a66b2a9e2fc2','http://p3.pstatp.com/large/213a0005a66b2a9e2fc2','http://p3.pstatp.com/large/213a0005a66b2a9e2fc2'],
      swiperOption: {
          notNextTick: true,
          loop:true,
          slidesPerView: 1.45,
          centeredSlides: true,
          spaceBetween: -10
        }
    }
  },
}
</script>

