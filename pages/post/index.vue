<template>
  <section class="container">
      <!-- 侧边栏 -->
      <el-aside width="260px">
        <div class="memus">
          <div class="memu-item" v-for="(item,index) in memuList" :key="index" @mouseenter="memuEnter(index)" :class="flag === index ? 'memuAct' :''">
            <span>{{item.type}}</span>
            <i class="el-icon-arrow-right"></i>
          </div>
          <ul class="sub-memu">
          <li class="sub-memu-item">
            <i>1</i>
            <strong>北京</strong>
            <span>世界著名古都和现代化国际城市</span>
          </li>
        </ul>
        </div>
        
      </el-aside>
      <!-- 搜索及攻略 -->
      <el-main>Main</el-main>
  </section>
</template>

<script>
export default {
  data () {
    return {
      flag:'',
      memuList:[]
    }
  },
  async mounted() {
    const res = await this.$axios({
      url: '/posts/cities'
    })
    console.log(res)
    this.memuList = res.data.data
  },
  methods: {
    memuEnter(index){
      this.flag = index
    }
  }
}
</script>

<style scoped lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
}
.el-aside {
  margin-right: 30px;
}
.memus {
  width: 260px;
  margin: 20px 0; 
  box-sizing: border-box;
  border-left: 1px solid #ddd;
  border-top: 1px solid #ddd;
  position: relative;
  .memu-item {
    padding: 0 20px;
    height: 41px;
    box-sizing: border-box;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    line-height: 41px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    i {
      line-height: 41px;
      font-size: 18px;
      color: #999;
    }
  }
}
.memuAct {
  color: orange!important;
  border-right: 0;
    border-right: 1px solid #fff!important;
}

.sub-memu {
  width: 350px;
  height: 202px;
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-left: none;
  position: absolute;
  background-color: #fff;
  top: 80px;
  left: 283px;
  .sub-memu-item{
    width: 308px;
    height: 36px;
  }
}
</style>