<template>
  <vue-dropzone
    :options="dropzoneOptions"
    :use-custom-slot="true"
    @vdropzone-file-added="afterComplete"
    ref="myDropzone"
  >
    <div class="dropzone-custom-content">
      <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
      <div class="subtitle">or click to select a file from your computer</div>
    </div>
  </vue-dropzone>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import * as AzureStorage from "azure-storage";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 200,
        addRemoveLinks: true
      }
    };
  },
  methods: {
    getFiles() {
      return this.$refs.myDropzone.getAcceptedFiles();
    },
    afterComplete(file) {
      let blobUri = "https://" + "STORAGE_ACCOUNT" + ".blob.core.windows.net";
      let blobService = AzureStorage.Blob.createBlobServiceWithSas(
        blobUri,
        "SAS_TOKEN"
      );
      // If one file has been selected in the HTML file input element

      let customBlockSize =
        file.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512;
      blobService.singleBlobPutThresholdInBytes = customBlockSize;

      let speedSummary = blobService.createBlockBlobFromBrowserFile(
        "mycontainer",
        file.name,
        file,
        {
          blockSize: customBlockSize
        },
        function(error, result, response) {
          if (error) {
            // Upload blob failed
            console.log(error);
          } else {
            // Upload successfully
            console.log("Upload successfully");
            console.log(result);
          }
          console.log(response);
        }
      );
      console.log(speedSummary);
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
