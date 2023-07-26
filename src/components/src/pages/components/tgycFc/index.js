var fs = window.tgyc.fs;
var crypto = window.tgyc.crypto;
var zlib = window.tgyc.zlib
var stream = window.tgyc.stream
import ElementUI from 'element-ui';
/* 
	系统公共函数
	
	属性列表
	-------------------
	@nonePath			系统中置文件
	@sysStateList		系统自定义可用标签颜色
	@sysJurisdiction	系统权限列表
	@taskStateList		任务状态信息

	函数列表
	-------------------
	方法列表
	@getcurrentStamp  		获取当前时间戳(毫秒)
	@getcurrentStampS  		获取当前时间戳(秒)
	@setFaileStamp  		设置文件时间戳为秒
	@stampToDateMD			秒时间戳转换（2020/08/10 12:13)
	@stampToDateFileMD		秒时间戳转换（2020.08.10 12:13)
	@getDateYMD				获取年月日（2020-08-10)
	@getUserTime			获取时间戳随机字符人员字符串
	@setTaskStateName 		设置任务状态名称
	@setTaskStateColor 		设置任务状态颜色
	@setTaskRoleName 		设置任务角色名称列表
	@setResourcesStateName	设置资源状态名称
	@setResourcesSubStateName	设置资源子状态名称
	@setResourcesColor		设置资源状态颜色
	@setProjectLocalData	设置项目当前版本信息
	@getProjectLocalData	获取项目当前版本信息
	@encode					加密文件
	@decode					解密文件
	@unZipFile				解压文件
	@sendErr				发送错误信息
	@toFileDir				windows资源管理器打开文件
	@timeToFormatTime		pr时间转时间与帧
	@setFileName			设置当前时间戳文件名
	@setMergeName			设置关联节点制作人
	@mkdirs					创建文件夹
	@delFile				删除文件夹及文件
	@setTaskOutgingStateName设置任务外包状态名称
*/


var main = {}

main.name = "tgpmPr";
main.version = 8.8;

main.prVersion = "14.6.0"
main.nonePath = "C:/TGYC/none.prproj"
var cryptokey = "kasdjlasdjlasfhh"

main.sysStateList = [
	{
		index:"1",
		label:"鸢尾花色",
		color:"#729ACC"
	},
	{
		index:"2",
		label:"加勒比海蓝色",
		color:"#29D698"
	},
	{
		index:"3",
		label:"淡紫色",
		color:"#E384E3"
	},
	{
		index:"4",
		label:"天蓝色",
		color:"#2FBFDE"
	},
	{
		index:"5",
		label:"森林绿色",
		color:"#51B858"
	},
	{
		index:"7",
		label:"芒果黄色",
		color:"#EDA63B"
	},
	{
		index:"8",
		label:"紫色",
		color:"#970097"
	},
	{
		index:"9",
		label:"蓝色",
		color:"#3C3CFF"
	},
	{
		index:"10",
		label:"深青色",
		color:"#008080"
	},
	{
		index:"11",
		label:"洋红色",
		color:"#E732E7"
	},
	{
		index:"12",
		label:"棕黄色",
		color:"#CEC195"
	}
]
main.setSysColor = function(data) {
	var color;
	function findColor(list){
		return list.index == data
	}
	var colorIndex = main.sysStateList.findIndex(findColor)
	if(colorIndex>-1){
		color = main.sysStateList[colorIndex].color
	}
	return color
}


