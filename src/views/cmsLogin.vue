<template>
    <div id="user-login">
        <!--头部-->
        <div class="header">
            <img :src="imgSrc" class="img"/>
            <div class="text">
                <p>教育部留学服务中心</p>
                <p>统一用户身份认证系统</p>
            </div>
        </div>
        <div id="login_container" style="width: 380px;height: 400px" v-show="erweima"/>
        <!--中间-->
        <div class="content-wrapper">
            <!--用户登录-->
            <div class="login-wrapper">
                <el-tabs v-model="activeName" @tab-click="handleClick" v-show="xianshi">
                    <el-tab-pane label="个人用户登录" name="first">
                        <!--密码登录-->
                        <div class="top">
                            <el-form ref="formInline" :model="formInline" :rules="formRules"  class="demo-form-inline" id="formInline">
                                <el-form-item prop="username">
                                    <el-input v-model="formInline.username" placeholder="请输入用户名/身份证号/学号"></el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input v-model="formInline.password" type="password" placeholder="请输入密码"></el-input>
                                </el-form-item>
                                <!--<div id="box"><img :src="imgSrc1"/>{{Name1}}</div>-->
                                <JcRange status="status" @child-event="childevent" style="margin-bottom: 10px;"></JcRange>
                                <div class="pwd">
                                    <el-checkbox v-model="formInline.rememberMe">记住我</el-checkbox>
                                    <span id="sp1"><router-link to="/forgetPassword">忘记密码</router-link></span>
                                </div>

                                <!--<span ><router-link to="/forgetPassword"><a href="#">忘记密码</a></router-link></span>-->
                                <!--<el-button type="primary" @click="onSubmit"><span>登录</span></el-button>-->
                                <el-button class="el-loginButton"
                                           :loading="loading"
                                           size="medium"
                                           type="primary"
                                           style="width:100%;"
                                           @click.native.prevent="onSubmit(1)"
                                >
                                    <span v-if="!loading">登 录</span>
                                    <span v-else>登 录 中...</span>
                                </el-button>
                            </el-form>
                        </div>

                        <!--其他方式登录-->
                        <div class="foot">
                            <p>
·<!--                                <a href="#" @click = "gotoAlipaylink"><img style="border: none" :src="imgZfb"/></a>-->
<!--                                <a href="#" @click="gotoWeiXin"><img style="border: none" :src="imgWx"/></a>-->
                                <!--                <a href="#"><img style="border: none" :src="imgLy"/></a>-->
                            </p>
                            <p>
                                <router-link to="/personalRegister" ><a href="#">立即注册></a></router-link>
                            </p>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="立户单位登录" name="second">
                        <!--&lt;!&ndash;密码登录&ndash;&gt;-->
                        <!--<div class="top">-->
                            <!--<el-form ref="formInline2" :model="formInline2" :rules="formRules2" class="demo-form-inline">-->
                                <!--<el-form-item prop="deptName">-->
                                    <!--<el-select v-model="formInline2.deptName" placeholder="请选择部门" style="width: 100%">-->
                                        <!--<el-option-->
                                                <!--v-for="item in options"-->
                                                <!--:key="item.value"-->
                                                <!--:label="item.label"-->
                                                <!--:value="item.value">-->
                                        <!--</el-option>-->
                                    <!--</el-select>-->
                                <!--</el-form-item>-->
                                <!--<el-form-item prop="username">-->
                                    <!--<el-input v-model="formInline2.username2" placeholder="请输入邮箱/社会信用代码"></el-input>-->
                                <!--</el-form-item>-->
                                <!--<el-form-item prop="password">-->
                                    <!--<el-input v-model="formInline2.password2" type="password" placeholder="请输入密码"></el-input>-->
                                <!--</el-form-item>-->

                                <!--<JcRange status="status" @child-event="orgevent" style="margin-top: -10px;"></JcRange>-->
                                <!--&lt;!&ndash;<JcRange status="status" style="margin-bottom: 10px;"></JcRange>&ndash;&gt;-->
                                <!--&lt;!&ndash;<el-checkbox v-model="formInline2.rememberMe2">记住我</el-checkbox><span v-html="Link4" id="sp1">忘记密码</span>&ndash;&gt;-->
                                <!--&lt;!&ndash;<el-button type="primary" @click="onSubmit">&ndash;&gt;-->
                                <!--&lt;!&ndash;<span>登录</span>&ndash;&gt;-->
                                <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
                                <!--<el-button class="el-loginButton"-->
                                           <!--:loading="loading"-->
                                           <!--size="medium"-->
                                           <!--type="primary"-->
                                           <!--style="width:100%; margin-top: 15px;"-->
                                           <!--@click.native.prevent="onSubmit(2)"-->
                                <!--&gt;-->
                                    <!--<span v-if="!loading">登 录</span>-->
                                    <!--<span v-else>登 录 中...</span>-->
                                <!--</el-button>-->
                            <!--</el-form>-->


                        <!--</div>-->
                        <!--&lt;!&ndash;其他方式登录&ndash;&gt;-->
                        <!--<div class="foot tabs">-->
              <!--<span >-->
                  <!--&lt;!&ndash;<router-link to="/orgenRegister">立即注册></router-link>&ndash;&gt;-->
                <!--<router-link to="/orgenForgetPassword">忘记密码></router-link>-->
              <!--</span>-->
                        <!--</div>-->
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <!--版权信息-->
        <div class="footer">
            <div class="left"></div>
            <div class="right">
                <p>
                    <a  target="_blank" href="http://www.cscse.edu.cn//web/411047/index.html">关于我们</a>
                    <a  target="_blank" href="http://www.cscse.edu.cn//web/411047/411050/index.html">联系我们</a>
                    <a  target="_blank" href="http://www.cscse.edu.cn//web/411047/435072/index.html">服务网络</a>
                    <a  target="_blank" href="http://www.cscse.edu.cn//web/411047/411066/index.html">法律声明</a>
                    <a  target="_blank" href="http://www.cscse.edu.cn//web/411068/index.html">网站地图</a>
                    <a  target="_blank" href="http://www.cscse.edu.cn//web/411047/gzdt35/index.html">标识系统</a>
                </p>
                <p>
                    <span>中国留学服务中心版权所有     1996-2021   电话：86-010-62677000</span>
                </p>
                <p>
                    <span>北京市海淀区四环路西路56号  辉煌时代大厦6层  京ICP备05061711号-1  京公网专备：110102430085号</span>
                </p>
            </div>
        </div>
    </div>

