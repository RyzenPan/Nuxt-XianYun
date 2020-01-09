<template>
  <div class="containerApp">
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
        <i data-v-3cab31ba class="iconfont iconlocation"></i>
        {{hotelDetailDate.address}}
      </span>
    </header>
    <!-- 酒店图片 -->
    <el-row>
      <el-col :span="16">
        <img class="left" src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
      </el-col>
      <el-col :span="8" class="right">
        <el-col :span="12" style="margin-left:-10px;margin-right:8px;">
          <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
        </el-col>
        <el-col :span="12">
          <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
        </el-col>
      </el-col>
    </el-row>

    <!-- 酒店价目表 -->
    <el-table :data="hotelDetailDate.products" style="width: 100%" @row-click="priceClick">
      <el-table-column prop="name" label="价格来源" width="420"></el-table-column>
      <el-table-column prop="bestType" label="低价房型" width="420"></el-table-column>
      <el-table-column prop="price" label="最低价格/每晚">
        <template slot-scope="scope">
          <div style="color:#f90">
            ￥{{scope.row.price}}
            <span style="color:#606266">起</span>
            <i data-v-3cab31ba class="el-icon-arrow-right height-light" style="color:#f90"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 地图及附近配套信息 -->
    <el-row>
      <el-col :span="16">
        <script
          type="text/javascript"
          src="https://webapi.amap.com/maps?v=1.4.15&key=28c6d1daa97bd27131f7ade6221208cc"
        ></script>
        <div id="container"></div>
      </el-col>
      <el-col :span="8">
        <!-- 配套列表 -->
        <el-tabs v-model="activeName" @tab-click="handleClick" class="mapList">
          <el-tab-pane label="便利店" name="first">
            <ol>
              <li v-for="(item,index) in storeList" :key="index">
                <span>{{item.name}}</span>
                <span>{{item.distance}}米</span>
              </li>
            </ol>
          </el-tab-pane>
          <el-tab-pane label="公交站" name="second">
            <ol>
              <li v-for="(item,index) in storeList" :key="index">
                <span>{{item.name}}</span>
                <span>{{item.distance}}米</span>
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
        <el-col :span="20">-</el-col>
      </el-row>
      <el-row class="info">
        <el-col :span="4" style="color:#000;">品牌信息</el-col>
        <el-col :span="20">-</el-col>
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
          <el-rate
            v-model="starsValue"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
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
      starsValue: 0,
      storeList:[],
      hotelDetailDate: {},
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
  async mounted() {
    const { data: res1 } = await this.$axios({
      url: '/hotels',
      params: {
        id: this.$route.query.id
      }
    })
    this.hotelDetailDate = res1.data[0]
    console.log(this.hotelDetailDate)
    this.starsValue = this.hotelDetailDate.stars

    // 地图信息
    // var map = new AMap.Map('container', {
    //   zoom: 8, //级别
    //   center: [
    //     this.hotelDetailDate.location.longitude,
    //     this.hotelDetailDate.location.latitude
    //   ], //中心点坐标
    //   viewMode: '3D' //使用3D视图
    // })
    this.search('便利店')
    
  },
  methods: {
    search(name) {
      let that = this
      var map = new AMap.Map('container', {
        resizeEnable: true
      })
      AMap.service(['AMap.PlaceSearch'], function() {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          city: 'nanjing', // 兴趣点城市
          map: map, // 展现结果的地图实例
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        })

        var cpoint = [118.9213, 31.75649] //中心点坐标
        placeSearch.searchNearBy(name, cpoint, 5000, function(
          status,
          result
        ) {
          console.log(result.poiList.pois);
          that.storeList = result.poiList.pois
          // console.log(this);
        })
      })
    },
    handleClick(v) {
      this.search(v.label)
    },
    priceClick(row, column, event) {
      console.log(row)
      if (row.name === '携程') {
        window.open('https://hotels.ctrip.com/hotel/694679.html', '_blank')
      } else if (row.name === '艺龙') {
        window.open('http://www.elong.com', '_blank')
      } else if (row.name === 'Hotels.com') {
        window.open('https://www.hotels.cn/m', '_blank')
      }
    }
  }
}
</script>

<style lang="less" scoped>
#container {
  width: 650px;
  height: 360px;
}
.containerApp {
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
  .el-table {
    margin-bottom: 50px;
  }
  .mapList {
    li {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      color: #666;
      font-size: 14px;
      line-height: 35px;
    }
  }
  .baseInfo {
    margin: 50px 0;
    .info {
      border-bottom: 1px solid #eee;
      padding: 20px 10px;
      color: #666;
      font-size: 14px;
      .server {
        background-color: #eee;
        margin-right: 10px;
        padding: 4px 10px;
      }
    }
  }
  .comment {
    color: #666;
    margin-bottom: 50px;
  }
}
</style>