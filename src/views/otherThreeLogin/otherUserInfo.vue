<template>
  <el-container class="body">
    <el-header style="height: 90px;">
      <div id="top-wrapper" style="width: 100%;height: 90px;">
        <div id="top" style="width: 1100px;margin: 0 auto;">
          <img src="../../img/login-logo.png">
        </div>
      </div>

      <div class="content">
        <h2 class="title" style="padding-top: 10px;">完善个人信息</h2>

        <!--   完善信息   -->
        <div >
          <!-- 邮箱注册模块 -->
          <div class="formBox">
            <el-form ref="infoTab" :model="infoTab" :rules="infoRules" label-width="100px">

              <el-form-item label="姓名:" prop="userName" >
                <el-input v-model="infoTab.userName" clearable placeholder="请输入姓名" />
              </el-form-item>

<!--              <el-form-item label="昵称:" prop="nickName">-->
<!--                <el-input v-model="infoTab.nickName" clearable placeholder="请输入昵称"/>-->
<!--              </el-form-item>-->

              <el-form-item label="电话:" prop="phone" >
                <el-input v-model="infoTab.phone" placeholder="请输入手机号码" />
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
              <el-button type="primary" :disabled="isDisable" @click="infoNext">完成</el-button>
            </div>
          </div>
        </div>

        <!--  补充完成  -->
      </div>
      <el-footer>
        <div class="content">
          Copyright © 1996-2021 版权所有:中国留学服务中心
        </div>
      </el-footer>
    </el-header>
  </el-container>
</template>

