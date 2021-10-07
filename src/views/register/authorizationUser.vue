<template>
  <el-container class="body" style="background-color: white;">
    <el-header style="height: 90px;">
      <div id="top-wrapper" style="width: 100%;height: 90px;">
        <div id="top" style="width: 1100px;margin: 0 auto;">
          <router-link to="/"><img src="../../img/login-logo.png"></router-link>
        </div>
      </div>
      <div class="content">
        <h2 class="title" style="padding-top: 10px;text-align: center" >用户授权和隐私保护条款</h2>
        <div class="text_area">
          <p>
            统一用户注册服务系统（以下简称“本系统”）在为用户提供网络服务过程中，需要用户授
            权本系统收集和使用用户信息，包括部分个人信息（即能够独立或与其他信息结合后识别
            用户身份的信息）以及用户上传的其他文字、图片和音视频，我们将通过本条款说明本系统会
            如何收集和使用这些信息，要点如下：<br/>
          </p>
          <div class="text">
            <h4>一、 用户授权<br/></h4>

            1.1 为实现留学相关服务，用户授权及同意本系统收集和使用用户个人信息。若信息中含有
            其他用户的个人信息，在向本系统提供这些个人信息之前，用户需确保已经取得合法的授权。<br/>
            1.2 用户上传到本系统的除个人信息以外的文字、图片和音视频等内容，统一用户注册服务 系统具有免费使用权。<br/>
            1.3 为了提供服务而需要从第三方获取用户信息的其他情况，留学中心将要求第三方说明信
            息来源，并要求第三方保障其提供信息的合法性；如果提供网络服务需进行的个人信息处理
            活动超出用户原本向第三方提供个人信息时的授权范围，本系统将征得用户的明确同意。<br/>
            1.4 如果为了提供服务而需要将用户信息共享至第三方，留学中心将评估该第三方收集信息
            的合法性、正当性、必要性。留学中心将要求第三方对用户信息采取保护措施并且严格遵守
            相关法律法规与监管要求。另外，留学中心会按照法律法规及国家标准的要求以确认协议、
            具体场景下的文案确认、弹窗提示等形式征得用户同意或确认第三方已经征得用户同意。<br/>
          </div>
          <div class="text">
            <h4>二、隐私保护<br/></h4>
            2.1 本系统不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储<br/>
            在本系统的非公开内容，但下列情况除外：<br/>
            <div class="text-left">
            1）为维护留学中心合法权益；<br/>
            2）事先获得用户的明确授权；<br/>
            3）根据有关的法律法规要求；<br/>
            4）按照相关政府主管部门的要求；<br/>
            5）为维护社会公众的利益；<br/>
            6）符合其它相关要求。<br/>
            </div>
            2.2 本系统可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意
            承担与本系统同等的保护用户隐私的责任，本系统有权将用户的注册资料等提供给该第三方。<br/>
            2.3 在不透露单个用户隐私资料的前提下，本系统有权对整个用户数据库进行分析并对用户
            数据库进行商业上的利用。<br/>
            <p>
              我们可能适时修订本政策内容。如该等变更会导致您在本政策项下权利的实质减损，我们将
              在变更生效前，通过在页面显著位置提示或向您发送电子邮件等方式通知您。在该种情况下,
              若您继续使用我们的服务，即表示同意受经修订的政策约束。<br/>
            </p><br/>
            <a>我已经阅读并理解上述协议的条款。</a>
          </div>
        </div>
      </div>
      <el-footer>
        <div class="content" style=" text-align:center;">
          Copyright © 1996-2021 版权所有:中国留学服务中心
        </div>
      </el-footer>
    </el-header>
  </el-container>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {

      }
    },
    components: {

    },
    mounted() {

    },
    methods: {

    }
  }
</script>

<style scoped>
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
  .text-left{
    margin-left: 20px;
    text-align: left;
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
  .text-left{
    margin-left: 20px;
    text-align: left;
  }

  .chooseType {
    display: flex;
    justify-content: center;
  }

  .c66 {
    color: #666;
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
</style>
