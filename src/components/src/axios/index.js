import {
	Message
} from 'element-ui';
import store from '@/store/index.js'
import axios from 'axios'

console.log("初始化路由拦截")


// 创建一个错误
function errorCreate(msg) {
	errorLog(msg)
}

// 记录和显示错误
function errorLog(err) {
	var that =  window.topVue
	console.log(err)
	if (err == "时间戳已过期") {
		// 路由跳转到登录页面
		that.$router.push({
			path: '/login'
		})
		Message.error("登录过期，请重新登录");
	} else if (err == "uid无效") {
		// 路由跳转到登录页面
		that.$router.push({
			path: '/login'
		})
		Message.error("登录过期，请重新登录");
	} else {
		Message.error(err);
	}
}


// 创建一个 axios 实例
const service = axios.create({
	baseURL: 'http://tpi.tgyc.com',
	timeout: 0, // 请求超时时间
	transformRequest: [function(data) {
		let ret = ''
		for (let it in data) {
			ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
		}
		return ret
	}],
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
})

// console.log(service)

// 请求拦截器
service.interceptors.request.use(
	config => {
		// console.log("发送请求")
		// 在请求发送之前做一些处理
		var token = store.state.userInfo.token
		var user = store.state.userInfo.id
		var userName = store.state.userInfo.name
		userName = encodeURI(userName)
		
		
		// var sysConfig = this.$FS.readFileSync('C:/TGYC/appData/config.json', 'utf8')
		// console.log("配置文件")
		// console.log(sysConfig)

		// if(sysConfig!=''){
		// 	sysConfig = decode(sysConfig,'kasdjlasdjlasfhh')
		// 	var currentConfig = sysConfig==''||sysConfig==undefined||sysConfig=='undefined' ? {} : JSON.parse(sysConfig)
		// 	token = currentConfig.token
		// 	user = currentConfig.id
		// 	userName = currentConfig.name
		// 	userName = encodeURI(userName)
		// }
		config.headers['X-token'] = token
		config.headers['X-user-id'] = user
		config.headers['X-user-name'] = userName
		return config
	},
	error => {
		// 发送失败
		console.log(error)
		Promise.reject(error)
	}
)

// 响应拦截器
service.interceptors.response.use(
	response => {
		// console.log('接口返回数据')
		// dataAxios 是 axios 返回数据中的 data
		const dataAxios = response.data
		// console.log(dataAxios)
		// 这个状态码是和后端约定的
		const {
			code
		} = dataAxios
		// console.log(code)
		// 根据 code 进行判断
		if (code === undefined) {
			// 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
			return dataAxios
		} else {
			// 有 code 代表这是一个后端接口 可以进行进一步的判断
			switch (code) {
				case 0:
					// [ 示例 ] code === 0 代表没有错误
					
					return dataAxios.data
					// case 'xxx':
					//   // [ 示例 ] 其它和后台约定的 code
					//   // errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`)
					//   break
				default:
					
					// 不是正确的 code
					errorCreate(`${dataAxios.msg}`)
					// return Promise.reject(dataAxios.msg)
					break
			}
		}
	},
	error => {
		if (error && error.response) {
			switch (error.response.status) {
				case 400:
					error.message = '请求错误';
					break
				case 401:
					error.message = '未授权，请登录';
					break
				case 403:
					error.message = '拒绝访问';
					break
				case 404:
					error.message = `请求地址出错`;
					break
				case 408:
					error.message = '请求超时';
					break
				case 500:
					error.message = '服务器内部错误';
					break
				case 501:
					error.message = '服务未实现';
					break
				case 502:
					error.message = '网关错误';
					break
				case 503:
					error.message = '服务不可用';
					break
				case 504:
					error.message = '网关超时';
					break
				case 505:
					error.message = 'HTTP版本不受支持';
					break
				default:
					break
			}
		}
		errorLog(error)
		return Promise.reject(error)
	}
)

// module.exports = service;
export default service
