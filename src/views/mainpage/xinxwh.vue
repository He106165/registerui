<template>
    <div>
        <!-- 左侧导航 -->
        <el-container>
            <el-main style="text-align: left;">
                <!--信息维护-->
                <div class="box">
                    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-left: 10px;">
                        <el-tab-pane label="基本信息" name="first">
                            <div class="formBox">
                                <el-form :model="baseFrom" ref="baseFrom" :rules="baseRules" label-width="120px">
                                    <el-form-item label="真实姓名" prop="userName">
                                        <el-input v-model="baseFrom.userName" v-if="baseFrom.authlevel === '3'" disabled
                                                  placeholder="请输入真实姓名"
                                                  style="width: 88%"></el-input>
                                        <el-input v-model="baseFrom.userName" v-else placeholder="请输入真实姓名"
                                                  style="width: 75%"
                                                  @focus="focusDiv()" @blur="comeFunction()" clearable></el-input>
                                        <el-popover
                                                placement="right-start"
                                                width="160"
                                                v-model="visible"
                                                class="item"
                                                trigger="hover"
                                                v-if="baseFrom.authlevel !== '3'">
                                            <div id='ueImg' style="text-align: left; margin: 10px">
                                                <img src="../../../public/cscseImg/spz/ue1ac.png"
                                                     @click="enter('ue1ac')">
                                                <img src="../../../public/cscseImg/spz/ue072.png"
                                                     @click="enter('ue072')">
                                                <img src="../../../public/cscseImg/spz/ue077.png"
                                                     @click="enter('ue077')">
                                                <img src="../../../public/cscseImg/spz/ue052.png"
                                                     @click="enter('ue052')">
                                                <img src="../../../public/cscseImg/spz/ue08d.png"
                                                     @click="enter('ue08d')">
                                                <img src="../../../public/cscseImg/spz/ue05f.png"
                                                     @click="enter('ue05f')">
                                                <img src="../../../public/cscseImg/spz/ue0c4.png"
                                                     @click="enter('ue0c4')">
                                                <img src="../../../public/cscseImg/spz/ue060.png"
                                                     @click="enter('ue060')">
                                                <img src="../../../public/cscseImg/spz/ue058.png"
                                                     @click="enter('ue058')">
                                                <img src="../../../public/cscseImg/spz/ue192.png"
                                                     @click="enter('ue192')">
                                                <img src="../../../public/cscseImg/spz/ue050.png"
                                                     @click="enter('ue050')">
                                                <img src="../../../public/cscseImg/spz/ue10e.png"
                                                     @click="enter('ue10e')">
                                                <img src="../../../public/cscseImg/spz/ue05e.png"
                                                     @click="enter('ue05e')">
                                                <img src="../../../public/cscseImg/spz/ue0a6.png"
                                                     @click="enter('ue0a6')">
                                                <img src="../../../public/cscseImg/spz/ue09b.png"
                                                     @click="enter('ue09b')">
                                                <img src="../../../public/cscseImg/spz/ue13c.png"
                                                     @click="enter('ue13c')">
                                                <img src="../../../public/cscseImg/spz/ue059.png"
                                                     @click="enter('ue059')">
                                                <img src="../../../public/cscseImg/spz/ue128.png"
                                                     @click="enter('ue128')">
                                                <img src="../../../public/cscseImg/spz/ue0df.png"
                                                     @click="enter('ue0df')">
                                                <img src="../../../public/cscseImg/spz/ue863.png"
                                                     @click="enter('ue863')">
                                                <img src="../../../public/cscseImg/spz/ue1a3.png"
                                                     @click="enter('ue1a3')">
                                            </div>
                                            <el-button slot="reference" type="text">生僻字</el-button>
                                        </el-popover>
                                    </el-form-item>
                                    <el-form-item v-if="baseFrom.authlevel !== '3'">
                                        <div id="spzName" class="wrap" style="width: 88%">
                                            显示名字：
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="国籍国别/地区" prop="nationality">
                                        <el-select v-model="baseFrom.nationality" clearable filterable
                                                   v-if="baseFrom.authlevel === '3' ||  ( this.nationalityL !== undefined && this.nationalityL !== null && this.nationalityL !== '')" disabled
                                                   style="width: 88%"
                                                   @change="nationalityLabel(baseFrom.nationality)">
                                            <el-option v-for="item in nationalityList" :key="item.values"
                                                       :label="item.label"
                                                       :value="item.values"/>
                                        </el-select>
                                        <el-select v-model="baseFrom.nationality" clearable filterable v-else
                                                   style="width: 88%"
                                                   @change="nationalityLabel(baseFrom.nationality)">
                                            <el-option v-for="item in nationalityList" :key="item.values"
                                                       :label="item.label"
                                                       :value="item.values"/>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="证件类型" prop="cardType">
                                        <el-select v-model="baseFrom.cardType" style="width: 88%"
                                                   v-if="baseFrom.authlevel === '3' || ( this.cardTypeL !== undefined && this.cardTypeL !== null && this.cardTypeL !== '')" disabled
                                                   @change="rcardTypeLabel(baseFrom.cardType)">
                                            <el-option v-for="item in cardTypeList" :key="item.values"
                                                       :label="item.label"
                                                       :value="item.values"/>
                                        </el-select>
                                        <el-select v-model="baseFrom.cardType" style="width: 88%" v-else
                                                   @change="rcardTypeLabel(baseFrom.cardType)" :disabled="zjLeiXing">
                                            <el-option v-for="item in cardTypeList" :key="item.values"
                                                       :label="item.label"
                                                       :value="item.values"/>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="证件号码" prop="cardNo">
                                        <el-input v-model="baseFrom.cardNo" placeholder="请输入证件号"
                                                  v-if="baseFrom.authlevel === '3' ||( this.cardNoL !== undefined && this.cardNoL !== null && this.cardNoL !== '')" disabled
                                                  style="width: 88%"></el-input>
                                        <el-input v-model="baseFrom.cardNo" placeholder="请输入证件号" v-else
                                                  style="width: 88%"></el-input>
                                    </el-form-item>
                                    <el-form-item label="昵称" prop="nickName">
                                        <el-input v-model="baseFrom.nickName" placeholder="请输入昵称"
                                                  style="width: 88%"></el-input>
                                    </el-form-item>
                                    <el-form-item label="性别" prop="gender">
                                        <el-select v-model="baseFrom.gender" v-if="baseFrom.authlevel === '3'" disabled
                                                   placeholder="请选择" style="width: 88%">
                                            <el-option
                                                    v-for="dict in usersexOptions"
                                                    :key="dict.dictValue"
                                                    :label="dict.dictLabel"
                                                    :value="dict.dictValue"
                                            >
                                            </el-option>
                                        </el-select>
                                        <el-select v-model="baseFrom.gender" v-else
                                                   placeholder="请选择" style="width: 88%"  :disabled="genderBirth">
                                            <el-option
                                                    v-for="dict in usersexOptions"
                                                    :key="dict.dictValue"
                                                    :label="dict.dictLabel"
                                                    :value="dict.dictValue"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="生日"  prop="dateOfBirth">
                                        <el-date-picker v-model="baseFrom.dateOfBirth" v-if="baseFrom.authlevel === '3'" disabled
                                                        type="date" placeholder="选择日期"
                                                        style="width: 88%" value-format="yyyy-MM-dd"></el-date-picker>
                                        <el-date-picker v-model="baseFrom.dateOfBirth" v-else type="date" placeholder="选择日期"
                                                        style="width: 88%" value-format="yyyy-MM-dd" :disabled="genderBirth"></el-date-picker>
                                    </el-form-item>
                                </el-form>
                                <div class="nextStep">
                                    <el-button type="primary" @click="onSubmit">保存</el-button>
                                </div>
                                <div slot="tip" style="color: red;width: 500px;padding-top: 10%">
                                    证件类型为身份证号的用户，点击保存信息后将自动完成实名认证，可前往“查看实名状态”查阅实名认证结果
                                </div>
                            </div>
                        </el-tab-pane>
