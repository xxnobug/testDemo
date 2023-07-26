<!-- 任务匹配 -->
<template>
	<el-row>
		<el-col :span="24">
			<div class="resTaskTitle">
				{{taskName}}
				<div class="resTaskTitleRight">
					<span class="resTaskTitleRightT" @change="setShowRes">
						<el-checkbox-group class="resTaskCheckboxBtns" v-model="checkList">
							<el-checkbox label="未关联" ></el-checkbox>
							<el-checkbox label="已关联" ></el-checkbox>
						</el-checkbox-group>
					</span>
					<div class="resTaskTitleInput">
						<el-input v-model="searchInput" size="mini" placeholder="搜索" clearable @keyup.enter.native="submitSearch" @clear="clearSearch">
							<el-button size="mini" slot="append" icon="el-icon-search" @click="submitSearch"></el-button>
						</el-input>
					</div>
					<div class="resTaskTitleBtns">
						<el-tooltip class="item" effect="dark" content="上传模板匹配" placement="bottom">
							<el-button size="mini" icon="el-icon-upload2" @click="uploadResModelXlsx"></el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="下载未匹配数据模板" placement="bottom">
							<el-button size="mini" icon="el-icon-download" @click="downResModel"></el-button>
						</el-tooltip>
						
					</div>
				</div>
			</div>
			<div class="resTaskBox">
				<div class="resTaskBoxP" :style="resListHeigth">
					<el-scrollbar style="height: 100%;">
						<div class="resTaskList" v-for="item in showResList" :key="item.id" @contextmenu.prevent="resListMenu(item,$event)">
							<div class="resTaskListContent">
								<div class="resTaskListName">
									{{item.local_name}}
								</div>
								<div class="resTaskListPath">
									{{item.local_url}}
								</div>
								<div class="resTaskListTask">
									<div class="resTaskListTaskBox">
										<div class="resTaskListTaskNameImg">
											<img src="@/assets/img/relation.png"/>
										</div>
										<div v-if="!item.relation"  class="resTaskListTaskNo">
											未关联任务
										</div>
										<div v-if="item.relation"  class="resTaskListTaskName">
											{{item.task_name}}
										</div>
										<div v-if="item.relation" class="resTaskListTaskNode">
											{{item.merge_name}}（{{item.merge_englishname}}）
										</div>
									</div>
								</div>
							</div>
						</div>
					</el-scrollbar>
				</div>
			</div>
			<div class="resTaskCont">
				总数:{{showResCount.count}},  已关联:{{showResCount.relation}},	未关联:{{showResCount.noRelation}}
			</div>
		</el-col>
		
		
		
		
		
		
		
		
		<!-- 信息确认窗口 -->
		<!-- 上传表格统计信息 -->
		<el-dialog title="文件校验" :visible.sync="uploadDialog" width="80%">
			<el-row :style="uploadDialogHeigth">
				<el-scrollbar style="height: 100%;">

					<div class="resDialogList" v-for="item in errData">
						<div class="resDialogListContent">
							<div class="resDialogListName">
								{{item.local_name}}
							</div>
							<div class="resDialogListPath">
								{{item.local_url}}
							</div>
							<div class="resDialogListTask">
								<div class="resDialogListTaskBox">
									<div class="resDialogListTaskNameImg">
										<img src="@/assets/img/relation.png"/>
									</div>
									<div class="resDialogListTaskErr">
										{{item.err}}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="resDialogList" v-for="item in needRelationData">
						<div class="resDialogListContent">
							<div class="resDialogListName">
								{{item.local_name}}
							</div>
							<div class="resDialogListPath">
								{{item.local_url}}
							</div>
							<div class="resDialogListTask">
								<div class="resDialogListTaskBox">
									<div class="resDialogListTaskNameImg">
										<img src="@/assets/img/relation.png"/>
									</div>
									<div  class="resDialogListTaskName">
										{{item.task_name}}
									</div>
									<div class="resDialogListTaskNode">
										{{item.node_name}}
									</div>
								</div>
							</div>
						</div>
					</div>
					
					
				</el-scrollbar>
			</el-row>
			<div class="newFeedBackContentBtn">
				<el-button class="newFeedBackContentBtnMargin" size="mini"	@click="submitUploadChange">提交匹配</el-button>
				<el-button class="newFeedBackContentBtnMargin" size="mini"	@click="closeUploadDialog">取消</el-button>
			</div>
		</el-dialog>	
		
		
		
		<!-- 确认关联 -->
		<el-dialog title="确认关联" :visible.sync="uploadNextDialog" width="80%">
			<el-row :style="uploadDialogHeigth">
				<el-scrollbar style="height: 100%;">
		
					<div class="resDialogList" v-for="item in needRelationNextData">
						<div class="resDialogListContent">
							<div class="resDialogListName">
								{{item.local_name}}
							</div>
							<div class="resDialogListPath">
								{{item.local_url}}
							</div>
							<div class="resDialogListTask">
								<div class="resDialogListTaskBox">
									<div class="resDialogListTaskNameImg">
										<img src="@/assets/img/relation.png"/>
									</div>
									<!-- redData[i].isOn -->
									<div v-if="!item.isOn" class="resDialogListTaskErr">
										{{item.err}}
									</div>
									
									<div  v-if="item.isOn" class="resDialogListTaskName">
										{{item.task_name}}
									</div>
									<div  v-if="item.isOn" class="resDialogListTaskNode">
										{{item.merge_name}}({{item.node_name}})
									</div>
									
								</div>
							</div>
						</div>
					</div>
					
					
				</el-scrollbar>
			</el-row>
			<div class="newFeedBackContentBtn">
				<el-button class="newFeedBackContentBtnMargin" size="mini"	@click="submitUploadNextChange">确认关联</el-button>
				<el-button class="newFeedBackContentBtnMargin" size="mini"	@click="closeUploadNextDialog">取消</el-button>
			</div>
		</el-dialog>
		
		
		
		
		
		
	</el-row>
