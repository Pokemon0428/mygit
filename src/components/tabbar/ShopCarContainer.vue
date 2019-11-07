<template>
    <div class="shopcar-container">

        <!-- 商品信息区域 -->
        <div class="goods-list">
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" 
                        @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div>
                            <h1>{{item.title}}</h1>
                            <p class="info">
                                <span class="price">￥{{ item.sell_price }}</span>
                                <numbox :initcount = '$store.getters.getGoodsCounts[item.id]' :goodsid="item.id"></numbox>
                                <!-- 问题：如何从购物车内获取数量 -->
                                <!-- 1. 我们可以先创建一个空数组，循环购物车中所有商品数据， 把当前循环这件商品的id作为对象属性名
                                        count 作为属性值， 这样，当把所有商品循环一遍，就会得到一个对象：
                                     -->
                                <a href="#" @click.prevent="del(item.id, i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
        </div>

        <!-- 商品结算趋于 -->
        <div class="goods-list">
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
                            <p>总计(不含运费)</p>
                            <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndMount.count}}</span> 
                            件，总价 <span class="red">￥{{$store.getters.getGoodsCountAndMount.mount}}</span></p>
                        </div>
                        <mt-button type="danger" >去结算</mt-button>
					</div>
				</div>
			</div>
        </div>
    </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numberbox.vue'

export default {
    data(){
        return {
            goodslist:[]
        }
    },
    created(){
        this.getGoodsList();
    },
    methods: {
        getGoodsList(){

            var idArr = [];
            this.$store.state.car.forEach(item=>{
                idArr.push(item.id);
            })

            this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then( result => {
                if(result.body.status === 0){
                    this.goodslist = result.body.message
                }
            });
        },
        del(id, index){
            this.goodslist.splice(index, 1)
            this.$store.commit('delGoodsInfo', id)
        },
        selectedChanged(id, val){
            //同步开关状态
            this.$store.commit('updateGoodsSelected', { id , selected: val })
        }
    },
    components: {
        numbox
    }
}
</script>

<style lang="scss" scoped>
.shopcar-container {
    background-color: #eee;
    overflow: hidden;
    .goods-list {
        .mui-card-content-inner {
            display: flex;
            align-items: center;
        }
        img {
            height: 60px;
            width: 60px;
        }
        h1 {
            font-size: 13px;
        }
        .info {
            display: flex;
            justify-content: space-between;
            // flex-direction: column;
            .price {
                color: red;
                font-weight: bold;
            }
        }
        .jiesuan {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red {
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
}
</style>