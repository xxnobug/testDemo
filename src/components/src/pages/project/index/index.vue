<template>
	<el-row gutter="20">
		<el-row class="projectListBox" @contextmenu.prevent.native="projectMenu($event)"	id="ProjectBox" :style="ProjectBoxHeight">
			<el-col :span="4" v-for="(item,index) in projectList" @contextmenu.prevent.native="projectMenuD(item.id,index,$event)" >
				<div class="projectListCard"  >
					<div class="projectListCardP">
						<div class="projectListImg" @click="openProject(item)">
							<img :src="item.allThum">
						</div>
						<div class="projectListName">
							<div :hidden="item.editer" @click="openProject(item)">
								{{item.name}}
							</div>
							<div :hidden="!item.editer">
								<el-input :ref="item.id" size="small" v-model="item.name" placeholder="请输入" @blur="editerProjectNameBlur(index)" @keyup.enter.native="$event.target.blur"></el-input>
							</div>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
		<ImgCropper ref="imgCropper" @imgChange="setProjectImg"></ImgCropper>
		
		
		<!-- 填写工程版本描述 -->
		<el-dialog title="状态编辑" :visible.sync="projectSubStateBox" width="80%">
			<el-row :style="dialogBoxHeigth">
				<el-scrollbar style="height: 100%;">
					<div class="projectSubStateList" v-for="(item,index) in projectColor">
						<div class="projectSubStateTitle">
							{{item.label}}
							<div class="projectSubStateAdd" @click="addProjectColor(item)">
								<i class="el-icon-plus"></i>
							</div>
						</div>
						<div class="projectSubStateContent">
							<div class="projectSubStateDetaile" v-for="(subItem,subIndex) in item.children" @contextmenu.prevent="subStateMenu(subItem,$event)">
								<div class="projectSubStateDetaileP">
									<div class="projectSubStateColor" :style="'background-color:'+subItem.color"></div>
									<div class="projectSubStateInput">
										<div v-if="!subItem.editer" class="projectSubStateTxt" @dblclick="setSubStateName(index,subIndex)">{{subItem.name}}</div>
										<div v-if="subItem.editer" class="projectSubStateTxtInput"><input :ref="subItem.id" v-model="subItem.name" @blur="submitChangeSubStateName(subItem,index,subIndex)" @keyup.enter="$event.target.blur"/></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					
				</el-scrollbar>
			</el-row>
		</el-dialog>
		
		<!-- 选择可用颜色标签 -->
		<el-dialog title="选择颜色便签" :visible.sync="projectSubStateColorBox" width="80%">
			<el-row :style="dialogBoxHeigth">
				<div class="labelColorBox">
					<div class="labelColorList" v-for="item in colorBox" :style="'background-color:'+item.color" @click="selectedColorLabel(item)">
					</div>
				</div>
			</el-row>
		</el-dialog>
				
				
		
	</el-row>
