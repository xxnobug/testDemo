/* 
	任务公众函数

	函数列表
	-------------------
	方法列表
	@AddPrtask		添加任务
	@DelPrTask		删除
	@UpdName		修改编号
	@UpdChineseName	修改中文名
	@UpdThum		修改缩略图
	@UpdSort		修改排序编号
	@UpdHead		修改负责人
	@UpdState		修改状态
	@UpdLock		锁定任务
	@UpdUnLock		解锁任务
	@GetDetails		查询任务详情
	@GetPrTask		查询pr任务
	@SearChname		搜索编号
	@UpdRole		修改负责角色
	@UpdTimeLen		修改pr任务时长
	@GetRolePrresources		查询任务角色及资源信息
	@UpdOutsourcing	修改任务外包状态
*/

var main = {};
import {
	Loading,
	Notification
} from 'element-ui';
import axios from '@/axios/index.js'
/*
	添加任务
	@project_id		项目id
	@directory_id	归属目录id
	@name			编号
	@chinese_name	中文名
	@thum			缩略图
	@sort			排序
	@time_len		时长
	@head_id		负责人id
	@head_name		负责人姓名
*/

main.AddPrtask = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prtask/addprtask', data)
			.then((res) => {
				loadingInstance.close();

				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	删除任务
	@id		任务id
*/

main.DelPrTask = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		console.log(data)
		axios.get('/index.php/home/Prtask/delprtask', {
				params: data
			})
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '删除成功',
					type: 'success',
					position: 'bottom-right'
				});
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	修改编号
	@id		pr任务id
	@name	编号
*/

main.UpdName = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prtask/updname', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '修改成功',
					type: 'success',
					position: 'bottom-right'
				});
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	修改中文名
	@id		pr任务id
	@chinese_name	中文名
*/

main.UpdChineseName = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prtask/updchinese_name', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '修改成功',
					type: 'success',
					position: 'bottom-right'
				});
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	修改缩略图
	@id		pr任务id
	@thum	缩略图
*/

main.UpdThum = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prtask/updthum', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '修改成功',
					type: 'success',
					position: 'bottom-right'
				});
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	修改排序编号
	@id		pr任务id
	@sort	排序
*/

main.UpdSort = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prtask/updsort', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '修改成功',
					type: 'success',
					position: 'bottom-right'
				});
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	修改负责人
	@id			pr任务id
	@head_id	负责人id
	@head_name	负责人姓名
*/

main.UpdHead = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prtask/updhead', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '修改成功',
					type: 'success',
					position: 'bottom-right'
				});
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	修改状态
	@id			pr任务id
	@state		状态
*/

main.UpdState = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prtask/updstate', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '修改成功',
					type: 'success',
					position: 'bottom-right'
				});
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	锁定任务
	@id			pr任务id
	@lock_id		锁定人id
	@lock_name		锁定人姓名
*/

main.UpdLock = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prtask/updlock', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '修改成功',
					type: 'success',
					position: 'bottom-right'
				});
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	解锁任务
	@id			pr任务id
*/

main.UpdUnLock = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prtask/updunlock', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '修改成功',
					type: 'success',
					position: 'bottom-right'
				});
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	查询任务详情
	@id			pr任务id
*/

main.GetDetails = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.get('/index.php/home/Prtask/getdetails', {
				params: data
			})
			.then((res) => {
				loadingInstance.close();
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	查询pr任务
	@project_id			项目id
	@directory_id		归属目录id
*/

main.GetPrTask = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prtask/getprtask', data)
			.then((res) => {
				loadingInstance.close();
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	搜索编号
	@project_id			项目id
	@number		编号
*/

main.SearChname = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prtask/searchname', data)
			.then((res) => {
				loadingInstance.close();
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	修改负责角色
	@id			pr任务id
	@role_id		负责角色
*/

main.UpdRole = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prtask/updrole', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '修改成功',
					type: 'success',
					position: 'bottom-right'
				});
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	修改pr任务时长
	@id			pr任务id
	@time_len		时长
*/

main.UpdTimeLen = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prtask/updtime_len', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '修改成功',
					type: 'success',
					position: 'bottom-right'
				});
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	查询任务角色及资源信息
	@identifyCode		任务识别码
	@pathList			路径列表
*/

main.GetRolePrresources = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prtask/getrole_prresources', data)
			.then((res) => {
				loadingInstance.close();
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	修改任务外包状态
	@id				任务id
	@outsourcing	外发状态
*/

main.UpdOutsourcing = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prtask/updoutsourcing', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '修改成功',
					type: 'success',
					position: 'bottom-right'
				});
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};



export default main;