main.sysJurisdiction = [
	{
		prop:"task",
		label:"任务相关",
		data:[
			{prop:"taskAdd",label:"添加任务"},
			{prop:"taskDel",label:"删除任务"},
			{prop:"taskSeeHistory",label:"查看历史"},
			{prop:"taskSeeLog",label:"查看日志"},
			{prop:"taskUploadProject",label:"上传工程"},
			{prop:"taskEdit",label:"编辑任务"},
			{prop:"taskUnEdit",label:"解除编辑状态"},
			{prop:"taskEditInfo",label:"修改任务基础信息"},
			{prop:"taskEditRole",label:"修改负责角色"},
			{prop:"taskEditState",label:"修改任务状态"},
			{prop:"taskProjectOutsourcing",label:"工程外发查看"},
			{prop:"taskProjectOutsourcingCtr",label:"工程外发开关"},
		]
	},{
		prop:"res",
		label:"资源相关",
		data:[
			{prop:"resAdd",label:"添加资源"},
			{prop:"resUpdata",label:"强制更新资源"},
			{prop:"resDel",label:"删除资源"},
			{prop:"resRecoveryVersion",label:"恢复指定版本"},
			{prop:"resremoveVersion",label:"删除指定版本"},
			{prop:"resEditStateReview",label:"修改资源状态为提交审核"},
			{prop:"resEditStateRepair",label:"修改资源状态为返修"},
			{prop:"resEditStateComplete",label:"修改资源状态为完成"},
			{prop:"resCompleteEditState",label:"完成后修改状态"},
			{prop:"resEditStateNonProduction",label:"修改资源状态为非制作"},
			{prop:"resEditStateInProduction",label:"修改资源状态为制作中"},
			{prop:"resExamine",label:"审核资源"},
			{prop:"resEditPersonnel",label:"修改资源负责人"},
			{prop:"resAddFeedback",label:"添加反馈"},
			{prop:"resDelFeedback",label:"删除反馈"},
			{prop:"selectResDown",label:"选中下载"},
			{prop:"resRename",label:"文件重命名"},
			{prop:"resUpdataLayout",label:"layout无限制上传"},
			
		]
	}
]



/* 任务状态信息*/
main.taskStateList = [
	{
		id:'0',
		name:'制作中',
		color:'#409EFF'
	},
	{
		id:'1',
		name:'完成',
		color:'#67C23A'
	},
	{
		id:'2',
		name:'暂停',
		color:'#E6A23C'
	}
]


/* 获取当前时间戳(毫秒) */
main.getcurrentStamp = function(data) {
	let thisdata = new Date();
	var thistime = thisdata.getTime()
	return thistime
}

/* 获取当前时间戳(秒) */
main.getcurrentStampS = function() {
	let thisdata = new Date();
	var thistime = thisdata.getTime()
	thistime = parseInt(thistime/1000)
	return thistime
}


/* 设置文件时间戳为秒 */
main.setFaileStamp = function(data) {
	// console.log(data)
	var mtime;
	var currentTime = data.toString()
	var currentLen = currentTime.length
	
	if(currentLen>10){
		mtime = parseInt(data/1000)
		
	}else{
		mtime = data
	}
	// console.log('最后处理时间')
	// console.log(currentTime)
	// console.log(currentLen)
	// console.log(mtime)
	return mtime
}

/* 获取年月日（2020-08-10) */
main.getDateYMD = function(data) {
	let thisdata = new Date();
	var thistime = thisdata.getFullYear() + '-' + (thisdata.getMonth() + 1) + '-' + thisdata.getDate()
	return thistime
}

/* 获取时间戳随机字符人员字符串 */
main.getUserTime = function(data) {
	let thisdata = new Date();
	var thString = main.randomString(5)
	var userTime = thisdata.getTime() + thString + data
	return userTime
}

/* 随机获取指定长度的字符串 */
main.randomString = function(len) {
	len = len || 32;
 　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
 　　var maxPos = $chars.length;
 　　var pwd = '';
 　　for (var i = 0; i < len; i++) {
 　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
 　　}
　　 return pwd;
}

/* 秒时间戳转换（2020/08/10 12:13)*/
main.stampToDateMD = function(data) {
	let thisdata = new Date();
	let thistime;
	if (data == null || data == '' || data == undefined) {
		thistime = '-----';
	} else {
		thisdata.setTime(data * 1000);
		thistime = thisdata.getFullYear() + '/' + (thisdata.getMonth() + 1) + '/' + thisdata.getDate() + " " + thisdata.getHours() + ":" + thisdata.getMinutes()
	}
	return thistime
}

/* 文件秒时间戳转换（2020.08.10 12.13)*/
main.stampToDateFileMD = function(data) {
	let thisdata = new Date();
	let thistime;
	if (data == null || data == '' || data == undefined) {
		thistime = '-----';
	} else {
		thisdata.setTime(data * 1000);
		thistime = thisdata.getFullYear() + '.' + (thisdata.getMonth() + 1) + '.' + thisdata.getDate() + " " + thisdata.getHours() + "." + thisdata.getMinutes()
	}
	return thistime
}

