<template>
  <div class="aside">
    <h3>相关攻略</h3>
    <div class="list-item" v-for="(item,index) in asideData" :key="index">
      <img :src="item.images[0]" alt />
      <div class="right">
        <div>{{item.cityName}}</div>
        <span>{{item.created_at | times}} 阅读 {{item.watch}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
    data () {
        return {
            asideData:[]
        }
    },
    mounted () {
        this.$axios({
            url:'/posts/recommend'
        }).then(res=>{
            console.log(res);
            this.asideData = res.data.data
        })
    },
    filters: {
    times: function (value) {
        if (!value) return ''
        // value = value.toString()
        return moment(value).format('YYYY-DD-MM HH:mm:ss')
    }
    }
}
</script>

<style lang="less" scoped>
.aside {
    h3 {
      border-bottom: 1px solid #ddd;
      padding: 15px 0;
      font-size: 18px;
      font-weight: normal;
    }
  .list-item {
    padding: 20px 0;
    display: flex;
    flex-direction: initial;
        border-bottom: 1px solid #ddd;
    img {
        width: 100px;
        height: 80px;
        object-fit: cover;
    }
    .right {
        padding: 3px 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        div {
            font-size: 16px;
        }
        span {
            font-size: 12px;
            color: #999;
        }
    }
  }
}
</style>