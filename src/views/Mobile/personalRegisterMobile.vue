<template>
  <div id="login">
    <div class="header">
      <router-link to="/loginMobile"
        ><img src="../../img/login-logo.png"
      /></router-link>
    </div>
    <div class="content">
      <div class="title">个人用户注册</div>
      <div class="stepHeader">
        <el-steps
          :space="200"
          :active="active"
          align-center
          finish-status="success"
        >
          <el-step title="手机/邮箱验证"></el-step>
          <el-step title="填写信息"></el-step>
          <el-step title="注册成功"></el-step>
        </el-steps>
      </div>
      <!--    第一步    -->
      <div v-if="stepTab === 'first'" class="stepBox">
        <div class="chooseType">
          <div class="text">请选择注册方式：</div>
          <el-radio-group v-model="radio" @change="radioChange">
            <el-radio label="1">手机号验证</el-radio>
            <el-radio label="2">邮箱验证</el-radio>
          </el-radio-group>
        </div>
        <!-- 手机号注册模块 -->
        <div v-show="radio === '1'" class="formBox">
          <el-form
            ref="phoneTab"
            :model="phoneTab"
            :rules="phoneRules"
            label-width="80px"
          >
            <el-form-item label="手机号:" prop="phone">
              <el-input
                v-model="phoneTab.phone"
                placeholder="建议使用常用手机号"
              />
            </el-form-item>
            <el-form-item label="验证码:" prop="checkCode">
              <el-input
                v-model="phoneTab.checkCode"
                placeholder="请输入验证码"
                style="width: 150px"
                maxlength="6"
                :validate-event="false"
                @focus="commonFocusPhone('phoneTab', 'checkCode')"
              />
              <el-button @click="send" type="success" :disabled="!show">
                {{ !show ? countText.count + "秒后重发" : countText.click }}
              </el-button>
            </el-form-item>
            <el-form-item prop="checked">
                <el-checkbox v-model="phoneTab.checked">我已阅读并同意<router-link to="/registerationTerms" style="color: red">&lt&lt用户注册协议&gt&gt</router-link>&nbsp和&nbsp
                  <router-link to="/authorizationUser" style="color: red">&lt&lt用户授权和隐私保护条款&gt&gt</router-link></el-checkbox>
            </el-form-item>
          </el-form>
          <div class="nextStep">
            <el-button type="primary" @click="phoneNext">下一步</el-button
            >
          </div>
        </div>
        <!-- 邮箱注册模块 -->
        <div v-show="radio === '2'" class="formBox">
          <el-form
            ref="emailTab"
            :model="emailTab"
            :rules="emailRules"
            label-width="80px"
          >
            <el-form-item label="邮箱:" prop="email">
              <el-input v-model="emailTab.email" placeholder="请输入电子邮箱" />
            </el-form-item>
            <el-form-item label="验证码:" prop="checkCode">
              <el-input
                v-model="emailTab.checkCode"
                placeholder="请输入验证码"
                maxlength="6"
                style="width: 50%"
                :validate-event="false"
                @focus="commonFocusEmail('emailTab', 'checkCode')"
              />
              <el-button @click="send" type="success" :disabled="!show">
                {{ !show ? countText.count + "秒后重发" : countText.click }}
              </el-button>
            </el-form-item>
            <el-form-item prop="checked">
              <el-checkbox v-model="emailTab.checked">我已阅读并同意<router-link to="/registerationTerms" style="color: red">&lt&lt用户注册协议&gt&gt</router-link>&nbsp和&nbsp
                <router-link to="/authorizationUser" style="color: red">&lt&lt用户授权和隐私保护条款&gt&gt</router-link></el-checkbox>
            </el-form-item>
          </el-form>
          <div class="nextStep">
            <el-button type="primary" @click="emailNext">下一步</el-button>
          </div>
        </div>
      </div>
      <!--   完善信息   -->
      <div v-if="stepTab === 'second'">
        <!-- 完善信息模块 -->
        <div class="formBox">
          <el-form
            ref="infoTab"
            :model="infoTab"
            :rules="infoRules"
            label-width="90px"
          >
            <el-form-item label="国家/地区:" prop="nationality">
              <el-select
                v-model="infoTab.nationality"
                clearable
                filterable
                style="width: 100%"
                @change="nationalityLabel(infoTab.nationality)"
              >
                <el-option
                  v-for="item in nationalityList"
                  :key="item.values"
                  :label="item.label"
                  :value="item.values"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="姓名:" prop="userName">
              <el-input
                v-model="infoTab.userName"
                clearable
                placeholder="请输入姓名"
              />
            </el-form-item>
            <el-form-item label="证件类型:" prop="cardType">
              <el-select
                v-model="infoTab.cardType"
                style="width: 100%"
                @change="rcardTypeLabel(infoTab.cardType)"
              >
                <el-option
                  v-for="item in cardTypeList"
                  :key="item.values"
                  :label="item.label"
                  :value="item.values"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="证件号:" prop="cardNo">
              <el-input v-model="infoTab.cardNo" placeholder="请输入证件号码" />
            </el-form-item>
            <el-form-item label="电话:" prop="phone">
              <el-input
                v-model="infoTab.phone"
                placeholder="请输入手机号码"
                :disabled="isAccordPhone"
              />
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
              <el-input
                v-model="infoTab.email"
                placeholder="请输入邮箱号码"
                :disabled="isAccordEmail"
              />
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input
                v-model="infoTab.password"
                type="password"
                placeholder="请输入密码"
              />
            </el-form-item>
            <el-form-item
              label="确认密码:"
              prop="checkPass"
              style="font-size:13px"
            >
              <el-input
                v-model="infoTab.checkPass"
                type="password"
                placeholder="请输入确认密码"
              />
            </el-form-item>
          </el-form>
          <div class="nextStep">
            <el-button type="primary" @click="infoNext">注册</el-button>
          </div>
        </div>
      </div>
      <!--  注册完成  -->
      <div
        v-if="stepTab === 'third'"
        @click="threeGo()"
        class="success-content"
      >
        <el-main class="jgyhzc-su-main">
          <div class="main-con">
            <div class="grid-content">
              <div>
                <i class="el-icon-circle-check"></i>
                <h2 class="zccg">注册成功</h2>
                <router-link to="/loginMobile">
                  <button>返回首页</button>
                </router-link>
              </div>
            </div>
          </div>
        </el-main>
      </div>
    </div>
    <div class="footer">
      <div class="content" style=" text-align:center;">
        Copyright © 1996-2021 版权所有:中国留学服务中心
      </div>
    </div>
  </div>
