<template>

</template>

<script>
  import { getToken, setToken, removeToken } from '@/utils/auth'
  import { getInfo } from '@/api/login/proLogin'
  export default {
    mounted () { //这个属性就可以，在里面声明初始化时要调用的方法即可
      // we can implement any method here like
      this.token = this.$route.query.token
      setToken(token);
      this.$router.push({ path: "/index" });
    }


  }
  </script>
