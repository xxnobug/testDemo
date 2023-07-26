/* 
	pr版本函数

	函数列表
	-------------------
	方法列表
	@Retrieve				检索更新
	@GetSoftware			查询软件信息

*/

var main = {};
import {
	Loading,
	Notification
} from 'element-ui';
import axios from '@/axios/index.js'
/*
	检索更新
	@name				软件名称
	@version			版本号
*/

main.RetRieve = function(data) {
	var loadingInstance = Loading.service();
	return new Promise((resolve, reject) => {
		axios.post('/index.php/home/prversion/retrieve', data)
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
	查询软件信息
	@name				软件名称
*/

main.GetSoftware = function(data) {
	var loadingInstance = Loading.service();
	return new Promise((resolve, reject) => {
		axios.post('/index.php/home/prversion/getsoftware', data)
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
