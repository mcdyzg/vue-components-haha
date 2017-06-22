<template>
<div id="app">
    <cm-title :showMore='true' moreLink='http://www.baidu.com' title='课程直播' />
    <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide :key='index' v-for="(banner,index) in bnaners">
            <img :src="banner">
        </swiper-slide>
    </swiper>


    <cm-badge>共四节课</cm-badge>

    <mm-person :personIntro='personIntro' :personName='personName' :headimg='headimg' />
    <mm-concern @concern='concern' :selected='false'></mm-concern>
    <div style="height: 10rem;">
        <mm-card :data='cardData'></mm-card>
    </div>

    <!-- 评分组件 -->
    <cm-rate :count='4' />

    <!-- 发送验证码的组件 -->
    <div style="height:2rem;width:5rem;border:1px solid #ddd;">
        <mm-countdown @onClick='concern' duration='4' />
    </div>

    <!-- 下拉列表组件 -->
    <cm-dropdown>
        <div slot='header'>哈哈哈</div>
        <div slot="content">
            dfasdfasdf
        </div>
    </cm-dropdown>
    <br /><br />

    <!-- 轮播组件 -->
    <haha-swiper ref='hahaSwiper' :pagination='true' :default='1'>
        <haha-swiper-item style='height:200px;background: red;'>111</haha-swiper-item>
        <haha-swiper-item style='height:200px;background: red;'>222</haha-swiper-item>
        <haha-swiper-item style='height:200px;background: red;'>333</haha-swiper-item>
    </haha-swiper>
    <div @click='go'>下一页</div>
    <div @click='back'>上一页</div>


    <!-- Toast组件 -->
    <!-- <cm-toast/> -->


    <!-- tabbar组件 -->
    <cm-tabbar v-model='chooseTab'>
        <cm-tabbar-item>课程介绍</cm-tabbar-item>
        <cm-tabbar-item>课程目录</cm-tabbar-item>
        <cm-tabbar-item>课程评价</cm-tabbar-item>
    </cm-tabbar>

    <!-- tab组件 -->
    <button @click='chooseTab="2"'>1</button>
    <button @click='chooseTab="2"'>2</button>
    <button @click='chooseTab="3"'>3</button>
    <cm-tabs-container @input='concern' :swipeable='true' v-model='chooseTab'>
        <cm-tabs-item style='height:1200px;background: red;' id='1'>111</cm-tabs-item>
        <cm-tabs-item style='height:100px;background: red;' id='2'>222</cm-tabs-item>
        <cm-tabs-item style='height:300px;background: red;' id='3'>333</cm-tabs-item>
    </cm-tabs-container>





    <!-- 底部工具条 -->
    <mm-toolbar
        @shareClick=''
        @giftClick=''
        @inviteClick=''
        background='#db2932'
        text='听课'
        @buyClick='showModal=true' />


    <!-- 模态框组件 -->
    <cm-modal :time='3' :overlayClose='true' @onClose='closeModal' :show='showModal'>
    </cm-modal>

    <!-- 返回顶部组件 -->
    <cm-backtop
        @click='concern()'/>


    <!-- 底部导航栏 -->
    <!-- <bottom-menu /> -->
</div>
</template>

<script>
// 组件内可用
// import TopTitle from '../dist'
import './base.css'
import {
    cm_toast
} from '..'

export default {
    name: 'app',
    components: {
        // TopTitle
    },
    data() {
        return {
            bnaners: ['http://p3.pstatp.com/large/213a0005a66b2a9e2fc2', 'http://p3.pstatp.com/large/213a0005a66b2a9e2fc2', 'http://p3.pstatp.com/large/213a0005a66b2a9e2fc2'],
            swiperOption: {
                notNextTick: true,
                loop: true,
                slidesPerView: 1.45,
                centeredSlides: true,
                spaceBetween: -10
            },
            cardData: {
                score: 8.5,
                title: '205起',
                cover_240x140: 'https://cdn.xueyuan.xiaobao100.com/course/592e2a508d6a9f01db85556e/s_240x140.png',
                buy_count: 3478,
                start_time: 1496288890797,
                category: '市场招生'
            },
            chooseTab: '3',
            chooseTab2: 3,
            headimg: 'http://p3.pstatp.com/large/213a0005a66b2a9e2fc2',
            personName: '我是天天团',
            personIntro: '我是格式简介我是格式简我是格式简介我是格式简介我是格式简介我是格式简介我是格式简介我是格式简我是格式简介我是格式简介我是格式简介我是格式简介我是格式简介我是格式简介介介我是格式简介我是格式简介我是格式简介我是格式简介',

            showModal: false,

        }
    },
    methods: {
        concern() {
            console.log(111)
        },
        closeModal() {
            console.log(222)
            this.showModal = false
        },
        go() {
            this.$refs.hahaSwiper.next()
        },
        back() {
            this.$refs.hahaSwiper.prev()
        }
    },
    mounted(){
        // 全局引用
        // this.$toast('sss')
        // 局部引用
        cm_toast('sss')
    }
}
</script>
