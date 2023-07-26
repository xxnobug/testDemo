<template>
    <div>
		<el-tabs type="card" @tab-click="topNavClick">
		    <el-tab-pane v-for="item in topNavList" :label="item.label" ></el-tab-pane>
		</el-tabs>
    </div>
</template>
<script>
	export default {
		data() {
			return {
				topNavList: []
			}
		},
		created: function() {
			this.myInit()
		},
		// 在 `methods` 对象中定义方法
		methods: {
			myInit() {
				this.topNavList = this.$store.state.topNavList
				// console.log(this.topNavList)
			},
			topNavClick(nav) {
				// console.log(nav)
				var currentPath = this.topNavList[nav.index].path
				this.$router.push({ path: currentPath})
			}
		}
	}
</script>