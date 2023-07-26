/* 
	pr资源状态记录公众函数

	函数列表
	-------------------
	方法列表
	@GetPrResourcesLog			添加资源记录
*/

var main = {};
import {
	Loading,
	Notification
} from 'element-ui';
import axios from '@/axios/index.js'

/*
	删除资源记录
	@prresources_id			资源记录id
*/

main.AddUpdLabel = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/prresourceslabel/add_upd_label', data)
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


main.BatchUpdState = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/prresourceslabel/batchupdstate', data)
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
