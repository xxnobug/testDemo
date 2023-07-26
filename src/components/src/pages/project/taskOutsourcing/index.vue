<template>
	<div>
		<el-row>
			<!-- 外发管理 -->
			<el-col :span="24" class="taskOutgoingTitleBox">
				{{taskData.project_name}}--{{taskData.name}}
				<el-switch
				  v-model="taskOutgoingState"
				  @change="taskOutgoingStateChange"
				  active-color="#2d8ceb"
				  inactive-color="#161616">
				</el-switch>
				<div class="taskOutgoingState">
					<el-dropdown @command="selectTapChange">
						<span class="el-dropdown-link">
							{{currentTap}}<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="going">进行中</el-dropdown-item>
							<el-dropdown-item command="history">历史记录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					
					<span class="taskOutgoingAddBtn">
						<el-tooltip class="item" effect="dark" content="添加外包" placement="bottom-start">
							<img @click="openSelectCompanyBox" src="../../../assets/img/taskOutgoingAddBtn.png" />
						</el-tooltip>
					</span>
					
				</div>
			</el-col>
			<el-col :span="24" class="taskOutgoingTableBox">
				<template>
				  <el-table
				    :data="taskOutgoingData"
					:height="tabelHeight"
				    border
				    style="width: 100%">
				    <el-table-column prop="name" label="外包名称"></el-table-column>
				    <el-table-column prop="creater_name" label="分配人"></el-table-column>
				    <el-table-column prop="time" label="分配时间">
						<template slot-scope="time">
							{{$TGYC.stampToDateMD(time.row.time)}}
						</template>
					</el-table-column>
				    <el-table-column prop="state" label="状态">
						<template slot-scope="state">
							<div class="taskOutgingStateColorBox">
								<div class="taskOutgingStateColor" :style="$TGYC.setTaskOutgingStateColor(state.row.state)"></div>
							</div>
							<div @click="changeStateBtn(state.row,$event)" class="taskOutgingStateColorText">{{$TGYC.setTaskOutgingStateName(state.row.state)}}</div>
						</template>
					</el-table-column>
				   
				  </el-table>
				</template>
				
				
				
			</el-col>
			<el-col :span="24">
				<el-pagination
					@size-change = 'getTaskOutsourcingChangeSize'
					@current-change = 'getTaskOutsourcingChangePage'
				  :current-page.sync="currentPage"
				  :page-sizes="pageSizeArr"
				  :page-size="currentPageSize"
				  layout="sizes, prev, pager, next"
				  :total="taskOutgoingCount">
				</el-pagination>
				 
			</el-col>
			
		</el-row>
		
		
		<!-- 分发给外包公司 -->
		<el-dialog title="选择外包公司" :visible.sync="selectCompanyBox" width="80%">
			
			<el-row>
				<el-col class="selectCompanyBoxSelect">
					<el-select v-model="currentCompany" filterable placeholder="请选择">
					    <el-option
					      v-for="item in companyList"
					      :key="item.id"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					</el-select>
				</el-col>
			</el-row>
			<div class="newFeedBackContentBtn">
				<el-button class="newFeedBackContentBtnMargin" size="mini" @click="submitCompany">确认</el-button>
				<el-button class="newFeedBackContentBtnMargin" size="mini" @click="closeSelectCompanyBox">取消</el-button>
			</div>
		</el-dialog>
		
		
		<!-- 状态修改框 -->
		<div class="changeStateShowBox" :style="changeStateShowBoxStyle" :hidden="changeStateShowBox">
			<el-row>
				<el-col :span="24">
					<div class="changeStateBoxSelect">
						<el-select ref="changeStateBox" v-model="currentState" filterable placeholder="请选择" size="mini" @change="selectChangeState" @blur="closeChangeStateShowBox">
							<el-option
							  v-for="item in stateList"
							  :key="item.id"
							  :label="item.label"
							  :value="item.id">
							</el-option>
						</el-select>
					</div>
				</el-col>
			</el-row>
		</div>
		
		
		
		
		
	</div>
