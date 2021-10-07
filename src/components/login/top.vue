<template>
  <div>
      <div id="top">
          <div id="content">
            <img :src="imgSrc1" style="text-align:left"/>
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
#top{
    background: #2774b5;
    height: 70px;
    width: 100%;
}
#content{
  width: 1001px;
  margin: 0 auto;
}
</style>