/* 设置任务状态名称*/
main.setTaskStateName = function(data) {
	var stateName = ''
	function findState(state){
		return state.id == data
	}
	let index = main.taskStateList.findIndex(findState)
	if(index>-1){
		stateName = main.taskStateList[index].name
	}else{
		stateName = '未知状态'
	}
	return stateName
}


/* 设置任务状态颜色*/
main.setTaskStateColor = function(data) {
	var stateColor = ''
	function findState(state){
		return state.id == data
	}
	let index = main.taskStateList.findIndex(findState)
	if(index>-1){
		stateColor = main.taskStateList[index].color
	}else{
		stateColor = '#b1b1b1'
	}
	return stateColor
}


/* 设置任务角色名称列表*/
main.setTaskRoleName = function(data) {
	var roleNameList = ''
	var roleData = data==null||data=='null'||data==undefined ? [] : data
	var len = roleData.length
	for(var i=0;i<len;i++){
		if(i==0){
			roleNameList = roleData[i].name
		}else{
			roleNameList = roleNameList + ',' + roleData[i].name
		}
	}
	return roleNameList
}



/* 
	设置资源状态颜色
*/
main.setResourcesStateName = function(data) {
	var name
	switch (data){
		case "0":
			name = "待审核";
			break;
		case "1":
			name = "返修";
			break;
		case "2":
			name = "通过";
			break;
		case "3":
			name = "更新版本";
			break;
		case "4":
			name = "制作中";
			break;
		case "5":
			name = "非制作";
			break;
	}
	
	return name
}


/* 
	设置资源子状态颜色
*/
main.setResourcesSubStateName = function(colorArr,colorIndex) {
	var name = ""
	if(colorIndex!=""&&colorIndex!="0"&&colorIndex!=null){
		function findName(list){
			return list.colorindex == colorIndex
		}
		var nIndex = colorArr.findIndex(findName)
		if(nIndex>-1){
			name = colorArr[nIndex].name
		}
	}
	return name
}


/* 
	设置资源状态颜色
*/
main.setResourcesColor = function(data) {
	var colorCode
	
	var colorC = parseInt(data)
	if(colorC==0){
		// 黄色
		colorCode = 15
	}else if(colorC==1){
		// 红色
		colorCode = 6
	}else if(colorC==2||data==3){
		// 绿色
		colorCode = 13
	}else if(colorC==4){
		// 紫色
		colorCode = 0
	}else if(colorC==5){
		// 紫色
		colorCode = 14
	}
	return colorCode
}


/* 
	设置资源状态颜色值
*/
main.setResourcesColorCode = function(data) {
	var colorCode
	
	var colorC = parseInt(data)
	if(colorC==0){
		// 黄色
		colorCode = "#E2E264"
	}else if(colorC==1){
		// 红色
		colorCode = "#EA2E9D"
	}else if(colorC==2||data==3){
		// 绿色
		colorCode = "#1D7021"
	}else if(colorC==4){
		// 紫色
		colorCode = "#A690E0"
	}else if(colorC==5){
		// 紫色
		colorCode = "#8B4513"
	}
	return colorCode
}


/* 
	设置项目当前版本信息
*/
main.setProjectLocalData = function(data) {
	var projectData = {
		id:data.id,
		md5:data.md5,
		version:data.version,
		local_url:data.local_url,
		local_name:data.local_name,
	}
	// console.log(projectData)
	var currentProjectId = data.id;
	
	var currentProjectData = [];
	//读取本地文件
	return new Promise((resolve, reject) => {
		fs.stat('C:/TGYC/appData/project.json', (err, stats) => {
			if (!err) {
				var sysConfig = fs.readFileSync('C:/TGYC/appData/project.json', 'utf8')
				// 读取到的字符
				// console.log("读取到的字符")
				// console.log(sysConfig)
				if(sysConfig!=''){
					sysConfig = main.decode(sysConfig)
					currentProjectData = sysConfig==''||sysConfig==undefined||sysConfig=='undefined' ? [] : JSON.parse(sysConfig)
					
					function findProject(project){
						return project.id == currentProjectId
					}
					var projectIndex = currentProjectData.findIndex(findProject)
					if(projectIndex>-1){
						currentProjectData[projectIndex] = projectData
					}else{
						currentProjectData.push(projectData)
					}
				}else{
					currentProjectData.push(projectData)
				}
				
			} else {
				// console.log('文件未找到')
				currentProjectData.push(projectData)
			}
			
			// console.log("处理后数据")
			// console.log(currentProjectData)
			var currentProjectDataStr = JSON.stringify(currentProjectData)
			currentProjectDataStr = main.encode(currentProjectDataStr)
			// console.log("要保存的字符")
			// console.log(currentProjectDataStr)
			fs.writeFile('C:/TGYC/appData/project.json', currentProjectDataStr, (err) => {
				if (err) throw err;
			});
			resolve(projectData);
		})
	});
	// return true
}


