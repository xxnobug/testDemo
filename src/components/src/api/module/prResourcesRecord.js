/* 
	pr资源记录公众函数
	http://tpi.tgyc.com/index.php/home/Prresourcesrecord/batchupdstate
	http://tpi.tgyc.com/index.php/home/Prresourcesrecord/batchupdpathstate
	http://tpi.tgyc.com/index.php/home/Prresourcesrecord/updstate
	函数列表
	-------------------
	方法列表
	@AddRecord			添加资源记录
	@AddNewRecord			添加新资源
	@DelRecord			删除资源记录
	@UpdState			修改状态（弃用）
	@BatchUpdState		批量修改状态
	@BatchUpdPathState	根据路径批量修改状态
	@GetPathResources	根据路径查询资源信息
	@BatchupdPathPersonnel	根据路径批量修改负责人
	@batchupdpathperpub	根据路径批量修改为公共资源
	@GetreDetails		查询详情
	@GetRecord			查询资源记录
	@GetRecordNotPage	查询资源记录（无分页）
	@GetResources		查询资源信息
	@GetTaskHistroy		查询任务信息
	@GetMyProduction	查询我的制作中记录
	@GetMyRepair		查询我的返修记录
	@GetMyAudit			查询我的已提审记录
	@getMyComplete		查询我的已完成记录
	@GetProduction		查询工程制作中记录
	@GetToAudit			查询待审核记录
	@GetRepair			查询返修记录
	@GetOutsourceTask				查询外包任务
	@GetOutsourceResources			查询外包任务资源(旧)
	@GetOutsourceAllResources		查询外包任务资源(新)包含工程信息
	@GetChange			查询变更方式
	@GetFeedbackTask	查询我反馈的任务
	@DelResourcesRecord	删除资源指定版本
*/

var main = {};
import {
	Loading,
	Notification
} from 'element-ui';
import axios from '@/axios/index.js'
/*
	添加资源记录
	@project_id			归属项目
	@prtask_id			归属任务
	@prresources_id		归属资源
	@version			版本号
	@thum				缩略图
	@local_name			本地名称
	@local_url			本地地址
	@service_name		服务名称
	@service_url		服务地址
	@md5				md5版本号
	@size				大小
	@introduction		简介
	@updtime			文件最后修改日期
*/

main.AddRecord = function(data) {
	return new Promise((resolve, reject) => {
		axios.post('/index.php/home/Prresourcesrecord/addrecord', data)
			.then((res) => {
				resolve(res);
			})
			.catch(function(err) {
				reject(err);
			});
	});
}


/*
	添加资源记录
	@project_id			归属项目
	@prtask_id			归属任务
	@version			版本号
	@thum				缩略图
	@local_name			本地名称
	@local_url			本地地址
	@service_name		服务名称
	@service_url		服务地址
	@md5				md5版本号
	@size				大小
	@introduction		简介
	@updtime			文件最后修改日期
*/

main.AddNewRecord = function(data) {
	return new Promise((resolve, reject) => {
		axios.post('/index.php/home/Prresourcesrecord/addnew_record', data)
			.then((res) => {
				resolve(res);
			})
			.catch(function(err) {
				reject(err);
			});
	});
};


/*
	删除资源记录
	@id			资源记录id
*/

