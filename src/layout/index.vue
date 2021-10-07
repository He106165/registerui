<template>
    <el-container>
      <el-aside width="17%">
      <Nav v-if="userInfo.userType === 'personal'" v-bind:userInfo="userInfo"></Nav>
        <navorg v-if="userInfo.userType === 'organ'" v-bind:userInfo="userInfo"></navorg>
      </el-aside>
      <el-container>
        <el-header >
        <Header v-bind:userInfo="userInfo"></Header>
        </el-header>
        <app-main v-bind:userInfo="userInfo"></app-main>
      </el-container>
    </el-container>
</template>


<script>
import Header from "../components/login/header";
import Nav from "../components/login/nav";
import Navorg from "../components/login/nav_org";
import Footer from "../components/login/footer";
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar,BreadcrumbNav, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import { getInfo } from '@/api/login/proLogin'
import { removeToken } from '@/utils/auth'

export default {
  name: 'Layout',
  data() {
    return {
      currentData:'',
      userInfo:{}
    }
  },
  components: {
    AppMain,
    Navbar,
    BreadcrumbNav,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
    Header,
    Nav,
    Footer,
    Navorg
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
  },
  created(){
    getInfo().then(res=>{
      this.userInfo=res
    }).catch(error => {
      removeToken()
      this.$router.push({path: '/'})
    })
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    method1(path){
      this.currentData = path
      // console.log("当前值："+this.currentData)
    },
  },
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/mixin.scss";
  @import "~@/assets/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }
  aside {
    background: rgb(54, 88, 167);
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

</style>
