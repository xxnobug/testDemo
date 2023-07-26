<template>
	<el-row>
		<el-col :span="24">
			<div class="resourcesIntroduction">
				<div class="resourcesName">
					{{prresourcesData.number}}
					<div class="resourcesStateBox">
						<div class="resourcesStateColor1" v-if="prresourcesData.state==0">
							待审
						</div>
						<div class="resourcesStateColor2" v-else-if="prresourcesData.state==1">
							返修
						</div>
						<div class="resourcesStateColor3" v-else-if="prresourcesData.state==2">
							通过
						</div>
						<div class="resourcesStateColor3" v-else-if="prresourcesData.state==3">
							已更新版本
						</div>
						<div class="resourcesStateColor3" v-else-if="prresourcesData.state==4">
							制作中
						</div>
						<div class="resourcesStateColor4" v-else-if="prresourcesData.state==5">
							非制作
						</div>
					</div>
					<div class="resourcesPubresourceBox" v-if="prresourcesData.pubresource==1">
						公共资源
					</div>
				</div>
				<el-col :span="24" class="resourcesUserBox">
					<div class="resourcesUserThum">
						<img src="@/assets/img/logo.png"/>
					</div>
					<div class="resourcesUserName">
						制作人：{{prresourcesData.outsourcing=="0"?prresourcesData.personnel_name:prresourcesData.company_name}}
					</div>
					<div v-if="$store.state.userInfo.companyid==prresourcesData.prproject_companyid"  class="resourcesTime">
						最新上传人：{{prresourcesRecordData.personnel_name}} {{$TGYC.stampToDateMD(prresourcesRecordData.time)}}
					</div>
				</el-col>
			</div>
		</el-col>
		<el-col :span="24" class="prresourcesRecordBox">
			<el-col :span="12" v-for="item in prresourcesRecordListData" @contextmenu.prevent.native="prresourcesMenu(item,$event)">
				<el-col :span="24">
					<!-- <div class="">
						当前格式：{{item.type}}
					</div> -->
					<div v-if="item.type=='jpg'||item.type=='png'||item.type=='jpeg'||item.type=='gif'" class="prresourcesRecordVideoStyle">
						<viewer :images="$VIDEOBASEURL + item.service_url + '/' + item.service_name">
						    <img :src="$VIDEOBASEURL + item.service_url + '/' + item.service_name" />
						</viewer>
						
					</div>
					<div v-else-if="item.type=='mov'||item.type=='mp4'" class="prresourcesRecordVideoStyle">
						<video width="100%" controls disablePictureInPicture controlsList="nodownload">
						  <source :src="$VIDEOBASEURL + item.service_url + '/' + item.service_name" type="video/mp4">
						</video>
					</div>
					<div v-else>
						未知格式，如需显示此格式，请联系管理员！！！
					</div>
					
				</el-col>
				<el-col :span="24" class="prresourcesRecordVideoTextBox">
					<div class="prresourcesRecordVideoTextStyle">
						<span style="color: #51B858;" v-if="prresourcesData.record_id==item.id">(当前版本)</span>
						<!-- {{item.personnel_name}} -->
						{{$store.state.userInfo.companyid==prresourcesData.prproject_companyid||item.company_id==$store.state.userInfo.companyid?item.personnel_name:item.user_position}}
					</div>
					<div class="prresourcesRecordVideoTextStyle">
						上传时间：{{$TGYC.stampToDateMD(item.time)}}
					</div>
					<div class="prresourcesRecordVideoTextStyle">
						文件时间：{{$TGYC.stampToDateMD(item.updtime)}}
					</div>
				</el-col>
			</el-col>
		</el-col>
		<!-- <el-col :span="12">
			<video width="100%" controls>
			  <source src="http://assetp.tgyc.com/assets/2021-1-15/res19505e241b2646078cdb572e27918351f857b.mov" type="video/mp4">
			</video>
		</el-col>
		<el-col :span="12">
			<video width="100%" controls>
			  <source src="http://assetp.tgyc.com/assets/2021-1-15/res19505e241b2646078cdb572e27918351f857b.mov" type="video/mp4">
			</video>
		</el-col>
		<el-col :span="12">
			<video width="100%" controls>
			  <source src="http://assetp.tgyc.com/assets/2021-1-15/res19505e241b2646078cdb572e27918351f857b.mov" type="video/mp4">
			</video>
		</el-col> -->
		
	</el-row>
