<template>
	<el-row :gutter="20" :style="roleBoxStyle" id="roleBox" @contextmenu.prevent.native="roleBoxMenu($event)">
		<el-col :span="24" class="roleTitle" id="roleTitle">
			{{project_name}}
		</el-col>
		<el-col :span="24">
			<draggable v-model="roleList" @start="drag=true" @end="drag=false" @change="roleListChange">
				<el-col :span="24" class="roleList" v-for="(item,index) in roleList"  @contextmenu.prevent.native="roleMenu(item.id,index,$event)">
					<el-col :span="6">
						<div class="roleName" v-if="!item.isrename">
							{{item.name}}
						</div>
						<div class="roleInput" v-if="item.isrename">
							<el-input :ref="'R'+item.id" size="small" v-model="item.name" placeholder="请输入" @blur="editerRoleName(item.id,index)" @keyup.enter.native="$event.target.blur"></el-input>
						</div>
					</el-col>
					<el-col :span="18">
						<el-tag class="roleTag"
						  v-for="(tag,subindex) in item.user_list"
						  closable
						  :disable-transitions="false"
						  @close="handleClose(tag.id,index,subindex)">
						  {{tag.name}}
						</el-tag>
					</el-col>
				</el-col>
			</draggable>
		</el-col>
		
		<!-- 添加任务 -->
		<el-dialog title="添加角色" :visible.sync="roleAddBox" width="80%">
			<el-row :gutter="20" class="TaskDialogBox">
				<el-form ref="newRole" :rules="newRoleRules" :model="newRole" label-width="80px">
					<el-form-item label="角色名" prop="name">
						<el-input size="mini" v-model="newRole.name" clearable type="text"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" @click="roleAddSubmit">提交</el-button>
						<el-button size="mini" type="primary" @click="closeRoleAdd">取消</el-button>
					</el-form-item>
				</el-form>
			</el-row>
		</el-dialog>
		
		<!-- 角色人员管理 -->
		<el-dialog title="角色人员管理" :visible.sync="roleUserBox" width="80%" @close="setRoleUser">
			<div class="roleUserBoxStyle">
				<el-transfer v-model="roleListSelected" :data="userList" filterable :props="{'key':'id','label':'name'}"></el-transfer>
			</div>
		</el-dialog>
		
		<!-- 角色权限管理 -->
		<el-dialog title="角色权限管理" :visible.sync="roleJurisdictionBox" width="80%">
			<div class="roleJurisdictionBox">
				<el-row v-for="(item,index) in roleJurisdictionData">
					<el-col class="roleJurisdictionTitle">
						{{item.label}}
					</el-col>
					<el-col :span="24">
						<el-checkbox v-model="item.value" @change="jurisdictionAllChange(index,event)">全选</el-checkbox>
					</el-col>
					<el-col class="roleJurisdictionList" :span="8" v-for="(itemSub,indexSub) in item.data">
						<el-checkbox :disabled="itemSub.disabled" v-model="itemSub.value" @change="roleJurisdictionChange(index,indexSub)">{{itemSub.label}}</el-checkbox>
					</el-col>
				</el-row>
				<div style="height: 15px;"></div>
				<div class="projectSubStateList" v-for="(item,index) in projectColor">
					<div class="projectSubStateTitle">
						{{item.label}}
					</div>
					<div class="projectSubStateContent">
						<div class="projectSubStateDetaile" v-for="(subItem,subIndex) in item.children" >
							<div class="projectSubStateDetaileP">
								<div class="projectSubStateColor" :style="'background-color:'+subItem.color"></div>
								<div class="projectSubStateInput">
									<!-- <div class="projectSubStateTxt" >{{subItem.name}}</div> -->
									<div class="projectSubStateTxt" >
										<el-checkbox v-model="subItem.value" @change="roleColorJurisdictionChange(index,subIndex)">{{subItem.name}}</el-checkbox></div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</el-dialog>

	</el-row>
