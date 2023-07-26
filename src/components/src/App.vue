<template>
	<div id="app">
		<router-view></router-view>
		<!-- <div class="dfd" @click="sdlkfjdf">
			刷新
		</div> -->
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			
		},
		created: function() {
			
		},
		methods: {
			sdlkfjdf(){
				location.reload();
			}
		}
	}
</script>

<style>
	
</style>
