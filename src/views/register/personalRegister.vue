<template>
    <div id="user-register">
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
                <!--&lt;!&ndash;<div id="top" style="width: 1100px;margin: 0 auto;">&ndash;&gt;-->
                    <!--&lt;!&ndash;<router-link to="/"><img src="../../img/login-logo.png"></router-link>&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="header">&ndash;&gt;-->
                    <!--&lt;!&ndash;<img :src="imgSrc" class="img"/>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="text">&ndash;&gt;-->
                        <!--&lt;!&ndash;<p>教育部留学服务中心</p>&ndash;&gt;-->
                        <!--&lt;!&ndash;<p>统一用户身份认证系统</p>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--</div>-->
            <div class="content">
                <h2 class="title" style="padding-top: 10px;">个人用户注册</h2>
                <!--<div class="stepTab">-->
                <!--<div :class="['stepButton', stepTab === 'first' ? 'chooseStep' : '']">1 手机/邮箱验证</div>-->
                <!--<div :class="['stepButton', stepTab === 'second' ? 'chooseStep' : '']">2 完善信息</div>-->
                <!--<div :class="['stepButton', stepTab === 'third' ? 'chooseStep' : '']">3 注册成功</div>-->
                <!--</div>-->
                <div class="stepHeader">
                    <el-steps :space="200" :active="active" align-center finish-status="success">
                        <el-step title="手机/邮箱验证"></el-step>
                        <el-step title="填写信息"></el-step>
                        <el-step title="注册成功"></el-step>
                    </el-steps>
                </div>
                <!--    第一步    -->
                <div v-if="stepTab === 'first'" class="stepBox">
                    <div class="chooseType">
                        <div class="c66">请选择注册方式：</div>
                        <el-radio-group v-model="radio" @change="radioChange">
                            <el-radio label="1">手机号验证</el-radio>
                            <el-radio label="2">邮箱验证</el-radio>
                        </el-radio-group>
                    </div>
                    <!-- 手机号注册模块 -->
                    <div v-show="radio === '1'" class="formBox">
                        <el-form ref="phoneTab" :model="phoneTab" :rules="phoneRules" label-width="85px">

                            <el-form-item label="手机号码:" prop="phone">
                                <el-input  v-model="phoneTab.phone" placeholder="建议使用常用手机号" maxlength="11"
                                          :validate-event="false"/>
                            </el-form-item>
                            <el-form-item label="验证码:" prop="checkCode">
                                <el-input
                                        v-model="phoneTab.checkCode"
                                        placeholder="请输入验证码"
                                        style="width: 50%"
                                        maxlength="6"
                                        :validate-event="false"
                                        @focus="commonFocusPhone('phoneTab','checkCode')"
                                />
                                <el-button @click="send" type="success" :disabled="!show">
                                    {{!show ? countText.count + '秒后重发' : countText.click}}
                                </el-button>
                            </el-form-item>
                            <el-form-item prop="checked">
                                <el-checkbox v-model="phoneTab.checked" class="left">我已阅读并同意
                                    <router-link to="/registerationTerms" style="color: red">&lt&lt用户注册协议&gt&gt
                                    </router-link>
                                    &nbsp和&nbsp
                                    <router-link to="/authorizationUser" style="color: red">&lt&lt用户授权和隐私保护条款&gt&gt
                                    </router-link>
                                </el-checkbox>
                            </el-form-item>
                        </el-form>
                        <div class="nextStep">
                            <el-button type="primary" style="width: 390px" @click="phoneNext">下一步</el-button>
                        </div>
                    </div>
                    <!-- 邮箱注册模块 -->
                    <div v-show="radio === '2'" class="formBox">
                        <el-form ref="emailTab" :model="emailTab" :rules="emailRules" label-width="85px">
                            <el-form-item label="电子邮箱:" prop="email">
                                <el-input v-model="emailTab.email" placeholder="请输入电子邮箱"/>
                            </el-form-item>
                            <el-form-item label="验证码:" prop="checkCode">
                                <el-input
                                        v-model="emailTab.checkCode"
                                        placeholder="请输入验证码"
                                        maxlength="6"
                                        style="width: 50%"
                                        :validate-event="false"
                                        @focus="commonFocusEmail('emailTab','checkCode')"
                                />
                                <el-button @click="emailSend" type="success" :disabled="!emailShow">
                                    {{!emailShow ? countText.count + '秒后重发' : countText.click}}
                                </el-button>
                            </el-form-item>
                            <el-form-item prop="checked">
                                <el-checkbox v-model="emailTab.checked">我已阅读并同意
                                    <router-link to="/registerationTerms" style="color: red">&lt&lt用户注册协议&gt&gt
                                    </router-link>
                                    &nbsp和&nbsp
                                    <router-link to="/authorizationUser" style="color: red">&lt&lt用户授权和隐私保护条款&gt&gt
                                    </router-link>
                                </el-checkbox>
                            </el-form-item>
                        </el-form>

                        <div class="nextStep">
                            <el-button type="primary" style="width: 390px" @click="emailNext">下一步</el-button>
                        </div>
                    </div>
                </div>
                <!--   完善信息   -->
                <div v-if="stepTab === 'second'">
                    <div slot="tip" style="color: red;padding-top: 30px;padding-left: 70px">
                        1、办理国家公派留学人员派出手续或者预定回国机票手续请不要注册，可使用基金委录取学号为用户名直接登录。办理其他业务请先注册用户。
                    </div>
                    <div slot="tip" style="color: red;padding-top: 10px;padding-left: 70px">
                        2、如系统提示您的证件号码已经注册过用户，请通过忘密功能取回密码后登录。
                    </div>
                    <!-- 完善信息模块 -->
                    <div class="formBox">
                        <el-form ref="infoTab" :model="infoTab" :rules="infoRules" label-width="120px" >
                            <el-form-item label="真实姓名:" prop="userName">
                                <el-input v-model="infoTab.userName" @focus="focusDiv()" @blur="comeFunction()"
                                          clearable
                                          placeholder="请输入真实姓名"
                                          style="width: 78%">
                                </el-input>
                                <el-popover
                                        placement="right-start"
                                        width="160"
                                        v-model="visible"
                                        class="item"
                                        trigger="hover">
                                    <div id='ueImg' style="text-align: left; margin: 10px">
                                        <img src="../../../public/cscseImg/spz/ue1ac.png" @click="enter('ue1ac')">
                                        <img src="../../../public/cscseImg/spz/ue072.png" @click="enter('ue072')">
                                        <img src="../../../public/cscseImg/spz/ue077.png" @click="enter('ue077')">
                                        <img src="../../../public/cscseImg/spz/ue052.png" @click="enter('ue052')">
                                        <img src="../../../public/cscseImg/spz/ue08d.png" @click="enter('ue08d')">
                                        <img src="../../../public/cscseImg/spz/ue05f.png" @click="enter('ue05f')">
                                        <img src="../../../public/cscseImg/spz/ue0c4.png" @click="enter('ue0c4')">
                                        <img src="../../../public/cscseImg/spz/ue060.png" @click="enter('ue060')">
                                        <img src="../../../public/cscseImg/spz/ue058.png" @click="enter('ue058')">
                                        <img src="../../../public/cscseImg/spz/ue192.png" @click="enter('ue192')">
                                        <img src="../../../public/cscseImg/spz/ue050.png" @click="enter('ue050')">
                                        <img src="../../../public/cscseImg/spz/ue10e.png" @click="enter('ue10e')">
                                        <img src="../../../public/cscseImg/spz/ue05e.png" @click="enter('ue05e')">
                                        <img src="../../../public/cscseImg/spz/ue0a6.png" @click="enter('ue0a6')">
                                        <img src="../../../public/cscseImg/spz/ue09b.png" @click="enter('ue09b')">
                                        <img src="../../../public/cscseImg/spz/ue13c.png" @click="enter('ue13c')">
                                        <img src="../../../public/cscseImg/spz/ue059.png" @click="enter('ue059')">
                                        <img src="../../../public/cscseImg/spz/ue128.png" @click="enter('ue128')">
                                        <img src="../../../public/cscseImg/spz/ue0df.png" @click="enter('ue0df')">
                                        <img src="../../../public/cscseImg/spz/ue863.png" @click="enter('ue863')">
                                        <img src="../../../public/cscseImg/spz/ue1a3.png" @click="enter('ue1a3')">
                                    </div>
                                    <el-button slot="reference" type="text">生僻字</el-button>
                                </el-popover>
                            </el-form-item>
                            <el-form-item>
                                <div id="spzName" class="wrap">
                                    显示名字：
                                </div>
                            </el-form-item>
                            <el-form-item label="国籍国别/地区:" prop="nationality">
                                <el-select v-model="infoTab.nationality" clearable filterable style="width: 265px"
                                           @change="nationalityLabel(infoTab.nationality)">
                                    <el-option v-for="item in nationalityList" :key="item.values" :label="item.label"
                                               :value="item.values"/>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="证件类型:" prop="cardType">
                                <el-select v-model="infoTab.cardType" style="width: 265px"
                                           @change="rcardTypeLabel(infoTab.cardType)" ref="scene" :disabled="zjLeiXing">
                                    <el-option v-for="item in cardTypeList" :key="item.values" :label="item.label"
                                               :value="item.values"/>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="证件号码:" prop="cardNo">
                                <el-input v-model="infoTab.cardNo" placeholder="证件号码"/>
                            </el-form-item>
                            <el-form-item label="手机号码:" prop="phone">
                                <el-input v-model="infoTab.phone" placeholder="请使用国内手机号码。" :disabled="isAccordPhone"/>
                            </el-form-item>
                            <el-form-item label="电子邮箱:" prop="email">
                                <el-input v-model="infoTab.email" placeholder="请输入您的常用邮箱" :disabled="isAccordEmail"/>
                            </el-form-item>
                            <el-form-item label="昵称:" prop="nickName">
                                <el-input v-model="infoTab.nickName" clearable placeholder="请输入昵称"/>
                            </el-form-item>
                            <el-form-item label="设置密码:" prop="password" style="margin-bottom: 32px">
                                <el-input v-model="infoTab.password" type="password" placeholder="8-18位密码，由数字、大小写字母或符号三种及以上组成"/>
                            </el-form-item>
                            <el-form-item label="确认密码:" prop="checkPass" style="font-size:13px">
                                <el-input v-model="infoTab.checkPass" type="password" placeholder="请再次输入密码"/>
                            </el-form-item>
                        </el-form>
                        <div class="nextStep">
                            <el-button type="primary" @click="infoNext">注册</el-button>
                        </div>
                    </div>
                </div>
                <!--  注册完成  -->
                <div v-if="stepTab === 'third'" @click="threeGo()" class="success-content">
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

