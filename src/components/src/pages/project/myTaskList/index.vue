<template>
	<div>
		<el-row>
			<el-col :span="24" class="taskListBox"	id="taskListBox" :style="taskListBoxHeight">
				<el-col :span="4" v-for="(item,index) in taskList">
					<div class="taskListCard" @click="openTask(item.id,item.project_id)">
						<div class="taskListCardP">
							<div class="taskListImg">
								<img :src="$ASSETBASEURL + item.thum">
							</div>
							<div class="taskListName">
								{{item.name}}
							</div>
						</div>
					</div>
				</el-col>
			</el-col>
			<el-col class="taskDetailePage">
				<el-pagination
				    :current-page.sync="currentPage"
				    :page-size="pageSize"
				    layout="prev, pager, next"
				    :total="pageCount"
					@size-change = 'getTaskList'
					@current-change = 'getTaskList'
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
				taskListBoxHeight: "height:" + (window.innerHeight - 125) + "px",
				taskList:[
					// {
					// 	id:"1",
					// 	name:"ES-01-006",
					// 	thum:"/Upload/20201209/1607516684.jpeg",
					// },
				],
				currentPage:1,
				pageSize:50,
				pageCount:0,
			}
		},
		components: {
			
		},
		created: function() {
			this.myInit()
		},
		// 在 `methods` 对象中定义方法
		methods: {
			myInit() {
				this.getTaskList()
			},
			//获取我的任务
			getTaskList(){
				let data = {
					length:this.pageSize,
					position:(this.currentPage-1)*this.pageSize,
				};
				this.$PRAPI.prResourcesRecord.GetOutsourceTask(data).then(res => {
					// console.log("任务信息")
					// console.log(res)
					this.taskList = res.data;
					this.pageCount = res.count;
				}, err => {
					console.log(err)
				});
			},
			
			openTask(taskId,projectId){
				this.$router.push({
					path: '/index/project/myTask',
					query: {
						taskId: taskId,
						projectId: projectId,
					},
				})
			}
		}
	}
</script>