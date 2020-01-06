<template>
  <div class="mapInfo">
    <el-row>
      <el-col :span="14">
        <!-- 区域 -->
        <el-row>
          <el-col :span="3">区域:</el-col>
          <el-col :span="18">
            <div :class="{hiddenAll:hidden}">
              <span style="font-weight:bold">全部</span> &nbsp;&nbsp;
              <a
                href="#"
                v-for="(item,index) in cityData.scenics"
                :key="index"
                @click.prevent="filterMap(item.id)"
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
      <el-col :span="10">地图区域</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hidden: true
    }
  },
  props: {
    cityData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    filterMap(id) {
      // console.log(id);
      this.$emit('scenic',id)
    },
    hiddenAll() {
      this.hidden = !this.hidden
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>