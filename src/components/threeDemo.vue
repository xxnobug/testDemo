<template>
  <div>
    <div id="container"></div>
    <div @click="openGif" class="dingyi">顶一下</div>
  </div>
</template>
<script>
import axios from "axios";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import gifshot from "../../static/gifshot.js";
export default {
  data() {
    return {
      boneArr: [],
      fbxArr: [
        "../../static/Flair.fbx",
        "../../static/Catwalk Walk Turn 180 Tight.fbx",
        "../../static/Dying.fbx",
      ],
      scene: "",
      renderer: "",
      camera: "",
      stats: "",
      model: "",
      skeleton: "",
      mixer: "",
      crossFadeControls: [],
      idleAction: "",
      walkAction: "",
      runAction: "",
      idleWeight: "",
      walkWeight: "",
      runWeight: "",
      actions: "",
      settings: "",
      singleStepMode: false,
      sizeOfNextStep: 0,
      tracksNumber: 0,
      imgs: [],
      gifarr: [],
      fbxindex: 0,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const container = document.getElementById("container");

      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      this.scene = new THREE.Scene();
      this.camera.position.set(30, 30, 70);
      this.camera.lookAt(100, 1, 0);
      this.clock = new THREE.Clock();
      this.scene.background = new THREE.Color(0xa0a0a0);
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
      hemiLight.position.set(0, 1, 0);
      this.scene.add(hemiLight);

      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(4000, 4000),
        new THREE.MeshStandardMaterial({ color: 0xffffff, depthWrite: false })
      );
      mesh.rotation.x = Math.PI / 2;
      mesh.receiveShadow = true;
      this.scene.add(mesh);

      const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
      grid.material.opacity = 0.2;
      grid.material.transparent = true;
      this.scene.add(grid);

      let that = this;

      const loader = new FBXLoader();
      var actData = {};
      axios.get("../../static/shangli2.json").then((response) => {
        console.log(response);
        actData = response.data;
        loader.load("../../static/Injured Run Jump.fbx", function (gltf) {
          console.log(gltf);
          // var jdkddf = THREE.AnimationClip.parse(actData);
          // var oldData = gltf.children[1].children[0];
          // var allBone = that.getAllBone(oldData);
          // jdkddf.tracks = that.setTracks(that.boneArr, jdkddf.tracks);

          //   gltf.animations[2] = jdkddf;
          //   gltf.animations[2].name = "newsjj";

          that.model = gltf;

          that.skeleton = new THREE.SkeletonHelper(that.model);
          that.skeleton.visible = true;
          that.scene.add(that.skeleton);

          const animations = gltf.animations[0];

          that.mixer = new THREE.AnimationMixer(that.model);

          that.idleAction = that.mixer.clipAction(
            gltf.animations[0],
            that.model
          );

          let aaa = that.idleAction.getClip();
          console.log(aaa);
          console.log("1212121");
          that.idleAction.play();
          that.actions = [that.idleAction];
          that.model.scale.set(0.1, 0.1, 0.1);
          that.scene.add(that.model);
          that.animate();
        });
      });

      this.renderer = new THREE.WebGLRenderer({
        preserveDrawingBuffer: true,
        container,
        antialias: true,
        alpha: true,
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.shadowMap.enabled = true;
      container.appendChild(this.renderer.domElement);

      this.stats = new Stats();
      container.appendChild(this.stats.dom);

      const controls = new OrbitControls(that.camera, that.renderer.domElement);
      controls.target.set(0, 12, 0);
      controls.update();
      window.addEventListener("resize", this.onWindowResize);
    },
    getchildren(data) {
      var allBone = [];
      for (var i = 0; i < data.length; i++) {
        var childrenBone = [];

        if (data[i].children) {
          if (data[i].children.length > 0) {
            childrenBone = this.getchildren(data[i].children);
          }
        }
        this.boneArr.push(data[i].name);
        allBone.push({
          name: data[i].name,
          children: childrenBone,
        });
      }
      return allBone;
    },
    getAllBone(data) {
      var allBone = [];
      var childrenBone = [];
      if (data.children) {
        if (data.children.length > 0) {
          childrenBone = this.getchildren(data.children);
        }
      }
      this.boneArr.push(data.name);
      allBone.push({
        name: data.name,
        children: childrenBone,
      });
      return allBone;
    },
    //移除新序列中不存在的骨骼属性
    setTracks(boneArr, newTracks) {
      var currentTrack = newTracks;
      for (var i = currentTrack.length - 1; i > -1; i--) {
        var boneName = currentTrack[i].name;
        boneName = boneName.slice(0, boneName.indexOf("."));
        if (boneArr.indexOf(boneName) == -1) {
          currentTrack.splice(i, 1);
        }
      }
      return currentTrack;
      // 459
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    toSingleStepMode() {
      console.log(11111);
      //   this.unPauseAllActions();

      this.singleStepMode = true;
      this.sizeOfNextStep = 0.08;
    },
    openGif() {
      let that = this;
      that.idleAction.reset();
      let index = 0;
      let timer = setInterval(() => {
        index++;
        this.toSingleStepMode();
        this.imgs.push(this.renderer.domElement.toDataURL("image/png"));
        if (index == 50) {
          clearInterval(timer);
          console.log("执行到这了");
          console.log(this.imgs);
          gifshot.createGIF(
            {
              gifWidth: 180, // GIF宽度
              gifHeight: 212, // GIF高度
              images: this.imgs, // 需要的图片数组
              interval: 0.1, // 每帧捕获之间等待的时间（以秒为单位）
              numFrames: 10, // 用于创建GIF的帧数
              frameDuration: 1, // 每帧停留的时间（10=1s）
              sampleInterval: 10, // 创建调色板时要跳过多少像素。默认值为10。“少”为佳，但较慢。
              numWorkers: 2, // 要使用多少个网络工作者来处理GIF动画帧。默认值为2。
            },
            function (obj) {
              console.log(obj);
              if (!obj.error) {
                var image = obj.image;
                console.log(image);
                that.gifarr.push(image);
                that.imgs = [];
                that.singleStepMode = false;
                // that.fbxindex ++
                // if(that.fbxindex > that.gifarr.length){

                // }else{
                //     that.init()
                //     that.openGif()
                // }
              }
            }
          );
        }
      }, 500);
      //   for (let index = 0; index < 25; index++) {}
    },
    unPauseAllActions() {
      this.actions.forEach(function (action) {
        action.paused = false;
      });
    },
    toPause() {
      let that = this;
      if (that.idleAction.paused) {
        // 如果是播放状态，设置为暂停状态
        that.idleAction.paused = false;
      } else {
        // 如果是暂停状态，设置为播放状态
        that.idleAction.paused = true;
      }
    },

    animate() {
      let that = this;
      // Render loop

      requestAnimationFrame(this.animate);

      // Update the panel values if weights are modified from "outside" (by crossfadings)

      // Enable/disable crossfade controls according to current weight values

      // Get the time elapsed since the last frame, used for mixer update (if not in single step mode)

      let mixerUpdateDelta = this.clock.getDelta();

      // If in single step mode, make one step and then do nothing (until the user clicks again)

      if (this.singleStepMode) {
        mixerUpdateDelta = this.sizeOfNextStep;
        this.sizeOfNextStep = 0;

        // this.tracksNumber++;
        // console.log(this.tracksNumber);
        // if (this.tracksNumber == 25) {
        //   console.log(this.tracksNumber);
        //   gifshot.createGIF(
        //     {
        //       gifWidth: 480, // GIF宽度
        //       gifHeight: 270, // GIF高度
        //       images: this.imgs, // 需要的图片数组
        //       interval: 0.1, // 每帧捕获之间等待的时间（以秒为单位）
        //       numFrames: 25, // 用于创建GIF的帧数
        //       frameDuration: 1, // 每帧停留的时间（10=1s）
        //       sampleInterval: 10, // 创建调色板时要跳过多少像素。默认值为10。“少”为佳，但较慢。
        //       numWorkers: 2, // 要使用多少个网络工作者来处理GIF动画帧。默认值为2。
        //     },
        //     function (obj) {
        //       if (!obj.error) {
        //         var image = obj.image;
        //         console.log(image);
        //         that.imgs = [];
        //         that.singleStepMode = false;
        //       }
        //     }
        //   );
        // } else {
        //   console.log("加载图片");
        //   mixerUpdateDelta = this.sizeOfNextStep;
        //   this.sizeOfNextStep = 0;
        //   this.imgs.push(this.renderer.domElement.toDataURL("image/png"));
        // }
      }
      // Update the animation mixer, the stats panel, and render this frame
      this.mixer.update(mixerUpdateDelta);
      this.stats.update();
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>
<style scoped >
.dingyi {
  position: fixed;
  top: 0px;
  right: 0px;
}
</style>