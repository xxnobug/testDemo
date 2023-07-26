<template>
	<div>
		<el-row >
			<el-col :span="24" class="taskBox" @contextmenu.prevent.native="taskMenu($event)">
				<div class="taskDataBox">
					<div class="taskName">
						<div v-if="!taskNumberEditer" @dblclick="openTaskNumberEditer">
							任务编号：{{taskData.name}}
						</div>
						<div class="taskEditer" v-if="taskNumberEditer">
							<el-input ref="taskNumber" size="small" v-model="taskData.name" placeholder="编号" type="text" @blur="closeTaskNumberEditer" @keyup.enter.native="$event.target.blur"></el-input>
						</div>
					</div>
					<div class="taskTxt">
						<!-- <div v-if="!taskChineseNameEditer"  @dblclick="openTaskChineseNameEditer">
							中文名：{{taskData.chinese_name}}
						</div>
						<div class="taskEditer" v-if="taskChineseNameEditer">
							<el-input ref="taskChineseName" size="small" v-model="taskData.chinese_name" type="text" placeholder="请输入中文名" @blur="closeTaskChineseNameEditer" @keyup.enter.native="$event.target.blur"></el-input>
						</div> -->
						工程信息：{{taskFileData.personnel_name}}（{{$TGYC.stampToDateMD(taskFileData.time)}}）
					</div>
					<!-- <div class="taskTxt">
						<div v-if="!taskTimeLenEditer"  @dblclick="openTaskTimeLenEditer">
							时长：{{taskData.time_len}}
						</div>
						<div class="taskEditer" v-if="taskTimeLenEditer">
							<el-input ref="taskTimeLen" size="small" v-model="taskData.time_len" type="text" placeholder="请输入时长" @blur="closeTaskTimeLenEditer" @keyup.enter.native="$event.target.blur"></el-input>
						</div>
					</div> -->
					<div class="taskTxt">
						<div class="taskTxtContent" v-if="!taskRoleListEditer"  @dblclick="openTaskRoleListEditer">
							负责角色：{{$TGYC.setTaskRoleName(taskData.role)}}
						</div>
						<div class="taskEditerS" v-if="taskRoleListEditer">
							<el-select 
								size="mini" 
								v-model="taskData.role_id"
								@visible-change="closetaskRoleListEditer"
								multiple
								collapse-tags
								placeholder="请选择">
								<el-option
								      v-for="item in prRoleList"
								      :key="item.id"
								      :label="item.name"
								      :value="item.id">
								    </el-option>
							</el-select>
						</div>
					</div> 
					<!-- <div class="taskTxt">
						工程信息：{{taskFileData.personnel_name}}（{{$TGYC.stampToDateMD(taskFileData.time)}}）
					</div> -->
					<!-- <div class="taskState" id="taskState" @contextmenu.prevent="taskStateMenu($event)" :style="'color:'+$TGYC.setTaskStateColor(taskData.state)">{{$TGYC.setTaskStateName(taskData.state)}}</div> -->
					<!-- 图标功能区 -->
					<!-- <div class="taskFucBox">
						<div class="taskFucBtn">
							<el-tooltip class="item" effect="dark" content="新命名上传" placement="bottom">
								<i class="el-icon-document" @click="uploadfileNew"></i>
							</el-tooltip>
						</div>
						<div class="taskFucBtn">
							<el-tooltip class="item" effect="dark" content="新模板下载" placement="bottom">
								<i class="el-icon-bottom" @click="downCopyNewModel"></i>
							</el-tooltip>
						</div>
						<div class="taskFucBtn">
							<el-tooltip class="item" effect="dark" content="旧命名上传" placement="bottom">
								<i class="el-icon-document-copy" @click="uploadfile"></i>
							</el-tooltip>
						</div>
						<div class="taskFucBtn">
							<el-tooltip class="item" effect="dark" content="旧模板下载" placement="bottom">
								<i class="el-icon-download" @click="downCopyModel"></i>
							</el-tooltip>
						</div>
						
						
						
					</div> -->
				</div>
				<div class="taskThum" @dblclick="upTaskThum">
					<img :src="$ASSETBASEURL + taskData.thum" />
					<div class="taskUploadProGress">
						<div v-if="taskUpload" class="taskUploadProGressBg"></div>
						<div v-if="taskUpload" class="taskUploadProGressCon" >
							<el-progress type="circle" :percentage="taskUploadPrss" stroke-width="8"  width="60"></el-progress>
						</div>
					</div>
					<el-popover v-if="taskData.lock_state=='1'" placement="top-start" width="200" trigger="hover" >
						<el-col>
							锁定人:{{taskData.lock_name}}
						</el-col>
						<el-col>
							锁定时间:{{$TGYC.stampToDateMD(taskData.lock_time)}}
						</el-col>
					    <el-button v-if="taskData.lock_state=='1'" slot="reference" class="tasklockBox" icon="el-icon-lock"></el-button>
					</el-popover>
				</div>
			</el-col>
			<el-col :span="24" class="taskStatisticalBox">
				
				<el-col :span="24" class="taskContentBtns">
					<el-col class="tastProjectBtnList">
						<div class="tastProjectBtn" @click="openProject">
							<el-tooltip class="item" effect="dark" content="重载工程" placement="bottom">
								<img src="../../../assets/img/projectBtn1.png" />
							</el-tooltip>
						</div>
					</el-col>
					<el-col class="tastProjectBtnList" >
						<div class="tastProjectBtn" @click="openProjectVersionBox">
							<el-tooltip class="item" effect="dark" content="上传工程" placement="bottom">
								<img src="../../../assets/img/projectBtn2.png" />
							</el-tooltip>
						</div>
					</el-col>
					<el-col class="tastProjectBtnList">
						<div class="tastProjectBtn" @click="downProjectFile">
							<el-tooltip class="item" effect="dark" content="下载工程" placement="bottom">
								<img src="../../../assets/img/projectBtn3.png" />
							</el-tooltip>
						</div>
					</el-col>
					<el-col class="tastProjectBtnList">
						<div v-if="taskData.lock_state=='0'" class="tastProjectBtn" @click="setLockTask">
							<el-tooltip class="item" effect="dark" content="锁定工程" placement="bottom">
								<img  src="../../../assets/img/projectBtn4s.png" />
							</el-tooltip>
						</div>
						<div v-if="taskData.lock_state=='1'" class="tastProjectBtn" @click="setUnLockTask">
							<el-tooltip class="item" effect="dark" content="解锁工程" placement="bottom">
								<img  src="../../../assets/img/projectBtn4.png" />
							</el-tooltip>
						</div>
					</el-col>
					<el-col class="tastProjectBtnList">
						<div class="tastProjectBtn" @click="openWinDir">
							<el-tooltip class="item" effect="dark" content="在资源管理器中打开" placement="bottom">
								<img src="../../../assets/img/projectBtn5.png" />
							</el-tooltip>
						</div>
					</el-col>
					<el-col class="tastProjectBtnList">
						<div class="tastProjectBtn" @click="setResRelation">
							<el-tooltip class="item" effect="dark" content="任务关联" placement="bottom">
								<img src="../../../assets/img/projectBtn6.png" />
							</el-tooltip>
						</div>
					</el-col>
					<el-col class="tastProjectBtnList">
						<div class="tastProjectBtn" @click="clearJumpClips">
							<el-tooltip class="item" effect="dark" content="清理跳过剪辑" placement="bottom">
								<img src="../../../assets/img/projectBtn11.png" />
							</el-tooltip>
						</div>
					</el-col>
					<el-col class="tastProjectBtnList">
						<div class="tastProjectBtn" @click="openProjectTaskHistory">
							<el-tooltip class="item" effect="dark" content="工程历史" placement="bottom">
								<img src="../../../assets/img/projectBtn7.png" />
							</el-tooltip>
						</div>
					</el-col>

					<el-col class="tastProjectBtnList">
						<div class="tastProjectBtn" @click="openProjectTaskOutsourcing">
							<el-tooltip class="item" effect="dark" content="工程外发管理" placement="bottom">
								<img src="../../../assets/img/projectBtn13.png" />
							</el-tooltip>
						</div>
					</el-col>

					<el-col class="tastProjectBtnList">
						<div class="tastProjectBtn" @click="setLayoutTask">
							<el-tooltip class="item" effect="dark" content="layout关联任务" placement="bottom">
								<img src="../../../assets/img/projectBtn12.png" />
							</el-tooltip>
						</div>
					</el-col>
					
					<!-- <el-col class="tastProjectBtnList">
						<div class="tastProjectBtn" @click="setResName">
							<el-tooltip class="item" effect="dark" content="更换节点" placement="bottom">
								<img src="../../../assets/img/projectBtn10.png" />
							</el-tooltip>
						</div>
					</el-col> -->
					
					<el-col class="tastProjectBtnList">
						<div class="tastProjectBtn" @click="myInit">
							<el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
								<img src="../../../assets/img/projectBtn8.png" />
							</el-tooltip>
						</div>
					</el-col>
					
				</el-col>
				
				<el-col :span="24" class="taskStatisticalContent" >
					<el-col :span="6" class="taskStatisticalList" @contextmenu.prevent.native="taskResourcesMenu4($event)">
						
						<div class="taskStatisticalNum taskStatisticalNumErr">
							{{taskResStatistical.localDifferencesNum}}
						</div>
						<div class="taskStatisticalLabel">
							待上传
						</div>
						<div class="taskStatisticalListLine"></div>
					</el-col>
					<el-col :span="6" class="taskStatisticalList" @contextmenu.prevent.native="taskResourcesMenu($event)">
						
						<div class="taskStatisticalNum taskStatisticalNumErr">
							{{taskResStatistical.differencesNum}}
						</div>
						<div class="taskStatisticalLabel">
							待更新
						</div>
						<div class="taskStatisticalListLine"></div>
					</el-col>
					<el-col :span="6" class="taskStatisticalList" @contextmenu.prevent.native="taskResourcesMenu2($event)">
						<div class="taskStatisticalNum taskStatisticalNumErr">
							{{taskResStatistical.offlineNum}}
						</div>
						<div class="taskStatisticalLabel">
							脱机
						</div>
						<div class="taskStatisticalListLine"></div>
					</el-col>
					<el-col :span="6" class="taskStatisticalList" @contextmenu.prevent.native="taskResourcesMenu3($event)">
						<!-- 上传
						检测 -->
						<div class="taskStatisticalNum taskStatisticalNumErr">
							{{taskResStatistical.newFileNum}}
						</div>
						<div class="taskStatisticalLabel">
							新文件
						</div>
					</el-col>
				</el-col>
			</el-col>
			
			<el-col :span="24" class="taskContentFcBtns">
				<el-col :span="12">
					<div class="taskContentFcTitle">
						复制轨道（新命名）:
					</div>
					<div class="taskContentFcBtnList">
						<div class="taskContentFcBtnBox">
							<div class="taskContentFcBtn" @click="uploadfileNew">
								<el-tooltip class="item" effect="dark" content="上传数据" placement="bottom">
									<img src="../../../assets/img/projectBtn9.png" />
								</el-tooltip>
							</div>
						</div>
						<div class="taskContentFcBtnBox">
							<div class="taskContentFcBtn" @click="downCopyNewModel">
								<el-tooltip class="item" effect="dark" content="下载模板" placement="bottom">
									<img src="../../../assets/img/projectBtn3.png" />
								</el-tooltip>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="taskContentFcTitle">
						复制轨道（旧命名）:
					</div>
					<div class="taskContentFcBtnList">
						<div class="taskContentFcBtnBox">
							<div class="taskContentFcBtn" @click="uploadfile">
								<el-tooltip class="item" effect="dark" content="上传数据" placement="bottom">
									<img src="../../../assets/img/projectBtn9.png" />
								</el-tooltip>
							</div>
						</div>
						<div class="taskContentFcBtnBox">
							<div class="taskContentFcBtn" @click="downCopyModel">
								<el-tooltip class="item" effect="dark" content="下载模板" placement="bottom">
									<img src="../../../assets/img/projectBtn3.png" />
								</el-tooltip>
							</div>
						</div>
					</div>
				</el-col>
				
				<el-col :span="12">
					<div class="taskContentFcTitle">
						文件重命名:
					</div>
					<div class="taskContentFcBtnList">
						<div class="taskContentFcBtnBox">
							<div class="taskContentFcBtn" @click="setResName">
								<el-tooltip class="item" effect="dark" content="上传数据" placement="bottom">
									<img src="../../../assets/img/projectBtn9.png" />
								</el-tooltip>
							</div>
						</div>
						<div class="taskContentFcBtnBox">
							<div class="taskContentFcBtn" @click="downCopyReNameModel">
								<el-tooltip class="item" effect="dark" content="下载模板" placement="bottom">
									<img src="../../../assets/img/projectBtn3.png" />
								</el-tooltip>
							</div>
						</div>
					</div>
				</el-col>
				
			</el-col>
			
			<!-- <el-col :span="24" class="taskTabsBox">
				
				
				<el-tabs v-model="taskTabCurrent" @contextmenu.prevent.native="taskListBoxMenu($event)">
				    
					
					<el-tab-pane :label="'制作中('+myProductionCount+')'" name="myProduction">
						<el-col :span="24" class="taskAuditBox">
							<el-col :span="24" :style="taskAuditHeight">
								<el-scrollbar style="height: 100%;">
									
									
									<el-col :span="24" class="taskAuditList" :data-path="item.local_url + '/' + item.local_name"  v-for="item in myProductionData">
										<el-col :span="15" class="taskAssetsNumbel">
											<span class="taskAssetsSelect">
												<el-checkbox v-model="item.isselcted" size="small" ></el-checkbox>
											</span>
											<span  @click="openTaskResources(item.prresources_id)" class="taskAssetsBox">
												<div class="taskAssetsColor" :style="'background-color:'+item.color"></div>
												{{item.local_name}}    [{{item.local_url}}]
											</span>
										</el-col>
										<el-col :span="6" class="taskUploadUser">
											
											{{item.outsourcing==0||item.outsourcing=="null" ? item.personnel_name : item.company_name}}
											<span class="taskUploadTime">{{$TGYC.stampToDateMD(item.time)}}</span>
											
										</el-col>	
										<el-col :span="3" class="taskOperation">
											<i class="el-icon-bottom-right" @click="getResClipsPosition(item)"></i>
											<i class="el-icon-refresh-right" @click="getResClipsPositionRange(item)"></i>
										</el-col>
									</el-col>
									
									
								</el-scrollbar>
							</el-col>
							<el-col class="taskDetailePage">
								<el-pagination
								    :current-page.sync="myProductionPage"
								    :page-size="myProductionPageSize"
								    layout="prev, pager, next"
								    :total="myProductionCount"
									@size-change = 'getMyProduction'
									@current-change = 'getMyProduction'
									>
								</el-pagination>
							</el-col>
						</el-col>
				    </el-tab-pane>
					
					
					<el-tab-pane :label="'我驳回的('+myRejectCount+')'" name="myreject">
						<el-col :span="24" class="taskAuditBox">
							<el-col :span="24" :style="taskAuditHeight">
								<el-scrollbar style="height: 100%;">
									
									
									<el-col :span="24" class="taskAuditList" :data-path="item.local_url + '/' + item.local_name"  v-for="item in myRejectData">
										<el-col :span="15" class="taskAssetsNumbel">
											<span class="taskAssetsSelect">
												<el-checkbox v-model="item.isselcted" size="small" ></el-checkbox>
											</span>
											<span  @click="openTaskResources(item.prresources_id)" class="taskAssetsBox">
												<div class="taskAssetsColor" :style="'background-color:'+item.color"></div>
												{{item.local_name}}    [{{item.local_url}}]
											</span>
										</el-col>
										<el-col :span="6" class="taskUploadUser">
											
											{{item.outsourcing==0||item.outsourcing=="null" ? item.personnel_name : item.company_name}}
											<span class="taskUploadTime">{{$TGYC.stampToDateMD(item.time)}}</span>
											
										</el-col>	
										<el-col :span="3" class="taskOperation">
											<i class="el-icon-bottom-right" @click="getResClipsPosition(item)"></i>
											<i class="el-icon-refresh-right" @click="getResClipsPositionRange(item)"></i>
										</el-col>
									</el-col>
									
									
								</el-scrollbar>
							</el-col>
							<el-col class="taskDetailePage">
								<el-pagination
								    :current-page.sync="myRejectPage"
								    :page-size="myRejectPageSize"
								    layout="prev, pager, next"
								    :total="myRejectCount"
									@size-change = 'getMyReject'
									@current-change = 'getMyReject'
									>
								</el-pagination>
							</el-col>
						</el-col>
					</el-tab-pane>
					
					
					
				    <el-tab-pane :label="'我的返修('+myRepairCount+')'" name="myRepair">
						<el-col :span="24" class="taskAuditBox">
							<el-col :span="24" :style="taskAuditHeight">
								<el-scrollbar style="height: 100%;">
									
									
									<el-col :span="24" class="taskAuditList" :data-path="item.local_url + '/' + item.local_name" v-for="item in myRepairData">
										<el-col :span="15" class="taskAssetsNumbel">
											<span class="taskAssetsSelect">
												<el-checkbox v-model="item.isselcted" size="small" ></el-checkbox>
											</span>
											<span  @click="openTaskResources(item.prresources_id)" class="taskAssetsBox">
												<div class="taskAssetsColor" :style="'background-color:'+item.color"></div>
												{{item.local_name}}    [{{item.local_url}}]
											</span>
										</el-col>
										<el-col :span="6" class="taskUploadUser">
											{{item.outsourcing==0||item.outsourcing=="null" ? item.personnel_name : item.company_name}}
											<span class="taskUploadTime">{{$TGYC.stampToDateMD(item.time)}}</span>
										</el-col>	
										<el-col :span="3" class="taskOperation">
											<i class="el-icon-bottom-right" @click="getResClipsPosition(item)"></i>
											<i class="el-icon-refresh-right" @click="getResClipsPositionRange(item)"></i>
										</el-col>
									</el-col>
									
									
								</el-scrollbar>
							</el-col>
							<el-col class="taskDetailePage">
								<el-pagination
								    :current-page.sync="myRepairPage"
								    :page-size="myRepairPageSize"
								    layout="prev, pager, next"
								    :total="myRepairCount"
									@size-change = 'getMyRepair'
									@current-change = 'getMyRepair'
									>
								</el-pagination>
							</el-col>
						</el-col>
				    </el-tab-pane>
				    <el-tab-pane :label="'已提审('+myAuditCount+')'" name="myAudit">
						<el-col :span="24" class="taskAuditBox">
							<el-col :span="24" :style="taskAuditHeight">
								<el-scrollbar style="height: 100%;">
									
									
									<el-col :span="24" class="taskAuditList" :data-path="item.local_url + '/' + item.local_name" v-for="item in myAuditData">
										<el-col :span="15" class="taskAssetsNumbel">
											<span class="taskAssetsSelect">
												<el-checkbox v-model="item.isselcted" size="small" ></el-checkbox>
											</span>
											<span  @click="openTaskResources(item.prresources_id)" class="taskAssetsBox">
												<div class="taskAssetsColor" :style="'background-color:'+item.color"></div>
												{{item.local_name}}    [{{item.local_url}}]
											</span>
										</el-col>
										<el-col :span="6" class="taskUploadUser">
											{{item.outsourcing==0||item.outsourcing=="null" ? item.personnel_name : item.company_name}}
											<span class="taskUploadTime">{{$TGYC.stampToDateMD(item.time)}}</span>
										</el-col>	
										<el-col :span="3" class="taskOperation">
											<i class="el-icon-bottom-right" @click="getResClipsPosition(item)"></i>
											<i class="el-icon-refresh-right" @click="getResClipsPositionRange(item)"></i>
										</el-col>
									</el-col>
									
									
								</el-scrollbar>
							</el-col>
							<el-col class="taskDetailePage">
								<el-pagination
								    :current-page.sync="myAuditPage"
								    :page-size="myAuditPageSize"
								    layout="prev, pager, next"
								    :total="myAuditCount"
									@size-change = 'getMyAudit'
									@current-change = 'getMyAudit'
									>
								</el-pagination>
							</el-col>
						</el-col>
				    </el-tab-pane>
					
					<el-tab-pane :label="'已通过('+myCompleteCount+')'" name="myComplete">
						<el-col :span="24" class="taskAuditBox">
							<el-col :span="24" :style="taskAuditHeight">
								<el-scrollbar style="height: 100%;">
									
									
									<el-col :span="24" class="taskAuditList" :data-path="item.local_url + '/' + item.local_name" v-for="item in myCompleteData">
										<el-col :span="15" class="taskAssetsNumbel">
											<span class="taskAssetsSelect">
												<el-checkbox v-model="item.isselcted" size="small" ></el-checkbox>
											</span>
											<span  @click="openTaskResources(item.prresources_id)" class="taskAssetsBox">
												<div class="taskAssetsColor" :style="'background-color:'+item.color"></div>
												{{item.local_name}}    [{{item.local_url}}]
											</span>
										</el-col>
										<el-col :span="6" class="taskUploadUser">
											{{item.outsourcing==0||item.outsourcing=="null" ? item.personnel_name : item.company_name}}
											<span class="taskUploadTime">{{$TGYC.stampToDateMD(item.time)}}</span>
										</el-col>	
										<el-col :span="3" class="taskOperation">
											<i class="el-icon-bottom-right" @click="getResClipsPosition(item)"></i>
											<i class="el-icon-refresh-right" @click="getResClipsPositionRange(item)"></i>
										</el-col>
									</el-col>
									
									
								</el-scrollbar>
							</el-col>
							<el-col class="taskDetailePage">
								<el-pagination
								    :current-page.sync="myCompletePage"
								    :page-size="myCompletePageSize"
								    layout="prev, pager, next"
								    :total="myCompleteCount"
									@size-change = 'getMyComplete'
									@current-change = 'getMyComplete'
									>
								</el-pagination>
							</el-col>
						</el-col>
					</el-tab-pane>
					
					
				    <el-tab-pane :label="'工程制作中('+ProductionCount+')'" name="Production">
				   		<el-col :span="24" class="taskAuditBox">
				   			<el-col :span="24" :style="taskAuditHeight">
				   				<el-scrollbar style="height: 100%;">
				   					
				   					
				   					<el-col :span="24" class="taskAuditList" :data-path="item.local_url + '/' + item.local_name" v-for="item in ProductionData">
				   						<el-col :span="15" class="taskAssetsNumbel">
				   							<span class="taskAssetsSelect">
				   								<el-checkbox v-model="item.isselcted" size="small" ></el-checkbox>
				   							</span>
				   							<span  @click="openTaskResources(item.prresources_id)" class="taskAssetsBox">
												<div class="taskAssetsColor" :style="'background-color:'+item.color"></div>
				   								{{item.local_name}}    [{{item.local_url}}]
				   							</span>
				   						</el-col>
				   						<el-col :span="6" class="taskUploadUser">
				   							{{item.outsourcing==0||item.outsourcing=="null" ? item.personnel_name : item.company_name}}
				   							<span class="taskUploadTime">{{$TGYC.stampToDateMD(item.time)}}</span>
				   						</el-col>	
				   						<el-col :span="3" class="taskOperation">
				   							<i class="el-icon-bottom-right" @click="getResClipsPosition(item)"></i>
											<i class="el-icon-refresh-right" @click="getResClipsPositionRange(item)"></i>
				   						</el-col>
				   					</el-col>
				   					
				   					
				   				</el-scrollbar>
				   			</el-col>
				   			<el-col class="taskDetailePage">
				   				<el-pagination
				   				    :current-page.sync="ProductionPage"
				   				    :page-size="ProductionPageSize"
				   				    layout="prev, pager, next"
				   				    :total="ProductionCount"
				   					@size-change = 'getProduction'
				   					@current-change = 'getProduction'
				   					>
				   				</el-pagination>
				   			</el-col>
				   		</el-col>
				    </el-tab-pane>
					<el-tab-pane :label="'工程待审核('+auditCount+')'" name="audit">
						<el-col :span="24" class="taskAuditBox">
							<el-col :span="24" :style="taskAuditHeight">
								<el-scrollbar style="height: 100%;">
									
									
									<el-col :span="24" class="taskAuditList" :data-path="item.local_url + '/' + item.local_name" v-for="item in auditData">
										<el-col :span="15" class="taskAssetsNumbel">
											<span class="taskAssetsSelect">
												<el-checkbox v-model="item.isselcted" size="small" ></el-checkbox>
											</span>
											<span  @click="openTaskResources(item.prresources_id)" class="taskAssetsBox">
												<div class="taskAssetsColor" :style="'background-color:'+item.color"></div>
												{{item.local_name}}    [{{item.local_url}}]
											</span>
										</el-col>
										<el-col :span="6" class="taskUploadUser">
											{{item.outsourcing==0||item.outsourcing=="null" ? item.personnel_name : item.company_name}}
											<span class="taskUploadTime">{{$TGYC.stampToDateMD(item.time)}}</span>
										</el-col>	
										<el-col :span="3" class="taskOperation">
											<i class="el-icon-bottom-right" @click="getResClipsPosition(item)"></i>
											<i class="el-icon-refresh-right" @click="getResClipsPositionRange(item)"></i>
										</el-col>
									</el-col>
									
									
								</el-scrollbar>
							</el-col>
							<el-col class="taskDetailePage">
								<el-pagination
								    :current-page.sync="auditPage"
								    :page-size="auditPageSize"
								    layout="prev, pager, next"
								    :total="auditCount"
									@size-change = 'getToAudit'
									@current-change = 'getToAudit'
									>
								</el-pagination>
							</el-col>
						</el-col>
					</el-tab-pane>
				    <el-tab-pane :label="'工程返修中('+repairCount+')'" name="repair">
						<el-col :span="24" class="taskAuditBox">
							<el-col :span="24" :style="taskAuditHeight">
								<el-scrollbar style="height: 100%;">
									
									<el-col :span="24" class="taskAuditList" :data-path="item.local_url + '/' + item.local_name" v-for="item in repairData">
										<el-col :span="15" class="taskAssetsNumbel">
											<span class="taskAssetsSelect">
												<el-checkbox v-model="item.isselcted" size="small"></el-checkbox>
											</span>
											<span  @click="openTaskResources(item.prresources_id)" class="taskAssetsBox">
												<div class="taskAssetsColor" :style="'background-color:'+item.color"></div>
												{{item.local_name}}    [{{item.local_url}}]
											</span>
										</el-col>
										<el-col :span="6" class="taskUploadUser">
											{{item.outsourcing==0||item.outsourcing=="null" ? item.personnel_name : item.company_name}}
											<span class="taskUploadTime">{{$TGYC.stampToDateMD(item.time)}}</span>
										</el-col>	
										<el-col :span="3" class="taskOperation">
											<i class="el-icon-bottom-right" @click="getResClipsPosition(item)"></i>
											<i class="el-icon-refresh-right" @click="getResClipsPositionRange(item)"></i>
										</el-col>
									</el-col>
						
								

								</el-scrollbar>
							</el-col>
							<el-col class="taskDetailePage">
								<el-pagination
								    :current-page.sync="repairPage"
								    :page-size="repairPageSize"
								    layout="prev, pager, next"
								    :total="repairCount"
									@size-change = 'getRepair'
									@current-change = 'getRepair'
									>
								</el-pagination>
							</el-col>
						</el-col>
					</el-tab-pane>
					
					<el-tab-pane :label="'工程已完成('+completeCount+')'" name="complete">
						<el-col :span="24" class="taskAuditBox">
							<el-col :span="24" :style="taskAuditHeight">
								<el-scrollbar style="height: 100%;">
									
									<el-col :span="24" class="taskAuditList" :data-path="item.local_url + '/' + item.local_name" v-for="item in completeData">
										<el-col :span="15" class="taskAssetsNumbel">
											<span class="taskAssetsSelect">
												<el-checkbox v-model="item.isselcted" size="small"></el-checkbox>
											</span>
											<span  @click="openTaskResources(item.prresources_id)" class="taskAssetsBox">
												<div class="taskAssetsColor" :style="'background-color:'+item.color"></div>
												{{item.local_name}}    [{{item.local_url}}]
											</span>
										</el-col>
										<el-col :span="6" class="taskUploadUser">
											{{item.outsourcing==0||item.outsourcing=="null" ? item.personnel_name : item.company_name}}
											<span class="taskUploadTime">{{$TGYC.stampToDateMD(item.time)}}</span>
										</el-col>	
										<el-col :span="3" class="taskOperation">
											<i class="el-icon-bottom-right" @click="getResClipsPosition(item)"></i>
											<i class="el-icon-refresh-right" @click="getResClipsPositionRange(item)"></i>
										</el-col>
									</el-col>
					
								</el-scrollbar>
							</el-col>
							<el-col class="taskDetailePage">
								<el-pagination
								    :current-page.sync="completePage"
								    :page-size="completePageSize"
								    layout="prev, pager, next"
								    :total="completeCount"
									@size-change = 'getComplete'
									@current-change = 'getComplete'
									>
								</el-pagination>
							</el-col>
						</el-col>
					</el-tab-pane>
					
					
				</el-tabs>
				
				
			</el-col> -->
		</el-row>
		
		
		
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
							当前制作人：{{item.outsourcing=="0"?item.personnel_name:item.company_name}}
						</el-col>
						<el-col :span="24" class="fileDialogUser">
							最新文件：{{item.pre_outsourcing=="0"?item.pre_personnel_name:item.pre_company_name}}  <span class="fileDialogTime">{{$TGYC.stampToDateMD(item.time)}}</span>
						</el-col>
					</el-col>
				</el-scrollbar>
			</el-row>
		</el-dialog>
		
		
		
		
		
		<ImgCropper ref="imgCropper" @imgChange="setTaskImg"></ImgCropper>
		
		<!-- 选择资源负责人 -->
		<el-dialog title="选择负责人" :visible.sync="newResPersonnelBox" width="80%">
			<el-row>
				<el-col :span="24" class="makeTypeBox">
					<el-radio v-model="makeType" label="0">员工</el-radio>
					<el-radio v-model="makeType" label="1">外发</el-radio>
					<el-radio v-model="makeType" label="2">设为公共资源</el-radio>
					<el-radio v-model="makeType" label="3">取消公共资源</el-radio>
				</el-col>
				
				<el-col :span="24" >
					<div class="newFeedBackContent" >
						<div class="newPersonnelContent" v-if="makeType=='0'">
							<el-select size="mini" v-model="selectPersonnel" filterable placeholder="请选择人员">
								 <el-option
								   v-for="item in personnelList"
								   :key="item.id"
								   :label="item.name"
								   :value="item.id">
								 </el-option>
							</el-select>
						</div>
						<div class="newPersonnelContent" v-else-if="makeType=='1'">
							<el-select size="mini" v-model="selectCompany" filterable placeholder="请选择外包公司">
								 <el-option
								   v-for="item in companylList"
								   :key="item.id"
								   :label="item.name"
								   :value="item.id">
								 </el-option>
							</el-select>
						</div>
					</div>
					<div class="newFeedBackContentBtn">
						<el-button class="newFeedBackContentBtnMargin" size="mini" @click="submitResPersonnel">提交</el-button>
						<el-button class="newFeedBackContentBtnMargin" size="mini" @click="closeResPersonnel">取消</el-button>
					</div>
				</el-col>
			</el-row>
		</el-dialog>
		
		
		<!-- 选择文件列表 -->
		<el-dialog title="文件列表" :visible.sync="choiceFileListBox" width="80%">
			<el-row :style="dialogTextBoxHeigth">
				<el-scrollbar style="height: 100%;">
					
					<el-col :span="24" v-for="item in choiceFileListData" class="fileDialogTextBox" :key="item.local_name">
						<div class="resTaskListContent">
							<div class="resTaskListName">
								<span class="taskAssetsSelect">
									<el-checkbox v-model="item.isselcted" size="small"></el-checkbox>
								</span>
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
										未匹配到任务
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
						
					</el-col>
					
				</el-scrollbar>
				
			</el-row>
			<div class="newFeedBackContentBtn">
				<el-button class="newFeedBackContentBtnMargin" size="mini" @click="submitChoiceFile">提交</el-button>
				<el-button class="newFeedBackContentBtnMargin" size="mini" @click="closeChoiceFile">取消</el-button>
			</div>
		</el-dialog>
		
		
		<!-- 填写工程版本描述 -->
		<el-dialog title="版本描述" :visible.sync="projectVersionBox" width="80%">
			<el-row :style="dialogTextBoxHeigth">
				<el-scrollbar style="height: 100%;">
					<el-input type="textarea" :rows="8" v-model="projectVersionIntroduction"></el-input>
				</el-scrollbar>
			</el-row>
			<div class="newFeedBackContentBtn">
				<el-button class="newFeedBackContentBtnMargin" size="mini" @click="submitProjectVersion">提交</el-button>
				<el-button class="newFeedBackContentBtnMargin" size="mini" @click="clearProjectVersion">取消</el-button>
			</div>
		</el-dialog>		

		<!-- 上传表格统计信息 -->
		<el-dialog title="文件校验" :visible.sync="xlsxDataShowBox" width="80%">
			<el-row :style="dialogTextBoxHeigth">
				<el-scrollbar style="height: 100%;">
					<el-col :span="24" v-for="item in xlsxErrArr" class="fileXlsxBox" @contextmenu.prevent.native="xlsxErrArrMenu(item.start.ticks,$event)">
						<el-col :span="24" class="fileDialogName">
							{{item.path}}
						</el-col>
						<el-col :span="24" class="fileDialogUser">
							轨道位置：{{$TGYC.timeToFormatTime(item.start.seconds)}}
						</el-col>
						<div v-if="!item.isIn" class="fileErr" >
							轨道冲突
						</div>
					</el-col>
					<el-col :span="24" v-for="item in xlsxData" class="fileXlsxBox" >
						<el-col :span="24" class="fileDialogName">
							{{item.name}}
						</el-col>
						<el-col :span="24" class="fileDialogUser">
							{{item.path}}
						</el-col>
						<div v-if="!item.isIn" class="fileErr" >
							未找到文件
						</div>
					</el-col>
				</el-scrollbar>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-radio v-model="copyType" label="1">mov</el-radio>
					<el-radio v-model="copyType" label="2">单帧</el-radio>
				</el-col>
			</el-row>
			<div class="newFeedBackContentBtn">
				<div class="fileTip">
					<div class="">
						总数：{{xlsxData.length}}
					</div>
					<div class="">
						轨道冲突：{{xlsxErrArr.length}}
					</div>
				</div>
				<el-button class="newFeedBackContentBtnMargin" size="mini" @click="submitXlsxEdit">确认</el-button>
				<el-button class="newFeedBackContentBtnMargin" size="mini" @click="closeXlsxEdit">取消</el-button>
			</div>
		</el-dialog>	
				
				
		<!-- 新拍屏复制节点选项 -->
		
		<el-dialog title="选择配置项" :visible.sync="selectXlsxCountBox" width="80%">
			
			<el-row>
				<el-col>
					
					
					<el-form label-width="80px">
						<el-form-item label="原节点" prop="name">
							<el-select class="selectXlsxCountList" v-model="currentNode" size="mini" placeholder="请选择" filterable   >
								<el-option
								    v-for="item in taskProjectNodeList"
								    
								    :label="item.name"
								    :value="item.englishname">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="复制到" prop="chinese_name">
							<el-select class="selectXlsxCountList" v-model="selectNewNode"  size="mini" placeholder="请选择" filterable   >
								<el-option
								    v-for="item in taskProjectNodeList"
								    
								    :label="item.name"
								    :value="item.englishname">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="轨道" prop="time_len">
							<el-select class="selectXlsxCountList" v-model="currentTrack" size="mini" placeholder="请选择" filterable  >
								<el-option
								    v-for="item in projectTrackArr"
								    
								    :label="item"
								    :value="item">
								</el-option>
							</el-select>
						</el-form-item>
						
					<!-- 	<el-form-item label="复制类型" prop="time_len">
							<el-radio v-model="copyType" label="1">mov</el-radio>
							<el-radio v-model="copyType" label="2">单帧</el-radio>
						</el-form-item>
						 -->
						
						
					</el-form>
					<el-col class="selectXlsxCountTip">
						复制节点（<span class="selectXlsxCountTipH">{{currentNode}}</span>）到（<span class="selectXlsxCountTipH">{{selectNewNode}}</span>）节点，复制到视频第（<span class="selectXlsxCountTipH">{{currentTrack}}</span>）条轨道上
					</el-col>
						
				</el-col>
			</el-row>
			
			<div class="newFeedBackContentBtn">
				<el-button class="newFeedBackContentBtnMargin" size="mini" @click="submitXlsxCount">确认</el-button>
				<el-button class="newFeedBackContentBtnMargin" size="mini" @click="closeXlsxCountBox">取消</el-button>
			</div>
		</el-dialog>
		

	</div>
