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
            <span>{{item2.desc}}</span>
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
        <input type="text" placeholder="请输入想去的地方" />
        <i class="el-icon-search searchIcon"></i>
      </div>
      <!-- 推荐 -->
      <div class="recommend">
        推荐：
        <a href>广州</a>
        <a href>上海</a>
        <a href>北京</a>
      </div>
      <!-- 推荐攻略 -->
      <div class="postTitle">
        <span>推荐攻略</span>
        <el-button type="primary" icon="el-icon-edit">写游记</el-button>
      </div>
      <!-- 推荐列表 -->
      <div class="postList">
        <div class="postItem" v-for="(item,index) in postList" :key="index">
          <a href="http://157.122.54.189:9093/post/detail?id=4">
            <h3>{{item.title}}</h3>
          </a>
          <a href="http://157.122.54.189:9093/post/detail?id=4">
            <p v-text="item.summary"></p>
          </a>
          <a class="postPIC" href="http://157.122.54.189:9093/post/detail?id=4">
            <img :src="item.images[0]" alt />
            <img :src="item.images[1]" alt />
            <img :src="item.images[2]" alt />
          </a>
          <div class="footer">
            <div class="footerLeft">
              <span class="location">
                <i class="el-icon-location-outline"></i>
                {{item.city.name}}
              </span>
              <span class="userName">
                <i class="el-icon-user"></i>
                {{item.account.nickname}}
              </span>
              <span class="watch">
                <i class="el-icon-view"></i>
                {{item.watch}}
              </span>
            </div>
            <div class="footerright">{{ item.like === null ? 0 : item.like}} 赞</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: '',
      memuList: [],
      postList: [],
      optionData: [],
      optionShow: false
    }
  },
  async mounted() {
    // 获取城市列表
    const res = await this.$axios({
      url: '/posts/cities'
    })
    console.log(res)
    this.memuList = res.data.data
    // 获取攻略信息
    const res1 = await this.$axios({
      url: '/posts',
      data: {
        _start: 0,
        _limit: 10
      }
    })
    // console.log(res1);
    this.postList = res1.data.data
  },
  methods: {
    memuEnter(index) {
      this.optionData = this.memuList[index].children
      this.flag = index
      this.optionShow = true
    },
    memuLeave() {
      this.optionShow = false
      this.flag = ''
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
          color: #999;
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
    .postList {
      padding: 10px 0;
      width: 700px;
      .postItem {
        padding: 10px 0;
        h3 {
          font-size: 18px;
          font-weight: normal;
          padding-bottom: 10px;
          &:hover {
            color: orange;
          }
        }
        p {
          font-size: 14px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3; // 限制快级元素的文本行数
          overflow: hidden;
        }
        .postPIC {
          display: flex;
          margin: 10px 0;
          justify-content: space-between;
          img {
            width: 220px;
            height: 150px;
          }
        }
      }
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #999;
      .userName {
        padding: 0 15px;
        color: orange;
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
    }
  }
}
</style>