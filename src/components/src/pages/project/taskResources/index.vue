<template>
	<div>
		<el-row>
			<el-col :span="24">
				<div class="resourcesIntroduction"  @contextmenu.prevent="resourcesStateMenu($event)">
					<div class="resourcesName">
						
						{{prresourcesData.number}}
						<div class="stateListColor" :style="'background-color:' + prresourcesData.color"></div>
					</div>
					<div class="resourcesPath">
						{{prresourcesData.path}}
					</div>
					<div class="resourcesPath"  v-if="$store.state.userInfo.companyid==prresourcesData.prproject_companyid">
						关联任务：{{prresourcesData.relationTask}}-{{prresourcesData.relationMerge}}
						<span v-if="prresourcesData.merge_list!='[]'&&prresourcesData.merge_list!='null'&&prresourcesData.merge_list!=''">
							<span v-if="prresourcesData.merge_list.producername!='[]'&&prresourcesData.merge_list.producername!=''&&prresourcesData.merge_list.producername!='null'&&prresourcesData.merge_list.producername!=null&&prresourcesData.merge_list.producername!=undefined">
								制作人：{{$TGYC.setMergeName(prresourcesData.merge_list.producername)}}
							</span>
							<span v-if="prresourcesData.merge_list.is_pool=='1'&&prresourcesData.merge_list.company_name!=''&&prresourcesData.merge_list.company_name!='null'&&prresourcesData.merge_list.company_name!=null">
								制作公司：{{prresourcesData.merge_list.company_name}}
							</span>
						</span>
						<el-button v-if="prresourcesData.isRelation" size="mini" type="primary" icon="el-icon-link" @click="setResourcesTask">关联</el-button>
					</div>
					<el-col :span="24" class="resourcesUserBox">
						<div class="resourcesUserThum">
							<img src="@/assets/img/logo.png"/>
						</div>
						<div class="resourcesUserName">
							制作人：{{prresourcesData.outsourcing=="0"?prresourcesData.personnel_name:prresourcesData.company_name}}
						</div>
						<div v-if="$store.state.userInfo.companyid==prresourcesData.prproject_companyid" class="resourcesTime">
							最新上传人：{{prresourcesRecordData.personnel_name}} {{$TGYC.stampToDateMD(prresourcesRecordData.time)}}
						</div>
						
					</el-col>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="prresourcesLabelBox">
					<div class="prresourcesLabelTitle">
						问题标签
						<div class="prresourcesLabelTitleBtn">
							<el-button v-if="labelClose" icon="el-icon-s-tools" size="mini" @click="setResourcesLabel"></el-button>
							<el-button v-if="!labelClose" icon="el-icon-check" size="mini" @click="submitResourcesLabel"></el-button>
						</div>
					</div>
					<div class="prresourcesLabelContent">
						<div class="prresourcesLabelContentOld">
							<el-tag
							  :key="item.id"
							  v-for="item in prresourcesLabelList"
							  effect="plain"
							  size="mini"
							  :type="item.type"
							  :closable="labelClose"
							  :disable-transitions="false"
							  @click= "prresourcesLabelClick(item)"
							  @close="prresourcesLabelClose(item)">
							  {{item.name}}
							</el-tag>
						</div>
					</div>
				</div>
			</el-col>
			<!-- <el-col :span="24" class="resourcesIntroductionBox">
				简介：{{prresourcesRecordData.introduction}}
			</el-col> -->
			<el-col :span="24" class="resourcesFeedBackBox">
				<el-col :span="24" class="resourcesFeedBackTitle">
					反馈记录
				</el-col>
				<el-col :span="24" class="resourcesFeedBackContent">
					<div class="feedbackBox">
						
						
						<div class="feedbackList" v-for="item in feedbackData.data" @contextmenu.prevent="feedbackMenu(item,$event)">
							<div class="feedbackListContent">
								<div v-if="item.type=='0'" class="feedbackListTxt">
									{{item.content}}
								</div>
								<div v-else-if="item.type=='1'" class="feedbackListImg">
									<viewer :images="$VIDEOBASEURL+item.content">
									    <img :src="$VIDEOBASEURL+item.content">
									</viewer>
								</div>
								<div v-else-if="item.type=='2'" class="feedbackListVideo">
								<!-- <div v-else-if="item.type=='2'" class="feedbackListVideo" @click="openVideoPlay(item)"> -->
									<el-row>
										<el-col :span="12">
											<videoBox :videoid="item.id" :vwidth="280" :myvideourl="$VIDEOBASEURL+item.content"></videoBox>
										</el-col>
									</el-row>
								</div>
								<div v-else-if="item.type=='3'" class="feedbackListVoice">
								<!-- <div v-else-if="item.type=='3'" class="feedbackListVoice" @click="openAudioPlay(item)"> -->
									<audio :src="$VIDEOBASEURL+item.content"  controls="controls"></audio>
								</div>
								<div v-else-if="item.type=='4'" class="feedbackListVoice ql-editor">
									<div v-html="item.content"></div>
								</div>
								<div class="">
									{{item.elaborate}}
								</div>
							</div>
							<div class="feedbackUser">
								<div class="feedbackUserThum">
									<img :src="$ASSETBASEURL + item.thum"/>
								</div>
								<div v-if="$store.state.userInfo.companyid==prresourcesData.prproject_companyid" class="feedbackUserName">
									{{item.personnel_name}}
								</div>
								<div v-else class="feedbackUserName">
									{{item.user_position}}
								</div>
								<div class="feedbackUserAddTime">
									{{$TGYC.stampToDateMD(item.time)}}
								</div>
							</div>
						</div>
						
					</div>	
				</el-col>
			</el-col>
			<!-- 反馈框 -->
			<!-- <div class="feedbackAddBox">
				<div class="feedbackAddInputBox">
					<el-input v-model="feedbackInput"  placeholder="反馈内容">
						<el-button @click="feedbackInputSubmit" class="feedbackAddInputBtn" slot="append" icon="el-icon-caret-right"></el-button>
					</el-input>
				</div>
				<div class="feedbackAddIconBox">
					<div class="feedbackAddIconBtn" @click="startScreenshots">
						<img src="@/assets/img/feebicon1.png" />
					</div>
					<div class="feedbackAddIconBtn" @click="startRecord">
						<img src="@/assets/img/feebicon2.png" />
					</div>
					<div class="feedbackAddIconBtn" @click="startScreen">
						<img src="@/assets/img/feebicon3.png" />
					</div>
				</div>
			</div> -->
		</el-row>
		<!-- <videoBox ref="videoBox"></videoBox> -->
		<div style="height: 100px;"></div>
	</div>
