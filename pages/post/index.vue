<template>
  <div class="container">
    <div class="aside">
      <div class="asideOption" @mouseleave="memuLeave()">
        <ul class="memus">
          <li
            class="memu-item"
            v-for="(item,index) in memuList"
            :key="index"
            @mouseenter="memuEnter(index)"
            :class="flag === index ? 'memuAct' :''"
          >
            <div class="option">
              <div>{{item.type}}</div>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
        </ul>

        <div class="optionList" v-if="optionShow">
          <div v-for="(item2,index2) in optionData" :key="index2">
            <em>{{index2+1}}</em>
            <strong>{{item2.city}}</strong>
            <span @click="quickSearch(item2.city)">{{item2.desc}}</span>
          </div>
        </div>
      </div>
      <!-- 推荐城市 -->
      <div class="aside-recommend">
        <h4 class="aside-title">推荐城市</h4>
        <a href class="aside-recommend-item">
          <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt />
        </a>
      </div>
    </div>

    <div class="main">
      <!-- 搜索 -->
      <div class="search">
        <input type="text" placeholder="请输入想去的地方" v-model="searchKeyword" />
        <i class="el-icon-search searchIcon" @click="searchCity"></i>
      </div>
      <!-- 推荐 -->
      <div class="recommend">
        推荐：
        <a
          href="#"
          v-for="(item,index) in ['广州','上海','北京']"
          :key="index"
          @click.prevent="quickSearch(item)"
        >{{item}}</a>
      </div>
      <!-- 推荐攻略 -->
      <div class="postTitle">
        <span>推荐攻略</span>
        <el-button type="primary" icon="el-icon-edit" @click="writeTravl">写游记</el-button>
      </div>
      <!-- 推荐列表 -->
      <postList :postList="postList"></postList>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="postPage"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import postList from '@/components/post/postList'
export default {
  components: {
    postList
  },
  data() {
    return {
      searchKeyword: '',
      flag: '',
      memuList: [],
      postList: [],
      optionData: [],
      optionShow: false,
      pageIndex:0,
      pageSize:3,
      total:0,
      postPage:0
    }
  },
  async mounted() {
    // 获取城市列表
    const res = await this.$axios({
      url: '/posts/cities'
    })
    // console.log(res)
    this.memuList = res.data.data
    this.getPostInfo()
    if(this.$route.query.city){
      this.quickSearch(this.$route.query.city)
    }
  },
  methods: {
    async getPostInfo(keyword) {
      // 获取攻略信息
      const res1 = await this.$axios({
        url: '/posts',
        params: {
          city: keyword || null,
          _start: this.pageSize*(this.pageIndex-1),
          _limit: this.pageSize
        }
      })
      // console.log(res1);
      this.postList = res1.data.data
      this.total = res1.data.total
    },
    memuEnter(index) {
      this.optionData = this.memuList[index].children
      this.flag = index
      this.optionShow = true
    },
    memuLeave() {
      this.optionShow = false
      this.flag = ''
    },
    // 搜索城市
    searchCity() {
      let keyword = this.searchKeyword
      this.getPostInfo(keyword)
    },
    // 快速搜索
    quickSearch(keyword) {
      this.getPostInfo(keyword)
    },
    // 分页
    handleSizeChange(val){
      this.pageIndex = 0
      this.pageSize = val
      this.getPostInfo()
    },
    handleCurrentChange(val){
      this.pageIndex = 0
      this.pageIndex = val
      this.getPostInfo()
    },
    writeTravl(){
      this.$router.push({path:"/post/create"})
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .aside {
    width: 260px;
    position: relative;
    .memus {
      z-index: 99999;
      width: 260px;
      margin: 20px 0;
      box-sizing: border-box;
      border-left: 1px solid #ddd;
      border-top: 1px solid #ddd;
      background-color: #fff;
      position: relative;
      .memu-item {
        padding: 0 20px;
        height: 41px;
        box-sizing: border-box;
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        font-size: 14px;
        line-height: 41px;
        width: 100%;
        .option {
          display: flex;
          justify-content: space-between;
        }
        i {
          line-height: 41px;
          font-size: 18px;
          // color: #999;
        }
      }
    }
    .memuAct {
      color: orange !important;
      border-right: 0;
      border-right: 1px solid #fff !important;
    }

    .sub-memu {
      width: 350px;
      height: 202px;
      padding: 10px 20px;
      border: 1px solid #ddd;
      border-left: none;
      position: absolute;
      background-color: #fff;
      top: 80px;
      left: 283px;
      .sub-memu-item {
        width: 308px;
        height: 36px;
      }
    }
    .aside-recommend {
      .aside-title {
        font-weight: normal;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
        line-height: 45px;
      }
      img {
        width: 260px;
      }
    }
  }
  .main {
    .search {
      margin: 20px 0 0 0;
      width: 700px;
      height: 40px;
      box-sizing: border-box;
      border: 3px solid #ffa500;
      // line-height: 31px;
      display: flex;
      align-items: center;
      input {
        width: 610px;
        height: 24px;
        padding: 0 20px;
        margin-left: 2px;
        border: none;
        outline: none;
      }
      .searchIcon {
        font-size: 24px;
        margin-left: 7px;
        font-weight: bold;
        color: #ffa500;
      }
    }
    .recommend {
      padding: 10px 0;
      font-size: 12px;
      color: #666;
      a {
        padding-right: 6px;
      }
    }
    .postTitle {
      width: 100%;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      span {
        color: #ffa500;
        font-size: 18px;
        &:after {
          display: block;
          content: '';
          width: 72px;
          height: 2px;
          background: orange;
          position: absolute;
          top: 205px;
        }
      }
    }
  }
}

.optionList {
  width: 310px;
  height: 190px;
  background-color: #fff;
  border: 1px solid #ddd;
  position: absolute;
  top: 20px;
  left: 259px;
  padding: 10px 20px;
  font-size: 14px;
  color: #ffa500;
  z-index: 999;
  div {
    height: 37px;
    width: 308px;
    display: flex;
    align-items: center;
    em {
      font-size: 22px;
      font-style: italic;
    }
    strong {
      font-weight: normal;
      margin: 0 10px;
    }
    span {
      color: #999;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>