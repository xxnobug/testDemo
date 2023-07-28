<template>
  <div class="videoBoxCls">
    <!-- 左侧列表 -->
    <div class="left-list">
      <div v-for="(imgList, index) in imgListAll" :key="index" class="item-cls">
        <div
          class="img-box"
          :class="[index == currentIdx ? 'current' : '']"
          @click="switchList(index)"
        >
          <img :src="imgList.cover" alt />
        </div>
        <p class="img-title">{{ imgList.name }}</p>
      </div>
    </div>
    <!-- 右侧预览 -->
    <div class="right-con">
      <div ref="videoContainer" class="videoContainer" />
      <div class="frameBox">
        <!-- 帧进度条 -->
        <div class="frame">
          <div
            v-for="(item, index) in currentFrameList"
            :key="item.id"
            :class="[
              'frameItem',
              currentFrame == item.frame ? 'currentFrane' : '',
            ]"
            @click="gon(index)"
          >
            <span class="hovFrame">{{ item.frame }}</span>
          </div>
        </div>
        <!-- 播放按钮 -->
        <div class="videoBtn">
          <span class="frame-title">Frame:{{ currentFrame }}</span>
          <div class="btn-box">
            <div class="goTopCls" @click="goFor('frist')" ></div>
            <div class="prevCls" @click="prev" />
            <div v-if="ispause" class="play" @click="play" >播</div>
            <div v-if="!ispause" class="pause" @click="pause" >暂</div>
            <div class="nextCls" @click="next" />
            <div class="goLastCls" @click="goFor('last')" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
