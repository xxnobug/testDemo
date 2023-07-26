/* 
	项目公众函数

	函数列表
	-------------------
	方法列表
	@AddPrProject   添加项目
	@UpdState		修改为冻结
	@UpdFreeze		解除冻结
	@GetProActive	查询活跃项目
	@GetProFreeze	查询冻结项目
	@UpdProName		修改编号
	@UpdProThum		修改缩略图
	
*/
import {
	Loading,
	Notification
} from 'element-ui';
import axios from '@/axios/index.js'
var main = {};

/*
	添加项目
	@   name 	 		名称
	@	thum			缩略图
	@	creator_id		创建人id
	@	creator_name	创建人姓名
	@	sort			排序
*/

main.AddPrProject = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prproject/addpr_project', data)
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
	修改为冻结
	@   id 	 		项目id
*/
main.UpdState = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service()
		axios.post('/index.php/home/Prproject/updstate', data)
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
	解除冻结
	@   id 	 		项目id
*/
main.UpdFreeze = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service()
		axios.post('/index.php/home/Prproject/updfreeze', data)
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
	查询活跃项目
*/

main.GetProActive = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service()
		axios.get('/index.php/home/Prproject/getpro_active', data)
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
	查询冻结项目
*/

main.GetProFreeze = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service()
		axios.get('/index.php/home/Prproject/getpro_freeze', data)
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
	修改编号
	@   id 	 		项目id
	@   name 	 	编号
*/
main.UpdProName = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service()
		axios.post('/index.php/home/Prproject/updpro_name', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '修改成功',
					type: 'success',
					position: 'bottom-right'
				})
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});

	});
};

/*
	修改缩略图
	@   id 	 		项目id
	@   thum 	 	缩略图
*/
main.UpdProThum = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service()
		axios.post('/index.php/home/Prproject/updpro_thum', data)
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

export default main

// export default default main;
