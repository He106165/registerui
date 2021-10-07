<template>
  <el-form ref="overseaSchFed" :model="overseaSchFed" :rules="overseasRules" label-width="130px">
    <el-form-item label="机构中文名称：" prop="enterpriseName">
      <el-input v-model="overseaSchFed.enterpriseName" placeholder="请输入中文名称"
                label-width="80px"/>
    </el-form-item>
    <el-form-item label="机构英文名称：" prop="englishName">
      <el-input v-model="overseaSchFed.englishName" placeholder="请输入英文名称"
                label-width="80px"/>
    </el-form-item>
    <el-form-item label="国籍国别/地区：" prop="country">
      <el-select v-model="overseaSchFed.country" clearable filterable style="width: 205px" placeholder="请选择"
                 @change="nationalityLabel(overseaSchFed.country)">
        <el-option v-for="item in nationalityList" :key="item.values" :label="item.label"
                   :value="item.values"/>
      </el-select>
    </el-form-item>
    <el-form-item label="使领馆教育处：" prop="consulateName">
      <el-select v-model="overseaSchFed.consulateName" clearable filterable style="width: 205px" placeholder="请选择"
                 @change="consulateInfoLabel(overseaSchFed.consulateName)">
        <el-option v-for="item in consulateInfoList" :key="item.values" :label="item.label"
                   :value="item.values"/>
      </el-select>
    </el-form-item>
    <el-form-item label="地址：" prop="address">
      <el-input v-model="overseaSchFed.address" placeholder="请填写详细地址" label-width="80px"/>
    </el-form-item>
    <el-form-item label="联系人姓名：" prop="hostpersionName">
      <el-input v-model="overseaSchFed.hostpersionName" placeholder="请输入联系人姓名" label-width="80px"/>
    </el-form-item>
    <el-form-item label="联系人邮箱：" prop="hostpersionEmail">
      <el-input v-model="overseaSchFed.hostpersionEmail" placeholder="请输入联系人邮箱" label-width="80px" :validate-event="false"/>
    </el-form-item>
    <el-form-item label="验证码：" prop="checkCode">
      <el-input
        v-model="overseaSchFed.checkCode"
        placeholder="请输入验证码"
        style="width: 45%"
        maxlength="6"
        :validate-event="false"
        @focus="focusEmailOrg3('overseaSchFed','checkCode')"
      />
      <el-button @click="send" type="success" :disabled="!show3">
        {{!show3 ? countText.count + '秒后重发' : countText.click}}
      </el-button>
    </el-form-item>
    <el-form-item label="联系电话" prop="hostpersionTelephone">
      <el-input v-model="overseaSchFed.hostpersionTelephone" placeholder="请输入联系方式" label-width="80px"/>
    </el-form-item>
    <el-form-item label="密码：" prop="password">
      <el-input v-model="overseaSchFed.password" type="password" placeholder="请输入密码(8-16位字符，必须由数字、字母组成)"
                label-width="80px"/>
    </el-form-item>
    <el-form-item label="确认密码：" prop="checkPassword">
      <el-input v-model="overseaSchFed.checkPassword" type="password" placeholder="请再次输入密码" label-width="80px"/>
    </el-form-item>
    <div style="margin-left: 40px;padding-bottom: 50px; text-align: center">
      <el-button type="primary" @click="stepU">上一步</el-button>
      <el-button type="primary" @click="submit">注册</el-button>
    </div>
  </el-form>
</template>

