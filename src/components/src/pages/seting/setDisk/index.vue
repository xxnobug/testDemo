<template>
	<div>
		<el-row>
			<el-col :span="18" :offset="3" class="setingDiskBox">
				<el-col :span="24">
					<el-input v-model="pPath" placeholder="请选择映射盘符路径">
						<el-button type="primary" slot="append" icon="el-icon-search" @click="searchDir">浏览</el-button>
						<el-button type="primary"  slot="append" icon="el-icon-check" @click="setPPath">确认</el-button>
					</el-input>
				</el-col>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				pPath: '', //映射盘路径
			}
		},
		created: function() {
		
		},
		// 在 `methods` 对象中定义方法
		methods: {
			// 寻找文件夹路径
			searchDir() {
				console.log('选择目录')
				this.$CSINTERFACE.evalScript("getSelectDir()",(el) => {
					if(el!="err"){
						var path = el
						// 检测有效路径
						if(path!=null){
							var pf = path.slice(0,1)
							if(pf=='/'){
								console.log(path)
								var onePath = path.slice(1,2)
								console.log(onePath)
								var dirPath = path.slice(3,path.length)
								dirPath = dirPath.replace(/\//g,"\\")
								console.log(dirPath)
								var endPath = onePath + ':\\' + dirPath
								this.pPath = endPath
							}else{
							this.$notify({
								type: 'warning',
								message: '请选择有效目录',
									position: 'bottom-right'
							});
						}
						}else{
							this.$notify({
								type: 'warning',
								message: '请选择有效目录',
									position: 'bottom-right'
							});
						}
					}
				});
			},
			// 设置映射盘路径
			setPPath() {
		
				var currentPath = this.pPath
				if(currentPath==''){
					this.$notify({
						type: 'warning',
						message: '请选择有效目录',
									position: 'bottom-right'
					});
					return false
				}
				
				var currentCmd = 'Subst P: ' + currentPath
		
				//加入注册表
				var regedit = require('regedit')
				regedit.putValue({
					'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run': {
						'tgyc:': {
							value: currentCmd,
							type: 'REG_SZ'
						}
					},
				}, function(err) {
					console.log(err)
				})
		
				// 检测是否已存在,如果是,则取消并新建
				this.$FS.stat("P:", (err, stats) => {
					if(err){
						console.log(err)
					}
					if (stats == undefined) {
						//执行创建命令
						this.$EXEC(currentCmd, (err, stdout, stderr) => {
							if (err) {
								// console.error(err);
								this.$notify({
									type: 'warning',
									message: '映射失败，请从新选择！！',
									position: 'bottom-right'
								});
								return;
							}
							this.$router.push({ path: '/index/project/index' })
						});
		
					} else {
						//执行取消命令
						var delP = 'subst /d P:'
						this.$EXEC(delP, (err, stdout, stderr) => {
							if (err) {
								console.error(err);
								this.$notify({
									type: 'warning',
									message: '取消映射失败',
									position: 'bottom-right'
								});
								return;
							}
		
							//执行创建命令
							this.$EXEC(currentCmd, (err, stdout, stderr) => {
								if (err) {
									console.error(err);
									this.$notify({
										type: 'warning',
										message: '映射失败，请从新选择！！',
									position: 'bottom-right'
									});
									return;
								}
								this.$router.push({ path: '/index/project/index' })
								
							});
		
						});
		
					}
				});
		
			}
		}
	}
</script>