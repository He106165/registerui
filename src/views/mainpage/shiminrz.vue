<template>
    <div>
        <el-container>
            <el-main>
                <div class="box" style="text-align: center;padding-left: 20px">
                    <h3 style="padding-bottom: 20px"><span></span>查看实名状态</h3>
                    <div slot="tip" style="color: red;padding-bottom: 20px;padding-top: 20px">
                        （提示：证件号非身份证号的用户，暂无需进行实名认证，不会影响办理政务服务业务。）
                    </div>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column label="姓名" prop="userName" align="center">
                        </el-table-column>
                        <el-table-column label="身份证" prop="cardNo" align="center">
                        </el-table-column>
                        <el-table-column label="状态" prop="authlevel" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.authlevel === '2'" style="color: red">未认证</span>
                                <span v-if="scope.row.authlevel === '3'" style="color: green">已认证</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <!--<el-button v-if="scope.row.authlevel === '2'" type="primary"-->
                                           <!--@click="handleEdit">立即认证-->
                                <!--</el-button>-->
                                <el-button v-if="scope.row.authlevel === '2'" type="primary"
                                           @click="uploadXinxi"
                                >人工实名认证
                                </el-button>
                                <el-button v-if="scope.row.authlevel === '3'" type="success"
                                >已经认证
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-dialog :title="title" :visible.sync="open" width="750px" :close-on-click-modal="false"
                               append-to-body @close="closeDialog">
                        <div class="formBoxStudy">
                            <el-form ref="authenticationFrom" :model="authenticationFrom" :rules="authRules"
                                     label-width="75px">
                                <el-form-item label="姓名:" prop="userName">
                                    <el-input v-model="authenticationFrom.userName" placeholder="请输入姓名" disabled/>
                                </el-form-item>
                                <el-form-item label="证件号:" prop="cardNo">
                                    <el-input v-model="authenticationFrom.cardNo" placeholder="请输入证件号" disabled/>
                                </el-form-item>
                            </el-form>
                            <div class="nextStep">
                                <el-button @click.native="closeDialog('authenticationFrom')">取消</el-button>
                                <el-button type="primary" @click="studySubmit">认证</el-button>
                            </div>
                        </div>
                    </el-dialog>
                    <el-dialog :title="titleXinxi" :visible.sync="openXinxi" width="800px" :close-on-click-modal="false"
                               append-to-body @close="closeDialogXinxi">
                        <div class="formBoxStudy1">
                            <div slot="tip" style="color: red;">
                                1、证件类型为非身份证号的，请不要申请人工实名认证。
                                2、证件类型为身份证的用户，请先前往“信息维护”界面完善信息，系统将自动完成实名认证。如特殊情况无法自动完成实名，可通过人工审核完成实名。
                            </div>
                            <el-form ref="authenticationXinxiFrom" :rules="xinxiRules" :model="authenticationXinxiFrom"
                                     label-width="105px" style="padding-top: 20px">
                                <el-form-item label="姓名:" prop="userName">
                                    <el-input v-model="authenticationXinxiFrom.userName" clearable disabled style="width: 90%"
                                              placeholder="请输入姓名"/>
                                </el-form-item>
                                <el-form-item label="证件号:" prop="cardNo">
                                    <el-input v-model="authenticationXinxiFrom.cardNo" clearable disabled style="width: 90%"
                                              placeholder="请输入证件号"/>
                                </el-form-item>
                                <el-form-item label="手机号:" prop="phone">
                                    <el-input v-model="authenticationXinxiFrom.phone" clearable disabled style="width: 90%"
                                              placeholder="请输入手机号"/>
                                </el-form-item>
                                <el-form-item label="性别:" prop="gender">
                                    <el-select v-model="authenticationXinxiFrom.gender"
                                               placeholder="请选择" clearable style="width: 90%" disabled>
                                        <el-option
                                                v-for="dict in usersexOptions"
                                                :key="dict.dictValue"
                                                :label="dict.dictLabel"
                                                :value="dict.dictValue"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="生日:" prop="dateOfBirth">
                                    <el-date-picker v-model="authenticationXinxiFrom.dateOfBirth" clearable type="date"
                                                    placeholder="选择日期"
                                                    style="width: 90%" value-format="yyyy-MM-dd" disabled></el-date-picker>
                                </el-form-item>
                                <el-form-item label="手持身份证人像面照片:" prop="frontPic">
                                    <el-upload
                                            class="upload-demo"
                                            ref="frontPic"
                                            accept="image/png, image/jpeg"
                                            name="file"
                                            :action="imgUploadAPI"
                                            :before-upload="beforeAvatarUpload"
                                            :on-success="handleSuccess"
                                            :before-remove="beforeRemove"
                                            :on-remove="handleRemoveFront"
                                            :on-preview="handlePictureCardPreview"
                                            :limit="1"
                                            :on-exceed="handleExceed"
                                            list-type="picture">
                                        <el-button size="small" type="primary" @click="uploadSign=1">选取文件
                                        </el-button>
                                        <div slot="tip" class="el-upload__tip" style="color: red">
                                            只能上传jpg/png格式的文件且大小不超过1M
                                        </div>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="手持身份证国徽面照片:" prop="reversePic">
                                    <el-upload
                                            class="upload-demo"
                                            ref="reversePic"
                                            accept="image/png, image/jpeg"
                                            name="file"
                                            :action="imgUploadAPI"
                                            :before-upload="beforeAvatarUpload"
                                            :on-success="handleSuccess"
                                            :before-remove="beforeRemove"
                                            :on-remove="handleRemoveReverse"
                                            :on-preview="handlePictureCardPreview"
                                            :limit="1"
                                            :on-exceed="handleExceed"
                                            list-type="picture">
                                        <el-button size="small" type="primary" @click="uploadSign=2">选取文件
                                        </el-button>
                                        <div slot="tip" class="el-upload__tip" style="color: red">
                                            只能上传jpg/png格式的文件且大小不超过1M
                                        </div>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="身份证人像面照片:" prop="handPic">
                                    <el-upload
                                            class="upload-demo"
                                            ref="handPic"
                                            accept="image/png, image/jpeg"
                                            name="file"
                                            :action="imgUploadAPI"
                                            :before-upload="beforeAvatarUpload"
                                            :on-success="handleSuccess"
                                            :before-remove="beforeRemove"
                                            :on-remove="handleRemoveHand"
                                            :on-preview="handlePictureCardPreview"
                                            :limit="1"
                                            :on-exceed="handleExceed"
                                            list-type="picture">
                                        <el-button size="small" type="primary" @click="uploadSign=3">选取文件
                                        </el-button>
                                        <div slot="tip" class="el-upload__tip" style="color: red">
                                            只能上传jpg/png格式的文件且大小不超过1M
                                        </div>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="身份证国徽面照片:" prop="reverseIdPic">
                                    <el-upload
                                            class="upload-demo"
                                            ref="reverseIdPic"
                                            accept="image/png, image/jpeg"
                                            name="file"
                                            :action="imgUploadAPI"
                                            :before-upload="beforeAvatarUpload"
                                            :on-success="handleSuccess"
                                            :before-remove="beforeRemove"
                                            :on-remove="handleRemoveIdPic"
                                            :on-preview="handlePictureCardPreview"
                                            :limit="1"
                                            :on-exceed="handleExceed"
                                            list-type="picture">
                                        <el-button size="small" type="primary" @click="uploadSign=4">选取文件
                                        </el-button>
                                        <div slot="tip" class="el-upload__tip" style="color: red">
                                            只能上传jpg/png格式的文件且大小不超过1M
                                        </div>
                                    </el-upload>
                                </el-form-item>
                            </el-form>
                            <div class="nextStep1">
                                <el-button @click.native="closeDialogXinxi">取消</el-button>
                                <el-button type="primary" @click="submitXinxi">提交审核</el-button>
                            </div>
                        </div>
                    </el-dialog>
                </div>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import informationApi from '../../api/information/informationApi'

