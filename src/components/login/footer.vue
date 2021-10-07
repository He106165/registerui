<template>
  <el-row>
    <el-col :span="24">
      <div>
          <p>{{msg}}</p>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
    data() {
        return {
            msg: "Copyright © 1996-2021  版权所有:教育部留学服务中心"
        }
    },
};
</script>

<style scoped>
.el-col{
  height: 40px;
}
.el-row {
  margin-bottom: 0px;
}
.el-col {
  border-radius: 0px;
}
p{
  /*text-align: left;*/
  line-height: 60px;
  margin: 0;
  padding: 0;
  background: #fff;
  padding-left: 15px;
  color: #333333;
  font-size: 14px;
}
</style>
