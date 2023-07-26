<template>
	<div>
		<el-row>
			<el-col :span="24" class="taskListBox"	id="taskListBox" :style="taskListBoxHeight" @contextmenu.prevent.native="taskListMenu($event)">
				<el-col :span="4" v-for="(item,index) in taskList" @contextmenu.prevent.native="taskListMenuD(item.id,index,$event)">
					<div class="taskListCard" @click="openTask(item.id)">
						<div class="taskListCardP">
							<el-popover placement="top-start" width="200" trigger="hover" >
								<el-col>
									锁定人:{{item.lock_name}}
								</el-col>
								<el-col>
									锁定时间:{{$TGYC.stampToDateMD(item.lock_time)}}
								</el-col>
							    <el-button v-if="item.lock_state=='1'" slot="reference" class="taskListlockBox" icon="el-icon-lock"></el-button>
							</el-popover>
							  
							<div class="taskListImg">
								<img :src="item.allThum">
							</div>
							<div class="taskListName">
								{{item.name}}
							</div>
						</div>
					</div>
				</el-col>
			</el-col>
			
		</el-row>
		<!-- 添加任务 --> 
		<el-dialog title="添加任务" :visible.sync="taskAddBox" width="80%">
			<!-- <el-row :gutter="20" :style="taskAddBoxStyle"> -->
			<el-row :gutter="20" class="TaskDialogBox">
				<el-form ref="newTask" :rules="newTaskRules" :model="newTask" label-width="80px">
					<el-form-item label="缩略图" prop="thum">
						<div class="projectThum" @click="updataThum">
							<img :src="$ASSETBASEURL + newTask.thum" />
						</div>
					</el-form-item>
					<el-form-item label="任务名" prop="name">
						<el-input size="mini" v-model="newTask.name" type="text" clearable></el-input>
					</el-form-item>
					<el-form-item label="中文名" prop="chinese_name">
						<el-input size="mini" v-model="newTask.chinese_name" type="text" clearable></el-input>
					</el-form-item>
					<el-form-item label="时长(分)" prop="time_len">
						<el-input size="mini" v-model="newTask.time_len" type="text" clearable></el-input>
					</el-form-item>
					<el-form-item label="负责角色" prop="role_id">
						<el-select size="mini" v-model="newTask.role_id" multiple  collapse-tags placeholder="请选择">
							<el-option
							      v-for="item in prRoleList"
							      :key="item.id"
							      :label="item.name"
							      :value="item.id">
							    </el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" @click="onSubmit">提交</el-button>
						<el-button size="mini" type="primary" @click="closeSubmit">取消</el-button>
					</el-form-item>
				</el-form>
			</el-row>
		</el-dialog>
		<ImgCropper ref="imgCropper" @imgChange="setProjectImg"></ImgCropper>
	</div>