</template>
<script>
	// import videoBox from '@/pages/components/video/index.vue'
	export default {
		data() {
			return {
				projectId: '',//项目id
				taskId: '',//任务id
				taskData:{},
				prresourcesId:'',//资源id
				prresourcesData:{},
				prresourcesRecordData:{},
				prresourcesRecordListData:{},
				currentUserJurisdiction:[],
			}
		},
		// components: {
		// 	'videoBox': videoBox,
		// },
		created: function() {
			this.prresourcesId = this.$route.query.prresourcesId
			this.taskId = this.$route.query.taskId
			this.myInit()
		},
		//监听路由变化
		watch:{
			
		},
		// 在 `methods` 对象中定义方法
		methods: {
			myInit(){
				this.prresourcesData=[],
				this.prresourcesRecordData=[],
				this.prresourcesRecordListData=[],
				this.getPrResources()
				this.getTask()
				this.getPrResourcesRecord()
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
				// console.log("我的权限")
				// console.log(this.currentUserJurisdiction)
			},
			
			
			getPrResources(){
				let data = {
					id:this.prresourcesId
				}
				this.$PRAPI.prResources.GetDetails(data).then(res => {
					console.log("资源信息")
					console.log(res)
					this.setTaskResources(res)
				}, err => {
					console.log(err)
				});
			},
			//设置资源文件
			setTaskResources(data){
				var mydata = data
				this.prresourcesData = mydata.pr_resources
				this.prresourcesRecordData = mydata.pr_resources_record[0]
			},
			getPrResourcesRecord(){
				let data = {
					prresources_id:this.prresourcesId
				}
				this.$PRAPI.prResourcesRecord.GetRecordNotPage(data).then(res => {
					console.log("资源记录")
					console.log(res)
					var thData = res;
					for(var i=0;i<thData.length;i++){
						var currentName = thData[i].local_name;
						var fileType = currentName.slice(currentName.lastIndexOf('.')+1,currentName.length)
						thData[i].type = fileType.toLowerCase();
					}
					this.prresourcesRecordListData = thData;
					// this.setTaskResources(res)
				}, err => {
					console.log(err)
				});
			},
			prresourcesMenu(itemData,event) {
				this.$contextmenu(
					{
						items: [
							{
								label: "下载到桌面",
								onClick: () => {
									this.dowloadResHistory(itemData)
								}
							},
							{
								label: "恢复至此版本",
								onClick: () => {
									if(this.currentUserJurisdiction.resRecoveryVersion){
										this.$confirm('确认恢复至此版本？', '提示', {
										  confirmButtonText: '确定',
										  cancelButtonText: '取消',
										  type: 'warning'
										}).then(() => {
										  this.recoveryVersion(itemData)
										}).catch(() => {
										  this.$notify({
											type: 'info',
											message: '已取消删除',
									position: 'bottom-right'
										  });          
										});
									}else{
										this.$TGYC.sendErr("您没有权限！！！");
									}
								}
							},
							{
								label: "删除此版本",
								onClick: () => {
									if(this.currentUserJurisdiction.resremoveVersion){
										this.$confirm('确认恢复至此版本？', '提示', {
										  confirmButtonText: '确定',
										  cancelButtonText: '取消',
										  type: 'warning'
										}).then(() => {
										  this.removeVersion(itemData)
										}).catch(() => {
										  this.$notify({
											type: 'info',
											message: '已取消删除',
									position: 'bottom-right'
										  });          
										});
									}else{
										this.$TGYC.sendErr("您没有权限！！！");
									}
								}
							},
							
						],
						event,
						customClass: "tgycContextMenu",
						zIndex: 9999,
						minWidth: 130,
					}
				);
				return false;
			},
			//恢复至指定版本
			recoveryVersion(data){
		
				var mydata = {
					id:data.prresources_id,
					record_id:data.id
				}
				this.$PRAPI.prResources.UpdRecord(mydata).then(res => {
					
					this.myInit()
				}, err => {
					console.log(err)
				});
				
				
			},
			removeVersion(data){
				// console.log(this.prresourcesData)
				// console.log(data)
				
				if(this.prresourcesData.record_id!=data.id){
					// console.log("可以删除")
					var mydata = {
						id:data.id,
					}
					this.$PRAPI.prResourcesRecord.DelResourcesRecord(mydata).then(res => {
						this.getPrResourcesRecord()
					}, err => {
						console.log(err)
					});
				}else{
					this.$TGYC.sendErr("只可删除当前不使用的历史版本！！！")
				}
				
			},

			dowloadResHistory(itemData){
				console.log(itemData)
				var thLocalName =  itemData['local_name']
				var localName = thLocalName.slice(0,thLocalName.indexOf(".")) + "("+ itemData.personnel_name + "__" +  this.$TGYC.stampToDateFileMD(itemData.time) + ")" + thLocalName.slice(thLocalName.indexOf("."),thLocalName.length)
				var myhome = this.$OS.homedir();
				var localUrl = myhome + "\\Desktop"
				localUrl = localUrl.replace(/\\/g,"/")
				var newArr = {
					"id": itemData.id,
					"type": 1,
					"operation": 0,
					"local_name": localName,
					"local_url": localUrl,
					"service_name": itemData['service_name'],
					"service_url": itemData['service_url'],
					"process" : 0,
					"state" : '等待下载',
					"updtime":itemData.updtime,
					"md5":"",
					"setComplete" : (data) =>{	//完成回调
						
					},
					"setProgress" : (passNum,data) =>{	//进度回调
						
					},
				}
				
				//检测是否在下载队列
				function findFileList(list){
					return list.local_name == itemData.local_name&&list.local_url == itemData.local_url
				}
				var isInList = this.$parent.fileManageList.fileDown.findIndex(findFileList)
				if(isInList==-1){
					this.$parent.fileManageList.fileDown.unshift(newArr)
					this.$parent.fileManageList.num = this.$parent.fileManageList.num +1
					this.$parent.fileManage(newArr)
				}
			},
			
			
			
		},
		destroyed: function() {
			// this.player.dispose()
		}
	}
</script>