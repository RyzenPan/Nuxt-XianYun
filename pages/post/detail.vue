<template>
  <div class="detail">
    <el-row :gutter="20">
      <el-col class="main" :span="17">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/post">旅游攻略</el-breadcrumb-item>
          <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
        </el-breadcrumb>

        <h1>塞班贵？一定是你的打开方式不对！6000块玩转塞班</h1>
        <div class="postInfo">
          <span>攻略：2019-05-22 10:57</span>&nbsp;&nbsp;&nbsp;
          <span>阅读：12802</span>
        </div>
        <div class="content">
          <p>大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。</p>
        </div>
        <div class="post-ctrl">
          <div class="ctrl-item">
            <i data-v-741ea8d8 class="iconfont iconpinglun"></i>
            <p>评论(100)</p>
          </div>
          <div class="ctrl-item">
            <i data-v-741ea8d8 class="iconfont iconstar1"></i>
            <p>收藏</p>
          </div>
          <div class="ctrl-item">
            <i data-v-741ea8d8 class="iconfont iconfenxiang"></i>
            <p>分享</p>
          </div>
          <div class="ctrl-item">
            <i data-v-741ea8d8 class="iconfont iconding"></i>
            <p>点赞(100)</p>
          </div>
        </div>
        <!-- 评论区 -->
        <div class="cmt-wrapper">
          <h4>评论</h4>
          <el-input type="textarea"></el-input>
          <div class="upload">
            <!-- 上传图片 -->
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-button size="mini" type="primary">提交</el-button>
          </div>
        </div>
        <!-- 评论列表 -->
        <div class="cmt-list">
          <div class="cmt-list-item">
            <div class="cmt-info">
              <div class="left">
                <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
                <span>地球发动机</span>
                <i>2020-01-06 8:49</i>
              </div>
              <span>1</span>
            </div>
            <div class="cmt-content">
              <p>测试一下</p>
              <div class="cmt-ctrl"><a href="#">回复</a></div>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 侧边栏 -->
      <el-col :span="6">侧边栏</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handlePictureCardPreview(file) {
      console.log(file)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  width: 1000px;
  margin: 0 auto;
  h1 {
    border-bottom: 1px solid #ddd;
    padding: 20px 0;
  }
  .postInfo {
    padding: 20px;
    display: flex;
    justify-content: flex-end;
    color: #999;
  }
  .post-ctrl {
    padding: 50px 0 30px;
    display: flex;
    justify-content: center;
    .ctrl-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 20px;
      font-size: 20px;
      text-align: center;
      cursor: pointer;
      i {
        display: block;
        font-size: 28px;
        color: orange;
      }
      p {
        color: #999;
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
  .cmt-wrapper {
    h4 {
      padding: 15px 0;
    }
    .upload {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      .el-button {
        height: 30px;
      }
      /deep/.el-upload {
        height: 100px;
        width: 100px;
        line-height: 100px;
      }
    }
  }
  .cmt-list {
    border: 1px solid #ddd;
    margin-bottom: 20px;
    .cmt-list-item {
      font-size: 16px;
      padding: 20px 20px 5px;
      .cmt-info {
        font-size: 12px;
        margin-right: 0 0 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #666;
        .left{
          display: flex;
          align-items: center;
          span {
            padding: 0 10px;
          }
        }
        img {
          width: 16px;
          height: 16px;
        }
      }
    }
    .cmt-content{
      margin-top: 10px;
      padding-left: 30px;
      height: 42px;
      line-height: 42px;
      p {
        height: 20px;
      line-height: 20px;
      }
      .cmt-ctrl{
        float: right;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
      }
    }
  }
}
.el-breadcrumb {
  margin: 15px 0;
}
</style>