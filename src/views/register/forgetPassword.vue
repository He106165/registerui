<template>
    <div id="forget-password">
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
            <!--头部-->

            <div class="content">
                <h2 class="title" style="padding-top: 10px;">个人用户找回密码</h2>
                <div class="stepHeader">
                    <el-steps :space="200" :active="active" align-center finish-status="success">
                        <el-step title="安全验证"></el-step>
                        <el-step title="密码设置"></el-step>
                        <el-step title="设置成功"></el-step>
                    </el-steps>
                </div>
                <!--    第一步    -->
                <div v-if="stepTab === 'first'" class="stepBox">
                    <div class="chooseType">
                        <div class="c66" style="font-size: 18px">请选择安全验证方式：</div>
                        <el-radio-group v-model="radio" @change="radioChange">
                            <el-radio label="1" style="font-size: 20px">手机号码</el-radio>
                            <el-radio label="2" style="font-size: 20px">电子邮箱</el-radio>
                            <el-radio label="3" style="font-size: 20px">人工找回</el-radio>
                        </el-radio-group>
                    </div>
                    <!-- 手机号注册模块 -->
                    <div v-show="radio === '1'" class="formBox">
                        <el-form ref="phoneTab" :model="phoneTab" :rules="phoneRules" label-width="85px">
                            <el-form-item label="手机号码:" prop="phone">
                                <el-input v-model="phoneTab.phone" placeholder="建议使用常用手机号" maxlength="11"
                                          :validate-event="false"/>
                            </el-form-item>
                            <el-form-item label="验证码:" prop="checkCode">
                                <el-input
                                        v-model="phoneTab.checkCode"
                                        placeholder="请输入验证码"
                                        style="width: 50%"
                                        maxlength="6"
                                        :validate-event="false"
                                        @focus="focusPhone('phoneTab','checkCode')"
                                />
                                <el-button @click="sendMsg" type="success" :disabled="!show">
                                    {{!show ? countText.count + '秒后重发' : countText.click}}
                                </el-button>
                            </el-form-item>
                        </el-form>
                        <div class="nextStep">
                            <el-button type="primary" @click="nextPhone">下一步</el-button>
                        </div>
                    </div>
                    <!-- 邮箱注册模块 -->
                    <div v-show="radio === '2'" class="formBox">
                        <el-form ref="emailTab" :model="emailTab" :rules="emailRules" label-width="85px">
                            <el-form-item label="电子邮箱:" prop="email">
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
                            <el-button type="primary" @click="nextEmail">下一步</el-button>
                        </div>
                    </div>
                    <div v-show="radio === '3'" class="formBox">
                        <div slot="tip" style="color: red">注册手机号、邮箱已不再使用，请通过人工处理方式找回密码</div>
                        <el-form ref="artificialFind" :model="artificialFind" :rules="artificialRule"
                                 label-width="115px" style="padding-top: 20px">
                            <el-form-item label="真实姓名:" prop="userName">
                                <el-input v-model="artificialFind.userName" placeholder="请输入真实姓名"/>
                            </el-form-item>
                            <el-form-item label="国籍国别/地区:" prop="nationality">
                                <el-select v-model="artificialFind.nationality" clearable filterable
                                           style="width: 270px"
                                           @change="nationalityLabel(artificialFind.nationality)">
                                    <el-option v-for="item in nationalityList" :key="item.values" :label="item.label"
                                               :value="item.values"/>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="证件类型:" prop="cardType">
                                <el-select v-model="artificialFind.cardType" style="width: 270px"
                                           @change="rcardTypeLabel(artificialFind.cardType)" :disabled="zjLeiXing">
                                    <el-option v-for="item in cardTypeList" :key="item.values" :label="item.label"
                                               :value="item.values"/>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="证件号码:" prop="cardNo">
                                <el-input v-model="artificialFind.cardNo" placeholder="证件号码"/>
                            </el-form-item>
                            <el-form-item label="手持证件照片:" prop="fileUrl">
                                <uploadImage :value=artificialFind.fileUrl @input="toSon"/>
                            </el-form-item>
                            <el-form-item label="手机号码:" prop="mobile">
                                <el-input v-model="artificialFind.mobile"
                                          maxlength="11"
                                          placeholder="请使用国内手机号码。"
                                />
                            </el-form-item>
                            <el-form-item label="验证码:" prop="checkCodePhone">
                                <el-input v-model="artificialFind.checkCodePhone"
                                          placeholder="请输入验证码"
                                          :validate-event="false"
                                          style="width: 50%"/>
                                <el-button @click="findSendMsgByPhone" type="success" :disabled="!showByPhone">
                                    {{!showByPhone ? countTextByPhone.count + '秒后重发' : countTextByPhone.click}}
                                </el-button>
                            </el-form-item>
                            <el-form-item label="电子邮箱:" prop="email">
                                <el-input v-model="artificialFind.email" placeholder="请输入您的常用邮箱"/>
                            </el-form-item>
                            <el-form-item label="验证码:" prop="checkCodeEmail">
                                <el-input v-model="artificialFind.checkCodeEmail"
                                          placeholder="请输入验证码"
                                          :validate-event="false"
                                          style="width: 50%"/>
                                <el-button @click="findSendMsgByEmail" type="success" :disabled="!showByEmail">
                                    {{!showByEmail ? countTextByEmail.count + '秒后重发' : countTextByEmail.click}}
                                </el-button>
                            </el-form-item>
                        </el-form>
                        <div slot="tip" style="color: red">&emsp; &emsp;人工审核完成后，将通过短信和邮件方式告知审核结果。如审核通过，将为您更新账户中的手机号码和电子邮箱，您可通过手机号码或者电子邮箱验证方式正常找回密码。如审核不通过，将告知您具体原因，您可通过人工找回入口重新提交人工找回密码申请。人工找回审核会在1-5个工作日内完成，请耐心等候。</div>
                        <div class="nextStep">
                            <el-button type="primary" @click="findCommit">提交</el-button>
                        </div>
                    </div>
                </div>
                <!--   完善信息   -->
                <div v-if="stepTab === 'second'">
                    <!-- 完善信息模块 -->
                    <div class="formBox">
                        <div class="c66" style="font-size: 20px">请设置新密码：</div>
                        <el-form ref="newPassword" :model="newPassword" :rules="passwordRules"
                                 style="padding-top: 40px">
                            <el-form-item prop="password">
                                <el-input v-model="newPassword.password" type="password"
                                          placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item prop="newPassword">
                                <el-input v-model="newPassword.newPassword" type="password" placeholder=" 请再次输入密码"
                                          style="padding-top: 20px"></el-input>
                            </el-form-item>
                        </el-form>
                        <div class="nextStep">
                            <el-button type="primary" @click="submit">确认重置</el-button>
                        </div>
                    </div>
                </div>
                <el-dialog :visible.sync="dialogVisible" append-to-body>
                    <img width="100%" :src="dialogImageUrl"/>
                </el-dialog>
                <!--  注册完成  -->
                <div v-if="stepTab === 'third'" @click="successGo()" class="success-content">
                    <el-main class="jgyhzc-su-main">
                        <div class="main-con">
                            <div class="grid-content">
                                <div>
                                    <i class="el-icon-circle-check"></i>
                                    <h2 class="zccg">修改成功</h2>
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
import forgetPasswordApi from '../../api/userRegister/forgetPasswordApi'
import personalUserInfoApi from '../../api/userRegister/personalUserInfoApi'
import uploadImage from '../../views/register/UploadImage/index'

