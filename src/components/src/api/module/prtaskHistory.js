/* 
	任务公众函数

	函数列表
	-------------------
	方法列表
	@AddPrtaskHistory		添加工程
	@DelPrtaskHistory		删除工程
	@GetNewPrtask			查询任务最新工程
	@GetAllPrtask			查询所有历史工程

*/

var main = {};
import {
	Loading,
	Notification
} from 'element-ui';
import axios from '@/axios/index.js'
/*
	添加工程
	@prtask_id			归属pr任务id
	@project_id			归属项目id
	@personnel_id		上传人id
	@personnel_name		上传人姓名
	@version			版本号
	@thum				缩略图
	@local_url			工程本地地址
	@local_name			工程本地名称
	@service_url		工程服务地址
	@service_name		工程服务名称
	@md5				md5版本号
	@size				大小
	@introduction		简介
	@identifycode		识别码
*/

main.AddPrtaskHistory = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prtaskhistory/addprtaskhistory', data)
			.then((res) => {
				loadingInstance.close();
				// Notification({
				//   message: '上传成功',
				//   type: 'success'
				// })
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	删除工程
	@id	工程id
*/

main.DelPrtaskHistory = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.get('/index.php/home/Prtaskhistory/delprtaskhistory', {
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
	查询任务最新工程
	@prtask_id	工程id
*/

main.GetNewPrtask = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.get('/index.php/home/Prtaskhistory/getnew_prtask', {
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
	查询所有历史工程
	@prtask_id	工程id
*/

main.GetAllPrtask = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.get('/index.php/home/Prtaskhistory/getall_prtask', {
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



export default main;
