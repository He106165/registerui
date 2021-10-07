<template>
    <el-form ref="overseaOrgen" :model="overseaOrgen" :rules="overseasRules" label-width="300px"
             style="width: 200%; margin-left: -50%">
        <el-form-item label="Institution English Name/机构英文名称：" prop="englishName">
            <el-input v-model="overseaOrgen.englishName" placeholder=" Please select institution English Name"
                      label-width="300px"/>
        </el-form-item>
        <el-form-item label="Country/Region所属国籍国别/地区：" prop="country">
            <el-select v-model="overseaOrgen.country" clearable filterable style="width: 100%" placeholder="请选择"
                       @change="nationalityLabel(overseaOrgen.country)">
                <el-option v-for="item in nationalityList" :key="item.values" :label="item.label"
                           :value="item.values"/>
            </el-select>
        </el-form-item>
        <el-form-item label="Postal Address/地址：" prop="address">
            <el-input v-model="overseaOrgen.address" placeholder="Postal Address" label-width="80px"/>
        </el-form-item>
        <el-form-item label="Contact Name/联系人姓名：" prop="hostpersionName">
            <el-input v-model="overseaOrgen.hostpersionName" placeholder="Contact Name" label-width="80px"/>
        </el-form-item>
        <el-form-item label="Contact Email/联系人邮箱：" prop="hostpersionEmail">
            <el-input v-model="overseaOrgen.hostpersionEmail" placeholder="Contact Email" label-width="80px" :validate-event="false"/>
        </el-form-item>
        <el-form-item label="Verification Code/验证码：" prop="checkCode">
            <el-input
                    v-model="overseaOrgen.checkCode"
                    placeholder="checkCode"
                    style="width: 65%"
                    maxlength="6"
                    :validate-event="false"
                    @focus="focusEmailOrg('overseaOrgen','checkCode')"
            />
            <el-button @click="send" type="success" :disabled="!show2">
                {{!show2 ? countText.count + '秒后重发' : countText.click}}
            </el-button>
        </el-form-item>
        <el-form-item label="Contact Details/联系电话" prop="hostpersionTelephone">
            <el-input v-model="overseaOrgen.hostpersionTelephone" placeholder="legalIdnumber" label-width="80px"/>
        </el-form-item>
        <el-form-item label="Password/密码：" prop="password" style="margin-bottom: 32px">
            <el-input v-model="overseaOrgen.password" type="password" placeholder="Password" label-width="80px"/>
        </el-form-item>
        <el-form-item label="Confirm Password/确认密码：" prop="checkPassword">
            <el-input v-model="overseaOrgen.checkPassword" type="password" placeholder="Confirm Password"
                      label-width="80px"/>
        </el-form-item>
        <div style="margin-left: 40px;padding-bottom: 50px; text-align: center">
            <el-button type="primary" @click="stepU">上一步</el-button>
            <el-button type="primary" @click="submit">注册</el-button>
        </div>
    </el-form>
</template>

<script>
import orgenRegisterApi from '../../api/userRegister/orgenRegisterApi'
import personalUserInfoApi from '../../api/userRegister/personalUserInfoApi'