<!--                        <el-tab-pane label="扩展信息" name="second">-->
<!--                            <div class="formBox">-->
<!--                                <el-form :model="extendFrom" ref="extendFrom" :rules="extendRules" label-width="80px">-->
<!--                                    <el-form-item label="民族" prop="nation">-->
<!--                                        <el-select v-model="extendFrom.nation" placeholder="请选择民族" clearable style="width: 80%">-->
<!--                                        <el-option-->
<!--                                        v-for="dict in nationOptions"-->
<!--                                        :key="dict.dictValue"-->
<!--                                        :label="dict.dictLabel"-->
<!--                                        :value="dict.dictValue"-->
<!--                                        />-->
<!--                                        </el-select>-->
<!--&lt;!&ndash;                                        <el-input v-model="extendFrom.nation" style="width: 80%"></el-input>&ndash;&gt;-->
<!--                                    </el-form-item>-->
<!--                                    <el-form-item label="健康状况" prop="healthStatus">-->
<!--                                        <el-select v-model="extendFrom.healthStatus" placeholder="请选择健康状况" clearable-->
<!--                                                   style="width: 80%">-->
<!--                                            <el-option-->
<!--                                                    v-for="dict in healthStatusOptions"-->
<!--                                                    :key="dict.dictValue"-->
<!--                                                    :label="dict.dictLabel"-->
<!--                                                    :value="dict.dictValue"-->
<!--                                            />-->
<!--                                        </el-select>-->
<!--                                    </el-form-item>-->
<!--                                    <el-form-item label="婚姻状态" prop="marriageNew">-->
<!--                                        <el-select v-model="extendFrom.marriageNew" placeholder="请选择婚姻状态" clearable-->
<!--                                                   style="width: 80%">-->
<!--                                            <el-option-->
<!--                                                    v-for="dict in marriageNewOptions"-->
<!--                                                    :key="dict.dictValue"-->
<!--                                                    :label="dict.dictLabel"-->
<!--                                                    :value="dict.dictValue"-->
<!--                                            />-->
<!--                                        </el-select>-->
<!--                                    </el-form-item>-->
<!--                                    <el-form-item label="籍贯" prop="nativePlace">-->
<!--                                        <el-input v-model="extendFrom.nativePlace" style="width: 80%" placeholder="请输入籍贯"></el-input>-->
<!--                                    </el-form-item>-->
<!--                                    <el-form-item label="出生地" prop="placeOfBirth">-->
<!--                                        <el-input v-model="extendFrom.placeOfBirth" style="width: 80%" placeholder="请输入出生地"></el-input>-->
<!--                                    </el-form-item>-->
<!--                                    <el-form-item label="政治面貌" prop="political">-->
<!--                                        <el-select v-model="extendFrom.political" placeholder="请选择政治面貌" clearable-->
<!--                                                   style="width: 80%">-->
<!--                                            <el-option-->
<!--                                                    v-for="dict in politicalOptions"-->
<!--                                                    :key="dict.dictValue"-->
<!--                                                    :label="dict.dictLabel"-->
<!--                                                    :value="dict.dictValue"-->
<!--                                            />-->
<!--                                        </el-select>-->
<!--                                    </el-form-item>-->
<!--                                    <el-form-item label="最后学历" prop="lastScjool">-->
<!--                                        <el-select v-model="extendFrom.lastScjool" placeholder="请选择最后学历" clearable-->