</template>
<script>
	import {ImgCropper} from '@/layout/imgcropper/index.vue'
	export default {
		data() {
			return {
				// wdHeigth: window.innerHeight - 90,
				ProjectBoxHeight: "height:" + (window.innerHeight - 90) + "px",
				dialogBoxHeigth: "height:" + (window.innerHeight - 200) + "px",
				projectList: [
					// {
					// 	id: 0,
					// 	thum: 'http://api.gpu365.net/Upload/Uploads/20190910/1568097002.jpeg',
					// 	project: '末世觉醒'
					// }
				],
				currentProjectId:'',
				websock: null,
				currentUserJurisdiction:{},//当前用户权限
				projectSubStateBox:false,//状态编辑框
				projectSubStateColorBox:false,//颜色选择
				colorBox:[],
				currentEditProjectId:"",//当前状态编辑项目id
				// 待审核，返修，通过，制作中
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
				currentSelectedColor:"",//当前选中颜色
				currentStateItem:"",//当前要添加的颜色组
			}
		},
		created: function() {
			this.myInit()
			this.currentUserJurisdiction = this.$store.state.userInfo.rolepower.permissions
			
			// if(!this.currentUserJurisdiction.taskEditState){
			// 	this.$TGYC.sendErr("您没有权限！！！");
			// 	return false
			// };
			
			
			// console.log(this.$parent)
			// if(this.$parent.socketS){
			// 	this.$parent.websocketsend3()
			// }
			// this.initWebSocket();
		},
		components: {
		  ImgCropper,
		},
		// 在 `methods` 对象中定义方法
		methods: {
		// 	initWebSocket(){ //初始化weosocket
		// 	const wsuri = "ws://127.0.0.1:7401";
		// 	this.websock = new WebSocket(wsuri);
		// 	this.websock.onmessage = this.websocketonmessage;
		// 	this.websock.onopen = this.websocketonopen;
		// 	this.websock.onerror = this.websocketonerror;
		// 	this.websock.onclose = this.websocketclose;
		//   },
		//   websocketonopen(){ //连接建立之后执行send方法发送数据
		// 	// let actions = {"test":"12345"};
		// 	// this.websocketsend(JSON.stringify(actions));
		// 	console.log('已连接')
		// 	// setInterval(()=>{
		// 	// 	this.websocketsend(1233)
		// 	// }, 500); 
			
		//   },
		//   websocketonerror(){//连接建立失败重连
		// 	this.initWebSocket();
		//   },
		//   websocketonmessage(e){ //数据接收
		// 	// const redata = JSON.parse(e.data);
		// 	console.log(e)
		//   },
		//   websocketsend(Data){//数据发送
		// 	this.websock.send(Data);
		//   },
		//   websocketclose(e){  //关闭
		// 	console.log('断开连接',e);
		//   },	  
		// websocketsend1(){
		// 	var data =  {"type":"onRecord","id":"123"}
		// 	var dataStr = JSON.stringify(data)
		// 	this.websocketsend(dataStr)
		// },
		// websocketsend2(){
		// 	var data =  {"type":"onScreen","id":"789"}
		// 	var dataStr = JSON.stringify(data)
		// 	this.websocketsend(dataStr)
		// },
		// websocketsend3(){
		// 	var data =  {"type":"onScreenshots","id":"456"}
		// 	var dataStr = JSON.stringify(data)
		// 	this.websocketsend(dataStr)
		// },
		// websocketsend4(){
		// 	var data =  	{
		// 	"type":"file",
		// 	"path":"C:\\TGYC\\E01\\123.json"
		// }
		// 	var dataStr = JSON.stringify(data)
		// 	this.websocketsend(dataStr)
		// },
		// websocketsend5(){
		// 	var data =  	{
		// 	"type":"file",
		// 	"path":"C:\\TGYC\\E01\\456.json"
		// }
		// 	var dataStr = JSON.stringify(data)
		// 	this.websocketsend(dataStr)
		// },
		// websocketsend6(){
		// 	var data =  	{
		// 	"type":"state"
		// }
		// 	var dataStr = JSON.stringify(data)
		// 	this.websocketsend(dataStr)
		// },
		
		
		
		
		
			myInit(){
				this.getProject()
				
				// this.setColorBox()
			},
			//设置可用颜色标签
			// setColorBox(){
			// 	var sysStateList = this.$TGYC.sysStateList
			// 	//选取可用颜色标签
			// 	this.colorBox = sysStateList
			// },
			//获取项目颜色数据
			getProjectStateColor(){
				
				var data = {
					project_id:this.currentEditProjectId
				}
				this.$PRAPI.prProjectColor.GetProjectList(data).then(res => {
					console.log("项目颜色信息")
					console.log(res)
					this.setProjectStateColor(res)
				}, err => {
					console.log(err)
				});
				
			},
			// 设置项目状态
			setProjectStateColor(data){
				// 初始化数据
				for(var i=0;i<this.projectColor.length;i++){
					this.projectColor[i].children = []
				}
				
				// 初始化状态列表
				var sysStateList = JSON.stringify(this.$TGYC.sysStateList)
				sysStateList = JSON.parse(sysStateList)
				
				var colorArr = this.projectColor;
				var ColorData = data
				for(var i=0;i<ColorData.length;i++){
					var codeType = ColorData[i].prid;
					ColorData[i].editer = false;
					ColorData[i].color = this.$TGYC.setSysColor(ColorData[i].colorindex);
					function findState(list){
						return list.index == codeType
					}
					var prIndex = colorArr.findIndex(findState);
					if(prIndex>-1){
						colorArr[prIndex].children.push(ColorData[i])
					}
					// 清理使用颜色
					// ColorData[i].colorindex
					
					
					function findColor(list){
						return list.index == ColorData[i].colorindex
					}
					var colorIndex = sysStateList.findIndex(findColor)
					if(colorIndex>-1){
						sysStateList.splice(colorIndex,1)
					}
					
				}
				this.colorBox = sysStateList
				this.projectColor = colorArr
			},
			// 添加系统颜色
			addProjectColor(item){
				this.projectSubStateColorBox = true;
				this.currentStateItem = item;
			},
			// 选择要添加的颜色便签
			selectedColorLabel(item){
				this.projectSubStateColorBox = false;
				this.currentSelectedColor = item.index;
				
				console.log(this.currentStateItem)
				console.log(this.currentSelectedColor)
				
				var addArr = {
					name : "new",
					colorIndex : this.currentSelectedColor,
					prid : this.currentStateItem.index,
					project_id : this.currentEditProjectId,
				}
				//添加到数据库
				this.$PRAPI.prProjectColor.AddProjectColor(addArr).then(res => {
					// console.log(res)
					this.getProjectStateColor()
				}, err => {
					console.log(err)
				});
		
			},
			//设置编辑状态
			setSubStateName(index,subIndex){
				this.projectColor[index].children[subIndex].editer = true;
			},
			
			submitChangeSubStateName(subItem,index,subIndex){
				// console.log("需要更新")
				// console.log(subItem)
				//修改状态名称
				this.$PRAPI.prProjectColor.UpdName(subItem).then(res => {
					// console.log(res)
					this.projectColor[index].children[subIndex].editer = false;
				}, err => {
					console.log(err)
				});
				
			},
			subStateMenu(subItem,event) {
				this.$contextmenu({
					items: [{
							label: "删除",
							onClick: () => {
								this.delProjectSubState(subItem)
							}
						}
					],
					event,
					customClass: "tgycContextMenu",
					zIndex: 999999,
					minWidth: 130
				});
				return false;
			},
			delProjectSubState(subItem){
				this.$PRAPI.prProjectColor.DelState(subItem).then(res => {
					this.getProjectStateColor()
				}, err => {
					console.log(err)
				});
			},
			
			setProjectImg(img){
				// console.log(img)
				var data = {
					id:this.currentProjectId,
					thum:img
				}
				this.$PRAPI.project.UpdProThum(data).then(res => {
					// console.log(res)
					this.myInit()
				}, err => {
					console.log(err)
				});
			},
			getProject(){
				console.log(this)
				console.log(this.$PRAPI)
				this.$PRAPI.project.GetProActive().then(res => {
					console.log("活跃的项目")
					console.log(res)
					this.setProjectData(res)
				}, err => {
					console.log(err)
				});
			},
			setProjectData(data){
				var projectArr = []
				for(var i=0;i<data.length;i++){
					var thProject = data[i]
					thProject.editer = false
					thProject.allThum = this.$ASSETBASEURL + data[i].thum
					projectArr.push(thProject)
				}
				this.projectList = projectArr
				console.log(this.projectList)
			},
			openProject(thData){
				var projectId = thData.id
				var projectName = thData.name
				var taskProjectId= thData.projectid
				// 查询我是否在权限列表中,如果在,则允许打开项目
				var currentUserId = this.$store.state.userInfo.id;
				var userInRole = false;
				function findProject(list){
					return list.id == projectId
				}
				var projectIndex = this.projectList.findIndex(findProject);
				if(projectIndex>-1){
					var roleList = this.projectList[projectIndex].rolelist;
					for (let item in roleList) {
						console.log(item)
						var currentUserList = roleList[item].user_list;
						currentUserList = currentUserList==null||currentUserList=="null"||currentUserList==""||currentUserList==undefined?[]:JSON.parse(currentUserList);
						function findUser(listSub){
							return listSub.id == currentUserId;
						}
						var userIndex = currentUserList.findIndex(findUser);
						if(userIndex>-1){
							userInRole = true
							break
						}
					}
				}
				if(userInRole){
					this.$router.push(
						{ 
							path: '/index/project/tasklist',
							query: {
							  projectId: projectId,
							  projectName:projectName,
							  taskProjectId:taskProjectId
							},
						}
					)
				}else{
					this.$TGYC.sendErr("您没有权限,如需访问，请联系管理员。");
				}
				
			},
			projectMenu(event) {
				if(event.target.id=='ProjectBox'){
					this.$contextmenu({
						items: [{
								label: "添加项目",
								onClick: () => {
									if(!this.currentUserJurisdiction.PrProjectAdd){
										this.$TGYC.sendErr("您没有权限！！！");
										return false
									};
									this.$router.push(
										{ 
											path: '/index/project/addproject',
										}
									)
								}
							},{
								label: "查看冻结",
								onClick: () => {
									if(!this.currentUserJurisdiction.PrProjectSee){
										this.$TGYC.sendErr("您没有权限！！！");
										return false
									};
									this.seeFreezeProject()
								}
							},{
								label: "刷新",
								onClick: () => {
									this.myInit()
								}
							},
						],
						event,
						customClass: "tgycContextMenu",
						zIndex: 3,
						minWidth: 130
					});
					return false;
				}
			},
			projectMenuD(projectId,index,event) {
				this.currentProjectId = projectId;
				this.$contextmenu({
					items: [{
							label: "添加项目",
							onClick: () => {
								if(!this.currentUserJurisdiction.PrProjectAdd){
									this.$TGYC.sendErr("您没有权限！！！");
									return false
								};
								this.$router.push(
									{ 
										path: '/index/project/addproject',
									}
								)
							}
						},{
							label: "角色管理",
							onClick: () => {
								if(!this.currentUserJurisdiction.PrRoleManage){
									this.$TGYC.sendErr("您没有权限！！！");
									return false
								};
								this.openProjectRole(projectId,index)
							}
						},{
							label: "状态管理",
							onClick: () => {
								// if(!this.currentUserJurisdiction.PrStateManage){
								// 	this.$TGYC.sendErr("您没有权限！！！");
								// 	return false
								// };
								this.openProjectState(projectId,index)
							}
						},{
							label: "修改缩略图",
							onClick: () => {
								if(!this.currentUserJurisdiction.PrProjectEditor){
									this.$TGYC.sendErr("您没有权限！！！");
									return false
								};
								this.$refs.imgCropper.inputAction()
							}
						},{
							label: "重命名",
							onClick: () => {
								if(!this.currentUserJurisdiction.PrProjectEditor){
									this.$TGYC.sendErr("您没有权限！！！");
									return false
								};
								this.editerProjectName(index)
								// console.log(this.$refs)
							}
						},{
							label: "冻结",
							onClick: () => {
								if(!this.currentUserJurisdiction.PrProjectFreeze){
									this.$TGYC.sendErr("您没有权限！！！");
									return false
								};
								this.freezeProject(projectId)
							}
						},{
							label: "查看冻结",
							onClick: () => {
								if(!this.currentUserJurisdiction.PrProjectSee){
									this.$TGYC.sendErr("您没有权限！！！");
									return false
								};
								this.seeFreezeProject()
							}
						},{
							label: "刷新",
							onClick: () => {
								this.myInit()
							}
						},
					],
					event,
					customClass: "tgycContextMenu",
					zIndex: 4,
					minWidth: 130
				});
				return false;
			},
			// 删除项目
			delProject(projectId){
				// this.$PRAPI.project.GetProActive().then(res => {
				// 	console.log(res)
				// 	this.setProjectData(res)
				// }, err => {
				// 	console.log(err)
					
				// });
			},
			// 冻结项目
			freezeProject(projectId){
				let data = {
					id:projectId
				}
				this.$PRAPI.project.UpdState(data).then(res => {
					console.log(res)
					this.myInit()
				}, err => {
					console.log(err)
				});
			},
			// 查看冻结项目
			seeFreezeProject(){
				this.$router.push(
					{ 
						path: '/index/project/freezeProject',
					}
				)
			},
			// 角色管理
			openProjectRole(projectId,index){
				this.$router.push(
					{ 
						path: '/index/project/role',
						query: {
						  project_id: projectId,
						  project_name: this.projectList[index].name,
						},
					}
				)
			},
			
			//管理项目状态
			openProjectState(prjectId,index){
				this.projectSubStateBox = true;
				this.currentEditProjectId = prjectId
				this.getProjectStateColor(prjectId)
			},
			
			// 重命名
			editerProjectName(index){
				this.projectList[index].editer = true
				this.$nextTick( () =>{
					this.$refs[this.projectList[index].id][0].focus()
				} )
				
			},
			//重命名是焦事件
			editerProjectNameBlur(index){
				if(this.projectList[index].name){
					let data = {
						id:this.projectList[index].id,
						name:this.projectList[index].name
					}
					this.$PRAPI.project.UpdProName(data).then(res => {
						// console.log(res)
						this.projectList[index].editer = false
					}, err => {
						console.log(err)
					});
				}else{
					this.Message.error('项目名不能为空');
				}
			},
		}
	}
</script>