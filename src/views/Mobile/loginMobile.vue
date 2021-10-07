<template>
  <div id="login_mobile">

      <!--头部-->
      <div class="top_wrapper">
        <div class="top">
          <!-- <img :src="imgSrc" /> -->
        </div>
      </div>
      <!--中间-->
      <div class="content_wrapper">
        <div class="content">
          <div class="login-bg">
            <!--用户登录-->
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="个人用户登录" name="first">
                <!--密码登录-->
                <div class="top">
                  <el-form
                    ref="formInline"
                    :model="formInline"
                    :rules="formRules"
                    class="demo-form-inline"
                    id="formInline">
                    <el-form-item prop="username">
                      <el-input
                        v-model="formInline.username"
                        placeholder="请输入用户名/身份证号/学号"
                      ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input
                        v-model="formInline.password"
                        type="password"
                        placeholder="请输入密码"
                      ></el-input>
                    </el-form-item>
                    <hvTouchs status="status" @child-event="childevent"/>
                    <div class="pwd">
                      <el-checkbox v-model="formInline.rememberMe">记住我</el-checkbox>
                      <span id="sp1"><router-link to="/forgetPasswordMobile">忘记密码</router-link></span>
                    </div>
                    <el-button
                      class="el-loginButton"
                      :loading="loading"
                      size="medium"
                      type="primary"
                      style="width: 100%"
                      @click.native.prevent="onSubmit(1)"
                    >
                      <span v-if="!loading">登 录</span>
                      <span v-else>登 录 中...</span>
                    </el-button>
                  </el-form>
                </div>
                <!--其他方式登录-->
                <div class="foot">
                  <div class="left">
<!--                    <div>其他方式登录</div>-->
<!--                    <div  @click="gotoAlipaylink"><img style="border: none" :src="imgZfb"/></div>-->
<!--                    <div ><img style="border: none" :src="imgWx" /></div>-->
                  </div>
                  <div class="right">
                    <span><router-link to="/personalRegisterMobile"><a href="#">立即注册></a></router-link></span>
                  </div>
                  <!-- <p>
                    <span>其他方式登录</span>
                    <a href="#" @click="gotoAlipaylink"><img style="border: none" :src="imgZfb"/></a>
                    <a href="#"><img style="border: none" :src="imgWx" /></a>
                    <span><router-link to="/personalRegisterMobile"><a href="#">立即注册></a></router-link></span>
                  </p> -->
                </div>
              </el-tab-pane>
              <!-- 机构用户登录 -->
              <el-tab-pane label="机构用户登录" name="second">
                <!--密码登录-->
                <div class="top">
                  <el-form
                    ref="formInline2"
                    :model="formInline2"
                    :rules="formRules2"
                    class="demo-form-inline"
                  >
                    <el-form-item prop="deptName">
                      <el-select
                        v-model="formInline2.deptName"
                        placeholder="请选择部门"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="username">
                      <el-input
                        v-model="formInline2.username2"
                        placeholder="请输入邮箱/社会信用代码"
                      ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input
                        v-model="formInline2.password2"
                        type="password"
                        placeholder="请输入密码"
                      ></el-input>
                    </el-form-item>

                    <hvTouchs status="status" @child-event="childevent"/>
                    <!--<JcRange status="status" style="margin-bottom: 10px;"></JcRange>-->
                    <!--<el-checkbox v-model="formInline2.rememberMe2">记住我</el-checkbox><span v-html="Link4" id="sp1">忘记密码</span>-->
                    <!--<el-button type="primary" @click="onSubmit">-->
                    <!--<span>登录</span>-->
                    <!--</el-button>-->
                    <el-button
                      class="el-loginButton"
                      :loading="loading"
                      size="medium"
                      type="primary"
                      style="width: 100%; margin-top: 15px"
                      @click.native.prevent="onSubmit(2)"
                    >
                      <span v-if="!loading">登 录</span>
                      <span v-else>登 录 中...</span>
                    </el-button>
                  </el-form>
                </div>
                <!--其他方式登录-->
                <div class="foot">
                  <div>
                    <span>
                      <router-link to="/orgenRegisterMobile">
                        <a href="#" style="text-decoration: none; color: #30a2ff">立即注册></a>
                      </router-link>
                    </span>
                  </div>
                  <div>
                    <span>
                      <router-link to="/orgenForgetPasswordMobile">
                        <a href="#" style="text-decoration: none; color: #30a2ff">忘记密码></a>
                      </router-link>
                    </span>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    <!--版权信息-->
    <div class="footer">
      <!--<span v-html="Link1"></span>-->
      <!--<span v-text="Line"></span>-->
      <!--<span v-html="Link2"></span>-->
      <!--<span v-text="Line"></span>-->
      <!--<span v-html="Link3"></span>-->
      <p v-text="fooTer" style="text-align: center"></p>
    </div>
  </div>
