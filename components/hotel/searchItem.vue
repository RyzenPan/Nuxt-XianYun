<template>
<div>
  <div class="hotelItem" v-for="(item,index) in hotelData" :key="index">
    <el-row>
      <el-col :span="8">
        <img
          class="cover"
          :src="item.photos"
          alt
        />
      </el-col>
      <el-col :span="10">
        <h2 class="title">
          <a href="" @click.prevent="$router.push({path: `/hotel/hotelDetail`,query:{id:item.id}})">{{item.name}}</a>
        </h2>
        <span class="desc">
          <span>{{item.alias}}</span>
          <i class="iconfont iconhuangguan"></i><i class="iconfont iconhuangguan"></i><i class="iconfont iconhuangguan"></i> {{item.hoteltype.name}}
        </span>
        <el-row>
          <el-col :span="10">
            <div class="stars">
              <el-rate
            v-model="item.stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
            </div>
          </el-col>
          <el-col :span="7">
            <span class="lh">{{item.num_collected}}</span> 条评论
          </el-col>
          <el-col :span="7">
            <span class="lh">{{item.all_remarks}}</span> 篇游记
          </el-col>
        </el-row>
        <i data-v-0a769ebc class="iconfont iconlocation grar"></i>
        <span class="grar">位于: {{item.address}}</span>
      </el-col>
      <el-col :span="6">
        <el-table :data="item.products" :show-header="false"  @row-click="priceClick">
          <el-table-column prop="name" width="100"></el-table-column>
          <el-table-column prop="price" width="120">
            <template slot-scope="scope">
              <span style="font-size:18px;color:#f90">￥ {{scope.row.price}}</span>元起
              <i data-v-0a769ebc class="el-icon-arrow-right"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props:{
      hotelData:{
          type:Array,
          default(){return {}}
      }
  },
  mounted(){
      setTimeout(()=>{
      // console.log(this.hotelData);
      },1000)
  },
  methods: {
    priceClick(row, column, event) {
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
.hotelItem {
    border-bottom: 1px solid #eee;
    padding: 25px 0;
}
.cover {
  width: 320px;
  height: 210px;
}

.title {
    font-weight: normal;
  }

.desc {
    color: #999;
    .iconhuangguan {
      color: #f90;
    }
}
  
.lh {
    line-height: 40px;
    color: #f90;
}

.stars {
  height: 40px;
  display: flex;
  align-items: center;
}

.grar {
    color: #666;
}

/deep/.el-table__body-wrapper, .is-scrolling-none {
    margin-top: 26px;
}

/deep/.el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #fff;
}
</style>