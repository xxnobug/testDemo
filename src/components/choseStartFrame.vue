<template>
  <div class="container">
    <div class="slider-container">
      <div class="imgbox" v-for="(item, index) in imgs" :key="index">
        <img :src="item" alt="" />
      </div>
      <div class="slider-left" :style="{ left: leftPosition + '%' }">
        <div class="slider-handle" @mousedown.prevent="onLeftMouseDown"></div>
        <div class="slider-tooltip">
          <!-- {{ leftPosition }}% -->
          <img
            :src="leftPositionImg"
            alt=""
            height="90px"
            style="object-fit: scale-down"
          />
        </div>
      </div>
      <div class="slider-right" :style="{ left: rightPosition + '%' }">
        <div class="slider-handle" @mousedown.prevent="onRightMouseDown"></div>
        <div class="slider-tooltip">
          <!-- {{ rightPosition }}% -->

          <img
            :src="rightPositionImg"
            alt=""
            height="90px"
            style="object-fit: scale-down"
          />
        </div>
      </div>
    </div>
    <!-- <div class="slider-track"></div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftPositionImg: "",
      rightPositionImg: "",
      imgs: [
        "../../static/images/1.png",
        "../../static/images/2.png",
        "../../static/images/3.png",
        "../../static/images/4.png",
        "../../static/images/5.png",
        "../../static/images/6.png",
        "../../static/images/7.png",
        "../../static/images/8.png",
        "../../static/images/9.png",
        "../../static/images/10.png",
        "../../static/images/11.png",
        "../../static/images/12.png",
        "../../static/images/13.png",
      ],
      leftPosition: 0,
      rightPosition: 100,
      trackWidth: 0,
    };
  },
  computed: {
    leftPercentage() {
      return Math.round((this.leftPosition / this.trackWidth) * 100);
    },
    rightPercentage() {
      return Math.round((this.rightPosition / this.trackWidth) * 100);
    },
  },
  mounted() {
    this.trackWidth = 57 * this.imgs.length;
    console.log(this.trackWidth);
    console.log("this.trackWidth");
  },
  methods: {
    onLeftMouseDown(e) {
      const handleWidth = e.target.offsetWidth;

      const startX =
        e.pageX -
        parseInt((this.leftPosition * this.trackWidth) / 100 - handleWidth / 2);

      document.onmousemove = (ev) => {
        const handleWidth = this.$el.querySelector(
          ".slider-left .slider-handle"
        ).offsetWidth;

        const endX = ev.pageX - handleWidth / 2;

        const position = Math.max(
          0,
          Math.min(
            endX - startX,
            (this.rightPosition * this.trackWidth) / 100 - handleWidth
          )
        );

        this.leftPosition = Math.round((position / this.trackWidth) * 100);

        this.leftPositionImg =
          this.imgs[
            Math.ceil((this.leftPosition / 100) * this.imgs.length) - 1
          ];
      };
      document.onmouseup = (ev) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    onRightMouseDown(e) {
      const handleWidth = e.target.offsetWidth;
      const startX =
        e.pageX -
        (this.rightPosition * this.trackWidth) / 100 -
        handleWidth / 2;

      document.onmousemove = (ev) => {
        const handleWidth = this.$el.querySelector(
          ".slider-right .slider-handle"
        ).offsetWidth;
        const endX = ev.pageX - handleWidth / 2;
        const position = Math.max(
          (this.leftPosition * this.trackWidth) / 100 + handleWidth,
          Math.min(endX - startX, this.trackWidth - handleWidth)
        );
        this.rightPosition = Math.round((position / this.trackWidth) * 100);

        this.rightPositionImg =
          this.imgs[
            Math.ceil((this.rightPosition / 100) * this.imgs.length) - 1
          ];
      };

      document.onmouseup = (ev) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
  },
};
</script>

<style scoped>
.imgbox {
  display: inline-block;
}
.imgbox img {
  height: 90px;
  object-fit: scale-down;
}
.container {
  margin-top: 300px;
  display: flex;
  justify-content: center;
}

.slider-container {
  position: relative;
}

.slider-track {
  width: 100%;
  height: 4px;
  background-color: gray;
}

.slider-handle {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 5px;
  height: 110px;
  background-color: white;
  border: 1px solid gray;
  cursor: pointer;
}

.slider-tooltip {
  position: absolute;
  top: -97px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  font-weight: bold;
}

.slider-left {
  position: absolute;
  top: -10px;
  left: 0;
  width: 20px;
  height: 50px;
}

.slider-right {
  position: absolute;
  top: -10px;
  right: 0;

  width: 20px;
  height: 20px;
}
</style>