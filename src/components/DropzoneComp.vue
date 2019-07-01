<template>
  <vue-dropzone
    :options="dropzoneOptions"
    :use-custom-slot="true"
    ref="myDropzone"
    id=0xffff0122
  >
    <div class="dropzone-custom-content">
      <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
      <div class="subtitle">or click to select a file from your computer</div>
    </div>
  </vue-dropzone>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";



export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function() {
    return {
      dropzoneOptions: {
        id: "mydropzone",
        url: "https://httpbin.org/post",
        thumbnailWidth: 200,
        addRemoveLinks: true
      }
    };
  },
  methods: {
    getFiles() {
      return this.$refs.myDropzone.getAcceptedFiles();
    }
  }
};
</script>

<style scoped>
.vue-dropzone {
  position: relative;
}
.dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}
</style>