</template>

<script>
import Top from "../../components/login/top";
import Bottom from "../../components/login/bottom";
import personalUserInfoApi from "../../api/userRegister/personalUserInfoApi";

const TIME_COUNT = 180; //更改倒计时时间
export default {
  name: "Index",
  data() {
    var validCheckCodePhone = (rule, value, callback) => {
      const phoneCodeParam = {
        phone: this.phoneTab.phone,
        validateCode: this.phoneTab.checkCode
      };
      personalUserInfoApi.checkValidatePhoneCode(phoneCodeParam).then(res => {
        if (res.status !== 10007) {
          callback(res.message);
        } else {
          callback();
        }
      });
    };
    var validCheckCodeEmail = (rule, value, callback) => {
      const phoneCodeParam = {
        email: this.emailTab.email,
        validateCode: this.emailTab.checkCode
      };
      personalUserInfoApi.checkValidateEmailCode(phoneCodeParam).then(res => {
        if (res.status !== 10007) {
          callback(res.message);
        } else {
          callback();
        }
      });
    };
    //校验手机号是否已经注册过
    var validatePhone = (rule, value, callback) => {
      personalUserInfoApi
        .countByPhone({ phone: this.phoneTab.phone })
        .then(res => {
          if (res.status === 10001) {
            callback(res.message);
            this.show = false;
          } else {
            callback();
            this.show = true;
          }
        });
    };
    //校验身份证的是否唯一
    var validateCardNo = (rule, value, callback) => {
      personalUserInfoApi
        .countByCardNo({ idnumber: this.infoTab.cardNo })
        .then(res => {
          if (res.status !== 0) {
            callback(res.message);
          } else {
            callback();
          }
        });
    };
    //校验email是否唯一
    var validateEmail = (rule, value, callback) => {
      personalUserInfoApi
        .countByEmail({ email: this.emailTab.email })
        .then(res => {
          if (res.status !== 0) {
            callback(res.message);
            this.show = false;
          } else {
            callback();
            this.show = true;
          }
        });
    };

    //姓名不能为null或者空
    var validateNull = (rule, value, callback) => {
      if (value === "null" || value.indexOf(" ") !== -1) {
        callback(new Error("不能输入null、不能输入空格"));
      } else {
        callback();
      }
    };
    //校验两次输入的密码是否一致
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.infoTab.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    //邮箱注册是 判断填写的手机号是否被绑定了
    var validatePhone3 = (rule, value, callback) => {
      personalUserInfoApi
        .countByEmailPhone({ phone: this.infoTab.phone })
        .then(res => {
          if (res.status !== 0) {
            callback(res.message);
          } else {
            callback();
          }
        });
    };
    //注册手机号时 判断填写的邮箱是否被绑定了
    var validateEmail3 = (rule, value, callback) => {
      personalUserInfoApi
        .countByPhoneEmail({ email: this.infoTab.email })
        .then(res => {
          if (res.status !== 0) {
            callback(res.message);
          } else {
            callback();
          }
        });
    };

    return {
      isAccordPhone: false,
      isAccordEmail: false,
      active: 0,
      //国籍信息
      nationalityList: [],
      riskNameLabel: "未选择",
      //三个页面跳转，默认为first
      stepTab: "first",
      //手机号或者邮箱注册，默认手机号注册
      radio: "1",
      //手机号注册
      phoneTab: {
        phone: "",
        checkCode: "",
        checked : ''
      },
      //邮箱注册
      emailTab: {
        email: "",
        checkCode: "",
        checked : ''
      },
      infoTab: {
        nationality: "CHN",
        userName: "",
        cardType: "111",
        cardNo: "",
        phone: "",
        email: "",
        checkPass: "",
        password: "",
        personalUserLogin: "",
        peFlag: ""
      },
      registerLogin: {
        phoneIscheck: "",
        phone: "",
        emailIscheck: "",
        email: "",
        password: ""
      },
      phoneRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码"
          },
          { validator: validatePhone, trigger: "blur" }
        ],
        checkCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { validator: validCheckCodePhone, trigger: "blur" }
          // {min: 6, max: 6, message: '请输入正确的验证码格式', trigger: 'blur'},
        ],
        checked: [
          { required: true, message: "请勾选注册条款", trigger: "blur" }
        ]
      },
      emailRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          // {
          //   pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          //   message: "请输入正确的邮箱地址"
          // },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
          { validator: validateEmail, trigger: "blur" }

        ],
        checkCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { validator: validCheckCodeEmail, trigger: "blur" }
          // {min: 6, max: 6, message: '请输入正确的验证码格式', trigger: 'blur'},
        ],
        checked: [
          { required: true, message: "请勾选注册条款", trigger: "blur" }
        ]
      },
      infoRules: {
        nationality: [
          { required: true, message: "请选择国籍", trigger: "change" }
        ],
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 0,
            max: 2000,
            message: "名字不应超过2000个字符！",
            trigger: "blur"
          },
          {
            pattern: /^[^`~!@#$^&()\+=<>?:"{}|\'\[\]·~！@#￥……&（）\+={}|《》？：“”【】‘’。]+$/,
            message: "输入内容包含非法字符"
          },
          { validator: validateNull, trigger: "blur" }
        ],
        cardType: [
          { required: true, message: "请选择证件", trigger: "change" }
        ],
        cardNo: [
          { required: true, message: "请输入证件号", trigger: "blur" },
          {
            pattern: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
            message: "请输入正确的证件号"
          },
          { validator: validateCardNo, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码"
          },
          // {validator: validatePhone2, trigger: 'blur'},
          { validator: validatePhone3, trigger: "change" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
          // {validator: validateEmail2, trigger: 'blur'},
          { validator: validateEmail3, trigger: "change" }
        ],
        password: [
          // { required: true, message: "请输入密码", trigger: "blur" },
          // {
          //   pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
          //   message: "密码必须包含字母、数字，长度在8-16位"
          // }
          { required: true, message: '请创建8-18位密码，由数字、大小写字母或符号三种及以上组成', trigger: 'blur' },
          {
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\\\W_!@#$%^&*`~()-+=]{8,18}$/,
            message: '请创建8-18位密码，由数字、大小写字母或符号三种及以上组成'
          }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      xianshi: true,
      //发送短信用到的参数
      show: true, // 初始启用按钮
      count: "", // 初始化次数
      timer: null,
      countText: {
        count: "180",
        click: " 获取验证码 "
      }
      // emailShow:true,
      // emailCount: '',
      // emailTimer: null,
      // emailCountText: {
      //   count: '180',
      //   click: ' 获取验证码 '
      // },
    };
  },
  components: {
    Top,
    Bottom
  },
  mounted() {
    this.getNationalityList(); // 查询国籍列表信息
    this.getCardTypeList(); // 查询证件类型
  },
  methods: {
    // 光标移出时
    commonFocusPhone(phoneTab, checkCode) {
      //form名、当前值的名
      this.$refs.phoneTab.clearValidate(checkCode);
    },
    commonFocusEmail(emailTab, checkCode) {
      //form名、当前值的名
      this.$refs.emailTab.clearValidate(checkCode);
    },
    //获取
    getNationalityList() {
      personalUserInfoApi.queryNationality().then(res => {
        if (res.status === 0) {
          this.nationalityList = res.data;
        } else {
          console.log(1);
        }
      });
    },
    //国家/分区信息展示
    nationalityLabel(prop) {
      // console.log('value是' + this.value)
      for (let i = 0; i < this.nationalityList.length; i++) {
        if (this.nationalityList[i].values === prop) {
          // console.log(this.nationalityList[i])
          this.riskNameLabel = this.nationalityList[i].label;
        }
      }
    },
    //获取身份类型列表
    getCardTypeList() {
      personalUserInfoApi.queryCardType().then(res => {
        if (res.status === 0) {
          this.cardTypeList = res.data;
        } else {
          console.log(1);
        }
      });
    },
    //查询 身份类型
    rcardTypeLabel(prop) {
      // console.log('value是' + this.value)
      for (let i = 0; i < this.cardTypeList.length; i++) {
        if (this.cardTypeList[i].values === prop) {
          // console.log(this.nationalityList[i])
          this.riskNameLabel = this.cardTypeList[i].label;
        }
      }
    },
    /**
     * 手机号注册 下一步
     */
    phoneNext() {
      this.$refs.phoneTab.validate(valid => {
        if (valid) {
          // console.log("手机号注册：", this.phoneTab);
          this.stepTab = "second";
          if (this.active++ > 2) this.active = 0;
          this.isAccordPhone = true;
          this.infoTab.phone = this.phoneTab.phone;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 邮箱注册 下一步
     */
    emailNext() {
      this.$refs.emailTab.validate(valid => {
        if (valid) {
          // console.log("邮箱注册：", this.emailTab);
          this.stepTab = "second";
          if (this.active++ > 2) this.active = 0;
          this.isAccordEmail = true;
          this.infoTab.email = this.emailTab.email;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 完善信息 下一步
     */
    infoNext() {
      this.$refs["infoTab"].validate(valid => {
        if (valid) {
          // console.log("完善信息：", this.infoTab);
          if (this.phoneTab.phone !== "" && this.phoneTab.phone !== null) {
            this.infoTab.peFlag = "1";
          } else if (
            this.emailTab.email !== "" &&
            this.emailTab.email !== null
          ) {
            this.infoTab.peFlag = "2";
          }
          this.infoTab.personalUserLogin = this.registerLogin;
          personalUserInfoApi.addSave(this.infoTab).then(res => {
            if (res.status === 10005) {
              this.$message({
                type: "success",
                message: res.message
              });
              if (this.active++ > 2) this.active = 0;
              this.stepTab = "third";
              if (this.active++ > 2) this.active = 0;
            } else {
              this.$message({
                type: "warning",
                message: res.message
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 切换 注册方式的时候 清空校验
     */
    radioChange() {
      console.log("切换注册方式");
      this.$refs.phoneTab.resetFields();
      this.$refs.emailTab.resetFields();
    },

    send() {
      if (this.phoneTab.phone === "" && this.emailTab.email === "") {
        this.$message({
          type: "warning",
          message: "请填写手机号/邮箱"
        });
        return false;
      }
      if (!this.timer) {
        this.countText.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.countText.count > 0 && this.countText.count <= TIME_COUNT) {
            this.countText.count--;
          } else {
            this.show = true;
            clearInterval(this.timer); // 清除定时器
            this.timer = null;
          }
        }, 1000);
      }
      const queryParam = {
        phone: this.phoneTab.phone,
        email: this.emailTab.email
      };
      personalUserInfoApi.sendMsg(queryParam).then(res => {
        if (res.status === 10009) {
          this.$message({
            type: "success",
            message: res.message
          });
        } else {
          this.$message({
            type: "warning",
            message: "短信发送失败，请您重新发送"
          });
          this.show = true;
        }
      });
    },
    threeGo() {
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
            this.$router.push({ path: "/loginMobile" });
          }
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  padding: 0 20px;
  height: auto !important;
  min-height: 100%;
  padding-bottom: 60px;
  box-sizing: border-box;
  position: relative;
  margin: 0 auto;
  .header {
    width: 100%;
    padding: 10px 0;
    text-align: center;
  }
  .content {
    .title {
      position: relative;
      padding-left: 10px;
      font-size: 16px;
      font-weight: 700;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 2px;
        height: 100%;
        background: #3ba2ff;
      }
    }
    .stepHeader{
      margin-top: 20px;
    }
    .stepBox{
      margin-top: 20px;
      .chooseType{
        .text{
          margin: 20px 0;
        }
      }
    }
    .el-checkbox:last-of-type {
      margin-right: 0;
      margin-left: -60px;
    }
      .formBox{
        margin-top: 20px;
        /deep/.el-form-item{
          /deep/.el-button{
            width: 100px;
            padding-left: 0;
            padding-right: 0;
          }
        }
        .nextStep{
          margin-top: 30px;
          /deep/.el-button{
            width: 100%;
            height: 40px;
            font-size: 18px;
          }
        }
      }
  }
  .footer{
    text-align: center;
    position: absolute;
    bottom: 0;
    width: calc(100vw - 40px);
    padding: 10px;
    // height: 40px;
    line-height: 20px;
    color:#666;
  }
}
</style>
