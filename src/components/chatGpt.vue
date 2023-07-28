<template>
  <div :style="menuHei">
    <!-- <iframe
      src="http://ai.tgyc.com/"
      frameborder="0"
      width="100%"
      height="100%"
    ></iframe> -->
  </div>
</template>;
<script>
export default {
  name: "chatGpt",
  data() {
    return {
      menuHei: "height:" + (window.innerHeight - 22) + "px",
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped >
</style>