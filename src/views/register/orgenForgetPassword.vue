<template>
    <div id="orgen-forgetPassword">
        <!--头部-->
        <div class="header">
            <router-link to="/"><img :src="imgSrc" class="img"/></router-link>
            <div class="text">
                <p>教育部留学服务中心</p>
                <p>统一用户身份认证系统</p>
            </div>
        </div>
    <el-container class="body" style="background-color: white;">
        <el-header style="height: 90px;">
            <!--<div id="top-wrapper" style="width: 100%;height: 90px;">-->
                <!--<div id="top" style="width: 1100px;margin: 0 auto;">-->
                    <!--<router-link to="/"><img src="../../img/login-logo.png"></router-link>-->
                <!--</div>-->
            <!--</div>-->
            <div class="content">
                <h2 class="title" style="padding-top: 10px;">机构用户找回密码</h2>
                <div class="stepHeader">
                    <el-steps :space="200" :active="active" align-center finish-status="success">
                        <el-step title="安全验证"></el-step>
                        <el-step title="密码设置"></el-step>
                        <el-step title="设置成功"></el-step>
                    </el-steps>
                </div>
                <!--    第一步    -->
                <div v-if="stepTab === 'first'" class="formBox">
                    <!-- 邮箱注册模块 -->
                    <el-form ref="emailTab" :model="emailTab" :rules="emailRules" label-width="80px">
                        <el-form-item label="邮箱:" prop="email">
                            <el-input v-model="emailTab.email" placeholder="请输入电子邮箱" :validate-event="false"/>
                        </el-form-item>
                        <el-form-item label="验证码:" prop="checkCode">
                            <el-input
                                    v-model="emailTab.checkCode"
                                    placeholder="请输入验证码"
                                    style="width: 50%"
                                    maxlength="6"
                                    :validate-event="false"
                                    @focus="focusEmail('emailTab','checkCode')"
                            />
                            <el-button @click="sendMsgEmail" type="success" :disabled="!showEmail">
                                {{!showEmail ? countTextEmail.count + '秒后重发' : countTextEmail.click}}
                            </el-button>
                        </el-form-item>
                    </el-form>
                    <div class="nextStep">
                        <el-button @click="nextEmail" type="primary" style="width: 385px">下一步</el-button>
                    </div>
                </div>
                <!--   完善信息   -->
                <div v-if="stepTab === 'second'">
                    <!-- 完善信息模块 -->
                    <div class="formBox">
                        <div class="c66" style="font-size: 18px">请设置新密码：</div>
                        <el-form ref="newPassword" :model="newPassword" :rules="passwordRules"
                                 style="padding-top: 40px">
                            <el-form-item prop="password" style="margin-bottom: 32px">
                                <el-input v-model="newPassword.password" type="password"
                                          placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item prop="newPassword">
                                <el-input v-model="newPassword.newPassword" type="password" placeholder=" 请再次输入密码"
                                          style="padding-top: 20px"></el-input>
                            </el-form-item>
                        </el-form>
                        <div class="nextStep">
                            <el-button type="primary" style="width: 385px" @click="submit">确认重置</el-button>
                        </div>
                    </div>
                </div>
                <!--  注册完成  -->
                <div v-if="stepTab === 'third'" @click="successGo()" class="success-content">
                    <el-main class="jgyhzc-su-main">
                        <div class="main-con">
                            <div class="grid-content">
                                <div>
                                    <i class="el-icon-circle-check"></i>
                                    <h2 class="zccg">注册成功</h2>
                                    <router-link to="/">
                                        <button>返回首页</button>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </el-main>
                </div>
            </div>
            <el-footer>
                <div class="content" style=" text-align:center;">
                    Copyright © 1996-2021 版权所有:中国留学服务中心
                </div>
            </el-footer>
        </el-header>
    </el-container>
    </div>
</template>
<script>
import orgenRegisterApi from '../../api/userRegister/orgenRegisterApi'

