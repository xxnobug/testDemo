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

var company = {};

/*
	查询全部人员
	@vicecompany 	 		归属公司
	
*/

company.GetParentCompany = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.get('/index.php/home/company/getparentcompany', {
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


export default company;
