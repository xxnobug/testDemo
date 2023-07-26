/* 
	pr资源公众函数

	函数列表
	-------------------
	方法列表
	@AddResources	添加资源
	@BatchAdd		批量添加资源
	@DelResources   删除
	@UpdNumber		修改编号
	@UpdRole		修改负责角色
	@GetDetails		查询详情
	@GetAllResources 查询全部
	@UpdRecord 		修改资源记录id
	@batchupdclips	批量修改剪辑位置
	@BatchUpdAssociated		批量修改资源关联任务信息
	@BatchGGetPrResources	批量查询pr资源任务
	@SetResurcesName		修改资源命名

*/

var main = {};
import {
	Loading,
	Notification
} from 'element-ui';
import axios from '@/axios/index.js'
/*
	添加资源
	@project_id		//项目id
	@prtask_id		//归属任务
	@directory_id	//归属目录
	@number			//编号
	@role_id		//负责角色id
	@resources		//资源记录
		resources字段说明
		{
			personnel_id
			personnel_name
			time
			version
			thum
			local_name
			local_url
			service_name
			service_url
			md5
			size
			introduction
		}
		(state默认为0)
*/

main.AddResources = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prresources/addresources', data)
			.then((res) => {
				loadingInstance.close();
				// Notification({
				//   message: '添加成功',
				//   type: 'success'
				// })
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err);
			});
	});
};

/*
	批量添加资源
	@json
		[
			 {
				project_id
				prtask_id
				directory_id
				number
				role_id
			 }
		]
*/
main.BatchAdd = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prresources/batchadd', data)
			.then((res) => {
				loadingInstance.close();
				Notification({
					message: '添加成功',
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
	删除
	@id			资源表id
*/

main.DelResources = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.get('/index.php/home/Prresources/delresources', {
				params: data
			})
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
	修改编号
	@id		资源id
	@name	编号
*/
main.UpdNumber = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prresources/updnumber', data)
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
	修改负责角色
	@id		资源id
	@role_id	编号
*/
main.UpdRole = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prresources/updrole', data)
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
	查询详情
	@id			资源表id
*/

main.GetDetails = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.get('/index.php/home/Prresources/getdetails', {
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
	查询全部
	@prtask_id		归属任务id
*/
main.GetAllResources = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prresources/getallresources', data)
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
	查询全部
	@id				资源id
	@record_id		资源记录id
*/
main.UpdRecord = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prresources/updrecord', data)
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
	批量修改剪辑位置
	@json		数据
			[
					{
						"id":12563,
						"path":"P:/test/ES005-SC03/assets/J2_E01_ani_SC06_shot022.mov",
						"clips":[
							{
								"tracksType":"videoTracks",
								"tracksNum":0,
								"duration":{
									"seconds":0.36,
									"ticks":"91445760000"
								},
								"start":{
									"seconds":0,
									"ticks":"0"
								},
								"end":{
									"seconds":0.36,
									"ticks":"91445760000"
								},
								"inPoint":{
									"seconds":0,
									"ticks":"0"
								},
								"outPoint":{
									"seconds":0.36,
									"ticks":"91445760000"
								}
							}
						]
					}
			]
*/
main.BatchupdClips = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prresources/batchupdclips', data)
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
	批量修改资源关联任务信息
	@json
		[
			{
				"id":"42897",
				"merge_id":"193463",
				"task_id":"36073",
				"task_name":"J1_E02_SC14_shot002"
			}
		]
*/
main.BatchUpdAssociated = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/prresources/batchupdassociated', data)
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
	批量查询pr资源任务
	@identifycode	项目标识符
	@resList		文件列表
		[
			{
				"number":"",	//文件名
				"path":"",		//文件路径
			}
		]
*/
main.BatchGGetPrResources = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/prresources/batchgetprresources', data)
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
	修改资源命名
	@json		文件列表
		[
			{
				"id":"",	//文件名
				"name":"",		//文件路径
			}
		]
*/
main.SetResurcesName = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/prresources/set_resurces_name', data)
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
