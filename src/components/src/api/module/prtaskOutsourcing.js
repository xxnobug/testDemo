/* 
	pr任务外包接口函数

	函数列表
	-------------------
	方法列表
	@AddprOutsourcing		新增外发记录
	@UpdState				修改状态
	@GetOutgoing			查询任务外发
	@GetOutgoingRecord		查询任务外发记录
	@GetavailableTask		查询公司可用任务
*/

var main = {};
import {
	Loading,
	Notification
} from 'element-ui';
import axios from '@/axios/index.js'

/*
	添加工程
	@project_id		pr项目id
	@prtask_id		pr任务id
	@company_id		外发公司id
*/

main.AddprOutsourcing = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Proutsourcing/addproutsourcing', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
				  message: '添加成功',
				  type: 'success',
				  position: 'bottom-right'
				})
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
	@id			外发记录id
	@state		状态
*/

main.UpdState = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Proutsourcing/updstate', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
				  message: '修改成功',
				  type: 'success',
				  position: 'bottom-right'
				})
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};



/*
	查询任务外发
	@prtask_id			任务id
	@length				获取长度
	@position			获取位置
*/

main.GetOutgoing = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Proutsourcing/getoutgoing', data)
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
	查询任务外发记录
	@prtask_id			任务id
	@length				获取长度
	@position			获取位置
*/

main.GetOutgoingRecord = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Proutsourcing/getoutgoing_record', data)
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
	查询公司可用任务
*/

main.GetavailableTask = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Proutsourcing/getavailable_task', data)
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