</template>
<script>
	import draggable from 'vuedraggable'
	export default {
		data() {
			return {
				project_id:'',//项目id
				project_name:'',//项目名称
				roleBoxStyle: "min-height:" + (window.innerHeight - 90) + "px",
				roleList:[
					// {
					// 	name:'动画导演',
					// 	user_list:[
					// 		{
					// 			id:'1',
					// 			name:'张继良'
					// 		},
					// 		{
					// 			id:'2',
					// 			name:'张旭'
					// 		},
					// 		{
					// 			id:'3',
					// 			name:'杜静东'
					// 		},
					// 	]
					// }
				],
				roleAddBox:false,//添加角色弹框
				newRole: {
					project_id:'',
					name: '',
					sort:'0',
				},
				newRoleRules: {
					name: [{
						required: true,
						message: '请输入角色名称',
						trigger: 'blur'
					}, ],
				},
				roleUserBox:false,
				userList:[],
				roleListSelected:[],
				roleIndex:'',
				roleJurisdictionBox:false,//角色权限管理弹框
				roleJurisdictionData:{},//角色权限管理弹框
				roleId:"",//当前编辑角色id
				currentUserJurisdiction:{},//当前用户权限
				projectColor:[
					{
						index:"0",
						label:"待审核",
						children:[]
					},
					{
						index:"1",
						label:"返修",
						children:[]
					},
					{
						index:"2",
						label:"通过",
						children:[]
					},
					{
						index:"4",
						label:"制作中",
						children:[]
					},
				],
			}
		},
		components: {
			draggable,
		},
		created: function() {
			this.project_id = this.$route.query.project_id
			this.project_name = this.$route.query.project_name
			this.myInit()
			this.currentUserJurisdiction = this.$store.state.userInfo.rolepower.permissions
		},
		// 在 `methods` 对象中定义方法
		methods: {
			myInit() {
				this.getRoleList()
				this.getUser()
				this.setSysJurisdiction()
			},
			//获取项目颜色数据
			getProjectStateColor(index){
				
				var data = {
					project_id:this.project_id
				}
				this.$PRAPI.prProjectColor.GetProjectList(data).then(res => {
					console.log("项目颜色信息")
					console.log(res)
					this.setProjectStateColor(res,index)
				}, err => {
					console.log(err)
				});
				
			},
			// 设置项目状态
			setProjectStateColor(data,index){
				// 初始化数据
				for(var i=0;i<this.projectColor.length;i++){
					this.projectColor[i].children = []
				}
				console.log(this.roleList)
				console.log(index)
				var currentJurisdictionData = this.roleList[index].jurisdiction;
				console.log("当前角色权限")
				console.log(currentJurisdictionData)
				
				// 权限字段含义
				// jd--权限   p--项目id 12   c--状态记录id  4
				// jdp12c4
				
				
				// 初始化状态列表
				var colorArr = this.projectColor;
				var ColorData = data
				for(var i=0;i<ColorData.length;i++){
					var codeType = ColorData[i].prid;
					var currentProp = "jdp" + ColorData[i].project_id + "c" + ColorData[i].id
					// console.log(currentProp);
					ColorData[i].prop = currentProp
					ColorData[i].value = currentJurisdictionData[currentProp]?true:false;
					
					ColorData[i].color = this.$TGYC.setSysColor(ColorData[i].colorindex);
					function findState(list){
						return list.index == codeType
					}
					var prIndex = colorArr.findIndex(findState);
					if(prIndex>-1){
						colorArr[prIndex].children.push(ColorData[i])
					}
				}
				this.projectColor = colorArr
			},
			
			
			
			
			// 权限项变更
			roleColorJurisdictionChange(index,subIndex){
			
				var currentProjectValue = this.projectColor[index].children[subIndex].value
				var currentProjectProp = this.projectColor[index].children[subIndex].prop
				var currentRoleId = this.roleId
				function findRole(list){
					return list.id == currentRoleId
				}
				var currentRoleIndex = this.roleList.findIndex(findRole)
				if(currentRoleIndex>-1){
					var currentRoleId = this.roleList[currentRoleIndex].id
					this.roleList[currentRoleIndex].jurisdiction[currentProjectProp] = currentProjectValue
					var roleJurisdiction = this.roleList[currentRoleIndex].jurisdiction 
					var roleJurisdictionStr = JSON.stringify(roleJurisdiction)
					let data = {
						id:currentRoleId,
						jurisdiction:roleJurisdictionStr
					}
					this.$PRAPI.role.UpdJurisdiction(data).then(res => {
						
					}, err => {
						console.log(err)
					});
				}
				
			},
			
			//设置系统权限列表
			setSysJurisdiction(){
				var sysJurisdictionData = this.$TGYC.sysJurisdiction
				var sysJurisdictionArr = sysJurisdictionData
				for (var item in sysJurisdictionArr){
					sysJurisdictionArr[item]["value"] = false;
					var jurisdictionClass = sysJurisdictionArr[item]["data"]
					for (var itemSub in jurisdictionClass){
						sysJurisdictionArr[item]["data"][itemSub]["value"] = false
						sysJurisdictionArr[item]["data"][itemSub]["disabled"] = false
					}
				}
				this.roleJurisdictionData = sysJurisdictionArr;
				// console.log("系统权限列表")
				// console.log(sysJurisdictionArr)
			},
			// 获取角色列表
			getRoleList(){
				var data = {
					project_id:this.project_id
				}
				this.$PRAPI.role.GetRoleActive(data).then(res => {
					this.setRoleList(res)
				}, err => {
					console.log(err)
				});
			},
			// 设置角色列表
			setRoleList(data){
				for(var i=0;i<data.length;i++){
					var userList = data[i].user_list
					data[i].isrename = false
					data[i].user_list = userList==''||userList==null||userList=='null'?[]:JSON.parse(userList)
					
					var roleJurisdiction = data[i].jurisdiction
					data[i].jurisdiction = roleJurisdiction==''||roleJurisdiction==null||roleJurisdiction=='null'?{}:JSON.parse(roleJurisdiction)
				}
				this.roleList = data
			},
			// 获取用户
			getUser(){
				this.$PRAPI.personnel.GetAllPersonnel().then(res => {
					this.setUserList(res)
				}, err => {
					console.log(err)
				});
			},
			// 设置用户
			setUserList(data){
				// console.log(data)
				// let userList = []
				// for(var i=0;i<data.length;i++){
				// 	let newArr = {
				// 		key:data[i].id,
				// 		label:data[i].name
				// 	}
				// 	userList.push(newArr)
				// }
				this.userList = data
			},
			roleBoxMenu(event) {
				if (event.target.id == 'roleBox' || event.target.id == 'roleTitle') {
					this.$contextmenu({
						items: [{
							label: "添加角色",
							onClick: () => {
								if(!this.currentUserJurisdiction.PrRoleAdd){
									this.$TGYC.sendErr("您没有权限！！！");
									return false
								};
								this.openNewRole()
							}
						},{
							label: "角色历史",
							onClick: () => {
								this.jumpRoleRecord()
							}
						}],
						event,
						customClass: "tgycContextMenu",
						zIndex: 3,
						minWidth: 130
					});
					return false;
				}
			},
			roleMenu(roleId,index,event) {
				this.$contextmenu({
					items: [{
						label: "人员管理",
						onClick: () => {
							if(!this.currentUserJurisdiction.PrRoleEditorPersonnel){
								this.$TGYC.sendErr("您没有权限！！！");
								return false
							};
							this.openRoleUserBox(index)
						}
					},{
						label: "权限管理",
						onClick: () => {
							if(!this.currentUserJurisdiction.PrRoleJurisdictionSee){
								this.$TGYC.sendErr("您没有权限！！！");
								return false
							};
							this.getProjectStateColor(index)
							this.openRoleJurisdiction(roleId,index)
						}
					},{
						label: "重命名",
						onClick: () => {
							if(!this.currentUserJurisdiction.PrRoleEditorName){
								this.$TGYC.sendErr("您没有权限！！！");
								return false
							};
							this.setRoleRename(roleId,index)
						}
					},{
						label: "添加角色",
						onClick: () => {
							if(!this.currentUserJurisdiction.PrRoleAdd){
								this.$TGYC.sendErr("您没有权限！！！");
								return false
							};
							this.openNewRole()
						}
					},{
						label: "弃用",
						onClick: () => {
							if(!this.currentUserJurisdiction.PrRoleDel){
								this.$TGYC.sendErr("您没有权限！！！");
								return false
							};
							this.removeRole(roleId,index)
						}
					},{
						label: "角色历史",
						onClick: () => {
							this.jumpRoleRecord()
						}
					}],
					event,
					customClass: "tgycContextMenu",
					zIndex: 3,
					minWidth: 130
				});
				return false;
			},
			//打开角色权限管理
			openRoleJurisdiction(roleId,index){
				this.roleJurisdictionBox = true;
				this.roleId = roleId;
				var currentJurisdictionData = this.roleList[index].jurisdiction;
				// 处理指定角色权限
				this.setCurrentJurisdiction(currentJurisdictionData);
			},
			// 处理当前角色权限列表
			setCurrentJurisdiction(data){
				var sysJurisdictionArr = this.roleJurisdictionData
				for (var item in sysJurisdictionArr){
					var jurisdictionClass = sysJurisdictionArr[item]["data"]
					var currentGroup = true;
					for (var itemSub in jurisdictionClass){
						if(data[sysJurisdictionArr[item]["data"][itemSub]["prop"]]){
							sysJurisdictionArr[item]["data"][itemSub]["value"] = true
						}else{
							sysJurisdictionArr[item]["data"][itemSub]["value"] = false
							currentGroup = false
						}
						var isCtr = false
						if(sysJurisdictionArr[item]["data"][itemSub]["prop"]=="taskProjectOutsourcing"||sysJurisdictionArr[item]["data"][itemSub]["prop"]=="taskProjectOutsourcingCtr"){
							isCtr = true
							if(this.$store.state.userInfo.rolepower.permissions.PrProjectOutsourcing){
								isCtr = false;
							};
						}
						sysJurisdictionArr[item]["data"][itemSub]["disabled"] = isCtr
					}
					sysJurisdictionArr[item]["value"] = currentGroup
				}
				this.roleJurisdictionData = sysJurisdictionArr;
			},
			// 权限项变更
			roleJurisdictionChange(index,indexSub){
				
				var currentValue = this.roleJurisdictionData[index]["data"][indexSub]["value"]
				var currentProp = this.roleJurisdictionData[index]["data"][indexSub]["prop"]

				var currentRoleId = this.roleId
				function findRole(list){
					return list.id == currentRoleId
				}
				var currentRoleIndex = this.roleList.findIndex(findRole)
				if(currentRoleIndex>-1){
					var currentRoleId = this.roleList[currentRoleIndex].id
					this.roleList[currentRoleIndex].jurisdiction[currentProp] = currentValue
					var roleJurisdiction = this.roleList[currentRoleIndex].jurisdiction 
					var roleJurisdictionStr = JSON.stringify(roleJurisdiction)
					let data = {
						id:currentRoleId,
						jurisdiction:roleJurisdictionStr
					}
					this.$PRAPI.role.UpdJurisdiction(data).then(res => {
						
					}, err => {
						console.log(err)
					});
				}
				
				
			},
			
			roleAddSubmit() {
				this.$refs['newRole'].validate((valid) => {
				  if (valid) {
					this.newRole.project_id = this.project_id
					this.$PRAPI.role.AddPrRole(this.newRole).then(res => {
						// 关闭添加项目标签并跳转到项目列表
						this.closeRoleAdd()
						this.initNewRole()
						this.myInit()
						
					}, err => {
						console.log(err)
					});
				  } else {
					return false;
				  }
				});
				
			},
			openNewRole(){
				this.roleAddBox = true
			},
			initNewRole(){
				this.newRole = {
					project_id:'',
					name: '',
					sort:'0',
				}
			},
			closeRoleAdd(){
				this.roleAddBox = false
			},
			// 打开角色人员编辑框
			openRoleUserBox(index){
				this.roleIndex = index
				this.roleUserBox = true
				this.roleListSelected = []
				let currentUser = []
				var currentUserData = this.roleList[index].user_list
				for(var i=0;i<currentUserData.length;i++){
					currentUser.push(currentUserData[i].id)
				}
				this.roleListSelected = currentUser
			},
			//设置角色人员列表
			setRoleUser(){
				// console.log(666)
				let currentUserList = this.roleListSelected;
				let uderList = this.roleList[this.roleIndex].user_list
				for(var i=0;i<currentUserList.length;i++){
					function findUder(user){
						return user.id == currentUserList[i]
					}
					var userIndex = uderList.findIndex(findUder)
					if(userIndex==-1){
						let userAdd = {
							id:currentUserList[i],
							name:this.getUserName(currentUserList[i])
						}
						this.roleList[this.roleIndex].user_list.push(userAdd)
					}
				}
				for(var i=uderList.length-1;i>-1;i--){
					function findUder(user){
						return user == uderList[i].id
					}
					var userIndex = currentUserList.findIndex(findUder)
					if(userIndex==-1){
						this.roleList[this.roleIndex].user_list.splice(userIndex,1)
					}
				}
				this.updataUserList()
			},
			//更新用户列表
			updataUserList(){
				let currentUserListStr = JSON.stringify(this.roleList[this.roleIndex].user_list)
				let data={
					id:this.roleList[this.roleIndex].id,
					user_list:currentUserListStr
				}
				this.$PRAPI.role.UpdUserList(data).then(res => {
					
				}, err => {
					console.log(err)
				});
			},
			//获取用户名字
			getUserName(userId){
				let userName = ''
				function findUser(user){
					return user.id == userId
				}
				var userIndex = this.userList.findIndex(findUser)
				if(userIndex>-1){
					userName = this.userList[userIndex].name
				}
				return userName
			},
			//删除人员
			handleClose(tag,index,subindex) {
				this.roleIndex = index
				this.roleList[this.roleIndex].user_list.splice(subindex,1)
				this.updataUserList()
			},
			//弃用角色
			removeRole(roleId,index){
				let data = {
					id:roleId
				}
				this.$PRAPI.role.UpdRoleState(data).then(res => {
					this.roleList.splice(index,1)
				}, err => {
					console.log(err)
				});
			},
			setRoleRename(roleId,index){
				this.RenameRoleId = roleId
				this.RenameRoleIndex = index
				this.roleList[index].isrename = true
				this.$nextTick( () =>{
					this.$refs['R'+this.roleList[index].id][0].focus()
				} )
			},
			editerRoleName(roleId,index){
				// console.log(roleId)
				// console.log(index) 
				let data = {
					id:roleId,
					name:this.roleList[index].name
				}
				this.$PRAPI.role.UpdPrRoleName(data).then(res => {
					this.roleList[index].isrename = false
				}, err => {
					console.log(err)
				});
			},
			roleListChange(){
				console.log(this.roleList)
				let sortArr = []
				for(var i=0;i<this.roleList.length;i++){
					let newArr = {
						id:this.roleList[i].id,
						sort:i
					}
					sortArr.push(newArr)
				}
				let sortArrStr = JSON.stringify(sortArr)
				let data = {
					json:sortArrStr,
				}
				this.$PRAPI.role.UpdSort(data).then(res => {
					
				}, err => {
					console.log(err)
				});
			},
			jumpRoleRecord(){
				this.$router.push(
					{
						path:"/index/project/roleRecord",
						query: {
						  project_id: this.project_id,
						  project_name : this.project_name
						},
					}
				)
			},
			//全选对应分组权限
			jurisdictionAllChange(index,event){
				// console.log("-------")
				// console.log(index)
				// console.log(this.roleJurisdictionData[index].value)
				var currentValue = this.roleJurisdictionData[index].value
				var currentRoleId = this.roleId
				function findRole(list){
					return list.id == currentRoleId
				}
				var currentRoleIndex = this.roleList.findIndex(findRole)
				if(currentRoleIndex>-1){
					var currentRoleId = this.roleList[currentRoleIndex].id
					//循环分组权限
					for(var i=0;i<this.roleJurisdictionData[index].data.length;i++){
						this.roleList[currentRoleIndex].jurisdiction[this.roleJurisdictionData[index].data[i]["prop"]] = currentValue
						this.roleJurisdictionData[index].data[i]["value"] = currentValue
					}
					var roleJurisdiction = this.roleList[currentRoleIndex].jurisdiction 
					var roleJurisdictionStr = JSON.stringify(roleJurisdiction)
					let data = {
						id:currentRoleId,
						jurisdiction:roleJurisdictionStr
					}
					this.$PRAPI.role.UpdJurisdiction(data).then(res => {
						
					}, err => {
						console.log(err)
					});
				}
			}
		}
	}
</script>