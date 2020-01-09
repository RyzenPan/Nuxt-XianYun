<template>
  <!-- 评论列表 -->
  <div class="cmt-list-item">
    <div class="cmt-info">
      <div class="left">
        <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
        <span>{{commitData.account.nickname}}</span>
        <i>{{commitData.created_at | times}}</i>
      </div>
      <span>{{commitData.level}}</span>
    </div>
    <detailCmtItem
      :commitData="commitData.parent"
      v-if="commitData.parent"
      @replayDate="replayDate"
    ></detailCmtItem>
    <div class="cmt-content">
      <div v-html="commitData.content"></div>
      <div class="cmt-ctrl">
        <a href="#" @click.prevent="replayDate(commitData)">回复</a>
      </div>
    </div>
  </div>
</template>

<script>
var moment = require('moment')
export default {
  name: 'detailCmtItem',
  props: {
    commitData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    times: function(value) {
      if (!value) return ''
      // value = value.toString()
      return moment(value).format('YYYY-DD-MM HH:mm:ss')
    }
  },
  methods: {
    replayDate(replayDate) {
      this.$emit('replayDate', replayDate)
    }
  }
}
</script>


<style lang="less" scoped>
.cmt-list-item {
  font-size: 16px;
  padding: 10px 10px 5px !important;
  margin: 10px 0;
  border: 1px solid #eee;
  background-color: #f9f9f9;
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
  // height: 100px;
  // line-height: 42px;
  .cmt-ctrl {
    display: flex;
    justify-content: flex-end;
    // line-height: 20px;
    font-size: 12px;
  }
  /deep/img {
        height: 50px;
    }
}
</style>