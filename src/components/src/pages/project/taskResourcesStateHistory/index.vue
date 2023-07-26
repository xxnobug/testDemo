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
					<div class="resourcesTime">
						最新上传人：{{prresourcesRecordData.personnel_name}} {{$TGYC.stampToDateMD(prresourcesRecordData.time)}}
					</div>
				</el-col>
			</div>
		</el-col>
		<el-col :span="24" class="prresourcesRecordBox">
			<!-- 状态记录 -->
			<!-- <el-col class="" :span="24">
				<el-col :span="6">
					状态
				</el-col>
				<el-col :span="6">
					制作人
				</el-col>
				<el-col :span="6">
					操作人
				</el-col>
				<el-col :span="6">
					操作时间
				</el-col>
			</el-col>
			<el-col class="" :span="24" v-for="item in prresourcesStateData">
				<el-col :span="6">
					{{$TGYC.setResourcesStateName(item.state)}}
				</el-col>
				<el-col :span="6">
					{{item.outsourcing=="1"?item.company_name : item.personnel_name}}
				</el-col>
				<el-col :span="6">
					{{item.operation_name}}
				</el-col>
				<el-col :span="6">
					{{$TGYC.stampToDateMD(item.time)}}
				</el-col>
			</el-col> -->

			<el-table :data="prresourcesStateData" style="width: 100%">
				<el-table-column
				    label="状态"
					width="100"
				    >
				    <template slot-scope="state">
						<div class="stateListBox">
							<div class="stateListColor" :style="'background-color:' + state.row.color"></div>
							{{$TGYC.setResourcesStateName(state.row.state)}}
						</div>
				    </template>
				</el-table-column>
				<el-table-column
				    label="制作人"
				    >
				    <template slot-scope="outsourcing">
						{{outsourcing.row.outsourcing=="1"?outsourcing.row.company_name : outsourcing.row.personnel_name}}
				    </template>
				</el-table-column>
				<el-table-column
				    label="操作人"
				    >
				    <template slot-scope="operation_name">
						{{operation_name.row.operation_name}}
				    </template>
				</el-table-column>
				<el-table-column
				    label="操作时间"
					width="150"
				    >
				    <template slot-scope="time">
						{{$TGYC.stampToDateMD(time.row.time)}}
				    </template>
				</el-table-column>
				  
			</el-table>

		</el-col>
	
		
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
				prresourcesStateData:[],
				currentUserJurisdiction:[],
			}
		},
		components: {
			// 'videoBox': videoBox,
		},
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
				this.getPrResources()
				this.getTask()
				this.getPrResourcesRecord()
				this.getPrResourcesState()
				
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
				console.log("我的权限")
				console.log(this.currentUserJurisdiction)
			},
			
			
			
			// 获取资产状态记录
			getPrResourcesState(){
				let data = {
					prresources_id:this.prresourcesId
				}
				this.$PRAPI.prResourcesLog.GetPrResourcesLog(data).then(res => {
					console.log("资源状态信息")
					console.log(res)
					
					
					var currentResData = res
					for(var i=0;i<currentResData.length;i++){
						
						var currentSubState = currentResData[i].sub_state
						var currentState = currentResData[i].state
						var currentColorCode = currentSubState!=""&&currentSubState!="0"&&currentSubState!=null&&currentSubState!="null"&&currentSubState!=undefined ? this.$TGYC.setSysColor(currentSubState) : this.$TGYC.setResourcesColorCode(currentState)
						currentResData[i].color = currentColorCode
						
					}
					
					
					this.prresourcesStateData = currentResData
				}, err => {
					console.log(err)
				});
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
					this.prresourcesRecordListData = res;
					// this.setTaskResources(res)
				}, err => {
					console.log(err)
				});
			},
			prresourcesMenu(itemData,event) {
				this.$contextmenu(
					{
						items: [{
							label: "恢复至此版本",
							onClick: () => {
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
							}
						}],
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
				
				}, err => {
					console.log(err)
				});
				
				
				
			},
			
			
			
			
		},
		destroyed: function() {
			// this.player.dispose()
		}
	}
</script>