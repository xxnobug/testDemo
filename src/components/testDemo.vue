<template>
  <div>
    <div>
      <div
        v-for="(item, index) in arrJson"
        :key="index"
        style="margin-bottom: 50px; border-bottom: 1px solid black"
      >
        <div
          v-for="(it, itinde) in item.res_list"
          :key="itinde"
          class="boximgStyle"
        >
          <span>缩略图 ∨</span>
          <img :src="base64URL + it.thum" alt="" width="100%" />
          <span>原图 ∨</span>
          <img :src="base64URL + it.thum_max" alt="" width="100%" />
        </div>
      </div>
      <!-- 直接分类数据就可以查看 -->
      <div
        v-for="(item, index) in arrJson2"
        :key="index"
        class="json2"
        style="margin-bottom: 50px; border-bottom: 1px solid black"
      >
        <div
        
          class="boximgStyle"
        >
        <span>
          {{item.shotnumber}}{{item.merge_name}}
        </span>
          <span>缩略图 ∨</span>
          <img :src="base64URL + item.frame_resources[0].thum" alt="" width="100%" />
          <span>原图 ∨</span>
          <img :src="base64URL + item.frame_resources[0].thum_max" alt="" width="100%" />
        </div>
      </div>
      <div>
        +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      </div>
      <div
        v-for="(item, index) in arrJson1"
        :key="index"
        class="boximgStyle"
        style="margin-bottom: 50px; border-bottom: 1px solid black"
      >
        <span>缩略图 ∨</span>
        <img :src="base64URL + item.thum" alt="" width="100%" />
        <!-- <img :src="item.base" alt="" width="100%" /> -->
        <span>原图 ∨</span>
        <img :src="base64URL + item.thum_max" alt="" width="100%" />
      </div>
      <!-- <el-row>
        <el-col :span="10">
          <div
            v-for="(ba, baindex) in befort"
            :key="baindex"
            class="boximgStyle"
          >
            <span>压缩前</span>
            <img :src="base64URL + ba.thum_max" alt="" width="100%" />
          </div>
        </el-col>
        <el-col :span="10">
          <div
            v-for="(ba, baindex) in after"
            :key="baindex"
            class="boximgStyle"
          >
            <span>压缩后</span>
            <img :src="base64URL + ba.thum" alt="" width="100%" />
          </div>
        </el-col>
      </el-row> -->

      <ul class="box" ref="box">
        <li class="left" ref="left">西瓜</li>
        <li class="resize" ref="resize"></li>
        <li class="mid" ref="mid">备注2</li>
        <li class="resize2" ref="resize2"></li>
        <li class="right" ref="right">test</li>
      </ul>
      <ul class="box" ref="box">
        ``
        <li class="left" ref="left">芒果</li>
        <li class="resize" ref="resize"></li>
        <li class="mid" ref="mid">备注</li>
        <li class="resize2" ref="resize2"></li>
        <li class="right" ref="right">test</li>
      </ul>
    </div>
    <canvas id="canvas_" width="1280px" height="720px"></canvas>
    <div>
      <video
        id="video"
        class="videoZindex"
        src="../../static/aa.mp4"
        controls
        crossorigin="anonymous"
        ref="video"
      ></video>
      <!-- ../../static/aa.mp4 -->
      <!-- http://assetp.tgyc.com/assets/2020-11-5/res180497654e166cae51ee4a4a8009be82df526.mov -->
      <!-- https://www.runoob.com/try/demo_source/movie.mp4 -->
    </div>
    <audio :src="src" controls></audio>
    <el-button @click="startAudio">开始录音</el-button>
    <el-button @click="endAudio">结束录音</el-button>
    <!-- <div id="imgbox">
      <img :src="imgurl" alt="图片" />
    </div> -->
    <i
      @click="startClick"
      class="glyphicon glyphicon-camera"
      style="
        z-index: 200;
        position: fixed;
        right: 10px;
        top: 200px;
        cursor: pointer;
        font-size: 25px;
      "
      >按钮</i
    >

    <!-- ../../static/1605788933.jpeg -->
    <img :src="imgurl" alt="" class="videoZindex" />
    <el-input placeholder="我来试试"></el-input>
  </div>