export default {
  name: "VideoDialog",
  data() {
    return {
      currentIdx: 0, // 左侧列表 当前index
      currentFrame: "", // 当前帧
      imgListAll: [
        {
          name: "测试",
          cover: "../../static/images/1.png",
          imgArr: [
            { frame: "../../static/images/1.png" },
            { frame: "../../static/images/2.png" },
            { frame: "../../static/images/3.png" },
            { frame: "../../static/images/4.png" },
            { frame: "../../static/images/5.png" },
            { frame: "../../static/images/6.png" },
            { frame: "../../static/images/7.png" },
            { frame: "../../static/images/8.png" },
            { frame: "../../static/images/9.png" },
            { frame: "../../static/images/10.png" },
            { frame: "../../static/images/11.png" },
            { frame: "../../static/images/12.png" },
            { frame: "../../static/images/13.png" },
       
          ],
        },
      ], // 获取左侧列表
      currentFrameList: [], // 当前播放帧列表
      // 视频预览
      canvas: null,
      ctx: null,
      timer: null, // 定时器
      infinite: 1000000000, // 循环次数
      ispause: true, // 是否是暂停状态
      plusNum: 0, // 帧总量
      plusCount: 0, // 帧总量计数器(判断循环次数)
      count: 0, // 当前帧
      fps: 25, // 25帧/秒
      loop: "infinite", // 是否循环
      recordFrom: 0, // 记录起始帧
      recordTo: null, // 记录结束帧
      imgsLen: null, // 记录帧长度
    };
  },
  watch: {
    count(newValue) {
      this.currentFrame = this.currentFrameList[newValue].frame;
    },
  },
  created() {
    this.getImgAllList();
 
  },
  mounted(){
    this.CanvasPlayFrames();
  },
  methods: {
    // 获取图片列表列表
    getImgAllList() {},
    // 左侧切换列表
    switchList(index) {
      this.currentIdx = index;
      // 设置右侧封面
      this.drawImg(this.imgListAll[this.currentIdx].cover);
      this.resetData();
      this.currentFrameList = this.imgListAll[this.currentIdx].imgArr;
      this.currentFrame.frame = this.currentFrameList[0].frame;
      this.imgsLen = this.currentFrameList.length;
    },
    // 重置数据 停止并回到第一帧或cover帧
    resetData() {
      this.ispause = true;
      clearInterval(this.timer);
      this.plusNum = 0;
      this.plusCount = 0;

      // 重置记录
      this.recordFrom = 0;
      this.recordTo = this.imgsLen - 1;
      this.loop = "infinite";
      this.infinite = 1000000000;
      this.count = 0;
    },
    // 初始化帧播放
    CanvasPlayFrames() {
        
      // 1.创建canvas
      const videoContainer = this.$refs.videoContainer;
      const canvas = document.createElement("canvas");
      canvas.width = 654;
      canvas.height = 480;
      canvas.style.display = "block";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      this.ctx = canvas.getContext("2d");
      videoContainer.appendChild(canvas);
      this.canvas = canvas;
      // 2.初始化数据(当前播放的图片列表)
      this.currentFrameList = this.imgListAll[this.currentIdx].imgArr;

      this.imgsLen = this.currentFrameList.length;
      this.recordTo = this.imgsLen - 1;
      // 3.设置封面
      this.drawImg(this.imgListAll[this.currentIdx].cover);
      this.currentFrame = this.currentFrameList[0].frame;
    },
    // 加载图片
    drawImg(imgSrc) {
        console.log(imgSrc);
      const img = new Image();
      const that = this;
      img.src = imgSrc;
      img.onload = function () {
        img.onload = null;
        that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
        // 判断图片有没有宽度
        if (img.width !== 0) {
          // 设置画布的宽高，并使图片居中显示
          let imgWidth;
          let imgHeight;
          if (img.width <= 654) {
            if (img.height > 480) {
              imgHeight = 480;
              imgWidth = img.width * (480 / img.height);
            } else {
              imgHeight = img.height;
              imgWidth = img.width;
            }
          } else {
            if (img.height > 480) {
              const a = 654 / img.width;
              const b = 480 / img.height;
              if (a <= b) {
                imgWidth = img.width * a;
                imgHeight = img.height * a;
              } else {
                imgWidth = img.width * b;
                imgHeight = img.height * b;
              }
            } else {
              imgWidth = 654;
              imgHeight = img.height * (654 / img.width);
            }
          }
          that.ctx.drawImage(
            img,
            Math.round((654 - imgWidth) / 2),
            Math.round((480 - imgHeight) / 2),
            imgWidth,
            imgHeight
          );
        }
      };
    //   img.onerror = function (e) {
    //     console.log(e);
    //   };
      
    },
    // 播放方法 | 从当前位置播放动画，会继承上次使用fromTo、form或to的属性
    play() {
      if (this.currentFrameList.length === 0) {
        return;
      }
      this.fromTo(this.recordFrom, this.recordTo, this.loop);
      this.ispause = false;
    },
    fromTo(from, to, loop) {
      const self = this;

      // 先清除上次未执行完的动画
      clearInterval(this.timer);

      const timeFn = function timeFn() {
        if (self.ispause) {
          return;
        }
        // 当总量计数器达到帧总量的时候退出
        if (self.plusNum <= self.plusCount) {
          self.resetData();
          return;
        } else {
          // 未达到，继续循环
          // 帧计数器
          self.count++;
          // 一次循环结束，重置keyCount为from
          if (self.count > to) {
            self.count = from;
          }
          self.goto(self.count);
          // 总量计数器
          self.plusCount++;
        }
      };
      // 总量计数器
      this.plusCount = 0;

      loop = !loop || loop === "infinite" ? this.infinite : loop;

      // 帧总量 帧数*循环次数first
      this.plusNum = (to - from + 1) * loop;
      this.ispause = true;

      this.recordFrom = from;
      this.recordTo = to;
      this.loop = loop;

      timeFn();
      this.timer = setInterval(timeFn, 1000 / this.fps);
    },
    // 暂停
    pause() {
      this.ispause = true;
    },
    // 跳到某一帧
    goto(n) {
        console.log(n);
      this.count = n;
      this.drawImg(this.currentFrameList[n].frame);
    },
    //  上一帧
    prev() {
      this.ispause = true;
      const n = this.count - 1 < 0 ? this.imgsLen - 1 : this.count - 1;
      this.goto(n);
    },
    //  下一帧
    next() {
      this.ispause = true;
      const n = this.count + 1 >= this.imgsLen ? 0 : this.count + 1;
      this.goto(n);
    },
    // 置顶置尾
    goFor(type) {
        console.log('播放');
      this.resetData();
      if (type === "frist") {
        this.resetData();
        this.goto(0);
      } else {
        this.resetData();
        this.goto(this.currentFrameList.length - 1);
      }
    },
    //  销毁对象
    destroy() {
      clearInterval(this.timer);
      this.timer = null;
      this.ctx = null;
      this.canvas && this.canvas.remove();
      this.canvas = null;
    },
  },
};
</script>
  <style  scoped>
