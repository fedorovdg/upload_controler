<template>
  <div class="menu">
    <left-menu-item
      v-for="(option, index) in options"
      :key="`option-${index}`"
      :option="option"
      :current="currentItem"
      @delete="deleteItem()"
      @click="setCurrentItem($event)"
    />
  </div>
</template>

<script>

import LeftMenuItem from "./LeftMenuItem";
export default {
  name: 'LeftMenu',
  props: {
    options: Array
  },
  components: {
    LeftMenuItem

  },
  computed: {

  },
  data() {
    return {
      currentItem: {}
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    setCurrentItem(event){
      this.currentItem = event
      this.$emit('SetCurrentItem', this.currentItem)
    }

  }
}
</script>

<style lang="scss" scoped>
.menu{
  display: flex;
  flex-direction: column;
  width: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
}




</style>
