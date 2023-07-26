<template>
  <div>
    <tinymce v-model="tinymceHtml"></tinymce>
  </div>
</template>;
<script>
import tinymce from "../../Tinymce";
export default {
  data() {
    return {
      tinymceHtml: "",
    };
  },
  components: {
    tinymce,
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped >
</style>