<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />

        <!-- 分页功能 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead.vue'
import FlightsItem from '@/components/air/flightsItem.vue'
import FlightsFilters from '@/components/air/flightsFilters.vue'
import FlightsAside from '@/components/air/flightsAside.vue'

export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  data() {
    return {
      flightsData: {
        info: {},
        options: {},
      },
      cacheFlightsData: {
        info: {},
        options: {},
        flights: []
      },
      pageIndex: 1,
      pageSize: 5,
      total: 0
    }
  },
  mounted() {
    this.$axios({
      url: '/airs',
      params: this.$route.query
    }).then(res => {
      this.flightsData = res.data
      this.cacheFlightsData = { ...res.data }
      this.total = res.data.total
    })
  },
  computed:{
     // 计算属性监听函数内部引用实例的属性变化，一旦发生了变化，该函数会重新计算，并且返回新的值
        dataList(){
            // 请求如果还没完成，返回空数组
            // console.log(this.flightsData.flights);
            if(!this.flightsData.flights) return []
            // 计算分页的数据
            return this.flightsData.flights.slice(
                (this.pageIndex - 1) * this.pageSize, 
                this.pageIndex * this.pageSize
            );
        }
  },
  methods: {
    //  接收筛选过来的列表数据
    setDataList(arr) {
      this.flightsData.flights = arr
    },
    // 总页数发生变化时触发
    handleSizeChange(value) {
      this.pageSize = value
    },
    // 当前页
    handleCurrentChange(value) {
      this.pageIndex = value
    }
  },
  watch: {
    $route() {
      this.$axios({
        url: '/airs',
        params: this.$route.query
      }).then(res => {
        this.flightsData = res.data
        this.cacheFlightsData = { ...res.data }
        this.total = res.data.total
        this.pageIndex = 1
      })
    }
  }
}
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>