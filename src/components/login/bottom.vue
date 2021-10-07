<template>
  <div>
      <div id="bottom">
          <div id="content">
                Copyright © 1996-2021  版权所有:中国留学服务中心
            <p>

            </p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc1:require("../../../public/logo1.png"),
    }
  },
}
</script>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  line-height: 100%;
}
#bottom{
    background: #ff0;
    height: 70px;
    line-height: 70px;
    width: 100%;
}
#content{
  width: 1001px;
  margin: 0 auto;
  text-align: center;
  color: #999999;
  font-size: 14px;
}
</style>
