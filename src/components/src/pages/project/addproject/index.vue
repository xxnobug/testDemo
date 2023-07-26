<template>
	<el-row :gutter="20">
		<div class="addProjectBox">
			<el-form ref="newProject" :rules="rules" :model="newProject" label-width="80px">
				<el-form-item label="缩略图" prop="thum">
					<div class="projectThum" @click="updataThum">
						<img :src="$ASSETBASEURL + newProject.thum" />
					</div>
				</el-form-item>
				<el-form-item label="项目名" prop="name">
					<el-input size="mini" v-model="newProject.name" clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-button size="mini" type="primary" @click="onSubmit">立即创建</el-button>
				</el-form-item>
			</el-form>
		</div>
		<ImgCropper ref="imgCropper" @imgChange="setProjectImg"></ImgCropper>
	</el-row>
</template>
<script>
	import ImgCropper from '@/layout/imgcropper/index.vue'
	export default {
		data() {
			return {
				newProject: {
					name: '',
					thum:'/Upload/prproject.jpg',
					creator_id:this.$store.state.userInfo.id,
					creator_name:this.$store.state.userInfo.name,
					sort:'0'
				},
				rules: {
					name: [{
						required: true,
						message: '请输入项目名称',
						trigger: 'blur'
					}, ]
				},
				currentUserJurisdiction:{},//当前用户权限
			}
		},
		components: {
		  ImgCropper,
		},
		created: function() {
			this.myInit()
			this.currentUserJurisdiction = this.$store.state.userInfo.rolepower.permissions
		},
		// 在 `methods` 对象中定义方法
		methods: {
			myInit() {
				// this.getProject()
			},
			onSubmit() {
				if(!this.currentUserJurisdiction.PrProjectAdd){
					this.$TGYC.sendErr("您没有权限！！！");
					return false
				};
				this.$refs['newProject'].validate((valid) => {
				  if (valid) {
					// console.log('submit!!');
					this.$PRAPI.project.AddPrProject(this.newProject).then(res => {
						// 关闭添加项目标签并跳转到项目列表
						this.$store.commit('addProjectJump')
					}, err => {
						console.log(err)
					});
				  } else {
					// console.log('error submit!!');
					
					return false;
				  }
				});
				
			},
			updataThum(){
				this.$refs.imgCropper.inputAction()
			},
			setProjectImg(img){
				this.newProject.thum = img
			}
		}
	}
</script>