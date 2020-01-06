<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ 1000</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'QRCode'
export default {
  data() {
    return {
      payData: {},
      checkStatus: false,
      payOK:false
    }
  },
  methods: {
    checkPay() {
      const { id } = this.$route.query
      const {
        api,
        user: { userInfo }
      } = this.$store.state
      this.$axios({
        url: 'airorders/checkpay',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + userInfo.token
        },
        data: {
          id,
          nonce_str: this.payData.payInfo.nonce_str,
          out_trade_no: this.payData.payInfo.order_no
        }
      }).then(res => {
          console.log(res);
          if(res.data.statusTxt !== "订单未支付"){
            this.$alert('订单支付成功', '提示')
            this.$router.push({path:'/'})
            this.payOK = true
            clearInterval(checkStatus)
          }
      })
    }
  },
  mounted() {
    setTimeout(async () => {
      const id = this.$route.query.id
      const {
        user: { userInfo }
      } = this.$store.state
      // 请求订单详情
      const res = await this.$axios({
        url: `/airorders/${id}`,
        headers: {
          Authorization: 'Bearer ' + userInfo.token
        }
      })
      // 请求二维码
      const { payInfo, price } = res.data
      this.payData = res.data
      const qrcodeStage = document.getElementById('qrcode-stage')

      QRCode.toCanvas(qrcodeStage, payInfo.code_url, {
        width: 200
      })
      this.checkStatus = setInterval(() => {
        this.checkPay()
      }, 3000)
    }, 1)
  },
  destroyed() {
    clearInterval(this.checkStatus)
  }
}
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>