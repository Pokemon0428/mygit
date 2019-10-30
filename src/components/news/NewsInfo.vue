<template>
    <div class="newsinfo-container">
        <h3 class="title">{{ newsinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间:{{ newsinfo.add_time }}</span>
            <span>点击:{{ newsinfo.click }}</span>
        </p>

        <hr>

        <div class="content" v-html="newsinfo.content"></div>

        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>

// 1.导入评论子组件comment
import comment from '../subcomponents/comment.vue'

import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            id: this.$route.params.id,
            newsinfo: {}
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods: {
        getNewsInfo(){
            this.$http.get('api/getnew/' + this.id).then( result => {
                if( result.body.status === 0 ){
                    this.newsinfo = result.body.message[0]
                }else {
                    Toast('获取新闻信息失败！')
                }
            })
        }
    },
    components: {   //用来注册子组件节点
        'comment-box': comment
    }
}

</script>

<style lang="scss">
.newsinfo-container {

    padding: 0 4px;

    .title {
        text-align: center;
        margin: 15px 0;
        font-size: 16px;
        color: red;
    }

    .subtitle {
        font-size: 10px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }

    .content {
        width: 100%;
        height: 100%;
    }
}
</style>