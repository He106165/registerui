<template>
  <div>
    <el-container>
      <el-container>
        <el-main>
          <div class="box">
              <h3><span></span>公派留学</h3>
              <p>2020年10月20日   公派到美国</p>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    onSubmit() {
        console.log('submit!');
      }
  },
  components: {
  },
};
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
.el-header,
.el-footer {
  background-color: #ffffff;
  color: #333;
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
  text-align: left;
}
body > .el-container {
  margin-bottom: 40px;
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
p{
    margin-left:20px;
}
</style>