</template>
<script>
	import ImgCropper from '@/layout/imgcropper/index.vue'
	export default {
		data() {
			return {
				taskListBoxHeight: "height:" + (window.innerHeight - 90) + "px",
				projectId: '', //当前项目id
				projectName:'',//当前项目名称
				taskProjectId:"",//任务项目id
				directoryId: 0, //当前目录id
				taskList: [], //任务列表
				taskAddBox: false, //添加任务弹框
				// taskAddBoxStyle:"height:" + (window.innerHeight - 190) + "px",
				newTask: {
					project_id: '',
					directory_id: '',
					name: '',
					chinese_name: '',
					thum: '/Upload/prproject.jpg',
					sort: '0',
					time_len: '',
					role_id: [],
				},
				newTaskRules: {
					name: [{
						required: true,
						message: '请输入项目名称',
						trigger: 'blur'
					}, ],
					role_id: [{
						required: true,
						message: '请选择负责角色',
						trigger: 'blur'
					}, ]
				},
				prRoleList: [], //pr角色列表
				currentUserJurisdiction:{},//当前用户权限
			}
		},
		components: {
			ImgCropper,
		},
		created: function() {
			// console.log(this.$route)
			// console.log(this.$route.query.id)
			this.projectId = this.$route.query.projectId
			this.projectName = this.$route.query.projectName
			this.taskProjectId = this.$route.query.taskProjectId
			this.myInit()
		},
		// 在 `methods` 对象中定义方法
		methods: {
			myInit() {
				this.getTask()
				this.getRoleList()
			},
			getTask() {
		
				var data = {
					project_id: this.projectId,
					directory_id: this.directoryId
				}
		
				this.$PRAPI.prtask.GetPrTask(data).then(res => {
					console.log(res)
					this.setTaskList(res)
				}, err => {
					console.log(err)
				});
			},
			setTaskList(data) {
				var mydata = data
				for(var i=0;i<mydata.length;i++){
					mydata[i]["allThum"] = this.$ASSETBASEURL + mydata[i].thum
				}
				this.taskList = mydata
			},
			//获取角色列表
			getRoleList() {
				var data = {
					project_id: this.projectId,
				}
		
				this.$PRAPI.role.GetRoleActive(data).then(res => {
					console.log("项目权限列表")
					console.log(res)
					this.setRoleList(res)
				}, err => {
					console.log(err)
				});
			},
			setRoleList(data) {
				for(var i=0;i<data.length;i++){
					var userList = data[i].user_list
					data[i].isrename = false
					data[i].user_list = userList==''||userList==null||userList=='null'?[]:JSON.parse(userList)
					
					var roleJurisdiction = data[i].jurisdiction
					data[i].jurisdiction = roleJurisdiction==''||roleJurisdiction==null||roleJurisdiction=='null'?{}:JSON.parse(roleJurisdiction)
				}
				this.prRoleList = data
				// 处理项目中我的任务权限
				console.log("当前项目角色")
				console.log(this.prRoleList)
				this.setMyJurisdiction()
				
			},
			//设置我的角色权限
			setMyJurisdiction(){
				var myJurisdiction = {}
				var currentUser = this.$store.state.userInfo.id
				var roleList = this.prRoleList
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
				// console.log(myJurisdiction)
			},
			openTask(taskId) {
				this.$router.push({
					path: '/index/project/task',
					query: {
						projectId: this.projectId,
						projectName: this.projectName,
						taskId: taskId,
						taskProjectId:this.taskProjectId
					}
				})
			},
			taskListMenu(event) {
				if (event.target.id == 'taskListBox') {
					this.$contextmenu(
						{
							items: [{
								label: "添加任务",
								onClick: () => {
									this.openTaskAddBox()
								}
							}, 
							// {
							// 	label: "新建目录",
							// 	onClick: () => {
		
							// 	}
							// }, 
							// {
							// 	label: "排序",
							// 	onClick: () => {
		
							// 	}
							// }, 
							{
								label: "刷新",
								onClick: () => {
									this.myInit()
								}
							}],
							event,
							customClass: "tgycContextMenu",
							zIndex: 9999,
							minWidth: 130,
						}
					);
					return false;
				} 
		
			},
			taskListMenuD(taskId, index, event) {
				this.$contextmenu({
					items: [
						{
							label: "打开",
							onClick: () => {
								this.openTask(taskId)
							}
						}, 
						{
							label: "编辑",
							onClick: () => {
								if(!this.currentUserJurisdiction.taskEdit){
									this.$TGYC.sendErr("您没有权限！！！");
									return false
								};
								// 拉取最新信息,检索任务锁定状态再操作
								let data = {
									id: taskId
								}
								this.$PRAPI.prtask.GetDetails(data).then(res => {
									// console.log("任务最新资源状态")
									// console.log(res)
									var currentState = res.lock_state
									var currentLockId = res.lock_id
									if(currentState=="1"&&currentLockId!=this.$store.state.userInfo.id){
										var lock_name = res.lock_name
										this.$notify.error(lock_name + '正在编辑此任务，请在其编辑完成后重试！！！');
									}else if(currentState=="1"&&currentLockId==this.$store.state.userInfo.id){
										this.openTask(taskId)
									}else{
										var taskName = this.taskList[index].name
									
										this.$confirm('编辑状态下其他人将不可编辑，请在编辑完成后及时解除编辑状态！！！', taskName + '锁定提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消',
											type: 'warning'
										}).then(() => {
											this.setLockTask(taskId, index)
										}).catch(() => {
											this.$notify({
												type: 'info',
												message: '已取消',
									position: 'bottom-right'
											});
										});
										
									}
									
								}, err => {
									console.log(err)
								});
								
							}
						}, 
						// {
						// 	label: "添加",
						// 	onClick: () => {
						// 		this.openTaskAddBox()
						// 	}
						// }, 
						// {
						// 	label: "历史记录",
						// 	onClick: () => {
						// 		this.jumpTaskHistory(taskId, index)
						// 	}
						// }, 
						{
							label: "删除",
							onClick: () => {
								
								this.$confirm('确认删除', '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									type: 'warning'
								}).then(() => {
									this.delPrTask(taskId)
								}).catch(() => {
									this.$notify({
										type: 'info',
										message: '已取消',
									position: 'bottom-right'
									});
								});
							}
						}, 
						{
							label: "日志",
							onClick: () => {
								this.jumpTaskLog(taskId, index)
							}
						}, 
						{
							label: "刷新",
							onClick: () => {
								this.myInit()
							}
						}, 
					],
					event,
					customClass: "tgycContextMenu",
					zIndex: 9999,
					minWidth: 130
				});
				return false;
			},
			delPrTask(taskId) {
				if(!this.currentUserJurisdiction.taskDel){
					this.$TGYC.sendErr("您没有权限！！！");
					return false
				};
				let data = {
					id: taskId
				}
				this.$PRAPI.prtask.DelPrTask(data).then(res => {
					console.log(res)
					this.myInit()
				}, err => {
					console.log(err)
				});
			},
			onSubmit() {
				this.$refs['newTask'].validate((valid) => {
					if (valid) {
						this.newTask.project_id = this.projectId
						this.newTask.directory_id = this.directoryId
						this.newTask.role_id = JSON.stringify(this.newTask.role_id)
						this.$PRAPI.prtask.AddPrtask(this.newTask).then(res => {
							// 关闭添加项目标签并跳转到项目列表
							this.closeSubmit()
							this.initNewTask()
							this.myInit()
		
						}, err => {
							console.log(err)
						});
					} else {
						// console.log('error submit!!');
						return false;
					}
				});
		
			},
			updataThum() {
				this.$refs.imgCropper.inputAction()
			},
			setProjectImg(img) {
				this.newTask.thum = img
			},
			openTaskAddBox() {
				//权限判定
				if(!this.currentUserJurisdiction.taskAdd){
					this.$TGYC.sendErr("您没有权限！！！");
					return false
				};
				this.taskAddBox = true
			},
			initNewTask() {
				this.newTask = {
					project_id: '',
					directory_id: '',
					name: '',
					chinese_name: '',
					thum: '/Upload/prproject.jpg',
					sort: '0',
					time_len: '',
					role_id: [],
				}
			},
			closeSubmit() {
				this.taskAddBox = false
			},
			// 锁定任务
			setLockTask(taskIndex, index) {
				let data = {
					id: taskIndex,
					lock_id: this.$store.state.userInfo.id,
					lock_name: this.$store.state.userInfo.name,
				}
				this.$PRAPI.prtask.UpdLock(data).then(res => {
					this.taskList[index].lock_state = '1'
					this.openTask(taskIndex)
				}, err => {
					console.log(err)
				});
			},
			// 解锁任务
			setUnLockTask(taskIndex, index) {
				let data = {
					id: taskIndex,
				}
				this.$PRAPI.prtask.UpdUnLock(data).then(res => {
					this.taskList[index].lock_state = '0'
				}, err => {
					console.log(err)
				});
			},
			jumpTaskLog(taskId, index) {
				if(!this.currentUserJurisdiction.taskSeeLog){
					this.$TGYC.sendErr("您没有权限！！！");
					return false
				};
				this.$router.push({
					path: '/index/project/taskLog',
					query: {
						taskId: taskId
					},
				})
			},
			// jumpTaskHistory(taskId, index) {
			// 	if(!this.currentUserJurisdiction.taskSeeHistory){
			// 		this.$TGYC.sendErr("您没有权限！！！");
			// 		return false
			// 	};
			// 	this.$router.push({
			// 		path: '/index/project/taskHistory',
			// 		query: {
			// 			taskId: taskId
			// 		},
			// 	})
			// }
		}
	}
</script>