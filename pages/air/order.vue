<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <OrderForm :data="infoData" />

            <!-- 侧边栏 -->
            <OrderAside :data="infoData" />
        </el-row>
    </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm'
import OrderAside from '@/components/air/orderAside'
export default {
    data () {
        return {
            infoData:{
                seat_infos:{}
            }
        }
    },
    components:{
        OrderForm,OrderAside
    },
    mounted(){
        this.$axios({
            url:`/airs/${this.$route.query.id}`,
            params:{
                seat_xid:this.$route.query.seat_xid
            }
        }).then(res=>{
            this.infoData = res.data
        })
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>