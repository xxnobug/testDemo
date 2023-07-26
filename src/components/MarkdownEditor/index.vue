<template>
  <div>
    <div :id="id" />
    <input
      style="display: none"
      ref="files"
      @change="uploadFile"
      type="file"
     
    />
  </div>
</template>

<script>
// deps for editor
import "codemirror/lib/codemirror.css"; // codemirror
import "tui-editor/dist/tui-editor.css"; // editor ui
import "tui-editor/dist/tui-editor-contents.css"; // editor content

import Editor from "tui-editor";
import defaultOptions from "./default-options";

export default {
  name: "MarkdownEditor",
  props: {
    value: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      required: false,
      default() {
        return (
          "markdown-editor-" +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + "")
        );
      },
    },
    options: {
      type: Object,
      default() {
        return defaultOptions;
      },
    },
    mode: {
      type: String,
      default: "markdown",
    },
    height: {
      type: String,
      required: false,
      default: "300px",
    },
    language: {
      type: String,
      required: false,
      default: "en_US", // https://github.com/nhnent/tui.editor/tree/master/src/js/langs
    },
  },
  data() {
    return {
      editor: null,
      token: "10b1705f1b31f46fa295aa0b12df605f",
      headers: {
        "X-token": `10b1705f1b31f46fa295aa0b12df605f`,
      },
      imgSer: `http://tpi.tgyc.com/index.php/home/file/upload`,
    };
  },
  computed: {
    editorOptions() {
      const options = Object.assign({}, defaultOptions, this.options);
      options.initialEditType = this.mode;
      options.height = this.height;
      options.language = this.language;
      return options;
    },
  },
  watch: {
    value(newValue, preValue) {
      if (newValue !== preValue && newValue !== this.editor.getValue()) {
        this.editor.setValue(newValue);
      }
    },
    language(val) {
      this.destroyEditor();
      this.initEditor();
    },
    height(newValue) {
      this.editor.height(newValue);
    },
    mode(newValue) {
      this.editor.changeMode(newValue);
    },
  },
  mounted() {
    this.initEditor();
  },
  destroyed() {
    this.destroyEditor();
  },
  methods: {
    uploadFile(e) {
      let target = e.target;
      let file = target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("token", this.qnToken);
      // this.$axios({
      //   method: "post",
      //   url: "http://tpi.tgyc.com/index.php/home/file/upload",
      //   data: formData,
      // })
      //   .then((res) => {
          //上传成功地址拼接
          // let imgUrl = "http://localhost:8080/img/videoPlay.106ec28a.png";
          let imgUrl = "http://assetp.tgyc.com/rec/20210903_103835.mp4";
          // this.addImgToMd(imgUrl);
          this.addVideoToMd(imgUrl);
        // })
        // .catch((error) => {
        //   console.error(error.response);
        // });
      target.value = ""; //这个地方清除一下不然会有问题
    },
    //添加图片到markdown
    addImgToMd(data) {
      let editor = this.editor.getCodeMirror();
      let editorHtml = this.editor.getCurrentModeEditor();
      let isMarkdownMode = this.editor.isMarkdownMode();
      if (isMarkdownMode) {
        editor.replaceSelection(`![img](${data})`);
      } else {
        let range = editorHtml.getRange();
        let img = document.createElement("img");
        img.src = `${data}`;
        img.alt = "img";
        range.insertNode(img);
      }
    },
    addVideoToMd(data) {
      let editor = this.editor.getCodeMirror();
      let editorHtml = this.editor.getCurrentModeEditor();
      let isMarkdownMode = this.editor.isMarkdownMode();
      console.log(isMarkdownMode);
      // if (isMarkdownMode) {

        //  editor.replaceSelection(`![video](${data})`);
        editor.replaceSelection(`<video src='${data}' width='320px' height='180px'  controls="controls"></video>`);
      // } else {
      //   let range = editorHtml.getRange();
      //   let video = document.createElement("video");
      //   video.src = `http://assetp.tgyc.com/rec/20210903_103835.mp4`;
      //   video.alt = "video";
      //   range.insertNode(video);
      // }
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    initEditor() {
      this.editor = new Editor({
        el: document.getElementById(this.id),
        ...this.editorOptions,
      });
      if (this.value) {
        this.editor.setValue(this.value);
      }
      this.editor.on("change", () => {
        this.$emit("input", this.editor.getValue());
      });

      let toolbar = this.editor.getUI().getToolbar();
      let fileDom = this.$refs.files;

      //添加事件
      this.editor.eventManager.addEventType("uploadimg");
      this.editor.eventManager.listen("uploadimg", () => {
        fileDom.click();

        
      });
      //添加事件
      this.editor.eventManager.addEventType("uploadVideo");
      this.editor.eventManager.listen("uploadVideo", () => {
        fileDom.click();

        // Do some other thing...
      });
      
      toolbar.insertItem(toolbar.getItems().length - 1, {
        type: "button",
        options: {
          name: "customize",
          event: "uploadimg",
          tooltip: "insert image",
          el: '<button class="tui-image" style="font-size: 14px;color: #000"></button>',
          style: "background-position: -130px -4px;",
        },
      });
      toolbar.insertItem(toolbar.getItems().length - 1, {
        type: "button",
        options: {
          name: "customize",
          event: "uploadVideo",
          tooltip: "insert video",
          el: '<button class="tui-image" style="font-size: 14px;color: #000"></button>',
          style: "background-position: -130px -4px;",
        },
      });
    },
    destroyEditor() {
      if (!this.editor) return;
      this.editor.off("change");
      this.editor.remove();
    },
    setValue(value) {
      this.editor.setValue(value);
    },
    getValue() {
      return this.editor.getValue();
    },
    setHtml(value) {
      this.editor.setHtml(value);
    },
    getHtml() {
      return this.editor.getHtml();
    },
  },
};
</script>
