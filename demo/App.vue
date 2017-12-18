<template>
<div id="app">
    <fixed-head :offsetTop='100'>我是悬浮的头部</fixed-head>

    <cm-title :showMore='true' moreLink='http://www.baidu.com' title='课程直播' />
    <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide :key='index' v-for="(banner,index) in bnaners">
            <img :src="banner">
        </swiper-slide>
    </swiper>

    <img id='img-zoom-elem' src="http://p3.pstatp.com/large/213a0005a66b2a9e2fc2" alt="">


    <!-- 倒计时改进版 -->
    <countdown
        ref='countdown'
        :count='6'
        normalText='发送验证码'
        activeText='重新发送'
        :isSending='isSending'
        @click='sendCode'
        >
    </countdown


    <br />
    <br />
    <!-- 评分组件 -->
    <div style='display:flex;'>
        <cm-star @onChangeStar='onChangeStar' :count='star' />
    </div>

    <br />
    <br />


    <cm-badge >共四节课</cm-badge>

    <mm-person :personIntro='personIntro' :personName='personName' :headimg='headimg' />
    <mm-concern @concern='concern' :selected='false'></mm-concern>
    <div style="height: 10rem;">
        <mm-card :data='cardData'></mm-card>
    </div>

    <!-- 评分组件 -->
    <cm-rate :count='4' />

    <!-- 发送验证码的组件 -->
    <div style="height:2rem;width:5rem;border:1px solid #ddd;">
        <mm-countdown ref='haha' @onClick='concern' duration='4'>
            <div
                @click='clickCountDown'     style='position:absolute;top:0;right:0;bottom:0;left:0;'>
            </div>
        </mm-countdown>
    </div>

    <!-- 下拉列表组件 -->
    <cm-dropdown>
        <div slot='header'>哈哈哈</div>
        <div slot="content">
            dfasdfasdf
        </div>
    </cm-dropdown>
    <br /><br />

    平滑滚动组件
    <div style='height:300px;background:#eee;'>
        <scroller
            ref='scroller'
            @onRefresh="refresh"
            @onInfinite='infinite'
            >
            <div v-for='item in 40'>
                {{item}}
            </div>
        </scroller>
    </div>
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
        <cm-tabbar-item v-show='false'>课程目录</cm-tabbar-item>
        <cm-tabbar-item>课程评价</cm-tabbar-item>
    </cm-tabbar>

    <!-- tab组件 -->
    <button @click='chooseTab="2"'>1</button>
    <button @click='chooseTab="2"'>2</button>
    <button @click='chooseTab="3"'>3</button>
    <cm-tabs-container @input='concern' :swipeable='true' v-model='chooseTab'>
        <cm-tabs-item style='height:1200px;background: red;' id='1'>111</cm-tabs-item>
        <cm-tabs-item v-if='false' style='height:100px;background: red;' id='2'>222</cm-tabs-item>
        <cm-tabs-item style='height:300px;background: red;' id='3'>333</cm-tabs-item>
    </cm-tabs-container>




    <!-- 下拉上拉刷新 -->
    <!-- auto-fill:当内容不满时，不要自动触发bottom-load -->
    <loadmore
        :auto-fill='false'
        bottomLoadingText=''
        style='padding-bottom:100px;'
        :bottom-method="loadBottom"
        :bottom-all-loaded="false"
        ref="loadmore">
        <ul>
            <li v-for="item in 40">222222</li>
        </ul>
    </loadmore>




    <!-- 滚动加载组件 -->
    滚动加载组件
    <div
        v-infinite-scroll='loadMore'
        infinite-scroll-distance='50'
        infinite-scroll-disabled="loading"
        style='height:500px;overflow:auto;background:#eee;' >
        <div v-for='(item,index) in listNum' class="">
            {{index}}
        </div>
    </div>
    <br /><br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />






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
    cm_toast,
    dialog,
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
                start_time: 1498564922202,
                category: '市场招生'
            },
            chooseTab: '3',
            chooseTab2: 3,
            headimg: 'http://p3.pstatp.com/large/213a0005a66b2a9e2fc2',
            personName: '我是天天团',
            personIntro: '我是格式简介我是格式简我是格式简介我是格式简介我是格式简介我是格式简介我是格式简介我是格式简我是格式简介我是格式简介我是格式简介我是格式简介我是格式简介我是格式简介介介我是格式简介我是格式简介我是格式简介我是格式简介',

            showModal: false,


            // 无线滚动正在加载
            loading:false,
            listNum:150,

            // 当前星星个数
            star:3,

            // 验证码2.0是否正处于发送状态
            isSending:false,
        }
    },
    methods: {
        // 发送验证码的方法
        sendCode(){
            // 如果格式校验通过
            let ifPass = true;
            if(ifPass) {
                this.isSending = true;
            }else{
                alert('校验不通过')
                this.isSending = false;
                return;
            }
            // 发送验证码请求，如果返回成功，开始倒计时，如果不成功，让验证码可以点
            let ifSuccess = true
            setTimeout(()=>{
                if(ifSuccess) {
                    this.$refs.countdown.countdown(()=>{
                        this.isSending = false;
                    });
                }else{
                    this.isSending = false;
                }
            },1000)
        },
        concern() {
            cm_toast({
                className:'sssss',
                message:'haha'
            })
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
        },

        clickCountDown(e){
            e.stopPropagation()
        },
        loadMore(){
            console.log('this.loading')
            this.loading = true;
            setTimeout(() => {
				// window.location.href ='#top'
				this.listNum+=50
				this.loading = false;
            }, 400);
        },
        refresh(){
            console.log(1111)
            setTimeout(_=>{
                this.$refs.scroller.finishRefresh()
            },2000)
        },
        infinite(){
            console.log(2222)
            setTimeout(_=>{
                this.$refs.scroller.finishInfinite()
            },2000)
        },
        loadBottom(){
            console.log(123)
            setTimeout(_=>{
                this.$refs.loadmore.onBottomLoaded();
            },2000)
        },
        onChangeStar(s){
            console.log(s,1111111)
            this.star = s
        },
    },
    mounted(){
        console.log(this.$refs.haha.countdown(),11)
        // 全局引用
        // this.$toast('sss')
        // 局部引用

        this.$dialog({
            message:'我是通知',
            success(){
                console.log(444)
            },
            cancel(){
                console.log(555)
            }
        })


        // 调用图片预览,代理事件到一个元素上，元素的所有子孙img元素都会被预览
        this.$imgZoom(document)
    },
    updated(){
        console.log(this.chooseTab)
    }
}
</script>
