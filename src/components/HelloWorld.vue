<template>
  <div>
    <router-link to="/test">1</router-link>
    <router-link to="/pdf">2</router-link>
    <router-link to="/videoplay">3</router-link>
    <router-link to="/video">4</router-link>
    <router-view></router-view>
    <vue-waterfall-easy
      :imgsArr="imgsArr"
      :style="cardHeigth"
      :maxCols="8"
      :height="200"
      @click="clickFn"
    >
    </vue-waterfall-easy>
    <!-- <div class="imgBigBox">
      <div v-for="(item, index) in imgsArr" :key="index" class="imgHei">
        <img :src="item.src" alt="" height="100%" />
      </div>
    </div> -->
    <!-- :align="align" -->
    <!-- <waterfall
      :line="line"
      :line-gap="200"
      :min-line-gap="180"
      :max-line-gap="220"
      :single-max-width="300"
      :watch="imgsArr"
      @reflowed="reflowed"
      ref="waterfall"
    >
      <waterfall-slot
        v-for="(item, index) in imgsArr"
        :width="400"
        :height="320"
        :order="index"
        :key="item.index"
        move-class="item-move"
      >
        <div class="item" :style="item.style" :index="item.index"></div>
        <div class="item" :style="item.style" :index="item.index"></div>
        <img :src="item.src" alt="" style="" />
      </waterfall-slot>
    </waterfall> -->
  </div>
</template>
<script>
import vueWaterfallEasy from "vue-waterfall-easy";
// import Waterfall from "vue-waterfall/lib/waterfall";
// import WaterfallSlot from "vue-waterfall/lib/waterfall-slot";
export default {
  props: {
    gap: {
      // 图片间隔
      type: Number,
      default: 20,
    },
    maxCols: {
      // 最大的列数
      type: Number,
      default: 1,
    },

    imgHeight: {
      // 指定图片的统一宽度
      type: Number,
      default: 240,
    },
    timeOut: {
      // 预加载事件小于500毫秒就不显示加载动画，增加用户体验
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      align: "center",
      line: "h",
      // items: ItemFactory.get(100),
      isBusy: false,
      hei: 500,
      cardHeigth: "height:" + (window.innerHeight - 143) + "px",
      imgsArr: [
        {
          src:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww2.sinaimg.cn%2Fmw690%2F001WVu7Ply1gn3omesdmtj60u0c8gqva02.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618382129&t=6ce7196f8c3500b7901e92cda1963b17",
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
  components: {
    // Waterfall,
    // WaterfallSlot,
    vueWaterfallEasy,
  },
  mounted() {},
  methods: {
    clickFn(event, { index, value }) {
      // 阻止a标签跳转
      event.preventDefault();
      // 只有当点击到图片时才进行操作
      if (event.target.tagName.toLowerCase() == "img") {
        console.log("img clicked", index, value);
      }
    },
    addItems: function () {
      if (!this.isBusy && this.items.length < 500) {
        this.isBusy = true;
        // this.items.push.apply(this.items, ItemFactory.get(50));
      }
    },
    shuffle: function () {
      this.items.sort(function () {
        return Math.random() - 0.5;
      });
    },
    reflowed: function () {
      this.isBusy = false;
    },
    getData() {},
    add() {},
    del() {},
    //右键点击
    handlClick() {},
    rightClick(MouseEvent, object, Node, element) {
      console.log(MouseEvent, object, Node, element);
      // 鼠标右击触发事件
      this.menuVisible = false; // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
      this.menuVisible = true; // 显示模态窗口，跳出自定义菜单栏
      var menu = document.querySelector("#menu");
      document.addEventListener("click", this.foo); // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
      menu.style.display = "block";
      menu.style.left = MouseEvent.clientX - 0 + "px";
      menu.style.top = MouseEvent.clientY - 80 + "px";
    },
    foo() {
      // 取消鼠标监听事件 菜单栏
      this.menuVisible = false;
      document.removeEventListener("click", this.foo); // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
    },
  },
};
</script>
<style scoped >
.imgBigBox {
  width: 100%;
  /* display: flex; */
}
.imgHei {
  display: inline-block;
  height: 240px;
  margin-right: 10px;
}
.item-move {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  -webkit-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
</style>