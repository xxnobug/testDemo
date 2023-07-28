// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import jsPlumb from 'jsplumb'
// import 'video.js/dist/video-js.css'
import Print from 'vue-print-nb'


Vue.use(Print);
Vue.config.productionTip = false
Vue.use(ElementUI);

import {
  UTable,
  UTableColumn
} from 'umy-ui'
Vue.component(UTable.name, UTable)
Vue.component(UTableColumn.name, UTableColumn)
// import VideoPlayer from 'vue-video-player'
// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
// Vue.use(VideoPlayer)
// const hls = require('videojs-contrib-hls')
// Vue.use(hls)
Vue.prototype.$jsPlumb = jsPlumb.jsPlumb

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
// 正式环境清除所有console.log
if (process.env.NODE_ENV === 'production') {
  if (window) {
    window.console.log = function () {};
  }
}
