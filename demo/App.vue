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
    <mm-person></mm-person>
    <mm-concern @concern='concern' :selected='false'></mm-concern>
    <div style="height: 10rem;">
      <mm-card :data='cardData' ></mm-card>
    </div>
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
        },
      cardData:{
         score:8.5,
         title:'205起',
         cover_240x140:'https://cdn.xueyuan.xiaobao100.com/course/592e2a508d6a9f01db85556e/s_240x140.png',
         buy_count:3478,
         start_time:1496288890797,
         category:'市场招生'
      }
    }
  },
  methods:{
    concern(){
      console.log(111)
    }
  }
}
</script>

