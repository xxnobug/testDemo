import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let csInterface = window.tgyc.csInterface;


console.log("初始化存储")
const store = new Vuex.Store({
	state: {
		// count:0,
		topNavList:[
			{
				label:'项目列表',
				path:'/index/project/index'
			},
			{
				label:'我的任务',
				path:'/index/project/myTaskList'
			},
			{
				label:'我的工程',
				path:'/index/project/myProjectTaskList'
			},
		],
		userInfo:{},
		topNavTabActive:'0n',
		topNavTabList:[
			// {
			// 	id:'0n',
			// 	label:'首页',
			// 	path:'/index/index'
			// },
		],
		routerData:[], //路由数据
	},
	mutations: {
		setUserInfo(state,userData){
			
			var currentUser = userData
			var rolepower = currentUser.rolepower
			if(rolepower!=undefined){
				var permissions = rolepower.permissions
				console.log("userData数据")
				console.log(userData)
				if(typeof permissions == 'string'){
					currentUser.rolepower.permissions = permissions==''||permissions==null||permissions=='null'?{}:JSON.parse(permissions)
				}
				
			}else{
				currentUser.rolepower = {
					name : "",
					permissions:{}
				}
			}
			state.userInfo = currentUser
			
		},
		setRouterData(state,routerData){
			state.routerData = routerData
		},
		//移除指定路由页面
		removeTopNavTabList(state,thData){
			var navId = thData.name
			var that = window.topVue
			function findId(list){
				return list.id == navId
			}
			var idIndex = state.topNavTabList.findIndex(findId)
			if(idIndex>-1){
				
				if(state.topNavTabList[idIndex].path == "/index/project/taskResources"){
					csInterface.evalScript("clearSysSelection()");
				}
				
				state.topNavTabList.splice(idIndex,1)
				var currentPath = state.topNavTabList[state.topNavTabList.length-1].path
				var currentQuery = state.topNavTabList[state.topNavTabList.length-1].query
				var currentId = state.topNavTabList[state.topNavTabList.length-1].id
				state.topNavTabActive = currentId
				
				try{
					console.log(that.cachePage)
					if(navId=='/index/project/task'){
						// console.log("任务详情")
						// 清除任务详情页面缓存
						var currentCachePage = that.cachePage
						var cacheIndex = currentCachePage.indexOf("任务详情")
						if(cacheIndex>-1){
							currentCachePage.splice(cacheIndex,1)
							that.cachePage = currentCachePage
						}
					}
					else if(navId=='/index/project/myTask'){
						// 清除任务详情页面缓存
						var currentCachePage = that.cachePage
						var cacheIndex = currentCachePage.indexOf("我的任务详情")
						if(cacheIndex>-1){
							currentCachePage.splice(cacheIndex,1)
							that.cachePage = currentCachePage
						}
					}
				}catch(e){
					//TODO handle the exception
					console.log(e)
				}
			
				that.$router.push({ path: currentPath,query:currentQuery})
			}
			
		},
		//清空历史路由
		clearTopNavTabList(state){
			var that =  window.topVue
			state.topNavTabList = []
			that.cachePage = []
		},
		addTopNavTabList(state,thData){
			var nav = thData.nav
			var that = window.topVue
			function findPath(list){
				return list.path == nav.path
			}
			
			var pathIndex = state.topNavTabList.findIndex(findPath)
			if(pathIndex>-1){
				state.topNavTabActive = state.topNavTabList[pathIndex].id
				state.topNavTabList[pathIndex].query = nav.query
			}else{
				state.topNavTabActive = nav.id
				state.topNavTabList.push(nav)
			}
			try{
				if(nav.path=='/index/project/task'){
					// console.log("任务详情")
					// 清除任务详情页面缓存
					var currentCachePage = that.cachePage
					var cacheIndex = currentCachePage.indexOf("任务详情")
					if(cacheIndex==-1){
						currentCachePage.push("任务详情")
						that.cachePage = currentCachePage
					}
				}else if(nav.path=='/index/project/myTask'){
					var currentCachePage = that.cachePage
					var cacheIndex = currentCachePage.indexOf("我的任务详情")
					if(cacheIndex==-1){
						currentCachePage.push("我的任务详情")
						that.cachePage = currentCachePage
					}
				}
			}catch(e){
				//TODO handle the exception
				console.log(e)
			}
			
		},
		jumpTopNavTabList(state,navId){
			var that = window.topVue
			var currentPath = state.topNavTabList[navId].path
			var currentQuery = state.topNavTabList[navId].query
			state.topNavTabActive = state.topNavTabList[navId].id
			that.$router.push({ path: currentPath,query:currentQuery})
		},
		// 添加项目成功关闭添加调转到项目列表
		addProjectJump(state){
			var that = window.topVue
			var currentId = state.topNavTabActive
			function findId(list){
				return list.id == currentId
			}
			var idIndex = state.topNavTabList.findIndex(findId)
			if(idIndex>-1){
				state.topNavTabList.splice(idIndex,1)
			}
			that.$router.push({ path: '/index/project/index'})
		}
	}
})

// module.exports = store;
console.log("初始化存储完成")
export default store
