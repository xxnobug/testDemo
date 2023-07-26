<template>
	<div>
		<input type="file" ref="CropperInput" class="projectThumUpload2" accept="image/png, image/jpeg, image/gif, image/jpg"
		 @change="uploadImg($event, 1)" />

		<!-- 缩略图制作 -->
		<el-dialog title="裁剪图片" :visible.sync="Cropperbox" width="80%">
			<el-row :gutter="20">
				<el-col :span="24">
					<div class="img_box" :style="CropperBox">
						<vueCropper ref="cropper" :img="option.img" :outputSize="option.size" :info="option.info" :canScale="option.canScale"
						 :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight"
						 :fixedBox="option.fixedBox" :fixedNumber="option.fixedNumber" :maxImgSize="option.maxImgSize" :enlarge="option.enlarge"
						 :centerBox="option.centerBox"></vueCropper>
					</div>
					<el-col :span="24" class="CropperBtns">
						<el-button size="mini" type="primary" @click="inputAction" icon="el-icon-upload2"></el-button>
						<el-button size="mini" type="infor" @click="rotateLeft" icon="el-icon-refresh-left"></el-button>
						<el-button size="mini" type="infor" @click="rotateRight" icon="el-icon-refresh-right"></el-button>
						<el-button size="mini" type="infor" @click="CropperClose" icon="el-icon-close"></el-button>
						<el-button size="mini" type="primary" @click="queren" icon="el-icon-check"></el-button>
					</el-col>
				</el-col>
			</el-row>
		</el-dialog>

	</div>
</template>
<script>
	
	export default {
		data() {
			return {
				CropperBox: "height:" + (window.innerHeight - 250) + "px",
				Cropperbox: false, //显示截图框
				option: {
					img: "",
					size: 1,
					info: true,
					canScale: true,
					autoCrop: true,
					// 只有自动截图开启 宽度高度才生效
					autoCropWidth: 250,
					autoCropHeight: 141,
					fixedNumber: [16, 9],
					fixedBox: true,
					maxImgSize: 500,
					enlarge: 1.5,
					centerBox: false,
				},
			}
		},
		created: function() {
		
		},
		
		// 在 `methods` 对象中定义方法
		methods: {
			inputAction() {
				this.$refs.CropperInput.dispatchEvent(new MouseEvent('click'))
			},
			addthum() {
				this.Cropperbox = true;
			},
			rotateLeft() {
				this.$refs.cropper.rotateLeft();
			},
			rotateRight() {
				this.$refs.cropper.rotateRight();
			},
			uploadImg(e, num) {
				console.log(e)
				console.log(num)
				//上传图片
				this.Cropperbox = true;
				var file = e.target.files[0];
				if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
					alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
					return false;
				}
				var reader = new FileReader();
				reader.onload = (e) => {
					let data;
					if (typeof e.target.result === "object") {
						// 把Array Buffer转化为blob 如果是base64不需要
						data = window.URL.createObjectURL(new Blob([e.target.result]));
					} else {
						data = e.target.result;
					}
					this.option.img = data;
		
				};
				// 转化为base64
				// 转化为blob
				reader.readAsArrayBuffer(file);
			},
			queren() {
		
				this.$refs.cropper.getCropData((data) => {
					let nData = {
						img: data,
					}
					this.$PRAPI.tool.BaseImg(nData).then(res => {
						this.$emit("imgChange", res)
						this.CropperClose()
					}, err => {
						console.log(err)
					});
		
				});
			},
			CropperClose() {
				this.Cropperbox = false;
			}
		}
	}
</script>