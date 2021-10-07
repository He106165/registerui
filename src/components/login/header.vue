<template>
    <div>
        <el-row>
            <el-col :span="21">
                <div class="grid-content bg-purple">
                    <h2>{{msg}}</h2>
                </div>
            </el-col>
            <el-col :span="1">
                <div class="grid-content bg-purple">
                    <el-row class="demo-avatar demo-basic" style="height:60px">
                        <el-col :span="12">
                            <div class="demo-basic--circle">
                                <div class="block">
                                    <el-avatar :size="35" :src="circleUrl"></el-avatar>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    <el-dropdown>
                        <!--<span class="el-dropdown-link"  v-if="userInfo.userType === 'organ'  " >-->
                        <!--{{userInfo.enterpriseName}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                        <!--</span>-->

                        <!--<div id="spzName1" v-else>-->
                        <!--<span class="el-dropdown-link">-->
                        <!--{{userInfo.userName}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                        <!--</span>-->
                        <!--</div>-->
                        <div id="sss" v-if="userInfo.userType === 'organ'">
              <span class="el-dropdown-link">
              {{userInfo.enterpriseName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
                        </div>
                        <div id="spzName1" v-else>
              <span class="el-dropdown-link">
              {{userInfo.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="updataPwd">
                                修改密码
                            </el-dropdown-item>
                            <el-dropdown-item divided @click.native="logout"><span>退出登录</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>

        <!-- 修改密码 -->
        <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
            <el-form ref="user" :model="user" :rules="rules" label-width="180px">
                <el-row>
                    <el-col :span="19">
                        <el-form-item label="旧密码" prop="oldPassword">
                            <el-input v-model="user.oldPassword" placeholder="请输入旧密码" type="password"/>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newPassword" style="margin-bottom: 32px">
                            <el-input v-model="user.newPassword" placeholder="请输入新密码" type="password" />
                        </el-form-item>
                        <el-form-item label="确认密码" prop="confirmPassword">
                            <el-input v-model="user.confirmPassword" placeholder="请确认密码" type="password"/>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
import { checkToken, getInfo, updateUserPwd } from '@/api/login/proLogin'
import { setToken, removeToken } from '@/utils/auth'

export default {
  components: {},
  props: ['userInfo'],
  data() {

    const equalToPassword = (rule, value, callback) => {
      if (this.user.newPassword !== value) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      timer: null,
      open: false,
      form: {},
      title: null,
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      squareUrl:
        'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      sizeList: ['large', 'medium', 'small'],
      msg: '教育部留学服务中心统一用户身份认证系统',
      user: {
        oldPassword:'',
        newPassword:'',
        confirmPassword:''
      },
      // 表单校验
      rules: {
        oldPassword: [
          { required: true, message: '旧密码不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请创建8-18位密码，由数字、大小写字母或符号三种及以上组成', trigger: 'blur' },
          {
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\\\W_!@#$%^&*`~()-+=]{8,18}$/,
            message: '请创建8-18位密码，由数字、大小写字母或符号三种及以上组成'
          }

        ],
        confirmPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { required: true, validator: equalToPassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},

  //   //let time = 5 * 1000
  //   //30分钟后校验token
  //   let time = 30 * 60 * 1000
  //   this.timer = setInterval(()=>{
  //     this.checkSystemToken()
  //   },time)
  // },
  // beforeDestroy() {
  //   clearInterval(this.timer);
  //   this.timer = null;
  // },
  methods: {
    checkSystemToken() {
      // //刷新token方法，当返回值status 2 时需要更新token, 不为1时 说明 token已经失效 需要重新登陆
      // checkToken().then(res =>{
      //   console.info(res)
      //   if(res.status == '2' ){
      //     removeToken()
      //     setToken(res.newToken)
      //   } else if(res.status != '1'){
      //     removeToken()
      //     let me = this
      //     me.$router.push({path: '/'})
      //   }
      // }).catch(function (error){
      //   console.info(error)
      //   let me = this
      //   me.$router.push({path: '/'})
      // })
    },
    async updataPwd() {
      // this.form = this.user
      this.open = true
      this.title = '修改密码'
      this.user.password = ''
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/index'
        })
      })
    },
    submitForm() {
      this.$refs['user'].validate(valid => {
        if (valid) {
          updateUserPwd(this.user.oldPassword, this.user.newPassword).then(
            response => {
              console.info(response)
              if (response.code === 0) {
                this.msgSuccess('修改成功')
                this.open = false
              }
            }
          )
        }
      })
    },
    cancel() {
      this.open = false
      this.$refs['user'].resetFields()
      this.reset()
    },
    reset() {
      this.user.newPassword = ''
      this.user.oldPassword = ''
      this.user.confirmPassword = ''
    },
    comeFunctionHeader() {
      if (this.user.userName !== null && this.user.userName !== '') {
        //获取姓名中的中文
        this.chinaName = this.user.userName
        var result = this.chinaName.split('/')
        var newresult = []
        // var newEng = []
        console.log(result)
        //获取名字中的中文字
        for (var i = 0; i < result.length; i++) {
          newresult.push(result[i])
        }
        this.$nextTick(function() {
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
    }
  }
}
</script>
<style scoped>
    .el-row {
        margin-bottom: 0px;
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #fff;
    }

    .bg-purple {
        background: #fff;
    }

    .bg-purple-light {
        background: #fff;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #464555;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    h2 {
        margin: 0;
        text-align: left;
        color: #409ad7;
    }

    .el-avatar {
        margin-top: 12px;
    }

    .el-dropdown {
        height: 35px;
    }
</style>
