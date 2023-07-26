/* 
	pr资源反馈公众函数

	函数列表
	-------------------
	方法列表
	@AddFeedback			添加反馈
	@BatchAddFeedback		批量添加反馈
	@BatchPathAddFeedback	根据路径批量添加反馈
	@DelFeedback			删除资源反馈
	@GetFeedback			查询反馈
*/

var main = {};
import {
	Loading,
	Notification
} from 'element-ui';
import axios from '@/axios/index.js'
/*
	添加反馈
	@project_id			归属项目
	@prtask_id			归属任务
	@prresources_id		归属资源
	@type		类型
	@content	反馈内容	
	@position	时间轴位置	
	@res_version	资源版本	
	
*/

main.AddFeedback = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Feedback/addfeedback', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '添加成功',
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
	批量添加反馈
	@project_id			归属项目
	@prtask_id			归属任务
	@prresources_id		归属资源
		["12","45"]
	@type		类型
	@content	反馈内容	
	@position	时间轴位置	
	@res_version	资源版本	
	
*/

main.BatchAddFeedback = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Feedback/batchaddfeedback', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '添加成功',
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
	根据路径批量添加反馈
	
	
	identifyCode
	path_list
		[
			{
				local_name:"",
				local_url:""
			}
		]
	@type		类型
	@content	反馈内容	
	@position	时间轴位置	
	
*/

main.BatchPathAddFeedback = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Feedback/batchpathaddfeedback', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '添加成功',
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
	删除资源反馈
	@id			资源反馈id
*/

main.DelFeedback = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.get('/index.php/home/Feedback/delfeedback', {
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
	查询反馈
	@prresources_id			归属资源
	@length					截取长度
	@position				截取位置
*/

main.GetFeedback = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Feedback/getfeedback', data)
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
