<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '' ]"
                    v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>
        
        <!-- 图片加载区域 -->
        <ul class="photo-list">
            <li v-for="item in list" :key="item.id">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">
                        {{ item.title }}
                    </h1>
                    <div class="info-body">
                        {{ item.zhaiyao }}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
//导入 mui.js 文件
import mui from '../../lib/mui/js/mui.min.js'
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            cates: [], //图片分类数据
            list: [] //图片列表数据
        }
    },
    created(){
        this.getAllCategory();
        this.getPhotoListByCateId(0);
    },
    mounted(){   //如果要操作DOM元素，最好在mounted里面， 因为这里面的DOM元素都是最新的
        //初始化滑动空间
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 
        });
    },
    methods: {
        getAllCategory(){
            this.$http.get('api/getimgcategory').then( result => {
                if(result.body.status === 0){
                    result.body.message.unshift({ title:"全部", id:0 })
                    this.cates = result.body.message
                }else {
                    Toast('获取数据失败!')
                }
            })
        },
        getPhotoListByCateId(cateid){
            this.$http.get('api/getimages/' + cateid).then( result => {
                if(result.body.status === 0){
                    this.list = result.body.message
                }else {
                    Toast('获取数据失败!')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
* {
    touch-action: pan-y;
}


.photo-list {
    list-style: none;
    margin: 0;
    padding: 10px;
    margin-bottom: 0;
    li {
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;
        img {
            width: 100%;
            vertical-align: middle;
        }
        img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
        }

        .info {
            text-align: left;
            color: white;
            position: absolute;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.4);
            max-height: 84px;
            .info-title{
                font-size: 14px;
            }
            .info-body {
                font-size: 13px;
            }
        }
    }
}
</style>