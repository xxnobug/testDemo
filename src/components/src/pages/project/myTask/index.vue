<template>
	<div>
		<!-- 任务信息 -->
		<el-row>
			<el-col :span="24" class="myTaskBox">
				<div class="myTaskDataBox">
					<div class="myTaskName">
						<div>
							任务编号：{{taskData.name}}
						</div>
					</div>
					<div class="myTaskTxt">
						<div>
							中文名：{{taskData.chinese_name}}
						</div>
					</div>
				</div>
				<div class="myTaskThum">
					<img :src="$ASSETBASEURL + taskData.thum" />
				</div>
				<div class="myTaskBtn">
					<el-button size="mini"  @click="openProject">打开工程</el-button>
					<el-button size="mini"  @click="reloadProject">重下工程</el-button>
					<el-button size="mini"  @click="myInit">刷新</el-button>
					<!-- <el-button size="mini"  @click="showStatistics">统计</el-button> -->
				</div>
				
				
			</el-col>
		</el-row>
		<!-- 项目检测 -->
		<el-col :span="24" class="taskStatisticalBox">
			<el-col :span="24" class="taskStatisticalContent" >
				
				<el-col :span="8" class="taskStatisticalList"  @contextmenu.prevent.native="taskResourcesMenu($event)">
					<div class="taskStatisticalNum taskStatisticalNumErr">
						{{taskResStatistical.differencesNum}}
					</div>
					<div class="taskStatisticalLabel">
						有差异
					</div>
					<div class="taskStatisticalListLine"></div>
				</el-col>
				<el-col :span="8" class="taskStatisticalList"  @contextmenu.prevent.native="taskResourcesPublicMenu($event)">
					<div class="taskStatisticalNum taskStatisticalNumErr">
						{{taskResStatistical.differencesPublicNum}}
					</div>
					<div class="taskStatisticalLabel">
						公共差异
					</div>
					<div class="taskStatisticalListLine"></div>
				</el-col>
				<el-col :span="8" class="taskStatisticalList" @contextmenu.prevent.native="taskResourcesMenu2($event)">
					<div class="taskStatisticalNum taskStatisticalNumErr">
						{{taskResStatistical.offlineNum}}
					</div>
					<div class="taskStatisticalLabel">
						脱机
					</div>
				</el-col>
			</el-col>
		</el-col>
		
		
		
		
		
		<!-- <el-col>
			<div id="myChart" :style="{width: '300px', height: '300px'}"></div>
		</el-col> -->
		
		
		
		
		
		
		
		
		<!-- 资源信息 --> 
		<el-col :span="24" class="taskAuditBox">
			<el-col :span="24" class="taskResBox">
				<el-table
				    :data="mytaskResourcesData"
				    border
					:height="taskAuditHeightNum"
					@selection-change="setResListSelect"
				    style="width: 100%"
					>
				    
					<el-table-column
					      type="selection"
					      width="45">
					</el-table-column>
					
					<el-table-column prop="item" label="文件名" sortable>
						<template slot-scope="item">
							<div class="taskResName" @click="openTaskResources(item.row.id)" @contextmenu.prevent="taskResourcesListMenu(item.row,$event)">
								<span class="taskAssetsBox">
									<div class="taskAssetsColor" :style="'background-color:'+item.row.color"></div>
								</span>
								<span>
									{{item.row.local_name}}
								</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="item" label="路径" sortable>
						<template slot-scope="item">
							<div class="taskResUrl">
								{{item.row.local_url}}
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="item" label="操作" width="80">
						<template slot-scope="item">
							<el-tooltip class="item" effect="dark" content="转到播放点" placement="bottom">
								<i class="el-icon-bottom-right tipBtns" @click="getResClipsPosition(item.row)"></i>
							</el-tooltip>
							
							<el-tooltip class="item" effect="dark" content="转到并标记" placement="bottom">
								<i class="el-icon-refresh-right tipBtns" @click="getResClipsPositionRange(item.row)"></i>
							</el-tooltip>
							
							<el-tooltip class="item" effect="dark" content="文件管理器打开" placement="bottom">
								<i class="el-icon-folder tipBtns" @click="openFileOnWin(item.row)"></i>
							</el-tooltip>
							
						</template>
					</el-table-column>
					
					
				</el-table>
			</el-col>
			
			
			<!-- 分页 -->
			<el-col class="taskDetailePage">
				<el-pagination
				    :current-page.sync="currentPage"
				    :page-size="pageSize"
				    layout="prev, pager, next"
				    :total="pageCount"
					@size-change = 'setTask()'
					@current-change = 'setTask()'
					>
				</el-pagination>
				
			</el-col>
		</el-col>
		

		<!-- 显示文件列表 -->
		<el-dialog title="文件详情" :visible.sync="fileListBox" width="80%">
			<el-row :style="dialogTextBoxHeigth">
				<el-scrollbar style="height: 100%;">
					<el-col :span="24" v-for="item in fileListData" class="fileDialogTextBox" @dblclick.native="openFileOnWin(item)">
						<el-col :span="12" class="fileDialogName">
							{{item.local_name}}
						</el-col>
						<el-col :span="12" class="fileDialogPath">
							{{item.local_url}}
						</el-col>
						<el-col :span="24" class="fileDialogUser">
							{{item.outsourcing=="0"?item.pre_personnel_name:item.company_name}}  <span class="fileDialogTime">{{$TGYC.stampToDateMD(item.time)}}</span>
						</el-col>
					</el-col>
				</el-scrollbar>
			</el-row>
		</el-dialog>











		
	</div>	
