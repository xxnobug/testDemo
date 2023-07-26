/* 
	公司管理接口

	函数列表
	-------------------
	方法列表
	@GetParentCompany查询全部人员

*/
import {
	Loading
} from 'element-ui';
import axios from '@/axios/index.js'

var main = {};

/*
	查询全部人员
	@GetavailablePrProblemLabel 	 		查询项目可用pr问题标签
	
*/

main.GetavailablePrProblemLabel = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.get('/index.php/home/node/getavailable_prproblemlabel', {
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
