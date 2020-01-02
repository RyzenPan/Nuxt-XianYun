<template>
  <div>
    <!-- 筛选入住时间 -->
		<el-form class="search-form-content" ref="form">
    <el-form-item>
      <!-- fetch-suggestions 返回输入建议的方法 -->
      <!-- select 点击选中建议项时触发 -->
      <el-autocomplete
        :fetch-suggestions="queryDepartSearch"
        placeholder="请搜索出发城市"
        @select="handleDepartSelect"
        class="el-autocomplete"
        v-model="form.departCity"
        @blur="departCityInput"
      ></el-autocomplete>
    </el-form-item>
		</el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        departCity: '南京'
      }
    }
  },
  methods: {
    // 出发城市下拉选择时触发
    handleDepartSelect(item) {},
    // 出发城市输入失去焦点
    departCityInput() {},
    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {}
  }
}
</script>

<style>
</style>