<script>
import Cookies from 'js-cookie'
import Top from "../../components/login/top";
import Bottom from "../../components/login/bottom";
import { insertAlipayUser,countByPhone ,AliPayBindUserSendMsg } from '@/api/otherThreeLogin/otherThreeLogin.js'
import forgetPasswordApi from "@/api/userRegister/forgetPasswordApi";
import personalUserInfoApi from "@/api/userRegister/personalUserInfoApi";

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
    };
    //校验身份证的是否唯一
    var validateCardNo = (rule, value, callback) => {

      countByCardNo({idnumber: this.infoTab.cardNo}).then(res => {

        if (res.message != 'Success') {
          callback(new Error(res.message))
        } else {
          callback()
        }
      })
    };

    // 个人昵称唯一校验
    var validatenickName = (rule, value, callback) => {
      personalUserInfoApi.countBySomeThing({ nickName: this.infoTab.nickName }).then(res => {
        if (res.status !== 0) {
          callback(res.message)
        } else {
          callback()
        }
      })
    }
    //校验手机号是否已经注册过
    var validatePhone = (rule, value, callback) => {
      countByPhone({phone: this.infoTab.phone}).then(res => {
        if (res.message != 'Success') {
          callback(new Error('该手机号已存在，请登录后绑定支付宝'))
        } else {
          callback()
        }
      })
    };
    //校验email是否唯一
    var validateEmail = (rule, value, callback) => {
      countByEmail({email: this.infoTab.email}).then(res => {
        if (res.message != 'Success') {
          callback(new Error(res.message))
        } else {
          callback()
        }
      })
    };
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
      //国籍信息
      nationalityList: [],
      riskNameLabel: '未选择',
      stepTab: 'first',
      cardTypeList:[],
      aliyUid:'',//用户id
      count:3,//倒计时
      radio: '1',
      countText: {
        count: '180',
        click: ' 获取验证码 '
      },
      //选择手机号码 找回密码
      show: true,
      isDisable: false,//完成按钮多次提交
      infoTab: {
        nationality: '',
        userName: '',
        cardType: '',
        cardNo: '',
        phone: '',
        email: '',
        checkPass: '',
        password:'',
        personalUserLogin: "",
        emailcheckCode:"",
        phonecheckCode:""
      },
      registerLogin: {
        phoneIscheck: "",
        phone: "",
        emailIscheck: "",
        email: "",
        password: ""
      },
      infoRules: {
        nationality: [
          {required: true, message: '请选择国籍', trigger: 'change'}
        ],
        userName: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 0, max: 2000, message: '名字不应超过2000个字符！', trigger: 'blur'},
          {
            pattern: /^[^`~!@#$^&()\+=<>?:"{}|\'\[\]·~！@#￥……&（）\+={}|《》？：“”【】‘’。]+$/,
            message: '输入内容包含非法字符'
          },
          {validator: validateNull, trigger: 'blur'}
        ],
        cardType: [
          {required: true, message: '请选择证件', trigger: 'change'}
        ],
        checkCode: [
          {required: true, message: '请输入验证码', trigger: 'change'}
        ],
        cardNo: [
          {required: true, message: '请输入证件号', trigger: 'blur'},
          {
            pattern: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
            message: '请输入正确的证件号'
          },
          {validator: validateCardNo, trigger: 'blur'}
        ],
        nickName:[
          { required: true, message: '请输入个人昵称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度不能超过20', trigger: 'blur' },
          { validator: validatenickName, trigger: 'blur' }
        ],
        phone: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur'},
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码'
          },
          {validator: validatePhone, trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'},
          {validator: validateEmail, trigger: 'blur'}
        ],
        password: [
          // {required: true, message: '请输入密码', trigger: 'blur'},
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
          {required: true, validator: validatePass2, trigger: 'blur'}
        ]
      }
    }
  },
  components: {
    Top,
    Bottom,
  },
  mounted() {
    //this.aliyUid = Cookies.get("Admin-Token");
    this.aliyUid = this.$route.query.wt;

   /* let script = document.createElement("script");  //创建一个script标签
    script.type = "text/javascript";
    script.innerHTML='history.pushState(null, null, document.URL);\n' +
      '    window.addEventListener(\'popstate\', function () {\n' +
      '      history.pushState(null, null, document.URL);\n' +
      '    },false);'
    document.getElementById('app').appendChild(script)*/


  },
  /*beforeDestroy(){
    for(var x=0;x<document.getElementById('app').childNodes.length;x++){
      if(document.getElementById('app').childNodes[x].tagName=='SCRIPT'){
        document.getElementById('app').removeChild(document.getElementById('app').childNodes[x])
      }
    }
  },*/
  methods: {

    /**
     * 手机号注册 下一步
     */
    phoneNext() {
      this.$refs.phoneTab.validate((valid) => {
        if (valid) {
          // console.log('手机号注册：', this.phoneTab)
          this.stepTab = 'second'
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * 手机号注册 下一步
     */
    emailNext() {
      this.$refs.emailTab.validate((valid) => {
        if (valid) {
         // console.log('邮箱注册：', this.emailTab)
          this.stepTab = 'second'
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
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
      AliPayBindUserSendMsg(this.infoTab.phone).then(res =>{
        if(res.code === 200){
          this.$message({
            type: 'success',
            message: res.msg
          })
        }
      })
      // forgetPasswordApi.findPasswordMsg(queryParam).then(res => {
      //   if (res.status === 10009) {
      //     this.$message({
      //       type: 'success',
      //       message: res.message
      //     })
      //   } else {
      //     this.$message({
      //       type: 'warning',
      //       message: res.message
      //     })
      //     this.show = true
      //   }
      // })
    },


    /**
     * 完善信息 下一步
     */
    infoNext() {
      this.$refs['infoTab'].validate((valid) => {
        if (valid) {
          this.isDisable = true
          this.infoTab.personalUserLogin = this.registerLogin;
          this.infoTab.Alipay_ID = this.aliyUid;
          insertAlipayUser(this.infoTab).then(res => {
              this.threeGo()
            }
          ).catch(() => {
            this.isDisable = false;
          })
        } else {
          return false
        }
      })
    },

    threeGo(){
      Cookies.set('Admin-Token', this.aliyUid);
      clearInterval(this.timer);
      this.$router.push({
        path: '/'
      });
    }
  }
}
</script>

<style scoped>
.body{
  font-size: 14px;
  background: #f5f5f5;;
}
.content{
  background: white;
  width: 1000px;
  margin: 20px auto;
}
.title{
  border-left: solid 2px #3BA2FF;
  padding-left: 10px;
}
.stepTab{
  display: flex;
  justify-content: center;
}
.stepButton{
  width: 170px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #efefef;
  margin: 0 5px;
  font-weight: 500;
}
.chooseStep{
  background: #30a2ff;
  color: white;
}
.chooseType{
  display: flex;
  justify-content: center;
}
.c66{
  color: #666;
}
.stepBox{
  padding: 40px 0;
}
.formBox{
  width: 385px;
  margin: 35px auto 0;
}
.nextStep{
  text-align: center;
  margin-top: 10px;
}

</style>