</template>




<script>
import JcRange from "@/components/login/JcRange.vue";
import hvTouchs from "@/components/login/hvTouchs.vue";
import { proLogin } from "@/api/login/proLogin";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
export default {
  components: {
    JcRange,
    hvTouchs
  },
  data() {
    return {
      imgSrc: require("../../../public/login-logo.png"),
      imgSrc1: require("../../../public/button.png"),
      imgZfb: require("../../../public/zhifubao.png"),
      imgWx: require("../../../public/weixin.png"),
      imgLy: require("../../../public/lingyin.png"),
      Line: "|",
      Link1: "<a href='http://baidu.com'>帮助</a>",
      Link2: "<a href='http://baidu.com'>隐私</a>",
      Link3: "<a href='http://baidu.com'>条款</a>",
      Link4: "<a href='http://baidu.com'>忘记密码</a>",
      fooTer: "Copyright © 1996-2021  版权所有:中国留学服务中心",
      activeName: "first",
      Name1: "向右滑动完成验证",
      formInline: {
        username: "",
        password: "",
        rememberMe: false,
        userType: "",
      },
      formInline2: {
        username2: "",
        password2: "",
        rememberMe2: false,
        userType: "",
        deptName: "",
      },
      formRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
      },
      formRules2: {
        username2: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
        ],
        password2: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
        deptName2: [
          { required: true, trigger: "change", message: "请选择部门" },
        ],
      },
      loading: false,
      redirect: undefined,
      options: [
        {
          value: "01",
          label: "人力资源相关业务部门",
        },
      ],
      pro_code: "", //个人拖动验证
      org_code: "", //机构拖动验证
    };
  },
  created() {
    this.getCookie();
    this.formInline2.deptName = this.options[0].value;
    //url地址栏中的体统唯一标识
    // 判断系统唯一标识、 回跳地址是否存在。
    if (this.$route.query.joinsysCode != null) {
      Cookies.set("joinsysCode", this.$route.query.joinsysCode);
    }
    if (this.$route.query.lookBackAddr != null) {
      Cookies.set(
        "lookBackAddr",
        this.$route.fullPath.substr(
          this.$route.fullPath.indexOf("lookBackAddr") +
            "lookBackAddr".length +
            1,
          this.$route.fullPath.length
        )
      );
    }
  },
  mounted() {
    var username = document.cookie;
    // console.log(username);
  },
  methods: {
    handleClick(tab, event) {},
    onSubmit(type) {
      this.formInline.userType = type;
      this.formInline2.userType = type;
      this.formInline.joinsysCode = Cookies.get("joinsysCode");
      this.formInline2.joinsysCode = Cookies.get("joinsysCode");
      if (type == 1) {
        //个人登陆时校验滑块
        if (this.pro_code == false) {
          this.$message.error("请拖动滑动验证");
          return false;
        }

        this.$refs.formInline.validate((valid) => {
          if (valid) {
            this.loading = true;
            if (this.formInline.rememberMe) {
              Cookies.set("username", this.formInline.username, {
                expires: 30,
              });
              Cookies.set("password", encrypt(this.formInline.password), {
                expires: 30,
              });
              Cookies.set("rememberMe", this.formInline.rememberMe, {
                expires: 30,
              });
            } else {
              Cookies.remove("username");
              Cookies.remove("password");
              Cookies.remove("rememberMe");
            }
            //个人用户登陆
            this.$store
              .dispatch("proLogin", this.formInline)
              .then((res) => {
                //如果cookie中有寸回跳地址
                if (Cookies.get("lookBackAddr") != null) {
                  var url = decodeURIComponent(Cookies.get("lookBackAddr"));
                  let newurl = url.concat(
                    url.indexOf("?") != -1
                      ? "&token=" + res.token
                      : "?token=" + res.token
                  );
                  window.location.href = newurl;
                } else if (res.systemRetUrl != null) {
                  //判断有没有返回路径，没有就跳转系统首页
                  window.location.href =
                    res.systemRetUrl + "?token=" + res.token;
                  //this.redirectToSystem(res.systemRetUrl,res.token);
                } else {
                  this.$router.push({ path: "/" });
                }
              })
              .catch(() => {
                this.loading = false;
                //todo
                //滑动验证收回去
              });
          }
        });
      } else if (type == 2) {
        if (this.org_code == false) {
          this.$message.error("请拖动滑动验证");
          return false;
        }
        this.$refs.formInline2.validate((valid) => {
          if (valid) {
            this.loading = true;
            if (this.formInline2.rememberMe2) {
              Cookies.set("username2", this.formInline2.username2, {
                expires: 30,
              });
              Cookies.set("password2", encrypt(this.formInline2.password2), {
                expires: 30,
              });
              Cookies.set("rememberMe2", this.formInline2.rememberMe2, {
                expires: 30,
              });
            } else {
              Cookies.remove("username2");
              Cookies.remove("password2");
              Cookies.remove("rememberMe2");
            }
            this.$store
              .dispatch("OrgLogin", this.formInline2)
              .then((res) => {
                //如果cookie中有存回跳地址
                if (Cookies.get("lookBackAddr") != null) {
                  var url = decodeURIComponent(Cookies.get("lookBackAddr"));
                  let newurl = url.concat(
                    url.indexOf("?") != -1
                      ? "&token=" + res.token
                      : "?token=" + res.token
                  );
                  window.location.href = newurl;
                } else if (res.systemRetUrl != null) {
                  //判断有没有返回路径，没有就跳转系统首页
                  window.location.href =
                    res.systemRetUrl + "?token=" + res.token;
                } else {
                  this.$router.push({ path: "/" });
                }
              })
              .catch(() => {
                this.loading = false;
                //todo
                //滑动验证收回去
              });
          }
        });
      }
    },
    redirectToSystem(url, token) {
      //       document.cookie="testCookie=test"+";path=/;domain=.mail.censoft.com.cn"
      //       alert(123123);
      // return false
      //      url='http://localhost:8081/user/login'
      var temp_form = document.createElement("form");
      temp_form.action = url;
      //如需打开新窗口，form的target属性要设置为'_blank'
      temp_form.method = "get";
      temp_form.style.display = "none";
      //添加参数
      var opt = document.createElement("input");
      opt.name = "token";
      opt.value = token;
      temp_form.appendChild(opt);
      document.body.appendChild(temp_form);
      //提交数据
      temp_form.requestHeaders = { token: token };
      // console.info(temp_form);
      temp_form.submit();
    },
    getCookie() {
      //个人 /机构登陆的记住我
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.formInline = {
        username: username === undefined ? this.formInline.username : username,
        password:
          password === undefined ? this.formInline.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };

      const username2 = Cookies.get("username2");
      const password2 = Cookies.get("password2");
      const rememberMe2 = Cookies.get("rememberMe2");
      this.formInline2 = {
        username2:
          username2 === undefined ? this.formInline.username2 : username2,
        password2:
          password2 === undefined
            ? this.formInline.password2
            : decrypt(password2),
        rememberMe2: rememberMe2 === undefined ? false : Boolean(rememberMe2),
      };
    },
    childevent(e) {
      this.pro_code = e;
    },
    orgevent(e) {
      this.org_code = e;
    },
    gotoAlipaylink() {
      //点击跳转至上次页面
      //this.$router.go(-1)
      //指定跳转地址
      //window.location.href="https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2021001194602100&scope=auth_user&redirect_uri=http%3A%2F%2F192.168.11.216%3A9527%2Fotherlogin%2Finfo%2FAlipayLogin";
      window.location.href =
        "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2021002116661993&scope=auth_user&redirect_uri=http%3A%2F%2Flxyzt.cscse.edu.cn%2Fapi%2Fotherlogin%2Finfo%2FAlipayLogin";
      //window.location.href="https%3A%2F%2Fopenauth.alipay.com%2Foauth2%2FpublicAppAuthorize.htm%3Fapp_id%3D2021001194602100%26scope%3Dauth_user%26redirect_uri%3Dhttp%3A%2F%2Fregistermanage.censoft.com.cn%2Fotherlogin%2Finfo%2FAlipayLogin";
      // window.open("https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2021001194602100&scope=auth_user&redirect_uri=http%3A%2F%2F192.168.11.216%3A9527%2Fotherlogin%2Finfo%2FAlipayLogin","_blank");
      //this.$router.push({ path: "www.baidu.com"})
      /*const icardUrl = this.$router.resolve({
        path: 'www.baidu.com',
      })
      window.open(icardUrl.href, '_blank')*/
    },
  },
};
</script>

