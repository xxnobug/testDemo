/* 
	任务流程项目接口

	函数列表
	-------------------
	方法列表
	@GetProjectSynopsis			查询项目节点简介
	
	
*/

var main = {};
import {
	Loading,
	Notification
} from 'element-ui';
import axios from '@/axios/index.js'

/*
	查询项目节点简介
	@project		项目id
*/

main.GetProjectSynopsis = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		console.log(data)
		axios.get('/index.php/home/node/getprojectsynopsis', {
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
