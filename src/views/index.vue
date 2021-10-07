<template>
    <el-container>
        <!-- 左侧导航 -->
        <!--<el-aside width="220px">-->
        <!--<Nav></Nav>-->
        <!--</el-aside>-->
        <el-container>
            <!-- 头部 -->
            <!--<el-header>-->
            <!--<Header></Header>-->
            <!--</el-header>-->
            <!-- 内容区 -->
            <el-main>
                <!--留学服务-->
                <div class="box box-h1">
                    <h3><span></span>{{ title1 }}</h3>
                    <el-row>
                        <el-col :span="5">
                            <div id="left">
                                <!--                  <img :src="imgSrc" />-->
                                <userAvatar :user="user"/>
                                <div id="spzName" v-if="user.userType === 'personal'">

                                </div>
                                <h4 v-else>{{ user.enterpriseName }}</h4>
                            </div>
                        </el-col>
                        <el-col :span="19"
                        >
                            <div id="right">
                                <ul id="xinxi">
                                    <li v-for="item in Arr">
                      <span class="left">{{ item.name }}</span
                      ><span class="right">{{ item.value }}</span>
                                    </li>
                                </ul>
                                <!--<button class="changeInfo">修改密码</button>-->
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <!--留学服务-->
                <div class="box box-h2">
                    <h3><span></span>{{ title2 }}</h3>
                    <ul id="list">
                        <li v-for="item in ArrImg">
                            <a :href="item.address">
                                <img :src="item.imageUrl"><br>
                                {{ item.systemName }}
                            </a>
                        </li>
                    </ul>
<!--                  <ul id="list">-->
<!--                    <li  v-if="user.userType === 'personal'" v-for="item in ArrImgPro">-->
<!--                      <a :href="item.link" >-->
<!--                        <img :src="item.imgUrl"  ><br>-->
<!--                        {{ item.content }}-->
<!--                      </a>-->
<!--                    </li>-->
<!--                    <li  v-if="user.userType === 'organ'"  v-for="itemOrg in ArrImgOrg">-->
<!--                      <a :href="itemOrg.link" >-->
<!--                        <img :src="itemOrg.imgUrl"  ><br>-->
<!--                        {{ itemOrg.content }}-->
<!--                      </a>-->
<!--                    </li>-->
<!--                  </ul>-->
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { getInfo } from '@/api/login/proLogin'
import { updateUserPwd } from '@/api/login/proLogin'
import { getDictArray, queryNationality } from '@/api/login/unitMethod'
import { ListSystemUrl } from '@/api/systemUrl/systemurl'
import personalUserInfoApi from '@/api/userRegister/personalUserInfoApi'
import userAvatar from './userAvatar'
import {setCMSLoginName} from "@/utils/auth";

