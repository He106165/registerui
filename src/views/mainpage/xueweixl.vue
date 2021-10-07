<template>
  <div>
    <el-container>
      <el-container>
        <el-main>
          <div class="box">
              <h3><span></span>学位学历认证</h3>
              <ul class="xwxl">
                <li v-for="item in ArrImg">
                <img :src="item.imgUrl"><br>
                <p>{{ item.content }}</p>
              </li>
              </ul>
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
       ArrImg:[
        { imgUrl: require("../../../public/xl.png"), content: "就读于美国耶鲁大学，统计学专业 ，取得硕士学位" },
        { imgUrl: require("../../../public/xl.png"), content: "就读于美国耶鲁大学，统计学专业 ，取得硕士学位" },
        { imgUrl: require("../../../public/xl.png"), content: "就读于美国耶鲁大学，统计学专业 ，取得硕士学位" },
        { imgUrl: require("../../../public/xl.png"), content: "就读于美国耶鲁大学，统计学专业 ，取得硕士学位" },
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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
.xwxl li{
  float: left;
  list-style: none;
  width: 235px;
  height: 242px;
  box-shadow:2px 0px 12px #eaeaea;
  margin-top:20px;
  margin-right:20px;
  font-size: 14px;
  color: #333;
  text-align: left;
}
.xwxl li p{
 margin:10px 8px;
 line-height: 20px;
}
</style>