<script>
  import orgenRegisterApi from '../../api/userRegister/orgenRegisterApi'
  import personalUserInfoApi from "../../api/userRegister/personalUserInfoApi"

  const TIME_COUNT = 180; //更改倒计时时间
  export default {
    props: {
      nextObjectOne:{
        type: Function,
        default: null
      },
      stepChange:{
        type: Function,
        default: null
      }
    },
    data() {
      //机构用户 海外学联 注册 校验邮箱是否被绑定
      var orgenEmailCount1 = (rule, value, callback) => {
        orgenRegisterApi.orgenEmailCount({hostpersionEmail: this.overseaSchFed.hostpersionEmail}).then(res => {
          if (res.status !== 0) {
            callback(res.message)
            this.show3 = false
          } else {
            callback()
            this.show3 = true
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
      //验证海外学联 界面邮箱验证码
      var validateEmailCode3 = (rule, value, callback) => {
        const phoneCodeParam = {
          email: this.overseaSchFed.hostpersionEmail,
          validateCode: this.overseaSchFed.checkCode,
        }
        orgenRegisterApi.checkValidateCodeOrg3(phoneCodeParam).then(res => {
          if (res.status !== 10007) {
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
          callback(new Error('请再次输入密码'))
        } else if (value !== this.overseaSchFed.password) {
          callback(new Error('两次密码输入不一致!'))
        } else {
          callback()
        }
      }
      return {
        oegUserTpye:'',
        //国家/地区信息列表
        nationalityList: [],
        //使领馆教育处信息列表
        consulateInfoList: [],
        riskNameLabel: '未选择',
        overseaSchFed: {
          enterpriseName: '',
          englishName: '',
          country: 'CHN',
          consulateName: '03',
          address: '',
          hostpersionName: '',
          hostpersionEmail: '',
          checkCode: '',//验证码
          hostpersionTelephone: '',
          password: '',
          orgenFlag: '',
          orgenUserLogin: {
            unifiedsocialcreditcode: '',
          }
        },
        orgenUserLogin: {
          name: '', //用户名
          unifiedsocialcreditcode: '',
          password: ''
        },
        overseasRules: {
          englishName: [{required: true, message: '请输入英文名称', trigger: 'blur'}],
          enterpriseName: [{required: true, message: '请输入中文名称', trigger: 'blur'}],
          country: [
            {required: true, message: '请输入中文名称', trigger: 'change'},
          ],
          address: [{required: true, message: '请输入详细地址', trigger: 'blur'}],
          hostpersionName: [
            {required: true, message: '请输入联系人姓名', trigger: 'blur'},
            {min: 0, max: 2000, message: '联系人名字不应超过2000个字符！', trigger: 'blur'},
            {
              pattern: /^[^`~!@#$^&()\+=<>?:"{}|\'\[\]·~！@#￥……&（）\+={}|《》？：“”【】‘’。]+$/,
              message: '输入内容包含非法字符'
            },
            {validator: validateNull, trigger: 'blur'}
          ],
          hostpersionEmail: [
            {required: true, message: '请输入联系人邮箱', trigger: 'blur'},
            { validator: valiEmail, trigger: 'blur' },
            // {
            //   pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            //   message: '请输入正确的邮箱地址'
            // },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
            {validator: orgenEmailCount1, trigger: 'blur'}
            ],
          checkCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {validator: validateEmailCode3, trigger: 'blur'}
          ],
          hostpersionTelephone: [
            {required: true, message: '请输入联系方式', trigger: 'blur'},
            {max: 11, message: '请填写11位手机号码', trigger: 'blur'},
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: '请输入正确的手机号码'
            }
          ],
          password: [
            {required: true, message: '请创建8-18位密码，由数字、大小写字母或符号三种及以上组成', trigger: 'blur'},
            {
              pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\\\W_!@#$%^&*`~()-+=]{8,18}$/,
              message: '请创建8-18位密码，由数字、大小写字母或符号三种及以上组成'
            }
          ],
          checkPassword: [
            {required: true, validator: validatePassword, trigger: 'blur'},
          ]

        },
        //发送短信用到的参数
        show: true, // 初始启用按钮
        show3: true, // 初始启用按钮

        count: '', // 初始化次数
        timer: null,
        countText:{
          count: "180",
          click: "获取验证码"
        }
      }
    },
    mounted() {
      this.getNationalityList()
      this.getConsulateInfo()

    },
    methods: {
      // 光标移出时
      focusEmailOrg3(overseaSchFed,checkCode){//form名、当前值的名
        this.$refs.overseaSchFed.clearValidate(checkCode);
      },
      //返回上一步
      stepU(){
        this.stepChange()
      },
      //获取使领馆教育处信息列表
      getConsulateInfo() {
        orgenRegisterApi.queryConsulateInfo().then(res => {
          if (res.status === 0) {
            this.consulateInfoList = res.data
          } else {
            console.log(1)
          }
        })
      },
      //使领馆教育处信息
      consulateInfoLabel(prop) {
        // console.log('value是' + this.value)
        for (let i = 0; i < this.consulateInfoList.length; i++) {
          if (this.consulateInfoList[i].values === prop) {
            // console.log(this.nationalityList[i])
            this.riskNameLabel = this.consulateInfoList[i].label
          }
        }
      },
      //获取国家/地区信息
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
        this.$refs.overseaSchFed.validate((valid) => {
          if (valid) {
            const phoneCodeParam = {
              phone: this.overseaSchFed.hostpersionEmail,
              validateCode: this.overseaSchFed.checkCode
            }
            // 取消校验短信
            // personalUserInfoApi.checkValidatePhoneCode(phoneCodeParam).then(res => {
            //   if (res.status == 10007) {
            //     this.$message({
            //       type: 'success',
            //       message: res.message
            //     })
            //   } else {
            //     this.$message({
            //       type: 'warning',
            //       message: res.message
            //     })
            //   }
            // })
            this.overseaSchFed.orgenFlag = 'schUnion'
            this.overseaSchFed.oegUserTpye = '03'
            orgenRegisterApi.submit(this.overseaSchFed).then(res => {
              if (res.status === 10005) {
                this.$message({
                  type: 'success',
                  message: res.message
                })
                this.nextObjectOne(2)
              }else {
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
        if (this.overseaSchFed.hostpersionEmail === '') {
          this.$message({
            type: 'warning',
            message: '请填写手机号/邮箱'
          })
          return false;
        }
        if (!this.timer) {
          this.countText.count = TIME_COUNT;
          this.show3 = false;
          this.timer = setInterval(() => {
            if (this.countText.count > 0 && this.countText.count <= TIME_COUNT) {
              this.countText.count--;
            } else {
              this.show3 = true;
              clearInterval(this.timer); // 清除定时器
              this.timer = null;
            }
          }, 1000)
        }
        const param = {
          hostpersionEmail: this.overseaSchFed.hostpersionEmail,
          //机构注册，国内企业注册
          orgenFlag: 'schUnion'
        }
        orgenRegisterApi.ogenSend(param).then(res => {
          // if (res.status === 10009) {
          //   this.$message({
          //     type: 'success',
          //     message: res.message
          //   })
          //   this.show3 = false
          // } else {
          //   this.$message({
          //     type: 'warning',
          //     message: res.message
          //   })
          //   this.show3 = true
          // }
        })
      },
    }
  }


</script>

<style scoped>

</style>