<!--                                                   style="width: 80%">-->
<!--                                            <el-option-->
<!--                                                    v-for="dict in lastSchoolOptions"-->
<!--                                                    :key="dict.dictValue"-->
<!--                                                    :label="dict.dictLabel"-->
<!--                                                    :value="dict.dictValue"-->
<!--                                            />-->
<!--                                        </el-select>-->
<!--                                    </el-form-item>-->
<!--                                </el-form>-->
<!--                                <div class="nextStep">-->
<!--                                    <el-button type="primary" @click="extendSubmit">保存</el-button>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </el-tab-pane>-->
<!--                        <el-tab-pane label="留学信息" name="third">-->
<!--                            <h3>留学经历</h3>-->
<!--                            <template>-->
<!--                                <div class="TestWord">-->
<!--                                    <el-button @click="addLine"  style="margin-bottom: 10px;">添加留学经历</el-button>-->
<!--                                    <el-table border :data="tableData" style="width: 100%;">-->
<!--                                        <el-table-column prop="abroadCountry" label="留学国家" width="170px;"-->
<!--                                                         align="center"/>-->
<!--                                        <el-table-column prop="abroadType" label="留学级别" width="170px;" align="center"/>-->
<!--                                        <el-table-column prop="abroadUniversity" label="留学院校" width="170px;"-->
<!--                                                         align="center"/>-->
<!--                                        <el-table-column prop="nativeClass" label="所在系/院" width="170px;"-->
<!--                                                         align="center"/>-->
<!--                                        <el-table-column prop="grade" label="取得学位" width="170px;" align="center"/>-->
<!--                                        <el-table-column prop="startTime" :formatter="dateFormat" label="起始年月"-->
<!--                                                         width="170px;" align="center"/>-->
<!--                                        <el-table-column prop="finishTime" :formatter="dateFormat" label="结束年月"-->
<!--                                                         width="170px;" align="center"/>-->
<!--                                        <el-table-column prop="webUrl" label="院校网址" width="170px;" align="center"/>-->
<!--                                        <el-table-column label="操作" align="center" width="170px" fixed="right">-->
<!--                                            <template slot-scope="scope">-->
<!--                                                <el-button size="mini" type="text" icon="el-icon-edit"-->
<!--                                                           @click="editStudy(scope.$index, scope.row)">修改-->
<!--                                                </el-button>-->
<!--                                                <el-button size="mini" type="text" icon="el-icon-delete"-->
<!--                                                           @click="deleteAbroafdstudyInfoById(scope.$index, scope.row)">-->
<!--                                                    删除-->
<!--                                                </el-button>-->
<!--                                            </template>-->
<!--                                        </el-table-column>-->
<!--                                    </el-table>-->
<!--                                    &lt;!&ndash; 添加或修改公告对话框 &ndash;&gt;-->
<!--                                    <el-dialog :title="title" :visible.sync="open" width="850px"-->
<!--                                               :close-on-click-modal="false" append-to-body @close="closeDialog">-->
<!--                                        <div class="formBoxStudy">-->
<!--                                            <el-form ref="studyForm" :model="studyForm" :rules="studyRules"-->
<!--                                                     label-width="90px">-->
<!--                                                <el-form-item label="留学国家:" prop="abroadCountry">-->
<!--                                                    <el-select v-model="studyForm.abroadCountry" clearable filterable placeholder="留学国家" style="width: 88%"-->
<!--                                                               @change="nationalityLabel(studyForm.abroadCountry)">-->
<!--                                                        <el-option v-for="item in nationalityList" :key="item.values" :label="item.label"-->
<!--                                                                   :value="item.values"/>-->
<!--                                                    </el-select>-->
<!--                                                </el-form-item>-->
<!--                                                <el-form-item label="留学类别:" prop="abroadType">-->
<!--                                                    <el-input v-model="studyForm.abroadType" placeholder="请输入留学类别"-->
<!--                                                              style="width: 88%"/>-->
<!--                                                </el-form-item>-->
<!--                                                <el-form-item label="留学院校:" prop="abroadUniversity">-->
<!--                                                    <el-input v-model="studyForm.abroadUniversity"-->
<!--                                                              placeholder="请输入留学院校" style="width: 88%"/>-->
<!--                                                </el-form-item>-->
<!--                                                <el-form-item label="所在系/院:" prop="nativeClass">-->
<!--                                                    <el-input v-model="studyForm.nativeClass" placeholder="请输入所在系/院"-->
<!--                                                              style="width: 88%"/>-->
<!--                                                </el-form-item>-->
<!--                                                <el-form-item label="取得学位:" prop="grade">-->
<!--                                                  <el-select v-model="studyForm.grade" placeholder="请选择取得的学位" clearable  style="width: 88%">-->
<!--                                                    <el-option-->
<!--                                                      v-for="dict in degreeOptions"-->
<!--                                                      :key="dict.dictValue"-->
<!--                                                      :label="dict.dictLabel"-->
<!--                                                      :value="dict.dictValue"-->
<!--                                                    />-->
<!--                                                  </el-select>-->
<!--                                                </el-form-item>-->
<!--                                                <el-form-item label="起始年月:" prop="startTime">-->
<!--                                                    <el-date-picker v-model="studyForm.startTime" key="qwe" type="date"-->
<!--                                                                    value-format="yyyy-MM-dd HH:mm:ss"-->
<!--                                                                    placeholder="请输入起始年月"-->
<!--                                                                    style="width: 88%"-->
<!--                                                    ></el-date-picker>-->
<!--                                                </el-form-item>-->
<!--                                                <el-form-item label="结束年月:" prop="finishTime">-->
<!--                                                    <el-date-picker v-model="studyForm.finishTime" key="ewq" type="date"-->
<!--                                                                    value-format="yyyy-MM-dd HH:mm:ss"-->
<!--                                                                    placeholder="请输入结束年月"-->
<!--                                                                    style="width: 88%"></el-date-picker>-->
<!--                                                </el-form-item>-->
<!--                                                <el-form-item label="院校网址:" prop="webUrl">-->
<!--                                                    <el-input v-model="studyForm.webUrl" placeholder="请输入院校网址"-->
<!--                                                              style="width: 88%"/>-->
<!--                                                </el-form-item>-->
<!--                                            </el-form>-->
<!--                                            <div class="nextStep">-->
<!--                                                <el-button @click.native="closeDialog('studyForm')">取消</el-button>-->
<!--                                                <el-button type="primary" @click="studySubmit">保存</el-button>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                    </el-dialog>-->
<!--                                </div>-->
<!--                            </template>-->
<!--                        </el-tab-pane>-->
                        <el-tab-pane label="联系方式" name="four">
                            <div class="chooseType">
                                <div class="c66">请选择需要修改的联系方式：</div>
                                <el-radio-group v-model="radio" @change="radioChange">
                                    <el-radio label="1">手机号</el-radio>
                                    <el-radio label="2">邮箱</el-radio>
                                </el-radio-group>
                            </div>
                            <!-- 手机号注册模块 -->
                            <div v-show="radio === '1'" class="formBox">
                                <el-form ref="phoneTab" :model="phoneTab" :rules="phoneRules" label-width="80px">
                                    <el-form-item label="手机号:" prop="phone">
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
                                                @focus="commonFocusPhone('phoneTab','checkCode')"
                                        />
                                        <el-button @click="sendPhone" type="success" :disabled="!show">
                                            {{!show ? countText.count + '秒后重发' : countText.click}}
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                                <div class="nextStep">
                                    <el-button type="primary" style="width: 390px" @click="contactWaySubPhone">确认
                                    </el-button>
                                </div>
                            </div>
                            <!-- 邮箱注册模块 -->
                            <div v-show="radio === '2'" class="formBox">
                                <el-form ref="emailTab" :model="emailTab" :rules="emailRules" label-width="80px">
                                    <el-form-item label="邮箱:" prop="email">
                                        <el-input v-model="emailTab.email" placeholder="请输入电子邮箱"
                                                  />
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
                                        <el-button @click="sendEmail" type="success" :disabled="!showEmail">
                                            {{!showEmail ? countText.count + '秒后重发' : countText.click}}
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                                <div class="nextStep">
                                    <el-button type="primary" style="width: 390px" @click="contactWaySubEmail">确认
                                    </el-button>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import informationApi from '../../api/information/informationApi'
