<template>
  <!-- 评论列表 -->
  <div class="cmt-list">
    <div class="cmt-list-item" v-for="(item,index) in commitData" :key="index">
      <div class="cmt-info">
        <div class="left">
          <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
          <span>{{item.account.nickname}}</span>
          <i>{{item.created_at | times}}</i>
        </div>
        <span>{{item.level}}</span>
      </div>
      <detailCmtItem :commitData="item.parent" v-if="item.parent" @replayDate="replayDate"></detailCmtItem>
      <div class="cmt-content">
        <div v-html="item.content"></div>
        <div class="cmt-ctrl">
          <a href="#" @click.prevent="replayDate(item)">回复</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var moment = require('moment');
import detailCmtItem from '@/components/post/detailCmtItem'
export default {
  components:{
      detailCmtItem
  },
  data() {
    return {
      creatCmtTime: ''
    }
  },
  props:{
    commitData:{
        type:Array,
        default(){return {}}
    }  
  },
  filters: {
    times: function (value) {
        if (!value) return ''
        // value = value.toString()
        return moment(value).format('YYYY-DD-MM HH:mm:ss')
    }
  },
  methods: {
      replayDate(replayDate){
          this.$emit('replayDate',replayDate)
      }
  }
}
</script>


<style lang="less" scoped>
.cmt-list {
  border: 1px solid #ddd;
  margin-bottom: 20px;
  .cmt-list-item {
    font-size: 16px;
    padding: 20px 20px 5px;
    border-bottom: 1px solid #eee;
    .cmt-info {
      font-size: 12px;
      margin-right: 0 0 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #666;
      .left {
        display: flex;
        align-items: center;
        span {
          padding: 0 10px;
        }
      }
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
  .cmt-content {
    margin-top: 10px;
    padding-left: 30px;
    // height: 42px;
    // line-height: 42px;
    p {
      height: 20px;
      line-height: 20px;
    }
    /deep/img {
        height: 50px;
    }
    .cmt-ctrl {
    display: flex;
    justify-content: flex-end;
    // line-height: 20px;
    font-size: 12px;
    }
  }
}
</style>