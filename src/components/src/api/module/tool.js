/* 
	工具公众函数

	函数列表
	-------------------
	方法列表
	@BaseImg  上传图片
	
*/

var main = {};
import {
	Loading,
	Notification
} from 'element-ui';
import axios from '@/axios/index.js'
/*
	上传图片
	@img 	图片数据
*/

main.BaseImg = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/File/baseimg', data)
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