</template>
<script>
	import videoBox from '@/pages/components/video/index.vue'
	export default {
		name:"任务资源",
		data() {
			return {
				sysModel:"任务资源",
				projectId: '',//项目id
				taskId: '',//任务id
				taskData:'',//任务数据
				prresourcesId:'',//资源id
				videoWidth:window.innerWidth-40,
				player:'',
				videoOption:{
					autoplay: false,
					controls:true
				},
				prresourcesData:{},
				prresourcesRecordData:{},
				userRoleData:[],//角色数据
				videoUrl:'',
				feedbackInput:'',//文字输入框内容
				feedbackData:[],
				videoBox:[],
				currentUserJurisdiction:{},//当前用户权限
				currentLabelType:"new",
				labelSeletType:"",
				labelNomelType:"info",
				labelClose:true,
				selectLabel:[],
				prresourcesLabelList:[],
				currentLabels:[]
			}
		},
		components: {
			'videoBox': videoBox,
		},
		created: function() {
			
			
			
			// console.log('资源页面')
			this.myInit()
		
		},
		//监听路由变化
		watch:{
			$route: function (val, oldVal) {
				// console.log('参数变化')
		
				var currentPath = val.path
				if(currentPath=="/index/project/taskResources"){
					if(val.query.projectId!=this.projectId||val.query.prresourcesId!=this.prresourcesId||val.query.taskId!=this.taskId){
						console.log("更新资源详情数据")
						this.myInit()
					}
				}
				
			},
		},
		// 在 `methods` 对象中定义方法
		methods: {
			myInit(){
				this.projectId = this.$route.query.projectId
				this.taskId = this.$route.query.taskId
				this.prresourcesId = this.$route.query.prresourcesId
				// taskRole
				// this.userRoleData = this.$route.query.userRoleData
				this.getTask()
				this.getUserRole()
				this.getPrResources()
				this.labelClose = true
				// this.getPrResourcesFeedback()
			},
			
			
			//获取任务详细信息
			getTask() {
				let data = {
					id: this.taskId
				}
				this.$PRAPI.prtask.GetDetails(data).then(res => {
					this.setTask(res)
				}, err => {
					console.log(err)
				});
			},
			setTask(data) {
				this.taskData = data
				var roleData = this.taskData.role_id
				this.taskData.role_id = roleData == null || roleData == '' || roleData == 'null' || roleData == undefined ? [] : JSON.parse(roleData)
				this.setTaskRoleList(this.taskData.role)
			},
			
			
			//设置当前任务角色列表
			setTaskRoleList(data) {
				for(var i=0;i<data.length;i++){
					var userList = data[i].user_list
					data[i].user_list = userList==''||userList==null||userList=='null'?[]:JSON.parse(userList)
					
					var roleJurisdiction = data[i].jurisdiction
					data[i].jurisdiction = roleJurisdiction==''||roleJurisdiction==null||roleJurisdiction=='null'?{}:JSON.parse(roleJurisdiction)
				}
				this.setMyJurisdiction(data)
			},
			//设置我的可用权限
			setMyJurisdiction(data){
				var myJurisdiction = {}
				var currentUser = this.$store.state.userInfo.id
				var roleList = data
				for(var item in roleList){
					var currentUserList = roleList[item].user_list
					var currentRoleJurisdiction = roleList[item].jurisdiction
					function findUser(list){
						return list.id == currentUser
					}
					var userIndex = currentUserList.findIndex(findUser)
					if(userIndex>-1){
						for(var itemSub in currentRoleJurisdiction){
							var subJurisdiction = currentRoleJurisdiction[itemSub]
							if(subJurisdiction){
								myJurisdiction[itemSub] = subJurisdiction
							}
						}
					}
				}
				this.currentUserJurisdiction = myJurisdiction
				
			},
			
			//获取用户角色
			getUserRole(){
				var data = {
					id: this.$store.state.userInfo.id
				}
				this.$PRAPI.role.GetUserRole(data).then(res => {
					this.userRoleData = res
				}, err => {
					console.log(err)
				});
			},
			getPrResources(){
				let data = {
					id:this.prresourcesId
				}
				this.$PRAPI.prResources.GetDetails(data).then(res => {
					this.setTaskResources(res)
					this.getPrResourcesFeedback()
				}, err => {
					console.log(err)
				});
			},
			//设置资源文件
			setTaskResources(data){
				var mydata = data
				// console.log(data)
				var currentResources = mydata.pr_resources
				
				var currentSubState = currentResources.sub_state
				var currentState = currentResources.state
				var currentColorCode = currentSubState!=""&&currentSubState!="0"&&currentSubState!=null&&currentSubState!="null"&&currentSubState!=undefined ? this.$TGYC.setSysColor(currentSubState) : this.$TGYC.setResourcesColorCode(currentState)
				currentResources.color = currentColorCode
				
				//设置任务关联状态
				currentResources.relationTask = ""
				if(currentResources.task_list){
					currentResources.relationTask = currentResources.task_list.type=="1"?currentResources.task_list.filename:currentResources.task_list.shotnumber
				}
				
				currentResources.relationMerge = ""
				if(currentResources.merge_list.id){
					currentResources.isRelation = false;
					currentResources.relationMerge = currentResources.merge_list.value_name
				}else{
					var layoutIndex = currentResources.number.indexOf("_Layout.mov");
					if(layoutIndex>-1){
						currentResources.isRelation = true;
					}else{
						currentResources.isRelation = false;
					}
				}
				
				//设置问题标签
				// pr_resources_label
				var resourcesLabelData = mydata.pr_resources_label;
				var selectLabelList = [];
				var currentLabel = [];
				for(var i=0;i<resourcesLabelData.length;i++){
					if(resourcesLabelData[i].state=="0"){
						selectLabelList.push(resourcesLabelData[i].node_id);
						currentLabel.push({
							id:resourcesLabelData[i].id,
							node_id:resourcesLabelData[i].node_id,
							name:resourcesLabelData[i].name,
							type:this.labelSeletType
						})
					}
				}
				
				// console.log("++++++++++++")
				// console.log(currentResources)
				// console.log(currentResources.isRelation)
				// prresourcesData.merge_list
				this.prresourcesData = currentResources
				this.prresourcesRecordData = mydata.pr_resources_record[0]
				this.selectLabel = selectLabelList;
				this.prresourcesLabelList = currentLabel;
				this.currentLabels = currentLabel;
				// var roleid = mydata.pr_resources[0].role_id
				// //获取角色信息
				// let roleData = {
				// 	id:roleid
				// }
				// this.$PRAPI.role.GetPrRole(roleData).then(res => {
				// 	console.log('角色信息')
				// 	console.log(res)
				// }, err => {
				// 	console.log(err)
				// });
				
			},
			//获取资源反馈
			getPrResourcesFeedback(){
				setTimeout(()=>{ 
					this.feedbackData = []
					this.videoBox = []
					let data = {
						prresources_id:this.prresourcesId,
						length:50,
						position:0
					}
					this.$PRAPI.prResourcesFeedback.GetFeedback(data).then(res => {
						
						this.feedbackData = res
						
					}, err => {
						console.log(err)
					});
				}, 300);
			},
		
			openTaskResourcesFeedback(){
				this.$router.push({
					path: '/index/project/taskResourcesFeedback',
					query: {
					
					},
				})
			},
		
			//发起截屏
			startScreenshots(){
				
				var taskData = {
					id:this.$TGYC.getcurrentStamp(),
					project_id:this.projectId,
					prtask_id:this.taskId,
					prresources_id:this.prresourcesId,
					type:1,
					content:'',
					position:'0',
					res_version:'0',
					setComplete:() =>{	//完成回调
						this.getPrResourcesFeedback()
					},
				}
				this.$parent.feedbackManage.push(taskData)
				this.$parent.startScreenshots(taskData)
				
			},
			
			//发起录音
			startRecord(){
				var taskData = {
					id:this.$TGYC.getcurrentStamp(),
					project_id:this.projectId,
					prtask_id:this.taskId,
					prresources_id:this.prresourcesId,
					type:3,
					content:'',
					position:'0',
					res_version:'0',
					setComplete:() =>{	//完成回调
						this.getPrResourcesFeedback()
					},
				}
				this.$parent.feedbackManage.push(taskData)
				this.$parent.startRecord(taskData)
		
			},
			
			
			//发起录屏
			startScreen(){
				var taskData = {
					id:this.$TGYC.getcurrentStamp(),
					project_id:this.projectId,
					prtask_id:this.taskId,
					prresources_id:this.prresourcesId,
					type:2,
					content:'',
					position:'0',
					res_version:'0',
					setComplete:() =>{	//完成回调
						this.getPrResourcesFeedback()
					},
				}
				this.$parent.feedbackManage.push(taskData)
				this.$parent.startScreen(taskData)
			},
			//提交反馈
			feedbackInputSubmit(){
				
				var data = {
					project_id:this.projectId,
					prtask_id:this.taskId,
					prresources_id:this.prresourcesId,
					type:0,
					content:this.feedbackInput,
					position:'0',
					res_version:'0',
				}
				this.$PRAPI.prResourcesFeedback.AddFeedback(data).then(res => {
					// console.log(res)
					this.feedbackInput = ''
					this.getPrResourcesFeedback()
				}, err => {
					console.log(err)
				});
				
			},
			getfeedbackdome(data){
				var currentDome = ''
				var content = data.content
				var type = data.type
				switch (type){
					case '0':
						currentDome = '<div class="feedbackListTxt">' + content + '</div>'
						break;
					case '1':
						currentDome = '<div class="feedbackListImg">' + 
											'<img src="' + this.$VIDEOBASEURL + content + '" />' + 
										'</div>'
						break;
					case '2':
						currentDome = "<div class='feedbackListVideo'>" + 
											// "<video-js :data-setup='{"controls": true, "autoplay": false, "preload": "auto"}' :width='videoWidth' height='350' class='video-js'>" +
											  "<source src=" + this.$VIDEOBASEURL + content +  "type='video/mp4'>" +
											"</video-js>" + 
										"</div>"
						break;
					case '3':
					// '<img src="@/assets/img/vioce.png" /> ' + 
						currentDome = '<div class="feedbackListVoice">' + 
											'<audio src="' + this.$VIDEOBASEURL + content + '"  controls="controls"></audio>'
										'</div>'
						break;
				}
				
				
				return currentDome
			},
			//状态右键事件
			resourcesStateMenu(event) {

				var menuData = [
				
					{
						label: "转到",
						onClick: () => {
							this.getResClipsPosition()
						}
					},
					{
						label: "转到并标记",
						onClick: () => {
							this.getResClipsPositionRange()
						}
					},
					{
						label: "转到文件位置",
						onClick: () => {
							// console.log(event)
							var path = this.prresourcesRecordData.local_url+"/"+this.prresourcesRecordData.local_name;
							var sep = '\\';
							path = path.replace(/\//g, sep);
							var cmd="explorer /select," + path;
							var exec = window.tgyc.exec;
							exec(cmd, function(err, stdout, stderr) {
							    if(err){ return console.log(err); }
							});
						}
					},
					{
						label: "查看上传历史",
						onClick: () => {
							
							this.jumpTaskResourcesHistory()
							
						}
					},
					{
						label: "状态记录",
						onClick: () => {
							
							if(this.$store.state.userInfo.companyid==this.prresourcesData.prproject_companyid){
								this.jumpTaskResourcesStateHistory()
							}else{
								this.$TGYC.sendErr("您没有权限！！！")
							}
							
							
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
			setResourcesState(stateCode){
				// console.log('设置资源状态')
				
				// let data = {
				// 	idlist:resIdListStr,
				// 	state:state,
				// 	sub_state:"0"
				// }
				// this.$PRAPI.prResourcesRecord.BatchUpdState(data).then(res => {
					
				// 	pathList = JSON.stringify(pathList)
				// 	pathList = encodeURI(pathList);
				// 	var jsonfnPath = 'SetProjectItemColor("'+pathList+'")';
				// 	this.$CSINTERFACE.evalScript(jsonfnPath);
					
				// }, err => {
				// 	console.log(err)
				// });
				
				
				
				let data = {
					id:this.prresourcesData.id,
					state:stateCode,
				}
				this.$PRAPI.prResourcesRecord.UpdState(data).then(res => {
					this.prresourcesData.state = stateCode
				}, err => {
					console.log(err)
				});
				
				
				
				
				
				var pathList = [
					{
						path:this.prresourcesRecordData.local_url+"/"+this.prresourcesRecordData.local_name,
						stateCode:stateCode,
						colorCode:this.$TGYC.setResourcesColor(stateCode)
					}
				]
				pathList = JSON.stringify(pathList);
				pathList = encodeURI(pathList);
				var jsonfnPath = 'SetProjectItemColor("'+pathList+'")';
				// console.log(jsonfnPath)
				this.$CSINTERFACE.evalScript(jsonfnPath);
				
			},
			//反馈右键事件
			feedbackMenu(itemData,event) {
				this.$contextmenu({
					items: [{
							label: "外部浏览器打开",
							onClick: () => {
								this.openOtherBrower(itemData)
							}
						},
						{
							label: "下载",
							onClick: () => {
								this.openOtherBrowerdown(itemData)
							}
						},
						{
							label: "删除",
							onClick: () => {
								console.log(itemData)
								
								if(itemData.personnel_id==this.$store.state.userInfo.id){
									this.delFeedBack(itemData)
								}else{
									if(!this.currentUserJurisdiction.resDelFeedback){
										this.$TGYC.sendErr("您没有权限！！！");
										return false
									};
									this.delFeedBack(itemData)
								}
								
								
							}
						},
					],
					event,
					customClass: "tgycContextMenu",
					zIndex: 9999,
					minWidth: 130,
				});
				return false;
			},
			delFeedBack(feedbackData){
				var data = {
					id:feedbackData.id,
				}
				this.$PRAPI.prResourcesFeedback.DelFeedback(data).then(res => {
					this.getPrResourcesFeedback()
				}, err => {
					console.log(err)
				});
			},
			openOtherBrower(data){
				var url = this.$VIDEOBASEURL + data.content
				this.$CSINTERFACE.openURLInDefaultBrowser(url);
			},
			openOtherBrowerdown(data){
				// var url = videoBaseUrl + data.content
				// this.$CSINTERFACE.openURLInDefaultBrowser(url);
				console.log(data)
				var type = data.type
				if(type=="1"||type=="2"||type=="3"){
					var fileId = "down"+data.id
					var fileName = data.prresources_list.number+"("+data.elaborate+")";
					var filePath = data.content;
					var fileIndexz = filePath.lastIndexOf(".")
					fileName = fileName + filePath.slice(fileIndexz,filePath.length)
					var fileIndex = filePath.lastIndexOf("/")
					var service_name = filePath.slice(fileIndex+1,filePath.length);
					var service_url = filePath.slice(0,fileIndex);
					var myhome = this.$OS.homedir();
					var local_url = myhome + "\\Desktop";
					var thTime = data.time
					
					var downData = {
						"id": fileId,
						"type": 1,
						"operation": 0,
						"local_name": fileName,
						"local_url": local_url,
						"service_name": service_name,
						"service_url": service_url,
						"process" : 0,
						"md5":"0",
						"updtime":thTime,
						"state" : '等待下载',
						"setComplete" : (data) =>{	//完成回调
							// console.log("反馈下载完成")
							this.$notify({
							  message: data.local_name + '反馈下载完成',
							  type: 'success',
									position: 'bottom-right'
							});
						},
						"setProgress" : (passNum) =>{	//进度回调
							
						},
					}
					console.log(downData)
					
					//检测是否在上传队列
					function findFileList(list){
						return list.local_name == downData.local_name && list.local_url == downData.local_url
					}
					var isInFileList = this.$parent.fileManageList.fileDown.findIndex(findFileList)
					if(isInFileList==-1){
						this.$parent.fileManageList.fileDown.unshift(downData)
						this.$parent.fileManageList.num = this.$parent.fileManageList.num +1
						this.$parent.fileManage(downData)
					}
					
				}
			},
			// //播放适配
			// openVideoPlay(data){
			// 	console.log(data)
			// 	var videoUrl = videoBaseUrl + data.content
			// 	this.$refs.videoBox.setVideo(videoUrl)
			// },
			// //播放音频
			// openAudioPlay(data){
			// 	console.log(data)
			// 	var videoUrl = videoBaseUrl + data.content
			// 	this.$refs.videoBox.setVideo(videoUrl)
			// },
			
			//跳转到对应片段位置
			getResClipsPosition(){
				
				var resPath = this.prresourcesRecordData.local_url+"/"+this.prresourcesRecordData.local_name;
				let Pathfile = 'GetProjectResClips("' + resPath + '")';
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
		
			
			//跳转到对应片段位置并设置出入点
			getResClipsPositionRange(){
				var resPath = this.prresourcesRecordData.local_url+"/"+this.prresourcesRecordData.local_name;
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
			
			
			jumpTaskResourcesHistory() {
				this.$router.push({
					path: '/index/project/taskResourcesHistory',
					query: {
						prresourcesId : this.prresourcesId,
						taskId: this.taskId,
					},
				})
			},
			jumpTaskResourcesStateHistory() {
				this.$router.push({
					path: '/index/project/taskResourcesStateHistory',
					query: {
						prresourcesId : this.prresourcesId,
						taskId: this.taskId,
					},
				})
			},
			// 关联任务
			// 分析任务,查询回调,关联成功重置
			setResourcesTask(){
				// console.log(this.prresourcesData.number)
				// console.log(this.prresourcesData.prproject_projectid)
				// console.log("待匹配任务")
				
				// J1_E06_SC03_shot066_Layout.mov
				
				var fileName = this.prresourcesData.number
				
				var layoutIndex = fileName.indexOf("_Layout.mov");
				if(layoutIndex>-1){
					var scIndex =  fileName.indexOf("_SC");
					if(scIndex>0){
						var aeStr = fileName.slice(0,scIndex)
						var aindex = aeStr.lastIndexOf("_")
						var ae = aeStr.slice(aindex+1,aeStr.length)
						var b = fileName.slice(scIndex+1,fileName.length)
						var bIndex = b.indexOf("_")
						var bs = b.slice(0,bIndex)
						var taskName = ae + "_" + bs ;
						
						var taskData = [
							{
								"merge_englishname":"Layout",
								"task_name":taskName
							}
						];
						
						var taskDataStr = JSON.stringify(taskData)
						
						let data = {
							project_id:this.prresourcesData.prproject_projectid,
							json:taskDataStr
						}
						this.$PRAPI.task.GetResourcesTask(data).then(res => {
							console.log('任务资源')
							console.log(res)
							
							if(res.length>0){
								var updataData = [{
									id : this.prresourcesData.id,
									merge_id : res[0].id,
									task_id : res[0].prid,
									task_name : res[0].task_list.shotnumber
								}]
								var updataDataStr = JSON.stringify(updataData)
								let data = {
									json:updataDataStr
								}
								this.$PRAPI.prResources.BatchUpdAssociated(data).then(res => {
									// this.getTaskRes()
									this.myInit()
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
						
					}
					
					
				}else{
					this.$notify({
					    message: "此处只支持layout关联",
					    type: 'warning',
						position: 'bottom-right'
					});
				}
				
				
				
				
			},
			prresourcesLabelClose(item){
				console.log(item)
				
				var idList = [item.id];
				
				let data = {
					id:JSON.stringify(idList),
					state:"1",
				}
				
				this.$PRAPI.prResourcesLabel.BatchUpdState(data).then(res => {
					this.getPrResources()
				})
				
				
				
			},
			setResourcesLabel(){
				console.log("管理标签")
				// 获取全部可用标签
				let data = {
					project:this.prresourcesData.prproject_companyidrojectid
				}
				this.$PRAPI.node.GetavailablePrProblemLabel(data).then(res => {
					// console.log(res)
					this.setResLabel(res)
				})
			},
			//问题标签点击事件
			prresourcesLabelClick(item){
				// console.log(item)
				function findTag(list){
					return list.id==item.id
				}
				var newSelect = !(item.select);
				
				var index = this.prresourcesLabelList.findIndex(findTag)
				if(index>-1){
					this.prresourcesLabelList[index].type = newSelect?this.labelSeletType:this.labelNomelType;
					this.prresourcesLabelList[index].select = newSelect
				}
				
			},
			//设置系统可用标签
			setResLabel(data){
				this.labelClose = false
				var labelList = [];
				for(var i=0;i<data.length;i++){
					var typeName = this.selectLabel.indexOf(data[i].id)>-1?this.labelSeletType:this.labelNomelType;
					var isSelect = this.selectLabel.indexOf(data[i].id)>-1?true:false;
					console.log(typeName)
					labelList.push({
						id:data[i].id,
						name:data[i].name,
						type:typeName,
						select:isSelect
					})
				}
				
				this.prresourcesLabelList = labelList;
				
			},
			submitResourcesLabel(){
				this.labelClose = true
				
				//获取更改后的选中，找出增加与减少
				var oldSelect = this.selectLabel
				var newSelect = []
				var currentLabelList = this.prresourcesLabelList
				for(var i=0;i<currentLabelList.length;i++){
					if(currentLabelList[i].select){
						newSelect.push(currentLabelList[i].id)
					}
				}
				// console.log(newSelect)
				
				//与原数据比较新增与删除
				var delNode = [];
				var addNode = [];
				
				
				
				for(var i=0; i < oldSelect.length; i++){ 
					var flag = true; 
					for(var j=0; j < newSelect.length; j++){ 
						if(oldSelect[i] == newSelect[j]){
							flag = false; 
						}
					} 
					if(flag){
						delNode.push(oldSelect[i]);
					}
				} 
				
				for(var i=0; i < newSelect.length; i++){
					var flag = true; 
					for(var j=0; j < oldSelect.length; j++){ 
						if(newSelect[i] == oldSelect[j]){
							flag = false; 
						}
					} 
					if(flag){
						addNode.push(newSelect[i]);
					}
				} 
				
				// 删除的修改状态
				// 新增的做添加操作
				
				//提交标签修改
				console.log("提交标签修改")
				var addData = []
				var addLabelIdList = []
				
				// currentLabels
				
				for(var i=0;i<delNode.length;i++){
					function findTagId(list){
						return list.node_id==delNode[i]
					}
					var tagIndex = this.currentLabels.findIndex(findTagId)
					if(tagIndex>-1){
						addLabelIdList.push(this.currentLabels[tagIndex]["id"])
					}
				}
				
				for(var i=0;i<addNode.length;i++){
					addData.push({
						project_id:this.prresourcesData.project_id,
						prtask_id:this.prresourcesData.prtask_id,
						prresources_id:this.prresourcesData.id,
						node_id:addNode[i],
					})
				}
				
				let data = {
					id:JSON.stringify(addLabelIdList),
					state:"1",
					json:JSON.stringify(addData),
				}
				
				this.$PRAPI.prResourcesLabel.AddUpdLabel(data).then(res => {
					// console.log(res)
					this.getPrResources()
				})
				
				// 提交后更新数据
			}
			
			
		},
		destroyed: function() {
			// this.player.dispose()
		}
	}
</script>