<template>
    <div id="orgen-register">
        <!--头部-->
        <div class="header">
            <router-link to="/"><img :src="imgSrc" class="img"/></router-link>
            <div class="text">
                <p>教育部留学服务中心</p>
                <p>统一用户身份认证系统</p>
            </div>
        </div>
  <el-container class="body">
    <el-header style="height: 90px;">
      <!--<div id="top-wrapper" style="width: 100%;height: 90px;">-->
        <!--<div id="top" style="width: 1100px;margin: 0 auto;">-->
          <!--<router-link to="/"><img src="../../img/login-logo.png"></router-link>-->
        <!--</div>-->
      <!--</div>-->
      <div class="content">
        <h1 class="title" style="">机构注册</h1>
        <div class="stepHeader">
          <el-steps :space="200" :active="active" align-center finish-status="success">
            <el-step title="选择类型"></el-step>
            <el-step title="填写信息"></el-step>
            <el-step title="注册成功"></el-step>
          </el-steps>
        </div>
      </div>
      <div align="center">
<!--      <el-row v-show="zero">-->
<!--        <el-col>-->
<!--          <el-button type="primary" @click="nextObject(1)">国内企业</el-button>-->
<!--        </el-col>-->
<!--        <el-col class="colStyle">-->
<!--          <el-button type="primary" @click="nextObject(2)">海外院校/机构</el-button>-->
<!--        </el-col>-->
<!--        <el-col class="colStyle">-->
<!--          <el-button type="primary" @click="nextObject(3)">海外学联</el-button>-->
<!--        </el-col>-->
<!--      </el-row>-->
        <el-row v-show="zero" class="jgyhzc-main">
                <ul class="list" style="padding-left: 350px;">
                  <li>
                    <a  @click="nextObject(1)">
                      <img src="../../../public/images/icon1.png" alt="" >
                      <h2>国内企业</h2>
                    </a>
                  </li>
                  <!--<li>
                    <a  @click="nextObject(2)">
                      <img src="../../../public/images/icon2.png" alt="">
                      <h2>海外院校/机构</h2>
                    </a>
                  </li>
                  <li>
                    <a  @click="nextObject(3)">
                      <img src="../../../public/images/icon3.png" alt="" >
                      <h2>海外学联</h2>
                    </a>
                  </li>-->
                </ul>
        </el-row>
      </div>
      <div v-if="Tab1 === 'first'" class="formBox">
        <el-form ref="internalFirm" :model="internalFirm" :rules="internalRules" label-width="130px">
          <el-form-item label="法人类型:" prop="permanType">
            <el-select v-model="internalFirm.permanType" filterable clearable style="width: 256px" placeholder="请选择"
                       @change="permanTypeLabel(internalFirm.permanType)"  label-width="300px">
              <el-option v-for="item in permanTypeList" :key="item.values" :label="item.label"
                         :value="item.values"/>
            </el-select>
          </el-form-item>
          <el-form-item label="法人性质:" prop="permanLine">
            <el-select v-model="internalFirm.permanLine" style="width: 256px" placeholder="请选择"
                       @change="perManLineLabel(internalFirm.permanLine)">
              <el-option v-for="item in perManLineList" :key="item.values" :label="item.label"
                         :value="item.values"/>
            </el-select>
          </el-form-item>
          <el-form-item label="企业名称:" prop="enterpriseName">
            <el-input v-model="internalFirm.enterpriseName" placeholder="请输入企业名称" />
          </el-form-item>
          <el-form-item label="社会信用码:" prop="unifiedsocialcreditcode">
            <el-input v-model="internalFirm.unifiedsocialcreditcode" placeholder="请输入统一社会信用代码" label-width="80px"/>
          </el-form-item>
          <el-form-item label="部门类型:" prop="depermentCode">
            <el-select v-model="internalFirm.depermentCode" style="width: 256px" placeholder="请选择部门类型"
                       @change="depermentCodeLabel(internalFirm.depermentCode)">
              <el-option v-for="item in depermentCodeList" :key="item.values" :label="item.label"
                         :value="item.values"/>
            </el-select>
          </el-form-item>
          <el-form-item label="法人姓名:" prop="legalName">
            <el-input v-model="internalFirm.legalName" placeholder="请输入法定代表人姓名" label-width="80px"/>
          </el-form-item>
          <el-form-item label="证件类型:" prop="legalCardType">
            <el-select v-model="internalFirm.legalCardType" style="width: 256px"
                       @change="rcardTypeLabel(internalFirm.legalCardType)">
              <el-option v-for="item in cardTypeList" :key="item.values" :label="item.label"
                         :value="item.values"/>
            </el-select>
          </el-form-item>
          <el-form-item label="法人证件号:" prop="legalIdnumber">
            <el-input v-model="internalFirm.legalIdnumber" placeholder="请输入法定代表人证件号码" label-width="80px"/>
          </el-form-item>
          <el-form-item label="联系人姓名:" prop="hostpersionName">
            <el-input v-model="internalFirm.hostpersionName" placeholder="请输入联系人姓名" label-width="80px"/>
          </el-form-item>
          <el-form-item label="联系人手机号:" prop="hostpersionTelephone">
            <el-input v-model="internalFirm.hostpersionTelephone" placeholder="请输入联系人手机号" label-width="80px"/>
          </el-form-item>

          <el-form-item label="联系人邮箱:" prop="hostpersionEmail">
            <el-input v-model="internalFirm.hostpersionEmail" placeholder="请输入联系人邮箱" label-width="80px" :validate-event="false"/>
          </el-form-item>
          <el-form-item label="验证码:" prop="checkCode">
            <el-input
              v-model="internalFirm.checkCode"
              placeholder="请输入验证码"
              style="width: 45%"
              maxlength="6"
              :validate-event="false"
              @focus="focusOrg('internalFirm','checkCode')"
            />
            <el-button @click="send" type="success" :disabled="!show1">
              {{!show1 ? countText.count + '秒后重发' : countText.click}}
            </el-button>
          </el-form-item>
          <el-form-item label="密码:" prop="password" style="margin-bottom: 32px">
            <el-input v-model="internalFirm.password" type="password" placeholder="请输入密码" label-width="80px"/>
          </el-form-item>
          <el-form-item label="确认密码:" prop="checkPassword">
            <el-input v-model="internalFirm.checkPassword" type="password" placeholder="请再次输入密码" label-width="80px"/>
          </el-form-item>
          <div style="margin-left: 40px;padding-bottom: 50px; text-align: center">
            <el-button type="primary" @click="stepChange()">上一步</el-button>
            <el-button type="primary" @click="submit">注册</el-button>
          </div>
        </el-form>
      </div>
      <div v-if="Tab1 === 'second'" class="formBox">
        <overseaOrgen :nextObjectOne="nextObjectOne" :stepChange="stepChange"/>
      </div>
      <div v-if="Tab1 === 'third'" class="formBox">
        <overseaSchFed :nextObjectOne="nextObjectOne" :stepChange="stepChange"/>
      </div>
      <div v-if="Tab1 === 'success'" @click="successGo()" class="success-content">
        <el-main class="jgyhzc-su-main">
          <div class="main-con">
            <div class="grid-content">
              <div>
                <i class="el-icon-circle-check"></i>
                <h2 class="zccg">注册成功</h2>
                <router-link to="/"><button>返回首页</button></router-link>
              </div>
            </div>
          </div>
        </el-main>