@charset "UTF-8";
.videoBoxCls {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  box-sizing: border-box;
}
.videoBoxCls .left-list {
  width: 225px;
  flex: 0 0 auto;
  height: 550px;
  border-right: 1px solid #ccc;
  padding: 0 16px 0 9px;
  box-sizing: border-box;
  overflow: auto;
}
.videoBoxCls .left-list::-webkit-scrollbar {
  width: 5px !important;
  height: 5px !important;
}
.videoBoxCls .left-list .item-cls {
  width: 200px;
  position: relative;
}
.videoBoxCls .left-list .item-cls:hover .hoverTiltle {
  display: block;
}
.videoBoxCls .left-list .item-cls .hoverTiltle {
  display: none;
  background: #ffffff;
  padding: 0 5px;
  position: fixed;
  color: #333 !important;
  font-size: 12px;
  line-height: 24px;
  white-space: nowrap;
  z-index: 99999;
}
.videoBoxCls .left-list .item-cls .img-box {
  width: 200px;
  height: 128px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.videoBoxCls .left-list .item-cls .img-box img {
  max-width: 196px;
  max-height: 124px;
}
.videoBoxCls .left-list .item-cls .current {
  border: 2px solid #3390e0;
}
.videoBoxCls .left-list .item-cls .img-title {
  width: 100%;
  height: 34px;
  line-height: 34px;
  text-align: center;
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: default;
}
.videoBoxCls .right-con {
  width: 654px;
  height: 540px;
  flex: 0 0 auto;
  margin: 0 10px 10px;
}
.videoBoxCls .right-con .videoContainer {
  width: 654px;
  height: 480px;
}
.videoBoxCls .right-con .videoContainer .el-loading-mask {
  background-color: rgba(255, 255, 255, 0.3);
}
.videoBoxCls .right-con .frameBox {
  width: 100%;
  border: 1px solid #dbdbdb;
}
.videoBoxCls .right-con .frameBox .frame {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 20px;
  box-sizing: border-box;
}
.videoBoxCls .right-con .frameBox .frame .frameItem {
  height: 12px;
  flex: 1 1 auto;
  cursor: pointer;
  position: relative;
}
.videoBoxCls .right-con .frameBox .frame .frameItem:hover .hovFrame {
  display: block;
}
.videoBoxCls .right-con .frameBox .frame .frameItem .hovFrame {
  position: absolute;
  top: -27px;
  left: 0;
  background: #e5e5e5;
  line-height: 26px;
  padding: 0 5px;
  display: none;
  white-space: nowrap;
}
.videoBoxCls .right-con .frameBox .frame .error {
  background: #ededed;
}
.videoBoxCls .right-con .frameBox .frame .success {
  background: #d4d4d4;
}
.videoBoxCls .right-con .frameBox .frame .success:hover {
  background: #3390e0;
}
.videoBoxCls .right-con .frameBox .frame .currentFrane {
  background: #3390e0;
}
.videoBoxCls .right-con .frameBox .videoBtn {
  width: 100%;
  height: 38px;
  position: relative;
}
.videoBoxCls .right-con .frameBox .videoBtn .frame-title {
  position: absolute;
  top: 6px;
  left: 9px;
  background: #e5e5e5;
  height: 26px;
  line-height: 26px;
  padding-left: 18px;
  padding-right: 27px;
  font-size: 12px;
  color: #333;
  border-radius: 2px;
}
.videoBoxCls .right-con .frameBox .videoBtn .btn-box {
  margin: 0 auto;
  width: 145px;
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.videoBoxCls .right-con .frameBox .videoBtn .btn-box .goTopCls {
  width: 12px;
  height: 13px;
  cursor: pointer;
  background-size: cover;
  /* background-image: url("~@/assets/images/videoPre/com-t.png"); */
}
.videoBoxCls .right-con .frameBox .videoBtn .btn-box .goTopCls:hover {
  /* background-image: url("~@/assets/images/videoPre/hover-t.png"); */
}
.videoBoxCls .right-con .frameBox .videoBtn .btn-box .goTopCls:active {
  /* background-image: url("~@/assets/images/videoPre/click-t.png"); */
}
.videoBoxCls .right-con .frameBox .videoBtn .btn-box .prevCls {
  width: 8px;
  height: 13px;
  cursor: pointer;
  background-size: cover;
  /* background-image: url("~@/assets/images/videoPre/com-l.png"); */
}
.videoBoxCls .right-con .frameBox .videoBtn .btn-box .prevCls:hover {
  /* background-image: url("~@/assets/images/videoPre/hover-l.png"); */
}
.videoBoxCls .right-con .frameBox .videoBtn .btn-box .prevCls:active {
  /* background-image: url("~@/assets/images/videoPre/click-l.png"); */
}
.videoBoxCls .right-con .frameBox .videoBtn .btn-box .play {
  width: 22px;
  height: 22px;
  cursor: pointer;
  background-size: cover;
  /* background-image: url("~@/assets/images/videoPre/com-p.png"); */
}
.videoBoxCls .right-con .frameBox .videoBtn .btn-box .play:hover {
  /* background-image: url("~@/assets/images/videoPre/hover-p.png"); */
}
.videoBoxCls .right-con .frameBox .videoBtn .btn-box .play:active {
  /* background-image: url("~@/assets/images/videoPre/click-p.png"); */
}
.videoBoxCls .right-con .frameBox .videoBtn .btn-box .pause {
  width: 22px;
  height: 22px;
  cursor: pointer;
  background-size: cover;
  /* background-image: url("~@/assets/images/videoPre/com-v.png"); */
}
.videoBoxCls .right-con .frameBox .videoBtn .btn-box .pause:hover {
  /* background-image: url("~@/assets/images/videoPre/hover-v.png"); */
}
.videoBoxCls .right-con .frameBox .videoBtn .btn-box .pause:active {
  /* background-image: url("~@/assets/images/videoPre/click-v.png"); */
}
.videoBoxCls .right-con .frameBox .videoBtn .btn-box .nextCls {
  width: 8px;
  height: 13px;
  cursor: pointer;
  background-size: cover;
  /* background-image: url("~@/assets/images/videoPre/com-r.png"); */
}
.videoBoxCls .right-con .frameBox .videoBtn .btn-box .nextCls:hover {
  /* background-image: url("~@/assets/images/videoPre/hover-r.png"); */
}
.videoBoxCls .right-con .frameBox .videoBtn .btn-box .nextCls:active {
  /* background-image: url("~@/assets/images/videoPre/click-r.png"); */
}
.videoBoxCls .right-con .frameBox .videoBtn .btn-box .goLastCls {
  width: 12px;
  height: 13px;
  cursor: pointer;
  background-size: cover;
  /* background-image: url("~@/assets/images/videoPre/com-b.png"); */
}
.videoBoxCls .right-con .frameBox .videoBtn .btn-box .goLastCls:hover {
  /* background-image: url("~@/assets/images/videoPre/hover-b.png"); */
}
.videoBoxCls .right-con .frameBox .videoBtn .btn-box .goLastCls:active {
  /* background-image: url("~@/assets/images/videoPre/click-b.png"); */
}
</style>