//引入核心js
var fs = window.tgyc.fs;
var os = window.tgyc.os;
var exec = window.tgyc.exec;
var spawn = window.tgyc.spawn;
var crypto = window.tgyc.crypto;
var process = window.tgyc.process;

let csInterface = window.tgyc.csInterface;


// 引入主要文件
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//表格工具
// import xlsx from 'xlsx'


Vue.use(ElementUI);
// Vue.use(xlsx);


// 全局样式
import "@/assets/css/index.css"
import "@/assets/css/style.css"
import "video.js/dist/video-js.min.css"

import Contextmenu from "vue-contextmenujs"
Vue.use(Contextmenu);


//引入公共函数
import tgycfc from '@/pages/components/tgycFc/index.js'
// 引入网络接口
import prapi from '@/api/index.js'


// //引入vuex
import store from '@/store/index.js'
// //引入路由数据
import router from '@/router/index.js'

// //引入axios
import axios from '@/axios/index.js'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)


import App from './App.vue'



//获取项目路径（根目录真实路径）
var loc = window.location.pathname;
var dir = decodeURI(loc.substring(1, loc.lastIndexOf('/')));
console.log(dir)

var cepPath = dir;
var cepPathIndex = cepPath.lastIndexOf('/');
if (cepPathIndex > -1) {
	var cepPath = cepPath.slice(0, cepPathIndex);
	console.log(cepPath)
};






function decode(text,key){
	var secret = key;
	var decipher = crypto.createDecipher('aes-256-cbc',secret);
	var dec=decipher.update(text,'hex','utf8');
	dec+= decipher.final('utf8');//解密之后的值
	// console.log(dec);
	return dec;
};



// console.log(element );

const assetBaseUrl = 'http://tpi.tgyc.com';
const videoBaseUrl = 'http://assetp.tgyc.com';

// 切图插件
// var VueCropper = require('vue-cropper').VueCropper;
import VueCropper from 'vue-cropper'
// import 'cropperjs/dist/cropper.css';
// console.log(VueCropper)
// const ImgCropper = requirer(dir + "/src/layout/imgcropper/index.js")
Vue.use(VueCropper);

Vue.prototype.$ASSETBASEURL = assetBaseUrl;
Vue.prototype.$VIDEOBASEURL = videoBaseUrl;

Vue.prototype.$TGYC = tgycfc;
Vue.prototype.$PRAPI = prapi;
Vue.prototype.$CSINTERFACE = csInterface;
Vue.prototype.$FS = fs;
Vue.prototype.$OS = os;
Vue.prototype.$DIR = dir;
Vue.prototype.$CEPPATH = cepPath;
Vue.prototype.$EXEC = exec;
Vue.prototype.$SPAWN = spawn;
Vue.prototype.$CRYPTO = crypto;
Vue.prototype.$PROCESS = process;



import Viewer from "v-viewer"
import 'viewerjs/dist/viewer.css'
// const Viewer  = require('v-viewer'); 

Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
});


// console.log(router);
var app = new Vue({
    router,
    store,
	axios,
    data: {
        
    },
	render: h => h(App),
    created: function()  {
		// router.push({ path: '/seting/setDisk' })
		// console.log(this)
		
		// 检查两项配置文件是否存在
		// C:/TGYC/appData/config.json
		// C:/TGYC/appData/project.json

		// this.$FS.stat("P:", (err, stats) => {
		// 	if(stats==undefined){
		// 		// console.log('不存在');
		// 		router.push({ path: '/seting/setDisk' });
		// 	}else{
		// 		// console.log('已存在');
		// 		this.myinit();
		// 	};
		// });
		this.myinit();
		
		// this.testP()
    },
	components: {
	  // ImgCropper,
	},
	mounted() {
	  window.oncontextmenu = function (e) {
	    //取消默认的浏览器自带右键 很重要！！
	    e.preventDefault();
	  };
	},
    methods: {
		myinit(){
			// console.log("33333333")
			// console.log(this.$router)
			// console.log("444444444")
			//判断文件是否能找到
			this.$FS.stat('C:/TGYC/appData/config.json', (err, stats) => {
				if (!err) {
					//引入配置文件
					var sysConfig = this.$FS.readFileSync('C:/TGYC/appData/config.json', 'utf8');
					// console.log("登录信息")
					// console.log(sysConfig)
					if(sysConfig!=''){
						sysConfig = this.decode(sysConfig,'kasdjlasdjlasfhh');
						// console.log(sysConfig)
						var currentConfig = sysConfig==''||sysConfig==undefined||sysConfig=='undefined' ? {} : JSON.parse(sysConfig);
						this.$store.commit('setUserInfo',currentConfig);
						this.$router.push({ path: '/index/project/index' });
					}else{
						this.$router.push({ path: '/login' });
					};
				} else {
					// console.log('文件未找到')
					this.$router.push({ path: '/login' });
				};
			});
		},
        reloadwindow:function(){
            window.location.reload();
        },
		decode(text,key){
			var secret = key;
			var decipher = crypto.createDecipher('aes-256-cbc',secret);
			var dec=decipher.update(text,'hex','utf8');
			dec+= decipher.final('utf8');//解密之后的值
			// console.log(dec);
			return dec;
		},
    },
}).$mount('#app');