<!--        <img  src="../../img/a.jpg">-->
      </div>
<!--      <el-footer>-->
<!--        <div class="footerObject" style="text-align:center;">-->
<!--          Copyright © 1996-2021 版权所有:中国留学服务中心-->
<!--        </div>-->
<!--      </el-footer>-->
    </el-header>
  </el-container>
    </div>
</template>

<script>
  import orgenRegisterApi from '../../api/userRegister/orgenRegisterApi'
  import personalUserInfoApi from "../../api/userRegister/personalUserInfoApi"
  import overseaSchFed from './overseaSchFed'
  import overseaOrgen from './overseasOrgen'

  const TIME_COUNT = 180; //更改倒计时时间
  export default {
    components: {
      overseaSchFed,
      overseaOrgen
    },
    data() {
      // 验证 国内企业 界面 手机验证码
      var validateEmailCode1 = (rule, value, callback) => {
        const phoneCodeParam = {
          email: this.internalFirm.hostpersionEmail,
          validateCode: this.internalFirm.checkCode,
          orgenFlag:'inland'
        }
        orgenRegisterApi.checkValidateCodeOrg1(phoneCodeParam).then(res => {
          if (res.status !== 10007) {
            callback(res.message)
          } else {
            callback()
          }
        })
      }
      //机构用户 国内企业 注册 校验邮箱是否被绑定
      var orgenEmailCount = (rule, value, callback) => {
        orgenRegisterApi.orgenEmailCount({hostpersionEmail: this.internalFirm.hostpersionEmail}).then(res => {
          if (res.status !== 0) {
            callback(res.message)
            this.show1 = false
          } else {
            callback()
            this.show1 = true
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
      //校验部门类型+统一社会信用码是否唯一
      var valiIdType = (rule, value, callback) => {
        this.internalFirm.orgenUserLogin.unifiedsocialcreditcode = this.internalFirm.unifiedsocialcreditcode
        this.internalFirm.orgenUserLogin.depermentCode = this.internalFirm.depermentCode
        orgenRegisterApi.valiIdType(this.internalFirm).then(res => {
          if (res.status !== 0) {
            callback(res.message)
          } else {
            callback()
          }
        })
      }
      //校验两次输入的密码是否一致
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码'))
        } else if (value !== this.internalFirm.password) {
          callback(new Error('两次密码输入不一致!'))
        } else {
          callback()
        }
      }
      //姓名不能为null或者空
      var validateNull = (rule, value, callback) => {
        if (value === 'null' || value.indexOf(' ') !== -1) {
          callback(new Error('不能输入null、不能输入空格'))
        } else {
          callback()
        }
      }

      // 证件号码的规则校验
      var validateCardNo = (rule, value, callback) => {
        // 判断当前选择的证件类型是不是身份证
        if( this.internalFirm.cardType === '111' && !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/.test(value)){
          callback(new Error('身份证号码格式有误'))
        }else if (!value){
          callback(new Error('证件号不能为空'))
        } else{
          callback();
        }
      }
      return {
        imgSrc: require("../../../public/lf_logo.png"),
        active: 0,
        //三个页面跳转，默认为first
        Tab1: 'selectMode',
        riskNameLabel: '未选择',
        permanTypeList: [], // 法人类型
        perManLineList: [], //法人性质
        depermentCodeList: [], // 部门类型
        cardTypeList: [], // 证件类型
        radio: '1',
        value: '',
        internalFirm: {
          oegUserTpye:'', //机构用户类型
          permanType: '00',  //00
          permanLine: '',
          enterpriseName: '',
          unifiedsocialcreditcode: '',
          depermentCode: '01', //部门类型  01
          legalName: '',
          legalCardType: '111',
          legalIdnumber: '',
          hostpersionName: '',
          hostpersionTelephone: '',
          checkCode: '',//验证码
          hostpersionEmail: '',
          password: '',
          checkPassword: '',
          orgenFlag: '',
          orgenUserLogin: {
            unifiedsocialcreditcode: '',
            password: '',
            depermentCode: '',
          }
        },
        orgenUserLogin: {
          unifiedsocialcreditcode: '',
          password: '',
          depermentCode: '',
        },
        phoneTab: {
          phone: '',
          checkCode: ''
        },
        emailTab: {
          email: '',
          checkCode: ''
        },
        internalRules: {
          permanType: [{required: true, message: '请选择法人类型', trigger: 'change'}],
          permanLine: [{required: true, message: '请选择法人性质', trigger: 'change'}],
          enterpriseName: [{required: true, message: '请填写企业名称', trigger: 'blur'}],
          unifiedsocialcreditcode: [
            {required: true, message: '请输入18位或者15位合法的统一社会信用代码', trigger: 'blur'},
            {
              pattern: /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/,
              message: '请输入正确的统一社会信用代码'
            },
            {validator: valiIdType, trigger: 'blur'}
          ],
          deparType: [{required: true, message: '请选择部门类型', trigger: 'change'}],
          legalName: [
            {required: true, message: '请输入法定代表人姓名', trigger: 'blur'},
            {min: 0, max: 2000, message: '法人名字不应超过2000个字符！', trigger: 'blur'},
            {
              pattern: /^[^`~!@#$^&()\+=<>?:"{}|\'\[\]·~！@#￥……&（）\+={}|《》？：“”【】‘’。]+$/,
              message: '输入内容包含非法字符'
            },
            {validator: validateNull, trigger: 'blur'}
          ],
          legalCardType: [{required: true, message: '请选择证件类型', trigger: 'change'}],
          legalIdnumber: [{required: true, validator: validateCardNo,  trigger: 'blur'}],
          hostpersionName: [
            {required: true, message: '请输入联系人姓名', trigger: 'blur'},
            {min: 0, max: 2000, message: '联系人名字不应超过2000个字符！', trigger: 'blur'},
            {
              pattern: /^[^`~!@#$^&()\+=<>?:"{}|\'\[\]·~！@#￥……&（）\+={}|《》？：“”【】‘’。]+$/,
              message: '输入内容包含非法字符'
            },
            {validator: validateNull, trigger: 'blur'}
          ],
          hostpersionTelephone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {max: 11, message: '请填写11位手机号码', trigger: 'blur'},
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: '请输入正确的手机号码'
            }
          ],
          hostpersionEmail: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            { validator: valiEmail, trigger: 'blur' },
            // {
            //   pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            //   message: '请输入正确的邮箱地址'
            // },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
            {validator: orgenEmailCount, trigger: 'blur'}
          ],
          checkCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {validator: validateEmailCode1, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请创建8-18位密码，由数字、大小写字母或符号三种及以上组成', trigger: 'blur'},
            {
              // pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
              // message: '密码必须包含字母、数字，长度在8-16位'
              pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\\\W_!@#$%^&*`~()-+=]{8,18}$/,
              message: '请创建8-18位密码，由数字、大小写字母或符号三种及以上组成'
            }
          ],
          checkPassword: [
            {required: true, validator: validatePassword, trigger: 'blur'}
          ]
        },
        zero: true,
        //发送短信用到的参数
        show: true,
        show1: true, // 初始启用按钮
        count: '', // 初始化次数
        timer: null,
        countText: {
          count: "180",
          click: "获取验证码"
        }
      }
    },
    mounted() {
      this.getPermanTypeList() //查询法人类型
      this.getperManLineList() //查询法人性质
      this.getdepermentCodeList() // 查询部门类型
      this.getCardTypeList() // 查询证件类型
    },
    methods: {
      // 光标移出时
      focusOrg(internalFirm,checkCode){//form名、当前值的名
        this.$refs.internalFirm.clearValidate(checkCode);
      },
      // 步骤条上一步
      stepChange(){
         this.Tab1 = 'null'
        this.zero = true
        this.active = 0
        },
        //选择类型界面隐藏，完善信息界面展示，修改进度状态为进行中
        nextObject(pops) {
        if (pops === 1) {
          this.zero = false
          this.Tab1 = 'first'
          if (this.active++ > 2) this.active = 0;
        } else if (pops === 2) {
          this.zero = false
          this.Tab1 = 'second'
          if (this.active++ > 2) this.active = 0;
        } else {
          this.zero = false
          this.Tab1 = 'third'
          if (this.active++ > 2) this.active = 0;
        }
      },
      nextObjectOne(pops) {
        if (pops === 2) {
          if (this.active++ > 2) this.active = 0;
          this.Tab1 = 'success'
          if (this.active++ > 2) this.active = 0;

        } else {
          if (this.active++ > 2) this.active = 0;
          this.Tab1 = 'success'
          if (this.active++ > 2) this.active = 0;
        }
      },
      //获取法人类型
      getPermanTypeList() {
        orgenRegisterApi.queryPerManType().then(res => {
          if (res.status === 0) {
            this.permanTypeList = res.data
          } else {
            console.log(1)
          }
        })
      },
      //法人类型
      permanTypeLabel(prop) {
        // console.log('value是' + this.value)
        for (let i = 0; i < this.permanTypeList.length; i++) {
          if (this.permanTypeList[i].values === prop) {
            //  console.log(this.permanTypeList[i])
            this.riskNameLabel = this.permanTypeList[i].label
          }
        }
      },
      //获取法人性质
      getperManLineList() {
        orgenRegisterApi.queryperManLine().then(res => {
          if (res.status === 0) {
            this.perManLineList = res.data
          } else {
            console.log(1)
          }
        })
      },
      //法人性质
      perManLineLabel(prop) {
        // console.log('value是' + this.value)
        for (let i = 0; i < this.perManLineList.length; i++) {
          if (this.perManLineList[i].values === prop) {
            //  console.log(this.permanTypeList[i])
            this.riskNameLabel = this.perManLineList[i].label
          }
        }
      },
      //获取部门类型
      getdepermentCodeList() {
        orgenRegisterApi.queryDepermentCode().then(res => {
          if (res.status === 0) {
            this.depermentCodeList = res.data
          } else {
            console.log(1)
          }
        })
      },
      //部门类型
      depermentCodeLabel(prop) {
        // console.log('value是' + this.value)
        for (let i = 0; i < this.depermentCodeList.length; i++) {
          if (this.depermentCodeList[i].values === prop) {
            //  console.log(this.permanTypeList[i])
            this.riskNameLabel = this.depermentCodeList[i].label
          }
        }
      },
//获取身份类型列表
      getCardTypeList() {
        personalUserInfoApi.queryCardType().then(res => {
          if (res.status === 0) {
            this.cardTypeList = res.data
          } else {
            console.log(1)
          }
        })
      },
      //查询 身份类型
      rcardTypeLabel(prop) {
        // console.log('value是' + this.value)
        for (let i = 0; i < this.cardTypeList.length; i++) {
          if (this.cardTypeList[i].values === prop) {
            // console.log(this.nationalityList[i])
            this.riskNameLabel = this.cardTypeList[i].label
          }
        }
      },

      submit() {
        this.$refs.internalFirm.validate((valid) => {
          if (valid) {
            this.orgenUserLogin.unifiedsocialcreditcode = this.internalFirm.unifiedsocialcreditcode
            this.internalFirm.orgenFlag = 'inland'
            this.internalFirm.oegUserTpye = '00'
            orgenRegisterApi.submit(this.internalFirm).then(res => {
              if (res.status === 10005) {
                this.$message({
                  type: 'success',
                  message: res.message
                })
                if (this.active++ > 2) this.active = 0;
                this.Tab1 = 'success'
                if (this.active++ > 2) this.active = 0;
              }else {
                this.$message({
                  type: 'warning',
                  message: res.message
                })
              }

            })
          }
        })
      },
      send() {
        if (this.internalFirm.hostpersionEmail === '') {
          this.$message({
            type: 'warning',
            message: '请填写邮箱'
          })
          return false;
        }
        if (!this.timer) {
          this.countText.count = TIME_COUNT;
          this.show1 = false;
          this.timer = setInterval(() => {
            if (this.countText.count > 0 && this.countText.count <= TIME_COUNT) {
              this.countText.count--;
            } else {
              this.show1 = true;
              clearInterval(this.timer); // 清除定时器
              this.timer = null;
            }
          }, 1000)
        }
        const param = {
          hostpersionEmail: this.internalFirm.hostpersionEmail,
          //机构注册，国内企业注册
          orgenFlag: 'inland'
        }
        orgenRegisterApi.ogenSend(param).then(res => {
          if (res.status === 10009) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.show1 = false
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
            this.show1 = true
          }
        })
      },
      //清空校验信息及内容
      // radioChange() {
      //   console.log('切换注册方式')
      //   this.$refs.internalFirm.resetFields()
      //   this.$refs.overseaOrgen.$refs.overseaOrgen.clearValidate()
      // },
      threeGo() {
        const timeCount = 3;
        if (!this.timer) {
          this.count = timeCount;
          this.show1 = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= timeCount) {
              this.count--;
            } else {
              this.show1 = true;
              clearInterval(this.timer);
              this.timer = null;
              //跳转的页面写在此处
              this.$router.push({path: '/'});
            }
          }, 1000)
        }
      },
      successGo() {
        const timeCount = 3;
        if (!this.timer) {
          this.count = timeCount;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= timeCount) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
              //跳转的页面写在此处
              this.$router.push({path: '/'});
            }
          }, 1000)
        }
      }
    },
    /**
     * 切换 注册方式的时候 清空校验
     */

  }

