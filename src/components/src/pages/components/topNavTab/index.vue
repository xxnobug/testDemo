<template>
	<div>
		<el-tabs v-model="$store.state.topNavTabActive" type="card" closable @tab-remove="removeTab"
			@tab-click="clickTab">
			<el-tab-pane v-for="item in topNavTabList" :label="item.label" :name="item.id"></el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				topNavTabList: []
			}
		},
		created: function() {
			this.myInit()
		},
		// 在 `methods` 对象中定义方法
		methods: {
			myInit() {
				this.topNavTabList = this.$store.state.topNavTabList
				// console.log(this.topNavTabList)
			},
			removeTab(name) {
				var thData = {
					name:name,
				}
				this.$store.commit('removeTopNavTabList', thData)
			},
			clickTab(nav) {
				this.$store.commit('jumpTopNavTabList', nav.index)
			}
		}
	}
</script>
