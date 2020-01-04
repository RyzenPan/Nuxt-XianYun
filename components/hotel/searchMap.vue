<template>
  <div class="mapInfo">
    <el-row>
      <el-col :span="14">
        <!-- 区域 -->
        <el-row>
          <el-col :span="3">区域:</el-col>
          <el-col
            :span="18"
          >全部 &nbsp;&nbsp;&nbsp;<a href="#" v-for="(item,index) in cityData.scenics" :key="index" @click.prevent="filterMap(item.id)" style="margin-right:15px;">{{item.name}}</a></el-col>
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
      <el-col :span="10">地图区域</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props:{
    cityData:{
      type:Object,
      default(){return {}}
    }
  },
  methods: {
    filterMap(){}
  }
}
</script>

<style lang="less" scoped>
/deep/.el-row {
  color: #666;
  font-size: 14px;
  padding-bottom: 15px;
}
</style>