<template>
    <div class="gooodsinfo-container">


        <transition 
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>


        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swipe :lunbotuList="lunbotuList" :isfull="false"></swipe>
                </div>
            </div>
        </div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价: <del>{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价: <span class="now_price">{{ goodsinfo.sell_price }}</span>
                    </p>
                    <p>购买数量:<numberbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numberbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addShopToCar">加入购物车</mt-button>

                        <!-- 分析： 如何实现加入购物车的时候，拿到选择的数量-->
                        <!-- 1. 按钮属于  goodsinfo 页面， 数字属于 numberbox 这个组件 -->
                        <!-- + 由于涉及到了父子组件， 所以无法直接在 goodsinfo 页面中 获取到 商品的数量 -->
                        <!-- 怎么解决：涉及到了子组件向父组件传值（事件调用机制） -->
                        <!-- 事件调用本质：父向子传递方法， 子调用方法 -->
                    </p>
                </div>
            </div>
        </div>
        <!-- 商品评论区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{ goodsinfo.goods_no }}</p>
                    <p>库存情况:{{ goodsinfo.stock_quantity }}</p>
                    <p>上架时间:{{ goodsinfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import swipe from '../subcomponents/swiper.vue'
import numberbox from '../subcomponents/goodsinfo_numberbox.vue'
import { stringify } from 'querystring';
export default {
    data(){
        return {
            id: this.$route.params.id,
            lunbotuList: [], //轮播图的数据
            goodsinfo: {}, // 商品信息
            ballFlag: false, //抗旨小球隐藏和显示
            selectedcount: 1 //保存用户选中商品数量
        }
    },
    created(){
        this.getLunbotu();
        this.getGoodsInfo();
    },
    methods: {
        getLunbotu(){
            this.$http.get('api/getthumimages/' + this.id).then( result => {
                if(result.body.status === 0){
                    // 轮播图组件中 只认识 item.img  不认识 item.src
                    result.body.message.forEach(item=>{
                        item.img=item.src;  
                    })
                    this.lunbotuList = result.body.message;
                }
            })
        },
        getGoodsInfo(){
            // 获取商品信息
            this.$http.get('api/goods/getinfo/' + this.id).then( result => {
                if(result.body.status === 0) {
                    this.goodsinfo = result.body.message[0]
                }
            })
        },
        goDesc(id){
            //点击使用编程式导航， 跳转到图文介绍页面
            this.$router.push({ name: "goodsdesc", params: { id } });
        },
        goComment(id){
            //点击跳转到评论页面
            this.$router.push({ name: "goodscomment", params: { id } });
        },
        addShopToCar(){
            this.ballFlag = !this.ballFlag;
            // { id:商品id, count:商品数量, price: 商品单价, selected: 是否被选中 }
            // 拼接出一个 要保存到 store 中 car 数组 的商品信息对象
            var sharedata = { id: this.id, count: this.selectedcount, price: this.goodsinfo.sell_price, selected: true};

            this.$store.commit("addToCar", sharedata)

        },
        beforeEnter(el){
            el.style.transform = "translate(0, 0)";
            
        },
        enter(el, done){
            el.offsetWidth;

            //小球优化分析思路
            // 1. 本质原因：小球移动过后位置写死 
            // 2. 在分辨率改变 或 滚轮滑动后， 问题就出现了
            // 3. 小球移动后的坐标应该  动态计算


            //获取小球在页面中的位置
            const ballPosition  = this.$refs.ball.getBoundingClientRect();
            //获取徽标在页面中的位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all 0.7s cubic-bezier(.4, -0.3, 1, .68)";
            done();
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        },
        getSelectedCount(count){
            this.selectedcount = count;
            console.log(this.selectedcount);
        }
    },
    components: {
        swipe,
        numberbox
    }
}
</script>

<style lang="scss" scoped>
.gooodsinfo-container {
    background-color: #eee;
    overflow: hidden;
    .now_price {
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer {
        display: block;
        button {
            margin: 15px 0;
        }
    }
    .ball {
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        z-index: 99;
        top: 430px;
        left: 78px;
    }
}
</style>