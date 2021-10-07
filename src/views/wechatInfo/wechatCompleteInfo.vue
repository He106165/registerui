<template>
    <el-container class="body">
        <el-header style="height: 90px;">
            <div id="top-wrapper" style="width: 100%;height: 90px;">
                <div id="top" style="width: 1100px;margin: 0 auto;">
                    <router-link to="/"><img src="../../img/login-logo.png"></router-link>
                </div>
            </div>
            <div class="content">
                <div class="content">
                    <h2 class="title" style="padding-top: 10px;">完善个人信息</h2>
                    <!--   完善信息   -->
                    <div class="formBox">
                        <el-form ref="infoTab" :model="infoTab" :rules="infoRules" label-width="100px">

                            <el-form-item label="姓名:" prop="userName">
                                <el-input v-model="infoTab.userName" clearable placeholder="请输入姓名"/>
                            </el-form-item>

                            <el-form-item label="电话:" prop="phone">
                                <el-input v-model="infoTab.phone" placeholder="请输入手机号码"/>
                            </el-form-item>
                            <el-form-item label="验证码:" prop="checkCode">
                                <el-input
                                        v-model="infoTab.checkCode"
                                        placeholder="请输入验证码"
                                        style="width: 50%"
                                        maxlength="6"
                                        :validate-event="false"
                                />
                                <el-button @click="sendMsg" type="success" :disabled="!show">
                                    {{!show ? countText.count + '秒后重发' : countText.click}}
                                </el-button>
                            </el-form-item>

                            <el-form-item label="密码:" prop="password" style="margin-bottom: 32px">
                                <el-input v-model="infoTab.password" type="password" placeholder="请输入密码"/>
                            </el-form-item>
                            <el-form-item label="确认密码:" prop="checkPass" style="font-size:13px">
                                <el-input v-model="infoTab.checkPass" type="password" placeholder="请输入确认密码"/>
                            </el-form-item>
                        </el-form>
                        <div class="nextStep">
                            <el-button type="primary" :disabled="isDisable" @click="infoNext">提交</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <el-footer>
                <div class="content" style=" text-align:center;padding-top: 100px">
                    Copyright © 1996-2021 版权所有:中国留学服务中心
                </div>
            </el-footer>
        </el-header>
    </el-container>
</template>
<script>
import Cookies from 'js-cookie'
import { countByPhone } from '../../api/otherThreeLogin/otherThreeLogin.js'
import { completeInfo , WechatSendMsg} from '../../api/wechatComplete/wechatCompleteInfoApi'

export default {
  name: 'Index',
  data() {
    //姓名不能为null或者空
    var validateNull = (rule, value, callback) => {
      if (value === 'null' || value.indexOf(' ') !== -1) {
        callback(new Error('不能输入null、不能输入空格'))
      } else {
        callback()
      }
    }
    //校验手机号是否已经注册过
    var validatePhone = (rule, value, callback) => {
      countByPhone({ phone: this.infoTab.phone }).then(res => {
        if (res.message != 'Success') {
          callback(new Error('该手机号已存在，请登录后绑定微信'))
        } else {
          callback()
        }
      })
    }
    //校验两次输入的密码是否一致
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.infoTab.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      aliyUid: '',//用户id
      weChatUnionid: '', //跳转地址带过来 unionid
      nickName:'',//微信用户的 微信昵称
      count: 3,//倒计时
      countText: {
        count: '180',
        click: ' 获取验证码 '
      },
      //选择手机号码 找回密码
      show: true,
      isDisable: false,//完成按钮多次提交
      infoTab: {
        userName: '',
        phone: '',
        checkCode: '',
        password: '',
        checkPass: '',
        weChatUnionid: '',
        nickName:''
      },
      infoRules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 0, max: 2000, message: '名字不应超过2000个字符！', trigger: 'blur' },
          {
            pattern: /^[^`~!@#$^&()\+=<>?:"{}|\'\[\]·~！@#￥……&（）\+={}|《》？：“”【】‘’。]+$/,
            message: '输入内容包含非法字符'
          },
          { validator: validateNull, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码'
          },
          { validator: validatePhone, trigger: 'blur' }
        ],
        password: [
          // { required: true, message: '请输入密码', trigger: 'blur' },
          // {
          //   pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
          //   message: '密码必须包含字母、数字，长度在8-16位'
          // }
          { required: true, message: '请创建8-18位密码，由数字、大小写字母或符号三种及以上组成', trigger: 'blur' },
          {
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\\\W_!@#$%^&*`~()-+=]{8,18}$/,
            message: '请创建8-18位密码，由数字、大小写字母或符号三种及以上组成'
          }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    // this.aliyUid = Cookies.get('Admin-Token')
    this.weChatUnionid = this.$route.query.unionid
    // this.nickName = this.$route.query.nickName
    // console.log(this.$route.query.unionid)
    // console.log(this.$route.query.nickName)
  },

  methods: {
    //完善信息发送验证码
    sendMsg() {
      if (this.infoTab.phone === '') {
        this.$message({
          type: 'warning',
          message: '请填写手机号'
        })
        return false
      }
      if (!this.timer) {
        const TIME_COUNT = 180 //更改倒计时时间
        this.countText.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.countText.count > 0 && this.countText.count <= TIME_COUNT) {
            this.countText.count--
          } else {
            this.show = true
            clearInterval(this.timer) // 清除定时器
            this.timer = null
          }
        }, 1000)
      }
      WechatSendMsg(this.infoTab.phone).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: res.msg
          })
        }
      })
    },

    /**
     * 完善信息 下一步
     */
    infoNext() {
      this.$refs['infoTab'].validate((valid) => {
        if (valid) {

          this.isDisable = true
          // console.log(this.weChatUnionid)
          this.infoTab.weChatUnionid = this.weChatUnionid
          // this.infoTab.nickName = this.nickName
          completeInfo(this.infoTab).then(res => {
            // console.log(this.infoTab)
              this.threeGo()
            }
          ).catch(() => {
            this.isDisable = false
          })
        } else {
          return false
        }
      })
    },

    threeGo() {
      clearInterval(this.timer)
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
<style>
    .content {
        background: white;
        width: 1000px;
        margin: 20px auto;
    }

    .formBox {
        width: 385px;
        margin: 35px auto 0;
    }

    .nextStep {
        text-align: center;
        margin-top: 10px;
    }
</style>
