<template>
	<el-row :gutter="20" :style="roleBoxStyle" id="roleBox" >
		<el-col :span="24" class="roleTitle" id="roleTitle">
			{{project_name}}
		</el-col>
		<el-col :span="24">
			<el-col :span="24" class="roleList" v-for="(item,index) in roleList"  @contextmenu.prevent.native="roleMenu(item.id,index,$event)">
				<el-col :span="6">
					<div class="roleName" v-if="!item.isrename">
						{{item.name}}
					</div>
				</el-col>
				<el-col :span="18">
					<el-tag class="roleTag" v-for="(tag,subindex) in item.user_list" >
					  {{tag.name}}
					</el-tag>
				</el-col>
			</el-col>
		</el-col>
	</el-row>
</template>
<script>
	export default {
		data() {
			return {
				project_id:'',//项目id
				project_name:'',//项目名称
				roleBoxStyle: "min-height:" + (window.innerHeight - 90) + "px",
				roleList:[
				],
				currentUserJurisdiction:{},//当前用户权限
			}
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
			},
			// 获取角色列表
			getRoleList(){
				var data = {
					project_id:this.project_id
				}
				this.$PRAPI.role.GetRoleFreeze(data).then(res => {
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
				}
				this.roleList = data
			},
			roleMenu(roleId,index,event) {
				this.$contextmenu({
					items: [{
						label: "激活",
						onClick: () => {
							if(!this.currentUserJurisdiction.PrRoleActivation){
								this.$TGYC.sendErr("您没有权限！！！");
								return false
							};
							this.setRoleActive(roleId,index)
						}
					}],
					event,
					customClass: "tgycContextMenu",
					zIndex: 3,
					minWidth: 130
				});
				return false;
			},
			//激活角色
			setRoleActive(roleId,index){
				var data = {
					id:roleId
				}
				this.$PRAPI.role.UpdStateActive(data).then(res => {
					this.roleList.splice(index,1)
				}, err => {
					console.log(err)
				});
			}
		}
	}
</script>