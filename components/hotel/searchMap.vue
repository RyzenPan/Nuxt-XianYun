<template>
  <div class="mapInfo">
    <el-row>
      <el-col :span="14">
        <!-- 区域 -->
        <el-row>
          <el-col :span="3">区域:</el-col>
          <el-col
            :span="18"
          >全部 镇兴路沿线视觉艺术学院大成名店南京西站铜山镇大桥南路宝塔路沿线宝塔路/万辰苏果珠江路沿线华侨城江浦东屏镇南京南站/明发北岭路沿线苜蓿园弘阳广场</el-col>
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
export default {}
</script>

<style lang="less" scoped>
/deep/.el-row {
  color: #666;
  font-size: 14px;
  padding-bottom: 15px;
}
</style>