/* 
	任务日志公众函数

	函数列表
	-------------------
	方法列表
	@GetPrTaskLog	查询任务日志
	@DelPrTaskLog	删除任务日志
*/

var main = {};
import {
	Loading,
	Notification
} from 'element-ui';
import axios from '@/axios/index.js'
/*
	查询日志
	@prtask_id		归属任务
	@length			截取长度
	@position		截取位置
*/

main.GetPrTaskLog = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prtasklog/getprtasklog', data)
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
	删除任务日志
	@id		日志id
*/

main.DelPrTaskLog = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prtasklog/delprtasklog', {
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



export default main;
