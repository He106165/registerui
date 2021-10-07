<template>

    <div>
        <el-container>
            <el-container>
                <el-main>
                    <div class="box" style="text-align: center;padding-left: 20px">
                        <h3><span></span>绑定第三方账号</h3>
                        <el-table stripe border :data="bingInfo" :header-cell-style="{'text-align':'center'}"
                                  :cell-style="{'text-align':'center'}" style="width: 80%;position: absolute">
                            <el-table-column label="账号类别" style="min-width: 10%">
                                <template slot-scope="scope">
                                    <img :src="scope.row.img"/>
                                </template>
                            </el-table-column>
                            <el-table-column label="信息描述" style="min-width: 40%">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.state == 1"
                                          style="color: green">{{ scope.row.describe }}</span>
                                    <span v-if="scope.row.state == 0" style="color: red">{{ scope.row.describe }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="操作" style="min-width: 15%">
                                <template slot-scope="scope">
                                    <el-button v-if="scope.row.state== 1 && scope.row.type=='Alipay'"
                                               @click.native.prevent="delAliInfo(scope.row.ALIPAY_ID)">
                                        解除绑定
                                    </el-button>
                                    <el-button v-if="scope.row.state== 0 && scope.row.type=='Alipay'"
                                               @click.native.prevent="bindAliInfo()">
                                        绑定账号
                                    </el-button>
                                    <el-button v-if="scope.row.state== 1 && scope.row.type=='WeChat'"
                                               @click.native.prevent="delWeChatInfo()">
                                        解除绑定
                                    </el-button>
                                    <el-button v-if="scope.row.state== 0 && scope.row.type=='WeChat'"
                                               @click.native.prevent="bindWeChatInfo()">
                                        绑定账号
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<style>
    .bimg {
        height: 50%;
        text-align: center;
        display: table-cell;
        vertical-align: middle;
        position: absolute;
        top: 10%;
        left: 25%;
    }

    .shadow {
        top: 0px;
        left: 0px;
        border: 1.5px;
        border: #1f2d3d;
    }

    .buttoncss {
        border-radius: 15px;
        font-family: "tahoma", "宋体";
        font-size: 18pt;
        color: #003399;
        border: 2px #003399 solid;
        color: #006699;
        border-bottom: #93bee2 1px solid;
        border-left: #93bee2 1px solid;
        border-right: #93bee2 1px solid;
        border-top: #93bee2 1px solid;
        background-color: #e8f4ff;
        cursor: hand;
        font-style: normal;
        width: 160px;
        height: 80px;
        /*position: absolute;*/
        /*top: 68%;*/
        /*left: 35%;*/
    }
</style>
<script>
import Cookies from 'js-cookie'
import { delAlipayInfo, getUserInfo, getUrlKey, bangdingWechat, delWeChatInfo } from '@/api/bangdingsf/bangdingsf'
import { removeToken } from '@/utils/auth'

export default {
  data() {
    return {
      imgZfb: require('../../../public/zhifubao.png'),
      imgWx: require('../../../public/weixin.png'),
      bingInfo: [{
        img: require('../../../public/zhifubao.png'),
        describe: '您尚未绑定支付宝账号',
        state: 0,
        type: 'Alipay',
        ALIPAY_ID: '',
        WECHAR_ID: '',
        loginType: ''
      },
        {
          img: require('../../../public/weixin.png'),
          describe: '您尚未绑定微信账号',
          state: 0,
          type: 'WeChat',
          WECHAT_ID: '',
          loginType: ''
        }],
      back: ''
  }
  },
  mounted() {
    this.getUserInfo() // 查询国籍列表信息

    let ty = getUrlKey('Error')
    if (ty == 'alierror') {
      this.msgError('您的支付宝账号已绑定账号，请勿重复绑定！')
    }

    let wechat = getUrlKey('Error')
    if (wechat == 'wechaterror') {
      this.msgError('您的微信账号已绑定账号，请勿重复绑定！')
    }
  },

  methods: {
    bindAliInfo() {
      let aliyUid = Cookies.get('Admin-Token')
      //window.location.href="https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2021001194602100&scope=auth_user&redirect_uri=http%3A%2F%2F192.168.11.216%3A9527%2Fotherlogin%2Finfo%2FbindAlipayInfo%3Fraw%3D"+aliyUid;
      // window.location.href = 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2021001194602100&scope=auth_user&redirect_uri=http%3A%2F%2Flxyzt.cscse.edu.cn%2Fapi%2Fotherlogin%2Finfo%2FbindAlipayInfo%3Fraw%3D' + aliyUid
      window.location.href="https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2021002116661993&scope=auth_user&redirect_uri=http%3A%2F%2Flxyzt.cscse.edu.cn%2Fapi%2Fotherlogin%2Finfo%2FbindAlipayInfo%3Fraw%3D"+aliyUid;
    },
    delAliInfo(uid) {
      delAlipayInfo(this.bingInfo[0]).then(res => {
        // console.log(res)
        if (res === 1) {
          // debugger;
          let ss = this.bingInfo[0].loginType
          if (ss == 'Alipay') {
            removeToken()
          }
          this.bingInfo[0].loginType = 0
          this.bingInfo[0].state = 0
          this.bingInfo[0].describe = '您尚未绑定支付宝账号'
          this.msgSuccess('解绑账号成功')
          this.visible = false
          this.$emit('ok')
        } else {
          this.msgError('解绑账号失败')
        }
      })
    },
    getUserInfo() {
      getUserInfo().then(res => {
        if (res != null) {
          if (res.ALIPAY_ID != null) {
            this.bingInfo[0].state = 1
            this.bingInfo[0].describe = '您已经绑定过支付宝账号'
            this.bingInfo[0].ALIPAY_ID = res.ALIPAY_ID
            this.bingInfo[0].loginType = res.loginType
          } else {
            this.bingInfo[0].state = 0
            this.bingInfo[0].describe = '您尚未绑定支付宝账号'
          }
          if (res.WECHAR_ID != null) {
            this.bingInfo[1].state = 1
            this.bingInfo[1].describe = '您已经绑定过微信账号'
            this.bingInfo[1].WECHAT_ID = res.WECHAR_ID
            this.bingInfo[1].loginType = res.loginType
          } else {
            this.bingInfo[1].state = 0
            this.bingInfo[1].describe = '您尚未绑定微信账号'
          }
        }
      })
    },
    //个人用户绑定微信账号
    bindWeChatInfo() {
      let aliyUid = Cookies.get('Admin-Token')
      window.location.href = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx68f22e1c57a6659f&redirect_uri=http%3A%2F%2Flxyzt.cscse.edu.cn%2Fapi%2Fotherlogin%2Fwxlogin%2FbangdingWechat&response_type=code&scope=snsapi_login&state=' + aliyUid + '#wechat_redirect'
    },
    delWeChatInfo(uid) {
      // 微信扫码的个人用户不允许解除绑定
      getUserInfo().then(res =>{
        if (res.loginType !== "wechat_"){
          delWeChatInfo({ WECHAT_ID: this.bingInfo[1].WECHAT_ID }).then(res => {
            if (res === 1) {
              // debugger;
              let ss = this.bingInfo[1].loginType
              if (ss == 'wechat') {
                removeToken()
              }
              this.bingInfo[1].loginType = 0
              this.bingInfo[1].state = 0
              this.bingInfo[1].describe = '您尚未绑定微信账号'
              this.msgSuccess('解绑账号成功')
              this.visible = false
              this.$emit('ok')
            } else {
              this.msgError('解绑账号失败')
            }
          })
        } else {
          this.msgInfo('微信扫码用户,不可以解除绑定')
        }
      })

    }
  },
  components: {}
}
</script>

<style scoped>
    body,
    html {
        margin: 0;
        padding: 0;
        height: 100%;
        min-height: 100%;
        background-color: #f5f5fa;
    }

    body > div,
    body > div > div {
        height: 100%;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .box {
        background: #fff;
        box-shadow: 2px 0px 12px #dedede;
        height: 600px;
        position: relative;
    }

    h3 {
        margin: 0;
        color: #333333;
        font-weight: 600;
        font-size: 16px;
        font-family: "微软雅黑";
        line-height: 40px;
        text-align: left;
        border-bottom: 1px solid #eeeeee;
    }

    h3 span {
        width: 3px;
        height: 16px;
        background: #1569c8;
        display: inline-block;
        margin-right: 15px;
    }

    p {
        margin-left: 20px;
    }
</style>