import personalUserInfoApi from '../../api/userRegister/personalUserInfoApi'
import { updataContentWay } from '@/api/personCenter/personCenter'

import moment from 'moment'


const TIME_COUNT = 180 //更改倒计时时间
let idNum = null
const walDefault = {
  abroadCountry: null,
  abroadType: null,
  abroadUniversity: null,
  nativeClass: null,
  grade: null,
  startTime: null,
  finishTime: null,
  webUrl: null,
  userId: null,
  id: null
}
export default {
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
    var validateIdNumber = (rule, value, callback) => {
      // 判断当前选择的证件类型是不是身份证
      if( this.baseFrom.cardType === '111'){
        if(!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/.test(value)){
          callback(new Error('身份证号码格式有误'))
        }
        else {
          // 是身份证号码的时候 计算性别和生日
          // 计算性别
          if(parseInt(value.substr(16,1)) % 2 == 1){
            this.baseFrom.gender = '1'
          }else{
            this.baseFrom.gender = '2'
          }
          // 计算生日
          let yearBirth = value.substring(6,10);
          let monthBirth = value.substring(10,12);
          let dayBirth = value.substring(12,14);
          this.baseFrom.dateOfBirth = yearBirth + '-' +monthBirth+ '-' +dayBirth
        }
      }
      if (!value){
        callback(new Error('证件号不能为空'))
      }
      if (idNum !== value){
        personalUserInfoApi.countByCardNo({ idnumber: value }).then(res => {
          debugger
          if (res.status !== 0) {
            //console.info(res)
            callback('证件号已经存在！');
          }else {
            callback()
          }
        });
      }else {
        callback();
      }
    }

    return {
      visible: false,
      zjLeiXing: false,
      genderBirth: false,
      spzInput: true, //生僻字展示div
      riskNameLabel: '未选择',
      nationalityList: [], //国籍
      cardTypeList: [], //证件类型
      nationOptions: [], //民族
      lastSchoolOptions: [], //最后学历
      healthStatusOptions: [],//健康状况
      marriageNewOptions: [], //婚姻状态
      politicalOptions: [], //政治面貌
      nationalityOptions: [], //国家列表
      degreeOptions: [], //取得学位列表
      usersexOptions: [], //性别列表
      title: '',
      liuTitle:'',
      form: '',
      open: false,
      activeName: 'first',
      // L用来控制 只读
      nationalityL :'',
      cardTypeL : '',
      cardNoL :'',
      baseFrom: {
        userName: '',
        nickName: '',
        gender: '',
        nationality: '',
        cardType: '',
        cardNo: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        userId: '',
        authlevel: ''
      },
      extendFrom: {
        nation: '',
        healthStatus: '',
        marriageNew: '',
        nativePlace: '',
        placeOfBirth: '',
        political: '',
        lastScjool: '',
        userId: ''
      },
      studyForm: {
        id: '',
        abroadCountry: '',
        abroadType: '',
        abroadUniversity: '',
        nativeClass: '',
        grade: '',
        startTime: '',
        finishTime: '',
        webUrl: '',
        userId: ''
      },
      baseRules: {
        userName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        // nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        nationality: [{ required: true, message: '请选择国家/地区', trigger: 'blur' }],
        cardType: [{ required: true, message: '请选择证件类型', trigger: 'blur' }],
        cardNo: [{ required: true,  validator: validateIdNumber,trigger: 'blur' }],
        dateOfBirth: [{ required: true, message: '请输入生日', trigger: 'blur' }]

      },
      extendRules: {
        nation: [{ required: true, message: '请输入民族', trigger: 'blur' }],
        healthStatus: [
          { required: true, message: '请输入健康状况', trigger: 'blur' },
          { min: 0, max: 2, message: '健康状况不能超过2个字！', trigger: 'blur' }
        ],
        marriageNew: [
          { required: true, message: '请输入婚姻状况', trigger: 'blur' },
          { min: 0, max: 2, message: '婚姻状况不能超过2个字！', trigger: 'blur' }
        ],
        nativePlace: [
          { required: true, message: '请输入籍贯', trigger: 'blur' },
          { min: 0, max: 50, message: '健康状况不能超过50个字！', trigger: 'blur' }
        ],
        placeOfBirth: [
          { required: true, message: '请输入出生地', trigger: 'blur' },
          { min: 0, max: 50, message: '出生地不能超过50个字！', trigger: 'blur' }
        ],
        political: [
          { required: true, message: '请输入政治面貌', trigger: 'blur' },
          { min: 0, max: 10, message: '政治面貌不能超过10个字！', trigger: 'blur' }
        ],
        lastScjool: [
          { required: true, message: '请输入最后学历', trigger: 'blur' },
          { min: 0, max: 25, message: '最后学历不能超过25个字！', trigger: 'blur' }
        ]
      },
      studyRules: {
        abroadCountry: [
          { required: true, message: '请输入留学国家', trigger: 'blur' },
          { min: 0, max: 75, message: '留学国家不能超过75个字！', trigger: 'blur' }
        ],
        abroadType: [
          { required: true, message: '请输入留学类别', trigger: 'blur' },
          { min: 0, max: 75, message: '留学国家不能超过75个字！', trigger: 'blur' }
        ],
        abroadUniversity: [
          { required: true, message: '请输入留学院校', trigger: 'blur' },
          { min: 0, max: 100, message: '留学院校不能超过100个字！', trigger: 'blur' }
        ],
        nativeClass: [
          { required: true, message: '请输入所在系/院', trigger: 'blur' },
          { min: 0, max: 100, message: '所在系/院不能超过100个字！', trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '请输入取得学位', trigger: 'blur' },
          { min: 0, max: 100, message: '取得学位不能超过100个字！', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请输入起年月', trigger: 'blur' }
        ],
        finishTime: [
          { required: true, message: '请输入结束年月', trigger: 'blur' }
        ],
        webUrl: [
          { required: true, message: '院校网址', trigger: 'blur' },
          { min: 0, max: 500, message: '院校网址不能超过500个字符！', trigger: 'blur' }
        ]
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
        ]
      },
      tableData: [],
      //手机号或者邮箱注册，默认手机号注册
      radio: '1',
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
      countText: {
        count: '180',
        click: ' 获取验证码 '
      },
      xianshi: true,
      //发送短信用到的参数
      show: true, // 初始启用按钮
      count: '', // 初始化次数
      timer: null,
      showEmail: true
    }
  },
  mounted() {
    this.$set(this.baseFrom,'dateOfBirth', this.baseFrom.dateOfBirth)
    this.queryInfo()
    this.queryExtendInfo()
    this.getNationalityList()
    this.getCardTypeList()
    this.queryAbroafdstudyInfo()
    //查询最后的学历
    this.getDicts('last_school').then(response => {
      this.lastSchoolOptions = response.data
    })
    //查询健康状况
    this.getDicts('health_status').then(response => {
      this.healthStatusOptions = response.data
    })
    //查询婚姻状态
    this.getDicts('marriage_new').then(response => {
      this.marriageNewOptions = response.data
    })
    //查询政治面貌
    this.getDicts('political').then(response => {
      this.politicalOptions = response.data
    })
    //查询民族
    this.getDicts('user_nation').then(response => {
      this.nationOptions = response.data
    })
    //查询取得学位
    this.getDicts('degree').then(response => {
      this.degreeOptions = response.data
    })
    //查询性别
    this.getDicts('sys_user_sex').then(response => {
      this.usersexOptions = response.data
    })
  },
  methods: {
    //查询基本信息
    queryInfo() {
      informationApi.queryInfo(this.baseFrom).then(res => {
        this.baseFrom = res.data
        this.comeFunction()
        idNum = res.data.cardNo
        //console.log('1111111111'+res.data.dateOfBirth)
        if(res.data.cardType ==='111' && res.data.cardNo != null && res.data.cardNo != undefined){
          this.baseFrom.dateOfBirth = this.FormatIdNumber(res.data.cardNo)
        }
        else if (res.data.dateOfBirth !== undefined &&  res.data.dateOfBirth !== '') {
          this.baseFrom.dateOfBirth =  new Date(res.data.dateOfBirth)
        }

        this.emailTab.email = res.data.email
        this.phoneTab.phone = res.data.phone

        if (res.data.cardType ==='111'){
          this.genderBirth = true
          this.zjLeiXing = true
        }
         this.nationalityL = res.data.nationality
         this.cardTypeL = res.data.cardType
         this.cardNoL = res.data.cardNo
        if (res.status !== 0) {
          this.$message({
            type: 'error',
            message: '获取基本信息失败,请您重试!'
          })
        }
      })
    },
    onSubmit() {
      this.$refs['baseFrom'].validate((valid) => {
        if (valid) {
          informationApi.updateInfo(this.baseFrom).then(res => {
            // this.baseFrom.dateOfBirth = res.data.dateOfBirth
            if (res.status === 0) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.queryInfo()
            } else {
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            }
          })
        }
      })
    },
    // 通过证件号获取生日
    FormatIdNumber(idNumber){
      // 计算生日
      let yearBirth = idNumber.substring(6,10);
      let monthBirth = idNumber.substring(10,12);
      let dayBirth = idNumber.substring(12,14);
      return  yearBirth + '-' +monthBirth+ '-' +dayBirth
    },
    //查询扩展信息
    queryExtendInfo() {
      informationApi.queryExtendCount(this.extendFrom).then(res => {
        if (res.status === 10027) {
          console.log('用户未填写过扩展信息')
        } else {
          informationApi.queryExtendInfo(this.extendFrom).then(res => {
            this.extendFrom = res.data
          })
        }
      })

    },
    //扩展信息 保存
    extendSubmit() {
      this.$refs['extendFrom'].validate((valid) => {
        if (valid) {
          informationApi.saveOrUpdate(this.extendFrom).then(res => {
            //新增，修改用户扩展信息
            if (res.status === 10026) {
              this.$message({
                type: 'warning',
                message: res.message
              })
              this.queryExtendInfo()
            } else if (res.status === 0) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    //新增留学经历
    studySubmit() {
      this.$refs['studyForm'].validate((valid) => {
        if (valid) {
          //判断用户是注册还是修改  如果id存在则为修改
          //console.log(console.studyForm)
          if (this.studyForm.id) {
            informationApi.updateAbroafdstudyInfo(this.studyForm).then(res => {
              if (res.status === 0) {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
                this.$refs['studyForm'].resetFields()
                this.open = false
                this.queryAbroafdstudyInfo()
              } else {
                this.$message({
                  type: 'warning',
                  message: '操作失败'
                })
              }
            })
          } else {
            informationApi.insertAbroafdstudyInfo(this.studyForm).then(res => {
              if (res.status === 0) {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
                this.$refs['studyForm'].resetFields()
                this.open = false
                this.queryAbroafdstudyInfo()
              } else if (res.status === 10028) {
                this.$message({
                  type: 'warning',
                  message: res.message
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '系统出错请您刷新界面重试'
                })
              }
            })
          }

        }
      })
    },
    //编辑留学经历
    editStudy(index, row) {
      //回显留学经历信息
      informationApi.queryAbroafdstudyInfoById({ id: row.id }).then(res => {
        this.studyForm = res.data
        this.open = true
        this.title = '修改留学经历'
      })
    },
    //查询留学经历
    queryAbroafdstudyInfo() {
      informationApi.queryAbroafdstudyInfo(this.studyForm).then(res => {
        this.tableData = res.data
      })
    },
    //删除留学经历
    deleteAbroafdstudyInfoById(index, row) {
      this.$confirm('是否确认删除？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        informationApi.deleteAbroafdstudyInfoById({ id: row.id }).then(res => {
          if (res.status === 0) {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
          }
          this.queryAbroafdstudyInfo()
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        this.$message({
          type: 'info',
          message: '删除取消'
        })
      })

    },
    closeDialog() {
      this.studyForm = Object.assign({}, walDefault)
      this.$refs.studyForm.resetFields()
      this.open = false
    },
    //查询国籍信息
    getNationalityList() {
      personalUserInfoApi.queryNationality().then(res => {
        if (res.status === 0) {
          this.nationalityList = res.data
        } else {
          console.log(1)
        }
      })
    },
    //国籍国别/地区 分区信息展示
    nationalityLabel(prop) {
      this.baseFrom.cardType = ''
      for (let i = 0; i < this.nationalityList.length; i++) {
        if (this.nationalityList[i].values === prop) {
          this.riskNameLabel = this.nationalityList[i].label
        }
      }
      if (prop === 'CHN') {
        this.cardTypeList = [{ values: '111', label: '身份证' }]
        this.baseFrom.cardType = '111'
        this.zjLeiXing = true
        this.genderBirth = true
      } else if (prop === 'HKG') {
        this.cardTypeList = [
          { values: '516', label: '港澳居民来往内地通行证' },
          { values: '906', label: '香港永久性居民身份证' }
          ]
        this.baseFrom.cardType = '516'
        this.zjLeiXing = false
        this.genderBirth = false
      } else if (prop === 'MAC') {
        this.cardTypeList = [
          // { values: '156', label: '港澳居民来往内地居住证' },
          {
          values: '516',
          label: '港澳居民来往内地通行证'
        }, { values: '903', label: '澳门永久性居民身份证' }]
        this.baseFrom.cardType = '516'
        this.zjLeiXing = false
        this.genderBirth = false
      } else if (prop === 'TWN') {
        this.cardTypeList = [
          // { values: '155', label: '台湾居民来往内地居住证' },
          {
          values: '511',
          label: '台湾居民来往内地通行证'
        }, { values: '907', label: '台湾居民身份证' }]
        this.baseFrom.cardType = '511'
        this.zjLeiXing = false
        this.genderBirth = false
      } else {
        this.cardTypeList = [{ values: '414', label: '普通护照' },
          // { values: '553', label: '外国人永久居留身份证' }
          ]
        this.baseFrom.cardType = '414'
        this.zjLeiXing = false
        this.genderBirth = false
      }
    },
    //获取身份类型列表
    getCardTypeList() {
      personalUserInfoApi.queryCardType().then(res => {
        if (res.status === 0) {
          this.cardTypeList = res.data
        }
        if (this.baseFrom.nationality === 'CHN') {
          this.cardTypeList = [{ values: '111', label: '身份证' }]
        } else if (this.baseFrom.nationality === 'HKG') {
          this.cardTypeList = [
            { values: '516', label: '港澳居民来往内地通行证' },
            { values: '906', label: '香港永久性居民身份证' }
            // { values: '156',label: '港澳居民来往内地居住证' },
            ]
        } else if (this.baseFrom.nationality=== 'MAC') {
          this.cardTypeList = [
            // { values: '156', label: '港澳居民来往内地居住证' },
            { values: '516', label: '港澳居民来往内地通行证' },
            { values: '903', label: '澳门永久性居民身份证' }]
        } else if (this.baseFrom.nationality === 'TWN') {
          this.cardTypeList = [
            // { values: '155', label: '台湾居民来往内地居住证' },
            { values: '511', label: '台湾居民来往内地通行证' },
            { values: '907', label: '台湾居民身份证' }]
        } else {
          this.cardTypeList = [{ values: '414', label: '普通护照' },
            // { values: '553', label: '外国人永久居留身份证' }
          ]
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
    handleClick(tab, event) {
      console.log(tab, event)
      this.$refs['baseFrom'].clearValidate()
      this.$refs['extendFrom'].clearValidate()
      this.$refs['phoneTab'].clearValidate()
      this.$refs['emailTab'].clearValidate()
    },
    // 时间控件的转换
    dateFormat(row, column, cellValue, index) {
      var date = row[column.property]
      if (date === undefined || date === null) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD')
    },
    addLine() { //添加行数
      this.studyForm = Object.assign({}, walDefault)
      this.open = true
      this.title = '添加留学经历'
    },
    /**
     * 切换 注册方式的时候 清空校验
     */
    radioChange() {
      console.log('切换注册方式')
      this.$refs.phoneTab.clearValidate()
      this.$refs.emailTab.clearValidate()
    },
    // 光标移出时
    commonFocusPhone(phoneTab, checkCode) {//form名、当前值的名
      this.$refs.phoneTab.clearValidate(checkCode)
    },
    commonFocusEmail(emailTab, checkCode) {//form名、当前值的名
      this.$refs.emailTab.clearValidate(checkCode)
    },
    sendPhone() {
      if (this.phoneTab.phone === '') {
        this.$message({
          type: 'warning',
          message: '请填写手机号'
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
        phone: this.phoneTab.phone
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
        //     message: '，请您重新发送'
        //   })
        //   this.show = true
        // }
      })
    },
    sendEmail() {
      if (this.emailTab.email === '') {
        this.$message({
          type: 'warning',
          message: '请填写邮箱'
        })
        return false
      }

      if (!this.timer) {
        this.countText.count = TIME_COUNT
        this.showEmail = false
        this.timer = setInterval(() => {
          if (this.countText.count > 0 && this.countText.count <= TIME_COUNT) {
            this.countText.count--
          } else {
            this.showEmail = true
            clearInterval(this.timer) // 清除定时器
            this.timer = null
          }
        }, 1000)
      }
      const queryParam = {
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
        //     message: '，请您重新发送'
        //   })
        //   this.showEmail = true
        // }
      })
    },

    // 执行修改联系方式方法
    contactWaySubPhone() {
      this.$refs.phoneTab.validate((valid) => {
        if (valid) {
          updataContentWay(this.phoneTab.phone, this.phoneTab.checkCode).then(res => {
            if (res.code === 500) {
              this.$message({
                type: 'warning',
                message: res.msg
              })
            } else {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 执行修改联系方式方法
    contactWaySubEmail() {
      this.$refs.emailTab.validate((valid) => {
        if (valid) {
          updataContentWay(this.emailTab.email, this.emailTab.checkCode).then(res => {
            if (res.code === 500) {
              this.$message({
                type: 'warning',
                message: res.msg
              })
            } else {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    enter(prop) {
      if (this.baseFrom.userName === null || this.baseFrom.userName === '') {
        document.getElementById('spzName').innerHTML = ''
      }
      this.baseFrom.userName = this.baseFrom.userName + '/' + prop
      var ul = document.getElementById('spzName')
      //添加 img
      var img = document.createElement('img')
      img.setAttribute('id', 'imgNew')
      const queryParam = {
        spz: this.baseFrom.userName
      }
      personalUserInfoApi.querySpz(queryParam).then(res => {
        var spzPathList = res.data
        //转为可以遍历的对象
        for (var i = 0; i < spzPathList.length; i++) {
          img.src = spzPathList[i]
          ul.appendChild(img)
        }
      })
    },
    focusDiv() {
      this.spzInput = true
    },
    comeFunction() {
      // if (this.baseFrom.userName.length<2){
      //   this.$message({
      //     type: 'warning',
      //     message: '真实姓名不能低于两个汉字'
      //   })
      // }
      if (this.baseFrom.userName !== null && this.baseFrom.userName !== '') {
        //获取姓名中的中文
        this.chinaName = this.baseFrom.userName
        var result = this.chinaName.split('/')
        var newresult = []
        // var newEng = []
        console.log(result)
        //获取名字中的中文字
        for (var i = 0; i < result.length; i++) {
          newresult.push(result[i])
        }
        console.log(">>>>>>>>>>>>>>>>>"+newresult)
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
          spz: this.baseFrom.userName
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
      }
    }
  }
}
</script>

<style scoped>

    .box {
        background: #fff;
        box-shadow: 2px 0px 12px #dedede;
        height: 700px;
        position: relative;
    }

    .formBox {
        width: 30%;
        margin-left: 35%;
        margin-top: 30px;
    }

    .nextStep {
        text-align: center;
        margin-top: 30px;
    }

    .formBoxStudy {
        width: 50%;
        margin-left: 30%;
    }

    .el-table >>> .gutter {
        display: unset !important;
    }

    .chooseType {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }

    .wrap {
        border-style: solid;
        border-color: #DCDFE6;
        border-width: 1px;
        text-align: center
    }
</style>
