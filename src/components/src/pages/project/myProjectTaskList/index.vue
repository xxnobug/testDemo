<template>
	<div>
		<el-row>
			<el-col :span="24" class="taskListBox"	id="taskListBox" :style="taskListBoxHeight">
				<el-col :span="4" v-for="(item,index) in taskList">
					<div class="taskListCard" @click="openTask(item)">
						<div class="taskListCardP">
							<div class="taskListImg">
								<img :src="$ASSETBASEURL + item.thum">
							</div>
							<div class="taskListName">
								{{item.project_name}}--{{item.prtask_name}}
							</div>
						</div>
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
					
				};
				this.$PRAPI.prtaskOutsourcing.GetavailableTask(data).then(res => {
					console.log("任务信息")
					console.log(res)
					this.taskList = res;
					// this.pageCount = res.count;
				}, err => {
					console.log(err)
				});
			},
			
			openTask(data){
				this.$router.push({
					path: '/index/project/myProjectTask',
					query: {
						taskId: data.prtask_id,
						projectId: data.project_id,
						projectName:data.project_name,
						taskProjectId:data.task_project_id
					},
				})
			}
		}
	}
</script>