</template>
<script>
	export default {
		data() {
			return {
				taskId: '', //任务id
				tabelHeight:window.innerHeight - 160,
				taskData:{},//任务数据
				taskOutgoingData:[],//进行中的任务数据
				taskOutgoingCount:0,//任务总数
				taskOutgoingState:false,//任务外发状态
				currentPage:1,
				currentPageSize:50,
				pageSizeArr:[50, 100, 200, 300],
				selectCompanyBox:false,//选择外包公司选框
				currentCompany:"",//当前选中公司
				companyList:[],//公司列表
				changeStateShowBox:true,
				changeStateShowBoxStyle:"left:10px;top:10px",
				currentState:"",
				currentData:{},//当前项数据
				stateList:[ 
					{
						id:"0",
						label:"进行中"
					},
					{
						id:"2",
						label:"暂停"
					},
					{
						id:"1",
						label:"完成"
					},
					{
						id:"3",
						label:"取消"
					}
				],
				currentTap:"进行中",
				currentTapType:"going",
				currentUserJurisdiction:{},//当前用户权限
			}
		},
		created: function() {
			this.taskId = this.$route.query.taskId
			this.myInit()
		},
		// 在 `methods` 对象中定义方法
		methods: {
			myInit() {
				//获取任务信息
				this.getTask();
				//获取外发信息
				this.getcurrentTapTaskOutsourcing();
			},
			//获取任务详细信息
			getTask() {
				let data = {
					id: this.taskId
				}
				this.$PRAPI.prtask.GetDetails(data).then(res => {
					console.log("任务信息")
					console.log(res)
					this.taskData = res;
					if(res.outsourcing=="1"){
						this.taskOutgoingState = true
					}else{
						this.taskOutgoingState = false
					}
					this.setTaskRoleList(res.role)
				}, err => {
					console.log(err)
				});
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
				console.log("当前权限")
				console.log(myJurisdiction)
			},
			
			
			//页数变更
			getTaskOutsourcingChangeSize(val){
				this.currentPageSize = val
				this.getcurrentTapTaskOutsourcing()
			},
			//当前页变更
			getTaskOutsourcingChangePage(val){
				this.currentPage = val
				this.getcurrentTapTaskOutsourcing()
			},
			//获取当前任务外包列表
			getcurrentTapTaskOutsourcing(){
				switch (this.currentTapType){
					case "going":
						this.currentTap = "进行中"
						this.getTaskOutsourcing()
						break;
					case "history":
						this.currentTap = "历史记录"
						this.getTaskOutsourcingHistory()
						break;
				}
			},
			getTaskOutsourcingHistory() {
				let data = {
					prtask_id: this.taskId,
					length: this.currentPageSize,
					position:this.currentPageSize*(this.currentPage-1)
				}
				this.$PRAPI.prtaskOutsourcing.GetOutgoingRecord(data).then(res => {
					console.log("外发信息")
					console.log(res)
					this.taskOutgoingCount = parseInt(res.count);
					this.taskOutgoingData = res.data;
					// this.setTask(res)
				}, err => {
					console.log(err)
				});
			},
			//获取外发信息
			getTaskOutsourcing() {
				let data = {
					prtask_id: this.taskId,
					length: this.currentPageSize,
					position:this.currentPageSize*(this.currentPage-1)
				}
				this.$PRAPI.prtaskOutsourcing.GetOutgoing(data).then(res => {
					console.log("外发信息")
					console.log(res)
					this.taskOutgoingCount = parseInt(res.count);
					this.taskOutgoingData = res.data;
					// this.setTask(res)
				}, err => {
					console.log(err)
				});
			},
			openSelectCompanyBox(){
				this.getCompany();
				this.selectCompanyBox = true;
			},
			closeSelectCompanyBox(){
				this.selectCompanyBox = false;
			},
			// 获取外包公司列表
			getCompany(){
				var data = {
					vicecompany : this.$store.state.userInfo.companyid
				};
				this.$PRAPI.company.GetParentCompany(data).then(res => {
					this.companyList = res;
					// console.log("公司列表")
					// console.log(res)
				}, err => {
					console.log(err);
				});
			},
			// 提交添加
			submitCompany(){
				// console.log(this.currentCompany)
				if(this.currentCompany!=""){
					var data = {
						project_id:this.taskData.project_id,
						prtask_id:this.taskData.id,
						company_id:this.currentCompany,
					}
					this.$PRAPI.prtaskOutsourcing.AddprOutsourcing(data).then(res => {
						// console.log("公司列表")
						// console.log(res)
						this.closeSelectCompanyBox();
						this.getcurrentTapTaskOutsourcing();
					}, err => {
						console.log(err);
					});
					
				}else{
					this.$notify({
						type: 'info',
						message: '请选择外包公司',
						position: 'bottom-right'
					});
				}
				
			},
			changeStateBtn(data,el){
				// console.log(data)
				// console.log(el)
				this.changeStateShowBox = false
				this.currentData = data;
				
				var currentX = el.x-75;
				var currentY = el.y-15;
				
				this.changeStateShowBoxStyle = "left:"+currentX+"px;top:"+currentY+"px";
				// console.log(this.changeStateShowBoxStyle)
				this.currentState = data.state
				this.$nextTick(()=>{
					this.$refs.changeStateBox.focus()
				})
				
				// console.log(this.$refs)
			},
			closeChangeStateShowBox(){
				this.changeStateShowBox = true
			},
			selectChangeState(){
				// console.log(this.currentState)
				if(this.currentData.state!=this.currentState){
					//发送更改状态请求
					var data = {
						id:this.currentData.id,
						state:this.currentState,
					}
					this.$PRAPI.prtaskOutsourcing.UpdState(data).then(res => {
						this.currentData.state = this.currentState
					}, err => {
						console.log(err);
					});
					
					
				}else{
					this.$notify({
						type: 'info',
						message: '状态一致',
						position: 'bottom-right'
					});
				}
			},
			//更改外包状态
			taskOutgoingStateChange(){
				console.log(this.taskOutgoingState)
				console.log(this.currentUserJurisdiction)
				if(!this.currentUserJurisdiction.taskProjectOutsourcingCtr){
					this.$TGYC.sendErr("您没有权限！！！");
					if(this.taskData.outsourcing){
						this.taskOutgoingState = true
					}else{
						this.taskOutgoingState = false
					}
					return false
				};
				
				var stateCode = "0";
				if(this.taskOutgoingState){
					stateCode = "1";
				}
				//发送更改状态请求
				var data = {
					id:this.taskData.id,
					outsourcing:stateCode,
				}
				this.$PRAPI.prtask.UpdOutsourcing(data).then(res => {
					
				}, err => {
					console.log(err);
				});
				
			},
			//页面内容切换
			selectTapChange(command){
				this.currentTapType = command;
				this.getcurrentTapTaskOutsourcing();
			}
			
		}
	}
</script>