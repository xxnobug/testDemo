<template>
  <div class="waterfall-height-css">
    <div class="image-box" v-for="img in imgList" :key="img.url">
      <img :src="img.url" />
    </div>
  </div>
</template>
<script>
export default {
  name: "HeightCss",
  data() {
    return {
      imgList: [],
      imgsArr: [
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2324126823,3922049774&fm=26&gp=0.jpg",
          width: 200,
          height: 100,
        },
        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2324126823,3922049774&fm=26&gp=0.jpg",
          width: 200,
          height: 100,
        },
        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2324126823,3922049774&fm=26&gp=0.jpg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=450146576,1920098873&fm=26&gp=0.jpg",
          width: 200,
          height: 100,
        },

        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=450146576,1920098873&fm=26&gp=0.jpg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },

        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2324126823,3922049774&fm=26&gp=0.jpg",
          width: 200,
          height: 100,
        },
        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=450146576,1920098873&fm=26&gp=0.jpg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=450146576,1920098873&fm=26&gp=0.jpg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=450146576,1920098873&fm=26&gp=0.jpg",
          width: 200,
          height: 100,
        },
        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=450146576,1920098873&fm=26&gp=0.jpg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=450146576,1920098873&fm=26&gp=0.jpg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=450146576,1920098873&fm=26&gp=0.jpg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=450146576,1920098873&fm=26&gp=0.jpg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=450146576,1920098873&fm=26&gp=0.jpg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20200325/1585105751.jpeg",
          width: 200,
          height: 100,
        },
      ],
    };
  },
  methods: {
    loadImage() {
      this.imgsArr.forEach((el) => {
        let image = new Image();
        image.src = el.src;
        image.onload = () => {
          this.imgList.push({
            url: el.src,
            width: image.width,
            height: image.height,
          });
        };
      });
    },
  },
  created() {
    this.loadImage();
  },
};
</script>
<style lang="" scoped>
.waterfall-height-css {
  display: flex;
  flex-wrap: wrap;
}

.image-box {
  margin: 5px;
  flex-grow: 1;
}
img {
  display: block;
  min-width: 100%;
  height: 200px;
  /* object-fit: contain; */
}
img:after {
  content: "";
  display: block;
  flex-grow: 99999;
}
</style>
