<template>
  <div class="container">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{city.name}}酒店预订</el-breadcrumb-item>
    </el-breadcrumb>
  <!-- 条件筛选及地图显示区域 -->
  <SearchBar />
  <SearchMap />
  <!-- 筛选按钮 -->
  <SearchFilter />
  </div>
</template>

<script>
import SearchBar from '@/components/hotel/searchBar'
import SearchMap from '@/components/hotel/searchMap'
import SearchFilter from '@/components/hotel/searchFilter'
export default {
  components:{
    SearchBar,SearchMap,SearchFilter
  },
  data() {
    return {
      city: []
    }
  },
  mounted(){
    this.$axios({
      url:'/cities',
      params:{
        name: '南京'
      }
    }).then(res=>{
      console.log(res);
      this.city = res.data.data[0]
      console.log(this.city);
    })
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
}
</style>