<template>
	<div>
		<el-row>
			<el-col :span="24" class="taskHistoryListBox" v-for="(item,index) in taskHistoryData">
				<el-col :span="24" class="taskHistoryList"  @contextmenu.prevent.native="taskMenu(item,$event)">
					<div class="taskHistoryName">
						{{item.local_name}}
					</div>
					<div class="taskHistoryUser">
						{{item.personnel_name}}  {{$TGYC.stampToDateMD(item.time)}}
					</div>
					<div class="taskHistoryIntroduction">
						描述：{{item.introduction}}
					</div>
				</el-col>
				
			</el-col>
		</el-row>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				taskId: '', //任务id
				taskHistoryData:[],//工程历史记录
			}
		},
		created: function() {
			// console.log("工程历史记录")
			// console.log(this.$route.query.taskId)
			this.taskId = this.$route.query.taskId
			this.myInit()
		},
		// 在 `methods` 对象中定义方法
		methods: {
			myInit() {
				this.GetTaskHistory()
			},
			//获取工程历史记录
			GetTaskHistory(){
				let data = {
					prtask_id:this.taskId,
				}
				this.$PRAPI.prtaskHistory.GetAllPrtask(data).then(res => {
					// this.setCompleteData(res)
					console.log("工程历史记录");
					console.log(res)
					this.taskHistoryData = res
				}, err => {
					console.log(err)
				});
			},
			taskMenu(item,event) {
				this.$contextmenu({
					items: [
						{
							label: "打开",
							onClick: () => {
								console.log("打开此版本")
								this.findProject(item)
							}
						},
						{
							label: "下载此版本",
							onClick: () => {
								console.log("下载此版本")
								console.log(item)
								this.downProject(item)
							}
						},
						{
							label: "转到此目录",
							onClick: () => {
								
								var path = item.local_url + "\\"
								var sep = '\\';
								path = path.replace(/\//g, sep);
								
								var cmd="explorer /select," + path;
								var exec = window.tgyc.exec;
								exec(cmd, function(err, stdout, stderr) {
								    if(err){ return console.log(err); }
								});
								
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
			//打开工程
			openProject(path){
				let Pathfile = 'openProjectM("' + path + '")';
				this.$CSINTERFACE.evalScript(Pathfile, (el) => {
					if(el!="err"){
						// 打开成功
					}
				})
			},
			//搜寻项目
			findProject(item){
				// 检测是否已经下载,如果没有下载则下载并打开,如果有则直接打开
				var currentTime = this.$TGYC.stampToDateFileMD(item.time);
				var oldName = item.local_name;
				var index = oldName.lastIndexOf('.');
				
				var fileName = oldName.slice(0,index) + "-" + item.personnel_name + currentTime + oldName.slice(index,oldName.length)
				var path = item.local_url + "/" + fileName;
				// console.log(path)
				
				//查看文件大小，判断文件是否能找到
				this.$FS.stat(path, (err, stats) => {
					if (!err) {
						//打开文件
						this.openProject(path)
					} else {
						//未找到文件，下载
						var downData = {
							"id": "taskProject" + item.id,
							"type": 1,
							"operation": 0,
							"local_name":fileName,
							"local_url": item.local_url,
							"service_name": item.service_name,
							"service_url": item.service_url,
							"process" : 0,
							"updtime":item.updtime,
							"state" : '等待下载',
							"setComplete" : (data) =>{	//完成回调
								this.openProject(path)
							},
							"setProgress" : (passNum) =>{	//进度回调
								
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
							this.$parent.fileManage(downData)
						}
					}
				})
				
			},
		
			// 下载指定工程版本
			downProject(item){
				
				var currentTime = this.$TGYC.stampToDateFileMD(item.time);
				var oldName = item.local_name;
				var index = oldName.lastIndexOf('.');
				
				var fileName = oldName.slice(0,index) + "-" + item.personnel_name + currentTime + oldName.slice(index,oldName.length)
				var downData = {
					"id": "taskProject" + item.id,
					"type": 1,
					"operation": 0,
					"local_name":fileName,
					"local_url": item.local_url,
					"service_name": item.service_name,
					"service_url": item.service_url,
					"process" : 0,
					"updtime":item.updtime,
					"state" : '等待下载',
					"setComplete" : (data) =>{	//完成回调
						// console.log("下载完成")
						this.$notify({
						  message: '下载完成',
						  type: 'success',
									position: 'bottom-right'
						});
					},
					"setProgress" : (passNum) =>{	//进度回调
						
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
					this.$parent.fileManage(downData)
				}
			},
			
		}
	}
</script>