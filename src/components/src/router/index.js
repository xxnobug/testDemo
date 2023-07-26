//引入路由
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//引入store
import store from '@/store/index.js'

console.log("路由初始化")
console.log(store)

var routes = [{
		name: '登录',
		path: '/login',
		component: () => import('@/pages/login/login.vue'),
		meta: {
			keepAlive: false //是否缓存
		}
	},
	{
		name: 'pr版本错误',
		path: '/prErr',
		component: () => import('@/pages/prErr/index.vue'),
		meta: {
			keepAlive: false //是否缓存
		}
	},
	{
		name: '设置磁盘路径',
		path: '/seting/setDisk',
		component: () => import('@/pages/seting/setDisk/index.vue'),
		meta: {
			keepAlive: false //是否缓存
		}
	},
	{
		path: '/index',
		component: () => import('@/index.vue'),
		children: [{
				name: '首页',
				path: 'index',
				component: () => import('@/pages/index/index.vue'),
				meta: {
					keepAlive: false //是否缓存
				}
			},
			{
				name: '项目列表',
				path: 'project/index',
				component: () => import('@/pages/project/index/index.vue'),

				meta: {
					keepAlive: false //是否缓存
				}
			},
			{
				name: '添加项目',
				path: 'project/addproject',
				component: () => import('@/pages/project/addproject/index.vue'),

				meta: {
					keepAlive: false //是否缓存
				}
			},
			{
				name: '冻结项目列表',
				path: 'project/freezeProject',
				component: () => import('@/pages/project/freezeProject/index.vue'),
				meta: {
					keepAlive: false //是否缓存
				}
			},
			{
				name: '任务列表',
				path: 'project/tasklist',
				component: () => import('@/pages/project/tasklist/index.vue'),
				meta: {
					keepAlive: false //是否缓存
				}
			},
			{
				name: '任务详情',
				path: 'project/task',
				component: () => import('@/pages/project/task/index.vue'),

				meta: {
					keepAlive: true //是否缓存
				}
			},
			{
				name: '角色管理',
				path: 'project/role',
				component: () => import('@/pages/project/role/index.vue'),
				meta: {
					keepAlive: false //是否缓存
				}
			},
			{
				name: '角色记录',
				path: 'project/roleRecord',
				component: () => import('@/pages/project/roleRecord/index.vue'),
				meta: {
					keepAlive: false //是否缓存
				}
			},
			{
				name: '任务日志',
				path: 'project/taskLog',
				component: () => import('@/pages/project/taskLog/index.vue'),
				meta: {
					keepAlive: false //是否缓存
				}
			},
			{
				name: '任务关联',
				path: 'project/taskRelation',
				component: () => import('@/pages/project/taskRelation/index.vue'),
				meta: {
					keepAlive: false //是否缓存
				}
			},
			{
				name: '工程历史',
				path: 'project/taskHistory',
				component: () => import('@/pages/project/taskhistory/index.vue'),
				meta: {
					keepAlive: false //是否缓存
				}
			},
			{
				name: '工程外发管理',
				path: 'project/taskOutsourcing',
				component: () => import('@/pages/project/taskOutsourcing/index.vue'),
				meta: {
					keepAlive: false //是否缓存
				}
			},
			{
				name: '资源详情',
				path: 'project/taskResources',
				component: () => import('@/pages/project/taskResources/index.vue'),
				meta: {
					keepAlive: true //是否缓存
				}
			},
			// {
			// 	name: '反馈记录',
			// 	path: 'project/taskResourcesFeedback',
			// 	component: () => import('@/pages/project/taskResourcesFeedback/index.vue'),
			// 	meta: {
			// 		keepAlive: false //是否缓存
			// 	}
			// }, 
			{
				name: '资源历史',
				path: 'project/taskResourcesHistory',
				component: () => import('@/pages/project/taskResourcesHistory/index.vue'),
				meta: {
					keepAlive: false //是否缓存
				}
			},
			{
				name: '资源状态历史',
				path: 'project/taskResourcesStateHistory',
				component: () => import('@/pages/project/taskResourcesStateHistory/index.vue'),
				meta: {
					keepAlive: false //是否缓存
				}
			},
			{
				name: '我的任务',
				path: 'project/myTaskList',
				component: () => import('@/pages/project/myTaskList/index.vue'),
				meta: {
					keepAlive: false //是否缓存
				}
			},
			{
				name: '我的任务详情',
				path: 'project/myTask',
				component: () => import('@/pages/project/myTask/index.vue'),
				meta: {
					keepAlive: true //是否缓存
				}
			},
			{
				name: '我的工程',
				path: 'project/myProjectTaskList',
				component: () => import('@/pages/project/myProjectTaskList/index.vue'),
				meta: {
					keepAlive: false //是否缓存
				}
			},
			{
				name: '工程详情',
				path: 'project/myProjectTask',
				component: () => import('@/pages/project/myProjectTask/index.vue'),
				meta: {
					keepAlive: false //是否缓存
				}
			},
		]
	},
];

var router = new VueRouter({
	routes // (缩写) 相当于 routes: routes
});

store.commit('setRouterData', routes);


/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
	// console.log(to)
	// console.log(12333)
	if (to.path != '/login' && to.path != '/seting/setDisk') {
		if (to.path != '/') {
			let navData = {
				id: to.path,
				label: to.name,
				path: to.path,
				query: to.query
			};
			console.log()
			var thData = {
				nav:navData,
			}
			store.commit('addTopNavTabList', thData);
		}else{
			
		}
		next();
	} else {
		next();
	};

});


router.afterEach(to => {

});


export default router
