<template>
  <div class="detail">
    <el-row :gutter="20">
      <el-col class="main" :span="17">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/post">旅游攻略</el-breadcrumb-item>
          <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
        </el-breadcrumb>

        <h1>{{postData.title}}</h1>
        <div class="postInfo">
          <span>攻略：{{postData.city.created_at}}</span>&nbsp;&nbsp;&nbsp;
          <span>阅读：{{postData.watch}}</span>
        </div>
        <div class="content" v-html="postData.content"></div>
        <div class="post-ctrl">
          <div class="ctrl-item">
            <i data-v-741ea8d8 class="iconfont iconpinglun"></i>
            <p>评论({{postData.comments.length}})</p>
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
            <p>点赞({{postData.like || 0}})</p>
          </div>
        </div>
        <!-- 评论区 -->
        <div class="cmt-wrapper">
          <h4>评论</h4>
          <el-tag closable type="info" @close="closeAt" v-if="replyName">{{replyName}}</el-tag>
          <el-input type="textarea" v-model="cmtContent"></el-input>
          <div class="upload">
            <!-- 上传图片 -->
            <el-upload
              action="http://127.0.0.1:1337/upload"
              name="files"
              list-type="picture-card"
              :on-success="picUploadSuccess"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-button size="mini" type="primary" @click="submitCmt">提交</el-button>
          </div>
        </div>
        <!-- 评论列表 -->
        <detailCmt @replayDate="replayDate" :commitData="commitData"></detailCmt>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage2"
          :page-sizes="[5, 8, 10, 15]"
          :page-size='pageSize'
          layout="total,sizes, prev, pager, next"
          :total='total'
        ></el-pagination>
      </el-col>
      <!-- 侧边栏 -->
      <el-col :span="6">侧边栏</el-col>
    </el-row>
  </div>
</template>

<script>
import detailCmt from '@/components/post/detailCmt'
export default {
  components: {
    detailCmt
  },
  data() {
    return {
      postData: {
        city: {},
        comments: []
      },
      cmtContent: '',
      replyName: '',
      replyId: '',
      picInfo: {},
      commitData: [],
      // 评论分页
      pageSize:5,
      pageIndex:0,
      total:0,
      currentPage2:0
    }
  },
  mounted() {
    this.$axios({
      url: '/posts',
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      this.postData = res.data.data[0]
    })
    this.getCmtInfo()
  },
  methods: {
    // 获取评论数据
    getCmtInfo() {
      this.$axios({
        url: 'posts/comments',
        params: {
          post: this.$route.query.id,
          _start: this.pageIndex,
          _limit: this.pageSize
        }
      }).then(res => {
        this.commitData = res.data.data
        this.total = res.data.total
        console.log(res);
      })
    },
    // 分页功能
    handleCurrentChange(val){
      this.pageIndex = val
      this.getCmtInfo()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getCmtInfo()
    },
    picUploadSuccess(res) {
      this.$message.success('上传成功')
      this.picInfo = res[0]
      this.cmtContent =
        this.cmtContent +
        `<br /><img src="http://127.0.0.1:1337${res[0].url}" alt="">`
    },
    handleRemove(file, fileList) {
      this.$message.success('移除成功')
      this.picInfo.length = 0
    },
    // 发布评论
    submitCmt() {
      this.$axios({
        url: '/comments',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.$store.state.user.userInfo.token,
          'Content-Type': 'application/json'
        },
        data: {
          content: this.cmtContent,
          pics: this.picInfo,
          post: this.postData.id,
          follow: this.replyId
        }
      }).then(res => {
        console.log(res)
        if (res.message === '提交成功') this.$message.success('评论成功')
      })
      this.cmtContent = ''
      this.$message.success('发布成功')
      this.getCmtInfo()
      this.closeAt()
    },
    // 获取回复人信息
    replayDate(data) {
      console.log(data)
      this.replyName = data.account.nickname
      this.replyId = data.id
    },
    // 取消@评论
    closeAt() {
      this.replyName = ''
      this.replyId = ''
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
        .left {
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
    .cmt-content {
      margin-top: 10px;
      padding-left: 30px;
      height: 42px;
      line-height: 42px;
      p {
        height: 20px;
        line-height: 20px;
      }
      .cmt-ctrl {
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

.content {
  width: 700px;
  /deep/img {
    max-width: 100% !important;
    padding: 10px 0;
  }
}

.el-tag {
  margin-bottom: 5px;
}
</style>