export default {
  data() {
    //校验邮箱是否已经注册过(选择邮箱注册)
    var validateEmail = (rule, value, callback) => {
      orgenRegisterApi.orgenEmailPassCount({ hostpersionEmail: this.emailTab.email }).then(res => {
        if (res.status === 10019) {
          callback(res.message)
        } else {
          callback()
        }
      })
    }
    var valiEmail = (rule, value, callback) => {
      if (value.indexOf(' ') !== -1) {
        callback(new Error('您输入的邮箱地址含空格，请输入正确的邮箱地址'))
      } else {
        callback()
      }
    }
    var validCheckCodeEmail = (rule, value, callback) => {
      const phoneCodeParam = {
        email: this.emailTab.email,
        validateCode: this.emailTab.checkCode
      }
      orgenRegisterApi.orgenForgetValidateEmailCode(phoneCodeParam).then(res => {
        if (res.status !== 10007) {
          callback(res.message)
        } else {
          callback()
        }
      })
    }
    //校验两次输入的密码是否一致
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.newPassword.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      imgSrc: require("../../../public/lf_logo.png"),
      active: 0,
      //三个页面跳转，默认为first
      stepTab: 'first',
      //选择邮箱 找回密码
      showEmail: true,
      timerEmail: null,
      countTextEmail: {
        count: '180',
        click: ' 获取验证码 '
      },
      //邮箱注册
      emailTab: {
        email: '',
        checkCode: ''
      },
      newPassword: {
        hostpersionEmail: '',
        password: '',
        newPassword: ''
      },
      //选择邮箱验证校验
      emailRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: valiEmail, trigger: 'blur' },
          // {
          //   pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          //   message: '请输入正确的邮箱号码'
          // },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
          { validator: validateEmail, trigger: 'blur' }

        ],
        checkCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: validCheckCodeEmail, trigger: 'blur' }
        ]
      },
      //确认密码的校验
      passwordRules: {
        password: [{ required: true, message: '请创建8-18位密码，由数字、大小写字母或符号三种及以上组成', trigger: 'blur' },
          {
            // pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
            // message: '密码必须包含字母、数字，长度在8-16位'
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\\\W_!@#$%^&*`~()-+=]{8,18}$/,
            message: '请创建8-18位密码，由数字、大小写字母或符号三种及以上组成'
          }
        ],
        newPassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {

  },
  methods: {
    // 光标移出时
    focusPhone(phoneTab, checkCode) {//form名、当前值的名
      this.$refs.phoneTab.clearValidate(checkCode)
    },
    focusEmail(emailTab, checkCode) {//form名、当前值的名
      this.$refs.emailTab.clearValidate(checkCode)
    },
    // 选择邮箱方式 用于找回密码
    sendMsgEmail() {
      if (this.emailTab.email === '') {
        this.$message({
          type: 'warning',
          message: '请填写手机号/邮箱'
        })
        return false
      }
      if (!this.timerEmail) {
        const TIME_COUNT_EMAIL = 180 //更改倒计时时间
        this.countTextEmail.count = TIME_COUNT_EMAIL
        this.showEmail = false
        this.timerEmail = setInterval(() => {
          if (this.countTextEmail.count > 0 && this.countTextEmail.count <= TIME_COUNT_EMAIL) {
            this.countTextEmail.count--
          } else {
            this.showEmail = true
            clearInterval(this.timerEmail) // 清除定时器
            this.timerEmail = null
          }
        }, 1000)
      }
      orgenRegisterApi.ogenForgetSend({ hostpersionEmail: this.emailTab.email }).then(res => {
        // if (res.status === 10009) {
        //   this.$message({
        //     type: 'success',
        //     message: res.message
        //   })
        // } else {
        //   this.$message({
        //     type: 'warning',
        //     message: res.message
        //   })
        //   this.showEmail = true
        // }
      })
    },
    // 邮箱找回密码 点击下一步
    nextEmail() {
      this.$refs.emailTab.validate((valid) => {
        if (valid) {
          // console.log('邮箱注册：', this.emailTab)
          this.stepTab = 'second'
          if (this.active++ > 2) this.active = 0
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    successGo() {
      const timeCount = 3
      if (!this.timer) {
        this.count = timeCount
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= timeCount) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
            //跳转的页面写在此处
            this.$router.push({ path: '/' })
          }
        }, 1000)
      }
    },
    submit() {
      this.$refs.newPassword.validate((valid) => {
        if (valid) {
          this.newPassword.hostpersionEmail = this.emailTab.email
          orgenRegisterApi.updateOrgenEmailPassword(this.newPassword).then(res => {
            if (res.status === 10017) {
              this.$message({
                type: 'success',
                message: res.message
              })
              if (this.active++ > 2) this.active = 0
              this.stepTab = 'third'
              if (this.active++ > 2) this.active = 0
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    p{
        margin: 0;
    }
    #orgen-forgetPassword{
        width: 100%;
        height: 100%;
    .header{
        width: 100%;
        height: 120px;
        padding:0 434px;
        box-sizing: content-box;
        display: flex;
        align-items: center;
    .text{
        height: 64px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 29px;
        font-size: 22px;
        color: #0c3581;
    p:nth-child(2){
        font-size: 24px;
    span{
        color: #dc5b2f;
    }
    }
    }
    }}
    .body {
        font-size: 14px;
        background: #f5f5f5;
    }

    .title {
        border-left: solid 2px #3BA2FF;
        padding-left: 10px;
    }

    .content {
        background: white;
        width: 1000px;
        margin: 20px auto;
    }

    .stepHeader {
        text-align: center;
        margin: 0 auto;
        padding-left: 40px;
        width: 640px
    }


    .c66 {
        color: #666;
    }

    .formBox {
        width: 385px;
        margin: 35px auto 0;
    }

    .imgContent {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .success-content {
        width: 100%;
        height: 90%;
        display: table;
    }

    .success-content > div {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }

    .jgyhzc-main .list li {
        width: 238px;
        height: 136px;
        float: left;
        display: table;
        border: 1px solid rgb(238, 238, 238);
        border-radius: 10px;
        background: rgb(255, 255, 255);
        box-shadow: 0px 5px 8px 0px rgba(4, 46, 117, 0.05);
    }

    .jgyhzc-main .list li:nth-child(2) {
        margin: 0 20px;
    }

    .jgyhzc-main .list li a {
        display: table-cell;
        vertical-align: middle;
    }

    .zccg {
        color: #666666;
        font-size: 18px;
        font-weight: normal;
    }

    .jgyhzc-main .list li a h2 {
        color: #fd8764;
        font-weight: normal;
        font-size: 16px;
        text-align: center;
        padding: 0;
        margin: 0;
        padding-top: 15px;
    }

    .jgyhzc-main .list li:nth-child(2) a h2 {
        color: #63b7f7;
    }
    .jgyhzc-main .list li:nth-child(3) a h2 {
        color: #20b6ad;
    }


    .jgyhzc-main {
        /*background-color: #f5f5f5;*/
        color: #333;
        text-align: center;
        /*height: calc(100vh - 120px);*/
        /*min-height: calc(100vh - 120px);*/
    }

    .jgyhzc-su-main .main-con {
        width: 1001px;
        margin: 0 auto;
        background: #fff;
        box-shadow: 2px 0px 12px #f6f6f6;
        height: calc(100% - 20px);
        padding-top: 20px;

    }

    .jgyhzc-su-main .grid-content {
        width: 100%;
        height: 90%;
        display: table;
    }

    .jgyhzc-su-main .grid-content > div {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }

    .jgyhzc-su-main h3 {
        text-align: left;
        margin: 0;
        border-left: 3px solid #2774b5;
        padding-left: 10px;

    }

    .jgyhzc-su-main .el-icon-circle-check {
        font-size: 64px;
    }

    .jgyhzc-su-main .el-icon-circle-check:before {
        color: #52c41a;
    }

    .jgyhzc-su-main .zccg {
        color: #666666;
        font-size: 18px;
        font-weight: normal;
    }

    .jgyhzc-su-main button {
        width: 180px;
        height: 36px;
        background: #30a2ff;
        border-radius: 36px;
        border: none;
        outline: none;
        color: #ffffff;
        font-size: 16px;
        margin-top: 50px;
    }

    .nextStep {
        text-align: center;
        margin-top: 40px;
    }
</style>
