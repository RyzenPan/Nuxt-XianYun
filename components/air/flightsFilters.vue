<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.airport"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间">
          <el-option
            :label="item.from+':00 - '+item.to+':00'"
            :value="`${item.from},${item.to}`"
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.company"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型">
          <el-option
            v-for="(item,index) in flightSize"
            :key="index"
            :label="item.lable"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
    <span>{{filterData}}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      airport: '', // 机场
      flightTimes: '', // 出发时间
      company: '', // 航空公司
      airSize: '', // 机型大小
      flightSize: [
        { lable: '大', value: 'L' },
        { lable: '中', value: 'M' },
        { lable: '小', value: 'S' }
      ]
    }
  },
  computed:{
    filterData(){
      const arr = this.data.flights.filter(item=>{
         // 默认每条数据都是符合条件
        let valid = true;
        // 筛选所有规则
        if(this.airport && item.org_airport_name !== this.airport){
          return valid = false
        }
        
        if(this.company && item.airline_name !== this.company){
          return valid = false
        }
        
        if(this.airSize && item.plane_size !== this.airSize){
          return valid = false
        }
        
        if(this.flightTimes){
          const [from, to] = this.flightTimes.split(',')
          const start = item.dep_time.split(':')[0]
          if(from > start || start >= to){
            return valid = false
          }
        }
        
        return valid
      })
      this.$emit('setDataList', arr)
      return ''
    }
  },
  methods: {
    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport = ''
      this.flightTimes = ''
      this.company = ''
      this.airSize = ''
    }
  }
}
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>