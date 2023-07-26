 <template>
  <div>
    <div
      style="
        z-index: 200;
        position: fixed;
        right: 10px;
        top: 200px;
        cursor: pointer;
        font-size: 25px;
      "
    >
      <div @click="toPause">停止</div>
      <div @click="nextTark">下一个</div>
      <div>
        <i @click="startClick" class="glyphicon glyphicon-camera">按钮</i>
      </div>
    </div>

    <div id="threeContained"></div>
    <div class="aaaa">
      <img :src="base64URl" alt="" />
    </div>
  </div>
</template>
<script>
import PageScreenshot from "page-screenshot";
import "page-screenshot/lib/page-screenshot.css"; //重要
import * as THREE from "three"; //引入Threejs
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import GIF from "../../static/gif.js";
import gifshot from "../../static/gifshot.js";

// const OrbitControls = require("three-orbit-controls")(THREE);
export default {
  name: "vue-three",
  data() {
    return {
      three: "",
      base64URl: "",
      scene: "",
      light: "",
      camera: "",
      controls: "",
      renderer: "",
      load: "",
      clock: "",
      mixer: "",
      imgs: [],
      gifLength: "",
      actionHandel: "",
      actions: "",
      settings: "",
      clock: "",
      singleStepMode: false,
      sizeOfNextStep: 0,
      sizeOfNextStepVal:0,
    };
  },
  mounted() {},
  methods: {
    nextTark() {
      console.log("下一个");
      this.unPauseAllActions();

      this.singleStepMode = true;
      this.sizeOfNextStep = 0.04;

    },

    unPauseAllActions() {
      this.actions.forEach(function (action) {
        action.paused = false;
      });
    },
    toPause() {
      let that = this;
      if (that.actionHandel.paused) {
        // 如果是播放状态，设置为暂停状态
        that.actionHandel.paused = false;
      } else {
        // 如果是暂停状态，设置为播放状态
        that.actionHandel.paused = true;
      }
    },
    async startClick() {
      let that = this;
      //   console.log(that.renderer);

      for (let i = 0; i < that.gifLength; i++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            console.log("暂停部分");
            that.toPause();
            // console.log(that.renderer.domElement.toDataURL("image/png"));
            that.imgs.push(that.renderer.domElement.toDataURL("image/png"));
            // gif.addFrame(that.renderer.domElement, { delay: 200 });
            console.log("开始");
            that.toPause();
            resolve();
          }, 40);
        });
      }

      gifshot.createGIF(
        {
          gifWidth: 480, // GIF宽度
          gifHeight: 270, // GIF高度
          images: this.imgs, // 需要的图片数组
          interval: 0.1, // 每帧捕获之间等待的时间（以秒为单位）
          numFrames: 25, // 用于创建GIF的帧数
          frameDuration: 1, // 每帧停留的时间（10=1s）

          sampleInterval: 10, // 创建调色板时要跳过多少像素。默认值为10。“少”为佳，但较慢。
          numWorkers: 2, // 要使用多少个网络工作者来处理GIF动画帧。默认值为2。
        },
        function (obj) {
          if (!obj.error) {
            var image = obj.image;
            console.log(image);
            that.imgs = [];
          }
        }
      );

      // let cav = document.getElementById("threeContained");
      // var a = document.createElement("a");
      // a.href = cav.childNodes[1].toDataURL("image/png");
      // a.download = "image.png";
      // a.click();

      //   return;
      // this.getAxios();
      //  this.getCanvas();
      //   var gif = new GIF({
      //     workers: 1,
      //     quality: 1,
      //     workerScript: "../../static/gif.worker.js",
      //   });
      //   console.log(gif);
      //   // for (let i = 0; i < 60; i++) {
      //   // setCamera()
      //   for (let i = 0; i < 100; i++) {
      //     await new Promise((resolve) => {
      //       setTimeout(() => {
      //         console.log(i);
      //         // console.log(that.renderer.domElement.toDataURL("image/png"));
      //         gif.addFrame(that.renderer.domElement, { delay: 150 });
      //         resolve();
      //       }, 40);
      //     });
      //   }
      //   console.log(gif);

      //   gif.on("finished", function (blob) {
      //     // window.open(URL.createObjectURL(blob));

      //     // console.log( blob);

      //     var reader = new FileReader();
      //     reader.readAsDataURL(blob);
      //     reader.onload = function (e) {
      //       console.log(e.target.result);
      //     };
      //   });
      //   gif.render();

      // })
      // }

      return;
      var ps = new PageScreenshot({
        ignoreElements: function (el) {
          // return "screenshotBtn" == el.id; //截屏时，不要渲染id为screenshotBtn的按钮
          console.log(el);
        },
      });
      var res = await ps.screenshot();
      console.log(res);
      if (res) {
        this.base64URl = res.dataURL;

        console.log("我是图片");
        this.$message({
          type: "success",
          message: "图片生成成功",
        });
      }
    },
    init() {
      var that = this;
      let container = document.getElementById("threeContained");

      that.clock = new THREE.Clock();
      // 创建场景
      that.scene = new THREE.Scene();
      //   设置模型的背景色
      that.scene.background = new THREE.Color("rgb(0, 0, 0)");

      // 创建相机
      // fov — 摄像机视锥体垂直视野角度
      // aspect — 摄像机视锥体长宽比
      // near — 摄像机视锥体近端面
      // far — 摄像机视锥体远端面

      that.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      // 定位相机，并且指向场景中心
      that.camera.position.x = 30;
      that.camera.position.y = 30;
      that.camera.position.z = 170;
      that.camera.lookAt(that.scene.position);

      //   /// 显示三维坐标系
      //   var axes = new THREE.AxesHelper(100);
      //   // 添加坐标系到场景中
      //   that.scene.add(axes);

      // 创建地面
      // const geometry = new THREE.BoxGeometry();
      // const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
      // const cube = new THREE.Mesh(geometry, material);
      // that.scene.add(cube);

      // 创建地面的几何体
      var planeGeometry = new THREE.PlaneGeometry(100, 60);
      // 给地面物体上色
      var planeMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
      // 创建地面
      var plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.material.opacity = 0.6;
      plane.material.transparent = true;
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.x = 0;
      plane.position.y = 0;
      plane.position.z = 0;
      plane.castShadow = true;
      // 接收阴影
      plane.receiveShadow = true;
      that.scene.add(plane);

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
      hemiLight.position.set(0, 1, 0);
      that.scene.add(hemiLight);

      const directionalLight1 = new THREE.DirectionalLight(0xffeeff, 0.8);
      directionalLight1.position.set(1, 1, 1);
      that.scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight2.position.set(-1, 0.5, -1);
      that.scene.add(directionalLight2);

      const ambientLight = new THREE.AmbientLight(0x404040);
      that.scene.add(ambientLight);

      // stats
      that.stats = new Stats();
      container.appendChild(that.stats.dom);

      // 材质
      const normal = new THREE.TextureLoader().load(
        "../../static/Dragon_Bump_Col2.jpg",
        "../../static/Dragon_Nor_mirror2.jpg",
        "../../static/Floor_C.jpg",
        "../../static/Floor_N.jpg",
        "../../static/Floor_S.jpg"
      );

      //   that.loader = new GLTFLoader();
      //   that.loader.load("../../static/ef2da8ba53194e35a4be77969cff3949.fbx", (gltf) => {
      //     // that.mixer = new THREE.AnimationMixer(object);
      //     // const action = that.mixer.clipAction(object.animations[0]);
      //     // action.play();
      //     object.scale.set(0.1, 0.1, 0.1);
      //     // object.scale.set(1,1,1)
      //     that.scene.add(object);
      //     that.animate();
      //   });

      // model
      that.loader = new FBXLoader();

      that.loader.load(
        "../../static/Catwalk Walk Turn 180 Tight.fbx",
        function (object1) {
          that.loader.load("../../static/Dying.fbx", function (object2) {
            // model.visible = true;
            console.log(object2);
            // // 显示骨骼
            object2.visible = true;
            let skeleton = new THREE.SkeletonHelper(object2);
            skeleton.visible = true;
            that.scene.add(skeleton);

            let bb = object1.animations[0].toJSON();

            //   object1.animations = bb;

            let obj = THREE.AnimationClip.parse(bb);

            //   console.log(object1.animations[0]);
            console.log(obj);
            that.gifLength = obj.tracks.length;
            console.log("animation");

            that.mixer = new THREE.AnimationMixer(object2);
            // console.log(object2.animations[0].tracks.toJSON());
            const action = that.mixer.clipAction(obj, object2);
            //   action.timeScale = 1; //24帧每秒变为30帧每秒，要慢放为0.8倍
            that.actionHandel = action;
            // action;

            that.actions = [obj];

            action.play();

            // let a = new THREE.AnimationClip.toJSON(object2.animations[0].tracks);
            // console.log(a);

            // var animation = new THREE.AnimationClip(
            //   "Take",
            //   -1,
            //   object2.animations[0].tracks
            // );
            // animation.toJSON(animation);
            // console.log(animation.toJSON(animation));

            //  AnimationClip
            // KeyframeTrack
            //   object.traverse(function (child) {
            //     if (child.isMesh) {
            //       child.castShadow = true;
            //       child.receiveShadow = true;
            //     }
            //   });

            //   object.traverse(function (child) {
            //     if (child.isMesh) {
            //       child.material.specular.setScalar(0.1);
            //       child.material.normalMap = normal;
            //     }
            //   });

            object2.scale.set(0.1, 0.1, 0.1);
            //   object.position.set(0, 0, 0);
            // object.scale.set(1,1,1)
            that.scene.add(object2);
            that.animate();
          });
        }
      );

      // 创建渲染器
      that.renderer = new THREE.WebGLRenderer({
        preserveDrawingBuffer: true,
        container,
        antialias: true,
        alpha: true,
      });

      that.renderer.setPixelRatio(window.devicePixelRatio);
      // 设置渲染器的初始颜色
      //   that.renderer.setClearColor(new THREE.Color("000000"));
      // 设置输出canvas画面的大小
      that.renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(that.renderer.domElement);

      const controls = new OrbitControls(that.camera, that.renderer.domElement);
      controls.target.set(0, 12, 0);
      controls.update();

      // debugger
      //   window.addEventListener("onpointerdown", that.selectObject());
      window.addEventListener("resize", that.onWindowResize);
    },

    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },

    animate() {
      requestAnimationFrame(this.animate);
      // requestAnimationFrame(this.animate);

      // this.renderer.render(this.scene, this.camera);

      // this.stats.update();
      let mixerUpdateDelta = this.clock.getDelta();
    //   if (this.singleStepMode) {

          this.sizeOfNextStep = 0.04;
          this.sizeOfNextStepVal = this.sizeOfNextStepVal + 0.04;
        console.log(this.sizeOfNextStep);
        mixerUpdateDelta = this.sizeOfNextStep;
        this.sizeOfNextStep = 0;
    //   }

      this.mixer.update(mixerUpdateDelta);

      this.stats.update();
      this.renderer.render(this.scene, this.camera);
    },
    selectObject(event) {
      //   debugger;

      if (event.button != 0) return;

      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.camera);

      const intersected = raycaster.intersectObjects(
        this.scene.children,
        false
      );
      console.log(intersected);
      if (intersected.length) {
        const found = intersected[0];
        const faceIndex = found.faceIndex;
        const geometry = found.object.geometry;
        console.log(this.load);
        // const id = ifcLoader.ifcManager.getExpressId(geometry, faceIndex);

        const modelID = found.object.modelID;
        // ifcLoader.ifcManager.createSubset( { modelID, ids: [ id ], scene, removePrevious: true, material: highlightMaterial } );
        // const props = ifcLoader.ifcManager.getItemProperties(modelID, id, true);
        // console.log(props);
        // this.renderer.render( this.scene, this.camera );
      }
    },
  },
  mounted() {
    this.clock = new THREE.Clock();
    this.init();

    window.onpointerdown = this.selectObject;
  },
};
</script>
 
<style scoped>
html,
body {
  height: 100%;
}
/* #container {
  width: 100%;
  margin: 0 auto;
  height: 1000px;
  overflow: hidden;
} */
.aaaa {
  position: fixed;
  top: 0px;
  right: 0px;
  width: 100px;
  height: 100px;
}
.aaaa img {
  width: 100%;
  height: 100%;
}
</style>