/* 
	获取项目当前版本信息
*/
main.getProjectLocalData = function(data) {
	var currentProjectId = data.id;
	var projectData = "";
	var currentProjectData = [];
	//读取本地文件
	return new Promise((resolve, reject) => {
		fs.stat('C:/TGYC/appData/project.json', (err, stats) => {
			if (!err) {
				var sysConfig = fs.readFileSync('C:/TGYC/appData/project.json', 'utf8')
				if(sysConfig!=''){
					sysConfig = main.decode(sysConfig)
					console.log("项目数据")
					console.log(sysConfig)
					var currentProjectData = sysConfig==''||sysConfig==undefined||sysConfig=='undefined' ? [] : JSON.parse(sysConfig)
					
					function findProject(project){
						return project.id == currentProjectId
					}
					var projectIndex = currentProjectData.findIndex(findProject)
					if(projectIndex>-1){
						projectData = currentProjectData[projectIndex]
					}
					resolve(projectData);
				}else{
					resolve(projectData);
				}
			} else {
				// console.log('文件未找到')
				resolve(projectData);
			}
			
		})
	});
	// return projectData
}


/* 
	加密
*/
main.encode = function(text) {
	var secret = cryptokey;
	var cipher = crypto.createCipher('aes-256-cbc',secret);
	var crypted =cipher.update(text,'utf8','hex');
	crypted+=cipher.final('hex');
	// console.log(crypted);
	return crypted;
}


/* 
	解密
*/
main.decode = function(text) {
	var secret = cryptokey;
	var decipher = crypto.createDecipher('aes-256-cbc',secret);
	var dec=decipher.update(text,'hex','utf8');
	dec+= decipher.final('utf8');//解密之后的值
	return dec;
}



/* 
	解压文件
*/

main.unZipFile = function(Path,Dir) {
	return new Promise((resolve, reject) => {
		// compressing.zip.uncompress(Path,Dir)
		// .then(() => {
		//     // console.log('success');
		// 	resolve(Path);
		// 	fs.unlink(Path,function(error){})
		// })
		// .catch(err => {
		//    reject(err)
		// });
	});
}

/**
 * 删除文件夹及文件
 * @param {*} path 必传参数可以是文件夹可以是文件
 * @param {*} reservePath 保存path目录 path值与reservePath值一样就保存
 */
main.delFile = function(path, reservePath) {
	if (fs.existsSync(path)) {
		if (fs.statSync(path).isDirectory()) {
			let files = fs.readdirSync(path);
			files.forEach((file, index) => {
				let currentPath = path + "/" + file;
				if (fs.statSync(currentPath).isDirectory()) {
					main.delFile(currentPath, reservePath);
				} else {
					fs.unlinkSync(currentPath);
				}
			});
			if (path != reservePath) {
				fs.rmdirSync(path);
			}
		} else {
			fs.unlinkSync(path);
		}
	}
}

/* 
	发送错误信息
*/

main.sendErr = function(data) {
	ElementUI.Notification({
		message: data,
		type: 'warning',
		position: 'bottom-right'
	});
}


/*
	windows资源管理器打开文件
	@url	本地文件路径		 C:/TGYC/123.mov
*/

