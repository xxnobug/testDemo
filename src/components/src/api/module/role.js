/* 
	角色公众函数

	函数列表
	-------------------
	方法列表
	@AddPrRole			添加角色
	@UpdUserList		修改人员
	@UpdJurisdiction	修改权限
	@UpdSort			修改排序
	@UpdPrRoleName		修改角色名称
	@GetRoleActive		查询活跃角色
	@GetRoleFreeze		查询冻结角色
	@GetPrRole			查询角色详情
	@UpdRoleState		修改角色状态为弃用
	@UpdStateActive		设为活跃
	@GetUserRole		查询用户角色
*/

var main = {};
import {
	Loading,
	Notification
} from 'element-ui';
import axios from '@/axios/index.js'
/*
	添加角色
	@project_id 	归属项目 
	@name 	 		角色名称
	@sort 	 		排序
*/

main.AddPrRole = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prrole/addprrole', data)
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
	修改人员
	@id 角色id
	@user_list 	人员列表 
*/

main.UpdUserList = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prrole/upduser_list', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '修改成功',
					type: 'success',
					position: 'bottom-right'
				});
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	修改权限
	@id 角色id
	@jurisdiction 	权限
*/

main.UpdJurisdiction = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prrole/updjurisdiction', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '修改成功',
					type: 'success',
					position: 'bottom-right'
				});
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	修改排序
	@json  排序json
		[
			{
				id:
				sort
			};
		]
*/

main.UpdSort = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prrole/updsort', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '修改成功',
					type: 'success',
					position: 'bottom-right'
				});
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	修改角色名称
	@id		角色id
	@name	角色名称
*/

main.UpdPrRoleName = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prrole/updprrole_name', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '修改成功',
					type: 'success',
					position: 'bottom-right'
				});
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	查询活跃角色
	@project_id  归属项目
*/

main.GetRoleActive = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.get('/index.php/home/Prrole/getrole_active', {
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
	查询冻结角色
	@project_id  归属项目
*/

main.GetRoleFreeze = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.get('/index.php/home/Prrole/getrole_freeze', {
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
	查询角色详情
	@id  角色id
*/

main.GetPrRole = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.get('/index.php/home/Prrole/getpr_role', {
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
	修改角色状态为弃用
	@id   角色id
*/

main.UpdRoleState = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prrole/updrole_state', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '删除成功',
					type: 'success',
					position: 'bottom-right'
				});
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	设为活跃
	@id   角色id
*/

main.UpdStateActive = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prrole/updstate_active', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '激活成功',
					type: 'success',
					position: 'bottom-right'
				});
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};


/*
	查询用户角色
	@id   角色id
*/

main.GetUserRole = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prrole/getuserrole', data)
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