</template>
<script>
import axios from "axios";
import PageScreenshot from "page-screenshot";
import "page-screenshot/lib/page-screenshot.css"; //重要
export default {
  data() {
    return {
      after: [],
      arrJson1: [],
      befort: [],
      base64URL: "http://assetr.tgyc.com",
      arrJson: [],
      // 直接详情数据
      arrJson2: [],
      imgurl: "",
      src: "",
      mediaRecorder: "",
      chunks: "",
    };
  },
  created() {
    // this.getImgBase64();
    // this.getBase64ByUrl("http://tpi.tgyc.com/Upload/20201204/1607051143.jpeg")
    this.toBase64("http://assetr.tgyc.com/Upload/20201204/1607051143.jpeg");
    // this.getBase64ByUrl(
    //   "http://tpi.tgyc.com/Upload/20201204/1607051143.jpeg",
    //   function (url) {
    //     // $('.img').attr('src', url);
    //     console.log(url);
    //     console.log("787878787");
    //   }
    // );
  },
  mounted() {
    // if (navigator.mediaDevices.getUserMedia) {
    //   const constraints = { audio: true };
    //   navigator.mediaDevices.getUserMedia(constraints).then(
    //     (stream) => {
    //       this.stream = stream;
    //       console.log("授权成功！");
    //     },
    //     () => {
    //       console.error("授权失败！");
    //     }
    //   );
    // } else {
    //   console.error("浏览器不支持 getUserMedia");
    // }
  },
  methods: {
    startAudio() {
      this.src = "";
      var mediaRecorder = new MediaRecorder(this.stream);
      mediaRecorder.start();
      console.log("录音中...");
      let chunks = [];
      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
      };
      this.chunks = chunks;
      this.mediaRecorder = mediaRecorder;
    },
    endAudio() {
      console.log("点击停止");
      this.mediaRecorder.onstop = (e) => {
        var blob = new Blob(this.chunks, { type: "audio/ogg; codecs=opus" });
        this.chunks = [];
        var audioURL = window.URL.createObjectURL(blob);
        this.src = audioURL;
      };
      if (this.mediaRecorder.state === "recording") {
        this.mediaRecorder.stop();
        // recordBtn.textContent = "record";
        console.log("录音结束");
      } else {
        this.mediaRecorder.start();
        console.log("录音中...");
        // recordBtn.textContent = "stop";
      }
      console.log("录音器状态：", this.mediaRecorder.state);
    },
    async startClick() {
      // this.getAxios();
      //  this.getCanvas();

      this.$refs.video.pause();
      var ps = new PageScreenshot({
        ignoreElements: function (el) {
          // return "screenshotBtn" == el.id; //截屏时，不要渲染id为screenshotBtn的按钮
          console.log(el);
        },
      });
      var res = await ps.screenshot();
      console.log(res);
      if (res) {
        // this.imgurl = res.dataURL;

        console.log("我是图片");
        this.$message({
          type: "success",
          message: "图片生成成功",
        });
      }
    },
    getCanvas() {
      // document.getElementsByTagName();
      var canvas = document.getElementById("canvas_"); //canvas画布
      var videoEle = document.getElementById("video");
      // var video_ = document.getElementById("video");

      var ctx_ = canvas.getContext("2d").drawImage(videoEle, 0, 0, 300, 400);
      // ctx_.drawImage(videoEle, 0, 0, 400, 300);

      console.log(canvas.toDataURL("image/png"));
      // return;
      videoEle.addEventListener("loadeddata", () => {
        console.log("7878787878");
        var size = getComputedStyle(videoEle);
        canvas.width = Number(size.width.replace("px", ""));
        canvas.height = Number(size.height.replace("px", ""));
        canvas.fillStyle = "#ffffff";
        var _ctx = canvas.getContext("2d");

        _ctx.drawImage(videoEle, 0, 0, size.width, size.height);
        var img = document.createElement("img"); //canvas画布

        videoEle.setAttribute("poster", canvas.toDataURL("image/png"));
        // img.setAttribute("src", canvas.toDataURL("image/png"));
        this.imgurl = canvas.toDataURL("image/png");
        console.log(canvas.toDataURL("image/png"));
      });
    },
    getAxios() {
      axios
        .get(
          "http://assetp.tgyc.com/assets/2020-11-5/res180497654e166cae51ee4a4a8009be82df526.mov",
          {}
        )
        .then(function (res) {})
        .catch(function (error) {});
    },
    toBase64(imgUrl) {
      // 一定要设置为let，不然图片不显示
      const image = new Image();
      // 解决跨域问题
      image.setAttribute("crossOrigin", "anonymous");
      const imageUrl = imgUrl;
      image.src = imageUrl;
      // image.onload为异步加载
      image.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var quality = 0.8;
        // 这里的dataurl就是base64类型
        // 使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，因为压缩成png后base64的字符串可能比不转换前的长！
        const dataurl = canvas.toDataURL("image/jpeg", quality);
        this.imgurl = dataurl;
      };
    },
    getBase64ByUrl(imgUrl) {
      window.URL = window.URL || window.webkitURL;
      var xhr = new XMLHttpRequest();
      xhr.open("get", imgUrl, true);
      // 至关重要
      xhr.responseType = "blob";
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      xhr.onload = function () {
        if (this.status == 200) {
          //得到一个blob对象
          var blob = this.response;
          console.log("blob", blob);
          // 至关重要
          let oFileReader = new FileReader();
          oFileReader.onloadend = function (e) {
            // 此处拿到的已经是 base64的图片了
            let base64 = e.target.result;
            console.log("方式一》》》》》》》》》", base64);
          };
          // oFileReader.readAsDataURL(blob);
          // //====为了在页面显示图片，可以删除====
          // var img = document.createElement("img");
          // img.onload = function (e) {
          //   window.URL.revokeObjectURL(img.src); // 清除释放
          // };
          // let src = window.URL.createObjectURL(blob);
          // img.src = src;
          // //document.getElementById("container1").appendChild(img);
          // //====为了在页面显示图片，可以删除====
        }
      };
      xhr.send();
    },
    image2Base64(img) {
      console.log(img);
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var dataURL = canvas.toDataURL("image/png");
      return dataURL;
    },

    getImgBase64() {
      var base64 = "";
      var img = new Image();
      img.src = "http://tpi.tgyc.com/Upload/20201204/1607051143.jpeg";
      img.onload = () => {
        base64 = this.image2Base64(img);
        alert(base64);
      };
    },
  },
};
</script>






<style scoped>
.boximgStyle {
  width: 320px;
  height: 180px;
  display: inline-block;
}
ul,
li {
  list-style: none;
  display: block;
  margin: 0;
  padding: 0;
}
.box {
  width: 800px;
  height: 32px;
  overflow: hidden;
}
.left {
  width: calc(30% - 10px);
  height: 100%;
  background: skyblue;
  float: left;
}

.resize {
  width: 5px;
  height: 100%;
  cursor: w-resize;
  float: left;
}

.resize2 {
  width: 5px;
  height: 100%;
  cursor: w-resize;
  float: left;
}

.right {
  float: left;
  width: 35%;
  height: 100%;
  background: tomato;
}
.mid {
  float: left;
  width: 35%;
  height: 100%;
  background: #f00;
}
.json2{
  width: 300px;
  display: inline-block;
  margin-right: 40px;
}
</style>