const TIME_COUNT = 180 //更改倒计时时间
export default {
  props: {
    nextObjectOne: {
      type: Function,
      default: null
    },
    stepChange: {
      type: Function,
      default: null
    }
  },
  data() {
    //机构用户 海外机构/院校 注册 校验邮箱是否被绑定
    var orgenEmailCount2 = (rule, value, callback) => {
      orgenRegisterApi.orgenEmailCount({ hostpersionEmail: this.overseaOrgen.hostpersionEmail }).then(res => {
        if (res.status !== 0) {
          callback('Your mailbox has been bound')
          this.show2 = false
        } else {
          callback()
          this.show2 = true
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
    //验证 国外机构界面的 邮箱验证码
    var validateEmailCode2 = (rule, value, callback) => {
      const phoneCodeParam = {
        email: this.overseaOrgen.hostpersionEmail,
        validateCode: this.overseaOrgen.checkCode
      }
      orgenRegisterApi.checkValidateCodeOrg2(phoneCodeParam).then(res => {
        if (res.status !== 10023) {
          callback(res.message)
        } else {
          callback()
        }
      })
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
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please select  password'))
      } else if (value !== this.overseaOrgen.password) {
        callback(new Error('The password input is inconsistent!'))
      } else {
        callback()
      }
    }
    return {
      oegUserTpye: '',
      nationalityList: [],
      riskNameLabel: '未选择',
      overseaOrgen: {
        englishName: '',
        country: 'CHN',
        address: '',
        hostpersionName: '',
        hostpersionEmail: '',
        checkCode: '',//验证码
        hostpersionTelephone: '',
        password: '',
        orgenFlag: '',
        orgenUserLogin: {
          unifiedsocialcreditcode: ''
        }
      },
      orgenUserLogin: {
        name: '', //用户名
        unifiedsocialcreditcode: '',
        password: ''
      },
      overseasRules: {
        englishName: [
          { required: true, message: 'Please select institution English Name', trigger: 'blur' }
        ],
        country: [
          { required: true, message: 'Please select institution English Name', trigger: 'change' }
        ],
        address: [{ required: true, message: 'Please select  englishName', trigger: 'blur' }],
        hostpersionName: [
          { required: true, message: 'Please select  englishName', trigger: 'blur' },
          { min: 0, max: 2000, message: 'Contact names should not exceed 2000 characters！', trigger: 'blur' },
          {
            pattern: /^[^`~!@#$^&()\+=<>?:"{}|\'\[\]·~！@#￥……&（）\+={}|《》？：“”【】‘’。]+$/,
            message: 'The input contains illegal characters'
          },
          { validator: validateNull, trigger: 'blur' }
        ],
        hostpersionEmail: [
          { required: true, message: 'Please select  englishName', trigger: 'blur' },
          { validator: valiEmail, trigger: 'blur' },
          // {
          //   pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          //   message: 'Please enter the correct email address'
          // },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
          { validator: orgenEmailCount2, trigger: 'blur' }

        ],
        checkCode: [
          { required: true, message: 'Please select  englishName', trigger: 'blur' },
          { validator: validateEmailCode2, trigger: 'blur' }
        ],
        hostpersionTelephone: [
          { required: true, message: 'Please select  englishName', trigger: 'blur' },
          { max: 11, message: 'Please fill in the 11-digit cell phone number', trigger: 'blur' },
          {
            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: 'Please enter the correct cell phone number'
          }
        ],
        password: [
          { required: true, message: 'Please select  englishName', trigger: 'blur' },
          {
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\\\W_!@#$%^&*`~()-+=]{8,18}$/,
            message: 'Please create an 8-18 digit password consisting of three or more digits, upper and lower case letters, or symbols'
          }
        ],
        checkPassword: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ]

      },
      //发送短信用到的参数
      show: true, // 初始启用按钮
      show2: true, // 初始启用按钮
      count: '', // 初始化次数
      timer: null,
      countText: {
        count: '180',
        click: '获取验证码'
      }
    }
  },
  mounted() {
    this.getNationalityList()

  },
  methods: {
    // 光标移出时
    focusEmailOrg(overseaOrgen, checkCode) {//form名、当前值的名
      this.$refs.overseaOrgen.clearValidate(checkCode)
    },
    //返回上一步
    stepU() {
      this.stepChange()
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
      for (let i = 0; i < this.nationalityList.length; i++) {
        if (this.nationalityList[i].values === prop) {
          // console.log(this.nationalityList[i])
          this.riskNameLabel = this.nationalityList[i].label
        }
      }
    },
    submit() {
      this.$refs.overseaOrgen.validate((valid) => {
        if (valid) {
          this.overseaOrgen.orgenFlag = 'overseas'
          this.overseaOrgen.oegUserTpye = '02'
          orgenRegisterApi.submit(this.overseaOrgen).then(res => {
            if (res.status === 10005) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.nextObjectOne(2)
            } else {
              this.$message({
                type: 'warning',
                message: res.data
              })
            }
          })
        }
      })
    },
    send() {
      if (this.overseaOrgen.hostpersionEmail === '') {
        this.$message({
          type: 'warning',
          message: '请填写手机号/邮箱'
        })
        return false
      }
      if (!this.timer) {
        this.countText.count = TIME_COUNT
        this.show2 = false
        this.timer = setInterval(() => {
          if (this.countText.count > 0 && this.countText.count <= TIME_COUNT) {
            this.countText.count--
          } else {
            this.show2 = true
            clearInterval(this.timer) // 清除定时器
            this.timer = null
          }
        }, 1000)
      }
      const param = {
        hostpersionEmail: this.overseaOrgen.hostpersionEmail,
        //机构注册，国内企业注册
        orgenFlag: 'overseas'
      }
      orgenRegisterApi.ogenSend(param).then(res => {
        // if (res.status === 10009) {
        //   this.$message({
        //     type: 'success',
        //     message: res.message
        //   })
        //   this.show2 = false
        // } else {
        //   this.$message({
        //     type: 'warning',
        //     message: res.message
        //   })
        //   this.show2 = true
        // }
      })
    }
  }
}


</script>

<style scoped>

</style>
