<template>
	<div>
		<el-row>
			<el-col :span="24" class="taskLogList" v-for="(item,index) in taskLogList">
				<el-col :span="24" class="taskLogContent">
					{{item.describe}}
				</el-col>
				<el-col :span="24" class="taskLogUserBox">
					<div class="taskLogUserThum">
						<img :src="$ASSETBASEURL + item.thum"/>
					</div>
					{{item.name}}
					<div class="taskLogAddTime">
						{{$TGYC.stampToDateMD(item.operating_time)}}
					</div>
				</el-col>
			</el-col>
			<el-col :span="24" class="taskLogPageBox">
				<el-pagination
				    layout="sizes,prev, pager, next"
					:page-size="pageSize"
					:current-page.sync="currentPage"
				    :total="taskLogCount"
					@size-change="taskSizeChange"
					@current-change="taskPageChange"
					>
				</el-pagination>
			</el-col>
		</el-row>
		
	</div>
</template>
<script>
	export default {
		data() {
			return {
				taskListBoxHeight: "height:" + (window.innerHeight - 90) + "px",
				taskId: '', //任务id
				taskLogList:[],//日志列表
				currentPage:1,
				pageSize:50,
				taskLogCount:0
			}
		},
		created: function() {
			this.taskId = this.$route.query.taskId
			this.myInit()
		},
		// 在 `methods` 对象中定义方法
		methods: {
			myInit() {
				this.getTaskLog()
			},
			getTaskLog(){
				var data = {
					prtask_id:this.taskId,
					length:this.pageSize,
					position:this.pageSize*(this.currentPage-1)
				}
				this.$PRAPI.prtaskLog.GetPrTaskLog(data).then(res => {
					this.setTaskLog(res)
				}, err => {
					console.log(err)
				});
			},
			setTaskLog(data) {
				this.taskLogList = data.data
				this.taskLogCount = parseInt(data.count) 
			},
			taskSizeChange(){
				this.getTaskLog()
			},
			taskPageChange(){
				this.getTaskLog()
			}
		}
	}
</script>