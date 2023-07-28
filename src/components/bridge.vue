<template>
  <div>
    <el-container>
      <el-aside width="70px">
        <el-menu
          :style="menuHei"
          :default-active="this.$router.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
           
              <el-menu-item index="/moreitem"> 万条数据滚动 </el-menu-item>
              <el-menu-item index="/moreTableitem"> 万条数据table </el-menu-item>
              <el-menu-item index="/test"> 单帧图片排查 </el-menu-item>
              <el-menu-item index="/video"> 座位表拖拽 </el-menu-item>
              <el-menu-item index="/"> 首页</el-menu-item>
              <el-menu-item index="/dingzhiVideoPlay"> 视频播放器</el-menu-item>
              <el-menu-item index="/fullcalendar"> 日历组件</el-menu-item>
              <el-menu-item index="/markDown"> markDown</el-menu-item>
              <el-menu-item index="/gantetu"> 甘特图 </el-menu-item>
              <el-menu-item index="/three"> three.js </el-menu-item>
              <el-menu-item index="/threeDemo"> three.jsDemo </el-menu-item>
              <el-menu-item index="/tableInfiniteScroll">
                element Table 无限滚动
              </el-menu-item>
              <el-menu-item index="/chatGpt"> CHATGPT地址版 </el-menu-item>
              <el-menu-item index="/chatGptEasy"> CHATGPT简易版 </el-menu-item>
              <el-menu-item index="/aiPicture"> AI绘画 </el-menu-item>
              <el-menu-item index="/serve"> 请求新服务 </el-menu-item>
              <el-menu-item index="/choseStartFrame">
                选择开始结束帧
              </el-menu-item>
              <el-menu-item index="/aiindex"> ai首页 </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/HeightJs">js处理</el-menu-item>
              <el-menu-item index="/HeightCss">css处理</el-menu-item>
              <el-menu-item index="/framePlayback"> 序列帧播放 </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-main>
        <div :style="menuHei" class="rowRight">
          <keep-alive>
            <router-view v-if="$route.meta.cache"></router-view>
          </keep-alive>
          <router-view
            v-if="!$route.meta.cache || $route.meta.cache == undefined"
          ></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: true,
      menuHei: "height:" + (window.innerHeight - 18) + "px",
    };
  },
  mounted() {},
  methods: {
    toclicktext() {
      fetch("http://localhost:3000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: "你好" }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style scoped >
.el-main {
  padding: 0px 0px;
}
.rowRight {
  overflow-y: auto;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>