/* 
	流程任务公众函数

	函数列表
	-------------------
	方法列表
	@GetResourcesTask			查询资源对应任务
*/

var main = {};
import {
	Loading,
	Notification
} from 'element-ui';
import axios from '@/axios/index.js'
/*
	查询资源对应任务
	@project_id
	@json
		[
			{
				"merge_englishname":"Animation",
				"task_name":"J1_E02_SC07_shot007"
			}
		]
*/

main.GetResourcesTask = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/task/getresources_task', data)
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

// main.DelPrTask = function(data) {
// 	return new Promise((resolve, reject) => {
// 		var loadingInstance = Loading.service();
// 		console.log(data)
// 		axios.get('/index.php/home/Prtask/delprtask', {
// 				params: data
// 			})
// 			.then((res) => {
// 				loadingInstance.close();
// 				Notification({
// 					message: '删除成功',
// 					type: 'success'
// 				});
// 				resolve(res);
// 			})
// 			.catch(function(err) {
// 				loadingInstance.close();
// 				reject(err);
// 			});
// 	});
// };




export default main;