export default {
  components: { uploadImage },
  data() {
    const uploadType = (rule, value, callback) => {
      this.artificialFind.fileUrl === '' || null ? callback('请上传手持身份证照片') : callback()
    }
    //人工找回  选择手机找回 验证码验证
    var validateCodePhone = (rule, value, callback) => {
      const phoneCodeParam = {
        phone: this.phoneTab.phone,
        validateCode: this.phoneTab.checkCode
      }
      forgetPasswordApi.validatePhonePasswordCode(phoneCodeParam).then(res => {
        if (res.status !== 10007) {
          callback(res.message)
        } else {
          callback()
        }
      })
    }
    //人工找回  选择邮箱找回 验证码验证
    var validateCodeEmail = (rule, value, callback) => {
      const phoneCodeParam = {
        email: this.emailTab.email,
        validateCode: this.emailTab.checkCode
      }
      forgetPasswordApi.validateEmailPasswordCode(phoneCodeParam).then(res => {
        if (res.status !== 10007) {
          callback(res.message)
        } else {
          callback()
        }
      })
    }
    //校验手机号是否已经注册过(选择手机注册)
    var validatePhone = (rule, value, callback) => {
      forgetPasswordApi.phonePasswordCount({ phone: this.phoneTab.phone }).then(res => {
        if (res.status === 10018) {
          callback(res.message)
        } else {
          callback()
        }
      })
    }
    //校验手机号是否已经注册过(选择人工密码找回)
    var validatePhone1 = (rule, value, callback) => {
      personalUserInfoApi.countByEmailPhone({ phone: this.artificialFind.mobile }).then(res => {
        if (res.status === 10013) {
          callback('该手机号已经被绑定,请您直接登录')
        } else {
          callback()
        }
      })
    }
    //校验邮箱是否已经注册过(选择邮箱注册)
    var validateEmail = (rule, value, callback) => {
      forgetPasswordApi.emailPasswordCount({ email: this.emailTab.email }).then(res => {
        if (res.status === 10019) {
          callback(res.message)
        } else {
          callback()
        }
      })
    }
    //校验邮箱是否已经注册过(选择人工找回)
    var validateEmail1 = (rule, value, callback) => {
      personalUserInfoApi.countByPhoneEmail({ email: this.artificialFind.email }).then(res => {
        if (res.status === 10012) {
          callback('该邮箱已经被绑定,请您直接登录')
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
    //校验两次输入的密码是否一致
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.artificialFind.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    //校验两次输入的密码是否一致
    var validatePass3 = (rule, value, callback) => {
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
      //手机号或者邮箱注册，默认手机号注册
      radio: '1',
      riskNameLabel: '未选择',
      nationalityList: [],
      cardTypeList: [],
      // 上传身份证
      fileCardList: [],
      fileList: [],
      zjLeiXing: true, //证件类型显隐
      //初始化启用按钮

      //选择手机号码 找回密码
      show: true,
      timer: null,
      countText: {
        count: '180',
        click: ' 获取验证码 '
      },
      //选择邮箱 找回密码
      showEmail: true,
      timerEmail: null,
      countTextEmail: {
        count: '180',
        click: ' 获取验证码 '
      },
      //选择人工找回密码 手机号
      showByPhone: true,
      timerByPhone: null,
      countTextByPhone: {
        count: '180',
        click: ' 获取验证码 '
      },
      //选择人工找回密码 邮箱
      showByEmail: true,
      timerByEmail: null,
      countTextByEmail: {
        count: '180',
        click: ' 获取验证码 '
      },
      //手机号注册
      phoneTab: {
        phone: '',
        checkCode: ''
      },
      //邮箱注册
      emailTab: {
        email: '',
        checkCode: ''
      },
      newPassword: {
        phone: '',
        email: '',
        password: '',
        newPassword: ''
      },
      fileUrlList: [],
      artificialFind: {
        nationality: 'CHN',
        userName: '',
        cardType: '111',
        cardNo: '',
        mobile: '',
        fileUrl: '',
        checkCodePhone: '',
        email: '',
        checkCodeEmail: '',
        password: '',
        checkPass: ''
      },
      dialogVisible: false,
      dialogImageUrl: '',
      //选择手机号验证校验
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
          { validator: validateCodePhone, trigger: 'blur' }
        ]
      },
      //选择邮箱验证校验
      emailRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          // {
          //   pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          //   message: '请输入正确的邮箱号码'
          // },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
          { validator: validateEmail, trigger: 'blur' }
        ],
        checkCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: validateCodeEmail, trigger: 'blur' }
        ]
      },
      //确认密码的校验
      passwordRules: {
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
        newPassword: [
          { required: true, validator: validatePass3, trigger: 'blur' }
        ]
      },
      //选择人工找回密码校验
      artificialRule: {
        nationality: [{ required: true, message: '请选择国籍', trigger: 'change' }],
        userName: [{ required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 0, max: 2000, message: '名字不应超过2000个字符！', trigger: 'blur' },
          {
            pattern: /^[^`~!@#$^&()\+=<>?:"{}|\'\[\]·~！@#￥……&（）\+={}|《》？：“”【】‘’。]+$/,
            message: '输入内容包含非法字符'
          }],
        cardType: [{ required: true, message: '请选择证件', trigger: 'change' }],
        cardNo: [
          { required: true, message: '请输入证件号', trigger: 'blur' },
          {
            pattern: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
            message: '请输入正确的证件号'
          }],
        fileUrl: [
          { required: true, validator: uploadType, trigger: 'change' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码'
          },
          { validator: validatePhone1, trigger: 'blur' }
        ],
        checkCodePhone: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          // 输入的邮箱里边不能含有空格 和 ''
          { validator: valiEmail, trigger: 'blur' },
          // {
          //   pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          //   message: '请输入正确的邮箱地址'
          // },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
          { validator: validateEmail1, trigger: 'blur' }

        ],
        checkCodeEmail: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
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
      }
    }
  },
  computed: {
    //文件上传路径
    fileUrlAction: function() {
      // return 'http://192.168.4.198:8007/upload'
      return 'http://localhost:8006/upload'
    }
  },
  mounted() {
    this.getNationalityList()
    this.getCardTypeList()
  },
  methods: {

    // 光标移出时
    focusPhone(phoneTab, checkCode) {//form名、当前值的名
      this.$refs.phoneTab.clearValidate(checkCode)
    },
    focusEmail(emailTab, checkCode) {//form名、当前值的名
      this.$refs.emailTab.clearValidate(checkCode)
    },
    toSon(sdata) {
      this.artificialFind.fileUrl = sdata
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
      //console.log(prop)
      this.artificialFind.cardType = ''
      for (let i = 0; i < this.nationalityList.length; i++) {
        if (this.nationalityList[i].values === prop) {
          // console.log(this.nationalityList[i])
          this.riskNameLabel = this.nationalityList[i].label
        }
      }
      if (prop === 'CHN') {
        this.cardTypeList = [{ values: '111', label: '身份证' }]
        this.artificialFind.cardType = '111'
        this.zjLeiXing = true
      } else if (prop === 'HKG') {
        this.cardTypeList = [
          { values: '516', label: '港澳居民来往内地通行证' },
          { values: '906', label: '香港永久性居民身份证' }
        ]
        this.artificialFind.cardType = '516'
        this.zjLeiXing = false
      } else if (prop === 'MAC') {
        this.cardTypeList = [
          // { values: '156', label: '港澳居民来往内地居住证' },
          {
          values: '516',
          label: '港澳居民来往内地通行证'
        }, { values: '903', label: '澳门永久性居民身份证' }]
        this.artificialFind.cardType = '516'
        this.zjLeiXing = false
      } else if (prop === 'TWN') {
        this.cardTypeList = [
          // { values: '155', label: '台湾居民来往内地居住证' },
          {
          values: '511',
          label: '台湾居民来往内地通行证'
        }, { values: '907', label: '台湾居民身份证' }]
        this.artificialFind.cardType = '511'
        this.zjLeiXing = false
      } else {
        this.cardTypeList = [
          { values: '414', label: '普通护照' },
          // { values: '553', label: '外国人永久居留身份证' }
          ]
        this.artificialFind.cardType = '414'
        this.zjLeiXing = false
      }
    },
    //证件类型
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
    message() {
      if (this.infoTab.nationality === '') {
        this.$alert('请先选择国籍国别/地区', '提示')
        this.$refs.scene.blur()
      }
    },
    submit() {
      this.$refs.newPassword.validate((valid) => {
        if (valid) {
          this.newPassword.phone = this.phoneTab.phone
          this.newPassword.email = this.emailTab.email
          forgetPasswordApi.updatePassword(this.newPassword).then(res => {
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
    },
    //选择手机号用于找回密码
    sendMsg() {
      if (this.phoneTab.phone === '' && this.emailTab.email === '') {
        this.$message({
          type: 'warning',
          message: '请填写手机号/邮箱'
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
      const queryParam = {
        phone: this.phoneTab.phone,
        email: this.emailTab.email,
        msgFlag: '1'
      }
      forgetPasswordApi.findPasswordMsg(queryParam).then(res => {
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
        //   this.show = true
        // }
      })
    },
    // 选择邮箱方式 用于找回密码
    sendMsgEmail() {
      if (this.phoneTab.phone === '' && this.emailTab.email === '') {
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
      const queryParam = {
        phone: this.phoneTab.phone,
        email: this.emailTab.email,
        msgFlag: '2'
      }
      forgetPasswordApi.findPasswordMsg(queryParam).then(res => {
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
    //用于人工找回密码时候发送短信(手机号)
    findSendMsgByPhone() {
      if (this.artificialFind.mobile === '' && this.artificialFind.email === '') {
        this.$message({
          type: 'warning',
          message: '请填写手机号/邮箱'
        })
        return false
      }
      if (!this.timerByPhone) {
        const TIME_COUNT_BYPHONE = 180 //更改倒计时时间
        this.countTextByPhone.count = TIME_COUNT_BYPHONE
        this.showByPhone = false
        this.timerByPhone = setInterval(() => {
          if (this.countTextByPhone.count > 0 && this.countTextByPhone.count <= TIME_COUNT_BYPHONE) {
            this.countTextByPhone.count--
          } else {
            this.showByPhone = true
            clearInterval(this.timerByPhone) // 清除定时器
            this.timerByPhone = null
          }
        }, 1000)
      }
      const queryParam = {
        phone: this.artificialFind.mobile,
        email: this.artificialFind.email,
        msgFlag: '1'
      }
      forgetPasswordApi.artificialFindPasswordMsg(queryParam).then(res => {
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
        //     this.showByPhone = true
        //   }
      })
    },
    //用于人工找回密码时候发送短信(邮箱)
    findSendMsgByEmail() {
      if (this.artificialFind.mobile === '' && this.artificialFind.email === '') {
        this.$message({
          type: 'warning',
          message: '请填写手机号/邮箱'
        })
        return false
      }
      if (!this.timerByEmail) {
        const TIME_COUNT_BYEMAIL = 180 //更改倒计时时间
        this.countTextByEmail.count = TIME_COUNT_BYEMAIL
        this.showByEmail = false
        this.timerByEmail = setInterval(() => {
          if (this.countTextByEmail.count > 0 && this.countTextByEmail.count <= TIME_COUNT_BYEMAIL) {
            this.countTextByEmail.count--
          } else {
            this.showByEmail = true
            clearInterval(this.timerByEmail) // 清除定时器
            this.timerByEmail = null
          }
        }, 1000)
      }
      const queryParam = {
        phone: this.artificialFind.mobile,
        email: this.artificialFind.email,
        msgFlag: '2'
      }
      forgetPasswordApi.artificialFindPasswordMsg(queryParam).then(res => {
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
        //   this.showByEmail = true
        // }
      })
    },

    /**
     * 切换 注册方式的时候 清空校验
     */
    radioChange() {
      this.$refs.artificialFind.resetFields()
      this.$refs.phoneTab.resetFields()
      this.$refs.emailTab.resetFields()

    },
    //手机找回密码 点击下一步
    nextPhone() {
      this.$refs.phoneTab.validate((valid) => {
        if (valid) {
          console.log('手机号注册：', this.phoneTab)
          const phoneCodeParam = {
            phone: this.phoneTab.phone,
            validateCode: this.phoneTab.checkCode
          }
          forgetPasswordApi.validatePhonePasswordCode(phoneCodeParam).then(res => {
            if (res.status == 10007) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.stepTab = 'second'
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
    // 邮箱找回密码 点击下一步
    nextEmail() {
      this.$refs.emailTab.validate((valid) => {
        if (valid) {
          console.log('邮箱注册：', this.emailTab)
          const emailCodeParam = {
            email: this.emailTab.email,
            validateCode: this.emailTab.checkCode
          }
          forgetPasswordApi.validateEmailPasswordCode(emailCodeParam).then(res => {
            if (res.status == 10007) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.stepTab = 'second'
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
    //提交人工找回密码表单
    findCommit() {
      this.$refs.artificialFind.validate((valid) => {
        if (this.artificialFind.fileUrl === null) {
          valid = false
          this.$message({
            type: 'warning',
            message: '请选择文件'
          })
        }
        if (valid) {
          forgetPasswordApi.saveArtificialInfo(this.artificialFind).then(res => {
            if (res.status === 10017) {
              this.$message({
                type: 'success',
                message: res.message
              })
              console.log(this.active)
              if (this.active++ > 2) this.active = 0
              this.stepTab = 'third'
              if (this.active++ > 2) this.active = 0
              if (this.active++ > 2) this.active = 0
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
            }
          })
        }
      })
    },
    uploadSuccess(res, file, fileList) {
      console.log(res)
      if (res.code !== 0) {
        this.$message({
          type: 'warning',
          message: '文件上传失败'
        })
        this.fileUrlList = []
        return false
      }
      this.artificialFind.fileUrl = res.url
      console.log(this.artificialFind.fileUrl)
      if (this.artificialFind.fileUrl !== '' || this.artificialFind.fileUrl !== null) {
        this.$nextTick(() => {
          this.$refs.artificialFind.validateField('fileUrl')
        })
      }

    },
    beforeUpload(file) {
      const fileTypeList = ['jpg', 'png']
      const fileNameSuffix = file.name.split('.').pop()
      if (!fileTypeList.includes(fileNameSuffix)) {
        this.$message({
          message: '上传文件只能是 jpg、png格式!',
          type: 'warning'
        })
        return false
      }
    },
    //点击按钮进行手持身份证图片 进行上传
    handleRemove(file, fileList) {
      this.artificialFind.fileUrl = ''
      this.fileUrlList = []
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
      this.dialogImageUrl = this.artificialFind.fileUrl
      this.dialogVisible = true

      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>
<style lang="scss" scoped>
    p{
        margin: 0;
    }
    #forget-password{
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

    .chooseType {
        display: flex;
        justify-content: center;
        padding-top: 40px;
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

    .nextStep {
        text-align: center;
        margin-top: 40px;
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
</style>
