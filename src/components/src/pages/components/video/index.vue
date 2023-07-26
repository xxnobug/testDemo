<template>
	<div>
	<!-- 	<video :id="'tgyc'+videoid" class="video-js" width="100">
			<source :src="videoUrl" type="video/mp4">
		</video> -->
		<video
		    :id="'tgyc'+videoid"
		    class="video-js"
			:width="vwidth"
		   >
		  <source :src="videoUrl" type="video/mp4"></source>
		</video>
	</div>
</template>
<script>
	
	import videojs from 'video.js/dist/video.js'
	// console.log(videojs)
	export default {
		data() {
			return {
				player: null,
				videoWidth: window.innerWidth - 40,
				videoUrl: '',
				videoOption: {
					autoplay: false,
					controls: true,
				},
			}
		},
		props: [
			'myvideourl',
			'videoid',
			'vwidth'
		],
		created: function() {
			console.log('视频初始化')
			this.myInit()
		},
		// 在 `methods` 对象中定义方法
		methods: {
			myInit() {
				
				this.$nextTick(() => {
					this.videoUrl = this.myvideourl
					var options = {
						controls: true,
						autoplay: false,
						fluid: true,
						width:this.vwidth,
						controlBar: {
							fullscreenToggle: true,//显示全屏按钮，默认为true
							pictureInPictureToggle: false,//隐藏画中画按钮，默认为true
							currentTimeDisplay: true,//显示当前播放时间
							durationDisplay: true,//显示总时间
						},
						playbackRates: [0.5,0.75,1,1.25,1.5,2]
					};
					
					this.player = videojs('tgyc' + this.videoid, options, function onPlayerReady() {
						videojs.log('Your player is ready!');
					
						// How about an event listener?
						this.on('ended', function() {
							videojs.log('Awww...over so soon?!');
						});
					});
					
					this.player.reset();
					this.player.src([{
						src: this.myvideourl
					}, ]);
					this.player.load();
					
					
					
				})
			}
		},
		destroyed: function() {
			console.log('销毁视频')
			this.player.dispose()
		}
	}
</script>
