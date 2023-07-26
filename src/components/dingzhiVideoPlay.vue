<template>
  <div>
    <!-- <div
      :style="`width:${initVideoOpation.videoWidth}px;height:${initVideoOpation.videoHeight}px; position: relative`"
      v-if="initVideoOpation.videoSrc == ''"
      class="noVideoStyle"
    >
      <img src="../assets/novideo.png" alt="" />
    </div> -->
    <video   src="../../static/outt.mp4" controls></video>
    <div
      :style="`width:${initVideoOpation.videoWidth};height:${initVideoOpation.videoHeight}; position: relative`"
    >
      <video
        @click="toClickVideo"
        @mouseenter="inVideoBox"
        @mouseleave="outVideoBox"
        ref="video"
        id="video"
        src="../../static/outt.mp4"
        width="100%"
        height="100%"
        @timeupdate="videoPlayTime"
        controlsList="nodownload"
        disablePictureInPicture
      ></video>
      <div
        class="zidingyicontrolBox"
        v-if="controlShow"
        @mouseenter="inVideoBox"
        @mouseleave="outVideoBox"
      >
        <el-slider
          v-model="speedValue"
          :show-tooltip="false"
          :min="min"
          :max="max"
          @change="speedChange"
          @input="speedClick"
        ></el-slider>

        <div class="slidercontrolStyle" style="text-align: left">
          <div style="display: inline-block">
            <span @click="toPlay" v-if="playShow" class="playBtnStyle">
              <img src="../assets/play.png" alt="" width="100%" height="100%" />
            </span>
            <span @click="toPause" v-else class="playBtnStyle">
              <img src="../assets/pause.png" alt="" width="100%" height="100%" />
            </span>
            <span style="margin-left: 6px">
              <span class="playBtnStyle1" v-if="!isLoop" @click="toLoop">
                <img src="../assets/loop1.png" alt="" width="100%" height="100%" />
              </span>
              <span class="playBtnStyle1" v-else @click="toNoLoop">
                <img src="../assets/loop.png" alt="" width="100%" height="100%" />
              </span>
            </span>

            <span class="timedingyiStyle"
              >{{ shijian(currentTime) }} / {{ shijian(duration) }}</span
            >
          </div>
          <div class="selectOpationStyle">
            <span class="playBtnTextStyle">
              <div
                class="zidingyiaudioStyle1"
                v-if="doubleSpeedShow"
                @mouseleave="mouseLeaveSpedShow"
              >
                <div
                  v-for="(item, index) in doubleSpeed"
                  :key="index"
                  style="cursor: pointer"
                  class="speedStyle"
                  @click="toSetDoubleSpeed(item.value, item.label)"
                >
                  {{ item.label }}
                </div>
              </div>
              <span @click="toDoubleSpeed" class="doubleSpeedTextStyle">
                {{ doubleSpeedTextValue }}
              </span>
            </span>

            <span
              class="playBtnStyle1"
              style="margin-right: 10px; position: relative"
            >
              <span
                class="zidingyiaudioStyle"
                @mouseleave="mouseLeaveShow"
                v-if="zidingyiaudioShow"
              >
                <el-slider
                  v-model="audioValue"
                  vertical
                  height="200px"
                  @change="audioValueChange"
                >
                </el-slider>
              </span>

              <img
                @click="toAudio"
                src="../assets/audio.png"
                alt=""
                width="100%"
                height="100%"
              />
            </span>
            <span class="playBtnStyle1" @click="toFullScreen">
              <img
                src="../assets/fullscreen.png"
                alt=""
                width="100%"
                height="100%"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      initVideoOpation: {
        videoWidth: "320px",
        videoHeight: "180px",
        videoSrc: null,
      },
      platState: false,
      doubleSpeedTextValue: "倍数",
      doubleSpeed: [
        {
          label: "2.0X",
          value: 2.0,
        },
        {
          label: "1.5X",
          value: 1.5,
        },
        {
          label: "1.25X",
          value: 1.25,
        },
        {
          label: "1.0X",
          value: 1.0,
        },
        {
          label: "0.75X",
          value: 0.75,
        },
        {
          label: "0.5X",
          value: 0.5,
        },
      ],
      zidingyiaudioShow: false,
      doubleSpeedShow: false,
      audioValue: 50,
      speedValue: 0,
      playShow: true,
      isLoop: false,
      currentTime: "",
      duration: "",
      timeout: "",
      controlShow: false,
    };
  },
  mounted() {},

  methods: {
    inVideoBox() {
      this.controlShow = true;
    },
    outVideoBox() {
      this.controlShow = false;
    },

    initVideoHandel(obj) {
      console.log(obj);
      this.initVideoOpation = obj;
      //   this.$refs.video.src = obj.videoSrc;
      document.getElementById("video").src = obj.vidoeSrc;
      console.log(document.getElementById("video"));
      console.log(document.getElementById("video").src);

      //   console.log( this.$refs.video.src);
      //   console.log(this.initVideoOpation);
      this.$refs.video.onloadedmetadata = () => {
        this.duration = this.$refs.video.duration;
        this.$refs.video.volume = 0.5;
      };
    },
    toClickVideo() {
      if (this.platState == true) {
        this.toPause();
      } else {
        this.toPlay();
      }
      console.log(this.$refs.video.play);
      console.log("点击事件");
    },
    toSetDoubleSpeed(val, label) {
      this.$refs.video.playbackRate = Number(val);
      this.doubleSpeedTextValue = label;
    },
    toDoubleSpeed() {
      if (this.doubleSpeedShow == false) {
        this.doubleSpeedShow = true;
      } else {
        this.doubleSpeedShow = false;
      }
    },
    mouseLeaveShow() {
      this.zidingyiaudioShow = false;
    },
    mouseLeaveSpedShow() {
      this.doubleSpeedShow = false;
    },
    toFullScreen() {
      this.$refs.video.requestFullscreen();
    },
    audioValueChange(e) {
      clearTimeout(this.timeout); //首先清除计时器
      let a = e / 100;
      this.$refs.video.volume = Number(a);

      this.timeout = setTimeout(() => {
        // this.zidingyiaudioShow = false;
      }, 300);
    },
    speedClick() {
      return;
      console.log("进来");
      this.toPause();
    },
    speedChange(e) {
      // return

      let a = e / 1000;
      console.log(a);
      //    return
      this.currentTime = this.duration * a;
      console.log(this.currentTime);
      this.$refs.video.currentTime = this.duration * a;
      //   this.toPlay();
    },
    setDurtion() {
      setInterval(() => {
        this.value3++;
      }, 1000);
    },
    videoPlayTime(e) {
      let a = (e.target.currentTime / e.target.duration) * 1000;
      this.currentTime = e.target.currentTime;

      this.speedValue = Math.floor(a);
      if (e.target.currentTime == e.target.duration) {
        if (this.isLoop == true) {
          setTimeout(() => {
            this.toPlay();
          }, 500);
        } else {
          this.toPause();
        }
      }
    },
    // 格式化时间

    shijian(t) {
      var NowtimeValue = t;
      var nowH = parseInt(NowtimeValue / 3600);
      var nowM = parseInt((NowtimeValue % 3600) / 60);
      var nowS = parseInt(NowtimeValue % 60); //   nowH = nowH < 10 ? (nowH = "0" + nowH) : nowH;
      // var nowSS = parseInt(NowtimeValue % 60) / 1000;
      nowH = nowH < 10 ? (nowH = "0" + nowH) : nowH;
      nowM = nowM < 10 ? (nowM = "0" + nowM) : nowM;
      nowS = nowS < 10 ? (nowS = "0" + nowS) : nowS; //   return nowH + ":" + nowM + ":" + nowS;
      return nowH + ":" + nowM + ":" + nowS;
    },
    //   视频播放
    toPlay() {
      this.$refs.video.play();
      this.playShow = false;
      this.platState = true;
    },
    //   视频暂停
    toPause() {
      this.$refs.video.pause();
      this.playShow = true;
      this.platState = false;
    },
    toAudio() {
      if (this.zidingyiaudioShow == false) {
        this.zidingyiaudioShow = true;
      } else {
        this.zidingyiaudioShow = false;
      }
    },
    toLoop() {
      this.isLoop = true;
    },
    toNoLoop() {
      this.isLoop = false;
    },
  },
};
</script>
<style scoped= 'true'>
.noVideoStyle {
  background: rgba(0, 0, 0, 0.8);
  padding-top: 20%;
  box-sizing: border-box;
}
.speedStyle:hover {
  color: #409eff;
}
.doubleSpeedTextStyle {
  display: inline-block;
  min-width: 52px;
  height: 23px;
  border-radius: 99em;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ececec;
  line-height: 23px;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: top;
}
.zidingyiaudioStyle {
  position: absolute;
  bottom: 58px;
  left: -10px;
  height: 120px;
  display: inline-block;
  width: 38px;
  background: rgba(10, 10, 10, 0.64);
  padding: 5px 0px;
  border-radius: 5px;
  transition: all 3s;
}
.zidingyiaudioStyle1 {
  position: absolute;
  bottom: 54px;
  left: -4px;
  min-height: 120px;
  display: inline-block;
  width: 60px;
  background: rgba(10, 10, 10, 0.64);
  padding: 5px 0px;
  border-radius: 5px;
  text-align: center;
  font-size: 14px;
  line-height: 25px;
  transition: all 3s;
}
.selectOpationStyle {
  display: inline-block;
  float: right;
}
.playBtnTextStyle {
  font-size: 12px;
  color: #ffffff;
  vertical-align: text-top;
  margin-right: 10px;
  position: relative;
}
.playBtnStyle {
  display: inline-block;
  width: 15px;
  height: 15px;
  cursor: pointer;
  vertical-align: text-top;
}
.playBtnStyle1 {
  display: inline-block;
  width: 18px;
  height: 18px;
  cursor: pointer;
  vertical-align: text-bottom;
}
.zidingyicontrolBox .el-slider__button {
  width: 10px;
  height: 10px;
}
.zidingyicontrolBox .el-slider__runway {
  margin-top: 0px;
  margin-bottom: 5px;
  border-radius: 0px;
}
.zidingyicontrolBox {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
}
.slidercontrolStyle {
  padding: 0px 10px 12px 10px;
}
.timedingyiStyle {
  margin-left: 6px;
  font-size: 12px;
  color: #ffffff;
  vertical-align: text-bottom;
}
</style>










