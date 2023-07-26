<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
/* 滚动条的宽度 */
::-webkit-scrollbar {
  width: 7px;
  height: 10px;
}
/* 滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background-color: #c3c5c9;
  border-radius: 10px;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}

.zidingyiaudioStyle .el-slider__runway{
  height: 120px !important;
}
.zidingyicontrolBox .el-slider__button{
  width: 10px;
  height: 10px;
}
.viewer-transition {
  z-index: 3000 !important;
}
</style>
