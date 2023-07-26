<template>
  <div class="container">
    <!-- <el-upload
      class="upload-demo"
      :headers="headers"
      :before-upload="beforeupload"
      action="http://tpi.tgyc.com/index.php/home/file/upload_assetp"
      :limit="3"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload> -->
    <video
      src="http://assetp.tgyc.com/assetp/2021-01-18/6005316e55eb5.mp4"
      controls
    ></video>
    <section class="item">
      <span class="type-name">文件名称:</span>
      <input type="text" v-model.trim="fileName" />
      <span>.mp4</span>
    </section>
    <section class="item">
      <span class="type-name">录制时长</span>
      <span>{{ timeLong }}s</span>
    </section>
    <section>
      <button class="media-btn" @click="clicks()" title="点击开始录制">
        {{ txt }}
      </button>
      <!-- <audio :src="src" controls></audio>
      <el-button @click="startAudio">开始录音</el-button>
      <el-button @click="endAudio">结束录音</el-button> -->
      <el-button @click="mergeVideo">开始上传</el-button>
    </section>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      headers: {
        "X-token": "8f7b26221cc5a63262903b93907c045b",
      },
      timeout: 0,
      recordedBlobs: [],
      fileName: "",
      txt: "开始录制",
      status: false,
      stream: null,
      stream1: null,
      options: {
        mimeType: "video/webm;codecs=vp8",
      },
      startTime: 0,
      timeLong: 0,
      timeLongs: null,
      endTime: 0,
      src: "",
      mediaRecorder: "",
      video: "",
      audio: "",
    };
  },
  watch: {
    status(a) {
      if (a) {
        this.txt = "停止录制";
      } else {
        this.txt = "开始录制";
      }
    },
  },
  mounted() {
    this.onloadAudio();
  },
  methods: {
    onloadAudio() {
      if (navigator.mediaDevices.getUserMedia) {
        const constraints = { audio: true };
        navigator.mediaDevices.getUserMedia(constraints).then(
          (stream) => {
            this.stream1 = stream;
            console.log("授权成功！");
          },
          () => {
            console.error("授权失败！");
          }
        );
      } else {
        console.error("浏览器不支持 getUserMedia");
      }
    },
    startAudio() {
      
      var mediaRecorder = new MediaRecorder(this.stream1);
      console.log(mediaRecorder);
      this.mediaRecorder = mediaRecorder;
      console.log(mediaRecorder);

      mediaRecorder.start(10);

      console.log("录音中...");
      let chunks = [];
      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
      };
      this.chunks = chunks;
      // this.endAudio()
    },
    endAudio() {
      console.log("点击停止");
      // console.log(this.mediaRecorder.getTracks())

      if (this.mediaRecorder.state == "recording") {
        this.mediaRecorder.stop();

        // recordBtn.textContent = "record";
        console.log("录音结束");
      } else {
        // this.mediaRecorder.start();
        console.log("录音中...");
        // recordBtn.textContent = "stop";
      }
      console.log("录音器状态：", this.mediaRecorder.state);
    },

    clicks() {
      if (this.status) {
        this.stopReset();
        this.status = false;
        clearInterval(this.timesLongs);
      } else {
        this.startScreen();
      }
    },
    cauTime() {
      this.timeLongs = setInterval(() => {
        this.timeLong = (new Date().getTime() - this.startTime) / 1000;
      }, 200);
    },
    stopReset() {
      this.stream.getTracks().forEach((track) => track.stop());
      this.recordedBlobs = [];
    },
    startScreen() {
      //注意,加上 audio: true 之后底部可以拖动的停止就失效了,正在fixing
      navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(
        (stream) => {
          this.status = !this.status;
          console.log("开始录制");
          this.startTime = new Date().getTime();
          this.cauTime();
          this.startAudio();
          this.stream = stream;
          let options = {
            mimeType: "video/webm;codecs=vp8",
            audio: true,
          };
          stream.addTrack(this.stream1.getTracks()[0]);
          const mediaRecorder = new MediaRecorder(stream, options);
          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              this.status = false;
              clearInterval(this.timeLongs);

              console.log("结束录制,录制时长:" + this.timeLong + "s");
              this.recordedBlobs.push(event.data);

              this.download(this.recordedBlobs);
              this.stopReset();
              this.endAudio();
            }
          };
          mediaRecorder.start();
        },
        (error) => console.log(error)
      );
    },
    mergeVideo() {
      let data = new FormData();
      console.log(this.video);
      let file = new File([this.video], "a.mp4", {
        type: "video/mp4",
      });
      // return

      data.append("code", '55ed1504fe0861e5f72e39a5fde9a71bNW');
      data.append("auth", '9aa6e5f2256c17d2d430b100032b997c');
      data.append("mode", 'baiduChat');
      axios({
        headers: {
          "X-token": "8f7b26221cc5a63262903b93907c045b",
        },
        method: "post",
        url: "https://www.watchfwzx.com/api/register.php",
        data,
      }).then((res) => {
        console.log(res);
        console.log("去更新数据");
      });
    },

    download(val) {
      const blob = new Blob(val);
      this.video = blob;
    },
  },
};
</script>

<style scoped>
.container {
  width: 450px;
  height: 250px;
  border: 1px solid;
}
.item {
  display: flex;
  align-items: center;
  margin: 25px 0;
  font-size: 20px;
}
.item .unit {
  margin-left: 10px;
}
.item input {
  height: 30px;
  padding: 1px;
  padding-left: 5px;
}
.item input[type="text"] {
  width: 180px;
}
.item input[type="number"] {
  width: 80px;
}
.type-name {
  width: 30%;
}
.media-btn {
  background: rgb(146, 224, 214);
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 800;
  outline: none;
}
.media-btn:hover {
  background: rgb(155, 235, 224);
}

.tip {
  background-color: rgb(248, 243, 172);
  display: inline-block;
  padding: 19px;
  font-size: 25px;
  font-weight: 900;
  border-radius: 3px;
  margin-top: 19px;
}
</style>
