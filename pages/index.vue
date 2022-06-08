<template>
<div class="container">
  <button
    @click="showModal"
  >
    Добавить группу
  </button>
  <Modal
    v-show="isModalVisible"
    @close="closeModal"
    >
    <template v-slot:header>
      Загрузка файлов в объект
    </template>
    <template v-slot:body>
      <div class="container-menu">
        <div class="column">
          <button
            class="btn"
            :class="{'btn__disabled': pendingPush}"
            style="margin-bottom: 12px; margin-top: 24px"
            @click="addObject()"
            :disabled="pendingPush"
          >Добавить объект</button>
          <LeftMenu
            :options="objects"
            @SetCurrentItem="SetCurrentItem($event)"
          />
        </div>
        <div class="object-container">
          <div class="object-viewport" v-if="currentObject">
            <Object v-for="object in objects"
                    v-show="object.name == currentObject.name"
                    :object="object"
                    :key="object.name"
            />
          </div>
        </div>
      </div>
    </template>
  </Modal>
</div>
</template>

<script>

import {queueRequest} from "../components/article/helpers/Queue";
import {Request} from "../api/server";
import Modal from "@/components/shared/Modal"
import LeftMenu from "@/components/shared/LeftMenu"
import Object from "@/components/shared/Object"

export default {
  components: {
    Modal,
    LeftMenu,
    Object
  },
  computed: {
    objects() {
      return this.$store.getters.objects
    },
    pendingPush() {
      return this.$store.getters.pendingPush
    }
  },
  data() {
    return {
      queue: {},
      isModalVisible: false,
      currentObject: null
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    addObject(){
      this.$store.dispatch('pushObject')
    },
    SetCurrentItem(event){
      this.currentObject = event
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.column{
  display: flex;
  flex-direction: column;
  width: 300px;
}

.container-menu{
  display: flex;
  width: fit-content;
  height: 500px;
  margin-left: 24px;
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


.object-container{
  width: 500px;
  height: 500px;
  overflow-y: scroll;
}



</style>
