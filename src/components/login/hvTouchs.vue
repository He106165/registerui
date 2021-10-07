<template>
  <div class="jc-component__range">
    <div class="jc-range" :class="rangeStatus ? 'success' : ''">
      <i
        @mousedown="rangeMove"
        style="touch-action: none"
        class="iconfont"
        :class="rangeStatus ? successIcon : startIcon"
        v-if="isPC"
      ></i>
      <i
        @touchstart="rangeMoveIpad"
        style="touch-action: none"
        class="iconfont"
        :class="rangeStatus ? successIcon : startIcon"
      ></i>
      {{ rangeStatus ? successText : startText }}
    </div>
  </div>
</template>

<script>
export default {
  name: "JcRange",
  props: {
    // 成功之后的函数
    successFun: {
      type: Function,
    },
    //成功图标
    successIcon: {
      type: String,
      default: "el-icon-success",
    },
    //成功文字
    successText: {
      type: String,
      default: "验证成功",
    },
    //失败图标
    errorIcon: {
      type: String,
      default: "el-icon-d-arrow-right",
    },
    //开始的图标
    startIcon: {
      type: String,
      default: "el-icon-d-arrow-right",
    },
    //开始的文字
    startText: {
      type: String,
      default: "请拖住滑块，拖动到最右边",
    },
    //失败之后的函数
    errorFun: {
      type: Function,
    },
    //或者用值来进行监听
    status: {
      type: String,
    },
    userPhone: {
      type: String,
    },
  },
  data() {
    return {
      disX: 0,
      rangeStatus: false,
      isPC: false,
    };
  },
  created() {
    if (this.os() == "Tablet") {
      this.isPC = false;
    } else if (this.os() == "pc") {
      this.isPC = true;
    }
  },
  mounted() {},
  methods: {
    //是Tablet 或 pc
    os() {
      let ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        // isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet =
          /(?:iPad|PlayBook)/.test(ua) ||
          (isAndroid && !/(?:Mobile)/.test(ua)) ||
          (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
      if (isTablet) {
        return "Tablet";
      } else if (isPc) {
        return "pc";
      }
    },
    rangeMove() {
      this.rangeMoveIpad();
    },
    //滑块移动
    rangeMoveIpad(e) {
      let ele = e.target;
      let startX = e.changedTouches[0].clientX;
      let eleWidth = ele.offsetWidth;
      let parentWidth = ele.parentElement.offsetWidth;
      let MaxX = parentWidth - eleWidth;
      if (this.rangeStatus) {
        //不运行
        return false;
      }
      document.ontouchmove = (e) => {
        let endX = e.changedTouches[0].clientX;
        this.disX = endX - startX;
        if (this.disX <= 0) {
          this.disX = 0;
        }
        if (this.disX >= MaxX - eleWidth) {
          //减去滑块的宽度,体验效果更好
          this.disX = MaxX;
        }
        ele.style.transition = ".1s all";
        ele.style.transform = "translateX(" + this.disX + "px)";
        e.preventDefault();
      };
      document.ontouchend = () => {
        if (this.disX !== MaxX) {
          ele.style.transition = ".5s all";
          ele.style.transform = "translateX(0)";
          //执行成功的函数
          this.errorFun && this.errorFun();
        } else {
          this.rangeStatus = true;
          if (this.status) {
            this.$parent[this.status] = true;
          }
          //执行成功的函数
          this.successFun && this.successFun();
          this.$emit("child-event", this.rangeStatus);
        }
        document.ontouchmove = null;
        document.ontouchend = null;
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin jc-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.jc-component__range {
  .jc-range {
    background-color: #e9e9e9;
    position: relative;
    transition: 1s all;
    user-select: none;
    color: #585858;
    @include jc-flex;
    height: 35px; /*no*/
    &.success {
      background-color: #3bc923;
      color: #fff;
      i {
        color: #3bc923;
      }
    }
    i {
      position: absolute;
      left: 0;
      width: 60px; /*no*/
      height: 90%;
      color: #3fcd26;
      background-color: #fff;
      border: 1px solid #d8d8d8;
      cursor: pointer;
      font-size: 24px;
      @include jc-flex;
    }
  }
}
</style>
