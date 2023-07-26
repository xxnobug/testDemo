<template>
  <div ref="waterfall" class="waterfall-height-js" style="height: 800px">
    <el-button @click="resize" class="clickposition">点击</el-button>
    <div class="row" v-for="(list, index) in imgList" :key="index">
      <div
        class="image-box"
        v-for="img in list"
        :key="img.url"
        @click="clickImg(img)"
      >
        <img :src="img.url" :height="img.height" />
      </div>
    </div>
    <!-- <div ref="load">正在加载...</div> -->
  </div>
</template>
<script>
import { throttle } from "@/utils/utils";
export default {
  name: "EqualHeight",
  data() {
    return {
      onFetching:false,
      resizeRender: null,
      baseHeight: 100, //图片的基础计算高度
      imgList: [[]], //用二维数据保存每一行数据
      rowWidth: 0, //每行的图片宽度
      rowCount: 0, //每行的索引
      imgNum:20,
      imgsArr: [
        {
          src: "http://tpi.tgyc.com/Upload/20200828/1598574355.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/20210313/161562846638.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/20210224/161415562692.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20190620/1560999998.jpeg",
          width: 200,
          height: 100,
        },

        {
          src:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2003003075,1637143444&fm=26&gp=0.jpg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/20200828/1598574355.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/20210313/161562846638.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/20210224/161415562692.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20190620/1560999998.jpeg",
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
          src: "http://tpi.tgyc.com/Upload/20200828/1598574355.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/20210313/161562846638.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/20210224/161415562692.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20190620/1560999998.jpeg",
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
          src: "http://tpi.tgyc.com/Upload/20200828/1598574355.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/20210313/161562846638.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/20210224/161415562692.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20190620/1560999998.jpeg",
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
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=450146576,1920098873&fm=26&gp=0.jpg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/20200828/1598574355.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/20210313/161562846638.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/20210224/161415562692.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20190620/1560999998.jpeg",
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
          src: "http://tpi.tgyc.com/Upload/20200828/1598574355.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/20210313/161562846638.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/20210224/161415562692.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20190620/1560999998.jpeg",
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
          src: "http://tpi.tgyc.com/Upload/20200828/1598574355.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/20210313/161562846638.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/20210224/161415562692.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20190620/1560999998.jpeg",
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
          src: "http://tpi.tgyc.com/Upload/20200828/1598574355.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/20210313/161562846638.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/20210224/161415562692.jpeg",
          width: 200,
          height: 100,
        },
        {
          src: "http://tpi.tgyc.com/Upload/Uploads/20190620/1560999998.jpeg",
          width: 200,
          height: 100,
        },

        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=450146576,1920098873&fm=26&gp=0.jpg",
          width: 200,
          height: 100,
        },
      ],
    };
  },
  methods: {
    clickImg(val) {
      console.log(val);
    },
    loadImage() {
      this.imgsArr.splice(0,this.imgNum).forEach((el) => {
        let image = new Image();
        image.src = el.src;
        image.onload = () => {
          this.compare({
            url: el.src,
            width: this.baseHeight * (image.width / image.height),
            height: this.baseHeight,
          });
          this.resize();
        };
      });
    },
    //缩放后的总图片宽度与屏幕宽度比较
    compare(image) {
      //容器宽度
      let clientWidth = this.$refs.waterfall.clientWidth;
      //计算每行宽度
      this.rowWidth += image.width;
      //如果宽度大于容器宽度，去掉多余的宽度，整体进行缩放适应容器让右边对齐
      if (this.rowWidth > clientWidth) {
        //减去每个css padding边距
        clientWidth = clientWidth - this.imgList[this.rowCount].length * 10;
        this.rowWidth = this.rowWidth - image.width;
        //把高度调整为放大后的
        let growAfterHeight = (clientWidth * this.baseHeight) / this.rowWidth;
        this.imgList[this.rowCount].forEach((item) => {
          item.height = growAfterHeight;
        });
        //把多余图片放入到下一行
        this.rowWidth = image.width;
        this.rowCount++;
        this.$set(this.imgList, this.rowCount, [image]);
      } else {
        this.imgList[this.rowCount].push(image);
      }
    },
    resize() {
      //将已存在的图片数据展开，重新计算
      let newList = this.imgList.reduce((list, item) => list.concat(item), []);
      //清空数据
      this.imgList = [[]];
      this.rowWidth = 0;
      this.rowCount = 0;
      newList.forEach((image) => this.compare(image));
    },
    // 滚动加载
    scrollLoad() {
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight; //document的滚动高度
      let nowScotop =
        document.documentElement.clientHeight || document.body.clientHeight; //可视区高度
      let wheight =
        document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度

      if (this.onFetching) {
        // do nothing
      } else {
        console.log(nowScotop);
        console.log(scrollHeight - wheight  );
        if (nowScotop >= scrollHeight - wheight) {
          this.onFetching = true;
            console.log('我要加载了...');
          setTimeout(() => {
            // this.page += 1;
            // this.getData(this.categoryId); //加载列表的请求方法
            this.imgNum = this.imgNum + 10
            this.loadImage()
          
            this.onFetching = false;
          }, 500);
        }
      }
    },
  },
  created() {
    this.loadImage();
  },
  mounted() {
    this.resizeRender = throttle(this.resize, 200);
    window.addEventListener("resize", this.resizeRender);
    document.addEventListener("scroll", this.scrollLoad);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeRender);
    document.removeEventListener("scroll", this.scrollLoad);
  },
};
</script>
<style  scoped>
.image-box {
  float: left;
  padding: 5px;
}
.image-box img {
  display: block;
}
.clickposition {
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>
