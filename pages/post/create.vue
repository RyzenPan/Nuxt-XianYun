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
          <VueEditor :config="config" ref="vueEditor"></VueEditor>
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
        <div class="drafts">草稿箱（0）</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
import moment from 'moment'
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      form: {
        content: '',
        title: '',
        city: ''
      },
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
    getContent(){
      let quill = this.$refs.vueEditor.editor
      this.form.content = quill.root.innerHTML
    },
    // 发布文章
    sendPost() {
      this.getContent()
    },
    // 存为草稿
    saveDrafts(){
      this.getContent()
      let now = moment(new Date).format("YYYY-MM-DD HH:mm:ss")
      this.form.time = now
      this.$store.commit('post/savePostDrafts', this.form)
    }
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
}
</style>