</template>
<script>
	import * as echarts from 'echarts';
	import {
		Loading
	} from 'element-ui';
	export default {
		name:"我的任务详情",
		data() {
			return {
				taskId:"",
				taskData:{
					id:"",
					name:"",
					chinese_name:"",
					thum:"",
				},
				currentPage:1,
				pageSize:50,
				pageCount:0,
				dialogTextBoxHeigth: "height:" + (window.innerHeight - 246) + "px",
				taskAuditHeight:"height:" + (window.innerHeight - 240) + "px",
				taskAuditHeightNum:window.innerHeight - 240,
				//任务统计信息
				taskResStatistical:{
					videoNum:0,
					audioNum:0,
					imageNum:0,
					otherNum:0,
					differencesNum:0,
					offlineNum:0,
					newFileNum:0,
					differencesPublicNum:0,
				},
				differencesData:[],
				offlineData:[],
				differencesPublicData:[],
				taskResourcesData:[],//全部资源文件
				mytaskResourcesData:[],//我的资源文件
				fileListBox:false,//文件详情列表弹框
				fileListData:[],//文件详情列表数据
				taskProject:{},//任务工程信息
				taskTimeLine:[],//我的任务时间轴数据
				downArr:[],
				projectColor:[],//项目可用颜色
				selectResList:[],//选中资源
			}
		},
		components: {
			
		},
		mounted() {
		  // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
		  const that = this;
		  window.onresize = function temp() {
		    that.dialogTextBoxHeigth = "height:" + (window.innerHeight - 246) + "px";
		    that.taskAuditHeight = "height:" + (window.innerHeight - 240) + "px";
		    that.taskAuditHeightNum = window.innerHeight - 240;
			
		  };
		},
		created: function() {
			this.taskId = this.$route.query.taskId
			this.projectId = this.$route.query.projectId
			this.myInit()
		},
		// 在 `methods` 对象中定义方法
		methods: {
			myInit() {
				this.openNoneProject();
				this.getTask();
				this.getProjectStateColor()
				this.getTaskResources();
			},
			//获取项目颜色数据
			getProjectStateColor(){
				
				var data = {
					project_id:this.projectId
				}
				this.$PRAPI.prProjectColor.GetProjectList(data).then(res => {
					console.log("项目颜色纠正")
					console.log(res)
					
					this.projectColor = res
					
					var codeArrStr = JSON.stringify(res)
					codeArrStr = encodeURI(codeArrStr);
					console.log(codeArrStr)
					var Pathfile = 'sendProjectStateChange("' + codeArrStr + '")';
					this.$CSINTERFACE.evalScript(Pathfile);
					
					
					// this.setProjectStateColor(res)
					
				}, err => {
					console.log(err)
				});
				
			},
			// 关闭其他项目,打开空项目
			openNoneProject(){
				console.log("打开空项目")
				var nonePath = this.$TGYC.nonePath;
				var data = {
					filePath:nonePath,
					SaveAlert:false
				}
				var dataStr = JSON.stringify(data)
				dataStr = encodeURI(dataStr);
				let Pathfile = 'openOneProject("' + dataStr + '")';
				this.$CSINTERFACE.evalScript(Pathfile, (el) => {
					// this.openProjectS()
				})
			},
			//获取任务信息
			getTask(){
				let data = {
					id: this.taskId
				}
				this.$PRAPI.prtask.GetDetails(data).then(res => {
					console.log("任务信息")
					console.log(res)
					this.taskData = res
				}, err => {
					console.log(err)
				});
			},
			
			//获取资源列表
			getTaskResources(){
				let data = {
					prtask_id: this.taskId
				}
				
				this.$PRAPI.prResourcesRecord.GetOutsourceAllResources(data).then(res => {
					// console.log("资源列表")
					// console.log(res)
					
					//查看工程信息，工程版本是否存在
					
					//计算文件，统计文件信息
					
					//打开工程操作--下载文件及工程
					
					//去除多余剪辑
					
					//完成
					
					var currentProject = res.project;
					this.taskTimeLine = res.timeLine;
					this.taskProject = currentProject;
					var projectName = currentProject.local_name;
					var fIndex = projectName.lastIndexOf('.');
					var currentVersion = projectName.slice(0,fIndex) + "_P_" + currentProject.id + projectName.slice(fIndex, projectName.length)
					var currentProjectPath = currentProject.local_url + "/" + currentVersion;
					this.taskProject["currentProjectPath"] = currentProjectPath;
					this.taskProject["currentProjectName"] = currentVersion;
		
					var thData = res.res;
					var myTaskRes = []
					var colorSet = []
					for(var i=0;i<thData.length;i++){
						thData[i].isselcted = false;
						var currentState = thData[i].state
						var currentSubState = thData[i].sub_state
						if(thData[i].company_id==this.$store.state.userInfo.companyid){
							
							var currentColorCode = currentSubState!=""&&currentSubState!="0"&&currentSubState!=null&&currentSubState!="null"&&currentSubState!=undefined ? this.$TGYC.setSysColor(currentSubState) : this.$TGYC.setResourcesColorCode(currentState)
							thData[i].color = currentColorCode

							myTaskRes.push(thData[i])
						}
						
						var currentColorIndex = currentSubState!=""&&currentSubState!="0"&&currentSubState!=null&&currentSubState!="null"&&currentSubState!=undefined ? currentSubState : this.$TGYC.setResourcesColor(currentState)
						
						var thArr = {
							path:thData[i].local_url+"/"+thData[i].local_name,
							colorCode:currentColorIndex
						};
						colorSet.push(thArr);
					}
					// console.log("外包颜色校正")
					// console.log(colorSet)
		
					this.$CSINTERFACE.evalScript("GetProjectItemColor()",(res)=>{
						// console.log("项目颜色列表")
						// console.log(res)
						
						var currentResData = JSON.parse(res);
						var newResData = colorSet;
						var needChangeRes = [];
						for(var i=0;i<currentResData.length;i++){
							var currentPath = currentResData[i].path
							var currentColorIndex = currentResData[i].colorIndex
							function findRes(item){
								return item.path==currentPath
							}
							var resIndex = newResData.findIndex(findRes);
							if(resIndex>-1){
								var newColor = newResData[resIndex].colorCode;
								if(currentColorIndex!=newColor){
									var thArr = {
										path:currentPath,
										colorCode:newColor
									}
									needChangeRes.push(thArr)
								}
							}
						}
						console.log("需要修改的资源列表")
						console.log(needChangeRes)
						//设置项目资产颜色
						if(needChangeRes.length>0){
							needChangeRes = encodeURI(JSON.stringify(needChangeRes));
							var jsonfnPath = 'SetProjectItemColor("'+needChangeRes+'")';
							this.$CSINTERFACE.evalScript(jsonfnPath,()=>{
								// alert("修改完成")
								console.log("状态修改完成，执行完毕")
							});
						}else{
							console.log("状态一致，无需修改")
						}
						
					});	
					
				
					this.taskResourcesData = thData
					this.mytaskResourcesData = myTaskRes
					//统计资源，统计文件，检测更新
					this.setResourcesStatistical(thData)
					
				}, err => {
					console.log(err)
				});
			},
			
			//设置资源文件
			setResourcesStatistical(data) {
				var loadingInstance =Loading.service();
				var myCompanyId = this.$store.state.userInfo.companyid
				var mydata = data
				var videoNum =0
				var audioNum =0
				var imageNum =0
				var otherNum =0
				
				this.taskResStatistical.differencesNum = 0
				this.taskResStatistical.offlineNum = 0
				this.taskResStatistical.differencesPublicNum = 0
				
				this.differencesData = []
				this.offlineData = []
				this.differencesPublicData = []
				var pathList = []
				
				//初始化当前数据
				var offlineNumCurrent = 0;
				var offlineDataCurrent = [];
				var differencesNumCurrent = 0;
				var differencesDataCurrent = [];
				var differencesPublicNumCurrent = 0;
				var differencesPublicDataCurrent = [];
				
				var fileNum = 0
				var fileLen = mydata.length;
				
				// 文件未找到处理
				var setResLose = (fileData)=> {
					offlineNumCurrent++
					offlineDataCurrent.push(fileData)
					fileNum++
					setResData()
				}
				// 与服务器不一致处理
				var setResProving = (mtimeMs,currentMtimeMs,fileData)=> {
					if(currentMtimeMs!=mtimeMs){
						// console.log('时间不一致')
						// 判断是否是本公司任务
						if(fileData.company_id==myCompanyId){
							differencesNumCurrent++
							differencesDataCurrent.push(fileData)
						}else{
							differencesPublicNumCurrent++
							differencesPublicDataCurrent.push(fileData)
						}
						fileNum++
						setResData()
					}else{
						fileNum++
						setResData()
					}
				}
				
				//设置文件处理完成后数据
				var setResData = ()=> {
					if(fileNum>=fileLen){
						this.taskResStatistical.offlineNum = offlineNumCurrent ;
						this.offlineData = offlineDataCurrent ;
						this.taskResStatistical.differencesNum = differencesNumCurrent ;
						this.differencesData = differencesDataCurrent ;
						this.taskResStatistical.differencesPublicNum = differencesPublicNumCurrent ;
						this.differencesPublicData = differencesPublicDataCurrent ;
					}
				}
				
		
				var thet = this
				var fileStateTest = (pathName,pathUrl,currentMtimeMs,currentOldMd5,fileData)=>{
					// console.log('执行验证')
					var path = pathUrl + '/' + pathName;
					// console.log(path)
					//查看文件大小，判断文件是否能找到
					this.$FS.stat(path, (err, stats) => {
						if (!err) {
							//获取最后修改日期
							var mtimeMs = stats.mtimeMs
							mtimeMs = parseInt(mtimeMs)
							mtimeMs = thet.$TGYC.setFaileStamp(mtimeMs)
							mtimeMs = parseInt(mtimeMs)
							
							setResProving(mtimeMs,currentMtimeMs,fileData)
							
						} else {
							
							setResLose(fileData)
						}
					})
				}
				
				
				for (var i = 0; i < mydata.length; i++) {
					
					
					var local_name = mydata[i].local_name
					var local_url = mydata[i].local_url
					var fileMtimeMs = mydata[i].updtime
					var currentOldMd5 = mydata[i].md5
			
					fileStateTest(local_name,local_url,fileMtimeMs,currentOldMd5,mydata[i])
		
					var fileType =local_name==null||local_name=='' ? 'other' : local_name.slice(local_name.lastIndexOf('.')+1, local_name.length)
					
					if(fileType=='mov'||fileType=='mp4'||fileType=='WAV'){
						videoNum++
					}else if(fileType=='mp3'||fileType=='wav'||fileType=='m4a'||fileType=='wma'){
						audioNum++
					}else if(fileType=='png'||fileType=='jpg'){
						imageNum++
					}else{
						otherNum++
					}
				}
				
				this.taskResStatistical.videoNum = videoNum
				this.taskResStatistical.audioNum = audioNum
				this.taskResStatistical.imageNum = imageNum
				this.taskResStatistical.otherNum = otherNum
				
				loadingInstance.close();
				
			},
			
			setTask(){
				
			},
			openTaskResources(resourecesId) {
				this.$router.push({
					path: '/index/project/taskResources',
					query: {
						projectId: this.taskData.project_id,
						taskId: this.taskData.prtask_id,
						prresourcesId: resourecesId
					},
				})
			},
			//重新下载工程
			reloadProject(){
				var nonePath = this.$TGYC.nonePath;
				var data = {
					filePath:nonePath,
					SaveAlert:false
				}
				var dataStr = JSON.stringify(data)
				dataStr = encodeURI(dataStr);
				let Pathfile = 'openOneProject("' + dataStr + '")';
				this.$CSINTERFACE.evalScript(Pathfile, (el) => {
					var currentProjectPath = this.taskProject["currentProjectPath"]
					this.$FS.stat(currentProjectPath, (err, stats) => {
						if (!err) {
							//删除工程
							this.$FS.unlink(currentProjectPath,(error)=>{
							    if(error){
							        console.log(error);
							        return false;
							    }
							    // console.log('删除文件成功');
								this.openProject()
							})
						} else {
							//没有找到工程
							this.openProject()
						}
					})
				})
				
			},
			openProject(){
		
				// this.taskProject
				// this.taskResourcesData
				
				// 检测并下载工程
				
				//检测并下载资源
				
				//全部下载完成
				
				//打开工程
				
				//删除多余剪辑
				
				this.downArr = [];//需要下载资源列表
				var currentProject = this.taskProject;
				var addDownProject = ()=>{
					var newArr = {
						"id":"task" + currentProject.id,
						"type": 1,
						"operation": 0,
						"local_name":currentProject.currentProjectName ,
						"local_url":currentProject.local_url ,
						"service_name":currentProject.service_name ,
						"service_url":currentProject.service_url ,
						"updtime":currentProject.updtime,
						"process" : 0,
						"state" : '等待下载',
						"setComplete" : (data) =>{	//完成回调
							//去除下载记录
							function findTask(list){
								return list.id == data.id
							}
							var myIndex = this.downArr.findIndex(findTask);
							if(myIndex>-1){
								this.downArr.splice(myIndex,1)
							}
							if(this.downArr.length==0){
								//执行，打开工程
								console.log("现在打开工程1")
								openCurrentProject()
							}
						},
						"setProgress" : (passNum,data) =>{	//进度回调
							
						},
					}
					this.downArr.push(newArr);
					startPushRes()
				}
				var addDownLisst = (downData,resType) =>{
					// console.log(downData)
					var newArr = {
						"id":"res" + downData.id,
						"type": 1,
						"operation": 0,
						"local_name":downData.local_name ,
						"local_url":downData.local_url ,
						"service_name":downData.service_name ,
						"service_url":downData.service_url ,
						"updtime":downData.updtime,
						"process" : 0,
						"state" : '等待下载',
						"setComplete" : (data) =>{	//完成回调
							//去除下载记录
							function findTask(list){
								return list.id == data.id
							}
							var myIndex = this.downArr.findIndex(findTask);
							if(myIndex>-1){
								this.downArr.splice(myIndex,1)
							}
							if(this.downArr.length==0){
								//执行，打开工程
								console.log("现在打开工程2")
								openCurrentProject()
							}
							switch (resType){
								case "offline":
									function findFile(list){
										return list.local_name == data.local_name && list.local_url == data.local_url 
									}
									var fileIndex = this.offlineData.findIndex(findFile)
									if(fileIndex>-1){
										this.offlineData.splice(fileIndex,1)
										this.taskResStatistical.offlineNum = this.taskResStatistical.offlineNum - 1
									}
									
									break;
								case "differencesPublic":
									function findFile2(list){
										return list.local_name == data.local_name && list.local_url == data.local_url 
									}
									var fileIndex2 = this.differencesPublicData.findIndex(findFile2)
									if(fileIndex2>-1){
										this.taskResStatistical.differencesPublicNum = this.taskResStatistical.differencesPublicNum - 1;
										this.differencesPublicData.splice(fileIndex2,1)
									}
									
									break;
							}
						},
						"setProgress" : (passNum,data) =>{	//进度回调
							
						},
					}
					this.downArr.push(newArr);
				}
				var startPushRes = ()=>{
					// 查看公共差异和脱机,将应该下载资源整合到下载列表
					// differencesPublicData   offlineData
					// console.log("脱机文件")
					// console.log(this.offlineData)
					// console.log("公共差异文件")
					// console.log(this.differencesPublicData)
					for(var item in this.offlineData){
						addDownLisst(this.offlineData[item],"offline")
					}
					for(var item in this.differencesPublicData){
						addDownLisst(this.differencesPublicData[item],"differencesPublic")
					}
					
					// console.log("开始下载这些文件")
					// console.log(this.downArr)
					//资源已添加到下载任务，开始执行下载
					
					if(this.downArr.length>0){
						for(var item in this.downArr){
							var itemData = this.downArr[item]
							//检测是否在下载队列
							function findFileList(list){
								return list.local_name == itemData.local_name && list.local_url == itemData.local_url 
							}
							var isInUpload = this.$parent.fileManageList.fileDown.findIndex(findFileList)
							if(isInUpload==-1){
								this.$parent.fileManageList.fileDown.push(itemData)
								this.$parent.fileManageList.num = this.$parent.fileManageList.num +1
								this.$parent.fileManage(itemData)
							}
						}
					}else{
						openCurrentProject()
					}
					
				}
		
				var currentProjectPath = this.taskProject["currentProjectPath"]
				this.$FS.stat(currentProjectPath, (err, stats) => {
					if (!err) {
						//找到了工程，开始计算资源
						startPushRes()
					} else {
						//没有找到工程
						addDownProject()
					}
				})
				
				var openCurrentProject = ()=>{
					// currentProjectPath
					//先打开一下空项目
					var nonePath = this.$TGYC.nonePath;
					var nonedata = {
						filePath:nonePath,
						SaveAlert:false
					}
					var noneDataStr = JSON.stringify(nonedata)
					noneDataStr = encodeURI(noneDataStr);
					let nonePathfile = 'openOneProject("' + noneDataStr + '")';
					this.$CSINTERFACE.evalScript(nonePathfile, (el) => {
						// 清理差异和脱机
						
						this.offlineData = []
						this.differencesPublicData = []
						
						this.taskResStatistical.differencesPublicNum = 0
						this.taskResStatistical.offlineNum = 0
						
						var fileListPath = [];
						for(var i=0;i<this.taskResourcesData.length;i++){
							fileListPath.push(this.taskResourcesData[i].local_url+"/"+this.taskResourcesData[i].local_name)
						}
						
						var data = {
							filePath:currentProjectPath,
							fileList:fileListPath,
							timeLine:this.taskTimeLine
						}
						var dataStr = JSON.stringify(data)
						dataStr = encodeURI(dataStr);
						console.log(dataStr)
						let Pathfile = 'openOutsourceProjectNew("' + dataStr + '")';
						// let Pathfile = 'openOutsourceProjectNew("zjliang[]")';
						
						var options = {
							text:"工程处理中，请稍等。。。"
						}
						var sysLoading =Loading.service(options);
						
						this.$CSINTERFACE.evalScript(Pathfile, (el) => {
							console.log("文件打开成功")
							console.log(el)
							sysLoading.close(); 
							this.getTaskResources();
							if(el=="err"){
								this.$alert('请重试，如果还未解决，请联系管理员', 'PR内部错误', {
								  confirmButtonText: '确定',
								  callback: action => {
									
								  }
								});
							}
						})
					})
					
				}
				
				// //查看文件大小，判断文件是否能找到
				// var path = this.taskData.children.local_url+"/dome"+this.taskData.children.local_name
				// var nonePath = this.$TGYC.nonePath;
				// this.$FS.stat(path, (err, stats) => {
				// 	if (!err) {
				// 		//删除本地文件
				// 		this.$FS.unlinkSync(path);
				// 		//打开占位文件
				// 		this.$FS.writeFileSync(path, this.$FS.readFileSync(nonePath));
				// 		var data = {
				// 			filePath:nonePath,
				// 			SaveAlert:false
				// 		}
				// 		var dataStr = JSON.stringify(data)
				// 		let Pathfile = 'openOneProject(' + dataStr + ')';
				// 		this.$CSINTERFACE.evalScript(Pathfile, (el) => {
				// 			this.openProjectS()
				// 		})
				// 	} else {
				// 		console.log(path)
				// 		console.log('文件未找到')
				// 		//复制模板工程，改名
				// 		this.$FS.writeFileSync(path, this.$FS.readFileSync(nonePath));
				// 		this.openProjectS()
				// 	}
				// })
				
				
				
				
				
				
			},
			openProjectS(){
				var myData =this.taskResourcesData
				for(var i=0;i<myData.length;i++){
					var clipsData = myData[i].clips
					if((typeof clipsData=='string')&&clipsData.constructor==String){
						clipsData = clipsData==""||clipsData==null||clipsData=="null"||clipsData==undefined ? [] : JSON.parse(clipsData);
					}
					myData[i].clips = clipsData
					myData[i].filePath = myData[i].local_url + "/" + myData[i].local_name
					// if(myData[i].pubresource!="1"){
						myData[i].colorCode = this.$TGYC.setResourcesColor( myData[i].state)
					// }else{
					// 	myData[i].colorCode = 14
					// }
					
				}
				var projectData = {
					id:	this.taskData.id,
					name:this.taskData.name,
					documentID:this.taskData.children.identifycode,
					projectPath:this.taskData.children.local_url+"/dome"+this.taskData.children.local_name,
					fileList:myData,
					sqpresetPath:"C:\\TGYC\\appData\\PProPanel.sqpreset"
				};
				var loadingInstance =Loading.service();
				//检测本地工程文件路径，有则删除
				var projectData = JSON.stringify(projectData);
				// console.log(projectData)
				let Pathfile = 'openOutsourceProject('+ projectData +')';
				this.$CSINTERFACE.evalScript(Pathfile, (el) => {
					// console.log("工程已经打开")
					// console.log(el)
					loadingInstance.close();
					
				})
			},
			
			
			
			//资源右键事件
			taskResourcesMenu(event) {
				
				var menuData = [
					{
						label: "详情",
						onClick: () => {
							// console.log("差异详情")
							// console.log(this.differencesData)
							this.openFileListBox(this.differencesData)
						}
					},
					{
						label: "上传选中",
						onClick: () => {
							var isSubmit = "false";
							var isSelected = true;
							this.uploadDifferencesRes(isSubmit,isSelected)
						}
					},
					{
						label: "上传选中并提审",
						onClick: () => {
							var isSubmit = "true";
							var isSelected = true;
							this.uploadDifferencesRes(isSubmit,isSelected)
						}
					},
					
					{
						label: "全部上传",
						onClick: () => {
							var isSubmit = "false";
							var isSelected = false;
							this.uploadDifferencesRes(isSubmit,isSelected)
						}
					},
					{
						label: "全部上传并提交审核",
						onClick: () => {
							var isSubmit = "true";
							var isSelected = false;
							this.uploadDifferencesRes(isSubmit,isSelected)
						}
					},
					{
						label: "下载",
						onClick: () => {
							this.downDifferencesRes()
						}
					},
					{
						label: "检测",
						onClick: () => {
							this.getTaskResources();
						}
					},
				]
				this.$contextmenu({
					items: menuData,
					event,
					customClass: "tgycContextMenu",
					zIndex: 9999,
					minWidth: 130,
				});
				return false;
			
			},
			
			//资源右键事件
			taskResourcesPublicMenu(event) {
				
				var menuData = [
					{
						label: "详情",
						onClick: () => {
							// console.log("公共文件差异详情")
							// console.log(this.differencesPublicData)
							this.openFileListBox(this.differencesPublicData)
						}
					},
					{
						label: "下载",
						onClick: () => {
							this.downDifferencesResPublic()
						}
					},
					{
						label: "检测",
						onClick: () => {
							this.getTaskResources();
						}
					},
				]
				this.$contextmenu({
					items: menuData,
					event,
					customClass: "tgycContextMenu",
					zIndex: 9999,
					minWidth: 130,
				});
				return false;
			
			},
			
			
			//资源右键事件
			taskResourcesMenu2(event) {
				var menuData = [
					{
						label: "详情",
						onClick: () => {
							// console.log("脱机详情")
							// console.log(this.offlineData)
							this.openFileListBox(this.offlineData)
						}
					},
					{
						label: "下载",
						onClick: () => {
							this.downOfflineRes()
						}
					},
					{
						label: "检测",
						onClick: () => {
							this.getTaskResources();
						}
					},
				]
				this.$contextmenu({
					items: menuData,
					event,
					customClass: "tgycContextMenu",
					zIndex: 9999,
					minWidth: 130,
				});
				return false;
			},
			
			openFileListBox(data){
				this.fileListBox = true;
				this.fileListData = data;
			},
			closeFileListBox(){
				this.fileListBox = false;
				this.fileListData = [];
			},

			// 上传差异文件
			/*
				@isSubmit  是否提交审核
				@isSelected	是否只上传选中
			*/
			uploadDifferencesRes(isSubmit,isSelected) {
				var myCompanyId = this.$store.state.userInfo.companyid
				var startUploadFile = (thFile)=>{
					var fileName = thFile.local_name
					var filePath = thFile.local_url
					var path = filePath + '/' + fileName;
					
					//查看文件大小，判断文件是否能找到
					this.$FS.stat(path, (err, stats) => {
						if (!err) {
							var size = stats.size
							//获取最后修改日期
							var mtimeMs = stats.mtimeMs
							mtimeMs = this.$TGYC.setFaileStamp(mtimeMs)
							mtimeMs = parseInt(mtimeMs)
							
							if(thFile.updtime!=mtimeMs){
								//验证版本
								var currentMd5 = this.$TGYC.setFileName();
								
								var serviceName = 'res' + thFile.prresources_id + currentMd5 + fileName.slice(fileName.lastIndexOf('.'), fileName.length);
								var serviceUrl = '/assets/' + this.$TGYC.getDateYMD();
								
									
								thFile.service_name = serviceName
								thFile.service_url = serviceUrl
								thFile.md5 = currentMd5
								thFile.size = size
								thFile.updtime = mtimeMs
								
								//检测是否在上传队列
								function findFileList(list){
									return list.local_name == thFile.local_name && list.local_url == thFile.local_url
								}
								var isInUpload = this.$parent.fileManageList.fileUpload.findIndex(findFileList)
								if(isInUpload==-1){
									this.$parent.fileManageList.fileUpload.unshift(thFile)
									this.$parent.fileManageList.num = this.$parent.fileManageList.num + 1
									this.$parent.fileManage(thFile)
								}
								
							}else{
								console.log('服务器版本一致,无需上传')
								// removeFile('版本一致')
								this.$notify({
									message: path + '版本一致，无需上传',
									type: 'warning',
									position: 'bottom-right'
								});
							}
						} else {
							console.log('文件未找到')
							thFile.describe = "本地文件未找到";
							this.$parent.fileManageList.fileErr.unshift(thFile)
						}
					})
				}
				var startUploadData = (fileListData)=>{
					console.log('开始分析文件')
					// var resData = this.differencesData
					var resData = fileListData
					//判断文件路径真实性
					var errData = ""
					//分析任务列表，添加上待上传列表
					for(var i=0;i<resData.length;i++){
						if(resData[i].state!="2"){
							if(resData[i].company_id==myCompanyId){
								var thArr = {
									id:resData[i].local_name,
									type:0,
									operation:0,
									project_id: resData[i].project_id,
									prtask_id: resData[i].prtask_id,
									prresources_id: resData[i].id,
									local_name: resData[i].local_name,
									local_url: resData[i].local_url,
									process: 0,
									state: '等待上传',
									version: '0',
									thum: '',
									service_name: '',
									service_url: '',
									md5: resData[i].md5,
									size: '',
									introduction: '',
									updtime:'',
									mtimeMs: resData[i].updtime ,
									isSubmit:isSubmit,
									outsourcing:resData[i].outsourcing,
									company_id:resData[i].company_id,
									company_name:resData[i].company_name,
									
									setComplete:(data) =>{	//完成回调
										// this.taskResStatistical.differencesNum = this.taskResStatistical.differencesNum - 1
										// console.log("差异上传完成回调")
										// console.log(data)
										// console.log(this.differencesData)
										let thdata = data
										this.$PRAPI.prResourcesRecord.AddRecord(thdata).then(res => {
											// console.log('添加成功')
										}, err => {
											console.log(err)
										});
										//移除已上传
										var currentLocalName = data.local_name
										function findFile(list){
											return list.local_name == currentLocalName
										}
										var fileIndex = this.differencesData.findIndex(findFile)
										if(fileIndex>-1){
											this.differencesData.splice(fileIndex,1)
											this.taskResStatistical.differencesNum = this.taskResStatistical.differencesNum - 1
										}
										// console.log("差异上传完成回调处理后")
										// console.log(this.differencesData)
										if(this.differencesData.length==0){
											this.$confirm('差异文件上传完成，是否重新打开工程文件？', '差异下载完成提示', {
												confirmButtonText: '确定',
												cancelButtonText: '取消',
												type: 'warning'
											}).then(() => {
												this.openProject()
											}).catch(() => {
											
											});
										}
									},
									setProgress:()=>{
										
									}
								}
								startUploadFile(thArr);
							}else{
								resData[i].local_name + "不是您的资源，不能上传！！！"
							}
							
						}else{
							this.$TGYC.sendErr(resData[i].local_name + "是完成状态不能上传！！！")
						}
					}
					if(errData!=""){
						this.$notify({
						    message: errData + "不是您负责的资源，无法上传！！！",
						    type: 'warning',
									position: 'bottom-right'
						});
					}
				}
				
				if(isSelected){
					// 搜寻选中资源
					//查找可更新资源
					// 赋值给数据
					this.$CSINTERFACE.evalScript("getSlectionRes()",(el)=>{
						console.log('当前选中项为');
						console.log(el);
						if(el!="err"){
							var elData = JSON.parse(el);
							if(elData.data.length>0){
								var selectionData = elData.data;
								var currentIdentifyCode = elData.identifyCode;
								
								var currentDifferencesData = this.differencesData;
								console.log("当前有差异")
								console.log(currentDifferencesData)
								
								var pathData = [];
								for(var i=0;i<selectionData.length;i++){
									// var thArr = {
									// 	local_name:selectionData[i].fileName,
									// 	local_url:selectionData[i].fileDir
									// };
									// pathData.push(thArr);
									var currentDir = selectionData[i].fileDir;
									var currentName = selectionData[i].fileName;
									function findRes(list){
										return list.local_name == currentName && list.local_url == currentDir
									}
									var isInDifferences = currentDifferencesData.findIndex(findRes);
									if(isInDifferences>-1){
										pathData.push(currentDifferencesData[isInDifferences]);
									}
								}
								console.log(pathData)
								if(pathData.length>0){
									startUploadData(pathData)
								}else{
									this.$notify({
										message: '选中资源没有检测到更新',
										type: 'warning',
									position: 'bottom-right'
									});
								}
							}else{
								this.$notify({
									message: '请先选中资源',
									type: 'warning',
									position: 'bottom-right'
								});
							};
						}	
					});
					
					
				}else{
					startUploadData(this.differencesData)
					
				}

			},
			
			
			// 下载差异文件
			downDifferencesRes() {
				var downData = []
				var resData = this.differencesData
				console.log('索引下载文件')
				
				//验证本地版本，本地没有的下载，有的验证最后修改日期，不一样的验证版本，一样的下载，验证版本，版本不一样的下载
				
				for (var i = 0; i < resData.length; i++) {
					
					if(resData[i]['local_name'] != null&&resData[i]['local_name'] != ''){
						
						var currentMtimeMs = resData[i].updtime
						var	currentMd5 = resData[i].md5
						
						var newArr = {
							"id": resData[i].id,
							"type": 1,
							"operation": 0,
							"index":i,
							"local_name": resData[i]['local_name'],
							"local_url": resData[i]['local_url'],
							"service_name": resData[i]['service_name'],
							"service_url": resData[i]['service_url'],
							"process" : 0,
							"state" : '等待下载',
							"updtime":currentMtimeMs,
							"md5":currentMd5,
							"setComplete" : (data) =>{	//完成回调
								
								var currentLocalName = data.local_name
								function findFile(list){
									return list.local_name == currentLocalName
								}
								var fileIndex = this.differencesData.findIndex(findFile)
								if(fileIndex>-1){
									this.differencesData.splice(fileIndex,1)
									this.taskResStatistical.differencesNum = this.taskResStatistical.differencesNum - 1
								}
								
								if(this.differencesData.length==0){
									this.$confirm('差异文件下载完成，是否重新打开工程文件？', '差异下载完成提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
										type: 'warning'
									}).then(() => {
										this.openProject()
									}).catch(() => {
									
									});
								}
								
							},
							"setProgress" : (passNum,data) =>{	//进度回调
								
							},
						}
						
						//检测是否在下载队列
						function findFileList(list){
							return list.local_name == resData[i].local_name&&list.local_url == resData[i].local_url
						}
						var isInUpload = this.$parent.fileManageList.fileDown.findIndex(findFileList)
						if(isInUpload==-1){
							this.$parent.fileManageList.fileDown.unshift(newArr)
							this.$parent.fileManageList.num = this.$parent.fileManageList.num +1
							this.compareFile(newArr)
						}
						
					}
				}
			},	
			
			
			// 下载公共差异文件
			downDifferencesResPublic() {
				var downData = []
				var resData = this.differencesPublicData
				console.log('索引下载文件')
				
				//验证本地版本，本地没有的下载，有的验证最后修改日期，不一样的验证版本，一样的下载，验证版本，版本不一样的下载
				
				for (var i = 0; i < resData.length; i++) {
					
					if(resData[i]['local_name'] != null&&resData[i]['local_name'] != ''){
						
						var currentMtimeMs = resData[i].updtime
						var	currentMd5 = resData[i].md5
						
						var newArr = {
							"id": resData[i].id,
							"type": 1,
							"operation": 0,
							"index":i,
							"local_name": resData[i]['local_name'],
							"local_url": resData[i]['local_url'],
							"service_name": resData[i]['service_name'],
							"service_url": resData[i]['service_url'],
							"process" : 0,
							"state" : '等待下载',
							"updtime":currentMtimeMs,
							"md5":currentMd5,
							"setComplete" : (data) =>{	//完成回调
								
								var currentLocalName = data.local_name
								function findFile(list){
									return list.local_name == currentLocalName
								}
								var fileIndex = this.differencesPublicData.findIndex(findFile)
								if(fileIndex>-1){
									this.differencesPublicData.splice(fileIndex,1)
									this.taskResStatistical.differencesPublicNum = this.taskResStatistical.differencesPublicNum - 1
								}
								
								if(this.differencesPublicData.length==0){
									this.$confirm('差异文件下载完成，是否重新打开工程文件？', '差异下载完成提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
										type: 'warning'
									}).then(() => {
										this.openProject()
									}).catch(() => {
									
									});
								}
								
							},
							"setProgress" : (passNum,data) =>{	//进度回调
								
							},
						}
						
						//检测是否在下载队列
						function findFileList(list){
							return list.local_name == resData[i].local_name&&list.local_url == resData[i].local_url
						}
						var isInUpload = this.$parent.fileManageList.fileDown.findIndex(findFileList)
						if(isInUpload==-1){
							this.$parent.fileManageList.fileDown.unshift(newArr)
							this.$parent.fileManageList.num = this.$parent.fileManageList.num +1
							this.compareFile(newArr)
						}
						
					}
				}
			},	
			
			
			
			
			
			
			
			
			
			
			// 下载脱机文件
			downOfflineRes() {
				var downData = []
				var resData = this.offlineData
				console.log('索引下载文件')
				
				//验证本地版本，本地没有的下载，有的验证最后修改日期，不一样的验证版本，一样的下载，验证版本，版本不一样的下载
				
				for (var i = 0; i < resData.length; i++) {
					
					if(resData[i]['local_name'] != null&&resData[i]['local_name'] != ''){
						
						var currentMtimeMs = resData[i].updtime
						var	currentMd5 = resData[i].md5
						
						var newArr = {
							"id": resData[i].id,
							"type": 1,
							"operation": 0,
							"index":i,
							"local_name": resData[i]['local_name'],
							"local_url": resData[i]['local_url'],
							"service_name": resData[i]['service_name'],
							"service_url": resData[i]['service_url'],
							"process" : 0,
							"state" : '等待下载',
							"updtime":currentMtimeMs,
							"md5":currentMd5,
							"setComplete" : (data) =>{	//完成回调
								
								var currentLocalName = data.local_name
								function findFile(list){
									return list.local_name == currentLocalName
								}
								var fileIndex = this.offlineData.findIndex(findFile)
								if(fileIndex>-1){
									this.offlineData.splice(fileIndex,1)
									this.taskResStatistical.offlineNum = this.taskResStatistical.offlineNum - 1
								}
								
								if(this.offlineData.length==0){
									this.$confirm('脱机文件下载完成，是否重新打开工程文件？', '脱机下载完成提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
										type: 'warning'
									}).then(() => {
										this.openProject()
									}).catch(() => {
									
									});
								}
								
							},
							"setProgress" : (passNum,data) =>{	//进度回调
								
							},
						}
						
						
						//检测是否在下载队列
						function findFileList(list){
							return list.local_name == resData[i].local_name&&list.local_url == resData[i].local_url
						}
						var isInUpload = this.$parent.fileManageList.fileDown.findIndex(findFileList)
						if(isInUpload==-1){
							this.$parent.fileManageList.fileDown.unshift(newArr)
							this.$parent.fileManageList.num = this.$parent.fileManageList.num +1
							this.compareFile(newArr)
						}
					}
				}
			},
			
			
			//验证下载资源是否需要下载
			compareFile(data){
				console.log('验证是否下载')
				//比较最后修改时间
				//比较md5
				var currentMtimeMs =  data.updtime
				var currentOldMd5 = data.md5
				var fileName = data.local_name
				var filePath = data.local_url
				
				//文件路径
				var path = filePath + '/' + fileName;
				
				var fileDownArr = this.$parent.fileManageList.fileDown
				function findCurrentUpload(thFile){
					return thFile.id == data.id
				}
				
				var that = this
				//从下载列表中移除
				function removeFile(message){
					var fileDownIndex = fileDownArr.findIndex(findCurrentUpload)
					if(fileDownIndex>-1){
						that.$parent.fileManageList.fileDown[fileDownIndex].process = 100
						that.$parent.fileManageList.fileDown[fileDownIndex].state = message
						
						that.$parent.fileManageList.fileSuccess.unshift(that.$parent.fileManageList.fileDown[fileDownIndex])
						that.$parent.fileManageList.fileDown.splice(fileDownIndex,1)
						that.$parent.fileManageList.num = that.$parent.fileManageList.num -1
				
					}
				}
				
				//查看文件大小，判断文件是否能找到
				this.$FS.stat(path, (err, stats) => {
					if (!err) {
						//获取最后修改日期
						var mtimeMs = stats.mtimeMs
						mtimeMs = this.$TGYC.setFaileStamp(mtimeMs)
						mtimeMs = parseInt(mtimeMs)
						
						if(currentMtimeMs!=mtimeMs){
							// //验证版本
							// var md5sum = this.$CRYPTO.createHash('md5');
							// var stream = this.$FS.createReadStream(path);
							// stream.on('data', (chunk) => {
							// 	md5sum.update(chunk);
							// });
							// stream.on('end', () => {
							// 	var str = md5sum.digest('hex');
							// 	var currentMd5 = str
								
							// 	if(currentOldMd5!=currentMd5){
							// 		console.log('版本不一致')
									this.$parent.fileManage(data)
							// 	}else{
							// 		console.log('服务器md5版本一致,无需下载')
									// removeFile('版本一致')
							// 	}
							// });
						}else{
							console.log('服务器版本一致,无需下载')
							removeFile('版本一致')
						}
					} else {
						console.log(path)
						console.log('文件未找到')
						this.$parent.fileManage(data)
					}
				})
				
				
			},
			//跳转到对应片段位置
			getResClipsPosition(data){
				console.log(data)
				var resPath = data.local_url + '/' + data.local_name
				let Pathfile = 'GetProjectResClips("' + resPath + '")';
				this.$CSINTERFACE.evalScript(Pathfile, (el) => {
					// console.log(el)
					if(el!="err"){
						var pathList = JSON.parse(el)
						if(pathList.length==0){
							this.$notify({
								message: '时间轴中没有找到该片段！！！',
								type: 'warning',
									position: 'bottom-right'
							});
						}
					}
				})
				
			},
			
			//跳转到对应片段位置并设置出入点
			getResClipsPositionRange(data){
				console.log(data)
				var resPath = data.local_url + '/' + data.local_name
				let Pathfile = 'GetProjectResClipsRange("' + resPath + '")';
				this.$CSINTERFACE.evalScript(Pathfile, (el) => {
					console.log(el)
					if(el!="err"){
						if(el=='[]'){
							this.$notify({
								message: '时间轴中没有找到该片段！！！',
								type: 'warning',
									position: 'bottom-right'
							});
						}
					}	
				})
				
			},
			//设置资源选中事件
			setResListSelect(val){
				this.selectResList = val
				// console.log(this.selectResList)
			},
			//资源右键事件
			taskResourcesListMenu(data,event) {
				var menuData = [
					
					{
						label: "提交审核",
						onClick: () => {
							// console.log("提交审核")
							this.setResColor()
						}
					},
					// {
					// 	label: "全选",
					// 	onClick: () => {
					// 		this.setResSelect()
					// 	}
					// },
					// {
					// 	label: "取消选择",
					// 	onClick: () => {
					// 		this.clearResSelect()
					// 	}
					// },
					{
						label: "打开文件位置",
						onClick: () => {
							var filePath = data.local_url + "/" + data.local_name
							this.$TGYC.toFileDir(filePath)
						}
					},
				]
				this.$contextmenu({
					items: menuData,
					event,
					customClass: "tgycContextMenu",
					zIndex: 9999,
					minWidth: 130,
				});
				return false;
			},
			
			//全选资源
			setResSelect(){
				for(var i=0;i<this.mytaskResourcesData.length;i++){
					this.mytaskResourcesData[i].isselcted = true;
				}
			},
			//取消选择
			clearResSelect(){
				for(var i=0;i<this.mytaskResourcesData.length;i++){
					this.mytaskResourcesData[i].isselcted = false;
				}
			},
			
			//更改资源状态
			setResColor(){
				
				// this.selectResList
				var currentSelectResList = this.selectResList;
				
				if(currentSelectResList.length==0){
					this.$TGYC.sendErr("请先选中列表")
					return false
				}
				
				var selectData = []
				var selectIdList = []
				var pathList = []
				for(var i=0;i<currentSelectResList.length;i++){
					if(currentSelectResList[i].state!="0"&&currentSelectResList[i].state!="2"){
						selectData.push(currentSelectResList[i])
						selectIdList.push(currentSelectResList[i].id)
						var thArr = {
							path:currentSelectResList[i].local_url+"/"+currentSelectResList[i].local_name,
							stateCode:0,
							colorCode:this.$TGYC.setResourcesColor(0)
						}
						pathList.push(thArr)
					}
				}
				
				if(selectIdList.length>0){
					var selectIdListStr = JSON.stringify(selectIdList)
					let data = {
						idlist:selectIdListStr,
						state:0,
						sub_state:"0"
					}
					this.$PRAPI.prResourcesRecord.BatchUpdState(data).then(res => {
						for(var i=0;i<selectData.length;i++){
							var currentResId = selectData[i].id
							function findRes(list){
								return list.id == currentResId
							}
							var resIndex = this.mytaskResourcesData.findIndex(findRes)
							if(resIndex>-1){
								this.mytaskResourcesData[resIndex].state = "0"
								this.mytaskResourcesData[resIndex].sub_state = "0"
								this.mytaskResourcesData[resIndex].color = this.$TGYC.setResourcesColorCode("0")
							}
							
						}
						
						pathList = JSON.stringify(pathList)
						pathList = encodeURI(pathList);
						// console.log(pathList)
						var jsonfnPath = 'SetProjectItemColor("'+pathList+'")';
						this.$CSINTERFACE.evalScript(jsonfnPath);
						
						
					}, err => {
						console.log(err)
					});
				}else{
					this.$TGYC.sendErr("未发现可修改的资源")
				}
				
				
				
				
			},
			
			//在资源管理器打开文件
			openFileOnWin(data){
				var path = data.local_url + "/" + data.local_name;
				var sep = '\\';
				path = path.replace(/\//g, sep);
				
				var cmd="explorer /select," + path;
				var exec = window.tgyc.exec;
				exec(cmd, function(err, stdout, stderr) {
				    if(err){ return console.log(err); }
				});
				
			},
			
			
			//跳转到对应片段位置
			getResClipsPosition(data){
				console.log(data)
				var resPath = data.local_url + '/' + data.local_name
				let Pathfile = 'GetProjectResClips("' + resPath + '")';
				this.$CSINTERFACE.evalScript(Pathfile, (el) => {
					// console.log(el)
					if(el!="err"){
						var pathList = JSON.parse(el)
						if(pathList.length==0){
							this.$notify({
								message: '时间轴中没有找到该片段！！！',
								type: 'warning',
									position: 'bottom-right'
							});
						}
					}
				})
				
			},
					
			//跳转到对应片段位置并设置出入点
			getResClipsPositionRange(data){
				console.log(data)
				var resPath = data.local_url + '/' + data.local_name
				let Pathfile = 'GetProjectResClipsRange("' + resPath + '")';
				this.$CSINTERFACE.evalScript(Pathfile, (el) => {
					console.log(el)
					if(el!="err"){
						if(el=='[]'){
							this.$notify({
								message: '时间轴中没有找到该片段！！！',
								type: 'warning',
									position: 'bottom-right'
							});
						}
					}
				})
				
			},
			//显示统计
			showStatistics(){
				var fileData = this.mytaskResourcesData
				console.log("我的任务信息")
				console.log(fileData)
				console.log("项目颜色信息")
				console.log(this.projectColor)
				
				// 处理统计数据
				var stData = [];
				for(var i=0;i<fileData.length;i++){
					fileData[i].sub_state = fileData[i].sub_state==null?"0":fileData[i].sub_state
					function findState(list){
						return list.state==fileData[i].state&&list.sub_state == fileData[i].sub_state
					}
					var sIndex = stData.findIndex(findState);
					if(sIndex>-1){
						stData[sIndex].value = stData[sIndex].value+1
					}else{
						var thArr = {
							value:1,
							name:"",
							state:fileData[i].state,
							sub_state:fileData[i].sub_state,
						}
						
						//匹配状态名称	待审-刘老师通过    返修-动画导演返修
						var stateName = this.$TGYC.setResourcesStateName(fileData[i].state)
						var subStateName = this.$TGYC.setResourcesSubStateName(this.projectColor,fileData[i].sub_state)
						thArr.name = subStateName!=""?stateName+"-"+subStateName :stateName
						stData.push(thArr)
					}
				}
				console.log(stData)
				
				// 基于准备好的dom，初始化echarts实例
				
				let myChart = echarts.init(document.getElementById('myChart'))
				// 绘制图表
				myChart.setOption({

					series: [
						{
							name: '访问来源',
							type: 'pie',
							radius: '50%',
							data:stData,
						}
					]
				});
			}
		}
	}
</script>