main.DelRecord = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.get('/index.php/home/Prresourcesrecord/delrecord', {
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
	修改状态
	@id			资源记录id
	@state		状态
*/

main.UpdState = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service()
		axios.post('/index.php/home/Prresourcesrecord/updstate', data)
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
	批量修改状态
	@idlist			id列表
	@state		状态
*/

main.BatchUpdState = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service()
		axios.post('/index.php/home/Prresourcesrecord/batchupdstate', data)
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
	根据路径批量修改状态
	@identifyCode	任务标识码
	@pathList		路径列表
		[
			{
				local_name:"",
				local_url:""
			}
		]
	@state		状态码
*/

main.BatchUpdPathState = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service()
		axios.post('/index.php/home/Prresourcesrecord/batchupdpathstate', data)
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
	根据路径查询资源信息
	@identifyCode	任务标识码
	@pathList		路径列表
		[
			{
				local_name:"",
				local_url:""
			}
		]
*/

main.GetPathResources = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service()
		axios.post('/index.php/home/Prresourcesrecord/getpath_resources', data)
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
	根据路径批量修改负责人
	@identifyCode		任务标识码
	@pathList			路径列表
		[
			{
				local_name:"",
				local_url:""
			}
		]
	@personnelId		人员id
	@personnelName		人员姓名
	@outsourcing		是否外包   0非外包  1外包  
	@company_id			外包公司id
	@company_name		外包公司名称
*/

main.BatchupdPathPersonnel = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service()
		axios.post('/index.php/home/Prresourcesrecord/batchupdpathpersonnel', data)
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
	根据路径批量修改为公共资源
	@identifyCode		任务标识码
	@pathList			路径列表
		[
			{
				local_name:"",
				local_url:""
			}
		]
	@pubresource		状态码
*/

main.BatchupdPathPerpub = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service()
		axios.post('/index.php/home/Prresourcesrecord/batchupdpathperpub', data)
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
	@id			资源记录id
*/

main.GetreDetails = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.get('/index.php/home/Prresourcesrecord/getre_details', {
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
	查询记录
	@prresources_id			归属资源
	@length					截取长度
	@position				截取位置
*/

main.GetRecord = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prresourcesrecord/getrecord', data)
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
	查询资源记录（无分页）
	@prresources_id			归属资源
*/

main.GetRecordNotPage = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prresourcesrecord/getrecord_notpage', data)
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
	查询记录
	@identifycode			识别码
	@local_name				工程本地名称
	@local_url				工程本地地址
*/

main.GetResources = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prresourcesrecord/getresources', data)
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
	查询任务信息
	@identifycode			识别码
*/

main.GetTaskHistroy = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prresourcesrecord/gettaskhistroy', data)
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
	查询我的制作中记录
	@prtask_id			任务id
	@userId				用户id
	@length				获取长度
	@position			位置
*/

main.GetMyProduction = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prresourcesrecord/getmyproduction', data)
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
	查询我的返修记录
	@prtask_id			任务id
	@userId				用户id
	@length				获取长度
	@position			位置
*/

main.GetMyRepair = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prresourcesrecord/getmyrepair', data)
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
	查询我的已提审记录
	@prtask_id			任务id
	@userId				用户id
	@length				获取长度
	@position			位置
*/

main.GetMyAudit = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prresourcesrecord/getmyaudit', data)
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
	查询我的已完成记录
	@prtask_id			任务id
	@userId				用户id
	@length				获取长度
	@position			位置
*/

main.GetMyComplete = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prresourcesrecord/getmycomplete', data)
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
	查询工程制作中记录
	@prtask_id			任务id
	@length				获取长度
	@position			位置
*/

main.GetProduction = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prresourcesrecord/getproduction', data)
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
	查询待审核记录
	@prtask_id			任务id
	@length				获取长度
	@position			位置
*/

main.GetToAudit = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prresourcesrecord/gettoaudit', data)
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
	查询返修记录
	@prtask_id			任务id
	@length				获取长度
	@position			位置
*/

main.GetRepair = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prresourcesrecord/getrepair', data)
			.then((res) => {
				loadingInstance.close();
				resolve(res);
			})
			.catch(function(err) {
				loadingInstance.close();
				reject(err)
			});
	});
};


/*
	查询完成记录
	@prtask_id			任务id
	@length				获取长度
	@position			位置
*/

main.GetComplete = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/Prresourcesrecord/getcomplete', data)
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
	查询外包任务
	@length				获取长度
	@position			位置
*/

main.GetOutsourceTask = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/prresourcesrecord/getoutsource_task', data)
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
	查询外包任务资源
	@prtask_id			任务id
*/

main.GetOutsourceResources = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/prresourcesrecord/getoutsource_resources', data)
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
	查询外包任务资源
	@prtask_id			任务id
*/

main.GetOutsourceAllResources = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/prresourcesrecord/getoutsource_all_resources', data)
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
	查询外包任务资源
	@taskid			任务id
	@json			文件信息
		[
			{
				local_name
				local_url
				updtime
			}
		]
*/

main.GetChange = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/prresourcesrecord/getchange', data)
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
	查询外包任务资源
	@prtask_id			任务id
	@position			位置
	@length				截取长度
*/
main.GetFeedbackTask = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.post('/index.php/home/prresourcesrecord/getfeedback_task', data)
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
	删除资源指定版本
	@id		资源记录id
*/
main.DelResourcesRecord = function(data) {
	return new Promise((resolve, reject) => {
		var loadingInstance = Loading.service();
		axios.get('/index.php/home/prresourcesrecord/delresourcesrecord',{params: data})
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


export default main;
