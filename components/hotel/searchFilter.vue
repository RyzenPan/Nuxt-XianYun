<template>
  <div>
      <el-row>
          <el-col :span="8">
              <span style="margin-right:199px;">价格</span>
              <span>0-4000</span>
              <!-- 滑块区域 -->
                <div class="block">
    <el-slider v-model="value2"></el-slider>
  </div>
          </el-col>
                    <el-col :span="4">
              住宿等级
          </el-col>
                    <el-col :span="4">
              住宿类型
          </el-col>
                    <el-col :span="4">
              酒店设施
          </el-col>
                    <el-col :span="4">
              酒店品牌
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
    data () {
        return {
            value2:100
        }
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
.el-col{
    border-right: 1px solid #ddd;
    padding: 10px 20px;
    height: 100%;
}
.el-slider{
    width: 95%;
}
</style>