<template>
  <div>
    <div class="editor-container">
      <el-tag class="tag-title"> Markdown Mode: </el-tag>
      <markdown-editor
        ref="markdownEditor"
        v-model="content2"
        :options="{ hideModeSwitch: true, previewStyle: 'tab', viewer: true }"
        height="200px"
      />
    </div>

    <el-button
      style="margin-top: 80px"
      type="primary"
      icon="el-icon-document"
      @click="getHtml"
    >
      Get HTML
    </el-button>
    <el-button
      style="margin-top: 80px"
      type="primary"
      icon="el-icon-document"
      @click="setHtml"
    >
      setet HTML
    </el-button>
    <div v-html="html" id="htmlContent" />
  </div>
</template>

<script>
import MarkdownEditor from "./MarkdownEditor";

const content = `
**This is test**

* vue
* element
* webpack

`;
export default {
  name: "MarkdownDemo",
  components: { MarkdownEditor },
  data() {
    return {
      content1: content,
      content2: "",
      content3: content,
      content4: content,
      html: "",
      languageTypeList: {
        en: "en_US",
        zh: "zh_CN",
        es: "es_ES",
      },
    };
  },
  computed: {
    language() {
      return "zh_CN";
    },
  },
  methods: {
    getHtml() {
      let getHtml = this.$refs.markdownEditor.getHtml();

      let vidoeIndex = getHtml.indexOf("video");

      while (vidoeIndex !== -1) {
        console.log(vidoeIndex); // 打印字符串出现的位置
        getHtml =
          getHtml.slice(0, vidoeIndex + 5) +
          " controls=true " +
          getHtml.slice(vidoeIndex + 5);
        vidoeIndex = getHtml.indexOf("video", vidoeIndex + 6); // 从字符串出现的位置的下一位置开始继续查找
      }

      this.html = getHtml;
    },
    setHtml() {
      this.content2 = `
<video ></video>
`;
    },
  },
};
</script>

<style >
.editor-container {
  margin-bottom: 30px;
}
.tag-title {
  margin-bottom: 5px;
}
</style>