export default {
  data() {
    const frontPicType = (rule, value, callback) => {
      this.authenticationXinxiFrom.frontPic === '' || null ? callback('请上传手持身份证照片') : callback()
    }
    const reversePicType = (rule, value, callback) => {
      this.authenticationXinxiFrom.reversePic === '' || null ? callback('请上传手持身份证照片') : callback()
    }
    const handPicType = (rule, value, callback) => {
      this.authenticationXinxiFrom.handPic === '' || null ? callback('请上传手持身份证照片') : callback()
    }
    const reverseIdPicType = (rule, value, callback) => {
      this.authenticationXinxiFrom.reverseIdPic === '' || null ? callback('请上传手持身份证照片') : callback()
    }
    //姓名不能为null或者空
    var validateNull = (rule, value, callback) => {
      if (value === 'null' || value.indexOf(' ') !== -1) {
        callback(new Error('不能输入null、不能输入空格'))
      } else {
        callback()
      }
    }
    return {
      // imgUploadAPI: 'http://localhost:8006/upload', // 上传的图片服务器地址
      // imgUploadAPI: 'http://register.censoft.com.cn/api/dfs/upload', // 上传的图片服务器地址
      // imgUploadAPI: 'http://lxyzttest.cscse.edu.cn/api/dfs/upload', // 测试环境上传的图片服务器地址
      imgUploadAPI: 'http://lxyzt.cscse.edu.cn/api/dfs/upload', // 生产环境上传的图片服务器地址
      uninformation: '没绑定',
      information: '绑定',
      tableData: [
        {
          userName: '',
          cardNo: '',
          authlevel: '',
          userId: ''
        }
      ],
      authenticationFrom: {
        userName: '',
        cardNo: '',
        userId: ''
      },
      authenticationXinxiFrom: {
        userName: '', //姓名
        cardNo: '', //身份证号
        gender: '', //性别
        phone: '', //手机号
        dateOfBirth: '', //生日
        frontPic: '', //手持人正面
        reversePic: '', // 手持人国徽面
        handPic: '', //身份证正面
        reverseIdPic: '' //身份证国徽面
      },
      usersexOptions: [], //性别列表
      title: '',
      titleXinxi: '',
      open: false,
      openXinxi: false,
      dialogImageUrl: '',
      dialogVisible: false,
      authRules: {
        userName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        cardNo: [{ required: true, message: '请输入证件号', trigger: 'blur' }]
      },
      xinxiRules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 0, max: 2000, message: '名字不应超过2000个字符！', trigger: 'blur' },
          {
            pattern: /^[^`~!@#$^&()\+=<>?:"{}|\'\[\]·~！@#￥……&（）\+={}|《》？：“”【】‘’。]+$/,
            message: '输入内容包含非法字符'
          },
          { validator: validateNull, trigger: 'blur' }
          ],
        cardNo: [{ required: true, message: '请输入证件号', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        dateOfBirth: [{ required: true, message: '请输入生日', trigger: 'blur' }],
        frontPic: [
          { required: true, validator: frontPicType, trigger: 'change' }
        ],
        reversePic: [
          { required: true, validator: reversePicType, trigger: 'change' }
        ],
        handPic: [
          { required: true, validator: handPicType, trigger: 'change' }
        ],
        reverseIdPic: [
          { required: true, validator: reverseIdPicType, trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.queryRealNameInformation()
    this.queryPerInfo()
    //查询性别
    this.getDicts('sys_user_sex').then(response => {
      this.usersexOptions = response.data
    })
  },
  methods: {
    //查询实名信息
    queryRealNameInformation() {
      informationApi.queryRealNameInformation(this.authenticationFrom).then(res => {
        this.tableData[0].userName = res.data[0].userName
        this.tableData[0].cardNo = res.data[0].cardNo
        this.tableData[0].authlevel = res.data[0].authlevel
        this.authenticationFrom.userName = res.data[0].userName
        this.authenticationFrom.cardNo = res.data[0].cardNo
      })
    },
    //查询个人信息
    queryPerInfo(){
      informationApi.queryPerInfo(this.authenticationXinxiFrom).then(res =>{
        console.log(res)
        this.authenticationXinxiFrom.userName = res.data.userName
        this.authenticationXinxiFrom.cardNo = res.data.cardNo
        this.authenticationXinxiFrom.phone = res.data.phone
        this.authenticationXinxiFrom.gender = res.data.gender
        this.authenticationXinxiFrom.dateOfBirth = res.data.dateOfBirth
      })
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    // 判断上传文件类型
    beforeAvatarUpload: function(file) {
      // const me = this
      // const isJPG = file.type === 'jpg'
      // const isPNG = file.type === 'png'
      // if (!(isJPG || isPNG)) {
      //   me.$message.error('上传的文件只能是 JPG 或者是 PNG 格式的')
      // }
      const fileTypeList = ['PNG','JPG']
      const fileNameSuffix = file.name.toUpperCase().split('.').pop()
      if (!fileTypeList.includes(fileNameSuffix)) {
        this.$message({
          message: '只能上传jpg、png类型文件',
          type: 'warning'
        })
        return false
      }
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
        return false
      }
    },
    // 文件超出个数限制时的钩子
    handleExceed(file, fileList) {
      const me = this
      me.$message.warning('只能上传一个文件')
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file) {
      // debugger
      const me = this
      const sign = me.uploadSign
      // 判断 code 是否为  0    0 代表成功
      if (res.code === 0) {
        // 通过 sign 判断给相应的字段赋值
        if (sign === 1) {
          // 手持正面
          me.authenticationXinxiFrom.frontPic = res.url
        } else if (sign === 2) {
          // 手持背面
          me.authenticationXinxiFrom.reversePic = res.url
        } else if (sign === 3) {
          // 身份正面
          me.authenticationXinxiFrom.handPic = res.url
        } else if (sign === 4) {
          // 身份背面
          me.authenticationXinxiFrom.reverseIdPic = res.url
        }
      } else {
        // 失败回调
        me.$message.error(`${res.info}`)
        // 通过 sign 判断清空相应的列表 因为默认会显示出图片其实是失败了，容易造成用户误解
        if (sign === 1) {
          // 手持正面
          me.$refs.frontPic.clearFiles()
        } else if (sign === 2) {
          // 手持面
          me.$refs.reversePic.clearFiles()
        } else if (sign === 3) {
          // 身份背面
          me.$refs.handPic.clearFiles()
        } else if (sign === 4) {
          // 身份背面
          me.$refs.reverseIdPic.clearFiles()
        }
      }
      // 清空标记
      me.uploadSign = null
    },
    beforeRemove(file, fileList) {
      // 增加一个询问框
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 文件列表移除文件时的钩子 因为是三个组件所以便分开写了三个方法，写成一个带参数的试过了不行
    handleRemoveFront(file, fileList) {
      const me = this
      me.authenticationXinxiFrom.frontPic = ''
    },
    handleRemoveReverse(file, fileList) {
      const me = this
      me.authenticationXinxiFrom.reversePic = ''
    },
    handleRemoveHand(file, fileList) {
      const me = this
      me.authenticationXinxiFrom.handPic = ''
    },
    handleRemoveIdPic(file, fileList) {
      const me = this
      me.authenticationXinxiFrom.reverseIdPic = ''
    },
    // 重置表单
    resetForm(formName) {
      const me = this
      this.$refs[formName].resetFields()
      // 清空上传的文件
      // 手持正面
      me.$refs.frontPic.clearFiles()
      // 手持背面
      me.$refs.reversePic.clearFiles()
      // 身份证正面
      me.$refs.handPic.clearFiles()
      // 身份证背面
      me.$refs.reverseIdPic.clearFiles()
      me.authenticationXinxiFrom.userName = ''
      me.authenticationXinxiFrom.cardNo = ''
      me.authenticationXinxiFrom.gender = ''
      me.authenticationXinxiFrom.dateOfBirth = ''
      me.authenticationXinxiFrom.frontPic = ''
      me.authenticationXinxiFrom.reversePic = ''
      me.authenticationXinxiFrom.handPic = ''
      me.authenticationXinxiFrom.reverseIdPic = ''
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.open = true
      this.title = '用户实名认证'
    },
    uploadXinxi() {
      this.openXinxi = true
      this.titleXinxi = '人工实名认证'
    },
    //关闭实名认证界面
    closeDialog() {
      this.$refs.authenticationFrom.resetFields()
      this.open = false
    },
    //关闭上传实名认证信息界面
    closeDialogXinxi() {
      this.$refs['authenticationXinxiFrom'].resetFields()
      this.$refs.frontPic.clearFiles()
      this.$refs.reversePic.clearFiles()
      this.$refs.handPic.clearFiles()
      this.$refs.reverseIdPic.clearFiles()
      this.authenticationXinxiFrom.userName = ''
      this.authenticationXinxiFrom.cardNo = ''
      this.authenticationXinxiFrom.gender = ''
      this.authenticationXinxiFrom.phone = ''
      this.authenticationXinxiFrom.dateOfBirth = ''
      this.authenticationXinxiFrom.frontPic = ''
      this.authenticationXinxiFrom.reversePic = ''
      this.authenticationXinxiFrom.handPic = ''
      this.authenticationXinxiFrom.reverseIdPic = ''
      this.openXinxi = false
    },
    studySubmit() {
      this.$refs['authenticationFrom'].validate((valid) => {
        if (valid) {
          informationApi.authentication(this.authenticationFrom).then(res => {
            if (res.status === 0) {
              this.$message({
                type: 'success',
                message: '认证成功'
              })
              this.queryRealNameInformation()
              this.open = false
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
              this.queryRealNameInformation()
            }
          })
        }
      })
    },
    submitXinxi() {
      this.$refs['authenticationXinxiFrom'].validate(valid => {
        // 通过插件自定义全部规则已验证通过
        if (valid) {
          if (!this.authenticationXinxiFrom.frontPic) {
            this.$message.error('请上传您的手持身份证人像面照片')
            return false
          }
          if (!this.authenticationXinxiFrom.reversePic) {
            this.$message.error('请上传您的手持身份证国徽面照片')
            return false
          }
          if (!this.authenticationXinxiFrom.handPic) {
            this.$message.error('请上传您的身份证人像面照片')
            return false
          }
          if (!this.authenticationXinxiFrom.reverseIdPic) {
            this.$message.error('请上传您的身份证国徽面照片')
            return false
          }
          informationApi.insertRealIdentity(this.authenticationXinxiFrom).then(res => {
            if (res.status === 0) {
              this.$message({
                type: 'success',
                message: '提交身份审核成功!'
              })
              this.openXinxi = false
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
            }
          }).catch(error => {
            console.log(error)
            this.$message.error('请求服务器失败了，请稍后重试！')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
    body,
    html {
        margin: 0;
        padding: 0;
        height: 100%;
        min-height: 100%;
        background-color: #f5f5fa;
    }

    body > div,
    body > div > div {
        height: 100%;
    }

    .box {
        background: #fff;
        box-shadow: 2px 0px 12px #dedede;
        height: 600px;
        position: relative;
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

    .formBoxStudy1 {
        width: 50%;
        margin-left: 20%;
    }

    .nextStep {
        text-align: center;
        margin-top: 30px;
    }

    .nextStep1 {
        margin-left: 28%;
        margin-top: 30px;
    }

    p {
        margin-left: 20px;
    }
</style>