<style lang="scss" scoped>
#login_mobile {
  // padding: 0 20px;
  width: 100vw;
  min-height: 100%;
  .main{
    height:auto;
    position:relative;

  }
  .top_wrapper {
    width: 100%;
    height: 80px;
    background: url(../../../public/login_bg.png) no-repeat 26% 40%;
    background-size: cover;
    height: 340px;
    position: relative;
    img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .content_wrapper {
    width: 100%;
    height: 400px;
    overflow: auto;
    // padding: 0 20px;
    // background: #fff;
    // box-shadow:5px 5px 5px #93b7d8,5px -5px 5px #93b7d8,-5px 5px 5px #93b7d8,-5px -5px 5px #93b7d8;
    // position: absolute;
    // top: 30%;
    margin-top: -140px;
    padding-bottom: 40px;
    .content {
      width: 85%;
      height: 400px;
      border-radius: 5px;
      padding: 20px 20px;
      background: #fff;
      box-shadow: 5px 5px 5px #93b7d8, 5px -5px 5px #93b7d8,
        -5px 5px 5px #93b7d8, -5px -5px 5px #93b7d8;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);


        /deep/.el-tabs__nav-scroll{
          display: flex;
          justify-content: center;
          /deep/.el-tabs__nav{


          }
        }
        .top{
          .pwd{
            margin: 10px 0;
            display: flex;
            justify-content: space-between;
            span{
              color: #666;
              font-size: 14px;
            }
          }
        }
        .foot{
          // background: #f8f9fc;
          height: 55px;
          line-height: 55px;
          position: relative;
          padding-top: 4px;
          display: flex;
          justify-content: space-between;
          .left,.right{
            height: 55px;
            line-height: 55px;
            a{
              text-decoration: none;
              color: #2774b5;
              position: relative;
              img{
                margin-top: 10px;
              }
            }
          }
          .left{
            display: flex;
            align-items: center;
            div{
              margin-right: 5px;
              display: flex;
              align-items: center;
            }
          }

          // span{
          //   position: relative;
          //   bottom: 10px;
          //   a{
          //     text-decoration: none;
          //     color: #2774b5;
          //     position: relative;
          //     left: 53px;
          //   }
          // }
          // p{
          //   // margin-left: 15px;
          //   font-size: 14px;
          //   color: #666;
          //   a{

          //   }
          // }
        }
    }
  }
  .footer{
    text-align: center;
    position: absolute;
    bottom: 0;
    padding: 10px 20px;
    // height: 40px;
    line-height: 20px;
    color:#666;
    p{
      list-style: none;
      margin: 0;
    }
  }
  /deep/.el-input__inner{
    &::placeholder{
      font-size: 12px;
    }
  }
}
</style>
