<template>
  <div class="object">
    <div class="object_header">
      Объект: {{object.name}}
      <button
        class="btn"
        :class="{'btn__disabled': isAllUploaded != 0}"
        :disabled="isAllUploaded != 0"
        @click="deleteObject()"
      >Удалить</button>
    </div>
    <div class="object_body">
      Файлов в загрузке: {{isAllUploaded}}
      <File v-for="file in object.files_ids" :file="file"/>
      <input-file @uploadFiles="uploadFiles($event)" :key="object.name"/>
    </div>
  </div>
</template>

<script>

import InputFile from "./InputFile";
import uuidv4 from "../../helpers/uuidv4";
import File from "@/components/shared/File"

export default {
  props: {
    object: Object
  },
  components: {
    InputFile,
    File

  },
  computed: {
    isActive() {
      if(this.current.hasOwnProperty('name')){
        return this.option.name == this.current.name
      } else {
        return false
      }
    },
    isAllUploaded(){
      return this.object.files_ids.filter(item => item.isUploaded == false).length
    }

  },
  watch: {
    isAllUploaded: function (newValue, oldValue) {
      if(oldValue > 0 && newValue == 0){
        alert('КРУТО. МЫ ЗАГРУЗИЛИ ВСЕ ФАЙЛЫ В ОБЪЕКТЕ ' + this.object.name)
      }
    }
  },
  data() {
    return {
      files: []
    }
  },
  methods: {
    deleteObject(){
      this.$store.dispatch('deleteObject', this.object.name)
    },
    uploadFiles(event){
      this.files = event
      this.$store.dispatch('pushFileToPreview', {
        files: event.map(file => {
          return {
            ids: [uuidv4()],
            binary: file,
            isUploaded: false
          }
        }),
        object_name: this.object.name
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  flex-direction: column;
}

.object{
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
}

.object_header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.object_body{
  display: flex;
  width: fit-content;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
  height: auto;
}


.menu_item{
  display: flex;
  background: red;
}



.menu_item-active{
  background: #4AAE9B;
}


.btn{
  display: flex;
  outline: none;
  background: #1017e7;
  border: 0px;
  border-radius: 4px;
  padding: 12px 18px;
  color: white;
  cursor: pointer;
}

.btn:hover{
  background: #050a98;
}

.btn__disabled{
  background: #4f81dc;
  cursor: default;
}

.btn__disabled:hover{
  background: #5c90ef;
}



</style>
