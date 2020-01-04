<template>
  <div class="container">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>南京酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{hotelDetailDate.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 酒店标题 -->
    <header>
      <h4>
        {{hotelDetailDate.name}}
        <span>
          <i class="iconfont iconhuangguan" style="color:#f90;"></i>
        </span>
      </h4>

      <p>{{hotelDetailDate.alias}}</p>
      <span class="adress">
        <i data-v-3cab31ba class="iconfont iconlocation"></i>{{hotelDetailDate.address}}
      </span>
    </header>
    <!-- 酒店图片 -->
    <el-row>
      <el-col :span="16">
        <img class="left" :src="'http://127.0.0.1:1337'+hotelDetailDate.pics[0].url" alt />
      </el-col>
      <!-- <el-col :span="8" class="right">
        <el-col :span="12" style="margin-left:-10px;margin-right:8px;">
          <img :src="'http://127.0.0.1:1337'+hotelDetailDate.pics[0].url" alt />
          <img :src="'http://127.0.0.1:1337'+hotelDetailDate.pics[1].url" alt />
          <img :src="'http://127.0.0.1:1337'+hotelDetailDate.pics[2].url" alt />
        </el-col>
        <el-col :span="12">
          <img :src="'http://127.0.0.1:1337'+hotelDetailDate.pics[3].url" alt />
          <img :src="'http://127.0.0.1:1337'+hotelDetailDate.pics[4].url" alt />
          <img :src="'http://127.0.0.1:1337'+hotelDetailDate.pics[5].url" alt />
        </el-col>
      </el-col> -->
    </el-row>

    <!-- 酒店价目表 -->
    <el-table :data="hotelDetailDate.products" style="width: 100%">
      <el-table-column prop="name" label="价格来源" width="420"></el-table-column>
      <el-table-column prop="bestType" label="低价房型" width="420"></el-table-column>
      <el-table-column prop="price" label="最低价格/每晚"></el-table-column>
    </el-table>
    <!-- 地图及附近配套信息 -->
    <el-row>
      <el-col :span="16">
        <h1>地图区域</h1>
      </el-col>
      <el-col :span="8">
        <!-- 配套列表 -->
        <el-tabs v-model="activeName" @tab-click="handleClick" class="mapList">
          <el-tab-pane label="风景" name="first">
              <ol>
                  <li>
                      <span>高淳老街</span>
                      <span>0.09公里</span>
                  </li>
                  <li>
                      <span>高淳老街</span>
                      <span>0.09公里</span>
                  </li>
                  <li>
                      <span>高淳老街</span>
                      <span>0.09公里</span>
                  </li>
                  <li>
                      <span>高淳老街</span>
                      <span>0.09公里</span>
                  </li>
                  <li>
                      <span>高淳老街</span>
                      <span>0.09公里</span>
                  </li>
                  <li>
                      <span>高淳老街</span>
                      <span>0.09公里</span>
                  </li>
                  <li>
                      <span>高淳老街</span>
                      <span>0.09公里</span>
                  </li>
              </ol>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second">
              <ol>
                  <li>
                      <span>甘霖路口(公交站)</span>
                      <span>0.09公里</span>
                  </li>
              </ol>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <!-- 酒店基本信息 -->
    <div class="baseInfo">
        <el-row class="info">
        <el-col :span="4" style="color:#000;">基本信息</el-col>
        <el-col :span="20">
            <el-col :span="6">入住时间: 14:00之后</el-col>
            <el-col :span="6">离店时间: 12:00之前</el-col>
            <el-col :span="6">{{hotelDetailDate.creation_time}} / {{hotelDetailDate.renovat_time}}</el-col>
            <el-col :span="6">酒店规模: 148间客房</el-col>
        </el-col>
    </el-row>
    <el-row class="info">
        <el-col :span="4" style="color:#000;">主要设施</el-col>
        <el-col :span="20">
            <span class="server">外币兑换服务</span>
        </el-col>
    </el-row>
     <el-row class="info">
        <el-col :span="4" style="color:#000;">停车服务</el-col>
        <el-col :span="20">
            -
        </el-col>
    </el-row>
    <el-row class="info">
        <el-col :span="4" style="color:#000;">品牌信息</el-col>
        <el-col :span="20">
            -
        </el-col>
    </el-row>
    </div>
    <!-- 评论区域 -->
    <div class="comment">
        <h4 style="margin-bottom:15px;">0条真实用户评论</h4>
        <el-row>
            <el-col :span="4">
                <div>总评数：9</div>
                <div>好评数：1</div>
                <div>差评数：2</div>
            </el-col>
            <el-col :span="4">
                <div data-v-3cab31ba="" role="slider" aria-valuenow="3.5" aria-valuetext="3.5分" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><i class="el-rate__decimal el-icon-star-on" style="color: rgb(247, 186, 42); width: 50%;"></i></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__text" style="color: rgb(255, 153, 0);">3.5分</span></div>
            </el-col>
            <el-col :span="3"></el-col>
            <el-col :span="3"></el-col>
            <el-col :span="3"></el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        hotelDetailDate:{
          pics:[]
        },
        activeName: 'first',
        tableData: [
            {
            date: '艺龙',
            name: '高级大床房A',
            address: '￥59起'
            },
            {
            date: '携程',
            name: '高级大床房A',
            address: '￥59起'
            },
            {
            date: 'Hotels.com',
            name: '高级大床房A',
            address: '￥59起'
            }
        ]
    }
  },
  async mounted(){
     const { data:res1 } = await this.$axios({
          url:'/hotels',
          params:{
            id:this.$route.query.id
          }
      })
      console.log(res1);
      this.hotelDetailDate = res1.data[0]
  },
  methods: {
    handleClick(){}
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .el-breadcrumb {
    margin: 15px 0;
  }
  header {
    margin-bottom: 50px;
    h4 {
      font-weight: normal;
      font-size: 24px;
      color: #333;
    }
    p {
      font-size: 14px;
      color: #666;
    }
    .adress {
      font-size: 14px;
      color: #666;
    }
  }

  .left {
    width: 640px;
    height: 360px;
  }
  .right {
    img {
      width: 160px;
      height: 110px;
      margin: 0 0 10px 0;
    }
  }
  .el-table{
      margin-bottom: 50px;
  }
  .mapList{
      li {
          display: flex;
          justify-content: space-between;
          padding:0 10px;
          color: #666;
          font-size: 14px;
          line-height: 35px;
      }
  }
  .baseInfo{
      margin: 50px 0;
     .info{
      border-bottom: 1px solid #eee;
      padding: 20px 10px;
      color: #666;
      font-size: 14px;
      .server{
          background-color: #eee;
          margin-right: 10px;
          padding: 4px 10px;
      }
    } 
  }
  .comment{
      color: #666;
      margin-bottom: 50px;
  }
  
}
</style>