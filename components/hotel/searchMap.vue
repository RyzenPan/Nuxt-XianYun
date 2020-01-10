<template>
  <div class="mapInfo">
    <el-row>
      <el-col :span="14">
        <!-- 区域 -->
        <el-row>
          <el-col :span="3">区域:</el-col>
          <el-col :span="18">
            <div :class="{hiddenAll:hidden}">
              <span style="font-weight:bold" @click="clearAllSelect">全部</span> &nbsp;&nbsp;
              <a
                href="#"
                v-for="(item,index) in cityData.scenics"
                :key="index"
                :class="{'active' : act === index}"
                @click.prevent="filterMap(item.id,item.name,index)"
                style="margin-right:15px;"
              >{{item.name}}</a>
            </div>
            <div>
              <i data-v-d0475a26 :class="['el-icon-d-arrow-right',{'el-icon-d-arrow-top':hidden}]"></i>
              <a href="#" @click="hiddenAll" style="font-weight:bold">等43个区域</a>
            </div>
          </el-col>
        </el-row>
        <!-- 攻略 -->
        <el-row>
          <el-col :span="3">攻略:</el-col>
          <el-col
            :span="18"
          >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</el-col>
        </el-row>
        <!-- 均价 -->
        <el-row>
          <el-col :span="3">均价:</el-col>
          <el-col :span="18">均价内容</el-col>
        </el-row>
      </el-col>
      <el-col :span="10">
        <!-- <script
          type="text/javascript"
          src="https://webapi.amap.com/maps?v=1.4.15&key=28c6d1daa97bd27131f7ade6221208cc"
        ></script>-->
        <div id="container"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hidden: true,
      act: ''
    }
  },
  props: {
    cityId: {
      type: Number,
      default() {
        return {}
      }
    },
    hotelData: {
      type: Array,
      default() {
        return {}
      }
    },
    cityData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    filterMap(id, name, index) {
      this.act = index
      // console.log(id);
      this.$emit('scenic', {
        city: this.cityId,
        scenic: id
      })

      // 搜索
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
        //关键字查询
        placeSearch.search(name, function(status, result) {
          // 查询成功时，result即对应匹配的POI信息
        })
      })
    },
    hiddenAll() {
      this.hidden = !this.hidden
    },
    clearAllSelect() {
      this.act = ''
      this.$emit('scenic', {
        city: this.cityId
      })
    }
  },
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map('container', {
        zoom: 8, //级别
        center: [118.9213, 31.75649], //中心点坐标
        viewMode: '3D' //使用3D视图
      })
      
      // // 创建一个 Marker 实例：
    var marker1 = new AMap.Marker({
      position: new AMap.LngLat(118.8718107, 31.32846821), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      title: '好来阁商务宾馆'
    })
    var marker2 = new AMap.Marker({
      position: new AMap.LngLat(118.787727, 32.057976), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      title: '南京古都文化酒店（鼓楼店）'
    })
    var marker3 = new AMap.Marker({
      position: new AMap.LngLat(118.732506, 32.126942), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      title: '7天连锁酒店(南京长江大桥店)'
    })
    var marker4 = new AMap.Marker({
      position: new AMap.LngLat(118.9213, 31.75649), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      title: '梅山宾馆'
    })

    // 将创建的点标记添加到已有的地图实例：
    map.add([marker1, marker2, marker3, marker4])
      
    }
    var url =
      'https://webapi.amap.com/maps?v=1.4.15&key=28c6d1daa97bd27131f7ade6221208cc&callback=onLoad'
    var jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  }
}
</script>

<style lang="less" scoped>
#container {
  width: 416px;
  height: 260px;
}
/deep/.el-row {
  color: #666;
  font-size: 14px;
  padding-bottom: 15px;
}
.hiddenAll {
  height: 60px;
  overflow: hidden;
}
.el-icon-d-arrow-right {
  transform: rotate(270deg);
  color: #f90;
}
.el-icon-d-arrow-top {
  transform: rotate(90deg);
}
.active {
  background-color: #ccc;
}
</style>