<template>
  <div>
    <!-- 筛选入住时间 -->
    <el-form class="search-form-content" ref="form">
      <el-row>
        <el-col :span="5">
          <el-form-item>
            <!-- fetch-suggestions 返回输入建议的方法 -->
            <!-- select 点击选中建议项时触发 -->
            <el-autocomplete
              :fetch-suggestions="queryDepartSearch"
              placeholder="目的地"
              @select="handleDepartSelect"
              class="el-autocomplete"
              v-model="form.destList"
              @blur="departCityInput"
            ></el-autocomplete>
          </el-form-item>
        </el-col>
        <!-- 入住日期选择 -->
        <el-col :span="8.8" style="padding:0 20px;">
          <el-form-item>
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- 入住人选择 -->
        <el-col :span="5" style="margin-right:20px;">
          <el-form-item>
            <el-popover placement="bottom" width="300" trigger="click">
              <span style="padding-right:58px;">每间:</span>
              <el-select v-model="value" placeholder="成人" size="mini" style="width:100px;">
                <el-option
                  v-for="item in adultValue"
                  :key="item.value"
                  :label="item.label+'位成人'"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select v-model="value2" placeholder="儿童" size="mini" style="width:100px;">
                <el-option
                  v-for="item in childValue"
                  :key="item.value"
                  :label="item.label+'位儿童'"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input
                placeholder="人数未定"
                suffix-icon="el-icon-user"
                v-model="input1"
                readonly
                slot="reference"
              ></el-input>
              <el-button type="primary" size="mini" style="margin: 15px 0 0 245px;">确定</el-button>
            </el-popover>
          </el-form-item>
        </el-col>
        <!-- 按钮 -->
        <el-col :span="2">
          <el-button type="primary">查看价格</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        destList: '南京'
      },
      value1: '',
      destList: [],
      input1: '',
      adultValue: [
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        },
        {
          value: '5',
          label: '5'
        }
      ],
       childValue: [
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        },
        {
          value: '5',
          label: '5'
        }
      ],
      value: '',
      value2: ''
    }
  },
  methods: {
    // 封装提示框城市提示
    getTips(value, cb, list, callback) {
      if (value) {
        this.$axios({
          url: '/airs/city',
          params: {
            name: value
          }
        }).then(res => {
          let list = res.data.data.map(item => {
            item.value = item.name.replace('市', '')
            return item
          })
          cb(list)
          callback(list)
        })
      } else if (!value) {
        cb([])
      }
    },
    // 出发城市下拉选择时触发
    handleDepartSelect(item) {},
    // 出发城市输入失去焦点
    departCityInput() {},
    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      this.getTips(value, cb, this.destList, list => {
        this.destList = list
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 210px;;
}
</style>