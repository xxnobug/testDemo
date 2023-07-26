/* 
	人员公众函数

	函数列表
	-------------------
	方法列表
	@GetAllPersonnel查询全部人员

*/

var main = {};
import {
	Loading,
	Notification
} from 'element-ui';
import axios from '@/axios/index.js'
/*
	查询全部人员
*/

main.GetAllPersonnel = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.get('/index.php/home/personnel/getallpersonnel', data)
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
