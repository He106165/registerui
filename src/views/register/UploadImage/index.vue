<template>
  <div class="component-upload-image">
    <el-upload
      :action="uploadImgUrl"
      list-type="picture-card"
      :on-success="handleUploadSuccess"
      :before-upload="handleBeforeUpload"
      :on-error="handleUploadError"
      accept=".jpg, .png"
      name="file"
      :show-file-list="false"
      :headers="headers"
      style="display: inline-block; vertical-align: top"
    >
      <img v-if="value" :src="value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div slot="tip" class="el-upload__tip" style="color: red">只能上传.jpg,.png格式的文件且大小不超过1M</div>
    </el-upload>
      <el-button type="text" @click="openShili">查看示例图片</el-button>
      <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";

export default {
  components: {},
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      // uploadImgUrl: process.env.VUE_APP_BASE_API + "/upload", // 上传的图片服务器地址
      // uploadImgUrl: 'http://localhost:8006/upload', // 上传的图片服务器地址
      // uploadImgUrl: 'http://register.censoft.com.cn/api/dfs/upload', // 上传的图片服务器地址
      // uploadImgUrl: 'http://lxyzttest.cscse.edu.cn/api/dfs/upload', // 测试环境上传的图片服务器地址
      uploadImgUrl: 'http://lxyzt.cscse.edu.cn/api/dfs/upload', // 生产环境上传的图片服务器地址
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    };
  },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleUploadSuccess(res) {
      this.$emit("input", res.url);
      this.loading.close();
    },
    handleBeforeUpload(file) {
      const fileTypeList = ['PNG','JPG']
      const fileNameSuffix = file.name.toUpperCase().split('.').pop()
      if (!fileTypeList.includes(fileNameSuffix)) {
        this.$message({
          message: '只能上传jpg、png类型文件',
          type: 'warning'
        })
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
        return false
      }
      this.loading = this.$loading({
        lock: true,
        text: "上传中",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    handleUploadError() {
      this.$message({
        type: "error",
        message: "上传失败",
      });
      this.loading.close();
    },
    openShili(){
       this.dialogImageUrl = require("../../../../public/cscseImg/smrz/868907.jpg");
      this.dialogVisible = true;
    }
  },
  watch: {},
};
</script>

<style scoped lang="scss">
.avatar {
  width: 100%;
  height: 100%;
}
</style>