</script>
<style lang="scss" scoped>
    p{
        margin: 0;
    }
    #orgen-register{
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
    background: white;
    height: 80%;
  }
  /*::-webkit-scrollbar-track-piece {*/
  /*  background-color:#f8f8f8;*/
  /*}*/
  /*::-webkit-scrollbar {*/
  /*  width: 0px;*/
  /*  height: 0px;*/
  /*}*/
  /*::-webkit-scrollbar-thumb {*/
  /*  background-color:#dddddd;*/
  /*  background-clip:padding-box;*/
  /*  min-height:28px;*/
  /*}*/
  /*::-webkit-scrollbar-thumb:hover {*/
  /*  background-color: #bbb;*/
  /*}*/


  .title {
    border-left: solid 2px #3BA2FF;
    padding-left: 10px;
  }

  .formBox {
    width: 385px;
    margin: 35px auto 0;
  }

  .content {
    background: white;
    width: 1000px;
    margin: 49px auto;
  }

  .stepHeader {
    text-align: center;
    margin: 0 auto;
    padding-left: 40px;
    width: 640px
  }

  .footerObject {
    margin-top: -17%;
  }


  .colStyle {
    padding-top: 20px;
  }
  .imgContent{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .jgyhzc-main {
    /*background-color: #f5f5f5;*/
    color: #333;
    text-align: center;
    /*height: calc(100vh - 120px);*/
    /*min-height: calc(100vh - 120px);*/
  }
  .jgyhzc-main .main-con {
    width: 1001px;
    margin: 0 auto;
    background: #fff;
    box-shadow: 2px 0px 12px #f6f6f6;
    height: calc(100% - 20px);
    padding-top: 20px;
  }
  .jgyhzc-main .main-con h3 {
    text-align: left;
    margin: 0;
    border-left: 3px solid #2774b5;
    padding-left: 10px;
  }
  .jgyhzc-main .register-content {

  }
  .jgyhzc-main .register-content > div{
    display: table-cell;
    vertical-align: middle;
  }
  .jgyhzc-main .list{
    height: 140px;
    margin-top: 3%;
    margin-left: 26%;
    padding: 0;
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

  .jgyhzc-main .list li{
    width: 238px;
    height: 136px;
    float: left;
    display: table;
    border: 1px solid rgb(238, 238, 238);
    border-radius: 10px;
    background: rgb(255, 255, 255);
    box-shadow: 0px 5px 8px 0px rgba(4, 46, 117, 0.05);
  }
  .jgyhzc-main .list li:nth-child(2){
    margin: 0 20px;
  }
  .jgyhzc-main .list li a{
    display: table-cell;
    vertical-align: middle;
  }

  .zccg {
    color: #666666;
    font-size: 18px;
    font-weight: normal;
  }
  .jgyhzc-main .list li a h2{
    color: #fd8764;
    font-weight: normal;
    font-size: 16px;
    text-align:center;
    padding: 0;
    margin: 0;
    padding-top: 15px;
  }
  .jgyhzc-main .list li:nth-child(2) a h2{
    color:#63b7f7;
  }

  .jgyhzc-main .list li:nth-child(3) a h2{
    color:#20b6ad;
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
</style>
