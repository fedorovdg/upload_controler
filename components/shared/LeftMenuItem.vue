<template>
  <div class="menu_item padding" :class="{'menu_item-active': isActive}" @click="click()">
    name: {{option.name}}
  </div>
</template>

<script>

export default {
  props: {
    option: Object,
    current: Object
  },
  components: {

  },
  computed: {
    isActive() {
      if(this.current.hasOwnProperty('name')){
        return this.option.name == this.current.name
      } else {
        return false
      }
    }

  },
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    click(){
      this.$emit('click', this.option)
    }

  }
}
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  flex-direction: column;
}


.menu_item{
  display: flex;
  width: auto;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
}

.menu_item-active{
  background: #DFDFDF;
}



</style>
