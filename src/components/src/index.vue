<template>
    <div class="tgycBox" >
		<div class="tgycBoxTop">
			<div class="tgycLogoBox">
				<img src="@/assets/img/logo.png" />
				
			</div>
			<div class="tgycNavBox">
				<topNav></topNav>
			</div>
			<div class="tgycUserBox">
				<div class="sysFileManageBox">
					
					
					<div class="sysJumpResManage">
						<!-- 资产详情跳转开关 -->
						<div class="jumpResDetaileBtn">
							<el-switch
								v-model="jumpResDetaile"
								active-color="#2d8ceb"
								:width="26"
								inactive-color="#b1b1b1"
								@change="jumpResDetaileChange"
								>
							</el-switch>
						</div>
					</div>
					
					
					<div class="sysDownTrackManage">
						<div class="sysSearchManageIcon" @click="downTrackSelectResCtr" >
							<img src="@/assets/img/downTrack.png" />
						</div>
					</div>
					<div class="sysDownManage">
						<div class="sysSearchManageIcon" @click="downSelectResCtr" >
							<img src="@/assets/img/down.png" />
						</div>
					</div>
					<div class="sysSearchManage">
						<div class="sysSearchManageIcon" @click="openSearchResBox" >
							<img src="@/assets/img/sysSearch.png" />
						</div>
					</div>
					<div class="sysLinkFile">
						<div class="sysSearchManageIcon" @click="setLinkFile" >
							<img src="@/assets/img/sysLinkFile.png" />
						</div>
					</div>
					<div class="sysFileManage" @click="openFileDialog('upload')" v-if="fileManageList.fileDown.length==0&&fileManageList.fileUpload.length==0&&fileManageList.fileErr.length==0">
						<div class="sysFileManageIcon">
							<img src="@/assets/img/downfile.png" />
						</div>
						<div class="sysFileManageCount" v-if="fileManageList.num>0">
							{{fileManageList.num}}
						</div>
					</div>
			
					<div class="sysFileManageTipBox">
						
						<div class="sysFileManageTip" @click="openFileDialog('down')" v-if="fileManageList.fileDown.length>0">
							<i class="el-icon-loading sysFileManageTipLoading"></i><i class="el-icon-bottom"></i>{{fileManageList.fileDown.length}}
						</div>
						<div  class="sysFileManageTip" @click="openFileDialog('upload')" v-if="fileManageList.fileUpload.length>0">
							<i class="el-icon-loading sysFileManageTipLoading"></i><i class="el-icon-top"></i>{{fileManageList.fileUpload.length}}
						</div>
						<div class="sysFileManageTipRed" @click="openFileDialog('errData')" v-if="fileManageList.fileErr.length>0">
							<i class="el-icon-document-delete"></i>{{fileManageList.fileErr.length}}
						</div>
						
					</div>
					
				</div>
				<el-dropdown trigger="click" @command="userCommand">
				  <span class="el-dropdown-link userName">
				    {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item command="version">版本</el-dropdown-item>
				    <el-dropdown-item command="exit">注销</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="tgycSubNav">
				<topNavTab></topNavTab>
			</div>
		</div>
		<!-- 多选显示 -->
		<!-- <div class="resourcesListSelectionBox">
			<div v-if="resourcesSelectionBox"  @contextmenu.prevent="resourcesListSelectionMenu($event)" class="resourcesListSelectionBtn">
				<img src="@/assets/img/resourcesSelectionBtn.png" />
			</div>
		</div> -->
		
		
		<!-- 反馈确认框 -->
		<div class="tgycContent">
			<!-- <button @click="jieya">解压缩</button> -->
			<!-- <button @click="searchVersion">检测更新</button> -->
			<div class="tgycContentP">
				<keep-alive :include="cachePage">
				    <router-view></router-view>
				</keep-alive>
			</div>
		</div>
		
		
		
		<!-- 添加任务 -->
		<el-dialog title="传输管理" :visible.sync="fileDialog" width="80%">
			
			<el-row class="fileDialogBox" >
				<div class="fileManageSpeedBox">
					<div class="fileManageSpeedTxt">上传速度：{{uploadSpeed}}</div>
					<div class="fileManageSpeedTxt">下载速度：{{downSpeed}}</div>
				</div>
				<el-tabs v-model="fileDialogTitle" @contextmenu.prevent.native="fileMenu($event)">
				    <el-tab-pane :label="'上传中('+fileManageList.fileUpload.length+')'" name="upload">
						<el-row  :gutter="20">
							<el-col :style="fileManageHeight">
								<el-scrollbar style="height:100%">
									
									<div class="fileManageList" v-for="item in fileManageList.fileUpload.slice((fileManageList.fileUploadPage - 1)*fileManageList.fileUploadPageSize,(fileManageList.fileUploadPage - 1)*fileManageList.fileUploadPageSize + fileManageList.fileUploadPageSize)">
										<div class="fileManageInfo">
											<div class="fileManageName">
												{{item.local_name}}
											</div>
											<div class="fileManagePath">
												{{item.local_url}}
											</div>
										</div>
										<div class="fileManageSpeed">
											{{item.speed}}
										</div>
										<el-progress :percentage="item.process" format="" text-inside="true" stroke-width="2"></el-progress>
									</div>
									
								</el-scrollbar>
							</el-col>
							<el-col>
								<el-pagination
								    :current-page.sync="fileManageList.fileUploadPage"
								    :page-size="fileManageList.fileUploadPageSize"
								    layout="prev, pager, next"
								    :total="fileManageList.fileUpload.length">
								</el-pagination>
							</el-col>
							
						</el-row>
					</el-tab-pane>
				    <el-tab-pane :label="'下载中('+fileManageList.fileDown.length+')'" name="down">
						<el-row  :gutter="20">
							
							<el-col :style="fileManageHeight">
								<el-scrollbar  style="height:100%">
								
									<div class="fileManageList" v-for="item in fileManageList.fileDown.slice((fileManageList.fileDownPage - 1)*fileManageList.fileDownPageSize,(fileManageList.fileDownPage - 1)*fileManageList.fileDownPageSize + fileManageList.fileDownPageSize)">
										<div class="fileManageInfo">
											<div class="fileManageName">
												{{item.local_name}}
											</div>
											<div class="fileManagePath">
												{{item.local_url}}
											</div>
										</div>
										<div class="fileManageSpeed">
											{{item.speed}}
										</div>
										<el-progress :percentage="item.process" format="" text-inside="true" stroke-width="2"></el-progress>
									</div>
									
								</el-scrollbar>
							</el-col>	
							<el-col>
								<el-pagination
								    :current-page.sync="fileManageList.fileDownPage"
								    :page-size="fileManageList.fileDownPageSize"
								    layout="prev, pager, next"
								    :total="fileManageList.fileDown.length">
								</el-pagination>
							</el-col>
							
						</el-row>
					</el-tab-pane>
				    <el-tab-pane :label="'完成('+fileManageList.fileSuccess.length+')'" name="success">
						<el-row  :gutter="10">
							
							<el-col :style="fileManageHeight">
								
								<el-scrollbar  style="height:100%">
									
									<div class="fileManageList" v-for="item in fileManageList.fileSuccess.slice((fileManageList.fileSuccessPage - 1)*fileManageList.fileSuccessPageSize,(fileManageList.fileSuccessPage - 1)*fileManageList.fileSuccessPageSize + fileManageList.fileSuccessPageSize)">
										<div class="fileManageInfo">
											<div class="fileManageName">
												{{item.local_name}}
											</div>
											<div class="fileManagePath">
												{{item.local_url}}
											</div>
										</div>
										<div class="fileManageSpeed">
											{{item.speed}}
										</div>
										<el-progress :percentage="item.process" format="" text-inside="true" stroke-width="2"></el-progress>
									</div>
								</el-scrollbar>
							</el-col>
							<el-col>
								<el-pagination
								    :current-page.sync="fileManageList.fileSuccessPage"
								    :page-size="fileManageList.fileSuccessPageSize"
								    layout="prev, pager, next"
								    :total="fileManageList.fileSuccess.length">
								</el-pagination>
							</el-col>
							
						</el-row>
					</el-tab-pane>
					<el-tab-pane :label="'传输错误('+fileManageList.fileErr.length+')'" name="errData">
						<el-row  :gutter="10">
							
							<el-col :style="fileManageHeight">
								<el-scrollbar  style="height:100%">
									<div class="fileManageList" v-for="item in fileManageList.fileErr.slice((fileManageList.fileErrPage - 1)*fileManageList.fileErrPageSize,(fileManageList.fileErrPage - 1)*fileManageList.fileErrPageSize + fileManageList.fileErrPageSize)">
										<div class="fileManageInfo">
											<div class="fileManageName">
												{{item.local_name}}
											</div>
											<div class="fileManagePath">
												{{item.local_url}}
											</div>
										</div>
										<div class="fileManageDescribe">
											{{item.describe}}
										</div>
										<el-progress :percentage="item.process" format="" text-inside="true" stroke-width="2"></el-progress>
									</div>
								</el-scrollbar>
							</el-col>
							<el-col>
								<el-pagination
								    :current-page.sync="fileManageList.fileErrPage"
								    :page-size="fileManageList.fileErrPageSize"
								    layout="prev, pager, next"
								    :total="fileManageList.fileErr.length">
								</el-pagination>
							</el-col>
							
						</el-row>
					</el-tab-pane>
				</el-tabs>
			</el-row>
		</el-dialog>
		
		
		<!-- 确认提交反馈 -->
		<el-dialog title="确认提交反馈" :visible.sync="newFeedBackBox" width="80%"  :close-on-click-modal="false" :show-close="false">
			<el-row >
				<el-col :span="24">
					<div class="newFeedBackContent">
						
						<div v-if="newFeedBackData.type=='1'" class="newFeedBackImg">
							<viewer :images="newFeedBackData.path">
								<img :src="newFeedBackData.path">
							</viewer>
							<el-input
								  type="textarea"
								  :autosize="{ minRows: 3, maxRows: 4}"
								  placeholder="请输入内容"
								  v-model="newFeedBackText">
							</el-input>
						</div>
						<div v-else-if="newFeedBackData.type=='2'" class="newFeedBackVideo" @click="openVideoPlay(item)">
							<videoBox :videoid="123" :vwidth="videoWidth" :myvideourl="newFeedBackData.path"></videoBox>
							<el-input
								  type="textarea"
								  :autosize="{ minRows: 3, maxRows: 4}"
								  placeholder="请输入内容"
								  v-model="newFeedBackText">
							</el-input>
						</div>
						<div v-else-if="newFeedBackData.type=='3'" class="newFeedBackVoice" @click="openAudioPlay(item)">
							<audio :src="newFeedBackData.path"  controls="controls"></audio>
							<el-input
								  type="textarea"
								  :autosize="{ minRows: 3, maxRows: 4}"
								  placeholder="请输入内容"
								  v-model="newFeedBackText">
							</el-input>
						</div>
						<div v-if="newFeedBackData.type=='4'" class="newFeedBackQuill">
							<quill-editor ref="myTextEditor" style="height: 250px;" :options="quillOptions" v-model="newFeedBackText"></quill-editor>
						</div>
					</div>
					<div class="newFeedBackContentBtn">
						<el-button class="newFeedBackContentBtnMargin" size="mini" @click="submitFeedBack">提交</el-button>
						<el-button class="newFeedBackContentBtnMargin" size="mini" @click="closeFeedBack">取消</el-button>
					</div>
				</el-col>
			</el-row>
		</el-dialog>
		
		
		
		
		<!-- 选择资源负责人 -->
		<el-dialog title="选择负责人" :visible.sync="newResPersonnelBox" width="80%" :close-on-click-modal="false">
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
		
		
		
		<!-- 资源匹配搜索 -->
		<el-dialog title="搜索资源" :visible.sync="searchResBox" width="90%" :close-on-click-modal="false">
			<el-row :style="searchResHeight">
				<el-col :span="24">
					<el-col :span="12"><el-input size="mini" placeholder="请输入内容" clearable v-model="searchContent" @keyup.enter.native="searchResSubmit"></el-input></el-col>
					<el-col :span="8"><el-button size="mini" @click="searchResSubmit">搜索</el-button></el-col>
				</el-col>
				<el-col :span="24" class="">
					<!-- 搜索到的资源列表 -->
					<!-- {{searchData}} -->
					<el-col :style="searchResHeightScrollbar">
						<el-scrollbar  style="height:100%">
							<div class="searchManageList" v-for="item in searchData">
								<div class="fileManageInfo">
									<div class="fileManageName">
										{{item.local_name}}
									</div>
									<div class="fileManagePath">
										{{item.local_url}}
									</div>
								</div>
								<div class="fileManagebtns">
									<i class="el-icon-folder" @click="openRes(item.path)"></i>
									<i class="el-icon-arrow-left" @click="jumpResLeft(item.path)"></i>
									<i class="el-icon-arrow-right" @click="jumpResRight(item.path)"></i>
									<i class="el-icon-thumb" @click="selectRes(item.path)"></i>
									<!-- <i class="el-icon-view"></i> -->
								</div>
							</div>
						</el-scrollbar>
					</el-col>	
				</el-col>
				
			</el-row>
		</el-dialog>
		
		
		
		<!-- 选择轨道 -->
		<el-dialog title="搜索资源" :visible.sync="downTrackSelectBox" width="90%" :close-on-click-modal="false">
			<el-row>
				<el-col>
					<el-col>
						<div class="downTrackTitle">视频轨道</div>
						<div class="downTrackContent">
							<el-checkbox-group v-model="checkList">
							    <el-checkbox v-for="(item,index) in projectTrack.videoTracksData" :checked="item.select" :label="item.code + 1" @change="TracksSelectedChange($event,'videoTracksData',index)"></el-checkbox>
							</el-checkbox-group>
						</div>
					</el-col>
					<el-col>
						<div class="downTrackTitle">音频轨道</div>
						<div class="downTrackContent">
							<el-checkbox-group v-model="checkList2">
							    <el-checkbox v-for="(item,index) in projectTrack.audioTracksData" :checked="item.select" :label="item.code + 1" @change="TracksSelectedChange($event,'audioTracksData',index)"></el-checkbox>
							</el-checkbox-group>
						</div>
					</el-col>
					<el-col>
						<div class="newFeedBackContentBtn">
							<el-button class="newFeedBackContentBtnMargin" size="mini" @click="submitDownTrackSelect('excel')">导出表格</el-button>
							<el-button class="newFeedBackContentBtnMargin" size="mini" @click="submitDownTrackSelect('json')">导出json</el-button>
							<el-button class="newFeedBackContentBtnMargin" size="mini" @click="submitDownTrackSelectClips()">导出选中剪辑</el-button>
							<el-button class="newFeedBackContentBtnMargin" size="mini" @click="closeDownTrackSelect">取消</el-button>
						</div>
					</el-col>
				</el-col>
			</el-row>
		</el-dialog>

    </div>
</template>
<script>
	// 引入模块
	// const topNav = requirer(dir + "/src/pages/components/topNav/index.js");
	// const topNavTab = requirer(dir + "/src/pages/components/topNavTab/index.js");
	// const videoBox = requirer(dir + "/src/pages/components/video/index.js");
	
	import topNav from "@/pages/components/topNav/index.vue";
	import topNavTab from "@/pages/components/topNavTab/index.vue";
	import videoBox from "@/pages/components/video/index.vue";
	
	// import thpackage from "../package.json"
	import {
		Loading
	} from 'element-ui';
	// import xlsx from 'xlsx'
	var xlsx = window.tgyc.xlsx
	export default {
		data() {
			return {
				cachePage:[],
				fileManageHeight:"height:"+(window.innerHeight-320)+"px",
				searchResHeight:"height:"+(window.innerHeight-190)+"px",
				searchResHeightScrollbar:"height:"+(window.innerHeight-230)+"px",
				quillEditorHeight:"height:"+(window.innerHeight-200)+"px",
				fileManageHeightNum:0,
				windowHeight:"",
				activeName: 'first',
				userName: '',
				mainSocket:null,
				socketS:false,//socket是否启动成功
				socketTimer:false,//断线重连定时器函数
				scriptNum:0,
				fileFeedbackData:[],
				fileProgressData:[],
				fileDialog:false,
				fileDialogTitle:'upload',
				fileSpeedUnit:"/s",//速度单位
				fileManageList:{
					num:0,
					count:0,
					fileUpload:[],
					fileUploadPage:1,
					fileUploadPageSize:30,
					fileDown:[],
					fileDownPage:1,
					fileDownPageSize:30,
					fileSuccess:[],
					fileSuccessPage:1,
					fileSuccessPageSize:30,
					fileErr:[],
					fileErrPage:1,
					fileErrPageSize:30,
					
				},
				uploadSpeed:"",//上传总速度
				downSpeed:"",//下载总速度
				feedbackManage:[],
				jietuvue:null,
				prScriptTimer:null,
				resourcesSelectionBox:false,
				resourcesSelectionData:[],
				newFeedBackBox:false,
				newFeedBackData:{},
				newFeedBackText:"",//文字反馈内容
				videoWidth:window.innerWidth-170,
				feedbackSelect:[],//当前要反馈的资源列表
				newResPersonnelBox:false,
				personnelList:[],//可用人员列表
				selectPersonnel:"",//选中人员
				isClose:false,//是否是关闭状态
				updataLogData:{},//更新数据包列表
				updating:false,//是否在更新
				downUpdataLogData:[],
				currentUserJurisdiction:{},//当前用户权限
				currentOperationCode:0,//当前操作类型
				currentTaskRes:[],//当前选择资源的信息
				errResNameList:"",//错误的资源名称列表
				makeType:'0',//制作模式
				selectCompany:"",//选中公司
				companylList:[],//可用外包公司列表
				updataLoadingInstance:null,//更新加载loading
				searchResBox:false,//资源匹配
				searchContent:"",//搜索资源
				searchData:[],//搜索到的数据
				selectResData:{
					path:"",
					index:0,
					type:"pre"
				}, // type  pre向左跳转   next向右跳转  select全选
				jumpResDetaile:true,
				downTrackSelectBox:false,//资源匹配
				projectTrack:{},
				checkList:[],
				checkList2:[],
				sendUpload:0,//检测是否发送计数
				sendDown:0,//检测是否发送计数
				quillOptions:{//富文本编辑器设置
					placeholder: '请输入',
					modules: {
						toolbar: [
							['bold', 'italic', 'underline', 'strike'],  
							[{ 'list': 'ordered'}, { 'list': 'bullet' }],
							[{ 'align': [] }],
							[{ 'color': [] }, { 'background': [] }], 
						]
					},
				},
				stateChangedCfn:(event)=>{
					console.log('资源状态改变');
					console.log(event)
					var stateCode = event.data;
					stateCode = decodeURI(stateCode);
					stateCode = JSON.parse(stateCode);
					console.log(stateCode)
					this.setSelectionResourcesState(stateCode);
				},
				selectionProjectPanelCfn:(event)=>{
					// console.log('资源栏选中');
					// console.log(event)
					this.openTaskResources(event.data);
					this.resourcesSelectionBox = false;
				},
				selectionOneChangedCfn:(event)=>{
				  console.log('单个点击');
				  // console.log(event.data);
				 
				  // console.log("-----");
				  //跳转到资源页
					this.openTaskResources(event.data);
					this.resourcesSelectionBox = false;
				},
				selectionMoreChangedCfn:(event)=>{
				  console.log('多个点击');
				  console.log(event.data);
				  this.resourcesSelectionBox = true;
				  this.resourcesSelectionData = event.data;
				  //多选反馈
				},
				selectionNoneChangedCfn:(event)=>{
				  console.log('点击其他');
				  this.resourcesSelectionBox = false;
				  
				  //多选反馈
				},
				clientErrCfn:(event)=>{
					console.log("---------------")
					console.log('cep发生错误');
					console.log(event)
					console.log("---------------")
					
				},
				prFcChangedCfn:(event)=>{
					console.log('pr操作');
					// console.log(event)
					var type = event.data;
					this.currentOperationCode = type
					//存储反馈选中资源列表(并作出相应动作)
					this.$CSINTERFACE.evalScript("getSlectionRes()",(el)=>{
						if(el!="err"){
							var elData = JSON.parse(el);
							this.feedbackSelect = elData;
							console.log("选中对象");
							console.log(elData);
							if(elData.data.length>0){
								// 获取权限及资源信息
								this.getTaskAndResources(elData)
								
								
								
							}else{
								this.$notify(
									{
										message: '请先选择时间轴对象，再做反馈！！！',
										type: 'warning',
							  position: 'bottom-right'
									}
								);
							}
						}
					})
					
				},
				prFcSelectFileCfn:(event)=>{
					console.log('上传操作');
					// console.log(event)
					
					var type = event.data;
					this.currentOperationCode = type
					//存储反馈选中资源列表(并作出相应动作)
					this.$CSINTERFACE.evalScript("getSlectionRes()",(el)=>{
						if(el!="err"){
							var elData = JSON.parse(el);
							this.feedbackSelect = elData;
							console.log("选中对象");
							console.log(elData);
							if(elData.data.length>0){
								
								var selectionData = elData.data;
								var currentIdentifyCode = elData.identifyCode;
								var pathData = [];
								for(var i=0;i<selectionData.length;i++){
									var thArr = {
										local_name:selectionData[i].fileName,
										local_url:selectionData[i].fileDir
									};
									pathData.push(thArr);
								}
								
								let formData = {
									identifyCode:elData.identifyCode,
									pathList:JSON.stringify(pathData)
								}
								this.$PRAPI.prtask.GetRolePrresources(formData).then(res => {
									this.currentTaskRes = res.res
									this.setTaskRoleList(res.project,res.res)
									
									if(!this.currentUserJurisdiction.resAddFeedback){
										this.$TGYC.sendErr("您没有权限！！！");
										return false
									};
									
									// 获取权限及资源信息
									this.$CSINTERFACE.evalScript("selectFileFile()", (el)=>{
										// console.log("选中文件")
										// console.log(decodeURI(el))
										// 处理路径
										var selectPath = decodeURI(el);
										var identityCode =  selectPath.slice(0,1);
										selectPath = selectPath.slice(1,selectPath.length);
										// console.log(identityCode)
										if(identityCode=="/"){
											// console.log("根目录")
											selectPath = selectPath.slice(0,1) + ":" + selectPath.slice(1,selectPath.length);
										}else if(identityCode=="~"){
											// console.log("用户目录")
											var myhome = this.$OS.homedir()
											// console.log(myhome)
											selectPath = myhome + selectPath
										}
										// console.log(selectPath)
										this.sendInputFile(selectPath)
									});
									
								}, err => {
									console.log(err)
								});
								
								
							}else{
								this.$notify(
									{
										message: '请先选择时间轴对象，再做反馈！！！',
										type: 'warning',
							  position: 'bottom-right'
									}
								);
							}
						}
					})
					
				},
				downSelectResCfn:(event)=>{
					console.log('下载操作');
					// console.log(event)
					this.downSelectResCtr(event)
				}
			}
		},
		components: {
			'topNav': topNav,
			'topNavTab': topNavTab,
			'videoBox': videoBox,
		},
		mounted() {
			window.addEventListener('resize',()=>{
				this.fileManageHeightNum = window.innerHeight
				this.fileManageHeight = "height:"+(window.innerHeight-320)+"px"
				this.searchResHeight = "height:"+(window.innerHeight-190)+"px"
				this.searchResHeightScrollbar = "height:"+(window.innerHeight-230)+"px"
				this.quillEditorHeight = "height:"+(window.innerHeight-200)+"px"
			})
		},
		created: function() {
			window.topVue = this
			// console.log('----------')
			// console.log(this.$store.state.routerData)
			// console.log(this.$route.matched[0].path)
			// console.log('+++++++++')
			
			// console.log(this.$store.state.topNavTabList)
			console.log(window)
			this.setPrVersion()
			
			var sysRouter = this.$store.state.routerData;
			var currentPath = this.$route.matched[0].path;
			var routerChildren = [];
			function findRouter(thRouter){
				return thRouter.path == currentPath
			}
			var routerIndex = sysRouter.findIndex(findRouter);
			if(routerIndex>-1){
				routerChildren = sysRouter[routerIndex].children;
			}
			for(var i=0;i<routerChildren.length;i++){
				var keepAliveState = routerChildren[i].meta.keepAlive;
				var routerName = routerChildren[i].name;
				if(keepAliveState){
					var nameIndex = this.cachePage.indexOf(routerName);
					if(nameIndex==-1){
						this.cachePage.push(routerName);
					}
				}
			}
			
		
			
			this.userName = this.$store.state.userInfo.name;
			
			//连接传输脚本
			this.initWebSocket();
			
			
			this.setEventListener();
			
			setTimeout(()=>{
				this.openTaskPage();
			},500);
			
		},
		beforeDestroy: function() {
			console.log("销毁处理")
			this.$CSINTERFACE.removeEventListener("com.adobe.csxs.events.selectionProjectPanel",this.selectionProjectPanelCfn);
			this.$CSINTERFACE.removeEventListener("com.adobe.csxs.events.selectionOneChanged",this.selectionOneChangedCfn);
			this.$CSINTERFACE.removeEventListener("com.adobe.csxs.events.selectionMoreChanged",this.selectionMoreChangedCfn);
			this.$CSINTERFACE.removeEventListener("com.adobe.csxs.events.selectionNoneChanged",this.selectionNoneChangedCfn);
			//监听错误
			this.$CSINTERFACE.removeEventListener("com.adobe.csxs.events.clientErr",this.clientErrCfn);
			this.$CSINTERFACE.removeEventListener("com.adobe.csxs.events.ResourcesStateChanged",this.stateChangedCfn);
			this.$CSINTERFACE.removeEventListener("com.adobe.csxs.events.prFcChanged",this.prFcChangedCfn);
			this.$CSINTERFACE.removeEventListener("com.adobe.csxs.events.prFcSelectFile",this.prFcSelectFileCfn);			
			//下载指定文件操作
			this.$CSINTERFACE.removeEventListener("com.adobe.csxs.events.downSelectRes",this.downSelectResCfn);
			
		},
		// 在 `methods` 对象中定义方法
		methods: {
			//对比软件版本
			setPrVersion(){
				this.$CSINTERFACE.evalScript("getPrVerssion()", (el)=>{
					// console.log("当前pr版本");
					// console.log(el);
					// console.log("系统要求pr版本");
					// console.log(this.$TGYC.prVersion);
					
					if(el=="14.6.0"||el=="14.7.0"||el=="14.8.0"){
						
					}else{
						this.$router.push({ path: '/prErr' })
					}
					
					
				});
			},
			//设置操作监听
			setEventListener(){					
				this.$CSINTERFACE.addEventListener("com.adobe.csxs.events.selectionProjectPanel",this.selectionProjectPanelCfn);
				this.$CSINTERFACE.addEventListener("com.adobe.csxs.events.selectionOneChanged",this.selectionOneChangedCfn);
				this.$CSINTERFACE.addEventListener("com.adobe.csxs.events.selectionMoreChanged",this.selectionMoreChangedCfn);
				this.$CSINTERFACE.addEventListener("com.adobe.csxs.events.selectionNoneChanged",this.selectionNoneChangedCfn);
				//监听错误
				this.$CSINTERFACE.addEventListener("com.adobe.csxs.events.clientErr",this.clientErrCfn);
				this.$CSINTERFACE.addEventListener("com.adobe.csxs.events.ResourcesStateChanged",this.stateChangedCfn);
				this.$CSINTERFACE.addEventListener("com.adobe.csxs.events.prFcChanged",this.prFcChangedCfn);
				this.$CSINTERFACE.addEventListener("com.adobe.csxs.events.prFcSelectFile",this.prFcSelectFileCfn);			
				//下载指定文件操作
				this.$CSINTERFACE.addEventListener("com.adobe.csxs.events.downSelectRes",this.downSelectResCfn);
			},
			
			downSelectResCtr(event){
			
				var type = event.data;
				this.currentOperationCode = type
				
				this.$CSINTERFACE.evalScript("getSlectionRes()",(el)=>{
					console.log('当前选中项为');
					console.log(el);
					if(el!="err"){
						var elData = JSON.parse(el);
						if(elData.data.length>0){
							var selectionData = elData.data;
							var currentIdentifyCode = elData.identifyCode;
							var pathData = [];
							for(var i=0;i<selectionData.length;i++){
								var thArr = {
									local_name:selectionData[i].fileName,
									local_url:selectionData[i].fileDir
								};
								pathData.push(thArr);
							}
		
							let formData = {
								identifyCode:elData.identifyCode,
								pathList:JSON.stringify(pathData)
							}
							this.$PRAPI.prtask.GetRolePrresources(formData).then(res => {
								this.currentTaskRes = res.res
								this.setTaskRoleList(res.project,res.res)
								
								if(!this.currentUserJurisdiction.selectResDown){
									this.$TGYC.sendErr("您没有权限！！！");
									return false
								};
								
								// 执行下载操作
								this.$confirm('下载选中文件？', '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									type: 'warning'
								}).then(() => {
									this.getSelectRes(elData)
									
								}).catch(() => {
									this.$notify({
										type: 'info',
										message: '已取消',
							  position: 'bottom-right'
									});          
								});
								
							}, err => {
								console.log(err)
							});
							
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
			
			// 获取下载资源信息
			getSelectRes(elData){
				
				var selectionData = elData.data;
				var currentIdentifyCode = elData.identifyCode;
				var pathData = [];
				for(var i=0;i<selectionData.length;i++){
					var thArr = {
						local_name:selectionData[i].fileName,
						local_url:selectionData[i].fileDir
					};
					pathData.push(thArr);
				}
				let data = {
					identifyCode:currentIdentifyCode,
					pathList:JSON.stringify(pathData),
				};
				this.$PRAPI.prResourcesRecord.GetPathResources(data).then(res => {
					console.log("选中资源信息")
					console.log(res)
					this.downSelectRes(res)
				}, err => {
					console.log(err);
				});
				
				
			},
			
			// 下载选中文件
			downSelectRes(thData) {
				var resData = thData
				console.log('索引下载文件')
		
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
								// 判断是否下载完成,完成后提示重新加载工程
								
							},
							"setProgress" : (passNum,data) =>{	//进度回调
								
							},
						}
						
						
						//检测是否在下载队列
						function findFileList(list){
							return list.local_name == newArr.local_name && list.local_url == newArr.local_url
						}
						var isInFileList = this.fileManageList.fileDown.findIndex(findFileList)
						if(isInFileList==-1){
							this.fileManageList.fileDown.unshift(newArr)
							this.fileManageList.num = this.fileManageList.num +1
							this.compareFile(newArr)
						}
					}
				}
			},
			// 验证下载资源是否需要下载
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
				
				var fileDownArr = this.fileManageList.fileDown
				function findCurrentUpload(thFile){
					return thFile.id == data.id
				}
				
				var that = this
				//从下载列表中移除
				function removeFile(message){
					var fileDownIndex = fileDownArr.findIndex(findCurrentUpload)
					if(fileDownIndex>-1){
						that.fileManageList.fileDown[fileDownIndex].process = 100
						that.fileManageList.fileDown[fileDownIndex].state = message
						
						that.fileManageList.fileSuccess.unshift(that.fileManageList.fileDown[fileDownIndex])
						that.fileManageList.fileDown.splice(fileDownIndex,1)
						that.fileManageList.num = that.fileManageList.num -1
				
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
							this.fileManage(data)
						}else{
							console.log('服务器版本一致,无需下载')
							removeFile('版本一致')
						}
					} else {
						// console.log(path)
						// console.log('文件未找到')
						this.fileManage(data)
					}
				})
			},
			
			
			//发送上传指令
			sendInputFile(data){
				// console.log("选中文件")
				// console.log(this.$refs.inputfile)
				// console.log(this.$refs.inputfile.value)
				
				// 判断文件类型
				// 图片		png jpeg jpg
				// 视频		mp4
				// 音频		mp3 wav
				
				var filePath = data;
				if(filePath!=""){
					var fileTypeIndex = filePath.lastIndexOf('.');
					if (fileTypeIndex > -1) {
						var fileType = filePath.slice(fileTypeIndex + 1, filePath.length);
						fileType = fileType.toLowerCase();
						// console.log(fileType)
						var sendData = {
							id:"upload",
							type:"",
							path:filePath
						}
						if(fileType=="png"||fileType=="jpeg"||fileType=="jpg"){
							sendData.type = "endScreenshots"
							this.feedbackConfirmBox(sendData);
						}else if(fileType=="mp4"){
							sendData.type = "endScreen"
							this.feedbackConfirmBox(sendData);
						}else if(fileType=="mp3"||fileType=="wav"){
							sendData.type = "endRecord"
							this.feedbackConfirmBox(sendData);
						}else{
							this.$notify(
								{
									message: '格式错误，只可以上传jpg、jpeg、png、mp4、mp3、wav格式文件！！！',
									type: 'warning',
							  position: 'bottom-right'
								}
							);
						}
					}else{
						this.$notify(
							{
								message: '格式错误，只可以上传jpg、jpeg、png、mp4、mp3、wav格式文件！！！',
								type: 'warning',
							  position: 'bottom-right'
							}
						);
					}
				}
			},
			//查询任务角色及资源信息
			getTaskAndResources(data) {
				var selectionData = data.data;
				var pathData = [];
				for(var i=0;i<selectionData.length;i++){
					var thArr = {
						local_name:selectionData[i].fileName,
						local_url:selectionData[i].fileDir
					};
					pathData.push(thArr);
				}
				let formData = {
					identifyCode:data.identifyCode,
					pathList:JSON.stringify(pathData)
				}
				this.$PRAPI.prtask.GetRolePrresources(formData).then(res => {
					console.log("功能资源")
					console.log(res)
					this.currentTaskRes = res.res
					this.setTaskRoleList(res.project,res.res)
					this.startOperation()
				}, err => {
					console.log(err)
				});
			},
			//设置当前任务角色列表
			setTaskRoleList(data,resData) {
				for(var i=0;i<data.length;i++){
					var userList = data[i].user_list
					data[i].user_list = userList==''||userList==null||userList=='null'?[]:JSON.parse(userList)
					
					var roleJurisdiction = data[i].jurisdiction
					data[i].jurisdiction = roleJurisdiction==''||roleJurisdiction==null||roleJurisdiction=='null'?{}:JSON.parse(roleJurisdiction)
				}
				this.setMyJurisdiction(data,resData)
			},
			//设置我的可用权限
			setMyJurisdiction(data,resData){
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
				if(resData.length>0){
					if(resData[0].outsourcing == "1" && resData[0].company_id == this.$store.state.userInfo.companyid){
						myJurisdiction.resAddFeedback = true
					}
				}
				// console.log("我的可用权限")
				// console.log(myJurisdiction)
				this.currentUserJurisdiction = myJurisdiction
			},
			//开始执行操作
			startOperation(){
				var type = this.currentOperationCode
				switch (type){
					case 0:
						if(!this.currentUserJurisdiction.resAddFeedback){
							this.$TGYC.sendErr("您没有权限！！！");
							return false
						};
						this.newFeedBackText = "";
						this.newFeedBackBox = true;
						this.newFeedBackData.type = 0;
						break;
					case 1:
						if(!this.currentUserJurisdiction.resAddFeedback){
							this.$TGYC.sendErr("您没有权限！！！");
							return false
						};
						this.startScreenshots();
						break;
					case 2:
						if(!this.currentUserJurisdiction.resAddFeedback){
							this.$TGYC.sendErr("您没有权限！！！");
							return false
						};
						this.startScreen();
						break;
					case 3:
						if(!this.currentUserJurisdiction.resAddFeedback){
							this.$TGYC.sendErr("您没有权限！！！");
							return false
						};
						this.startRecord();
						break;
					case 4:
						if(!this.currentUserJurisdiction.resEditPersonnel){
							this.$TGYC.sendErr("您没有权限！！！");
							return false
						};
						this.setPersonnel();
						break;
					case 5:
						if(!this.currentUserJurisdiction.resAddFeedback){
							this.$TGYC.sendErr("您没有权限！！！");
							return false
						};
						this.submitFeedBack()
						break;
					case 6:
						if(!this.currentUserJurisdiction.resAddFeedback){
							this.$TGYC.sendErr("您没有权限！！！");
							return false
						};
						this.newFeedBackText = "";
						this.newFeedBackBox = true;
						this.newFeedBackData.type = 4;
						break;	
				}
			},
			
			//监听到资源点击时，跳转到资源详情页
			openTaskResources(data) {
				// console.log('跳转到资源详情')
				//获取当前文件路径及名称
				//获取工程识别码
				//获取任务i
				// console.log(data)
				
				var documentID = data[0].documentID;
				var resourecesPath = data[0].filepath;
				var pathIndex = resourecesPath.lastIndexOf('/');
				if (pathIndex > -1) {
					var local_name = resourecesPath.slice(pathIndex + 1, resourecesPath.length);
					var local_url = resourecesPath.slice(0, pathIndex);
					
					let data = {
						identifycode: documentID,
						local_name:local_name,
						local_url:local_url
					};
					this.$PRAPI.prResourcesRecord.GetResources(data).then(res => {
						console.log('资源信息')
						console.log(res)
						if(res.prresources_id!="null"&&res.prresources_id!=null&&res.prresources_id!=undefined){
							var jumpResPage = ()=>{
								this.$router.push({
									path: '/index/project/taskResources',
									query: {
										projectId:res.project_id ,
										taskId:res.prtask_id ,
										prresourcesId: res.prresources_id
									},
								});
							}
							if(res.project_company_id==this.$store.state.userInfo.companyid){
								jumpResPage()
							}else if(res.outsourcing=="1"&&res.company_id==this.$store.state.userInfo.companyid){
								jumpResPage()
							}else{
								// 没有权限
								console.log("没有权限")
								this.$TGYC.sendErr("您没有权限访问！！！");
							}
						}else{
							this.$TGYC.sendErr("没有找到此资源信息，请检察是否上传！！！")
						}
						
						
					}, err => {
						console.log(err);
					});
				}
				
				
			},
			//打开插件时，自动跳转到任务详情页
			openTaskPage(data){
				// 获取工程识别码
				
				this.$CSINTERFACE.evalScript("gerProjectDocumentID()",(el)=>{
					// console.log('工程识别码')
					// console.log(documentID)
					if(el!="err"){
						let data = {
							identifycode: el
						};
						this.$PRAPI.prResourcesRecord.GetTaskHistroy(data).then(res => {
							if(res.project_id!=''&&res.project_id!=null&&res.prtask_id!=''&&res.prtask_id!=null){
								this.$router.push({
									path: '/index/project/task',
									query: {
										projectId: res.project_id,
										projectName: '',
										taskId: res.prtask_id,
										taskProjectId:res.task_project_id,
									}
								});
							}
						}, err => {
							console.log(err);
						});
					}	
				});
				
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			openFileDialog(model){
				this.fileDialog = true;
				this.fileDialogTitle = model
			},
			userExit() {
				var person = '';
				this.$FS.writeFile('C:/TGYC/appData/config.json', person, (err) => {
					if (err) throw err;
					this.$router.push({
						path: '/login'
					});
				});
			},
			userCommand(command) {
		
				switch (command) {
					case 'version':
						var showText ="当前版本：" + this.$TGYC.version
						this.$alert(showText, '插件版本', {
						          confirmButtonText: '确定',
						          callback: action => {
						           
						          }
						});
						break;
					case 'exit':
						this.userExit();
						break;
				}
			},
			
			//检索系统版本
			searchVersion(){
				// 获取当前软件系统版本
				// console.log("软件当前版本")
				// console.log(this.$TGYC.name)
				// console.log(this.$TGYC.version)
				var currentSoftwareName = this.$TGYC.name;
				var currentSoftwareVersion = this.$TGYC.version;
				let softwareData = {
					name:currentSoftwareName
				} ;
				// console.log(softwareData)
				this.$PRAPI.prVersion.GetSoftware(softwareData).then(res => {
					console.log(res)
					var onlineData = res[0];
					var onlineVersion = onlineData.version;
					if(currentSoftwareVersion==onlineVersion){
						console.log("版本一致")
						
					}else{
						
						console.log("版本有更新")
						// this.$alert('发现软件有更新，更新过程中请不要关闭软件，更新完成后，将自动退出pr软件。', '更新提醒', {
						// 	confirmButtonText: '确定',
						// 	callback: action => {
						// 			// this.updataLoadingInstance =Loading.service();
						// 			var software = onlineData;
						// 			this.addUpdataList(software);
						// 			this.updataLogData = onlineData;
						// 			// this.downUpdataLogData = [];
								
						// 	}
						// });
						this.$notify({
							message: '正在下载新版本,下载完成后将提示安装，更新不影响使用',
							type: 'warning',
							  position: 'bottom-right'
						});
						var software = onlineData;
						this.addUpdataList(software);
						this.updataLogData = onlineData;
						
					}
				}, err => {
					console.log(err);
				});
			},
			// 加入到下载列表
			addUpdataList(data){
				
				//先执行初始化命令
					// {
					// 	"delPath":[
					// 		"TGYCPR",
					// 		"TGYCTIP"
					// 	],
					// 	"delFile":[]
					// }
				//执行安装命令

				var currentSoftware = data;
				
				var fileArrId = currentSoftware.id + "upload"
				var thTime = currentSoftware.time
				
				var currentLocalPath = this.$CEPPATH
				var thjson = currentSoftware.file_list;
				thjson = JSON.parse(thjson)
				
				var fileData = currentLocalPath + "/"+currentSoftware.patch_tgyc;
				//执行初始化操作
				var sysData = currentSoftware.sys_init
				sysData = JSON.parse(sysData)
				

				if(this.$FS.existsSync(fileData)){
					this.$FS.unlinkSync(fileData);
				}
					
				// this.$FS.statSync(fileData, (err, stats) => {
				// 	if (!err) {
				// 		this.$FS.unlinkSync(fileData);
				// 	} else {
				// 		// 文件未找到
				// 	}
				// })
				
				
				
				var copyCount = 0;
				var fileEnd = ()=>{
					if(copyCount>=thjson.length){
						this.$notify({
						  title: '升级成功',
						  message: '插件已更新至最新版本',
						  position: 'bottom-right'
						});
						if(this.$FS.existsSync(fileData)){
							this.$FS.unlinkSync(fileData);
							
							window.location.reload()
							
						}
					}
				}
				
				// 文件下载完成回调
				var fileDownComplete = (thData)=>{
					console.log("下载完成")
					console.log(currentSoftware)
					// 删除原文件
					// 还原新文件
					
					var delPath = sysData.delPath
					for(var i=0;i<delPath.length;i++){
						var currentPath = currentLocalPath+"\\"+delPath[i]
						this.$TGYC.delFile(currentPath)
					}
					
					var releasePath = currentLocalPath
					
					// 按顺序还原文件
					for(var i=0;i<thjson.length;i++){
						
						var currentPath = releasePath  +"\\"+ thjson[i].path;
						var currentFile = releasePath  +"\\"+ thjson[i].path +"\\"+ thjson[i].name;
						
						var thStart = thjson[i].start;
						var thEnd = thjson[i].end;
						
						this.$TGYC.mkdirs(currentPath)
						
						let out = this.$FS.createWriteStream(currentFile);
						let file = this.$FS.createReadStream(fileData, {start: thStart ,end:thEnd});
						
						file.on( "data", function ( dataChunk ) {
							out.write( dataChunk, function () {
								
							} )
						} )
						file.on( "close", function ( fd ) {
							copyCount++
							out.end()
							fileEnd()
						} )
					}
					
					
				}

				var downData = {
					"id":fileArrId,//文件唯一id
					"type":1,
					"operation":0,	
					"local_name":currentSoftware.patch_tgyc,		//本地文件名
					"local_url":currentLocalPath,						//本地路径
					"service_name":currentSoftware.patch_tgyc,			//服务器文件名
					"service_url":currentSoftware.patch,		//服务器路径
					"updtime":thTime,
					"errNum":0,
					"setComplete" : (data) =>{
						fileDownComplete(data)
					},
					"setProgress" : (passNum) =>{
						// console.log("下载进度")
						
					},
					"state" : '等待下载',
				};
				
				
				
				function findFile(list){
					return list.local_name == downData.local_name && list.local_url == downData.local_url
				}
				var fileIndex = this.fileManageList.fileDown.findIndex(findFile)
				if(fileIndex==-1){
					this.fileManageList.fileDown.unshift(downData);
					this.fileManageList.num = this.fileManageList.num +1;
					this.fileManage(downData);
				}

			},
			
			
			
			
			//全局socket
			initWebSocket() {
				this.mainSocket = null;
				const wsuri = "ws://127.0.0.1:7401";
				this.mainSocket = new WebSocket(wsuri);
				this.mainSocket.onmessage = this.websocketonmessage;
				this.mainSocket.onopen = this.websocketonopen;
				this.mainSocket.onerror = this.websocketonerror;
				this.mainSocket.onclose = this.websocketclose;
			},
			//连接成功回调
			websocketonopen() { 
				console.log('连接成功');
				this.socketS = true;
				this.scriptNum = 0;
				if(this.socketTimer){
					console.log('连接成功，关闭定时器2')
					clearInterval(this.socketTimer);
					this.socketTimer = false
				}
				
				this.searchVersion();
				
				// var stateTimer = setInterval(()=>{
				// 	console.log('状态心跳')
				// 	var data = {
				// 		"type": "state"
				// 	}
				// 	var dataStr = JSON.stringify(data)
				// 	this.websocketsend(dataStr)
				// }, 1000); 
			},
			//连接建立失败重连
			websocketonerror() { 
				// console.log('连接失败');
				// this.$notify({
				//   message: '客户端连接失败,正在尝试重新连接，请确保客户端处于打开状态',
				//   type: 'warning',
				// 		  position: 'bottom-right'
				// });
				// this.initWebSocket();
			},
			//数据接收
			websocketonmessage(e) { 
				try {
					var messageData = JSON.parse(e.data);
					// console.log("接收到消息”")
					// console.log(messageData)
					var messageType = messageData.type;
					switch (messageType){
						case "file":
							this.setFileFeedBack(messageData);
							break;
						case "speed":
							this.setPrScriptState(messageData);
							break;
						case "task":
							break;
						case "endRecord":
							this.feedbackConfirmBox(messageData);
							break;	
						case "endScreen":
							this.feedbackConfirmBox(messageData);
							break;	
						case "endScreenshots":
							this.feedbackConfirmBox(messageData);
							break;	
						case "err":
							break;
					}
					return true;
				} catch(err) {
					return false;
				}
				
			},
			//数据发送
			websocketsend(Data) { 
				// console.log('发送了请求'+Data);
				var DataEncode = encodeURI(Data);
				this.mainSocket.send(DataEncode);
			},
			//连接关闭
			websocketclose(e) { 
				// console.log('断开连接', e);
				this.socketS = false;
				//断开后开启定时，10次未连接，则重新启动脚本
				// console.log('开启定时');
				if(!this.socketTimer){
					this.socketTimer = setInterval(()=>{
						// console.log('心跳');
						if(!this.socketS){
							if(this.scriptNum>5){
								// 关闭定时器
								if(this.socketS){
									// console.log('连接成功，关闭定时器1')
									clearInterval(this.socketTimer);
								}else{
									this.initWebSocket();
									// 提示客户端连接已断开,正在尝试连接
									this.$notify({
									  message: '客户端连接失败,正在尝试重新连接，请确保客户端处于打开状态',
									  type: 'warning',
									  position: 'bottom-right'
									});
									this.scriptNum = 0
								}
							}else{
								this.scriptNum = this.scriptNum + 1;
							}
						}
					}, 1000);
				}
				
			},
			
			//传输操作任务
			fileManage(fileList){
				console.log('全局文件传输管理');
				console.log(fileList);
				this.setFileManage(fileList);
			},	
			
			setFileManage(data){
				
				var fileData = data;
				var thFileData = {
					"id":fileData['id'],
					"type":fileData['type'],
					"operation":fileData['operation'],
					"local_name":fileData['local_name'],
					"local_url":fileData['local_url'],
					"service_name":fileData['service_name'],
					"service_url":fileData['service_url'],
					"mtime":fileData['updtime']
				};
				
				var socketData = {
					"type":"file",
					"data":thFileData
				};
				var socketData = JSON.stringify(socketData);
				this.websocketsend(socketData);
				// if(this.prScriptTimer==null){
				// 	this.startPrScriptListening();
				// }
			},
			
			//开启脚本状态监听
			startPrScriptListening(){
				this.prScriptTimer = setInterval(()=>{
					console.log('状态监听');
					var data = {
						"type": "state"
					};
					var dataStr = JSON.stringify(data);
					this.websocketsend(dataStr);
				}, 500); 
			},
			
			
			//处理进度状态
			setPrScriptState(data){
				var myData = data.data;
				
				var currentUpload = []; //当前上传
				var currentDown = []; //当前下载
				
				var uploadData = myData["上传"];
				var upload = uploadData["子速度"];
				var uploadSpeed = uploadData["总速度"];
				this.uploadSpeed = uploadSpeed
				
				var downloadData = myData["下载"];
				var download = downloadData["子速度"];
				var downloadSpeed = downloadData["总速度"];
				this.downSpeed = downloadSpeed
				
				
				for(var i=0;i<upload.length;i++){
					if(upload[i]["id"]!=""&&upload[i]["id"]!=null){
						currentUpload.push(upload[i]);
					}
				};
				for(var i=0;i<download.length;i++){
					if(download[i]["id"]!=""&&download[i]["id"]!=null){
						currentDown.push(download[i]);
					}
				};
				
				if(currentUpload.length>0){
					this.sendUpload = 0
				}
				
				if(currentDown.length>0){
					this.sendDown = 0
				}
				
				//检测没有传输时是否有待上传或待下载，有则启动上传或下载
				// console.log("传输资源检测/上传"+this.fileManageList.fileUpload.length+".//下载/"+this.fileManageList.fileDown.length)
				// console.log(currentUpload.length)
				if(currentUpload.length==0&&this.fileManageList.fileUpload.length>0){
					// console.log("检测到列表未上传,重启上传")
					// console.log(this.sendUpload)
					// 连续5次检测到就重新发送上传请求
					
					if(this.sendUpload>=5){
						// console.log("重新发送上传请求")
						var thData = this.fileManageList.fileUpload;
						for(var i=0;i<thData.length;i++){
							this.fileManage(thData[i]);
						}
						this.sendUpload = 0
					}else{
						this.sendUpload = this.sendUpload + 1
					}
					
				}
				// console.log(currentDown.length)
				if(currentDown.length==0&&this.fileManageList.fileDown.length>0){
					// console.log("检测到列表未下载,重启下载")
					// console.log(this.sendDown)
					// 连续5次检测到就重新发送下载传请求
					
					if(this.sendDown>=5){
						// console.log("重新发送下载请求")
						var thData = this.fileManageList.fileDown;
						for(var i=0;i<thData.length;i++){
							this.fileManage(thData[i]);
						}
						this.sendDown = 0
					}else{
						this.sendDown = this.sendDown + 1
					}
					
				}
				
				//设置上传进度
				for(var i=0;i<currentUpload.length;i++){
					
					var currentFileId = currentUpload[i].id ; //任务id
					var currentProgress = parseInt(currentUpload[i].progress);//任务进度
					var currentSpeed = currentUpload[i].speed;	//传输速度
					
					function findFile(file){
						return file.id == currentFileId;
					};
					var fileIndex = this.fileManageList.fileUpload.findIndex(findFile);
					if(fileIndex>-1){
						this.fileManageList.fileUpload[fileIndex].process = currentProgress;
						this.fileManageList.fileUpload[fileIndex].speed = currentSpeed + this.fileSpeedUnit;
						this.fileManageList.fileUpload[fileIndex].state = "上传中";
						this.fileManageList.fileUpload[fileIndex].setProgress(currentProgress,this.fileManageList.fileUpload[fileIndex]);
						
						if(fileIndex>2){
							var thData = this.fileManageList.fileUpload[fileIndex];
							this.fileManageList.fileUpload.splice(fileIndex,1);
							this.fileManageList.fileUpload.unshift(thData);
						}
						
						this.fileManageList.count = this.fileManageList.count + 1;
					};
		
				};
				//设置下载进度
				for(var i=0;i<currentDown.length;i++){
					var currentFileId = currentDown[i].id;  //任务id
					var currentProgress = parseInt(currentDown[i].progress);//任务进度
					var currentSpeed = currentDown[i].speed;	//传输速度
					
					function findFile(file){
						return file.id == currentFileId;
					}
					
					var fileIndex = this.fileManageList.fileDown.findIndex(findFile);
					if(fileIndex>-1){
						this.fileManageList.fileDown[fileIndex].process = currentProgress;
						this.fileManageList.fileDown[fileIndex].speed = currentSpeed + this.fileSpeedUnit;
						this.fileManageList.fileDown[fileIndex].state = "下载中";
						this.fileManageList.fileDown[fileIndex].setProgress(currentProgress,this.fileManageList.fileDown[fileIndex]);
						
						if(fileIndex>2){
							var thData = this.fileManageList.fileDown[fileIndex];
							this.fileManageList.fileDown.splice(fileIndex,1);
							this.fileManageList.fileDown.unshift(thData);
						}
						
						this.fileManageList.count = this.fileManageList.count + 1;
					};
				};
			
			},
		
			//设置文件完成回调
			setFileFeedBack(data){
				// console.log('文件完成回调');
				// console.log(data);
		
				var currentId = data.id;
				var currentType = data.type2;
				var results = data.results;
				
				
				function findFile(file){
					return file.id == currentId
				};
				//将完成的任务移除上传下载列表
				switch (currentType){
					case 0:
						var fileUploadIndex = this.fileManageList.fileUpload.findIndex(findFile);
						if(fileUploadIndex>-1){
							if(results=="0"){
								console.log('处理完成');
								this.fileManageList.fileUpload[fileUploadIndex].process = 0;
								this.fileManageList.fileUpload[fileUploadIndex].speed = "";
								this.fileManageList.fileUpload[fileUploadIndex].state = '上传完成';
								this.fileManageList.fileSuccess.unshift(this.fileManageList.fileUpload[fileUploadIndex]);
								this.fileManageList.fileUpload[fileUploadIndex].setComplete(this.fileManageList.fileUpload[fileUploadIndex]);
								this.fileManageList.fileUpload.splice(fileUploadIndex,1);
								this.fileManageList.num = this.fileManageList.num -1;
							}else if(results=="1"){
								this.fileManageList.fileUpload[fileUploadIndex].state = '上传失败';
								this.fileManageList.fileUpload[fileUploadIndex].describe =  data.describe;
								this.fileManageList.fileErr.unshift(this.fileManageList.fileUpload[fileUploadIndex]);
								this.fileManageList.fileUpload.splice(fileUploadIndex,1);
								this.fileManageList.num = this.fileManageList.num -1;
							}
							
							
						}
						break;
					case 1:
						var fileDownIndex = this.fileManageList.fileDown.findIndex(findFile);
						if(fileDownIndex>-1){
							if(results=="0"){
								this.fileManageList.fileDown[fileDownIndex].process = 0;
								this.fileManageList.fileDown[fileDownIndex].speed = "";
								this.fileManageList.fileDown[fileDownIndex].state = '下载完成';
								this.fileManageList.fileSuccess.unshift(this.fileManageList.fileDown[fileDownIndex]);
								this.fileManageList.fileDown[fileDownIndex].setComplete(this.fileManageList.fileDown[fileDownIndex]);
								this.fileManageList.fileDown.splice(fileDownIndex,1);
								this.fileManageList.num = this.fileManageList.num -1;
							}else if(results=="1"){
								var errNum = this.fileManageList.fileDown[fileDownIndex].errNum;
								errNum = errNum==undefined||errNum==null||errNum==""?0:errNum
								if(errNum<10){
									console.log("失败重试")
									this.fileManage(this.fileManageList.fileDown[fileDownIndex]);
									this.fileManageList.fileDown[fileDownIndex].errNum = errNum + 1;
								}else{
									this.fileManageList.fileDown[fileDownIndex].state = '下载失败';
									this.fileManageList.fileDown[fileDownIndex].describe =  data.describe;
									this.fileManageList.fileErr.unshift(this.fileManageList.fileDown[fileDownIndex]);
									this.fileManageList.fileDown.splice(fileDownIndex,1);
									this.fileManageList.num = this.fileManageList.num -1;
								}
							}
						}
						break;
					case 2:
					
						break;
				};
				
			},
		
			
			
			//发起截屏
			startScreenshots(){
				var data = {
					"type": "onScreenshots",
					"id": this.$TGYC.getcurrentStamp()
				};
				var dataStr = JSON.stringify(data);
				this.websocketsend(dataStr);
			},
			
			//发起录音
			startRecord(){
				var data = {
					"type": "onRecord",
					"id": this.$TGYC.getcurrentStamp()
				};
				var dataStr = JSON.stringify(data);
				this.websocketsend(dataStr);
			},
			//发起录屏
			startScreen(){
				var data = {
					"type": "onScreen",
					"id": this.$TGYC.getcurrentStamp()
				};
				var dataStr = JSON.stringify(data);
				this.websocketsend(dataStr);
			},
			
			
			//显示确认提交弹框
			feedbackConfirmBox(data){
				console.log('显示提交反馈');
				console.log(data);
				
				// {type: "endScreen", id: 1, path: "C:/Temp/mp4/1605518406.mp4"}
				// endScreen   endRecord   endScreenshots
				
				var feedbackType = data.type;
				var path = data.path;
				var type;
				switch (feedbackType){
					case 'endScreenshots':
						type = 1;
						break;
					case 'endRecord':
						type = 3;
						break;
					case 'endScreen':
						type = 2;
						break;
				};
				this.newFeedBackData.id = data.id;
				this.newFeedBackData.type = type;
				this.newFeedBackData.path = path;
				if(this.newFeedBackData.path!=''&&this.newFeedBackData.path!="None"){
					this.newFeedBackBox = true;
					
				};
			},
			// 取消反馈
			closeFeedBack(){
				this.$confirm('确认退出此次反馈？', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.newFeedBackBox = false;
					this.newFeedBackData.type = '';
					this.newFeedBackData.path = '';
					this.newFeedBackText = "";
				}).catch(() => {
					      
				});
			},
			submitFeedBack(){
				console.log('现在提交反馈');
				
				console.log(this.feedbackSelect);
				console.log(this.newFeedBackData);
				
				
				
				//获取选中
				var getCurrentSelect = ()=>{
					//存储反馈选中资源列表(并作出相应动作)
					this.$CSINTERFACE.evalScript("getSlectionRes()",(el)=>{
						if(el!="err"){
							var elData = JSON.parse(el);
							this.feedbackSelect = elData;
							console.log("选中对象");
							console.log(elData);
							if(elData.data.length>0){
								// 获取权限及资源信息
								this.currentOperationCode = 5
								this.getTaskAndResources(elData)
							}else{
								this.$notify(
									{
										message: '请先选择时间轴对象，再提交！！！',
										type: 'warning',
							  position: 'bottom-right'
									}
								);
							}
						}
					})
				}
				
				//初始化数据
				var selectInitData = ()=>{
					this.feedbackSelect = {}
					this.newFeedBackData = {}
				}
				
				//提交反馈
				var startSubmitFeedBack = ()=>{
					
					this.newFeedBackBox = false;
					
					var identifyCode = this.feedbackSelect.identifyCode;
					var path_listData = this.feedbackSelect.data;
					var path_list = [];
					for(var i=0;i<path_listData.length;i++){
						var tharr = {
							local_name:path_listData[i].name,
							local_url:path_listData[i].fileDir
						};
						path_list.push(tharr);
					}
					var path_listStr = JSON.stringify(path_list);
					var feedId = this.$TGYC.getcurrentStamp();
					var feedbackType = this.newFeedBackData.type;
					var feedbackPath = this.newFeedBackData.path;
					var feedbackElaborate = this.newFeedBackText;
					
					if(feedbackType==0||feedbackType==4){
						
						if(this.newFeedBackText!=""){
							var submitData = {
								identifyCode:identifyCode,
								path_list:path_listStr,
								type:feedbackType,
								content:feedbackElaborate,
								position:'0',
								elaborate:''
							};
							
							this.$PRAPI.prResourcesFeedback.BatchPathAddFeedback(submitData).then(res => {
								// console.log(res)
								selectInitData()
								// this.newFeedBackBox = false;
								// 刷新资源详情页面
								this.updataResourcesPage();
								
								
							}, err => {
								console.log(err);
							});
						}else{
							this.$notify({
								message: '反馈内容不能为空',
								type: 'warning',
							  position: 'bottom-right'
							});
						}
						
					}else if(feedbackType==1||feedbackType==2||feedbackType==3){
						// var loadingInstance =Loading.service();
						var path = feedbackPath;
						//查看文件大小，判断文件是否能找到
						this.$FS.stat(path, (err, stats) => {
							if (!err) {
								
								var pathIndex = path.lastIndexOf('/')	;
								var local_name = path.slice(pathIndex + 1, path.length);
								var local_url = path.slice(0, pathIndex);
								var service_name = local_name;
								var service_url = '/rec';
								var service_path = service_url + '/' + service_name;
						
								var fileData = {
									id:feedId,
									type:0,
									operation:0,
									local_name: local_name,
									local_url: local_url,
									service_name: service_name,
									service_url: service_url ,
									setComplete:(data) =>{	//完成回调
										
										var submitData = {
											identifyCode:identifyCode,
											path_list:path_listStr,
											type:feedbackType,
											content:service_path,
											position:'0',
											elaborate:feedbackElaborate
										};
										console.log(submitData)
										this.$PRAPI.prResourcesFeedback.BatchPathAddFeedback(submitData).then(res => {
											console.log(res)
											selectInitData()
											// this.newFeedBackBox = false;
											// loadingInstance.close();
											this.updataResourcesPage();
										}, err => {
											console.log(err);
										});
										
									},
									setProgress:(passNum) =>{	//进度回调
										
									},
								};
								
								this.fileManageList.num = this.fileManageList.num +1;
								this.fileManageList.fileUpload.push(fileData);
								this.fileManage(fileData);
								
							} else {
								console.log('文件未找到');
							}
						})
					}
				}
				
				
				if(this.feedbackSelect.data){
					if(this.feedbackSelect.data.length>0){
						startSubmitFeedBack()
					}else{
						getCurrentSelect()
					}
				}else{
					getCurrentSelect()
				}
				
				
			},
			// 更新资产页面
			updataResourcesPage(){
				console.log("------");
				// console.log(app); 
				var that = window.topVue
				// var onePage = this.$children[0].$children;
				var onePage = that.$children;
				console.log(onePage);
				if(onePage!=undefined){
					var pageList = onePage;
					for(var i=0;i<pageList.length;i++){
						var currentSysModel = pageList[i].sysModel;
						if(currentSysModel == "任务资源"){
							console.log(i);
							pageList[i].myInit();
						};
					};
					
				}
				console.log("++++++");
			},
		
			
			setSelectionResourcesState(stateCode){
				
				this.$CSINTERFACE.evalScript("getSlectionRes()",(el)=>{
					console.log('当前选中项为');
					console.log(el);
					if(el!="err"){
						var elData = JSON.parse(el);
						var resList;
						
						
						if(elData.data.length>0){
							var selectionData = elData.data;
							var currentIdentifyCode = elData.identifyCode;
							var pathData = [];
							var fileList = []
							for(var i=0;i<selectionData.length;i++){
								var thArr = {
									local_name:selectionData[i].fileName,
									local_url:selectionData[i].fileDir
								};
								pathData.push(thArr);
								
								var fhArr = {
									number:selectionData[i].fileName,
									path:selectionData[i].fileDir
								}
								fileList.push(fhArr)
							}
							

							var startStateFc = ()=>{
								
								var bigStateCode = stateCode.code
								var subStateCode = stateCode.subCode
								var currentProp = stateCode.prop
								var currentColorIndex = subStateCode!=""&&subStateCode!="0"&&subStateCode!="null" ? subStateCode : this.$TGYC.setResourcesColor(bigStateCode)
								
								var isSubState = subStateCode!=""&&subStateCode!="0"&&subStateCode!="null"&&subStateCode!=null&&subStateCode!=undefined&&subStateCode!="undefined"?true:false;
								
								var submitStateChange = ()=>{
									let data = {
										identifyCode:currentIdentifyCode,
										pathList:JSON.stringify(pathData),
										state:bigStateCode,
										sub_state:subStateCode,
									};
									this.$PRAPI.prResourcesRecord.BatchUpdPathState(data).then(res => {
										var pathList = [];
										for(var i=0;i<selectionData.length;i++){
											var tharr = {
												path:selectionData[i].filepath,
												stateCode:bigStateCode,
												colorCode:currentColorIndex
											};
											pathList.push(tharr);
										}
										pathList = JSON.stringify(pathList);
										console.log(pathList)
										pathList = encodeURI(pathList);
										var jsonfnPath = 'SetProjectItemColor("'+pathList+'")';
										this.$CSINTERFACE.evalScript(jsonfnPath);
									}, err => {
										console.log(err);
									});
								}
								
								
								
								switch (bigStateCode){
									case "0":
										// if(!this.currentUserJurisdiction.resAddFeedback){
										// 	this.$TGYC.sendErr("您没有权限！！！");
										// 	return false
										// };
										// 资源都是我的资源可以提交审核
										var isAllMyRes = this.getResPersonnel(resList)
										console.log("是否是我的任务")
										console.log(isAllMyRes)
										console.log(this.currentUserJurisdiction.resEditStateReview)
										if(isAllMyRes||this.currentUserJurisdiction.resEditStateReview){
											if(isSubState){
												if(!this.currentUserJurisdiction[currentProp]){
													this.$TGYC.sendErr("您没有修改子状态权限！！！");
													return false
												}
											}
											submitStateChange()
										}else{
											this.$TGYC.sendErr(this.errResNameList + "不是你的资源，请确认后重试！！！");
										}
										
										break;
									case "1":
										if(!this.currentUserJurisdiction.resEditStateRepair){
											this.$TGYC.sendErr("您没有权限！！！");
											return false
										};
										if(isSubState){
											if(!this.currentUserJurisdiction[currentProp]){
												this.$TGYC.sendErr("您没有修改子状态权限！！！");
												return false
											}
										}
										submitStateChange()
										break;
									case "2":
										if(!this.currentUserJurisdiction.resEditStateComplete){
											this.$TGYC.sendErr("您没有权限！！！");
											return false
										};
										if(isSubState){
											if(!this.currentUserJurisdiction[currentProp]){
												this.$TGYC.sendErr("您没有修改子状态权限！！！");
												return false
											}
										}
										submitStateChange()
										break;
									case "4":
										// if(!this.currentUserJurisdiction.resAddFeedback){
										// 	this.$TGYC.sendErr("您没有权限！！！");
										// 	return false
										// };
										// 资源都是我的资源可以提交审核
										var isAllMyRes = this.getResPersonnel(resList)
										if(isAllMyRes||this.currentUserJurisdiction.resEditStateInProduction){
											// if(isSubState){
											// 	if(!this.currentUserJurisdiction[currentProp]){
											// 		this.$TGYC.sendErr("您没有修改子状态权限！！！");
											// 		return false
											// 	}
											// }
											submitStateChange()
										}else{
											this.$TGYC.sendErr(this.errResNameList + "不是你的资源，请确认后重试！！！");
										}
										
										break;	
									case "5":
										if(!this.currentUserJurisdiction.resEditStateNonProduction){
											this.$TGYC.sendErr("您没有权限！！！");
											return false
										};
										submitStateChange()
										break;
								}
									
									
								
							}
							
							var changeResLenFc = ()=>{
								var fileLen = elData.data.length;
								if(fileLen<=10){
									startStateFc()
								}else if(fileLen>10){
									this.$confirm('确认为此（'+fileLen+')个文件修改状态？', '提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
										type: 'warning'
									}).then(() => {
										startStateFc()
									}).catch(() => {
										this.$TGYC.sendErr("已取消操作");
									});
								}
							}
							
							var getPrResData = ()=>{
								//先查文件，后执行修改状态
								if(this.currentUserJurisdiction.resCompleteEditState){
									changeResLenFc()
								}else{
									let fdata = {
										identifycode:currentIdentifyCode,
										resList:JSON.stringify(fileList),
									};
									this.$PRAPI.prResources.BatchGGetPrResources(fdata).then(res => {
										// console.log(res)
										if(res.length>0){
											var submitState = true;
											function findS2(list){
												return list.state == "2"
											}
											var stateSCIndex = res.findIndex(findS2)
											if(stateSCIndex>-1){
												this.$TGYC.sendErr("有已完成的任务，后续环节已开始，如需修改，请联系制片修改！！！");
											}else{
												changeResLenFc()
											}
										}else{
											this.$TGYC.sendErr("未找到任务");
										}
										
									}, err => {
										console.log(err);
									});
								}
							}
							let formData = {
								identifyCode:elData.identifyCode,
								pathList:JSON.stringify(pathData)
							}
							this.$PRAPI.prtask.GetRolePrresources(formData).then(res => {
								this.currentTaskRes = res.res
								this.setTaskRoleList(res.project,res.res)
								resList = res.res
								getPrResData()
								
							}, err => {
								console.log(err)
							});
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
			getResPersonnel(data){
				console.log("选中文件")
				console.log(data)
				
				var isMyRes = true
				var otherName = ""
				for (var item in data) {
					
					var isOutsourcing = data[item].outsourcing
					isOutsourcing = isOutsourcing==""||isOutsourcing==null||isOutsourcing==undefined||isOutsourcing=="null"?0:isOutsourcing;
					
					if(isOutsourcing=="0"&&data[item].personnel_id==this.$store.state.userInfo.id){
						
					}else if(isOutsourcing=="1"&&data[item].company_id==this.$store.state.userInfo.companyid){
						
					}else{
							isMyRes = false
							otherName = otherName + data[item].local_name + ","
					}
					
				}
				this.errResNameList = otherName
				return isMyRes
			},
			
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
				console.log(this.personnelList);
			},
			setPersonnel(){
				// 设置资源负责人、
				console.log("设置负责人");
				this.getUser();
				this.getCompany();
				this.newResPersonnelBox = true;
				this.selectPersonnel = "";
				this.selectCompany = "";
				this.makeType = 0;
			},
			submitResPersonnel(){
				// console.log("提交资源负责人");
				// console.log(this.selectPersonnel);
				// console.log(this.feedbackSelect);
		
				var currentOutsourcing = this.makeType;
				var currentCompany_id = this.selectCompany;
				var currentCompany_name = "";
				var currentSelectPersonnel = this.selectPersonnel;
				var currentPersonnelName = "";
				// console.log(currentOutsourcing)
				// console.log(currentSelectPersonnel)
				// console.log(currentCompany_id)
				if(currentOutsourcing=="0"){
					
					if(currentSelectPersonnel==0||currentSelectPersonnel==""){
						console.log(666)
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
				
				this.$CSINTERFACE.evalScript("getSlectionRes()",(el)=>{
					// console.log('当前选中项为');
					// console.log(el);
					if(el!="err"){
						var elData = JSON.parse(el);
						if(elData.data.length>0){
							var selectionData = elData.data;
							var currentIdentifyCode = elData.identifyCode;
							var pathData = [];
							for(var i=0;i<selectionData.length;i++){
								var thArr = {
									local_name:selectionData[i].fileName,
									local_url:selectionData[i].fileDir
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
							
						}else{
							this.$notify({
								message: '未找到时间轴选中对象!!!',
								type: 'warning',
							  position: 'bottom-right'
							});
						}
					}	
				});
			
			},
			closeResPersonnel(){
				console.log("关闭选择负责人");
				this.newResPersonnelBox = false;
				this.selectPersonnel = "";
				this.selectCompany = "";
				this.makeType = 0;
			},
			//资源右键事件
			fileMenu(event) {
				var menuData = [];
				switch (this.fileDialogTitle){
					case "upload":
						menuData.push(
							{
								label: "重试",
								onClick: () => {
									this.retryUp()
								}
							}
						)
						menuData.push(
							{
								label: "取消",
								onClick: () => {
									this.cancelUp()
								}
							}
						)
						break;
					case "down":
						menuData.push(
							{
								label: "重试",
								onClick: () => {
									this.retryDown()
								}
							}
						)
						menuData.push(
							{
								label: "取消",
								onClick: () => {
									this.cancelDown()
								}
							}
						)
						break;
					case "errData":
						menuData = [
							{
								label: "忽略错误",
								onClick: () => {
									this.clearFileErr()
								}
							},
							
						]
						break;
				}
				if(menuData.length>0){
					this.$contextmenu({
						items: menuData,
						event,
						customClass: "tgycContextMenu",
						zIndex: 9999,
						minWidth: 130,
					});
				}else{
					
				}
				return false;
			},
			//清除错误
			clearFileErr(){
				this.fileManageList.fileErr = []
			},
			retryUp(){
				console.log("重试上传")
				console.log(this.fileManageList.fileUpload)
				
				var currentData = this.fileManageList.fileUpload
				for(var i=currentData.length-1;i>-1;i--){
					var fileData = currentData[i];
					var thFileData = {
						"id":fileData['id'],
						"type":0,
						"operation":1,
					};
					
					var socketData = {
						"type":"file",
						"data":thFileData
					};
					var socketData = JSON.stringify(socketData);
					this.websocketsend(socketData);
				}
				for(var i=currentData.length-1;i>-1;i--){
					var fileData = currentData[i];
					var thFileData = {
						"id":fileData['id'],
						"type":fileData['type'],
						"operation":fileData['operation'],
						"local_name":fileData['local_name'],
						"local_url":fileData['local_url'],
						"service_name":fileData['service_name'],
						"service_url":fileData['service_url'],
						"mtime":fileData['updtime']
					};
					
					var socketData = {
						"type":"file",
						"data":thFileData
					};
					var socketData = JSON.stringify(socketData);
					this.websocketsend(socketData);
					
				}
			},
			//取消上传
			cancelUp(){
				console.log("取消上传")
				console.log(this.fileManageList.fileUpload)
				
				var currentData = this.fileManageList.fileUpload
				for(var i=currentData.length-1;i>-1;i--){
					var fileData = currentData[i];
					var thFileData = {
						"id":fileData['id'],
						"type":0,
						"operation":1,
					};
					
					var socketData = {
						"type":"file",
						"data":thFileData
					};
					var socketData = JSON.stringify(socketData);
					this.websocketsend(socketData);
					this.fileManageList.fileUpload.splice(i,1)
					this.fileManageList.num = this.fileManageList.num -1;
				}
			},
			retryDown(){
				console.log("重试下载")
				console.log(this.fileManageList.fileDown)
				
				var currentData = this.fileManageList.fileDown
				for(var i=currentData.length-1;i>-1;i--){
					var fileData = currentData[i];
					var thFileData = {
						"id":fileData['id'],
						"type":1,
						"operation":1,
					};
					
					var socketData = {
						"type":"file",
						"data":thFileData
					};
					var socketData = JSON.stringify(socketData);
					this.websocketsend(socketData);
				}
				for(var i=currentData.length-1;i>-1;i--){
					var fileData = currentData[i];
					var thFileData = {
						"id":fileData['id'],
						"type":fileData['type'],
						"operation":fileData['operation'],
						"local_name":fileData['local_name'],
						"local_url":fileData['local_url'],
						"service_name":fileData['service_name'],
						"service_url":fileData['service_url'],
						"mtime":fileData['updtime']
					};
					
					var socketData = {
						"type":"file",
						"data":thFileData
					};
					var socketData = JSON.stringify(socketData);
					this.websocketsend(socketData);
					
				}
				
			},
			//取消下载
			cancelDown(){
				console.log("取消下载")
				console.log(this.fileManageList.fileDown)
				
				var currentData = this.fileManageList.fileDown
				for(var i=currentData.length-1;i>-1;i--){
					var fileData = currentData[i];
					var thFileData = {
						"id":fileData['id'],
						"type":1,
						"operation":1,
					};
					
					var socketData = {
						"type":"file",
						"data":thFileData
					};
					var socketData = JSON.stringify(socketData);
					this.websocketsend(socketData);
					this.fileManageList.fileDown.splice(i,1)
					this.fileManageList.num = this.fileManageList.num -1;
				}
				
			},
			
			// 关联脱机文件
			setLinkFile(){
				var loadingInstance =Loading.service();
				this.$CSINTERFACE.evalScript("setLinkFile()", (el) => {
					loadingInstance.close();
					this.$notify({
						message: '执行完毕',
						type: 'warning',
							  position: 'bottom-right'
					});
				})
			},
			
			
			//提交搜索
			searchResSubmit(){
				// console.log("开始搜索")
				var searchContent = this.searchContent
				// console.log("需要搜索的关键字")
				// console.log(searchContent)
				if(searchContent==""){
					return false
				}
				var resList = [];
				var loadingInstance =Loading.service();
				// 查询所有资源
				this.$CSINTERFACE.evalScript("getProjectResPath()",(el)=>{
					console.log("资源列表")
					console.log(el)
					loadingInstance.close();
					var resArr = el
					resArr = resArr==""||resArr==null||resArr=="null"||resArr==undefined ? [] : JSON.parse(resArr);
					for(var i=0;i<resArr.length;i++){
						var fileName = resArr[i];
						var fileIndex = fileName.lastIndexOf("/");
						if(fileIndex>-1){
							var local_name = fileName.slice(fileIndex+1,fileName.length);
							var local_url = fileName.slice(0,fileIndex);
							
							var currentName = fileName.slice(fileIndex+1,fileName.length);
							// 处理对比数据，将大写转成小写
							currentName = currentName.toLowerCase();
							searchContent = searchContent.toLowerCase();
							var isIncloud = currentName.indexOf(searchContent);
							if(isIncloud>-1){
								var thPath = {
									path : fileName,
									name : currentName,
									local_name:local_name,
									local_url:local_url,
								}
								resList.push(thPath);
							}
						}
					}
					if(resList.length==0){
						this.$notify({
							message: '未找到',
							type: 'warning',
							  position: 'bottom-right'
						});
					}
					// console.log(resList)
					this.searchData = resList
				})
			},
			openSearchResBox(){
				this.searchResBox = true;
			},
			// 向左跳转
			jumpResLeft(path){
				this.selectResData.type = "pre"
				var currentPath = this.selectResData.path;
				if(path!=currentPath){
					this.selectResData.path = path;
					this.selectResData.index = 0;
					
				}else{
					if(this.selectResData.index>0){
						this.selectResData.index = this.selectResData.index-1
					}else{
						this.selectResData.index = 0
						this.$notify({
							message: '已经是第一个',
							type: 'warning',
							  position: 'bottom-right'
						});
					}
				}
				this.jumpResCtr()
			},
			// 向右跳转
			jumpResRight(path){
				this.selectResData.type = "next"
				var currentPath = this.selectResData.path;
				if(path!=currentPath){
					this.selectResData.path = path;
					this.selectResData.index = 0;
				}else{
					this.selectResData.index = this.selectResData.index+1
				}
				this.jumpResCtr()
			},
			// 选中资源剪辑
			selectRes(path){
				var currentPath = this.selectResData.path;
				if(path!=currentPath){
					this.selectResData.path = path;
					this.selectResData.index = 0;
					this.selectResData.type = "select"
				}else{
					this.selectResData.type = "select"
				}
				this.jumpResCtr()
			},
			jumpResCtr(){
				var thData = JSON.stringify(this.selectResData);
				thData = encodeURI(thData);
				var jsonfnPath = 'preSelectResClips("'+thData+'")';
				var loadingInstance =Loading.service();
				this.$CSINTERFACE.evalScript(jsonfnPath, (el) => {
					// console.log("+++++++")
					// console.log(el)
					loadingInstance.close();
					var data = JSON.parse(el)
					switch (data.type){
						case "next":
							if(data.data == "max"){
								this.selectResData.index = this.selectResData.index-1
								this.$notify({
									message: '已经是最后一个',
									type: 'warning',
							  position: 'bottom-right'
								});
							}
							break;
					}
					if(data.res.length==0){
						this.$notify({
							message: '未找到剪辑片段',
							type: 'warning',
							  position: 'bottom-right'
						});
					}
				})
			},
			jumpResDetaileChange(val){
				// console.log(val)
				// 查询所有资源
				var eventStr = "clickEventCtr("+ val +")"
				this.$CSINTERFACE.evalScript(eventStr,(el)=>{
					console.log("当前事件点击状态")
					console.log(el)
					if(val){
						this.$notify({
							message: '已开启资源详情跳转',
							type: 'success',
							  position: 'bottom-right'
						});
					}else{
						this.$notify({
							message: '已关闭资源详情跳转',
							type: 'success',
							  position: 'bottom-right'
						});
					}
				})
			},
			//导出剪辑信息
			downTrackSelectResCtr(){
				this.$CSINTERFACE.evalScript("getProjectTrack()", (el) => {
					console.log(el)
					var thData = el
					thData = JSON.parse(thData)
					this.projectTrack = thData;
					this.projectTrack.audioTracksData = []
					this.projectTrack.videoTracksData = []
					for(var i=0;i<thData.audioTracks;i++){
						var thArr = {
							type:"audioTracks",
							code:i,
							select:false
						}
						
						this.projectTrack.audioTracksData.push(thArr)
					}
					for(var i=0;i<thData.videoTracks;i++){
						var thArr = {
							type:"videoTracks",
							code:i,
							select:false
						}
						this.projectTrack.videoTracksData.push(thArr)
					}
					console.log(this.projectTrack)
					this.downTrackSelectBox = true
				})
			},
			submitDownTrackSelect(fileType){
				console.log("提交下载")
				var loadingInstance =Loading.service();
				console.log(this.projectTrack)
				// 搜寻需要下载的资源
				var thData = this.projectTrack
				var needDownData = []
				for(var i=0;i<thData.audioTracksData.length;i++){
					if(thData.audioTracksData[i].select){
						var thArr = {
							type:"audioTracks",
							trackNum:i,
						}
						needDownData.push(thArr)
					}
				}
				for(var i=0;i<thData.videoTracksData.length;i++){
					if(thData.videoTracksData[i].select){
						var thArr = {
							type:"videoTracks",
							trackNum:i,
						}
						needDownData.push(thArr)
					}
				}
				console.log(needDownData)
				var importData = JSON.stringify(needDownData);
				console.log(importData)
				importData = encodeURI(importData);
				console.log(importData)
				var jsonfnPath = 'getTrackClips("'+importData+'")';
				
				this.$CSINTERFACE.evalScript(jsonfnPath, (el) => {
					console.log("返回的数据")
					console.log(el)
					// 导出文件到桌面
					
					// var filename='C:/Users/zhangjiliang/AppData/Roaming/Adobe/CEP/extensions/code/public/table.xlsx';
					// var obj = xlsx.readFile(filename);
					var fileData = []
					var fileJsonData = []
					var fileList = []
					var thdata = JSON.parse(el)
					for(var i=0;i<thdata.length;i++){
						var currentClips = thdata[i].clips;
						for(var b=0;b<currentClips.length;b++){
							var path = currentClips[b].path;
							var pathIndex = path.lastIndexOf('/');
							var thName = path.slice(pathIndex + 1, path.length);
							var thPath = path.slice(0, pathIndex);;
							var thType = thdata[i].type=="videoTracks"?"视频":"音频";
							var thTrack = thdata[i].trackNum+1;
							console.log(thName)
							var duration = currentClips[b].duration;
							duration = this.$TGYC.timeToFrame(duration)
							var start = currentClips[b].start;
							start = this.$TGYC.timeToFrame(start)
							var end = currentClips[b].end;
							end = this.$TGYC.timeToFrame(end)
							var inPoint = currentClips[b].inPoint;
							inPoint = this.$TGYC.timeToFrame(inPoint)
							var outPoint = currentClips[b].outPoint;
							outPoint = this.$TGYC.timeToFrame(outPoint)
							var speed = currentClips[b].speed
							var frame = currentClips[b].frame
							
							
							var thFrame = 0
							var thArr = {
								name:thName,
								path:thPath,
								type:thType,
								track:thTrack,
								duration:duration,
								start:start,
								end:end,
								inPoint:inPoint,
								outPoint:outPoint,
								speed:speed,
								frame:frame,
							}
							fileData.push(thArr)
							
							var jsonArr = {
								name:thName,
								type:thdata[i].type,
								track:thTrack,
								track_in:start,
								track_out:end,
								movie_in:inPoint,
								movie_out:outPoint,
								scale:speed,
								fps:frame,
							}
							fileJsonData.push(jsonArr)
							
							var fhArr = {
								number:thName,
								path:thPath
							}
							fileList.push(fhArr)
						}
						
					}
					var myhome = this.$OS.homedir()
					if(fileType=="excel"){
						
						this.$CSINTERFACE.evalScript("gerProjectDocumentID()", (subEl) => {
							console.log(subEl)
							var identifycode = subEl
							
							let data = {
								identifycode:identifycode,
								resList:JSON.stringify(fileList),
							};
							this.$PRAPI.prResources.BatchGGetPrResources(data).then(res => {
								console.log(res)
								var currengResData = res
								for(var i=0;i<fileData.length;i++){
									var currentState = "";
									var currentStateTime = "";
									var currentStateUser = "";
									var currentUploadTime = "";
									var currentUploadUser = "";
									var substateName = "";
									function findRes(list){
										return list.number == fileData[i].name && list.path == fileData[i].path
									}
									var resIndex = currengResData.findIndex(findRes)
									if(resIndex>-1){
										currentState = currengResData[resIndex].state
										if(currengResData[resIndex].resources_log){
											currentStateTime = currengResData[resIndex].resources_log[0].time
											currentStateUser = currengResData[resIndex].resources_log[0].operation_name
											
										}
										currentUploadTime = currengResData[resIndex].time
										currentUploadUser = currengResData[resIndex].upload_personnel_name
										substateName = currengResData[resIndex].sub_state!="0"&&currengResData[resIndex].sub_state!=null?currengResData[resIndex].sub_state_name:this.$TGYC.setResourcesStateName(currengResData[resIndex].state);
									}
									fileData[i].state = currentState!=""? this.$TGYC.setResourcesStateName(currentState):""
									fileData[i].stateTime = currentStateTime!=""? this.$TGYC.stampToDateMD(currentStateTime):""
									fileData[i].stateUser = currentStateUser
									fileData[i].uploadTime = currentUploadTime!=""? this.$TGYC.stampToDateMD(currentUploadTime):""
									fileData[i].uploadUser = currentUploadUser
									fileData[i].prState = substateName
								}
								var mydataa = {
								    'sheet1':{
								        title:{
											name:'文件名',
											path:'路径',
											type:"类型",
											track:"轨道",
											duration:"帧数",
											start:"开始帧",
											end:"结束帧",
											inPoint:"入点帧",
											outPoint:"出点帧",
											speed:"速度",
											frame:"帧速",
											state:"状态",
											stateTime:"状态时间",
											stateUser:"状态人",
											uploadTime:"上传时间",
											uploadUser:"上传人",
											prState:"PR状态"
										},
								        json:fileData
								    }
								}
								console.log(mydataa)
								var filename = myhome + "\\Desktop\\轨道数据.xlsx"
								
								this.exportExcel(mydataa,filename)
								
								this.closeDownTrackSelect()
								// 导出成功
								loadingInstance.close();
								this.$notify({
								  message: '导出到桌面成功',
								  type: 'success',
							  position: 'bottom-right'
								});
							}, err => {
								console.log(err);
							});
							
						})
						
						
					}else if(fileType=="json"){
						
						// 写入需要的文件
						var exportData = JSON.stringify(fileJsonData);
						
						// console.log(myhome)
						var jsonPath = myhome + "\\Desktop\\trackData.json"
						this.$FS.writeFile(jsonPath,exportData, error=>{
						    if (error){
						        console.log(error);
						    }else{
						        this.closeDownTrackSelect()
						        // 导出成功
						        loadingInstance.close();
						        this.$notify({
						          message: '导出到桌面成功',
						          type: 'success',
							  position: 'bottom-right'
						        });
						    }
						})
						
						
					}
				})
			
			},
			
			// 导出表格
			exportExcel(data,fileName){
				// /**
				//  * 多个sheet下载
				//  * @param {object} data 
				//  * @param data.Sheet1.title {}
				//  * @param data.Sheet1.data []
				//  * @param {string} fileName 文件名称
				//  * data格式
				//  * {
				//     'sheet1':{
				//         title:{name:'名字',age:'年龄'},
				//         json:[{name:'sd',age:1999}]
				//     },
				//     'sheet2':{
				//         title:{name:'名字',age:'年龄'},
				//         json:[{name:'z',age:195}]
				//     },
				//     }
				//  */
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
				xlsx.writeFile(workBook,fileName, wopts)
				
				
				
			},
			
			//导出选中剪辑
			submitDownTrackSelectClips(){
				var loadingInstance =Loading.service();
				this.$CSINTERFACE.evalScript("getTrackSelectClips()", (el) => {
					console.log("返回的数据")
					console.log(el)
					
					var fileData = []
					var thdata = JSON.parse(el)
					var fileList = []
					for(var i=0;i<thdata.length;i++){
						var currentClips = thdata[i];
						
						var path = currentClips.path;
						var pathIndex = path.lastIndexOf('/');
						var thName = path.slice(pathIndex + 1, path.length);
						var thPath = path.slice(0, pathIndex);;
						var thType = currentClips.type;
						var thTrack = currentClips.track;
						
						var duration = currentClips.duration;
						duration = this.$TGYC.timeToFrame(duration)
						var start = currentClips.start;
						start = this.$TGYC.timeToFrame(start)
						var end = currentClips.end;
						end = this.$TGYC.timeToFrame(end)
						var inPoint = currentClips.inPoint;
						inPoint = this.$TGYC.timeToFrame(inPoint)
						var outPoint = currentClips.outPoint;
						outPoint = this.$TGYC.timeToFrame(outPoint)
						var speed = currentClips.speed
						var frame = currentClips.frame
						var thFrame = 0
						var thArr = {
							name:thName,
							path:thPath,
							type:thType,
							track:thTrack,
							duration:duration,
							start:start,
							end:end,
							inPoint:inPoint,
							outPoint:outPoint,
							speed:speed,
							frame:frame,
						}
						fileData.push(thArr)
						
						var fhArr = {
							number:thName,
							path:thPath
						}
						fileList.push(fhArr)
					}
					
					var startExport = (thData)=>{
						var myhome = this.$OS.homedir()
						var mydataa = {
							'sheet1':{
								title:{
									name:'文件名',
									path:'路径',
									type:"类型",
									track:"轨道",
									duration:"帧数",
									start:"开始帧",
									end:"结束帧",
									inPoint:"入点帧",
									outPoint:"出点帧",
									speed:"速度",
									frame:"帧速",
									state:"状态",
									stateTime:"状态修改时间",
									uploadTime:"上传时间"
								},
								json:thData
							}
						}
						console.log(mydataa)
						var filename = myhome + "\\Desktop\\轨道数据.xlsx"
										
						this.exportExcel(mydataa,filename)
						
						this.closeDownTrackSelect()
						// 导出成功
						loadingInstance.close();
						this.$notify({
						  message: '导出到桌面成功',
						  type: 'success',
							  position: 'bottom-right'
						});
					}
					
					this.$CSINTERFACE.evalScript("gerProjectDocumentID()", (subEl) => {
						console.log(subEl)
						var identifycode = subEl
						
						let data = {
							identifycode:identifycode,
							resList:JSON.stringify(fileList),
						};
						this.$PRAPI.prResources.BatchGGetPrResources(data).then(res => {
							console.log(res)
							var currengResData = res
							for(var i=0;i<fileData.length;i++){
								var currentState = "";
								var currentStateTime = "";
								var currentUploadTime = "";
								function findRes(list){
									return list.number == fileData[i].name && list.path == fileData[i].path
								}
								var resIndex = currengResData.findIndex(findRes)
								if(resIndex>-1){
									currentState = currengResData[resIndex].state
									if(currengResData[resIndex].resources_log){
										currentStateTime = currengResData[resIndex].resources_log[0].time
									}
									currentUploadTime = currengResData[resIndex].time
								}
								fileData[i].state = currentState!=""? this.$TGYC.setResourcesStateName(currentState):""
								fileData[i].stateTime = currentStateTime!=""? this.$TGYC.stampToDateMD(currentStateTime):""
								fileData[i].uploadTime = currentUploadTime!=""? this.$TGYC.stampToDateMD(currentUploadTime):""
							}
							console.log(fileData)
							startExport(fileData);
						}, err => {
							console.log(err);
						});
						
					})
				})
			},
			
			closeDownTrackSelect(){
				this.downTrackSelectBox = false
				this.checkList = []
				this.checkList2 = []
			},
			TracksSelectedChange(checked,type,index){
				this.projectTrack[type][index].select = checked
			},
			//复制文件操作
			startCopyFc(needCopyData){
				console.log("开始处理数据")
				console.log(needCopyData)
				// 清空目标文件
				// 验证本地文件
				// 	没有就下载文件
				// 文件全部存在
				// 复制文件
				// 导入文件
				// 打开loading
				var options = {
					text:"复制中，请稍候"
				}
				var loadingInstance =Loading.service(options);
				var importFileList = ()=>{
					console.log("开始导入操作")
					var importFileArr = {
						pathArr:[],
						fileArr:[]
					}
					for(var i=0;i<needCopyData.length;i++){
						var newPath = needCopyData[i].newPath + "/" + needCopyData[i].newName
						importFileArr.pathArr.push(newPath)
						var thArr = {
							path:newPath,
							trackNum:needCopyData[i].trackNum,
							noneAudioNum:needCopyData[i].noneAudioNum,
							clips:needCopyData[i].clips
						}
						importFileArr.fileArr.push(thArr)
					}
					var importData = JSON.stringify(importFileArr);
					console.log("------------------------")
					console.log(importData)
					importData = encodeURI(importData);
					console.log(importData)
					var jsonfnPath = 'importFileListData("'+importData+'")';
					
					this.$CSINTERFACE.evalScript(jsonfnPath, (el) => {
						// console.log("导入完成")
						// console.log(needCopyData)
						loadingInstance.close();
						//开始处理剪辑
						if(el){
							// 设置剪辑
							this.$notify({
							  message: '操作完成',
							  type: 'success',
							  position: 'bottom-right'
							})
						}else{
							console.log("导入失败")
						}
						
					})
					
				}
				
				var copyFileLen = needCopyData.length
				var endCopy = ()=>{
					if(copyFileLen<=0){
						console.log("复制完成")
						// 开始导入操作
						importFileList()
					}
				}
				var copyFile = ()=>{
					for(var i=0;i<needCopyData.length;i++){
						var path = needCopyData[i].path + "/" + needCopyData[i].name
						var newPathDir = needCopyData[i].newPath
						var newpath = needCopyData[i].newPath + "/" + needCopyData[i].newName
						
						var copyCurrentFile = (oldPath,newPath)=>{
							// this.$FS.copyFile(src, dest[, flags], callback)
							// console.log("开始执行复制")
							// console.log(oldPath)
							// console.log(newPath)
							this.$FS.copyFile(oldPath,newPath,(err)=>{
								if(!err){
									// console.log("文件复制成功")
									// 全部复制完成,开始导入
									copyFileLen--
									endCopy()
								}else{
									// console.log(err)
									copyCurrentFile(oldPath,newPath)
								}
								
							})
						}
						
						var checkDir = (oldPath,newDir,newPath)=>{
							// console.log(oldPath)
							// console.log(newDir)
							// console.log(newPath)
							// 检索路径,没有就新建
							this.$FS.stat(newDir, (err, stats) => {
								if(!err){
									// console.log("可以开始复制")
									copyCurrentFile(oldPath,newPath)
								}else{
									// console.log("0-0-0-")
									// console.log(oldPath)
									// console.log(newDir)
									// console.log(newPath)
									this.$FS.mkdir(newDir,{recursive:true},error=>{
									    if (!error) {
											console.log("文件夹创建成功")
											copyCurrentFile(oldPath,newPath)
									    }else{
											console.log("文件夹创建失败")
											checkDir(oldPath,newDir,newPath)
									    }
									});
								}
							})
						}
						
						checkDir(path,newPathDir,newpath)
					
					}
				}
				
				
				
				
				var needCopyDataLen = needCopyData.length
				var startCopy = ()=>{
					if(needCopyDataLen<=0){
						// console.log("开始执行复制操作")
						copyFile()
					}
				}
				var delFile = (path)=>{
					this.$FS.stat(path, (err, stats) => {
						// console.log(err)
						// console.log(stats)
						if (!err) {
							// console.log("文件找到")
							this.$FS.unlink(path,(err)=>{
								if(!err){
									// console.log("文件已删除")
									needCopyDataLen--
									startCopy()
									
								}else{
									console.log(err)
									delFile(path)
								}
							})
						} else {
							// console.log('文件未找到')
							needCopyDataLen--
							startCopy()
						}
					})
				}
				for(var i=0;i<needCopyData.length;i++){
					var path = needCopyData[i].newPath + "/" + needCopyData[i].newName
					// console.log(path)
					// 检查文件是否存在，如果有就删除
					delFile(path)
				}
			},
			openRes(path){
				this.$TGYC.toFileDir(path)
			}
			
		}
	}
</script>