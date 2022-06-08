<template>
  <div class="uploader" @dragover.prevent @drop.prevent>
    <div class="container" @dragleave="fileDragOut" @dragover="fileDragIn" @drop="handleFileDrop">
      <div class="top-col">
        <!-- <inline-svg
          :src="getIconPath('file.svg')"
        /> -->
      </div>
      <div class="middle-col">
        Перетащите файлы сюда или
        <br>
        <div class="file-wrapper">
          <input type="file" name="file-input" multiple="True" @change="handleFileInput" > выберите файлы
        </div>
        на компьютере
      </div>
    </div>
    <!-- <ul v-for="(file, index) in files" :key="file.name">
      <li>
        {{file.name}} ({{(file.size/1000).toFixed()}} кБ)
        <button @click="removeFile(index)" title="Remove">
        </button>
      </li>
    </ul> -->
  </div>
</template>

<script>
import uuidv4 from "../../helpers/uuidv4";

export default {
  name: 'inputFile',
  components: {
  },
  data () {
    return {
      files: [],
      color: '#444444',
      isFileExist: 0
    }
  },
  methods: {
    getIconPath (iconName) {
      return iconName ? require('@/assets/icons/' + iconName) : ''
    },
    handleFileDrop (e) {
      const droppedFiles = e.dataTransfer.files
      if (!droppedFiles) return;
      ([...droppedFiles]).forEach(f => {
        this.files.push({
          file: f
        })
        //this.$emit('pushFile', f)
      })
      this.$emit('uploadFiles', this.files)
      this.files = []
      this.color = '#444444'
    },
    handleFileInput (e) {
      let files = e.target.files
      files = e.target.files
      if (!files) return;
      ([...files]).forEach(f => {
        this.files.push({
          file: f
        })
        //this.$emit('pushFile', f)
      })
      this.$emit('uploadFiles', this.files)
      this.files = []
    },
    removeFile (fileKey) {
      this.files.splice(fileKey, 1)
      this.isFileExist = 0
    },
    fileDragIn () {
      this.color = 'white'
    },
    fileDragOut () {
      this.color = '#444444'
    }
  }
}
</script>

<style lang="scss" scoped>
.uploader{
  display: flex;
  flex-direction: column;
  width: 418px;
}
li{
  text-decoration: none;
  list-style-type: none;
  line-height: 24px;
  display: flex;
}
.container {
  border: 1px dashed #C6C8C9;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 24px;
  padding-bottom: 24px;
  min-height: 150px;
  border-radius: 5px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.middle-col{
  display: block;
  text-align: center;
  margin-bottom: 12px;
}
.top-col{
  display: block;
  text-align: center;
  margin-bottom: 12px;
}
.file-wrapper {
  text-align: center;
  display: inline;
  position: relative;
  overflow: hidden;
  text-decoration: underline;
  cursor: pointer;
}
.file-wrapper input {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  opacity: 0.0;
  filter: alpha(opacity=0);
  font-size: 300px;
  height: 30px;
  width: 200px;
}
button{
  background: none;
  border-width: 0px;
  cursor: pointer;
}
button:focus {
  outline: none;
}
</style>
