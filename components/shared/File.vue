<template>
  <div class="file">
    <div class="file_header">
      {{file.ids[0]}}
      <inline-svg
        v-if="!file.isUploaded"
        class="reset-icon"
        :src="getIconPath('reset.svg')"
        height="25px"
      />
      <inline-svg
        v-if="file.isUploaded"
        :src="getIconPath('check_green.svg')"
        height="25px"
      />
    </div>
    <div class="file_body" v-if="file.isUploaded && add_files.length > 1">
      <span>Доп. представления:</span>
      <div class="" v-for="file_ in add_files" :key="file_">
        {{file_}}
      </div>
    </div>
  </div>
</template>

<script>

import InlineSvg from "vue-inline-svg";

export default {
  props: {
    file: Object
  },
  components: {
    InlineSvg
  },
  computed: {
    add_files() {
      return this.file.ids.filter((item, index) => index != 0)
    }
  },
  data() {
    return {

    }
  },
  methods: {
    getIconPath (iconName) {
      return iconName ? require('@/assets/icons/' + iconName) : ''
    }
  }
}
</script>

<style lang="scss" scoped>

.file{
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 8px;
  padding: 12px 24px;
  background: #F8F8F8;
  box-sizing: border-box;
  margin-bottom: 8px;
}

.file_header{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.reset-icon{
  animation-name: rotation;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes rotation {
  0% {
    transform:rotate(0deg);
  }
  100% {
    transform:rotate(-360deg);
  }
}

</style>