main.toFileDir = function(url) {
	var path = url
	var sep = '\\';
	path = path.replace(/\//g, sep);
	var cmd="explorer /select," + path;
	var exec = window.tgyc.exec;
	exec(cmd, function(err, stdout, stderr) {
	    if(err){ return console.log(err); }
	});
}


/*
	pr时间转帧数
*/
main.timeToFrame = function(t) {
	
	var frame = 0;
	var a = t.toString().split(".");
	if (a.length == 2) {
		if (a[1].length == 1) {
        	frame = Number(a[0]) * 25 + (Number(a[1]) * 10) / 4;
		}else if(a[1].length > 2){
			var frameN = a[1];
			console.log(t)
			console.log(frameN)
			frameN = frameN.slice(0,2);
			console.log(frameN)
			frame = Number(a[0]) * 25 + Number(frameN) / 4;
		}else {
        	frame = Number(a[0]) * 25 + Number(a[1]) / 4;
		}
	} else {
        frame = Number(a[0]) * 25;
	}
	return frame
}


/*
	pr时间转时间与帧
*/
main.timeToFormatTime = function(t) {
	let nowSS = "";
	let arr = t.toString().split(".");
	if (arr.length == 2) {
		var frame = arr[1]
		
		if(frame.length==1){
			frame = frame*10
		}else if(frame.length>2){
			frame = frame.slice(0,2);
		}else{
			frame = frame
		}
		nowSS = Number(frame) / 4;
		
	} else {
	  nowSS = 0;
	}
	
	var NowtimeValue = t;
	var nowH = parseInt(NowtimeValue / 3600);
	var nowM = parseInt((NowtimeValue % 3600) / 60);
	var nowS = parseInt(NowtimeValue % 60); //
	
	nowM = nowM < 10 ? (nowM = "0" + nowM) : nowM;
	nowS = nowS < 10 ? (nowS = "0" + nowS) : nowS; //
	nowSS = nowSS < 10 ? (nowSS = "0" + nowSS) : nowSS;
	return nowM + ":" + nowS + ":" + nowSS;
}

/*
	设置当前时间戳文件名
	当前时间戳 + 随机4位字符串
*/
main.setFileName = function(){
	var fileName = "";
	fileName = main.getcurrentStamp() + main.randomString(4)
	return fileName
}


/*
	设置关联节点制作人姓名
	[{"id":"297","name":"张悦翔"}]
	输出：张悦翔
*/
main.setMergeName = function(data){
	var allName = "";
	console.log(data)
	var thdata = data!=''&&data!='null'&&data!=null ? JSON.parse(data):[] ;
	for(var i=0;i<thdata.length;i++){
		if(i<thdata.length-1){
			allName = allName + thdata[i].name + "、"
		}else{
			allName = allName + thdata[i].name
		}
	}
	return allName
}


/**
 * 创建文件夹
 * @dirpath 文件路径  
 */
main.mkdirs = function(dirpath){
	var dirArr = dirpath.split("\\");
	var currentDir = "";
	for(var i=0;i<dirArr.length;i++){
		var currentDir = i==0?currentDir+dirArr[i]:currentDir+"\\"+dirArr[i]
		if(!fs.existsSync(currentDir)&&i==0){
			console.log(currentDir+"目录创建失败")
		}else{
			if(!fs.existsSync(currentDir)) {
				fs.mkdirSync(currentDir);
			}
		}
	}
}


main.mkdirsS = function(dirpath){
	
	// 读取路径
	// 循环创建目录
	var dirArr = dirpath.split("/");
	var currentDir = "";
	for(var i=0;i<dirArr.length;i++){
		var currentDir = i==0?currentDir+dirArr[i]:currentDir+"/"+dirArr[i]
		if(!fs.existsSync(currentDir)&&i==0){
			// console.log(currentDir+"目录创建失败")
		}else{
			if(!fs.existsSync(currentDir)) {
				fs.mkdirSync(currentDir);
			}
		}
	}
	
	
}

/*
	设置任务外包状态名称
*/
main.setTaskOutgingStateName = function(data){
	var stateName = "";
	if(data=="0"){
		stateName = "进行中"
	}else if(data=="1"){
		stateName = "完成"
	}else if(data=="2"){
		stateName = "暂停"
	}else if(data=="3"){
		stateName = "取消"
	}
	return stateName
}

/*
	设置任务外包状态颜色
*/
main.setTaskOutgingStateColor = function(data){
	var returnData = "";
	if(data=="0"){
		returnData = "#409EFF"
	}else if(data=="1"){
		returnData = "#67C23A"
	}else if(data=="2"){
		returnData = "#E6A23C"
	}else if(data=="3"){
		returnData = "#b1b1b1"
	}
	return "background-color:"+returnData
}

// module.exports = main;
export default main






