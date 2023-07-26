<template>
  <div :style="menuHei">
    <iframe
      src="http://192.168.1.233:7860/"
      frameborder="0"
      width="100%"
      height="100%"
    ></iframe>
  </div>
</template>;
<script>
export default {
  name: "aiPicture",
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