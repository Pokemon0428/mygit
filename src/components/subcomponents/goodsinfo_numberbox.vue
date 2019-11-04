<template>
    <div>
        <!-- 问题： 我们不知道什么时候拿到这个max -->
        <!-- 我们可以使用 watch 监听父组件穿过来的 max 值， 不管触发几次， 最后一次一定是一个合法的数值 -->
        <div class="mui-numbox" data-numbox-min='1'>
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted() {
        // 初始化数字选择框组件
        mui('.mui-numbox').numbox();
    },
    methods: {
        countChanged(){
            //每当文本框数据改变， 立即把最新的数据传递给父组件
            // console.log(this.$refs.numbox.value)
            this.$emit('getcount', parseInt(this.$refs.numbox.value))
        }
    },
    props: ['max'],
    watch: {
        "max":function(newVal, oldVal) {
            console.log(this.max)
            mui('.mui-numbox').numbox().setOption("max", newVal);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>