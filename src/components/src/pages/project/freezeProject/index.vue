<template>
	<el-row :gutter="20">
		<el-row class="projectListBox" >
			<el-col :span="8" v-for="item in projectList" @contextmenu.prevent.native="projectMenuD(item.id,$event)">
				<div class="projectListCard" @click="openProject(item.id)" >
					<div class="projectListCardP">
						<div class="projectListImg">
							<img :src="$ASSETBASEURL + item.thum">
						</div>
						<div class="projectListName">
							{{item.name}}
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</el-row>
</template>
<script>
	export default {
		data() {
			return {
				// wdHeigth: window.innerHeight - 90,
				projectList: [
					// {
					// 	id: 0,
					// 	thum: 'http://api.gpu365.net/Upload/Uploads/20190910/1568097002.jpeg',
					// 	project: '末世觉醒'
					// }
				],
			}
		},
		created: function() {
			this.myInit()
		},
		// 在 `methods` 对象中定义方法
		methods: {
			myInit(){
				this.getProject()
			},
			getProject(){
				this.$PRAPI.project.GetProFreeze().then(res => {
					console.log(res)
					this.setProjectData(res)
				}, err => {
					console.log(err)
					
				});
			},
			setProjectData(data){
				var projectArr = []
				for(var i=0;i<data.length;i++){
					var thProject = {
						id:data[i].id,
						thum:data[i].thum,
						name:data[i].name,
						order:data[i].order,
					}
					projectArr.push(thProject)
				}
				this.projectList = projectArr
			},
			openProject(projectId){
				this.$router.push(
					{ 
						path: '/index/project/tasklist',
						query: {
						  id: projectId,
						},
					}
				)
			},
			projectMenuD(projectId,event) {
				this.$contextmenu({
					items: [{
							label: "解除冻结",
							onClick: () => {
								this.removeFreezeProject(projectId)
							}
						},
					],
					event,
					customClass: "class-a",
					zIndex: 4,
					minWidth: 130
				});
				return false;
			},
			// 冻结项目
			removeFreezeProject(projectId){
				let data = {
					id:projectId
				}
				this.$PRAPI.project.UpdFreeze(data).then(res => {
					console.log(res)
					this.myInit()
				}, err => {
					console.log(err)
				});
			}
		}
	}
</script>