const nationalityMap = {}
const authlevelMap = {}
const cardTypeMap = {}
export default {
  data() {
    return {
      chinaName: '',
      nationalityMap: null,
      authlevelMap: null,
      cardTypeMap: null,
      title1: '个人信息',
      title2: '留学服务',
      // imgSrc: require('../../public/pic.png'),
      imgIcon: require('../../public/qr.png'),
      name: '',
      renzheng: '实名认证',
      Arr: [
        { name: '姓名', value: '' },
        { name: '国家/地区', value: '' },
        { name: '证件类型', value: '' },
        { name: '证件号', value: '' },
        { name: '生日', value: '' },
        { name: '性别', value: '' },
        { name: '邮箱', value: '' },
        { name: '手机号', value: '' }
      ],
      //系统地址列表
      // 个人用户 前端展示
      ArrImgPro:[
        { imgUrl: require("../../public/icon1.png"), content: "政务服务平台" ,link : "http://p2.cscse.edu.cn/fronttest/personalBack/home" },

        { imgUrl: require("../../public/icon2.png"), content: "平安留学培训服务平台" ,link : "http://cgpxtest.cscse.edu.cn/"},
        //  { imgUrl: require("../../public/icon3.png"), content: "注册报到以及活动报名" ,link : "https://baidu.com" },
        { imgUrl: require("../../public/icon4.png"), content: "国际化人才云招聘" ,link : "https://lxyc.cscse.edu.cn/api/public/user/auth/callback"  },
      ],
      // 机构用户 前端展示
      ArrImgOrg:[
        { imgUrl: require("../../public/icon4.png"), content: "国际化人才云招聘" ,link : "https://lxyc.cscse.edu.cn/api/public/user/auth/callback" }
      ],
      ArrImg :[],
      user: {}
    }
  },
  components: {
    userAvatar
  },
  computed: {},
  filters: {},
  // mounted(){
  //   this.comeFunction()
  // },
  async created() {
    /* 获取实名认证等级 */
    await getDictArray('auth_level').then(async(res) => {
      const authlevels = res
      authlevels.map(d => {
        authlevelMap[d.dictValue] = { text: d.dictLabel }
      })
      this.authlevelMap = authlevelMap
    })

    /* 获取证件类型 */
    await getDictArray('card_type').then(resu => {
      const cardTypes = resu
      cardTypes.map(d => {
        cardTypeMap[d.dictValue] = { text: d.dictLabel }
      })
      this.cardTypeMap = cardTypeMap
    })
    //* 获取国家信息列表 */
    await queryNationality().then(res => {
      const nationalitys = res
      nationalitys.map(d => {
        nationalityMap[d.dictValue] = { text: d.dictLabel.toString() }
      })
      this.nationalityMap = nationalityMap
    })
    getInfo().then(data => {
      this.initData(data)
      //判断登录人的角色是个人用户或者机构用户
      const userType = this.user.userType === 'personal' ? '00' : '01'
      // /*获取系统地址信息列表*/
      ListSystemUrl(userType).then(res => {
        this.ArrImg = res
      })
      // 设置cms登陆名
      setCMSLoginName(this.user.userName)
    }).catch(error => {
      this.$router.push({ path: '/' })
    })
  },
  methods: {
    /*//!* 获取系统地址信息 *!/
      getSystemUrl(){
        ListSystemUrl().then(res =>{
          console.info('1211'+res);
            this.ArrImg = res
      })
      },*/
    initData(data) {
      this.user = data
      if (this.user.userType === 'personal') {
        //填充个人信息
        this.Arr[0].value = data.userName
        this.Arr[1].value = this.nationalityFilter(data.nationality)
        this.Arr[2].value = this.cardTypeFilter(data.cardType)
        this.Arr[3].value = data.cardNo
        // 填充生日字段，如果是证件号 从证件号里面解析
        this.Arr[4].value = data.dateOfBirth === undefined ? '' :
          (data.cardType ==='111'&& data.cardNo !=null ? this.FormatIdNumber(data.cardNo) :
            this.getTsFormatDate(data.dateOfBirth).substring(0, 10))
        this.Arr[5].value = data.gender === undefined || data.gender === '9' ? '' : (data.gender === '1' ? '男' : '女')
        this.Arr[6].value = data.email
        this.Arr[7].value = data.phone
      } else {
        //填充机构信息
        this.Arr[0].name = '法人姓名'
        this.Arr[0].value = data.legalName

        this.Arr[1].name = '联系人姓名'
        this.Arr[1].value = data.hostpersionName

        this.Arr[2].name = '地址'
        this.Arr[2].value = data.address

        this.Arr[3].name = '法人证件类型'
        this.Arr[3].value = this.cardTypeFilter(data.legalCardType)
        this.Arr[4].name = '联系人邮箱'
        this.Arr[4].value = data.hostpersionEmail

        this.Arr[5].name = '国家/地区'
        this.Arr[5].value = this.nationalityFilter(data.country)

        this.Arr[6].name = '法人证件号'
        this.Arr[6].value = data.legalIdnumber

        this.Arr[7].name = '联系人电话'
        this.Arr[7].value = data.hostpersionTelephone

      }
      // console.info(this.user)
      this.comeFunction()
      this.comeFunction1()
    },
    FormatIdNumber(idNumber){
      // 计算生日
      let yearBirth = idNumber.substring(6,10);
      let monthBirth = idNumber.substring(10,12);
      let dayBirth = idNumber.substring(12,14);
      return  yearBirth + '-' +monthBirth+ '-' +dayBirth
    },

    getTsFormatDate(timeStamp) {
      const date = new Date(timeStamp)
      //console.log(date); 结果为：Tue Apr 02 2019 07:49:23 GMT+0800 (中国标准时间)
      const seperator1 = '-'
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      return year + seperator1 + month + seperator1 + strDate
    },

    /* 国家信息列表过滤器 */
    nationalityFilter(type) {
      if (type == null || type == undefined) return ''
      return nationalityMap[type] === undefined ? '' : nationalityMap[type].text
    },
    /* 实名认证等级过滤器 */
    authlevelFilter(type) {
      return authlevelMap[type] === undefined ? '' : authlevelMap[type].text
    },
    /* 证件类型过滤器 */
    cardTypeFilter(type) {
      return cardTypeMap[type] === undefined ? '' : cardTypeMap[type].text
    },
    //添加姓名生僻字
    comeFunction() {
      if (this.user.userName !== null && this.user.userName !== '') {
        //获取姓名中的中文
        this.chinaName = this.user.userName
        var result = this.chinaName.split('/')
        var newresult = []
        // var newEng = []
        //console.log(result)
        //获取名字中的中文字
        for (var i = 0; i < result.length; i++) {
          newresult.push(result[i])
        }
        this.$nextTick(function () {
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
            spz: this.user.userName
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
    },
    comeFunction1() {
      if (this.user.userName !== null && this.user.userName !== '') {
        //获取姓名中的中文
        this.chinaName = this.user.userName
        var result = this.chinaName.split('/')
        var newresult = []
        //获取名字中的中文字
        for (var i = 0; i < result.length; i++) {
          newresult.push(result[i])
        }
        this.$nextTick(function () {
          //显示中文字在 div中
          var ul = document.getElementById('spzName1')
          document.getElementById('spzName1').innerHTML = ''
          //添加 li
          var span = document.createElement('span')
          span.setAttribute('id', 'spanNew')
          span.setAttribute('style', 'font-size:16px;font-weight: bold')
          span.innerHTML = result[0]
          ul.appendChild(span)
          //显示生僻字图片在 div中
          const queryParam = {
            spz: this.user.userName
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

<style>
    body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        min-height: 100%;
        background-color: #f5f5fa;
    }

    body > div, body > div > div {
    }

    .el-header,
    .el-footer {
        background-color: #ffffff;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-container {
        height: 100%;
    }

    .el-aside {
        background-color: #3658a7;
        min-height: 100%;
    }

    .el-aside {
        background-color: #3658a7;
        color: #333;
        height: 655px;

    }

    .el-footer {
        background-color: #f5f5fa;
    }

    .el-main {
        background-color: #f5f5fa;
        color: #333;
        text-align: center;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .box {
        background: #fff;
        box-shadow: 2px 0px 12px #dedede;
    }

    .box-h1 {
        height: 260px;
    }

    .box-h2 {
        height: 212px;
        margin: 0;
        margin-top: 20px;
    }

    h3 {
        margin: 0;
        color: #333333;
        font-weight: 600;
        font-size: 16px;
        font-family: "微软雅黑";
        line-height: 40px;
        text-align: left;
        border-bottom: 1px solid #eeeeee;
    }

    h3 span {
        width: 3px;
        height: 16px;
        background: #1569c8;
        display: inline-block;
        margin-right: 15px;
    }

    #left {
        /*overflow: auto;*/
        border-right: 1px dotted #eeeeee;
        margin-top: 35px;
    }

    h4 {
        font-size: 18px;
        font-family: "微软雅黑";
        margin: 0;
        margin-top: 10px;
    }

    h5 {
        font-size: 14px;
        font-family: "微软雅黑";
        color: #636363;
        font-weight: 500;
        padding-left: 15px;
        margin: 0;
        margin-top: 6px;
    }

    h5 img {
        position: relative;
        top: 5px;
        right: 5px;
    }

    #left input {
        width: 150px;
        height: 26px;
        border-radius: 15px;
        border: 1px solid #4275ff;
        background: #fff;
        color: #4275ff;
        margin-top: 15px;
    }

    ul#xinxi {
        margin-top: 25px;
    }

    ul#xinxi li {
        float: left;
        width: 25%;
        margin-right: 10px;
        padding-left: 15px;
        color: #666;
        line-height: 47px;
        font-size: 14px;
        margin-right: 50px;
        list-style: none;
        background: url(../../public/icon.png) no-repeat 0;
    }

    ul#xinxi li span.left {
        float: left;
    }

    ul#xinxi li span.right {
        float: right;
    }

    ul#list {
        margin: 0;
        overflow: hidden;
        padding: 0;
    }

    ul#list li {
        width: 24.9%;
        float: left;
        list-style: none;
        border-right: 1px solid #eeeeee;
        text-align: center;
        font-size: 14px;
        color: #666666;
        padding: 28px 0;
        margin: 0;
    }

    ul#list li:hover {
        background: #3486fa;
        color: #fff;
    }

    .changeInfo {
        position: relative;
        top: 40px;
        left: 20px;
        width: 130px;
        height: 28px;
        background: #3888fa;
        border: none;
        border-radius: 15px;
        color: #fff;
    }

    .testdiv {
        vertical-align: middle;
    }
</style>
