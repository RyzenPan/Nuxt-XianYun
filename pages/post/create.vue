<template>
  <div class="create">
    <el-row :gutter="20">
      <el-col class="main" :span="17">
        <h2>发表新攻略</h2>
        <p>分享你的个人游记，让更多人看到哦！</p>
        <el-form ref="form" :model="form" label-width="80px">
          <!-- 标题 -->
          <el-input placeholder="请输入标题" v-model="form.title"></el-input>
          <!-- 富文本区域 -->
          <el-form-item label-width="0">
          <VueEditor :config="config" ref="vueEditor"/>
          </el-form-item>
          <!-- 选择城市 -->
          <el-form-item label="选择城市">
            <el-autocomplete
              :fetch-suggestions="queryDepartSearch"
              placeholder="请搜索游玩城市"
              @select="handleDepartSelect"
              class="el-autocomplete"
              v-model="form.city"
              @blur="departCityInput"
            ></el-autocomplete>
          </el-form-item>
          <!-- 发布区域 -->
          <el-button type="primary" @click="sendPost">发布</el-button>
          <span class="send">
            或者
            <a href="javascript:;" @click="saveDrafts">保存到草稿</a>
          </span>
        </el-form>
      </el-col>
      <el-col class="aside" :span="7">
        <div class="drafts">草稿箱（{{draftsData.length}}）</div>
        <div
          class="draftsItem"
          v-for="(item,index) in draftsData"
          :key="index"
          @click="readDraft(index)"
        >
          <span data-v-a7cc81fa class="iconfont el-icon-edit">{{item.title}}</span>

          <p>{{item.time}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
import "quill/dist/quill.snow.css"
let VueEditor;

if (process.browser) {
    VueEditor = require('vue-word-editor').default
}

export default {
  components:{
    VueEditor
  },
  data() {
    return {
      form: {
        content: '',
        title: '',
        city: ''
      },
      draftsData: [],
      destList: [],
      //   富文本配置
      config: {
        // 上传图片的配置
        uploadImage: {
          url: 'http://127.0.0.1:1337/upload',
          name: 'files',
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            insert('http://127.0.0.1:1337' + res.data[0].url)
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: 'http://127.0.0.1:1337/upload',
          name: 'files',
          uploadSuccess(res, insert) {
            insert('http://127.0.0.1:1337' + res.data[0].url)
          }
        }
      }
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
    // 城市下拉选择时触发
    handleDepartSelect(item) {
      this.form.city = item.name
    },
    // 城市输入失去焦点
    departCityInput() {
      this.form.city = this.destList[0].name
    },
    // 城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      this.getTips(value, cb, this.destList, list => {
        this.destList = list
      })
    },
    // 获取文章内容
    getContent() {
      let quill = this.$refs.vueEditor.editor
      this.form.content = quill.root.innerHTML
    },
    // 发布文章
    sendPost() {
      this.getContent()
      delete this.form.time
      this.$axios({
        url:'/posts',
        method:"POST",
        headers: {
          Authorization: 'Bearer ' + this.$store.state.user.userInfo.token
        },
        data:this.form
      }).then(res=>{
        if(res.data.message === '新增成功') {
          this.$message.success('文章新增成功')
          this.$router.push({path:'/post'})
        }
      })
    },
    // 存为草稿
    saveDrafts() {
      this.getContent()
      let now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      this.form.time = now
      this.$store.commit('post/savePostDrafts', this.form)
    },
    // 读取草稿
    readDraft(index) {
      this.form.length = 0
      var quill = this.$refs.vueEditor.editor
      quill.root.innerHTML = ''
      this.form = this.draftsData[index]
      quill.clipboard.dangerouslyPasteHTML(0, this.draftsData[index].content)
    }
  },
  mounted() {
    setTimeout(() => {
      this.draftsData = this.$store.state.post.post
    }, 0);
    
  }
}
</script>

<style lang="less" scoped>
.create {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  h2 {
    font-size: 22px;
    font-weight: normal;
    margin-bottom: 10px;
  }
  p {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  .send {
    font-size: 14px;
    margin-left: 10px;
    a {
      color: orange;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

#vue-editor-wrapper {
  height: 410px;
  margin: 20px 0 60px 0;
}

.aside {
  .drafts {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  .draftsItem {
    border: 1px solid #ddd;
    padding: 5px 10px;
    height: 40px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    color: #666;
    justify-content: space-between;
    cursor: pointer;
    p {
      margin: 0;
    }
  }
}
</style>