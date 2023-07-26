<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        :style="menuHei"
        :default-active="activeTree"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleselect"
      >
        <el-menu-item index="http://ai.tgyc.com/">
          <i class="el-icon-menu"></i>
          <span slot="title">chatGpt</span>
        </el-menu-item>
        <el-menu-item index="http://192.168.1.233:7860/">
          <i class="el-icon-menu"></i>
          <span slot="title">AI绘画</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <div :style="menuHei" class="rowRight">
        <iframe
        v-show="ifameUrl== 'http://192.168.1.233:7860/'"
          src="http://192.168.1.233:7860/"
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
        <iframe
          v-show="ifameUrl== 'http://ai.tgyc.com/'"
          src="http://ai.tgyc.com/"
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </el-main>
  </el-container>
</template>;
<script>
export default {
  data() {
    return {
      ifameUrl: "",
      activeTree: "",
      menuHei: "height:" + (window.innerHeight - 18) + "px",
    };
  },
  mounted() {},
  methods: {
    handleselect(key, keyPath) {
      this.ifameUrl = key;
      console.log("触发");

      console.log(key, keyPath);

      console.log(this.activeTree);
    },
    handleOpen(key, keyPath) {
      this.ifameUrl = key;
      console.log(key, keyPath);

      console.log(this.activeTree);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style scoped >
</style>