<script type="text/javascript" defer>
import Top from '../../components/login/top'
import Bottom from '../../components/login/bottom'
import personalUserInfoApi from '../../api/userRegister/personalUserInfoApi'
const TIME_COUNT = 180 //更改倒计时时间
export default {
  name: 'Index',
  data() {
    var validCheckCodePhone = (rule, value, callback) => {
      const phoneCodeParam = {
        phone: this.phoneTab.phone,
        validateCode: this.phoneTab.checkCode
      }
      personalUserInfoApi.checkValidatePhoneCode(phoneCodeParam).then(res => {
        if (res.status !== 10007) {
          callback(res.message)
        } else {
          callback()
        }
      })
    }
    var validCheckCodeEmail = (rule, value, callback) => {
      const phoneCodeParam = {
        email: this.emailTab.email,
        validateCode: this.emailTab.checkCode
      }
      personalUserInfoApi.checkValidateEmailCode(phoneCodeParam).then(res => {
        if (res.status !== 10007) {
          callback(res.message)
        } else {
          callback()
        }
      })
    }
    //校验手机号是否已经注册过
    var validatePhone = (rule, value, callback) => {
      personalUserInfoApi.countByPhone({ phone: this.phoneTab.phone }).then(res => {
        if (res.status === 10001) {
          callback(res.message)
          this.show = false
        } else {
          callback()
          this.show = true
        }
      })
    }
    // 证件号码的规则校验
    var validateCardNo = (rule, value, callback) => {
      debugger
      // 判断当前选择的证件类型是不是身份证
      if( this.infoTab.cardType === '111' && !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/.test(value)){
        callback(new Error('身份证号码格式有误'))
      }else if (!value){
        callback(new Error('证件号不能为空'))
      } else{
        personalUserInfoApi
          .countByCardNo({ idnumber: value })
          .then(res => {
            if (res.status !== 0) {
              callback('证件号已经存在！');
            } else {
              callback();
            }
          });
      }
    }
    //校验email是否唯一
    var validateEmail = (rule, value, callback) => {
      personalUserInfoApi.countByEmail({ email: this.emailTab.email }).then(res => {
        if (res.status !== 0) {
          callback(res.message)
          this.show = false
        } else {
          callback()
          this.show = true
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
    //姓名不能为null或者空
    var validateNull = (rule, value, callback) => {
      if (value === 'null' || value.indexOf(' ') !== -1) {
        callback(new Error('不能输入null、不能输入空格'))
      } else {
        callback()
      }
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

    //邮箱注册是 判断填写的手机号是否被绑定了
    var validatePhone3 = (rule, value, callback) => {
      personalUserInfoApi.countByEmailPhone({ phone: this.infoTab.phone }).then(res => {
        if (res.status !== 0) {
          callback(res.message)
        } else {
          callback()
        }
      })
    }
    //注册手机号时 判断填写的邮箱是否被绑定了
    var validateEmail3 = (rule, value, callback) => {
      personalUserInfoApi.countByPhoneEmail({ email: this.infoTab.email }).then(res => {
        if (res.status !== 0) {
          callback(res.message)
        } else {
          callback()
        }
      })
    }

    return {
      imgSrc: require("../../../public/lf_logo.png"),
      visible: false,
      //显示生僻字的输入框
      spzInput: false,
      chinaName: '',
      firstName: '',
      zjLeiXing: true,
      isAccordPhone: false,
      isAccordEmail: false,
      active: 0,
      //国籍信息
      nationalityList: [],
      cardTypeList: [],
      riskNameLabel: '未选择',
      //三个页面跳转，默认为first
      stepTab: 'first',
      //手机号或者邮箱注册，默认手机号注册
      radio: '1',
      //手机号注册
      phoneTab: {
        phone: '',
        checkCode: '',
        checked: ''
      },
      //邮箱注册
      emailTab: {
        email: '',
        checkCode: '',
        checked: ''
      },
      infoTab: {
        nationality: 'CHN',
        userName: '',
        cardType: '111',
        cardNo: '',
        phone: '',
        email: '',
        checkPass: '',
        password: '',
        personalUserLogin: '',
        peFlag: ''
      },
      registerLogin: {
        phoneIscheck: '',
        phone: '',
        emailIscheck: '',
        email: '',
        password: ''
      },
      phoneRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码'
          },
          { validator: validatePhone, trigger: 'blur' }
        ],
        checkCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: validCheckCodePhone, trigger: 'blur' }
          // {min: 6, max: 6, message: '请输入正确的验证码格式', trigger: 'blur'},
        ],
        checked: [
          { required: true, message: '请勾选注册条款', trigger: 'blur' }
        ]
      },
      emailRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: valiEmail, trigger: 'blur' },
          // {
          //   pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          //   message: '请输入正确的邮箱地址'
          // },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
          { validator: validateEmail, trigger: 'blur' }
        ],
        checkCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: validCheckCodeEmail, trigger: 'blur' }
          // {min: 6, max: 6, message: '请输入正确的验证码格式', trigger: 'blur'},
        ],
        checked: [
          { required: true, message: '请勾选注册条款', trigger: 'blur' }
        ]
      },
      infoRules: {
        nationality: [
          { required: true, message: '请选择国籍', trigger: 'change' }
        ],
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 0, max: 2000, message: '名字不应超过2000个字符！', trigger: 'blur' },
          {
            pattern: /^[^`~!@#$^&()\+=<>?:"{}|\'\[\]·~！@#￥……&（）\+={}|《》？：“”【】‘’。]+$/,
            message: '输入内容包含非法字符'
          },
          { validator: validateNull, trigger: 'blur' }
        ],
        cardType: [
          { required: true, message: '请选择证件', trigger: 'change' }
        ],
        cardNo: [
          { required: true, validator: validateCardNo,  trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
          {
            // pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码'
          },
          // {validator: validatePhone2, trigger: 'blur'},
          { validator: validatePhone3, trigger: 'blur' }
        ],
        // nickName: [
        //   { required: true, message: '请输入个人昵称', trigger: 'blur' },
        //   { min: 1, max: 20, message: '长度不能超过20', trigger: 'blur' },
        //   { validator: validatenickName, trigger: 'blur' }
        // ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: valiEmail, trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
          // {validator: validateEmail2, trigger: 'blur'},
          { validator: validateEmail3, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请创建8-18位密码，由数字、大小写字母或符号三种及以上组成', trigger: 'blur' },
          {
            // pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
            // message: '密码必须包含字母、数字，长度在8-16位'
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\\\W_!@#$%^&*`~()-+=]{8,18}$/,
            message: '请创建8-18位密码，由数字、大小写字母或符号三种及以上组成'
          }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      xianshi: true,
      //发送短信用到的参数
      show: true, // 初始启用按钮
      emailShow: true,
      count: '', // 初始化次数
      timer: null,
      countText: {
        count: '180',
        click: ' 获取验证码 '
      },

      haha: require('../../cscseImg/spzDel/ue1a3.png')
      // emailShow:true,
      // emailCount: '',
      // emailTimer: null,
      // emailCountText: {
      //   count: '180',
      //   click: ' 获取验证码 '
      // },
    }
  },
  components: {
    Top,
    Bottom
  },
  mounted() {
    this.getNationalityList() // 查询国籍列表信息
    this.getCardTypeList() // 查询证件类型
  },
  methods: {
    // 光标移出时
    commonFocusPhone(phoneTab, checkCode) {//form名、当前值的名
      this.$refs.phoneTab.clearValidate(checkCode)
    },
    commonFocusEmail(emailTab, checkCode) {//form名、当前值的名
      this.$refs.emailTab.clearValidate(checkCode)
    },
    //获取
    getNationalityList() {
      personalUserInfoApi.queryNationality().then(res => {
        if (res.status === 0) {
          this.nationalityList = res.data
        } else {
          console.log(1)
        }
      })
    },
    //国家/分区信息展示
    nationalityLabel(prop) {
      // console.log('value是' + this.value)
      console.log(prop)
      this.infoTab.cardType = ''
      for (let i = 0; i < this.nationalityList.length; i++) {
        if (this.nationalityList[i].values === prop) {
          // console.log(this.nationalityList[i])
          this.riskNameLabel = this.nationalityList[i].label
        }
      }
      if (prop === 'CHN') {
        this.cardTypeList = [{ values: '111', label: '身份证' }]
        this.infoTab.cardType = '111'
        this.zjLeiXing = true
      } else if (prop === 'HKG') {
        this.cardTypeList = [
          { values: '516', label: '港澳居民来往内地通行证' },
          { values: '906', label: '香港永久性居民身份证' }
          ]
        this.infoTab.cardType = '516'
        this.zjLeiXing = false
      } else if (prop === 'MAC') {
        this.cardTypeList = [
          // { values: '156', label: '港澳居民来往内地居住证' },
          {
          values: '516',
          label: '港澳居民来往内地通行证'
        }, { values: '903', label: '澳门永久性居民身份证' }]
        this.infoTab.cardType = '516'
        this.zjLeiXing = false
      } else if (prop === 'TWN') {
        this.cardTypeList = [
          // { values: '155', label: '台湾居民来往内地居住证' },
          {
          values: '511',
          label: '台湾居民来往内地通行证'
        }, { values: '907', label: '台湾居民身份证' }]
        this.infoTab.cardType = '511'
        this.zjLeiXing = false
      } else {
        this.cardTypeList = [{ values: '414', label: '普通护照' }
          // {values: '553', label: '外国人永久居留身份证' }
          ]
        this.infoTab.cardType = '414'
        this.zjLeiXing = false
      }

    },
    //获取身份类型列表
    getCardTypeList() {
      personalUserInfoApi.queryCardType().then(res => {
        if (res.status === 0) {
          this.cardTypeList = res.data
          console.log(this.cardTypeList)
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
    message() {
      if (this.infoTab.nationality === '') {
        this.$alert('请先选择国籍国别/地区', '提示')
        this.$refs.scene.blur()
      }
    },
    /**
     * 手机号注册 下一步
     */
    phoneNext() {
      this.$refs.phoneTab.validate((valid) => {
        if (valid) {
          console.log('手机号注册：', this.phoneTab)
          this.stepTab = 'second'
          if (this.active++ > 2) this.active = 0
          this.isAccordPhone = true
          this.infoTab.phone = this.phoneTab.phone
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * 邮箱注册 下一步
     */
    emailNext() {
      this.$refs.emailTab.validate((valid) => {
        if (valid) {
          console.log('邮箱注册：', this.emailTab)
          this.stepTab = 'second'
          if (this.active++ > 2) this.active = 0
          this.isAccordEmail = true
          this.infoTab.email = this.emailTab.email
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * 完善信息 下一步
     */
    infoNext() {
      this.$refs['infoTab'].validate((valid) => {
        if (valid) {
          console.log('完善信息：', this.infoTab)
          if (this.phoneTab.phone !== '' && this.phoneTab.phone !== null) {
            this.infoTab.peFlag = '1'
          } else if (this.emailTab.email !== '' && this.emailTab.email !== null) {
            this.infoTab.peFlag = '2'
          }
          this.infoTab.personalUserLogin = this.registerLogin
          personalUserInfoApi.addSave(this.infoTab).then(res => {
            if (res.status === 10005) {
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
    },
    /**
     * 切换 注册方式的时候 清空校验
     */
    radioChange() {
      console.log('切换注册方式')
      this.$refs.phoneTab.resetFields()
      this.$refs.emailTab.resetFields()
    },

    send() {
      if (this.phoneTab.phone === '' && this.emailTab.email === '') {
        this.$message({
          type: 'warning',
          message: '请填写手机号/邮箱'
        })
        return false
      }
      if (!this.timer) {
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
      const queryParam = {
        phone: this.phoneTab.phone,
        email: this.emailTab.email
      }
      personalUserInfoApi.sendMsg(queryParam).then(res => {
        // if (res.status === 10009) {
        //   this.$message({
        //     type: 'success',
        //     message: res.message
        //   })
        // } else {
        //   this.$message({
        //     type: 'warning',
        //     message: '短信发送失败，请您重新发送'
        //   })
        //   this.show = true
        // }
      })
    },
    emailSend() {
      if (this.phoneTab.phone === '' && this.emailTab.email === '') {
        this.$message({
          type: 'warning',
          message: '请填写手机号/邮箱'
        })
        return false
      }
      if (!this.timer) {
        this.countText.count = TIME_COUNT
        this.emailShow = false
        this.timer = setInterval(() => {
          if (this.countText.count > 0 && this.countText.count <= TIME_COUNT) {
            this.countText.count--
          } else {
            this.emailShow = true
            clearInterval(this.timer) // 清除定时器
            this.timer = null
          }
        }, 1000)
      }
      const queryParam = {
        phone: this.phoneTab.phone,
        email: this.emailTab.email
      }
      personalUserInfoApi.sendMsg(queryParam).then(res => {
        // if (res.status === 10009) {
        //   this.$message({
        //     type: 'success',
        //     message: res.message
        //   })
        // } else {
        //   this.$message({
        //     type: 'warning',
        //     message: '短信发送失败，请您重新发送'
        //   })
        //   this.emailShow = true
        // }
      })
    },
    threeGo() {
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
    enter(prop) {

      // debugger
      if (this.infoTab.userName === null || this.infoTab.userName === '') {
        document.getElementById('spzName').innerHTML = ''
      }
      this.infoTab.userName = this.infoTab.userName + '/' + prop
      var ul = document.getElementById('spzName')
      //添加 img
      var img = document.createElement('img')
      img.setAttribute('id', 'imgNew')
      const queryParam = {
        spz: this.infoTab.userName
      }
      personalUserInfoApi.querySpz(queryParam).then(res => {
          var spzPathList = res.data
          //转为可以遍历的对象
          for (var i = 0; i < spzPathList.length; i++) {
            img.src = spzPathList[i]
          }
        }
      )
      ul.appendChild(img)

    },
    focusDiv() {
      this.spzInput = true
    },
    comeFunction() {
      if (this.infoTab.userName !== null && this.infoTab.userName !== '') {
        //获取姓名中的中文
        this.chinaName = this.infoTab.userName
        console.info(this.chinaName)
        var result = this.chinaName.split('/')
        var newresult = []
        // var newEng = []
        console.log(result)
        //获取名字中的中文字
        for (var i = 0; i < result.length; i++) {
          newresult.push(result[i])
        }
        this.$nextTick(function() {
          //显示中文字在 div中
          var ul = document.getElementById('spzName')
          document.getElementById('spzName').innerHTML = ''
          //添加 li
          var span = document.createElement('span')
          span.setAttribute('id', 'spanNew')
          span.innerHTML = result[0]
          ul.appendChild(span)
          //显示生僻字图片在 div中
          const queryParam = {
            spz: this.infoTab.userName
          }
          personalUserInfoApi.querySpz(queryParam).then(res => {
            var spzPathList = res.data
            for (var i = 0; i < spzPathList.length; i++) {
              var img = document.createElement('img')
              img.setAttribute('id', 'imgNew')
              img.src = spzPathList[i]
              ul.appendChild(img)
            }
          })
        })
      }
    }
  }
}
</script>

<style  lang="scss" scoped>
    p{
        margin: 0;
    }
    #user-register{
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

    .content {
        background: white;
        width: 1000px;
        margin: 20px auto;
    }

    .title {
        border-left: solid 2px #3BA2FF;
        padding-left: 10px;
    }

    .stepTab {
        display: flex;
        justify-content: center;
    }

    .stepButton {
        width: 170px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #efefef;
        margin: 0 5px;
        font-weight: 500;
    }

    .chooseType {
        display: flex;
        justify-content: center;
    }

    .c66 {
        color: #666;
    }

    .el-checkbox:last-of-type {
        margin-right: 0;
        margin-left: -60px;
    }

    .stepBox {
        padding: 40px 0;
    }

    .success-content {
        width: 100%;
        height: 90%;
        display: table;
    }

    .formBox {
        width: 385px;
        margin: 35px auto 0;
    }

    .zccg {
        color: #666666;
        font-size: 18px;
        font-weight: normal;
    }

    .nextStep {
        text-align: center;
        margin-top: 10px;
    }

    .stepHeader {
        text-align: center;
        margin: 0 auto;
        padding-left: 40px;
        width: 640px
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

    .imgContent {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .item {
        margin: 4px;
    }

    .wrap {
        border-style: solid;
        border-color: #DCDFE6;
        border-width: 1px;
        text-align: center
    }

    .right {
        float: right;
        width: 60px;
    }


</style>
