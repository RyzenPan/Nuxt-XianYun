<template>
  <div class="container">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{city.name}}酒店预订</el-breadcrumb-item>
    </el-breadcrumb>
  <!-- 条件筛选及地图显示区域 -->
  <SearchBar :cityId="cityId" @DateFilter="DateFilter" />
  <SearchMap :cityData="city" :cityId="cityId" :hotelData="hotel" @scenic="scenicFilter" />
  <!-- 筛选按钮 -->
  <SearchFilter />
  <!-- 酒店列表 -->
  <SearchItem :hotelData="hotel" />
  <!-- 分页功能 -->
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="postPage"
      :page-sizes="[5, 10, 20, 30]"
      :page-size='pageSize'
      layout="total, sizes, prev, pager, next, jumper"
      :total='total' >
    </el-pagination>
  </div>
</template>

<script>
import SearchBar from '@/components/hotel/searchBar'
import SearchMap from '@/components/hotel/searchMap'
import SearchFilter from '@/components/hotel/searchFilter'
import SearchItem from '@/components/hotel/searchItem'
export default {
  components:{
    SearchBar,SearchMap,SearchFilter,SearchItem
  },
  data() {
    return {
      city: {},
      cityId:0,
      hotel:[],
    // 请求酒店信息条件数据
      hotelsCondition:{
        // id:0, //酒店id(酒店详情) 
        city:74 //城市id
        // price_in:0, //酒店价格
        // scenic:0, //景点id
        // name_contains:'', //名字模糊查询
        // hotellevel:0,    //酒店星级
        // hoteltype:0,     //酒店类型
        // hotelbrand:0,   //酒店品牌
        // hotelasset:0,   //酒店设施
        // enterTime:2018-11-11,    // 入店时间
        // leftTime:2018-11-11,      //离开时间
        // person:0,     //人数
        // _sort:'',     //排序
        // _limit:0,       //条数
        // _start:0    //开始数据（分页
      },
      // 分页功能
      pageIndex:1,
      pageSize:5,
      total:121,
      postPage:0
    }
  },
  async mounted(){
    // 请求城市列表信息
    const {data:res} = await this.$axios({
      url:'/cities',
      params:{
        name: '南京'
      }
    })
    this.city = res.data[0]
    console.log(res);
    this.cityId = this.city.id
    this.getHotelList(this.hotelsCondition)
    // this.total = res.data.total
  },
  methods: {
    async getHotelList(data){
      // 请求酒店列表信息
      const { data:res } = await this.$axios({
            url:'/hotels',
            params:{
              ...data,
              _start: this.pageSize*(this.pageIndex-1),
              _limit: this.pageSize
            }
        })
        this.hotel = res.data
    },
    // 通过景点筛选
    scenicFilter(obj){
      this.getHotelList(obj)
    },
    // 通过时间查找
    DateFilter(obj){
      this.getHotelList(obj)
    },
   // 分页
    handleSizeChange(val){
      this.pageIndex = 0
      this.pageSize = val
      this.getHotelList()
    },
    handleCurrentChange(val){
      this.pageIndex = 0
      this.pageIndex = val
      this.getHotelList()
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width: 1000px;
  margin: 0 auto;
  .el-breadcrumb{
    margin: 15px 0;
  }
  .el-pagination{
    margin: 20px 0;
  }
}
</style>