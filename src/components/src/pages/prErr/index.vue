<template>
	<div class="prErrBox">
		<div class="prErrTitle">
			PR版本错误
		</div>
		<div class="prErrText">
			需求版本：{{needVersion}}
		</div>
		<div class="prErrText">
			当前版本：{{currentVersion}}
		</div>
	</div>
</template>
<script>
	export default {
		data() {
		  return {
				needVersion:"",
				currentVersion:""
		  }
		},
		created: function()  {
			  this.setPrVersion()
			  this.needVersion = "14.6.0 或 14.7.0 或 14.8.0"
		},
		methods: {
			setPrVersion(){
				this.$CSINTERFACE.evalScript("getPrVerssion()", (el)=>{
					this.currentVersion = el
				});
			},
		
		}
	}
</script>