</template>
<script>
	import ImgCropper from '@/layout/imgcropper/index.vue'
	import {
		Loading
	} from 'element-ui';
	// import xlsx from 'xlsx'
	var xlsx = window.tgyc.xlsx
	export default {
		name:"任务详情",
		data() {
			return {
				projectId: '',
				taskId: '',
				taskProjectId:"",//任务项目id
				taskIdentifyCode:"",
				wdHeigth: "height:" + (window.innerHeight - 90) + "px",
				dialogTextBoxHeigth: "height:" + (window.innerHeight - 246) + "px",
				taskAuditHeight: "height:" + (window.innerHeight - 325) + "px",
				taskResourcesBox: "min-height:" + (window.innerHeight - 170) + "px",
				taskNumberEditer: false,
				taskChineseNameEditer: false,
				taskTimeLenEditer: false,
				taskRoleListEditer: false,
				taskData: {},
				taskUpload: false,
				taskUploadPrss: 0,
				taskFileData: [],
				taskfileList: [
					// {
					// 	id:'12',
					// 	name:'E02',
					// 	thum:'http://api.gpu365.net/Upload/Uploads/20190910/1568097002.jpeg',
					// }
				],
				prRoleList: [], //pr角色列表
				userRoleData:[],//用户所在权限组
				timer: '',
				uploadPathArr: [],
				uploadLen: 0,
				downtimer: '',
				downrestimer: '',
				resUploadTimer:null,
				taskTabCurrent:'myProduction',
				
				//制作中
				myProductionData:[],
				myProductionPageSize:30,
				myProductionPage:1,
				myProductionCount:0,
				//我驳回的
				myRejectData:[],
				myRejectPageSize:30,
				myRejectPage:1,
				myRejectCount:0,
				//我的返修
				myRepairData:[],
				myRepairPageSize:30,
				myRepairPage:1,
				myRepairCount:0,
				//已提审
				myAuditData:[],
				myAuditPageSize:30,
				myAuditPage:1,
				myAuditCount:0,
				//已完成
				myCompleteData:[],
				myCompletePageSize:30,
				myCompletePage:1,
				myCompleteCount:0,
				//工程制作中
				ProductionData:[],
				ProductionPageSize:30,
				ProductionPage:1,
				ProductionCount:0,
				//工程待审核
				auditData:[],
				auditPageSize:30,
				auditPage:1,
				auditCount:0,
				//工程返修中
				repairData:[],
				repairPageSize:30,
				repairPage:1,
				repairCount:0,
				//工程返修中
				completeData:[],
				completePageSize:30,
				completePage:1,
				completeCount:0,
				//任务统计信息
				taskResStatistical:{
					videoNum:0,
					audioNum:0,
					imageNum:0,
					otherNum:0,
					differencesNum:0,
					offlineNum:0,
					newFileNum:0,
					localDifferencesNum:0
				},
				differencesData:[],
				localDifferencesData:[],
				offlineData:[],
				newFileData:[],
				currentUserJurisdiction:{},//当前用户权限
				fileListBox:false,//文件详情列表弹框
				fileListData:[],//文件详情列表数据
				newResPersonnelBox:false,//选中资源负责人弹框
				makeType:'0',//制作模式
				personnelList:[],//可用人员列表
				selectPersonnel:"",//选中人员
				selectCompany:"",//选中公司
				companylList:[],//可用外包公司列表
				selectedList:[],//资源选中列表
				choiceFileListBox:false,//选择文件框
				choiceFileListType:"",//操作类型
				choiceFileListData:[],//可选择的文件列表
				
				projectVersionBox:false,//版本描述填写框
				projectVersionIntroduction:"",//版本描述
				sysLoading:"",//全局loading
				
				xlsxDataShowBox:false,//上传的表格数据显示框
				xlsxData:[],//上传的表格数据
				xlsxErrArr:[],//轨道冲突数据
				selectXlsxCountBox:false,
				taskProjectNodeList:[],//任务项目节点数据
				projectTrackArr:[],//项目可用轨道数组
				currentNode:"",//原节点数据
				selectNewNode:"",//复制到节点数据
				currentTrack:"",//当前可用轨道数据
				copyType:"1",//是否是复制单帧
				copyXlsxData:[],//上传的表格原数据（新拍屏）
				noneAudioNum:-1,//空音轨编号

			}
		},
		mounted() {
		  // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
		  const that = this;
		  window.onresize = function temp() {
		    that.wdHeigth = "height:" + (window.innerHeight - 90) + "px";
		    that.dialogTextBoxHeigth = "height:" + (window.innerHeight - 246) + "px";
		    that.taskAuditHeight = "height:" + (window.innerHeight - 325) + "px";
		    that.taskResourcesBox = "min-height:" + (window.innerHeight - 170) + "px";
		  };
		},
		components: {
			ImgCropper,
		},
		created: function() {
			console.log("任务详情页")
			this.projectId = this.$route.query.projectId
			this.projectName = this.$route.query.projectName
			this.taskProjectId = this.$route.query.taskProjectId
			this.taskId = this.$route.query.taskId
			this.myInit()
		
		},
		//监听路由变化
		watch:{
			$route: function (val, oldVal) {
				var currentPath = val.path
				if(currentPath=="/index/project/task"){
					if(val.query.projectId!=this.projectId||val.query.projectName!=this.projectName||val.query.taskId!=this.taskId){
						// console.log("需要刷新页面")
						this.projectId = this.$route.query.projectId
						this.projectName = this.$route.query.projectName
						this.taskId = this.$route.query.taskId
						this.myInit()
					}
				}
			},
		},
		// 实例销毁
		destroyed: function(){
			console.log("我被销毁了")
		},
		// 在 `methods` 对象中定义方法
		methods: {
			// 初始化
			myInit() {
				///进入任务时,纠正可用状态
				this.getProjectStateColor()
				this.getTask()
				this.getNewTask()
				// this.getTaskResources()
				this.getRoleList()
				this.getUserRole()
				this.getMyProduction()
				// this.getMyReject()
				this.getMyRepair()
				this.getMyAudit()
				this.getMyComplete()
				this.getProduction()
				this.getToAudit()
				this.getRepair()
				this.getComplete()
			},
			
			
			//获取项目颜色数据
			getProjectStateColor(){
				
				var data = {
					project_id:this.projectId
				}
				this.$PRAPI.prProjectColor.GetProjectList(data).then(res => {
					console.log("项目颜色纠正")
					console.log(res)
					
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
			
			
			//获取我的制作中列表
			getMyProduction(){
				let data = {
					prtask_id:this.taskId,
					user_id:this.$store.state.userInfo.id,
					length:this.myProductionPageSize ,
					position:(this.myProductionPage-1)*this.myProductionPageSize,
				}
				this.$PRAPI.prResourcesRecord.GetMyProduction(data).then(res => {
					this.setMyProduction(res)
				}, err => {
					console.log(err)
				});
			},
			setMyProduction(data){
				var currentAuditData = data.data
				for(var i=0;i<currentAuditData.length;i++){
					currentAuditData[i].isselcted = false
					var currentSubState = currentAuditData[i].sub_state
					var currentState = currentAuditData[i].state
					var currentColorCode = currentSubState!=""&&currentSubState!="0"&&currentSubState!=null&&currentSubState!="null"&&currentSubState!=undefined ? this.$TGYC.setSysColor(currentSubState) : this.$TGYC.setResourcesColorCode(currentState)
					currentAuditData[i].color = currentColorCode
				}
				this.myProductionData = currentAuditData
				this.myProductionCount = parseInt(data.count)
			},
			
			
			//获取我的驳回列表
			getMyReject(){
				let data = {
					prtask_id:this.taskId,
					length:this.myRejectPageSize ,
					position:(this.myRejectPage-1)*this.myRejectPageSize,
				}
				this.$PRAPI.prResourcesRecord.GetFeedbackTask(data).then(res => {
					this.setMyReject(res)
				}, err => {
					console.log(err)
				});
			},
			setMyReject(data){
				var currentAuditData = data.data
				for(var i=0;i<currentAuditData.length;i++){
					currentAuditData[i].isselcted = false
					var currentSubState = currentAuditData[i].sub_state
					var currentState = currentAuditData[i].state
					var currentColorCode = currentSubState!=""&&currentSubState!="0"&&currentSubState!=null&&currentSubState!="null"&&currentSubState!=undefined ? this.$TGYC.setSysColor(currentSubState) : this.$TGYC.setResourcesColorCode(currentState)
					currentAuditData[i].color = currentColorCode
					
				}
				this.myRejectData = currentAuditData
				this.myRejectCount = parseInt(data.count)
			},
		
		
		
		
			//获取我的返修列表
			getMyRepair(){
				let data = {
					prtask_id:this.taskId,
					user_id:this.$store.state.userInfo.id,
					length:this.myRepairPageSize ,
					position:(this.myRepairPage-1)*this.myRepairPageSize,
				}
				this.$PRAPI.prResourcesRecord.GetMyRepair(data).then(res => {
					this.setMyRepair(res)
				}, err => {
					console.log(err)
				});
			},
			setMyRepair(data){
				var currentAuditData = data.data
				for(var i=0;i<currentAuditData.length;i++){
					currentAuditData[i].isselcted = false
					var currentSubState = currentAuditData[i].sub_state
					var currentState = currentAuditData[i].state
					var currentColorCode = currentSubState!=""&&currentSubState!="0"&&currentSubState!=null&&currentSubState!="null"&&currentSubState!=undefined ? this.$TGYC.setSysColor(currentSubState) : this.$TGYC.setResourcesColorCode(currentState)
					currentAuditData[i].color = currentColorCode
					
				}
				this.myRepairData = currentAuditData
				this.myRepairCount = parseInt(data.count)
			},
				
				
							
			//获取已提审列表
			getMyAudit(){
				let data = {
					prtask_id:this.taskId,
					user_id:this.$store.state.userInfo.id,
					length:this.myAuditPageSize ,
					position:(this.myAuditPage-1)*this.myAuditPageSize,
				}
				this.$PRAPI.prResourcesRecord.GetMyAudit(data).then(res => {
					this.setMyAudit(res)
				}, err => {
					console.log(err)
				});
			},
			setMyAudit(data){
				var currentAuditData = data.data
				for(var i=0;i<currentAuditData.length;i++){
					currentAuditData[i].isselcted = false
					var currentSubState = currentAuditData[i].sub_state
					var currentState = currentAuditData[i].state
					var currentColorCode = currentSubState!=""&&currentSubState!="0"&&currentSubState!=null&&currentSubState!="null"&&currentSubState!=undefined ? this.$TGYC.setSysColor(currentSubState) : this.$TGYC.setResourcesColorCode(currentState)
					currentAuditData[i].color = currentColorCode
					
				}
				this.myAuditData = currentAuditData
				this.myAuditCount = parseInt(data.count)
			},
		
		
			//获取我的已完成列表
			getMyComplete(){
				let data = {
					prtask_id:this.taskId,
					user_id:this.$store.state.userInfo.id,
					length:this.myCompletePageSize ,
					position:(this.myCompletePage-1)*this.myCompletePageSize,
				}
				this.$PRAPI.prResourcesRecord.GetMyComplete(data).then(res => {
					this.setMyComplete(res)
				}, err => {
					console.log(err)
				});
			},
			setMyComplete(data){
				var currentCompleteData = data.data
				for(var i=0;i<currentCompleteData.length;i++){
					currentCompleteData[i].isselcted = false
					var currentSubState = currentCompleteData[i].sub_state
					var currentState = currentCompleteData[i].state
					var currentColorCode = currentSubState!=""&&currentSubState!="0"&&currentSubState!=null&&currentSubState!="null"&&currentSubState!=undefined ? this.$TGYC.setSysColor(currentSubState) : this.$TGYC.setResourcesColorCode(currentState)
					currentCompleteData[i].color = currentColorCode
					
				}
				this.myCompleteData = currentCompleteData
				this.myCompleteCount = parseInt(data.count)
			},
			
			
			
			//获取工程制作中列表
			getProduction(){
				let data = {
					prtask_id:this.taskId,
					length:this.ProductionPageSize ,
					position:(this.ProductionPage-1)*this.ProductionPageSize,
				}
				this.$PRAPI.prResourcesRecord.GetProduction(data).then(res => {
					this.setProduction(res)
				}, err => {
					console.log(err)
				});
			},
			setProduction(data){
				var currentAuditData = data.data
				for(var i=0;i<currentAuditData.length;i++){
					currentAuditData[i].isselcted = false
					var currentSubState = currentAuditData[i].sub_state
					var currentState = currentAuditData[i].state
					var currentColorCode = currentSubState!=""&&currentSubState!="0"&&currentSubState!=null&&currentSubState!="null"&&currentSubState!=undefined ? this.$TGYC.setSysColor(currentSubState) : this.$TGYC.setResourcesColorCode(currentState)
					currentAuditData[i].color = currentColorCode
					
				}
				this.ProductionData = currentAuditData
				this.ProductionCount = parseInt(data.count)
			},
			
			//获取工程待审核列表
			getToAudit(){
				let data = {
					prtask_id:this.taskId,
					length:this.auditPageSize ,
					position:(this.auditPage-1)*this.auditPageSize,
				}
				this.$PRAPI.prResourcesRecord.GetToAudit(data).then(res => {
					// console.log(res)
					this.setAuditData(res)
				}, err => {
					console.log(err)
				});
			},
			setAuditData(data){
				
				var currentAuditData = data.data
				for(var i=0;i<currentAuditData.length;i++){
					currentAuditData[i].isselcted = false
					var currentSubState = currentAuditData[i].sub_state
					var currentState = currentAuditData[i].state
					var currentColorCode = currentSubState!=""&&currentSubState!="0"&&currentSubState!=null&&currentSubState!="null"&&currentSubState!=undefined ? this.$TGYC.setSysColor(currentSubState) : this.$TGYC.setResourcesColorCode(currentState)
					currentAuditData[i].color = currentColorCode
					
				}
				this.auditData = currentAuditData
				this.auditCount = parseInt(data.count)
			},
			
			//获取工程返修中列表
			getRepair(){
				
				let data = {
					prtask_id:this.taskId,
					length:this.repairPageSize ,
					position:(this.repairPage-1)*this.repairPageSize,
				}
				
				this.$PRAPI.prResourcesRecord.GetRepair(data).then(res => {
					this.setRepairData(res)
				}, err => {
					console.log(err)
				});
			},
			setRepairData(data){
				var currentRepairData = data.data
				for(var i=0;i<currentRepairData.length;i++){
					currentRepairData[i].isselcted = false
					var currentSubState = currentRepairData[i].sub_state
					var currentState = currentRepairData[i].state
					var currentColorCode = currentSubState!=""&&currentSubState!="0"&&currentSubState!=null&&currentSubState!="null"&&currentSubState!=undefined ? this.$TGYC.setSysColor(currentSubState) : this.$TGYC.setResourcesColorCode(currentState)
					currentRepairData[i].color = currentColorCode
				}
				this.repairData = currentRepairData
				this.repairCount = parseInt(data.count)
			},
		
		
		
			//获取工程已完成列表
			getComplete(){
				
				let data = {
					prtask_id:this.taskId,
					length:this.completePageSize ,
					position:(this.completePage-1)*this.completePageSize,
				}
				
				this.$PRAPI.prResourcesRecord.GetComplete(data).then(res => {
					this.setCompleteData(res)
				}, err => {
					console.log(err)
				});
			},
			setCompleteData(data){
				var currentCompleteData = data.data
				for(var i=0;i<currentCompleteData.length;i++){
					currentCompleteData[i].isselcted = false
					var currentSubState = currentCompleteData[i].sub_state
					var currentState = currentCompleteData[i].state
					var currentColorCode = currentSubState!=""&&currentSubState!="0"&&currentSubState!=null&&currentSubState!="null"&&currentSubState!=undefined ? this.$TGYC.setSysColor(currentSubState) : this.$TGYC.setResourcesColorCode(currentState)
					currentCompleteData[i].color = currentColorCode
				}
				this.completeData = currentCompleteData
				this.completeCount = parseInt(data.count)
			},
			
			//获取最新工程数据
			getNewTask() {
				
				let data = {
					prtask_id: this.taskId
				}
				this.$PRAPI.prtaskHistory.GetNewPrtask(data).then(res => {
					console.log("最新数据")
					console.log(res)
					
					this.taskFileData = res
					this.taskIdentifyCode = res.identifycode
					// 检测本地工程版本
					var projectDataUp = {
						id:this.taskId
					}
					
					if(this.taskIdentifyCode==undefined||this.taskIdentifyCode==""||this.taskIdentifyCode==null){
						console.log("新任务，没有工程文件")
						console.log("打开空项目")
						var nonePath = this.$TGYC.nonePath;
						var mydata = {
							filePath:nonePath,
							SaveAlert:true
						}
						var dataStr = JSON.stringify(mydata)
						dataStr = encodeURI(dataStr);
						let Pathfile = 'openOneProject("' + dataStr + '")';
						this.$CSINTERFACE.evalScript(Pathfile, (el) => {
							
						})
					}else{
						console.log("112233")
						var path = this.taskFileData['local_url'] + "/" + this.taskFileData['local_name'];
						console.log(path)
						//查看文件大小，判断文件是否能找到
						this.$FS.stat(path, (err, stats) => {
							if (!err) {
								console.log(projectDataUp)
								this.$TGYC.getProjectLocalData(projectDataUp).then(res => {
									var currentProject = res
									console.log("5566")
									console.log(currentProject)
									if(currentProject!=""){
										var localMd5 = currentProject.md5
										if(localMd5!=this.taskFileData['md5']){
											// 本地工程不是最新版,选择下载最新版文件
											this.$confirm('工程有更新，是否下载？', '系统提示', {
											  confirmButtonText: '确定',
											  cancelButtonText: '取消',
											  type: 'warning'
											}).then(() => {
												this.downProjectFile()
												// this.getTaskResources()
											}).catch(() => {
												// 关闭当前页
												var thData = {
													name:'/index/project/task',
												}
												this.$store.commit('removeTopNavTabList',thData)
											});
										}else{
											// 是最新版,继续执行
											
											//获取当前工程（如果不是指定工程则打开当前工程）
											var currentFilePath = this.taskFileData['local_url'] + "/" + this.taskFileData['local_name'];
											this.$CSINTERFACE.evalScript("getProjectPath()", (el) => {
												// 修正资源颜色
												console.log("当前项目")
												console.log(el)
												if(el!="err"){
													var projectData = el==""||el=="null"?{}:JSON.parse(el);
													// console.log(projectData)
													if(projectData.filePath!=currentFilePath){
														// this.openProject()
														
														var nonePath = this.$TGYC.nonePath
														var pathData = {
															nonePath:nonePath,
															filePath:currentFilePath
														}
														pathData = JSON.stringify(pathData)
														pathData = encodeURI(pathData);
														let Pathfile = 'openProject("' + pathData + '")';
														this.$CSINTERFACE.evalScript(Pathfile, (el) => {
															if(el!="err"){
																this.getTaskResources()
															}	
														})
													}else{
														this.getTaskResources()
													}
												}
											})
								
											
										}
									}else{
										
										console.log("打开空项目")
										var nonePath = this.$TGYC.nonePath;
										var mydata = {
											filePath:nonePath,
											SaveAlert:true
										}
										var dataStr = JSON.stringify(mydata)
										dataStr = encodeURI(dataStr);
										let Pathfile = 'openOneProject("' + dataStr + '")';
										this.$CSINTERFACE.evalScript(Pathfile, (el) => {
											if(el!="err"){
												// 本地没有文件,确认是否下载
												this.$confirm('工程未下载，是否下载并打开', '系统提示', {
												  confirmButtonText: '确定',
												  cancelButtonText: '取消',
												  type: 'warning'
												}).then(() => {
													this.downProjectFile()
													// this.getTaskResources()
												}).catch(() => {
													// 关闭当前页
													var thData = {
														name:'/index/project/task',
													}
													this.$store.commit('removeTopNavTabList',thData)
												});
											}
										})
										
									}
								}, err => {
									
								});
							} else {
								// console.log('文件未找到')
								console.log("打开空项目")
								var nonePath = this.$TGYC.nonePath;
								var mydata = {
									filePath:nonePath,
									SaveAlert:true
								}
								var dataStr = JSON.stringify(mydata)
								dataStr = encodeURI(dataStr);
								let Pathfile = 'openOneProject("' + dataStr + '")';
								this.$CSINTERFACE.evalScript(Pathfile, (el) => {
									if(el!="err"){
										// 本地没有文件,确认是否下载
										this.$confirm('工程未下载，是否下载并打开', '系统提示', {
										  confirmButtonText: '确定',
										  cancelButtonText: '取消',
										  type: 'warning'
										}).then(() => {
											this.downProjectFile()
											// this.getTaskResources()
										}).catch(() => {
											// 关闭当前页
											var thData = {
												name:'/index/project/task',
											}
											this.$store.commit('removeTopNavTabList',thData)
										});
									}	
								})
							}
						})
					}	
		
		
					// 获取任务资源
					// this.getTaskResources()
					// 自动打开工程
					// this.openProject()
					
					
				}, err => {
					console.log(err)
				});
			},
			//获取任务详细信息
			getTask() {
				let data = {
					id: this.taskId
				}
				this.$PRAPI.prtask.GetDetails(data).then(res => {
					console.log("任务信息")
					console.log(res)
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
				// console.log(myJurisdiction)
			},
			
			//获取任务资源列表
			getTaskResources() {
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
			//设置资源文件
			setTaskResources(data) {
				var mydata = data
				var videoNum =0
				var audioNum =0
				var imageNum =0
				var otherNum =0
				
				// 初始数据
				this.taskResStatistical.differencesNum = 0
				this.taskResStatistical.offlineNum = 0
				this.taskResStatistical.localDifferencesNum = 0
				this.differencesData = []
				this.offlineData = []
				this.localDifferencesData = []
				
				//当前数据
				var offlineNumCurrent = 0;
				var offlineDataCurrent = [];
				var differencesNumCurrent = 0;
				var differencesDataCurrent = [];
				var localDifferencesNumCurrent = 0;
				var localDifferencesDataCurrent = [];
				
				var pathList = []
				var fileNum = 0
				// var fileLen = data.length;
				
				// 文件未找到处理
				var setResLose = (fileData)=> {
					offlineNumCurrent++
					offlineDataCurrent.push(fileData)
					fileNum++
					setResData()
				}
				// 与服务器不一致处理
				var setResProving = (mtimeMs,currentMtimeMs,fileData)=> {
					//获取最后修改日期
					
					if(currentMtimeMs!=mtimeMs){
						// console.log('时间不一致')
						var resData = [
							{
								local_name:fileData.local_name,
								local_url:fileData.local_url,
								updtime:mtimeMs,
							}
						]
						var data = {
							taskid:fileData.prtask_id,
							json:JSON.stringify(resData)
						}
						this.$PRAPI.prResourcesRecord.GetChange(data).then(res => {
							// console.log("--------")
							// console.log(res)
							if(res[0]){
								var type = res[0].type
								if(type=="service"){
									differencesNumCurrent++
									differencesDataCurrent.push(fileData)
								}else if(type=="local"){
									localDifferencesNumCurrent++
									localDifferencesDataCurrent.push(fileData)
								}
								fileNum++
								setResData()
							}
						}, err => {
							console.log(err)
						});
						
					}else{
						// console.log('服务器版本一致')
						fileNum++
						setResData()
					}
					
				}
				
				//设置文件处理完成后数据
				var setResData = ()=> {
					// if(fileNum>=fileLen){
						this.taskResStatistical.offlineNum =  offlineNumCurrent
						this.offlineData =  offlineDataCurrent
						this.taskResStatistical.differencesNum =  differencesNumCurrent
						this.differencesData = differencesDataCurrent
						this.taskResStatistical.localDifferencesNum =  localDifferencesNumCurrent
						this.localDifferencesData = localDifferencesDataCurrent
					// }
				}
				
				var fileStateTest = (pathName,pathUrl,currentMtimeMs,currentOldMd5,fileData)=>{
					// console.log('执行验证')
					var path = pathUrl + '/' + pathName;
					//查看文件大小，判断文件是否能找到
					this.$FS.stat(path, (err, stats) => {
						if (!err) {
							var mtimeMs = stats.mtimeMs
							// console.log(mtimeMs)
							mtimeMs = parseInt(mtimeMs)
							mtimeMs = this.$TGYC.setFaileStamp(mtimeMs)
							
							setResProving(mtimeMs,currentMtimeMs,fileData)
		
						} else {
							// console.log('文件未找到')
							setResLose(fileData)
						}
					})
					
				}
				// console.log('开始处理文件信息')
				
				
				for (var i = 0; i < data.length; i++) {
					// console.log(data[i].clips_data)
					// console.log("888")
					
					var thum = mydata[i].thum
					if (thum == '' || thum == null || thum == undefined) {
						mydata[i].thum = '/Upload/Uploads/20190910/1568097002.jpeg'
					}
					mydata[i].upState = false
					mydata[i].pass = 0
					
					var local_name = mydata[i].local_name
					var local_url = mydata[i].local_url
					var fileMtimeMs = mydata[i].updtime
					var currentOldMd5 = mydata[i].md5
					var currentState = mydata[i].state
					var currentSubState = mydata[i].sub_state
					
					var currentColorIndex = currentSubState!=""&&currentSubState!="0"&&currentSubState!=null&&currentSubState!="null"&&currentSubState!=undefined ? currentSubState : this.$TGYC.setResourcesColor(currentState)
					var tharr = {
						path:local_url+"/"+local_name,
						stateCode:currentState,
						colorCode:currentColorIndex
					}
					pathList.push(tharr)

					if(data[i].clips_data!=null&&data[i].clips_data!=""){
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
					
				}
				console.log('文件信息处理完成')
				
				
				this.taskfileList = mydata
				
				this.taskResStatistical.videoNum = videoNum
				this.taskResStatistical.audioNum = audioNum
				this.taskResStatistical.imageNum = imageNum
				this.taskResStatistical.otherNum = otherNum
				// this.taskResStatistical.differencesNum = differencesNum
				// this.taskResStatistical.offlineNum = offlineNum
				
				this.taskResourcesStateData = pathList
				// 获取当前项目任务标识,相同时执行修色操作
				// console.log('开始处理颜色状态')
				this.$CSINTERFACE.evalScript("gerProjectDocumentID()",(el)=>{
					if(el!="err"){
						// console.log(el)
						if(this.taskIdentifyCode==el){
							//修正资源对应状态颜色
							var options = {
								text:"状态纠正中，请稍候"
							}
							this.sysLoading =Loading.service(options);
							this.setTaskResourcesStateColor()
							// pathList = JSON.stringify(pathList)
							// var jsonfnPath = 'SetProjectItemColor('+pathList+')';
							// this.$CSINTERFACE.evalScript(jsonfnPath);
						}else{
							// console.log('不是当前任务')
						}
					}
				});
				this.getNewFile()
			},
			// 设置当前项目资源状态颜色
			setTaskResourcesStateColor(){
				// pathList = JSON.stringify(this.taskResourcesStateData)
				
				// console.log(pathList)
				//获取项目资产颜色
				
				this.$CSINTERFACE.evalScript("GetProjectItemColor()",(res)=>{
					// console.log("项目颜色列表")
					// console.log(res)
					// 对比颜色,找出需要修改颜色的资产
					// {
					//         "path":"P:/test/E02/assets/J1_E03_ly_SC05_shot009_shot062.mov",
					//         "stateCode":"4",
					//         "colorCode":0
					//     }
					// 	{"path":"P:/test/E02/assets/J2_E01_ani_SC06_shot068.mov","colorIndex":15}
					var currentResData = JSON.parse(res);
					var newResData = this.taskResourcesStateData;
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
					// console.log("需要修改的资源列表")
					// console.log(needChangeRes)
					//设置项目资产颜色
					if(needChangeRes.length>0){
						needChangeRes = encodeURI(JSON.stringify(needChangeRes));
						var jsonfnPath = 'SetProjectItemColor("'+needChangeRes+'")';
						this.$CSINTERFACE.evalScript(jsonfnPath,()=>{
							// alert("修改完成")
							console.log("状态修改完成，执行完毕")
							this.sysLoading.close();
						});
					}else{
						this.sysLoading.close();
						console.log("状态一致，无需修改")
					}
					
				});	
				
			},
			// 查看文件状态
			// getFileState(pathName,pathUrl,currentMtimeMs,currentOldMd5){
			// 	// async function fileStateTest(){
			// 		var path = pathUrl + '/' + pathName;
					
			// 		//查看文件大小，判断文件是否能找到
			// 		this.$FS.stat(path, (err, stats) => {
			// 			if (!err) {
			// 				//获取最后修改日期
			// 				var mtimeMs = stats.mtimeMs
			// 				mtimeMs = parseInt(mtimeMs)
							
			// 				if(currentMtimeMs!=mtimeMs){
			// 					// console.log(pathName)
			// 					// console.log(pathUrl)
			// 					// console.log('时间不一致')
								
								
			// 					//验证版本
			// 					var md5sum = this.$CRYPTO.createHash('md5');
			// 					var stream = this.$FS.createReadStream(path);
			// 					stream.on('data', (chunk) => {
			// 						md5sum.update(chunk);
			// 					});
			// 					stream.on('end', () => {
			// 						var str = md5sum.digest('hex');
			// 						var currentMd5 = str
									
			// 						if(currentOldMd5!=currentMd5){
			// 							// console.log('服务器md5版本不一致')
			// 							this.taskResStatistical.differencesNum = this.taskResStatistical.differencesNum + 1
			// 						}else{
			// 							// console.log('服务器md5版本一致')
			// 						}
			// 					});
								
								
								
			// 				}else{
			// 					// console.log(pathName)
			// 					// console.log(pathUrl)
			// 					// console.log('服务器版本一致')
								
			// 				}
			// 			} else {
			// 				// console.log(pathName)
			// 				// console.log(pathUrl)
			// 				// console.log('文件未找到')
			// 				this.taskResStatistical.offlineNum = this.taskResStatistical.offlineNum + 1
			// 			}
			// 		})
			// 	// }
			// },
			
			//获取用户角色
			getUserRole(){
				var data = {
					id: this.$store.state.userInfo.id
				}
				this.$PRAPI.role.GetUserRole(data).then(res => {
					// console.log('用户角色')
					this.userRoleData = res
				}, err => {
					console.log(err)
				});
			},
			
			//获取角色列表
			getRoleList() {
				var data = {
					project_id: this.projectId,
				}
				this.$PRAPI.role.GetRoleActive(data).then(res => {
					this.setRoleList(res)
				}, err => {
					console.log(err)
				});
			},
			setRoleList(data) {
				this.prRoleList = data
			},
			taskStateMenu(event) {
				if(!this.currentUserJurisdiction.taskEditState){
					this.$TGYC.sendErr("您没有权限！！！");
					return false
				};
				this.$contextmenu({
					items: [{
							label: "制作中",
							onClick: () => {
								this.setTaskState('0')
							}
						},
						{
							label: "完成",
							onClick: () => {
								this.setTaskState('1')
							}
						},
						{
							label: "暂停",
							onClick: () => {
								this.setTaskState('2')
							}
						}
					],
					event,
					customClass: "tgycContextMenu",
					zIndex: 9999,
					minWidth: 130,
				});
				return false;
			},
			//任务框右键
			taskListBoxMenu(event) {
				// 通过
				// 提交审核
				// 返修
				// 非制作
				
				//循环查询选中任务
				//判定权限
				var currentStateList = [
					{
						label: "转到文件位置",
						onClick: () => {
							// console.log(event)
							var path = event.path[2].dataset.path
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
						label: "全选",
						onClick: () => {
							this.setSelectTask()
						}
					},
					{
						label: "取消",
						onClick: () => {
							this.clearSelectTask()
						}
					},
				]
				var selectionArr = [];//当前选中项数据
				var selectedArr = [];//选中项列表
				switch (this.taskTabCurrent){
					case 'myProduction':
						selectionArr = this.myProductionData
						break;
					case 'myreject':
						selectionArr = this.myRejectData	
						break;
					case 'myRepair':
						selectionArr = this.myRepairData
						break;
					case 'myAudit':
						selectionArr = this.myAuditData
						break;
					case 'myComplete':
						selectionArr = this.myCompleteData
						break;
					case 'Production':
						selectionArr = this.ProductionData
						break;
					case 'audit':
						selectionArr = this.auditData
						break;
					case 'repair':
						selectionArr = this.repairData
						break;
					case 'complete':
						selectionArr = this.completeData
						break;	
				}
				// this.myAuditData[i].isselcted = state
				var isMyTask = true;
				var myId = this.$store.state.userInfo.id
				for(var i=0;i<selectionArr.length;i++){
					if(selectionArr[i].isselcted){
						selectedArr.push(selectionArr[i])
						if(myId!=selectionArr[i].personnel_id){
							isMyTask = false
						}
					}
				}
				this.selectedList =	selectedArr;
				if(this.currentUserJurisdiction.resEditPersonnel){
					currentStateList.unshift({
						label: "修改负责人",
						onClick: () => {
							this.setPersonnel()
						}
					})
				}
				
				if(this.currentUserJurisdiction.resEditStateNonProduction){
					currentStateList.unshift({
						label: "非制作",
						onClick: () => {
							this.setResourcesState(selectedArr,5)
						}
					})
				}
		
				if(this.currentUserJurisdiction.resEditStateRepair){
					currentStateList.unshift({
						label: "返修",
						onClick: () => {
							this.setResourcesState(selectedArr,1)
						}
					})
				}
				if(this.currentUserJurisdiction.resEditStateComplete){
					currentStateList.unshift({
						label: "完成",
						onClick: () => {
							this.setResourcesState(selectedArr,2)
						}
					})
				}
				if(isMyTask){
					currentStateList.unshift({
						label: "提交审核",
						onClick: () => {
							this.setResourcesState(selectedArr,0)
						}
					})
				}
				if(isMyTask||this.currentUserJurisdiction.resEditStateInProduction){
					currentStateList.unshift({
						label: "制作中",
						onClick: () => {
							this.setResourcesState(selectedArr,4)
						}
					})
				}
				
				
				this.$contextmenu({
					items:currentStateList,
					event,
					customClass: "tgycContextMenu",
					zIndex: 9999,
					minWidth: 130,
				});
				return false;
			},
			//批量设置资源状态颜色
			setResourcesState(resList,state){
				if(resList.length<=0){
					this.$notify.error('请先选中资源！！！');
					return false
				}
				var pathList = []
				var resIdList = []
				for(var i=0;i<resList.length;i++){
					resIdList.push(resList[i].id)
					pathList.push(
						{
							path:resList[i].local_url+"/"+resList[i].local_name,
							stateCode:state,
							colorCode:this.$TGYC.setResourcesColor(state)
						}
					)
				}
				var resIdListStr = JSON.stringify(resIdList);
				
				let data = {
					idlist:resIdListStr,
					state:state,
					sub_state:"0"
				}
				this.$PRAPI.prResourcesRecord.BatchUpdState(data).then(res => {
					
					pathList = JSON.stringify(pathList)
					pathList = encodeURI(pathList);
					var jsonfnPath = 'SetProjectItemColor("'+pathList+'")';
					this.$CSINTERFACE.evalScript(jsonfnPath);
					
				}, err => {
					console.log(err)
				});
				
				
			},
			
			//设置任务选择
			setSelectTask(){
				this.setResSelection(true)
			},
			//清空选择
			clearSelectTask(){
				this.setResSelection(false)
			},
			//设置资源选中状态
			setResSelection(state){
				switch (this.taskTabCurrent){
					case 'myProduction':
						var currentAuditData = this.myProductionData
						for(var i=0;i<currentAuditData.length;i++){
							this.myProductionData[i].isselcted = state
						}
						break;
					case 'myreject':
						var currentAuditData = this.myRejectData
						for(var i=0;i<currentAuditData.length;i++){
							this.myRejectData[i].isselcted = state
						}
						break;	
					case 'myRepair':
						var currentAuditData = this.myRepairData
						for(var i=0;i<currentAuditData.length;i++){
							this.myRepairData[i].isselcted = state
						}
						break;
					case 'myAudit':
						var currentAuditData = this.myAuditData
						for(var i=0;i<currentAuditData.length;i++){
							this.myAuditData[i].isselcted = state
						}
						break;
					case 'myComplete':
						var currentAuditData = this.myCompleteData
						for(var i=0;i<currentAuditData.length;i++){
							this.myCompleteData[i].isselcted = state
						}
						break;
					case 'Production':
						var currentAuditData = this.ProductionData
						for(var i=0;i<currentAuditData.length;i++){
							this.ProductionData[i].isselcted = state
						}
						break;
					case 'audit':
						var currentAuditData = this.auditData
						for(var i=0;i<currentAuditData.length;i++){
							this.auditData[i].isselcted = state
						}
						break;
					case 'repair':
						var currentAuditData = this.repairData
						for(var i=0;i<currentAuditData.length;i++){
							this.repairData[i].isselcted = state
						}
						break;
					case 'complete':
						var currentAuditData = this.completeData
						for(var i=0;i<currentAuditData.length;i++){
							this.completeData[i].isselcted = state
						}
						break;	
				}
			},
			openProjectVersionBox(){
				this.projectVersionBox = true;
			},
			submitProjectVersion(){
				this.projectVersionBox = false;
				this.uploadProject()
			},
			clearProjectVersion(){
				this.projectVersionBox = false;
			},
			taskMenu(event) {
				console.log("----")
				console.log(event)
				console.log("++++")
				// if (event.target.id != 'taskState') {
					this.$contextmenu({
						items: [
							{
								label: "重载工程",
								onClick: () => {
									this.openProject()
								}
							},{
								label: "上传工程",
								onClick: () => {
									//先保存，然后上传
									// this.uploadProject()
									this.openProjectVersionBox()
								}
							},
							{
								label: "下载工程",
								onClick: () => {
									this.downProjectFile()
								}
							},
							{
								label: "编辑",
								onClick: () => {
									this.setLockTask()
								}
							},
							{
								label: "解除编辑",
								onClick: () => {
									this.setUnLockTask()
									
								}
							},
							{
								label: "任务关联设置",
								onClick: () => {
									this.setResRelation()
									
								}
							},
							{
								label: "工程历史",
								onClick: () => {
									this.openProjectTaskHistory()
								}
							},
							{
								label: "资源管理器中打开",
								onClick: () => {
									
									var path = this.taskFileData['local_url'] + "/" + this.taskFileData['local_name'];
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
								label: "刷新",
								onClick: () => {
									this.myInit()
								}
							},
						],
						event,
						customClass: "tgycContextMenu",
						zIndex: 9999,
						minWidth: 130,
					});
					return false;
				// }
			},
			openWinDir(){
				var path = this.taskFileData['local_url'] + "/" + this.taskFileData['local_name'];
				this.$TGYC.toFileDir(path)
			},
			//资源右键事件
			taskResourcesMenu(event) {
				// console.log(event)
				// if (event.target.id != 'taskState') {
				var menuData = [
					{
						label: "详情",
						onClick: () => {
							this.openFileListBox(this.differencesData)
						}
					},
					{
						label: "下载",
						onClick: () => {
							this.downDifferencesRes()
						}
					},
					{
						label: "刷新",
						onClick: () => {
							this.getTaskResources()
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
				// }	
			},
			//资源右键事件
			taskResourcesMenu2(event) {
				var menuData = [
					{
						label: "详情",
						onClick: () => {
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
						label: "刷新",
						onClick: () => {
							this.getTaskResources()
						}
					},
					// {
					// 	label: "重检",
					// 	onClick: () => {
							
					// 	}
					// },
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
			taskResourcesMenu3(event) {
				var menuData = [
					{
						label: "详情",
						onClick: () => {
							this.openFileListBox(this.newFileData)
						}
					},
					{
						label: "选择上传",
						onClick: () => {
							this.selectNewRes(false);
						},
						
						
					},
					{
						label: "全部上传",
						onClick: () => {
							this.selectNewRes(true);
						}
					},
					{
						label: "检测",
						onClick: () => {
							this.getNewFile()
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
			
			
			// 处理上传文件
			selectNewRes(selectState){
				var options = {
					text:"任务匹配中，请稍候。。。"
				}
				var thLoading =Loading.service(options);
				this.choiceFileListType = "newFile"
				var currentData = this.newFileData
				var taskList = [];
				currentData.map(item => {
					this.$set(item, 'isselcted', selectState)
					this.$set(item, 'relation', false)
					// 解析任务编号
					var currentName = item.local_name
					var mergeName = currentName.slice(currentName.lastIndexOf('_')+1,currentName.lastIndexOf('.'))
					var mergeTask = currentName.slice(0,currentName.lastIndexOf('_'))
					item.thTask = mergeTask
					item.thMerge = mergeName
					var thArr = {
						"merge_englishname":mergeName,
						"task_name":mergeTask
					}
					taskList.push(thArr)
					item.merge_id = ''
					item.task_id = ''
					item.task_name = ''
				    return item
				})
				
				// console.log("新资源任务分析")
				// console.log(currentData)
				// console.log(taskList)
				//查询并匹配任务
				var taskDataStr = JSON.stringify(taskList)
								
				let data = {
					project_id:this.taskProjectId,
					json:taskDataStr
				}
				this.$PRAPI.task.GetResourcesTask(data).then(res => {
					// console.log('任务资源')
					// console.log(res)
					//匹配资源
					var mergeList = res;
					if(res.length>0){
						// res[0].task_list.shotnumber
						// res[0].value_englishname: "test3"
						currentData.map(item => {
							function findTask(list){
								return list.value_englishname==item.thMerge&&list.task_list.shotnumber==item.thTask
							}
							var taskIndex = mergeList.findIndex(findTask)
							if(taskIndex>-1){
								item.relation=true
								item.merge_id = mergeList[taskIndex].id
								item.task_id = mergeList[taskIndex].prid
								item.task_name = mergeList[taskIndex].task_list.shotnumber
								item.merge_name = mergeList[taskIndex].value_name
								item.merge_englishname = mergeList[taskIndex].value_englishname
							}
							return item
						})
					}
					thLoading.close()
					this.choiceFileListBox = true
					this.choiceFileListData = currentData
				}, err => {
					console.log(err)
				});
				
			},
			
			//资源右键事件
			taskResourcesMenu4(event) {
				var menuData = [
					{
						label: "详情",
						onClick: () => {
							this.openFileListBox(this.localDifferencesData)
						}
					},
					{
						label: "上传选中",
						onClick: () => {
							var isSubmit = "false";
							var isSelected = true;
							this.uploadLocalDifferencesRes(isSubmit,isSelected)
							
						}
					},
					{
						label: "上传选中并提审",
						onClick: () => {
							var isSubmit = "true";
							var isSelected = true;
							this.uploadLocalDifferencesRes(isSubmit,isSelected)
						}
					},
					{
						label: "全部上传",
						onClick: () => {
							// console.log("待上传文件")
							// console.log(this.localDifferencesData)
							var isSubmit = "false";
							var isSelected = false;
							this.uploadLocalDifferencesRes(isSubmit,isSelected)
							
						}
					},
					{
						label: "全部上传并提交审核",
						onClick: () => {
							// console.log("待上传文件")
							// console.log(this.localDifferencesData)
							var isSubmit = "true";
							var isSelected = false;
							this.uploadLocalDifferencesRes(isSubmit,isSelected)
							
						}
					},
					{
						label: "下载",
						onClick: () => {
							this.downLocalDifferencesRes()
						}
					},
					{
						label: "刷新",
						onClick: () => {
							this.getTaskResources()
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
			//提交文件
			submitChoiceFile(){
				// 处理数据
				// this.choiceFileListData
				this.choiceFileListBox = false
				var fileData = this.choiceFileListData
				var currentData = [];
				for(var i=0;i<fileData.length;i++){
					if(fileData[i].isselcted){
						currentData.push(fileData[i])
					}
				}
				switch (this.choiceFileListType){
					case "newFile":
						console.log("上传文件")
						console.log(currentData)
						this.newFileData = currentData
						this.uploadNewFile()
						break;
				}
			},
			
			closeChoiceFile(){
				this.choiceFileListBox = false
				this.choiceFileListType = ""
				this.choiceFileListData = []
			},
			
			// 上传差异文件
			uploadLocalDifferencesRes(isSubmit,isSelected) {
				var startUploadFile = (thFile)=>{
					var path = thFile.local_url + '/' + thFile.local_name;
					//查看文件大小，判断文件是否能找到
					this.$FS.stat(path, (err, stats) => {
						if (!err) {
							var size = stats.size
							//获取最后修改日期
							var mtimeMs = stats.mtimeMs
							mtimeMs = this.$TGYC.setFaileStamp(mtimeMs)
							mtimeMs = parseInt(mtimeMs)
							
							if(thFile.updtime!=mtimeMs){
								
								var fileName = thFile.local_name
								var currentMd5 = this.$TGYC.setFileName();
								var serviceName = 'res' + thFile.prresources_id + currentMd5 + fileName.slice(fileName.lastIndexOf('.'), fileName.length);
								var serviceUrl = '/assets/' + this.$TGYC.getDateYMD();
								
								thFile.service_name = serviceName
								thFile.service_url = serviceUrl
								thFile.size = size
								thFile.updtime = mtimeMs
								
								console.log("新上传格式验证")
								console.log(thFile)
								
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
				var startUploadRes = (fileListData)=>{
					// console.log("要上传的数据")
					// console.log(fileListData)
					// 有上传权限或者是自己的任务可以上传
					// var resData = this.localDifferencesData
					var resData = fileListData
					//判断文件路径真实性
					var projectId = this.projectId
					var taskId = this.taskId
					var errData = ""
					//分析任务列表，添加上待上传列表
					for(var i=0;i<resData.length;i++){
						var isMyTaskNode = false;
						if(resData[i].merge_list!='[]'&&resData[i].merge_list!=''&&resData[i].merge_list!=null&&resData[i].merge_list!=undefined){
							if(resData[i].merge_list.producerid!='[]'&&resData[i].merge_list.producerid!=''&&resData[i].merge_list.producerid!=null){
								var producerData = JSON.parse(resData[i].merge_list.producerid)
								var myIndex = producerData.indexOf(this.$store.state.userInfo.id)
								if(myIndex>-1){
									isMyTaskNode = true;
								}
							}
						}
						
						var layoutUpload = false; //是否有layout无限制权限
						var currentLocalName = resData[i].local_name;
						var layoutIndex = currentLocalName.indexOf("_Layout.mov");
						if(layoutIndex>-1&&this.currentUserJurisdiction.resUpdataLayout){
							layoutUpload = true
						}
						
						var currentPersonnel = resData[i].personnel_id
						
						if((currentPersonnel==this.$store.state.userInfo.id||this.currentUserJurisdiction.resUpdata||isMyTaskNode||layoutUpload)&&resData[i].state!="2"){
							// console.log(1)
							var thArr = {
								id:resData[i].local_url + "/" +resData[i].local_name,
								type:0,
								operation:0,
								project_id: projectId,
								prtask_id: taskId,
								prresources_id: resData[i].prresources_id,
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
									var fileIndex = this.localDifferencesData.findIndex(findFile)
									if(fileIndex>-1){
										this.localDifferencesData.splice(fileIndex,1)
										this.taskResStatistical.localDifferencesNum = this.taskResStatistical.localDifferencesNum - 1
									}
									
									if(data.isSubmit=='true'){
										var needChangeRes = [
											{
												"path":data.local_url+"/"+data.local_name,
												"colorCode":15
											}
										]
										// 更改剪辑状态
										needChangeRes = encodeURI(JSON.stringify(needChangeRes));
										var jsonfnPath = 'SetProjectItemColor("'+needChangeRes+'")';
										this.$CSINTERFACE.evalScript(jsonfnPath,()=>{
											console.log("剪辑颜色同步成功")
										});
									}
									
								},
								setProgress:()=>{
									
								}
							}
							startUploadFile(thArr)
							
							
							
							
						}else if(resData[i].state=="2"){
							// 完成状态不能上传
							this.$TGYC.sendErr(resData[i].local_name + "是完成状态不能上传！！！")
						}else{
							// 不是你负责的任务
							errData = errData + resData[i].local_name +"，"
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
				
				//搜寻没有关联任务的layout文件
				//关联文件
				//加入新数据
				// 执行上传逻辑
				
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
								
								var currentDifferencesData = this.localDifferencesData;
								console.log("当前有差异")
								console.log(currentDifferencesData)
								
								var pathData = [];
								for(var i=0;i<selectionData.length;i++){
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
									startUploadRes(pathData)
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
					startUploadRes(this.localDifferencesData)
					
				}
				
			},













































			// 下载本地差异文件
			downLocalDifferencesRes() {
				var downData = []
				var resData = this.localDifferencesData
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
								var fileIndex = this.localDifferencesData.findIndex(findFile)
								if(fileIndex>-1){
									this.localDifferencesData.splice(fileIndex,1)
									this.taskResStatistical.localDifferencesNum = this.taskResStatistical.localDifferencesNum - 1
								}
								
							},
							"setProgress" : (passNum,data) =>{	//进度回调
								
							},
						}
						
						//检测是否在下载队列
						function findFileList(list){
							return list.local_name == newArr.local_name && list.local_url == newArr.local_url
						}
						var isInFileList = this.$parent.fileManageList.fileDown.findIndex(findFileList)
						if(isInFileList==-1){
							this.$parent.fileManageList.fileDown.unshift(newArr)
							this.$parent.fileManageList.num = this.$parent.fileManageList.num +1
							this.compareFile(newArr)
						}
						
					}
				}
			},	
			
			// 搜索新文件
			getNewFile(){
				this.taskResStatistical.newFileNum = 0
				this.$CSINTERFACE.evalScript('getProjectResPath()', (el) => {
					// console.log(el)
					if(el!="err"){
						this.searchNewFile(el)
					}
				})
			},
			searchNewFile(data){
				this.taskResStatistical.newFileNum = 0
				this.newFileData = []
				var fileData = data
				// console.log(1)
				// console.log(fileData)
				var fileList = fileData == '' || fileData == null || fileData == undefined || fileData == 'null' ? [] : JSON.parse(fileData)
				//分析路径对应文件名
				// console.log(2)
				for (var i = 0; i < fileList.length; i++) {
					var currentPath = fileList[i]
					// currentPath = currentPath.replace(/\\/g,"/")
					// console.log(currentPath)
					var pathIndex = currentPath.lastIndexOf('/')
					if (pathIndex > -1) {
						var number = currentPath.slice(pathIndex + 1, currentPath.length)
						var path = currentPath.slice(0, pathIndex)
						
						//检测文件信息是否已经存在
						function findres(resd) {
							return resd.number == number && resd.local_url == path
						}
						var prresourcesIndex = this.taskfileList.findIndex(findres)
						if (prresourcesIndex == -1) {
							this.taskResStatistical.newFileNum = this.taskResStatistical.newFileNum + 1
							var newArr = {
								number :number,
								path : path,
								local_url:path,
								local_name:number,
							}
							this.newFileData.push(newArr)
						}
						
					}
				}
			},
			
			//上传检测到的新文件
			uploadNewFile(){
				if(!this.currentUserJurisdiction.resAdd){
					this.$TGYC.sendErr("您没有权限！！！");
					return false
				};
				console.log('上传新文件')
				var newData = this.newFileData
				
				
				//分析任务列表，添加上待上传列表
				for(var i=0;i<newData.length;i++){
					var fileName = newData[i].number
					var filePath = newData[i].path
					
					var driveLetter = filePath.slice(0,2);
					if(driveLetter!="c:"&&driveLetter!="C:"&&driveLetter!="n:"&&driveLetter!="N:"){
						var thArr = {
							id:filePath + "/" + fileName,
							type:0,
							operation:0,
							state: '等待上传',
							process:0,
							project_id:this.projectId,
							prtask_id:this.taskId,
							local_name: fileName,
							local_url: filePath,
							merge_id:newData[i].merge_id,
							task_id:newData[i].task_id,
							task_name:newData[i].task_name
						}
						this.addUploadNewFile(thArr)
					}else{
						
						this.$notify({
							message: fileName + '，请不要上传C盘或N盘的资源',
							type: 'warning',
									position: 'bottom-right'
						});
					}
					
					
				}
				
			},
			//添加到待上传列表
			addUploadNewFile(fileData) {
				var fileName = fileData.local_name
				var filePath = fileData.local_url
				
				var path = filePath + '/' + fileName;
				
				var that = this
				//发生错误
				function errFile(message){
					
					fileData.process = 0
					fileData.state = message
					fileData.describe = message
					that.$parent.fileManageList.fileErr.unshift(fileData)
					that.$parent.fileManageList.num = that.$parent.fileManageList.num -1
					
				}
				
				//查看文件大小，判断文件是否能找到
				this.$FS.stat(path, (err, stats) => {
					if (!err) {
						var size = stats.size
						//获取最后修改日期
						var mtimeMs = stats.mtimeMs
						mtimeMs = this.$TGYC.setFaileStamp(mtimeMs)
						mtimeMs = parseInt(mtimeMs)

						
						var currentMd5 = "resN" + this.$TGYC.setFileName()
						
						var serviceName = currentMd5 + fileName.slice(fileName.lastIndexOf('.'), fileName.length);
						var serviceUrl = '/assets/' + this.$TGYC.getDateYMD();
						
						fileData.service_name = serviceName
						fileData.service_url = serviceUrl
						fileData.md5 = currentMd5
						fileData.size = size
						fileData.updtime = mtimeMs
						fileData.setComplete = (data) =>{	//完成回调
							
							let thdata = {
								project_id:data.project_id,
								prtask_id:data.prtask_id,
								version:0,
								thum:'',
								local_name:data.local_name,
								local_url:data.local_url,
								service_name:data.service_name,
								service_url:data.service_url,
								md5:data.md5,
								size:data.size,
								introduction:'',
								updtime:data.updtime,
								merge_id:data.merge_id,
								task_id:data.task_id,
								task_name:data.task_name
							}
							this.$PRAPI.prResourcesRecord.AddNewRecord(thdata).then(res => {
								console.log('添加成功')
								console.log(res)
								
								var local_name = data.local_name
								var fileType =local_name==null||local_name=='' ? 'other' : local_name.slice(local_name.lastIndexOf('.')+1, local_name.length)
								
								if(fileType=='mov'||fileType=='mp4'||fileType=='WAV'){
									this.taskResStatistical.videoNum = this.taskResStatistical.videoNum + 1
								}else if(fileType=='mp3'||fileType=='wav'||fileType=='m4a'||fileType=='wma'){
									this.taskResStatistical.audioNum = this.taskResStatistical.audioNum + 1
								}else if(fileType=='png'||fileType=='jpg'){
									this.taskResStatistical.imageNum = this.taskResStatistical.imageNum + 1
								}else{
									this.taskResStatistical.otherNum = this.taskResStatistical.otherNum + 1
								}
								this.taskfileList.push(res[0])
								this.myProductionData.push(res[0])
								this.ProductionData.push(res[0])
								
								// 从新文件中移除
								var currentLocalName = data.local_name
								function findFile(list){
									return list.number == currentLocalName
								}
								var fileIndex = this.newFileData.findIndex(findFile)
								if(fileIndex>-1){
									this.newFileData.splice(fileIndex,1)
									this.taskResStatistical.newFileNum = this.taskResStatistical.newFileNum - 1
								}
								if(this.newFileData.length==0){
									this.myInit()
								}
							}, err => {
								console.log(err)
							});
						},
						fileData.setProgress = (passNum) =>{	//进度回调
							
						}
						// console.log("发送传输")
						// console.log(fileData)
						//检测是否在上传队列
						function findFileList(list){
							return list.local_name == fileData.local_name && list.local_url == fileData.local_url 
						}
						var isInFileList = this.$parent.fileManageList.fileUpload.findIndex(findFileList)
						if(isInFileList==-1){
							this.$parent.fileManageList.fileUpload.push(fileData)
							this.$parent.fileManageList.num = this.$parent.fileManageList.num + 1
							this.$parent.fileManage(fileData)
						}
					} else {
						console.log('文件未找到')
						errFile('文件未找到')
					}
				})
			},
			
			//更换状态
			setTaskState(state) {
				let data = {
					id: this.taskId,
					state: state
				}
				this.$PRAPI.prtask.UpdState(data).then(res => {
					this.taskData.state = state
				}, err => {
					console.log(err)
				});
			},
			//锁定任务
			setLockTask() {
				if (this.taskData.lock_state == '0') {
					this.$confirm('编辑状态他人将不能上传该任务工程文件，编辑完成后请及时提交解除编辑状态！！！', '编辑锁定提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let data = {
							id: this.taskId,
							lock_id: this.$store.state.userInfo.id,
							lock_name: this.$store.state.userInfo.name,
						}
						this.$PRAPI.prtask.UpdLock(data).then(res => {
							this.taskData.lock_state = '1'
							this.taskData.lock_id = this.$store.state.userInfo.id
							this.taskData.lock_name = this.$store.state.userInfo.name
							this.taskData.lock_time = this.$TGYC.getcurrentStampS()
							
						}, err => {
							console.log(err)
						});
					}).catch(() => {
						this.$notify({
							type: 'info',
							message: '已取消',
									position: 'bottom-right'
						});
					});
				} else {
					this.$notify({
						type: 'info',
						message: '任务已锁定，无须重复操作！！！',
								position: 'bottom-right'
					});
				}
			},
			//解锁任务
			setUnLockTask() {
				var unLockTask = ()=>{
					let data = {
						id: this.taskId,
					}
					this.$PRAPI.prtask.UpdUnLock(data).then(res => {
						this.taskData.lock_state = '0'
					}, err => {
						console.log(err)
					});
				}
				
				if(this.taskData.lock_state == '1'&&this.taskData.lock_id == this.$store.state.userInfo.id){
					unLockTask()
				}else if(this.taskData.lock_state == '0'){
					this.$notify({
						type: 'info',
						message: '任务未锁定',
						position: 'bottom-right'
					});
				}else{
					var errStr = '任务已被（'+this.taskData.lock_name+'）锁定';
					this.$notify({
						type: 'info',
						message: errStr,
						position: 'bottom-right'
					});
				}
				
			},
			openTaskResources(resourecesId) {
				this.$router.push({
					path: '/index/project/taskResources',
					query: {
						projectId: this.projectId,
						taskId: this.taskId,
						prresourcesId: resourecesId,
						// taskRole:this.taskData.role_id,
						// userRoleData:this.userRoleData
					},
				})
			},
			upTaskThum() {
				if(!this.currentUserJurisdiction.taskEditInfo){
					this.$TGYC.sendErr("您没有权限！！！");
					return false
				};
				console.log(this.$refs)
				this.$refs.imgCropper.inputAction()
				
			},
			setTaskImg(img) {
				this.taskData.thum = img
				let data = {
					id: this.taskId,
					thum: img
				}
				this.$PRAPI.prtask.UpdThum(data).then(res => {
		
				}, err => {
					console.log(err)
				});
			},
			openTaskNumberEditer() {
				if(!this.currentUserJurisdiction.taskEditInfo){
					this.$TGYC.sendErr("您没有权限！！！");
					return false
				};
				this.taskNumberEditer = true
				this.$nextTick(() => {
					this.$refs['taskNumber'].focus()
				})
			},
			closeTaskNumberEditer() {
				this.taskNumberEditer = false
				let data = {
					id: this.taskId,
					name: this.taskData.name
				}
				this.$PRAPI.prtask.UpdName(data).then(res => {
		
				}, err => {
					console.log(err)
				});
			},
			openTaskChineseNameEditer() {
				if(!this.currentUserJurisdiction.taskEditInfo){
					this.$TGYC.sendErr("您没有权限！！！");
					return false
				};
				this.taskChineseNameEditer = true
				this.$nextTick(() => {
					this.$refs['taskChineseName'].focus()
				})
			},
			closeTaskChineseNameEditer() {
				this.taskChineseNameEditer = false
				let data = {
					id: this.taskId,
					chinese_name: this.taskData.chinese_name
				}
				this.$PRAPI.prtask.UpdChineseName(data).then(res => {
		
				}, err => {
					console.log(err)
				});
			},
			openTaskTimeLenEditer() {
				if(!this.currentUserJurisdiction.taskEditInfo){
					this.$TGYC.sendErr("您没有权限！！！");
					return false
				};
				this.taskTimeLenEditer = true
				this.$nextTick(() => {
					this.$refs['taskTimeLen'].focus()
				})
			},
			closeTaskTimeLenEditer() {
				this.taskTimeLenEditer = false
				let data = {
					id: this.taskId,
					time_len: this.taskData.time_len
				}
				this.$PRAPI.prtask.UpdTimeLen(data).then(res => {
		
				}, err => {
					console.log(err)
				});
			},
			openTaskRoleListEditer() {
				if(!this.currentUserJurisdiction.taskEditRole){
					this.$TGYC.sendErr("您没有权限！！！");
					return false
				};
				this.taskRoleListEditer = true
				this.$nextTick(() => {
					
					// this.$refs['taskTimeLen'].focus()
				})
			},
			closetaskRoleListEditer(el) {
				if (!el) {
					this.taskRoleListEditer = false
					let data = {
						id: this.taskId,
						role_id: JSON.stringify(this.taskData.role_id)
					}
					this.$PRAPI.prtask.UpdRole(data).then(res => {
						this.setcurrentRoleList()
					}, err => {
						console.log(err)
					});
				}
			},
			//获取角色名称
			getRoleName(roleId) {
				var roleName = ''
		
				function findRole(role) {
					return role.id == roleId
				}
				var roleIndex = this.prRoleList.findIndex(findRole)
				if (roleIndex > -1) {
					roleName = this.prRoleList[roleIndex].name
				}
				return roleName
			},
			setcurrentRoleList() {
				var roleData = this.taskData.role_id
				var roleList = []
				for (var i = 0; i < roleData.length; i++) {
					let newArr = {
						id: roleData[i],
						name: this.getRoleName(roleData[i])
					}
					roleList.push(newArr)
				}
				this.taskData.role = roleList
			},
		
			//打开项目
			openProject(){
				var Path = this.taskFileData['local_url'] + '\\' + this.taskFileData['local_name']
				
				Path = Path.replace(/\\/g,"/")
				
				var nonePath = this.$TGYC.nonePath
				var pathData = {
					nonePath:nonePath,
					filePath:Path
				}
				pathData = JSON.stringify(pathData)
				pathData = encodeURI(pathData);
				console.log(pathData)
				let Pathfile = 'openProject("' + pathData + '")';
				this.$CSINTERFACE.evalScript(Pathfile, (el) => {
					if(el!="err"){
						// 修正资源颜色
						// this.getTaskResources()
						this.setTaskResourcesStateColor()
					}
				})
				
			},
			
			
			//上传工程
			uploadProject() {
				// console.log('上传工程')
				// console.log("检测是否是最新工程")
				
				if(!this.currentUserJurisdiction.taskUploadProject){
					this.$TGYC.sendErr("您没有权限！！！");
					return false
				};
				
				// 获取并检查编辑状态
				let currentTaskData = {
					id: this.taskId
				}
				this.$PRAPI.prtask.GetDetails(currentTaskData).then(res => {
					console.log("任务信息")
					console.log(res)
					this.taskData = res
					var roleData = this.taskData.role_id
					this.taskData.role_id = roleData == null || roleData == '' || roleData == 'null' || roleData == undefined ? [] : JSON.parse(roleData)
					
					var lock_state = res.lock_state
					var lock_id = res.lock_id
					var lock_name = res.lock_name
					if(lock_state=="1"&&lock_id==this.$store.state.userInfo.id){
						
						this.$CSINTERFACE.evalScript('savePr()', (el) => {
							
							
							// 获取任务最新工程文件
							var taskNewData = {
								prtask_id: this.taskId
							}
							this.$PRAPI.prtaskHistory.GetNewPrtask(taskNewData).then(res => {
								// console.log("资源信息")
								// console.log(res)
								this.taskFileData = res
								// 检测是否可以上传
								var isUpload = false  //是否执行上传逻辑
								var projectDataUp = {
									id:this.taskId
								}
								
								this.$TGYC.getProjectLocalData(projectDataUp).then(res => {
									var currentProject = res
									console.log('最新工程为')
									console.log(this.taskFileData['md5'])
									var oldPath = this.taskFileData['local_url']
									var oldName = this.taskFileData['local_name']
									var isNewProject = false
									if(currentProject!=""){
										var localMd5 = currentProject.md5
										if(localMd5==this.taskFileData['md5']){
											isUpload = true
										}else{
											this.$notify({
												message: '请下载最新版本工程编辑后再重新上传',
												type: 'warning',
									position: 'bottom-right'
											});
										}
									}else if(this.taskFileData['md5']==""||this.taskFileData['md5']==undefined||this.taskFileData['md5']=="null"){
										isUpload = true
										isNewProject = true
									}else{
										this.$notify({
											message: '请下载最新版本工程编辑后再重新上传',
											type: 'warning',
									position: 'bottom-right'
										});
									}
									if(!isUpload){return false}
									
									let data = {
										id: this.taskId,
										type: 0,
										operation: 0,
										prtask_id: this.taskId,
										project_id: this.projectId,
										personnel_id: this.$store.state.userInfo.id,
										personnel_name: this.$store.state.userInfo.name,
										version: '1',
										thum: this.taskData.thum,
										local_url: '',
										local_name: '',
										service_url: '',
										service_name: '',
										md5: '',
										size: '',
										introduction: this.projectVersionIntroduction,
										identifycode: '',
										sqpreset:'',//预设
									}
									
									var options = {
										text:"分析工程剪辑中，请稍候..."
									}
									this.sysLoading =Loading.service(options);
									//获取项目信息
									this.$CSINTERFACE.evalScript('getProjectPathAndClips()', (el) => {
										//currentProject.documentID     c7fc04fa-fc19-40e8-a245-8a928805b539
										console.log("项目信息")
										console.log("------------")
										console.log(el)
										if (el != undefined&&el!="err") {
											var currentProject = JSON.parse(el)
											if(currentProject.documentID!="c7fc04fa-fc19-40e8-a245-8a928805b539"){
												
												
												var currentClips = this.setProjectItemData(currentProject.clips)
												var path = currentProject.path + '/' + currentProject.name;
												console.log(path)
												// console.log('检测到文件名称或路径与之前路径不一致，请检查后再上传')
												
												var startUploadProject = ()=>{
													this.sysLoading.close();
													//查看文件大小，判断文件是否能找到
													this.$FS.stat(path, (err, stats) => {
														if (!err) {
															var size = stats.size
															//获取最后修改日期
															var mtimeMs = stats.mtimeMs
															
															mtimeMs = this.$TGYC.setFaileStamp(mtimeMs)
															mtimeMs = parseInt(mtimeMs)
																					
															var md5sum = this.$CRYPTO.createHash('md5');
															var stream = this.$FS.createReadStream(path);
															stream.on('data', (chunk) => {
																md5sum.update(chunk);
															});
															stream.on('end', () => {
																var str = md5sum.digest('hex');
																var currentMd5 = this.taskFileData.md5
																if(str!=currentMd5){
																	
																	var serviceUrl = '/assets/' + this.$TGYC.getDateYMD();
																	
																	var local_path = currentProject.path
																	local_path = local_path.replace(/\\/g,"/")
																	data.local_url = local_path
																	data.local_name = currentProject.name
																	data.service_url = serviceUrl
																	data.service_name = 'pro' + this.taskId + str + currentProject.name.slice(currentProject.name.lastIndexOf('.'), currentProject
																		.name.length);
																	data.md5 = str
																	data.size = size
																	data.updtime = mtimeMs
																	data.identifycode = currentProject.documentID
																	data.clips =	JSON.stringify(currentClips)
																	
																	data.process = 0
																	data.state = '等待上传'
																	
																	this.taskUpload = true
																	this.taskUploadPrss = 0
																	
																	var projectData = {
																		id:data.prtask_id,
																		md5:str,
																		version:0,
																		local_url:local_path,
																		local_name:currentProject.name,
																	}
																					
																	data.setComplete = (data) =>{	//完成回调
																		console.log('工程上传完成')
																		this.taskUploadPrss = 100
																		this.taskUpload = false
																		
																		this.$PRAPI.prtaskHistory.AddPrtaskHistory(data).then(res => {
																			console.log('添加成功')
																			this.projectVersionIntroduction = "";
																			//重新获取最新任务数据
																			this.getNewTask()
																		}, err => {
																			console.log(err)
																		});
																		
																		this.$TGYC.setProjectLocalData(projectData)
																		
																		//是否解除编辑状态
																		this.$confirm('上传完成，是否解除编辑？', '解除编辑', {
																			confirmButtonText: '确定',
																			cancelButtonText: '取消',
																			type: 'warning'
																		}).then(() => {
																			this.setUnLockTask()
																		}).catch(() => {
																		});
																	}
																	
																	data.setProgress = (passNum) =>{	//进度回调
																		this.taskUploadPrss = passNum
																		this.taskUpload = true
																	}
																	
																	//检测是否在上传队列
																	function findFileList(list){
																		return list.local_name == data.local_name && list.local_url == data.local_url
																	}
																	var isInUpload = this.$parent.fileManageList.fileUpload.findIndex(findFileList)
																	if(isInUpload==-1){
																		this.$parent.fileManageList.fileUpload.unshift(data)
																		this.$parent.fileManageList.num = this.$parent.fileManageList.num +1
																		this.$parent.fileManage(data)
																	}
																	
																		
																}else{
																	console.log('版本相同')
																	this.$notify({
																			  message: '版本相同,无法上传',
																			  type: 'warning'
																	});
																}
																					
															});
														} else {
															console.log('文件未找到')
														}
													})
												}
												
												var currentPath = currentProject.path
												currentPath = currentPath.replace(/\\/g,"/")
												if(currentPath!=oldPath||currentProject.name!=oldName){
													if(isNewProject){
														startUploadProject()
													}else{
														this.$confirm('检测到文件名称或路径与之前路径不一致，是否继续上传', '提示', {
															confirmButtonText: '确定',
															cancelButtonText: '取消',
															type: 'warning'
														}).then(() => {
															startUploadProject()
														}).catch(() => {
															   
														});
													}
												}else{
													startUploadProject()
												}
											}else{
												this.sysLoading.close();
												this.$notify({
													message: '请不要上传模板工程！！！',
													type: 'warning'
												});
											}
										} else {
											console.log('没有找到项目信息')
										}
									})
									//分析资源剪辑，更新服务器文件记录剪辑位置
									// this.$CSINTERFACE.evalScript('getProjectItemClip()', (el) => {
									// 	console.log("项目项剪辑信息")
									// 	console.log(el)
									// 	this.setProjectItemData(el)
									// })
									
								}, err => {
									
								});
								
								
								
							}, err => {
								console.log(err)
							});
						})	
					}else if(lock_state=="0"){
						//请先锁定，然后再上传
						this.$notify({
						    message:"请先选择编辑，然后再上传!!!",
						    type: 'warning',
									position: 'bottom-right'
						});
					}else{
						// 任务被锁定
						this.$notify({
						    message: lock_name + "正在编辑该文件,无法上传,如需上传,请联系编辑人解除编辑状态!!!",
						    type: 'warning',
									position: 'bottom-right'
						});
					}
					
				}, err => {
					console.log(err)
				});
				
			},
			
			//处理项目剪辑信息
			setProjectItemData(data){
				var clipsData = [];
				var ProjectItemData = data
				var resData = this.taskfileList;
				for(var i=0;i<ProjectItemData.length;i++){
					var itemPath = ProjectItemData[i].path
					var itemClips = ProjectItemData[i].clips
					function findItem(list){
						var listPath = list.local_url + "/" + list.local_name;
						return listPath == itemPath
					}
					var itemIndex = resData.findIndex(findItem)
					if(itemIndex>-1){
						for(var b=0;b<itemClips.length;b++){
							var thArr = {
								project_id:this.projectId,
								prtask_id:this.taskId,
								prresources_id:resData[itemIndex].id,	
								tracksType:itemClips[b].tracksType,		
								duration:itemClips[b].duration.seconds,		
								duration_ticks:itemClips[b].duration.ticks,	
								start:itemClips[b].start.seconds,			
								start_ticks:itemClips[b].start.ticks,		
								end:itemClips[b].end.seconds,			
								end_ticks:itemClips[b].end.ticks,		
								inPoint:itemClips[b].inPoint.seconds,			
								inPoint_ticks:itemClips[b].inPoint.ticks,	
								outPoint:itemClips[b].outPoint.seconds,		
								outPoint_ticks:itemClips[b].outPoint.ticks,
								speed:itemClips[b].speed,
								frame:itemClips[b].frame,
								location:itemClips[b].tracksNum
							}
							clipsData.push(thArr)
						}
					}else{
						
					}
				}
				return clipsData
			},
			

			downProjectFile() {
				let data = {
					prtask_id: this.taskId
				}
				this.$PRAPI.prtaskHistory.GetNewPrtask(data).then(res => {
					console.log("最新下载数据")
					console.log(res)
					this.taskFileData = res
					this.taskIdentifyCode = res.identifycode
		
					this.taskUpload = true
					this.taskUploadPrss = 0
					
					var projectData = {
						id:this.taskFileData['prtask_id'],
						md5:this.taskFileData['md5'],
						version:this.taskFileData['time'],
						local_url:this.taskFileData['local_url'],
						local_name:this.taskFileData['local_name'],
					}
					var downData = {
						"id": this.taskFileData['prtask_id'],
						"type": 1,
						"operation": 0,
						"local_name": this.taskFileData['local_name'],
						"local_url": this.taskFileData['local_url'],
						"service_name": this.taskFileData['service_name'],
						"service_url": this.taskFileData['service_url'],
						"process" : 0,
						"md5":this.taskFileData['md5'],
						"updtime":this.taskFileData['updtime'],
						"state" : '等待下载',
						"setComplete" : (data) =>{	//完成回调
							
							this.taskUploadPrss = 100
							this.taskUpload = false
							// 录入工程信息
							this.$TGYC.setProjectLocalData(projectData)
							// 下载最新工程后重新打开
							var Path = projectData.local_url + '/' + projectData.local_name
							var nonePath = this.$TGYC.nonePath
							var pathData = {
								nonePath:nonePath,
								filePath:Path
							}
							pathData = JSON.stringify(pathData)
							pathData = encodeURI(pathData);
							let Pathfile = 'openProject("' + pathData + '")';
							this.$CSINTERFACE.evalScript(Pathfile, (el) => {
								// this.setTaskResourcesStateColor()
								if(el!="err"){
									this.getTaskResources()
								}	
							})
							
						},
						"setProgress" : (passNum) =>{	//进度回调
							this.taskUploadPrss = passNum
							this.taskUpload = true
						},
					}
					
					//检测是否在上传队列
					function findFileList(list){
						return list.local_name == downData.local_name && list.local_url == downData.local_url
					}
					var isInFileList = this.$parent.fileManageList.fileDown.findIndex(findFileList)
					if(isInFileList==-1){
						this.$parent.fileManageList.fileDown.unshift(downData)
						this.$parent.fileManageList.num = this.$parent.fileManageList.num +1
						this.compareProFile(downData)
					}
				}, err => {
					console.log(err)
				});
					
			},
			//对比工程版本
			compareProFile(data){
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
						
						that.taskUploadPrss = 100
						that.taskUpload = false
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
							//验证版本
							var md5sum = this.$CRYPTO.createHash('md5');
							var stream = this.$FS.createReadStream(path);
							stream.on('data', (chunk) => {
								md5sum.update(chunk);
							});
							stream.on('end', () => {
								var str = md5sum.digest('hex');
								var currentMd5 = str
								
								if(currentOldMd5!=currentMd5){
									// console.log('版本不一致')
									this.$parent.fileManage(data)
								}else{
									// console.log('服务器md5版本一致,无需下载')
									removeFile('版本一致')
									var projectData = {
										id:this.taskFileData['prtask_id'],
										md5:this.taskFileData['md5'],
										version:this.taskFileData['time'],
										local_url:this.taskFileData['local_url'],
										local_name:this.taskFileData['local_name'],
									}
									this.$TGYC.setProjectLocalData(projectData)
									
									var Path = projectData.local_url + '\\' + projectData.local_name
									Path = Path.replace(/\\/g,"/")
									var nonePath = this.$TGYC.nonePath
									var pathData = {
										nonePath:nonePath,
										filePath:Path
									}
									pathData = JSON.stringify(pathData)
									pathData = encodeURI(pathData);
									let Pathfile = 'openProject(' + pathData + ')';
									this.$CSINTERFACE.evalScript(Pathfile, (el) => {
										if(el!="err"){
											this.setTaskResourcesStateColor()
										}
									})
									
								}
							});
						}else{
							// console.log('服务器版本一致,无需下载')
							var projectData = {
								id:this.taskFileData['prtask_id'],
								md5:this.taskFileData['md5'],
								version:this.taskFileData['time'],
								local_url:this.taskFileData['local_url'],
								local_name:this.taskFileData['local_name'],
							}
							this.$TGYC.setProjectLocalData(projectData)
							
							var Path = projectData.local_url + '\\' + projectData.local_name
							Path = Path.replace(/\\/g,"/")
							var nonePath = this.$TGYC.nonePath
							var pathData = {
								nonePath:nonePath,
								filePath:Path
							}
							pathData = JSON.stringify(pathData)
							pathData = encodeURI(pathData);
							let Pathfile = 'openProject("' + pathData + '")';
							this.$CSINTERFACE.evalScript(Pathfile, (el) => {
								if(el!="err"){
									this.setTaskResourcesStateColor()
								}
							})
							
							removeFile('版本一致')
						}
					} else {
						// console.log('文件未找到')
						this.$parent.fileManage(data)
					}
				})
			},
			
			
			//下载全部资源
			downRes() {
				var downData = []
				var resData = this.taskfileList
				console.log('索引下载文件')
				
				//验证本地版本，本地没有的下载，有的验证最后修改日期，不一样的验证版本，一样的下载，验证版本，版本不一样的下载
				
				for (var i = 0; i < resData.length; i++) {
					
					if(resData[i]['local_name'] != null&&resData[i]['local_name'] != ''){
						
						var currentMtimeMs = resData[i].updtime
						var	currentMd5 = resData[i].md5
						
						this.taskfileList[i].upState = true
						this.taskfileList[i].pass = 0
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
								this.taskfileList[data.index].upState = false
							},
							"setProgress" : (passNum,data) =>{	//进度回调
								this.taskfileList[data.index].upState = true
								this.taskfileList[data.index].pass = passNum
							},
						}
					
						this.$parent.fileManageList.fileDown.unshift(newArr)
						this.$parent.fileManageList.num = this.$parent.fileManageList.num +1
						
						this.compareFile(newArr)
						// this.$parent.fileManage(newArr)
						
					}
					
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
								
							},
							"setProgress" : (passNum,data) =>{	//进度回调
								
							},
						}
						
						//检测是否在下载队列
						function findFileList(list){
							return list.local_name == newArr.local_name && list.local_url == newArr.local_url 
						}
						var isInFileList = this.$parent.fileManageList.fileDown.findIndex(findFileList)
						if(isInFileList==-1){
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
							return list.local_name == newArr.local_name && list.local_url == newArr.local_url
						}
						var isInFileList = this.$parent.fileManageList.fileDown.findIndex(findFileList)
						if(isInFileList==-1){
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
							this.$parent.fileManage(data)
						}else{
							console.log('服务器版本一致,无需下载')
							removeFile('版本一致')
						}
					} else {
						// console.log(path)
						// console.log('文件未找到')
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
			
			openFileListBox(data){
				console.log("详情")
				console.log(data)
				this.fileListBox = true;
				this.fileListData = data;
			},
			closeFileListBox(){
				this.fileListBox = false;
				this.fileListData = [];
			},
			
			// this.selectedList
			
			
			
			// 获取用户
			getUser(){
				this.$PRAPI.personnel.GetAllPersonnel().then(res => {
					this.setUserList(res);
				}, err => {
					console.log(err);
				});
			},
			// 获取外包公司列表
			getCompany(){
				var data = {
					vicecompany : this.$store.state.userInfo.companyid
				};
				this.$PRAPI.company.GetParentCompany(data).then(res => {
					this.companylList = res;
					// console.log("公司列表")
					// console.log(res)
				}, err => {
					console.log(err);
				});
			},
			// 设置用户
			setUserList(data){
				this.personnelList = data;
				// console.log(this.personnelList);
			},
			setPersonnel(){
				// 设置资源负责人、
				console.log("设置负责人");
				this.getUser();
				this.getCompany();
				this.newResPersonnelBox = true;
				this.selectPersonnel = "";
				this.selectCompany = "";
				this.makeType = "0";
				
			},
			submitResPersonnel(){
			
				var currentOutsourcing = this.makeType;
				var currentCompany_id = this.selectCompany;
				var currentCompany_name = "";
				var currentSelectPersonnel = this.selectPersonnel;
				var currentPersonnelName = "";
				if(currentOutsourcing=="0"){
					
					if(currentSelectPersonnel==0||currentSelectPersonnel==""){
						// console.log(666)
						this.$notify({
						    message: '负责人不能为空，请选择后重试！',
						    type: 'warning',
									position: 'bottom-right'
						});
						return false
					}else{
						function findPersonnel(list){
							return list.id == currentSelectPersonnel
						}
						var personnelIndex = this.personnelList.findIndex(findPersonnel);
						if(personnelIndex>-1){
							currentPersonnelName = this.personnelList[personnelIndex].name;
							currentCompany_id = ""
							currentCompany_name = ""
						};
					}
					
				}else if(currentOutsourcing=="1"){
					if(currentCompany_id==0||currentCompany_id==""){
						this.$notify({
						    message: '公司不能为空，请选择公司后重试!',
						    type: 'warning',
									position: 'bottom-right'
						});
						return false
					}else{
						function findCompany(list){
							return list.id == currentCompany_id
						}
						var companyIndex = this.companylList.findIndex(findCompany);
						if(companyIndex>-1){
							currentCompany_name = this.companylList[companyIndex].name;
							currentSelectPersonnel = ""
							currentPersonnelName = ""
						};
					}
				}
				
					
				var selectionData = this.selectedList;
				var currentIdentifyCode = this.taskIdentifyCode;
				var pathData = [];
				for(var i=0;i<selectionData.length;i++){
					var thArr = {
						local_name:selectionData[i].local_name,
						local_url:selectionData[i].local_url
					};
					pathData.push(thArr);
				};
				
				if(currentOutsourcing=="0"||currentOutsourcing=="1"){
					let data = {
						identifyCode:currentIdentifyCode,
						pathList:JSON.stringify(pathData),
						personnelId:currentSelectPersonnel,
						personnelName:currentPersonnelName,
						outsourcing:currentOutsourcing,
						company_id:currentCompany_id,
						company_name:currentCompany_name,
					};
					this.$PRAPI.prResourcesRecord.BatchupdPathPersonnel(data).then(res => {
						// console.log("负责人设置成功")
						this.closeResPersonnel();
					}, err => {
						console.log(err);
					});
				}else if(currentOutsourcing=="2"){
					let data = {
						identifyCode:currentIdentifyCode,
						pathList:JSON.stringify(pathData),
						pubresource:1
					};
					this.$PRAPI.prResourcesRecord.BatchupdPathPerpub(data).then(res => {
						this.closeResPersonnel();
					}, err => {
						console.log(err);
					});
				}else if(currentOutsourcing=="3"){
					let data = {
						identifyCode:currentIdentifyCode,
						pathList:JSON.stringify(pathData),
						pubresource:0
					};
					this.$PRAPI.prResourcesRecord.BatchupdPathPerpub(data).then(res => {
						this.closeResPersonnel();
					}, err => {
						console.log(err);
					});
				}
						
			
			},
			closeResPersonnel(){
				console.log("关闭选择负责人");
				this.newResPersonnelBox = false;
				this.selectPersonnel = "";
				this.selectCompany = "";
				this.makeType = "0";
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
			//查看工程历史记录
			openProjectTaskHistory(){
				this.$router.push({
					path: '/index/project/taskHistory',
					query: {
						taskId: this.taskId
					},
				})
			},
			uploadfile(file){
				var noneAudioNum = -1;
				var startUploadFile = ()=>{
					this.noneAudioNum = noneAudioNum;
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
									var options = {
										text:"数据分析中，请稍候"
									}
									var loadingInstance =Loading.service(options);
									try{
										
										this.setXlsxData(obj)
										// loadingInstance.close();
									}catch(e){
										loadingInstance.close();
										this.$TGYC.sendErr("表格处理错误，请检查填写格式是否正确！！！")
										
									}
								}else{
									this.$TGYC.sendErr("请下载模板编辑后上传，本功能不识别其他文件！！！")
								}
								
							}
						}
					})
				}
				
				// 先检查是否有空音轨
				this.$CSINTERFACE.evalScript('getProjectClipSynopsis()', (el) => {
					console.log("项目信息")
					console.log("------------")
					console.log(el)
					if (el != undefined&&el!="err") {
						// 搜寻空音轨
						var thData = JSON.parse(el);
						var audioData = thData.audioTracks;
						for(var i=audioData.length-1;i>=0;i--){
							if(audioData[i].count==0){
								noneAudioNum = audioData[i].trackNum
								break
							}
						}
						if(noneAudioNum!=-1){
							console.log("执行复制")
							
							startUploadFile()
						}else{
							this.$TGYC.sendErr("未检测到空声音轨道，请检查或新建！！！")
						}
					}
					
				})
					
					
					
				
			},
			setXlsxData(data){
				
				var sheetsData = data.Sheets.SheetJS
				// 季
				var currentSeason = sheetsData.A2.v
				//节点
				var currentNode = sheetsData.B2.v
				//新节点
				var currentNewNode = sheetsData.C2.v
				//轨道
				var currentTrack = sheetsData.D2.v
				
				// console.log(currentSeason)
				// console.log(currentNode)
				// console.log(currentTrack)
				
				var refNum = sheetsData["!ref"]
				// console.log(refNum)
				
				var start = refNum.slice(0, refNum.lastIndexOf(':'));
				start = start.replace(/[^0-9]/ig,"");
				var end = refNum.slice(refNum.lastIndexOf(':')+1, refNum.length);
				end = end.replace(/[^0-9]/ig,"");
				// console.log(start)
				// console.log(end)
				
				var listData = [];
				var listPathArr = []
				for (var i=5;i<=end;i++) {
					var codeName = "A" + i;
					
					if(sheetsData[codeName]){
						var name = sheetsData[codeName].v
						
						// console.log(name)
						var namePre = name.slice(0, name.indexOf("_"));
						var nameNext = name.slice(name.indexOf("_"), name.length);
						name = currentSeason + "_" + namePre + "_" + currentNode + nameNext + ".mov"
						var newName = currentSeason + "_" + namePre + "_" + currentNewNode + nameNext + ".mov"
						var newJpgName = currentSeason + "_" + namePre + "_" + currentNewNode + nameNext + ".jpg"
						var path = sheetsData["B" + i].v
						path = path.replace(/\\/g,"/");
						var newPath = sheetsData["C" + i].v
						newPath = newPath.replace(/\\/g,"/");
						var thArr = {
							name:name,
							newName:newName,
							jpgName:newJpgName,
							path:path,
							newPath:newPath,
							trackNum:currentTrack,
							listData:[],
							noneAudioNum:this.noneAudioNum
						}
						// console.log(thArr)
						function findFile(list){
							return list.local_name == name && list.local_url == path
						}
						var inFileIndex = this.taskfileList.findIndex(findFile)
						if(inFileIndex>-1){
							thArr.isIn = true
							thArr.data = this.taskfileList[inFileIndex]
							listPathArr.push(path+"/"+name)
						}else{
							thArr.isIn = false
							thArr.data = {}
						}
						listData.push(thArr)
					}
				}
				
				
				
				
				
				
				// 传参:
					// {
					// 	trackNum:3,
					// 	resData:[
					// 		"P:/test/E02/Animation/Avi/J1_E06_ani_SC01_shot023.mov",
					// 		"P:/test/E02/Animation/Avi/J1_E06_ani_SC01_shot024.mov"
					// 	]
					// }
				// 返回数据:
					// {
					// 	trackData:[
					// 		{
					// 			"path": "P:/test/E02/Animation/Avi/J1_E06_ani_SC01_shot023.mov",
					// 			"clips": [{
					// 				"tracksType": "videoTracks",
					// 				"tracksNum": 0,
					// 				"duration": {
					// 					"seconds": 3.88,
					// 					"ticks": "985582080000"
					// 				},
					// 				"start": {
					// 					"seconds": 10.76,
					// 					"ticks": "2733212160000"
					// 				},
					// 				"end": {
					// 					"seconds": 14.64,
					// 					"ticks": "3718794240000"
					// 				},
					// 				"inPoint": {
					// 					"seconds": 0,
					// 					"ticks": "0"
					// 				},
					// 				"outPoint": {
					// 					"seconds": 3.88,
					// 					"ticks": "985582080000"
					// 				}
					// 			}]
					// 		}
					// 	],
					// 	resData:[
					// 		{
					// 			"path": "P:/test/E02/Animation/Avi/J1_E06_ani_SC01_shot023.mov",
					// 			"clips": [{
					// 				"tracksType": "videoTracks",
					// 				"tracksNum": 0,
					// 				"duration": {
					// 					"seconds": 3.88,
					// 					"ticks": "985582080000"
					// 				},
					// 				"start": {
					// 					"seconds": 10.76,
					// 					"ticks": "2733212160000"
					// 				},
					// 				"end": {
					// 					"seconds": 14.64,
					// 					"ticks": "3718794240000"
					// 				},
					// 				"inPoint": {
					// 					"seconds": 0,
					// 					"ticks": "0"
					// 				},
					// 				"outPoint": {
					// 					"seconds": 3.88,
					// 					"ticks": "985582080000"
					// 				}
					// 			}]
					// 		}
					// 	]
					// }
				
				
				// 匹配剪辑信息,查看复制到的轨道内是否有冲突
				//查询素材列表中的资源及指定轨道的剪辑信息
				// this.$CSINTERFACE.evalScript("getProjectPathAndClips()", (el) => {
				// 	console.log("项目剪辑信息")
				// 	console.log(el)
				// 	计算每个对象的剪辑,并将需要复制的轨道保留
				// })
				
				var trackData = {
					trackNum:currentTrack,
					resData:listPathArr
				}
				var importData = JSON.stringify(trackData);
				console.log(importData)
				importData = encodeURI(importData);
				console.log(importData)
				var jsonfnPath = 'getResAndTrackClips("'+importData+'")';
				var options = {
					text:"剪辑数据分析中，请稍候"
				}
				var loadingInstance =Loading.service(options);
				this.$CSINTERFACE.evalScript(jsonfnPath, (el) => {
					
					// console.log("导入完成")
					// console.log(needCopyData)
					// console.log(el)
					// console.log(listData)
					
					//处理剪辑数据，匹配到数据中，轨道有占用不可以提交
					// 匹配clips
					var allResData = JSON.parse(el)
					var resData = allResData.resData;
					var trackData = allResData.trackData;
					var timeArr = []
					for(var i=0;i<resData.length;i++){
						
						// 计算时段
						var clipsArr = resData[i].clips;
						for(var b=0;b<clipsArr.length;b++){
							var startTime = clipsArr[b].start.seconds;
							var endTime = clipsArr[b].end.seconds;
							
							function findTime(list){
								var currentStart = list.start
								var currentEnd = list.end
								return (startTime>=currentStart&&endTime<=currentEnd)||(startTime<=currentStart&&endTime<=currentEnd&&endTime>=currentStart)||(startTime<=currentStart&&endTime>=currentEnd)||(startTime>=currentStart&&endTime>=currentEnd&&startTime<=currentEnd)
							}
							var timeIndex = timeArr.findIndex(findTime)
							if(timeIndex==-1){
								var thTimeArr = {
									start:startTime,
									end:endTime
								}
								timeArr.push(thTimeArr)
							}else{
								if(startTime<timeArr[timeIndex].start){
									timeArr[timeIndex].start = startTime
								}
								if(endTime>timeArr[timeIndex].end){
									timeArr[timeIndex].end = endTime
								}
							}
							
						}
						function findRes(list){
							var fileName = list.path + "/" + list.name
							return fileName==resData[i].path
						}
						var fileIndex = listData.findIndex(findRes);
						if(fileIndex>-1){
							listData[fileIndex].clips = resData[i].clips
						}
					}
					//纠正时间重复
					// 按start排序
					timeArr.sort(function(a,b){return a.start-b.start})
					// console.log(timeArr)
					
					var newTimeArr = [];
					var sortStart;
					var sortEnd;
					for(var i=0;i<timeArr.length;i++){
						if(i==0){
							newTimeArr.push(timeArr[i])
							sortStart = timeArr[i].start
							sortEnd = timeArr[i].end
						}else{
							if(timeArr[i].start>=sortStart&&timeArr[i].start<=sortEnd&&timeArr[i].end>=sortEnd){
								newTimeArr[newTimeArr.length-1].end = timeArr[i].end
								sortEnd = timeArr[i].end
							}else if(timeArr[i].start>sortEnd){
								newTimeArr.push(timeArr[i])
								sortStart = timeArr[i].start
								sortEnd = timeArr[i].end
							}
						}
					}
					
					var errArr = [];
					for(var i=0;i<trackData.length;i++){
						var trackStart = trackData[i].start.seconds;
						var trackEnd = trackData[i].end.seconds;
						
						function findTimeArr(list){
							var currentStart = list.start
							var currentEnd = list.end
							return (trackStart>=currentStart&&trackEnd<=currentEnd)||(trackStart<=currentStart&&trackEnd>currentStart)||(trackStart>currentStart&&trackStart<currentEnd&&trackEnd>currentEnd)||(trackStart<=currentStart&&trackEnd>currentEnd)
						}
						
						var trackIndex = newTimeArr.findIndex(findTimeArr)
						if(trackIndex>-1){
							errArr.push(trackData[i])
						}
					}
					
					this.xlsxErrArr = errArr
					// console.log(listData)
					// console.log(timeArr)
					// console.log(newTimeArr)
					// console.log(errArr)
					// 检察对比时间轴,异常报警
					
					this.xlsxData = listData
					this.xlsxDataShowBox = true
					loadingInstance.close();
				})
				
			},
			// 提交信息
			submitXlsxEdit(){
				if(this.xlsxErrArr.length>0){
					this.$TGYC.sendErr("请先处理轨道冲突数据，然后再执行操作！！！")
					this.closeXlsxEdit()
					return false;
				}
				//处理数据，对未找到的数据做提醒
				var needCopyData = [];
				var errData = [];
				var fileData = this.xlsxData;
				for(var i=0;i<fileData.length;i++){
					if(fileData[i].isIn){
						needCopyData.push(fileData[i])
					}else{
						errData.push(fileData[i])
					}
				}
				
				var copyType = this.copyType;
				if(copyType=="2"){
					needCopyData.forEach((item)=>{
						item.name = "frame.jpg"
						item.path = "C:/TGYC"
						item.newName = item.jpgName
						return item
					})
				}
				console.log("单帧复制数据")
				console.log(needCopyData)
				
				var submitCopyFc = ()=>{
					if(needCopyData.length>0){
						this.closeXlsxEdit()
						this.$parent.startCopyFc(needCopyData)
					}else{
						this.$TGYC.sendErr("没有可执行文件，请排查后重试！！！")
					}
				}
				
				if(errData.length>0){
					this.$confirm('存在未找到资源，是否依然提交？提交将跳过未找到资源！！', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						submitCopyFc()
					}).catch((err) => {
						console.log("退出提交")
						console.log(err)
					});
				}else{
					submitCopyFc()
				}
				
				//验证文件本地是否存在，如果不存在就开始下载
				
				//复制文件
				
				//导入文件
				
				//处理剪辑
				
				//提交更改
				
			},
			//	取消修改
			closeXlsxEdit(){
				this.xlsxDataShowBox = false
			},
			
			// 下载复制模板
			downCopyModel(){
				var filePath = this.$DIR + "/assets/copyModel.xlsx";
				var myhome = this.$OS.homedir();
				var newFilePath = myhome + "\\Desktop\\轨道复制模板(按季与模块).xlsx"
				this.downCopyFile(filePath,newFilePath)
			},
			// 下载复制模板
			downCopyNewModel(){
				var filePath = this.$DIR + "/assets/copyNewModel.xlsx";
				var myhome = this.$OS.homedir();
				var newFilePath = myhome + "\\Desktop\\轨道复制模板(按节点英文名).xlsx"
				this.downCopyFile(filePath,newFilePath)
			},
			// 下载重命名模板
			downCopyReNameModel(){
				var filePath = this.$DIR + "/assets/copyReNameModel.xlsx";
				var myhome = this.$OS.homedir();
				var newFilePath = myhome + "\\Desktop\\文件重命名模板.xlsx"
				this.downCopyFile(filePath,newFilePath)
			},
			
			downCopyFile(filePath,newFilePath){
				this.$FS.copyFile(filePath,newFilePath,(err)=>{
					if(!err){
						// console.log("文件复制成功")
						this.$notify({
						  message: '导出到桌面成功',
						  type: 'success',
									position: 'bottom-right'
						});
						
					}else{
						this.$TGYC.sendErr("下载失败，请重试或联系管理人员")
					}
				})
			},
			
			//任务框右键
			xlsxErrArrMenu(ticks,event) {
				
				var currentStateList = [
					
					{
						label: "转到播放点",
						onClick: () => {
							this.jumpPosition(ticks)
						}
					},
					
				]
				this.$contextmenu({
					items:currentStateList,
					event,
					customClass: "tgycContextMenu",
					zIndex: 9999,
					minWidth: 130,
				});
				return false;
			},
			
			jumpPosition(thTicks){
				console.log(thTicks)
				var jsonfnPath = 'jumpPlayPosition("'+thTicks+'")';
				this.$CSINTERFACE.evalScript(jsonfnPath, (el) => {
					
				})
			},
			uploadfileNew(){
				var noneAudioNum = -1;
				var startUploadFileNew = ()=>{
					this.noneAudioNum = noneAudioNum;
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
									this.copyXlsxData = obj;
									try{
										this.getProjectConf(obj)
									}catch(e){
										this.$TGYC.sendErr("表格处理错误，请检查填写格式是否正确！！！")
									}
									
								}else{
									this.$TGYC.sendErr("请下载模板编辑后上传，本功能不识别其他文件！！！")
								}
							}
						}
					})
				}
				
				
				
				
				// 先检查是否有空音轨
				this.$CSINTERFACE.evalScript('getProjectClipSynopsis()', (el) => {
					console.log("项目信息")
					console.log("------------")
					console.log(el)
					if (el != undefined&&el!="err") {
						// 搜寻空音轨
						var thData = JSON.parse(el);
						var audioData = thData.audioTracks;
						for(var i=audioData.length-1;i>=0;i--){
							if(audioData[i].count==0){
								noneAudioNum = audioData[i].trackNum
								break
							}
						}
						if(noneAudioNum!=-1){
							console.log("执行复制")
							
							startUploadFileNew()
						}else{
							this.$TGYC.sendErr("未检测到空声音轨道，请检查或新建！！！")
						}
					}
					
				})
			},
			getProjectConf(){
				// 查询任务归属项目的节点列表
				console.log(this.taskProjectId)
				let data = {
					project:this.taskProjectId,
				};
				this.$PRAPI.taskPeoject.GetProjectSynopsis(data).then(res => {
					console.log("项目节点数据")
					console.log(res)
					this.taskProjectNodeList = res;
					this.$CSINTERFACE.evalScript("getProjectTrack()", (el) => {
						console.log(el)
						var thData = el
						thData = JSON.parse(thData)
						this.projectTrackArr = []
						for(var i=0;i<thData.videoTracks;i++){
							this.projectTrackArr.push(i+1)
						}
						this.selectXlsxCountBox = true
					})
					
				}, err => {
					console.log(err);
				});
			},
			
			
			
			
			
			//提交配置
			submitXlsxCount(){
				console.log(this.copyXlsxData)
				console.log(this.currentNode)
				console.log(this.selectNewNode)
				console.log(this.currentTrack)
				this.selectXlsxCountBox = false
				this.setXlsxCountData()
			},
			
			
			
			setXlsxCountData(data){
				var options = {
					text:"数据分析中，请稍候"
				}
				var loadingInstance =Loading.service(options);
				var sheetsData = this.copyXlsxData.Sheets.SheetJS
				//节点
				var currentNode = this.currentNode
				var newNode = this.selectNewNode
				//轨道
				var currentTrack = this.currentTrack
				
				var refNum = sheetsData["!ref"]
				
				var start = refNum.slice(0, refNum.lastIndexOf(':'));
				start = start.replace(/[^0-9]/ig,"");
				var end = refNum.slice(refNum.lastIndexOf(':')+1, refNum.length);
				end = end.replace(/[^0-9]/ig,"");
				
				var listData = [];
				var listPathArr = []
				for (var i=2;i<=end;i++) {
					var codeName = "A" + i;
					
					if(sheetsData[codeName]){
						var taskName = sheetsData[codeName].v
						// console.log(codeName)
						// console.log(name)
						var name = taskName + "_" + currentNode + ".mov"
						var newName = taskName + "_" + newNode + ".mov"
						var newJpgName = taskName + "_" + newNode + ".jpg"
						// console.log("B" + i)
						
						var path = sheetsData["B" + i].v
						// console.log(path)
						path = path.replace(/\\/g,"/");
						var newPath = sheetsData["C" + i].v
						newPath = newPath.replace(/\\/g,"/");
						var thArr = {
							name:name,
							newName:newName,
							path:path,
							newPath:newPath,
							jpgName:newJpgName,
							trackNum:currentTrack,
							noneAudioNum:this.noneAudioNum,
							listData:[]
						}
						// console.log(thArr)
						function findFile(list){
							return list.local_name == name && list.local_url == path
						}
						var inFileIndex = this.taskfileList.findIndex(findFile)
						if(inFileIndex>-1){
							thArr.isIn = true
							thArr.data = this.taskfileList[inFileIndex]
							listPathArr.push(path+"/"+name)
						}else{
							thArr.isIn = false
							thArr.data = {}
						}
						listData.push(thArr)
					}
				}
				
				
				
				
				
				
				// 传参:
					// {
					// 	trackNum:3,
					// 	resData:[
					// 		"P:/test/E02/Animation/Avi/J1_E06_ani_SC01_shot023.mov",
					// 		"P:/test/E02/Animation/Avi/J1_E06_ani_SC01_shot024.mov"
					// 	]
					// }
				// 返回数据:
					// {
					// 	trackData:[
					// 		{
					// 			"path": "P:/test/E02/Animation/Avi/J1_E06_ani_SC01_shot023.mov",
					// 			"clips": [{
					// 				"tracksType": "videoTracks",
					// 				"tracksNum": 0,
					// 				"duration": {
					// 					"seconds": 3.88,
					// 					"ticks": "985582080000"
					// 				},
					// 				"start": {
					// 					"seconds": 10.76,
					// 					"ticks": "2733212160000"
					// 				},
					// 				"end": {
					// 					"seconds": 14.64,
					// 					"ticks": "3718794240000"
					// 				},
					// 				"inPoint": {
					// 					"seconds": 0,
					// 					"ticks": "0"
					// 				},
					// 				"outPoint": {
					// 					"seconds": 3.88,
					// 					"ticks": "985582080000"
					// 				}
					// 			}]
					// 		}
					// 	],
					// 	resData:[
					// 		{
					// 			"path": "P:/test/E02/Animation/Avi/J1_E06_ani_SC01_shot023.mov",
					// 			"clips": [{
					// 				"tracksType": "videoTracks",
					// 				"tracksNum": 0,
					// 				"duration": {
					// 					"seconds": 3.88,
					// 					"ticks": "985582080000"
					// 				},
					// 				"start": {
					// 					"seconds": 10.76,
					// 					"ticks": "2733212160000"
					// 				},
					// 				"end": {
					// 					"seconds": 14.64,
					// 					"ticks": "3718794240000"
					// 				},
					// 				"inPoint": {
					// 					"seconds": 0,
					// 					"ticks": "0"
					// 				},
					// 				"outPoint": {
					// 					"seconds": 3.88,
					// 					"ticks": "985582080000"
					// 				}
					// 			}]
					// 		}
					// 	]
					// }
		
				var trackData = {
					trackNum:currentTrack,
					resData:listPathArr
				}
				var importData = JSON.stringify(trackData);
				console.log(importData)
				importData = encodeURI(importData);
				console.log(importData)
				var jsonfnPath = 'getResAndTrackClips("'+importData+'")';
				
				this.$CSINTERFACE.evalScript(jsonfnPath, (el) => {
					
					// console.log("导入完成")
					// console.log(needCopyData)
					// console.log(el)
					// console.log(listData)
					
					//处理剪辑数据，匹配到数据中，轨道有占用不可以提交
					// 匹配clips
					var allResData = JSON.parse(el)
					var resData = allResData.resData;
					var trackData = allResData.trackData;
					var timeArr = []
					for(var i=0;i<resData.length;i++){
						
						// 计算时段
						var clipsArr = resData[i].clips;
						for(var b=0;b<clipsArr.length;b++){
							var startTime = clipsArr[b].start.seconds;
							var endTime = clipsArr[b].end.seconds;
							
							function findTime(list){
								var currentStart = list.start
								var currentEnd = list.end
								return (startTime>=currentStart&&endTime<=currentEnd)||(startTime<=currentStart&&endTime<=currentEnd&&endTime>=currentStart)||(startTime<=currentStart&&endTime>=currentEnd)||(startTime>=currentStart&&endTime>=currentEnd&&startTime<=currentEnd)
							}
							var timeIndex = timeArr.findIndex(findTime)
							if(timeIndex==-1){
								var thTimeArr = {
									start:startTime,
									end:endTime
								}
								timeArr.push(thTimeArr)
							}else{
								if(startTime<timeArr[timeIndex].start){
									timeArr[timeIndex].start = startTime
								}
								if(endTime>timeArr[timeIndex].end){
									timeArr[timeIndex].end = endTime
								}
							}
							
						}
						function findRes(list){
							var fileName = list.path + "/" + list.name
							return fileName==resData[i].path
						}
						var fileIndex = listData.findIndex(findRes);
						if(fileIndex>-1){
							listData[fileIndex].clips = resData[i].clips
						}
					}
					//纠正时间重复
					// 按start排序
					timeArr.sort(function(a,b){return a.start-b.start})
					// console.log(timeArr)
					
					var newTimeArr = [];
					var sortStart;
					var sortEnd;
					for(var i=0;i<timeArr.length;i++){
						if(i==0){
							newTimeArr.push(timeArr[i])
							sortStart = timeArr[i].start
							sortEnd = timeArr[i].end
						}else{
							if(timeArr[i].start>=sortStart&&timeArr[i].start<=sortEnd&&timeArr[i].end>=sortEnd){
								newTimeArr[newTimeArr.length-1].end = timeArr[i].end
								sortEnd = timeArr[i].end
							}else if(timeArr[i].start>sortEnd){
								newTimeArr.push(timeArr[i])
								sortStart = timeArr[i].start
								sortEnd = timeArr[i].end
							}
						}
					}
					
					var errArr = [];
					for(var i=0;i<trackData.length;i++){
						var trackStart = trackData[i].start.seconds;
						var trackEnd = trackData[i].end.seconds;
						
						function findTimeArr(list){
							var currentStart = list.start
							var currentEnd = list.end
							return (trackStart>=currentStart&&trackEnd<=currentEnd)||(trackStart<=currentStart&&trackEnd>currentStart)||(trackStart>currentStart&&trackStart<currentEnd&&trackEnd>currentEnd)||(trackStart<=currentStart&&trackEnd>currentEnd)
						}
						
						var trackIndex = newTimeArr.findIndex(findTimeArr)
						if(trackIndex>-1){
							errArr.push(trackData[i])
						}
					}
					
					this.xlsxErrArr = errArr
					// console.log(listData)
					// console.log(timeArr)
					// console.log(newTimeArr)
					// console.log(errArr)
					// 检察对比时间轴,异常报警
					
					this.xlsxData = listData
					console.log("处理后数据")
					console.log(listData)
					loadingInstance.close();
					this.xlsxDataShowBox = true
					
				})
			},
			
			//	取消修改
			closeXlsxCountBox(){
				this.selectXlsxCountBox = false
			},
			
			//设置资源任务关联
			setResRelation(){
				this.$router.push({
					path: '/index/project/taskRelation',
					query: {
						//pr任务id
						//pr项目id
						//任务项目id
						taskId:this.taskId,
						projectId:this.projectId,
						taskProjectId:this.taskProjectId,
						taskName:this.taskData.name
					},
				})
			},
			
			//重命名资源
			setResName(){
				if(!this.currentUserJurisdiction.resRename){
					this.$TGYC.sendErr("您没有权限！！！");
					return false
				};
				
				var options = {
					text:"正在执行操作，请勿关闭！！！"
				}
				var loadingReName;
				
				var taskResList = this.taskfileList
				
				// 处理表格数据
				var setXlsxData = (thData)=>{
					var sheetsData = thData.Sheets.SheetJS
					
					var refNum = sheetsData["!ref"]
					
					var start = refNum.slice(0, refNum.lastIndexOf(':'));
					start = start.replace(/[^0-9]/ig,"");
					var end = refNum.slice(refNum.lastIndexOf(':')+1, refNum.length);
					end = end.replace(/[^0-9]/ig,"");
					
					var listData = [];
					var errList = [];
					for (var i=2;i<=end;i++) {
						var codeName = "A" + i;
						
						if(sheetsData[codeName]){
							var taskName = sheetsData[codeName].v

							var path = sheetsData["B" + i].v
							path = path.replace(/\\/g,"/");
							
							var newPath = sheetsData["D" + i].v
							newPath = newPath.replace(/\\/g,"/");
							
							var newName = sheetsData["C" + i].v
							
							// taskResList
							// number  path
							
							var thArr = {
								name:taskName,
								newName:newName,
								path:path,
								nPath:newPath,
								oldPath:path+"/"+taskName,
								newPath:newPath+"/"+newName,
							}
							
							function findRes(list){
								return list.number == taskName && list.path == path
							}
							var resIndex = taskResList.findIndex(findRes)
							if(resIndex>-1){
								thArr.id = taskResList[resIndex].id
								listData.push(thArr)
							}else{
								errList.push(thArr)
							}
							
							
						}
					}
					setReNameFile(listData)
					// console.log(listData)
				}	
				
				
				// this.taskfileList
				
				
				//处理文件名称
				var setReNameFile = (thData) =>{
					// 循环重命名文件
					// this.$FS.renameSync(oldPath, newPath)
					for(var i =0;i<thData.length;i++){
						// this.$FS.renameSync(thData[i]['oldPath'], thData[i]['newPath'])
						//创建目录
						this.$TGYC.mkdirsS(thData[i]['nPath']);
						this.$FS.copyFileSync(thData[i]['oldPath'], thData[i]['newPath']);
					}
					
					//替换素材
					var importData = JSON.stringify(thData);
					// console.log(importData)
					importData = encodeURI(importData);
					// console.log(importData)
					var jsonfnPath = 'changeProjectItemPath("'+importData+'")';
					 
					this.$CSINTERFACE.evalScript(jsonfnPath, (el) => {
						// 执行删除原文件操作
						for(var i =0;i<thData.length;i++){
							this.$FS.unlink(thData[i]['oldPath'],()=>{
								
							})
						}
						setServerFile(thData)
						// console.log("删除完毕")
						
					})
				}
				
				var setServerFile = (thData)=>{
					var sendData = [];
					for(var i=0;i<thData.length;i++){
						var thArr = {
							id:thData[i].id,
							name:thData[i].newName,
							path:thData[i].nPath,
						}
						sendData.push(thArr)
					} 
					
					let data = {
						json:JSON.stringify(sendData)
					};
					this.$PRAPI.prResources.SetResurcesName(data).then(res => {
						// 刷新数据
						this.myInit()
						loadingReName.close()
						//上传工程
						this.$notify({
						  message: '修改完成，请上传工程',
						  type: 'success',
									position: 'bottom-right'
						});
					}, err => {
						console.log(err);
					});

				}
				

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
								// this.copyXlsxData = obj;
								try{
									// console.log("上传表格数据")
									// console.log(obj)
									loadingReName =Loading.service(options);
									setXlsxData(obj)
									// this.getProjectConf(obj)
								}catch(e){
									console.log(e)
									loadingReName.close()
									this.$TGYC.sendErr("表格处理错误，请检查填写格式是否正确！！！")
								}
								
							}else{
								this.$TGYC.sendErr("请下载模板编辑后上传，本功能不识别其他文件！！！")
							}
						}
					}
				})
			
				
				
				
				
				
				
			},
			
			
			// 清理跳过剪辑
			clearJumpClips(){
				//获取选中信息
				// 处理数据,找出关联节点的资源，将文件信息状态信息传入
				// 处理选中列表,将跳过节点的剪辑删除
				// console.log(this.taskfileList)
				// 先选中剪辑
				this.$CSINTERFACE.evalScript("getSlectionRes()",(el)=>{
					// console.log('当前选中项为');
					// console.log(el);
					if(el!="err"){
						var elData = JSON.parse(el);
						if(elData.data.length>0){
							var allFile = this.taskfileList;
							var fileData = [];
							for(var i=0;i<allFile.length;i++){
								if(allFile[i].merge_list!=''&&allFile[i].merge_list!='null'&&allFile[i].merge_list!=null&&allFile[i].merge_list!=undefined){
									if(allFile[i].merge_list.state=="6"){
										var filePath = allFile[i].local_url+"/"+allFile[i].local_name
										fileData.push(filePath)
									}
								}
							}
							console.log(fileData)
							//替换素材
							var importData = JSON.stringify(fileData);
							// console.log(importData)
							importData = encodeURI(importData);
							// console.log(importData)
							var jsonfnPath = 'delJumpClips("'+importData+'")';
							var options = {
								text:"处理中，请不要有其他操作！！！"
							}
							var loadingInstance =Loading.service(options);
							this.$CSINTERFACE.evalScript(jsonfnPath, (el) => {
								console.log("清理完成")
								loadingInstance.close()
								this.$notify({
									message: '清理完成,共清除 '+el+' 个',
									type: 'success',
									position: 'bottom-right'
								});
							})
						}else{
							this.$notify({
								message: '请先选中要清理的剪辑',
								type: 'warning',
							  position: 'bottom-right'
							});
						};
					}	
				});
				
				
				
			},
			//设置layout关联
			setLayoutTask(){
				// 获取选中mov
				// 选择layout文件
				// 匹配关联
				this.$CSINTERFACE.evalScript("getSlectionRes()",(el)=>{
					console.log('当前选中项为');
					console.log(el);
					if(el!="err"){
						var elData = JSON.parse(el);
						if(elData.data.length>0){
							// 过滤非layout文件
							var fileData = elData.data
							var layoutArr = []
							var taskData = []
							for(var i=0;i<fileData.length;i++){
								var currentName = fileData[i].fileName
								var currentPath = fileData[i].fileDir
								var layoutIndex = currentName.indexOf("_Layout.mov");
								if(layoutIndex>-1){
									// 匹配任务信息
									var scIndex =  currentName.indexOf("_SC");
									if(scIndex>0){
										var aeStr = currentName.slice(0,scIndex)
										var aindex = aeStr.lastIndexOf("_")
										var ae = aeStr.slice(aindex+1,aeStr.length)
										var b = currentName.slice(scIndex+1,currentName.length)
										var bIndex = b.indexOf("_")
										var bs = b.slice(0,bIndex)
										var taskName = ae + "_" + bs ;
										fileData[i].taskName = taskName
										function findFile(list){
											return list.local_name == currentName && list.local_url == currentPath
										}
										var inFileIndex = this.taskfileList.findIndex(findFile)
										if(inFileIndex>-1){
											fileData[i].resId = this.taskfileList[inFileIndex].id
											layoutArr.push(fileData[i])
											var thArr = {
												"merge_englishname":"Layout",
												"task_name":taskName
											}
											taskData.push(thArr)
										}
									}
								}
							}
							if(layoutArr.length>0){
								
								
								var taskDataStr = JSON.stringify(taskData)
								
								let data = {
									project_id:this.taskProjectId ,
									json:taskDataStr
								}
								
								this.$PRAPI.task.GetResourcesTask(data).then(res => {
									console.log('任务资源')
									console.log(res)
									
									if(res.length>0){
										
										console.log(layoutArr)
										
										
										for(var i=0;i<layoutArr.length;i++){
											var currentTaskName = layoutArr[i].taskName
											function findTask(list){
												return list.task_list.shotnumber == currentTaskName
											}
											var taskIndex = res.findIndex(findTask)
											if(taskIndex>-1){
												layoutArr[i]["merge_id"] = res[taskIndex].id
												layoutArr[i]["task_id"] = res[taskIndex].prid
												layoutArr[i]["task_name"] = res[taskIndex].task_list.shotnumber
											}
										}
										

										var updataData = []
										for(var i=0;i<layoutArr.length;i++){
											if(layoutArr[i].resId&&layoutArr[i].merge_id&&layoutArr[i].task_id){
												var thArr = {
													id : layoutArr[i].resId,
													merge_id : layoutArr[i].merge_id,
													task_id : layoutArr[i].task_id,
													task_name : layoutArr[i].task_name
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
												message: '未匹配到任务',
												type: 'success',
													position: 'bottom-right'
											});
										}
										
										
										
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
								
								
							}else{
								this.$notify({
									message: '未发现layout文件',
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
				
			},
			//查看工程历史记录
			openProjectTaskOutsourcing(){
				if(!this.currentUserJurisdiction.taskProjectOutsourcing){
					this.$TGYC.sendErr("您没有权限！！！");
					return false
				};
				this.$router.push({
					path: '/index/project/taskOutsourcing',
					query: {
						taskId: this.taskId
					},
				})
			},
		}
	}
</script>