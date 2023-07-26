/* 
	pr工程自定义颜色

	函数列表
	-------------------
	方法列表
	@AddProjectColor		添加审核小状态
	@UpdColor				修改颜色索引
	@UpdName				修改颜色名称
	@DelState				删除
	@GetProjectList		查询项目状态列表
	@GetProjectSubState	查询项目状态小状态

*/

var main = {};
import {
	Loading,
	Notification
} from 'element-ui';
import axios from '@/axios/index.js'
/*
	添加审核小状态
	@name			状态名称
	@colorIndex		系统状态索引
	@prid			归属大状态id
	@project_id		归属项目id
*/

main.AddProjectColor = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prprojectcolor/addprojectcolor', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '添加成功',
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
	修改颜色索引
	@id				状态id
	@colorIndex		系统状态索引
	@project_id		归属项目id
*/

main.UpdColor = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prprojectcolor/updcolor', data)
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
	修改颜色索引
	@id				状态id
	@name			颜色名称
*/

main.UpdName = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prprojectcolor/updname', data)
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
	删除
	@id			数据id
*/

main.DelState = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.get('/index.php/home/Prprojectcolor/delState', {
				params: data
			})
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '删除成功',
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
	查询项目状态列表
	@project_id			项目id
*/

main.GetProjectList = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.get('/index.php/home/Prprojectcolor/getproject_list', {
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



/*
	修改颜色索引
	@project_id		归属项目id
	@prid			父状态index
*/

main.GetProjectSubState = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prprojectcolor/getproject_substate', data)
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