</template>
 
<script>
	import {
		Loading
	} from 'element-ui';
	var xlsx = window.tgyc.xlsx
	export default {
		data(){
			return {
				taskId:"",
				projectId:"",
				taskProjectId:"",
				taskName:"",
				checkList:["未关联","已关联"],
				resListHeigth: "height:" + (window.innerHeight - 175) + "px",
				uploadDialogHeigth: "height:" + (window.innerHeight - 220) + "px",
				resList:[],
				showResList:[],
				searchInput:"",
				searchState:false,
				rulesArr:["mov","mp4","jpg","png"],
				showResCount:{
					count:0,
					noRelation:0,
					relation:0,
				},
				uploadDialog:false,
				needRelationData:[],
				errData:[],
				uploadNextDialog:false,
				needRelationNextData:[],
			}
		},
		//初始化页面
		created: function () {
			this.taskId = this.$route.query.taskId
			this.taskName = this.$route.query.taskName
			this.projectId = this.$route.query.projectId
			this.taskProjectId = this.$route.query.taskProjectId
			console.log("任务id")
			console.log(this.taskId)
			console.log("项目id")
			console.log(this.projectId)
			console.log("任务项目id")
			console.log(this.taskProjectId)
			this.getTaskRes()
		},
		methods: {
			// 获取全部任务
			getTaskRes(){
				let data = {
					prtask_id: this.taskId
				}
				this.$PRAPI.prResources.GetAllResources(data).then(res => {
					console.log('任务资源')
					console.log(res)
					this.setTaskResources(res)
				}, err => {
					console.log(err)
				});
			},
			//设置任务资源信息
			setTaskResources(data){
				var resData = data;
				for(var i=0;i<resData.length;i++){
					var currentMerge = resData[i].merge_id;
					resData[i].relation = currentMerge!=0&&currentMerge!=""&&currentMerge!=null&&currentMerge!="null"?true:false
				}
				this.resList = resData
				this.setShowRes()
			},
			setShowRes(){
				
				var showNoRelation = false;
				var showRelation = false;
				
				var currentSearch = this.searchInput
				
				for(var i=0;i<this.checkList.length;i++){
					
					var currentTap = this.checkList[i]
					switch (currentTap){
						case "未关联":
							showNoRelation = true;
							break;
						case "已关联":
							showRelation = true;
							break;
					}
				}
				
				var needShowRes = [];
				var noRelationCount = 0
				var relationCount = 0;
				var noAdd = ["0","1","2","3","4","5","6","7","8","9"];
				
				
				var currentResList = this.resList
				for(var b=0;b<currentResList.length;b++){
					
					
					var currentRelation  = currentResList[b].relation;
					var local_name = currentResList[b].local_name;
					
					// 排除首字符不是字符的
					var fastStr = local_name.slice(0,1);
					var fastIndex = noAdd.indexOf(fastStr);
					if(fastIndex==-1){
						var fileType = local_name.slice(local_name.lastIndexOf('.')+1, local_name.length)
						fileType = fileType.toLowerCase()
						var fileIndex = this.rulesArr.indexOf(fileType);
						if(fileIndex>-1){
							
							if(this.searchState){
								var fileNameIndex = local_name.indexOf(currentSearch)
								if(fileNameIndex>-1){
									if(currentRelation){
										if(showRelation){
											needShowRes.push(currentResList[b])
											relationCount++
										}
									}else{
										if(showNoRelation){
											needShowRes.push(currentResList[b])
											noRelationCount++
										}
									}
								}
							}else{
								if(currentRelation){
									if(showRelation){
										needShowRes.push(currentResList[b])
										relationCount++
									}
								}else{
									if(showNoRelation){
										needShowRes.push(currentResList[b])
										noRelationCount++
									}
								}
							}
							
						}
					}
				}
				
				this.showResList = needShowRes
				this.showResCount.count = needShowRes.length
				this.showResCount.noRelation = noRelationCount
				this.showResCount.relation = relationCount
				
				// console.log(needShowRes)
			},
			submitSearch(){
				console.log(this.searchInput)
				this.searchState = true
				this.setShowRes()
				
			},
			//清空搜索事件
			clearSearch(){
				console.log(this.searchInput)
				this.searchState = false
				this.setShowRes()
			},
			//右键功能菜单
				// 按名称排序{正序,倒序},
				// 匹配全部任务,
				// 取消关联
			resListMenu(thItem,event) {
				this.$contextmenu({
					items: [
						{
							label: "按名称排序",
							divided: true,
							minWidth: 0,
							children: [
								{ 
									label: "正序",
									onClick: () => {
										console.log("正序排列");
										this.setShowResSort(0)
									},
								}, 
								{ 
									label: "倒序",
									onClick: () => {
										console.log("倒序排列");
										this.setShowResSort(1)
									},
								},
								
							]
						},
						{
							label: "匹配任务",
							onClick: () => {
								console.log("匹配任务");
								//匹配命名正确的未关联任务
								this.setResTask(thItem)
							},
						},
						// {
						// 	label: "匹配全部任务",
						// 	onClick: () => {
						// 		console.log("匹配全部任务");
						// 		//匹配命名正确的全部未关联任务
						// 	},
						// },
						// {
						// 	label: "输入任务编号匹配",
						// 	onClick: () => {
						// 		console.log("输入任务编号匹配");
						// 	},
						// },
						{
							label: "取消关联",
							onClick: () => {
								console.log("取消关联");
								console.log(thItem)
								this.clearResTask(thItem)
							},
						},
						{
							label: "刷新",
							onClick: () => {
								console.log("刷新");
								this.getTaskRes()
							},
						},
					],
					event,
					customClass: "tgycContextMenu",
					zIndex: 9999,
					minWidth: 130,
				});
				return false;
			},
			//排序功能
			setShowResSort(data){
				var showType = data;
				var thData  = this.showResList;
				
				
				// 检测是否为中文，true表示是中文，false表示非中文
				function isChinese(str) {
				    // 中文万国码正则
				    if (/[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/.test(str)) {
				        return true;
				    } else {
				        return false;
				    }
				}
				
				this.showResList = thData.sort(
					function (a, b) {
						
					    let aName;
					    let bName;
						if(showType==0){
							aName = a.local_name;
							bName = b.local_name;
						}else if(showType==1){
							aName = b.local_name;
							bName = a.local_name;
						}
					    if (/^\d+/.test(aName) && /^\d+/.test(bName)) {
					        // 提取起始数字, 然后比较返回
					        return /^\d+/.exec(aName) - /^\d+/.exec(bName);
					        // 如包含中文, 按照中文拼音排序
					    } else if (isChinese(aName) && isChinese(bName)) {
					        // 按照中文拼音, 比较字符串
					        return aName.localeCompare(bName, 'zh-CN')
					    } else {
					        // 排序数字和字母
					        return aName.localeCompare(bName, 'en');
					    }
					}
				)
				
				
			},
			//上传批量导入模板
			uploadResModelXlsx(){
				var thFormat = "*.xlsx"
				var fcStr = 'openSelectFile("'+thFormat+'")'
				this.$CSINTERFACE.evalScript(fcStr, (el) => {
					if(el!=null){
						var selectPath = decodeURI(el);
						var identityCode =  selectPath.slice(0,1);
						selectPath = selectPath.slice(1,selectPath.length);
						if(identityCode=="/"){
							selectPath = selectPath.slice(0,1) + ":" + selectPath.slice(1,selectPath.length);
						}else if(identityCode=="~"){
							var myhome = this.$OS.homedir()
							selectPath = myhome + selectPath
						}
						var filePath=selectPath
						filePath = filePath.replace(/\\/g,"/");
						if(filePath){
							var fileType = filePath.slice(filePath.lastIndexOf('.')+1, filePath.length);
							if(fileType=="xlsx"){
								var obj = xlsx.readFile(filePath);
								// 处理数据
								this.setXlsxData(obj)
							}else{
								this.$TGYC.sendErr("请下载模板编辑后上传，本功能不识别其他文件！！！")
							}
							
						}
					}
				})
			},
			
			
			setXlsxData(data){
				
				
				// console.log("表格数据")
				var sheetsData = data.Sheets.SheetJS
				console.log(sheetsData)
				if(sheetsData){
					var options = {
						text:"数据分析中，请稍候"
					}
					var loadingInstance =Loading.service(options);
					
					var refNum = sheetsData["!ref"]
					// console.log(refNum)
					
					var start = refNum.slice(0, refNum.lastIndexOf(':'));
					start = start.replace(/[^0-9]/ig,"");
					var end = refNum.slice(refNum.lastIndexOf(':')+1, refNum.length);
					end = end.replace(/[^0-9]/ig,"");
					
					// console.log(start)
					// console.log(end)
					
					var listData = [];
					for (var i=2;i<=end;i++) {
						var fileNameCode = "A" + i;
						if(sheetsData[fileNameCode]){
							var fileName = sheetsData[fileNameCode].v
							var filePathCode = "B" + i;
							var filePath = sheetsData[filePathCode].v
							var taskNameCode = "C" + i;
							var taskName = sheetsData[taskNameCode].v
							var nodeNameCode = "D" + i;
							var nodeName = sheetsData[nodeNameCode].v
							
							var thArr = {
								local_name:fileName,
								local_url:filePath,
								task_name:taskName,
								node_name:nodeName
							}
							listData.push(thArr)
						}
					}
					loadingInstance.close();
					this.uploadResModel(listData)
				}else{
					this.$TGYC.sendErr("模板格式错误，请检查！！！")
				}
				

				
				
			},
			
			//上传匹配
			uploadResModel(resDataArr){
				
				
				var uploadData = resDataArr
				
				var allResData = this.resList
				
				var needRelationData = [];
				var errData = [];
				// console.log("-----------------")
				// console.log(allResData)
				// console.log(uploadData)
				for(var i=0;i<uploadData.length;i++){
					function findRes(list){
						return list.local_name==uploadData[i].local_name&&list.local_url==uploadData[i].local_url
					}
					var resIndex = allResData.findIndex(findRes);
					if(resIndex>-1){
						if(!allResData[resIndex].relation){
							// console.log(uploadData[i])
							// console.log(allResData[resIndex])
							uploadData[i].id = allResData[resIndex].id
							needRelationData.push(uploadData[i])
						}else{
							uploadData[i].err = "此任务已关联任务（将跳过）"
							errData.push(uploadData[i])
						}
					}else{
						uploadData[i].err = "未找到文件（将跳过）"
						errData.push(uploadData[i])
					}
				}
				
				this.needRelationData = needRelationData
				this.errData = errData
				// console.log(needRelationData)
				// console.log(errData)
				// console.log("++++++++++++++++++")
				this.uploadDialog = true
				
			},
			//提交匹配
			submitUploadChange(){
				console.log("提交匹配")
				console.log(this.needRelationData)

				var taskData = [];
				var relationData = this.needRelationData
				for(var i=0;i<relationData.length;i++){
					var thArr = {
						"merge_englishname":relationData[i].node_name,
						"task_name":relationData[i].task_name
					}
					taskData.push(thArr)
				}
				var taskDataStr = JSON.stringify(taskData)
				console.log(taskDataStr);
				let data = {
					project_id:this.taskProjectId,
					json:taskDataStr
				}
				this.$PRAPI.task.GetResourcesTask(data).then(res => {
					console.log('任务资源')
					console.log(res)
					this.uploadDialog = false
					this.uploadNextDialog = true
					// this.needRelationNextData = 
					
					var newtaskData = res
					var currentRelationData = this.needRelationData
					var currentData = []
					//匹配资源
					for(var i=0;i<currentRelationData.length;i++){
						var currentTaskName = currentRelationData[i].task_name
						var currentNodeName = currentRelationData[i].node_name
						
						currentRelationData[i].isOn = false
						
						function findTask(list){
							return list.value_englishname==currentNodeName&&list.task_list.shotnumber==currentTaskName
						}
						
						var taskIndex = newtaskData.findIndex(findTask)
						if(taskIndex>-1){
							currentRelationData[i].isOn = true
							currentRelationData[i].merge_id = newtaskData[taskIndex].id
							currentRelationData[i].merge_name = newtaskData[taskIndex].value_name
							currentRelationData[i].task_id = newtaskData[taskIndex].prid
							currentRelationData[i].task_name = newtaskData[taskIndex].task_list.shotnumber
							currentData.push(currentRelationData[i])
						}else{
							currentRelationData[i].err = "未找到任务（将跳过）"
							currentData.push(currentRelationData[i])
						}
					}
					
					
					console.log(currentData)
					this.needRelationNextData = currentData
					
				}, err => {
					console.log(err)
				});
				
				
				
			},
			//关闭窗口
			closeUploadDialog(){
				this.uploadDialog = false
			},
			//关闭窗口
			closeUploadNextDialog(){
				this.uploadNextDialog = false
			},
			submitUploadNextChange(){
				console.log("提交关联")
				console.log(this.needRelationNextData)
				
				// [
				// 	{
				// 		"id":"42897",
				// 		"merge_id":"193463",
				// 		"task_id":"36073",
				// 		"task_name":"J1_E02_SC14_shot002"
				// 	}
				// ]
				var updataData = []
				var redData = this.needRelationNextData
				for(var i=0;i<redData.length;i++){
					
					if(redData[i].isOn){
						var thArr = {
							id : redData[i].id,
							merge_id : redData[i].merge_id,
							task_id : redData[i].task_id,
							task_name : redData[i].task_name
						}
						
						updataData.push(thArr)
					}
					
				}
				if(updataData.length>0){
					var updataDataStr = JSON.stringify(updataData)
					let data = {
						json:updataDataStr
					}
					this.$PRAPI.prResources.BatchUpdAssociated(data).then(res => {
						// console.log("连接成功")
						this.$notify({
							message: '关联成功',
							type: 'success',
									position: 'bottom-right'
						});
						this.closeUploadNextDialog()
						this.getTaskRes()
					})
				}else{
					this.$notify({
						message: '未发现可关联任务',
						type: 'warning',
									position: 'bottom-right'
					});
					this.closeUploadNextDialog()
				}
				
				
				
			},
			clearResTask(item){
				var updataData = [{
					id : item.id,
					merge_id : "",
					task_id : "",
					task_name : ""
				}]
				var updataDataStr = JSON.stringify(updataData)
				let data = {
					json:updataDataStr
				}
				this.$PRAPI.prResources.BatchUpdAssociated(data).then(res => {
					// console.log("连接成功")
					this.$notify({
						message: '取消关联成功',
						type: 'success',
									position: 'bottom-right'
					});
					this.getTaskRes()
				})
			},
			setResTask(item){
				console.log("待匹配任务")
				console.log(item)
				
				var fileName = item.local_name
				
				var mergeName = fileName.slice(fileName.lastIndexOf('_')+1,fileName.lastIndexOf('.'))
				var mergeTask = fileName.slice(0,fileName.lastIndexOf('_'))
				console.log(mergeName)
				console.log(mergeTask)
				
				
				var taskData = [
					{
						"merge_englishname":mergeName,
						"task_name":mergeTask
					}
				];
				
				var taskDataStr = JSON.stringify(taskData)
				
				let data = {
					project_id:this.taskProjectId,
					json:taskDataStr
				}
				this.$PRAPI.task.GetResourcesTask(data).then(res => {
					console.log('任务资源')
					console.log(res)
					
					if(res.length>0){
						var updataData = [{
							id : item.id,
							merge_id : res[0].id,
							task_id : res[0].prid,
							task_name : res[0].task_list.shotnumber
						}]
						var updataDataStr = JSON.stringify(updataData)
						let data = {
							json:updataDataStr
						}
						this.$PRAPI.prResources.BatchUpdAssociated(data).then(res => {
							this.getTaskRes()
							this.$notify({
								message: '关联成功',
								type: 'success',
									position: 'bottom-right'
							});
						})
					}else{
						this.$notify({
							message: '未找到任务，请检查，或更换其他方式关联',
							type: 'warning',
									position: 'bottom-right'
						});
					}
					
				}, err => {
					console.log(err)
				});
				
			},
			//下载批量导入模板
			downResModel(){
				var myhome = this.$OS.homedir();
				var newFilePath = myhome + "\\Desktop\\任务关联模板.xlsx"
				
				
				var fileData = [];
				
				// showResList
				var currentData = this.showResList;
				for(var i=0;i<currentData.length;i++){
					var thArr = {
						fileName:currentData[i].local_name,
						filePath:currentData[i].local_url,
						taskName:'',
						nodeName:'',
					}
					if(!currentData[i].relation){
						fileData.push(thArr)
					}
				}
				var mydataa = {
				    'SheetJS':{
				        title:{
							fileName:'文件名',
							filePath:'路径',
							taskName:'任务编号',
							nodeName:'节点英文名',
						},
				        json:fileData
				    }
				}
				// console.log(mydataa)
	
				var that = this
				function json2ExcelMultiSheet(data,fileName){
				    let wopts = {
				        bookType: 'xlsx',
				        bookSST: false, 
				        type: 'binary'
				    };
				    let workBook = {
				        SheetNames: [],
				        Sheets: {},
				        Props: {}
				    };
				    let keys = Object.keys(data);
				    keys.forEach(key=>{
				        let json = [data[key].title,...data[key].json];
				        workBook.SheetNames.push(key);
				        workBook.Sheets[key] = xlsx.utils.json_to_sheet(json,{skipHeader:true}); // skipHeader 忽略原来的表头
				    })
					
					try{
						xlsx.writeFile(workBook,fileName, wopts)
						that.$notify({
						  message: '导出到桌面成功',
						  type: 'success',
						  position: 'bottom-right'
						});
					}catch(e){
						that.$notify({
						  message: '导出失败，请检查文件是否被占用，或联系管理员',
						  type: 'success',
						  position: 'bottom-right'
						});
					}
					
				}
				
				
				json2ExcelMultiSheet(mydataa,newFilePath)
				
			},
			
			
			
			
			
			
		}
	}
</script>

<style>
</style>
