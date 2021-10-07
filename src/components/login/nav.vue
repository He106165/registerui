<template>
  <div class="nav">
    <el-row class="tac">
      <el-col :span="24">
        <div class="logo"><img src="../../../public/logo.png" alt="" /></div>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#3658a7"
          text-color="#9bb2e2"
        >
          <el-menu-item
            v-for="(item, index) of tableData"
            :key="index"
            index="index"
            @click="clickCategory(item.url)"
            :class="[{ active: activeName == item }]"
          >
            <img :src="item.icons">
            <span slot="title">{{ item.content }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: '首页',
            tableData:[
              { icons: require("../../../public/sy.png"), content: "首页" ,url: ""},
              { icons: require("../../../public/22.png"), content: "信息维护（实名认证）" ,url: "xinxwh"},
              // { icons: require("../../../public/33.png"), content: "学位学历认证"  ,url: "xueweixl"},
              // { icons: require("../../../public/44.png"), content: "就业落户"  ,url: "jiuyelh"},
              // { icons: require("../../../public/55.png"), content: "留学存档"  ,url: "liuxuecd"},
              // { icons: require("../../../public/66.png"), content: "公派留学", url: "gongpailx"},
              // { icons: require("../../../public/77.png"), content: "平安留学培训"  ,url: "pinganlxpx"},
              { icons: require("../../../public/cart.png"), content: "查看实名状态" ,url: "shiminrz" },
              { icons: require("../../../public/accountbing.png"), content: "绑定第三方账号" ,url: "bangdingsf" },
            ]
        }
    },
  methods: {
    clickCategory(item){
      this.$router.push({path: '/'+ item})
    }
  },
};
</script>

<style scoped>
.el-menu-item {
  width: 220px;
}
.menu {
  background: #3658a7;
}
/* img{
    padding:5px 0 0 10px;
} */
.logo {
  margin: 6px 0 6px 25px;
}
.el-menu-vertical-demo li {
  padding-left: 20px !important;
  color: #9bb2e2;
  font-size: 15px;
}
.el-menu-item.is-active {
  color: #9bb2e2;
}
.el-menu-vertical-demo .active {
  border-left: 2px solid #37aef1;
  color: #fff !important;
  background-color: rgb(43, 70, 134) !important;
}
.el-menu-item img{
  padding-right:10px;
}
</style>
