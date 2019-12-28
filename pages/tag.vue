<template>
  <div>
    <div class="header">
      <span v-for="item in btnList" :key="item" @click="点击(item)" :class="act === item ? 'active' : ''">{{item}}  </span>
    </div>
    <br />
    <br />
    <div v-for="(item,index) in btnList" :key="index"  >
      <ul v-if="flag === item">
        <li>{{item}}新闻1</li>
        <li>{{item}}新闻2</li>
        <li>{{item}}新闻3</li>
      </ul>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnList: ['普通', '体育', '娱乐'],
      flag: '普通',
      act:''
    }
  },
  methods: {
      点击(value){
          this.flag = value
          this.act = value
      }
  }
}
</script>

<style>
.active {
    color: red;
    font-size: 26px;
}
</style>