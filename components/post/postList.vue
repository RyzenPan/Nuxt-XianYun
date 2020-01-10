<template>
    <div class="postList">
      <div class="postItem" v-for="(item,index) in postList" :key="index">
        <div class="threePic" v-if="item.images.length >= 3">
          <a href="#" @click.prevent="$router.push({path:`/post/detail?id=${item.id}`})">
            <h3>{{item.title}}</h3>
          </a>
          <a href="#" @click.prevent="$router.push({path:`/post/detail?id=${item.id}`})">
            <p v-text="item.summary"></p>
          </a>
          <a
            class="postPIC"
            href="#"
            @click.prevent="$router.push({path:`/post/detail?id=${item.id}`})"
          >
            <img :src="item.images[0]" alt />
            <img :src="item.images[1]" alt />
            <img :src="item.images[2]" alt />
          </a>
        </div>

        <div class="onlyOnePic" v-if="item.images.length < 3">
          <a
            class="postPIC"
            href="#"
            @click.prevent="$router.push({path:`/post/detail?id=${item.id}`})"
          >
            <img :src="item.images[0]" alt />
          </a>
          <div class="right">
            <a href="#" @click.prevent="$router.push({path:`/post/detail?id=${item.id}`})">
              <h3>{{item.title}}</h3>
            </a>
            <a href="#" @click.prevent="$router.push({path:`/post/detail?id=${item.id}`})">
              <p v-text="item.summary"></p>
            </a>
          </div>
        </div>

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
</template>

<script>
export default {
  props: {
    postList: {
      type: Array,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
        object-fit: cover;
        -o-object-fit: cover;
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

.onlyOnePic {
  display: flex;
  justify-content: left;
  align-items: top;
  .right {
    padding: 10px;
    h3 {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1; // 限制快级元素的文本行数
      overflow: hidden;
      height: 17px;
    }
  }
}
</style>