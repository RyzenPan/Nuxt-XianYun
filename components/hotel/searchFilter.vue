<template>
  <div>
    <el-row>
      <el-col :span="8">
        <!-- 滑块区域 -->
        <span style="margin-right:199px;">价格</span>
        <span>0-4000</span>
        <div class="block">
          <el-slider v-model="priceBlock" :max="4000"></el-slider>
        </div>
      </el-col>
      <el-col :span="4">
        <div>住宿等级</div>
        <el-dropdown size="medium">
          <span class="el-dropdown-link" style="color:#666;font-size:12px;width:100%;">
            <span>不限</span>
            <i class="el-icon-arrow-down el-icon--right" style="margin-left:84px;"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in option.levels" :key="index">
              <i class="iconfont iconright-1"></i> {{item.name}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="4">
        <div>住宿类型</div>
        <el-dropdown size="medium">
          <span class="el-dropdown-link" style="color:#666;font-size:12px;width:100%;">
            <span>经济型</span>
            <i class="el-icon-arrow-down el-icon--right" style="margin-left:70px;"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in option.types" :key="index">
              <i class="iconfont iconright-1"></i> {{item.name}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="4">
        <div>酒店设施</div>
        <el-dropdown size="medium">
          <span class="el-dropdown-link" style="color:#666;font-size:12px;width:100%;">
            <span>不限</span>
            <i class="el-icon-arrow-down el-icon--right" style="margin-left:84px;"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="iconfont iconright-1"></i> wifi
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="iconfont iconcircle"></i> 热水壶
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="iconfont iconcircle"></i> 吹风机
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="iconfont iconcircle"></i> 外币兑换服务
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="iconfont iconcircle"></i> 洗衣服务
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="4">
        <div>酒店品牌</div>
        <el-dropdown size="medium">
          <span class="el-dropdown-link" style="color:#666;font-size:12px;width:100%;">
            <span>不限</span>
            <i class="el-icon-arrow-down el-icon--right" style="margin-left:84px;"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="iconfont iconright-1"></i> 7天连锁
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="iconfont iconcircle"></i> 汉庭
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="iconfont iconcircle"></i> 如家
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="iconfont iconcircle"></i> 格林豪泰
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="iconfont iconcircle"></i> 海游
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <!-- 酒店列表 -->
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      priceBlock: 4000,
      option:{}
    }
  },
  async mounted(){
    const res = await this.$axios({
      url:'/hotels/options',
    })
    // console.log(res);
    this.option = res.data.data
  }
}
</script>

<style lang="less" scoped>
.el-row {
  height: 80px;
  border: 1px solid #ddd;
  padding: 5px 0px;
  color: #666;
  margin-bottom: 15px;
}
.el-col {
  border-right: 1px solid #ddd;
  padding: 10px 20px;
  height: 100%;
}
.el-slider {
  width: 95%;
}
/deep/.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown {
  margin-top: 10px !important;
}

.el-dropdown-menu {
  width: 125px;
}

</style>