<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
		<div class="loginBox">
			<div class="logoBox">
				<!-- <img src="@/public/img/logo.png" /> -->
				<img src="@/assets/img/logo.png" />
			</div>
			<el-form-item prop="userName">
			    <div class="loginList">
					<el-input v-model="ruleForm.userName" type='text' size="mini" clearable @keyup.enter.native="jumpPassWord"></el-input>
			    </div>
			</el-form-item>
		   <el-form-item prop="passWord">
		      <div class="loginList">
					<el-input ref="passWordRef" v-model="ruleForm.passWord" size="mini" show-password @keyup.enter.native="submitForm('ruleForm')"></el-input>
		      </div>
		   </el-form-item>
		   <el-form-item>
			   <div class="loginList">
				   <el-button @click="submitForm('ruleForm')" type="primary" size="mini" >登录</el-button>
			   </div>
		   </el-form-item>
		</div>
	</el-form>
</template>

<script>
	import axios from '@/axios/index.js'
	export default {
		data() {
			return {
				ruleForm: {
					passWord: '',
					userName: '',
				},
				rules: {
					userName: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}, ],
					passWord: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}, ],
				}
			}
		},
		created: function() {
			// console.log('登录状态')
			// console.log(this.$store.state.userInfo)
			//清除历史路由
			
			this.$store.commit('clearTopNavTabList')
		},
		methods: {
			//跳转到密码输入框
			jumpPassWord(){
				this.$refs.passWordRef.focus()
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					this.userLogin(this.ruleForm.userName,this.ruleForm.passWord)
				  } else {
					console.log('error submit!!');
					return false;
				  }
				});
			},

			 userLogin(name,passWord) {
				let that = this
				
				axios.post('/index.php/home/login/login', {
					name:name,
					password:passWord,
					software:that.$TGYC.name,
					version:that.$TGYC.version
				})
				.then((response)=> {
					// console.log("登录人信息")
					// console.log(response)
					this.$store.commit('setUserInfo',response)
					var person = JSON.stringify(response) 
					person = that.encode(person,'kasdjlasdjlasfhh')
					console.log("66677")
					this.$FS.writeFile('C:/TGYC/appData/config.json', person, (err) => {
						console.log("用户数据写入")
					  if (err) throw err;
					  console.log("用户数据写入成功")
					  this.$router.push({ path: '/index/project/index' })
					});
				})
				.catch(function (error) {

				});
			 },
			encode(text,key){
				var secret = key;
				var cipher = this.$CRYPTO.createCipher('aes-256-cbc',secret);
				var crypted =cipher.update(text,'utf8','hex');
				crypted+=cipher.final('hex');
				return crypted;
			}
		}
	}
</script>

<style>

</style>