</template>
<script>
import JcRange from '@/components/login/JcRange'
import { proLogin } from '@/api/login/proLogin'
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'
import Dict from './system/dict/index'

export default {
  components: {
    Dict,
    JcRange
  },
  data() {
    return {
      appid: 'wx68f22e1c57a6659f',
      scope: 'snsapi_login',
      redirect_uri: 'http://lxyzt.cscse.edu.cn/api/otherlogin/wxlogin/pcLoginByWeiXin',
      state: "STATE",
      login_type: 'jssdk',
      self_redirect: 'true',
      myWindow: '',

      imgSrc: require("../../public/lf_logo.png"),
      imgSrc1: require("../../public/button.png"),
      imgZfb: require("../../public/zhifubao.png"),
      imgWx: require("../../public/weixin.png"),
      imgLy: require("../../public/lingyin.png"),
      Line: "|",
      Link1: "<a href='http://baidu.com'>帮助</a>",
      Link2: "<a href='http://baidu.com'>隐私</a>",
      Link3: "<a href='http://baidu.com'>条款</a>",
      Link4: "<a href='http://baidu.com'>忘记密码</a>",
      fooTer: "Copyright © 1996-2021  版权所有:中国留学服务中心",
      activeName: "first",
      Name1:"向右滑动完成验证",
      formInline: {
        username: "",
        password:"",
        rememberMe: false,
        userType: "",
      },
      formInline2: {
        username2: "",
        password2:"",
        rememberMe2: false,
        userType: "",
        deptName:""
      },
      formRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
      },
      formRules2: {
        username2: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password2: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        deptName2: [
          { required: true, trigger: "change", message: "请选择部门"}
        ],
      },
      xianshi: true,
      erweima: false,
      loading: false,
      redirect: undefined,
      options: [{
        value: '01',
        label: '人力资源相关业务部门'
      }],
      pro_code : "", //个人拖动验证
      org_code : "", //机构拖动验证
    };
  },
  created() {
    this.getCookie();
    this.formInline2.deptName = this.options[0].value;
    //url地址栏中的体统唯一标识
    // 判断系统唯一标识、 回跳地址是否存在。
    if(this.$route.query.joinsysCode != null) {
      Cookies.set('joinsysCode',this.$route.query.joinsysCode)
    }
    if(this.$route.query.lookBackAddr != null) {
      Cookies.set('lookBackAddr',this.$route.fullPath.substr(this.$route.fullPath.indexOf('lookBackAddr') + 'lookBackAddr'.length + 1 , this.$route.fullPath.length))
    }
  },
  mounted(){
    var username=document.cookie;
    // console.log(username);
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === 'second'){
        window.location.href='http://zwfwunit.cscse.edu.cn/enterprise.jsp'
      }
    },
    onSubmit(type) {
      this.formInline.userType = type
      this.formInline2.userType = type
      this.formInline.joinsysCode = Cookies.get('joinsysCode')
      this.formInline2.joinsysCode = Cookies.get('joinsysCode')
      if (type==1) {
        //个人登陆时校验滑块
        if(this.pro_code==false){
          this.$message.error('请拖动滑动验证');
          return false;
        }

        this.$refs.formInline.validate(valid => {
          if (valid) {
            this.loading = true;
            if (this.formInline.rememberMe) {
              Cookies.set("username", this.formInline.username, {expires: 30});
              Cookies.set("password", encrypt(this.formInline.password), {expires: 30});
              Cookies.set('rememberMe', this.formInline.rememberMe, {expires: 30});
            } else {
              Cookies.remove("username");
              Cookies.remove("password");
              Cookies.remove('rememberMe');
            }
            //个人用户登陆,密码加密传输
            this.$store
              .dispatch("proLogin", this.formInline)
              .then((res)=> {
                  //如果cookie中有寸回跳地址
                  if(Cookies.get('lookBackAddr') != null){
                    var url= decodeURIComponent( Cookies.get('lookBackAddr'))
                    let newurl = url.concat(url.indexOf('?') != -1 ? '&token='+res.token : '?token='+res.token);
                    window.location.href = newurl;
                  }else if (res.systemRetUrl != null) {
                    //判断有没有返回路径，没有就跳转系统首页
                    window.location.href = res.systemRetUrl+'?token='+res.token;
                    //this.redirectToSystem(res.systemRetUrl,res.token);
                  } else {
                    this.$router.push({path: '/'})
                  }
                }
              )
              .catch(() => {
                this.loading = false;
                //todo
                //滑动验证收回去
              });
          }
        });
      }else if (type ==2 ){
        if(this.org_code==false){
          this.$message.error('请拖动滑动验证');
          return false;
        }
        this.$refs.formInline2.validate(valid => {
          if (valid) {
            this.loading = true;
            if (this.formInline2.rememberMe2) {
              Cookies.set("username2", this.formInline2.username2, {expires: 30});
              Cookies.set("password2", encrypt(this.formInline2.password2), {expires: 30});
              Cookies.set('rememberMe2', this.formInline2.rememberMe2, {expires: 30});
            } else {
              Cookies.remove("username2");
              Cookies.remove("password2");
              Cookies.remove('rememberMe2');
            }
            this.$store
              .dispatch("OrgLogin", this.formInline2)
              .then((res)=> {
                //如果cookie中有存回跳地址
                if(Cookies.get('lookBackAddr') != null){
                  var url= decodeURIComponent( Cookies.get('lookBackAddr'))
                  let newurl = url.concat(url.indexOf('?') != -1 ? '&token='+res.token : '?token='+res.token);
                  window.location.href = newurl;
                }else if (res.systemRetUrl != null) {
                  //判断有没有返回路径，没有就跳转系统首页
                  window.location.href = res.systemRetUrl+'?token='+res.token;
                } else {
                  this.$router.push({path: '/'})
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
    redirectToSystem(url,token) {
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
      opt.name = 'token'
      opt.value = token
      temp_form.appendChild(opt);
      document.body.appendChild(temp_form);
      //提交数据
      temp_form.requestHeaders = {'token': token}
      console.info(temp_form)
      temp_form.submit();

    },
    getCookie() {
      //个人 /机构登陆的记住我
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe');
      this.formInline = {
        username: username === undefined ? this.formInline.username : username,
        password: password === undefined ? this.formInline.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };

      const username2 = Cookies.get("username2");
      const password2 = Cookies.get("password2");
      const rememberMe2 = Cookies.get('rememberMe2');
      this.formInline2 = {
        username2: username2 === undefined ? this.formInline.username2 : username2,
        password2: password2 === undefined ? this.formInline.password2 : decrypt(password2),
        rememberMe2: rememberMe2 === undefined ? false : Boolean(rememberMe2)
      };
    },
    childevent(e){
      this.pro_code = e;
    },
    orgevent(e){
      this.org_code = e;
    },
    gotoAlipaylink(){
      //点击跳转至上次页面
      //this.$router.go(-1)
      //指定跳转地址
      //window.location.href="https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2021001194602100&scope=auth_user&redirect_uri=http%3A%2F%2F192.168.11.216%3A9527%2Fotherlogin%2Finfo%2FAlipayLogin";
      //测试环境
      // window.location.href="https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2021001194602100&scope=auth_user&redirect_uri=http%3A%2F%2Flxyzt.cscse.edu.cn%2Fapi%2Fotherlogin%2Finfo%2FAlipayLogin";
      //正式环境
      window.location.href="https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2021002116661993&scope=auth_user&redirect_uri=http%3A%2F%2Flxyzt.cscse.edu.cn%2Fapi%2Fotherlogin%2Finfo%2FAlipayLogin";

      //window.location.href="https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2021002115613048&scope=auth_user&redirect_uri=http%3A%2F%2F192.168.10.53%3A9527%2Fotherlogin%2Finfo%2FAlipayLogin";
    },
    gotoWeiXin() {
      window.location.href = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx68f22e1c57a6659f&redirect_uri=http%3A%2F%2Flxyzt.cscse.edu.cn%2Fapi%2Fotherlogin%2Fwxlogin%2FpcLoginByWeiXin&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect'
      // this.xianshi  = false
      // this.erweima = true
      // var obj = new WxLogin({
      //   self_redirect:true,
      //   id:"login_container",
      //   appid: "wx68f22e1c57a6659f",
      //   scope: "snsapi_login",
      //   redirect_uri: "http://lxyzt.cscse.edu.cn%2Fapi%2Fotherlogin%2Fwxlogin%2FpcLoginByWeiXin",
      //   state: "STATE",
      //   style: "",
      //   href: ""
      // });

      // let iWidth = 540;
      // let iHeight = 540;
      // let iTop = (window.screen.availHeight - 30 - iHeight) / 2;
      // let iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
      // this.myWindow = window.open("https://open.weixin.qq.com/connect/qrconnect?appid=" + this.appid + "&scope=" + this.scope + "&redirect_uri=" + this.redirect_uri + "&state=" + this.state + "&login_type=" + this.login_type + "&self_redirect=" + this.default, '微信登录', 'width=540,height=540,top= ' + iTop + ',left= ' + iLeft + ' ');
    }

  },
};
</script>

<style lang="scss" scoped>
    p{
        margin: 0;
    }
    #user-login{
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
        }
        .content-wrapper{
            width: 100%;
            height: 600px;
            position: relative;
            background: url('../../public/bg1.png');
            background-size: cover;
            .login-wrapper{
                width: 380px;
                height: 438px;
                background-color: #488fc9;
                // opacity: 0.7;
                position: absolute;
                top: 82px;
                left: 489px;
                // /deep/ .el-tabs__header{
                //   padding: 41px 30px;
                // }
                .top{
                    .pwd{
                        display: flex;
                        justify-content: space-between;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #ffffff;
                        /deep/ .el-checkbox__label{
                            color: #ffffff;
                        }
                    }
                }
                .foot{
                    position: absolute;
                    left: 0;
                    bottom: -86px;
                    width: 320px;
                    height: 60px;
                    padding: 0 30px;
                    background-color: #b1cde7;
                    // opacity: 0.6;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    >p:nth-child(2){
                        a{
                            font-size: 14px;
                            color: #2774b5;
                        }
                    }
                    &.tabs{
                        display: flex;
                        justify-content: flex-end;
                        a{
                            font-size: 14px;
                            color: #2774b5;
                        }
                    }
                }

                .el-tabs{
                    /deep/ .el-tabs__header{
                        padding: 41px 30px;
                        margin: 0;
                        box-sizing: content-box;
                    }
                    /deep/ .el-tabs__content{
                        padding: 0 30px ;
                        box-sizing: content-box;
                        position: relative;
                        overflow: visible;
                    }
                }
            }
        }
        .footer{
            position: absolute;
            width: 100%;
            height: calc(100% - 720px);
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            .left{
                width: 42px;
                height: 51px;
                background: url('../../public/picon.png');
            }
            .right{
                margin-left: 36px;
                p{
                    font-size: 14px;
                    color: #666;
                    a{
                        color: #666;
                        padding-right: 7px;
                        border-right: 1px solid #666;
                        margin-right: 5px;
                        &:last-child{
                            border: none;
                        }
                    }
                }
            }
        }
        /deep/ .el-tabs__content{
            position: unset;

        }
        /deep/ .el-tabs__item{
            width: 50%;
            padding: 0 20px;
            text-align: center;
            color: #c8deef;
        }
        /deep/ .el-tabs__item.is-active{
            color: #fff;
        }
        /deep/ .el-tabs__nav{
            width: 320px;
            height: 31px;

        }
        /deep/ .el-tabs__active-bar{
            width: 120px !important;
            background: #fff;
        }
        /deep/.el-tabs__nav-wrap::after{
            background: transparent;
        }
        /deep/ .el-input__inner{
            background: #91bddf;
            color: #fff;
            &::placeholder{
                color: #fff;
            }
        }
        /deep/ .el-button--medium{
            font-size: 18px;
        }
        /deep/ .el-button--primary{
            width: 320px;
            height: 40px;
            margin-top: 19px;
            background-color: #2774b5;
            border-color: #2774b5;
            border-radius: 4px;
        }
    }
</style>
