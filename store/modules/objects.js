//Вся логика приложения хранится в store, vue-компоненты отвечают только за: отображение, сбор событий.

import {postObject, postFileToObject} from "../../api/server"; //Имитация сервера
//import {queueRequest} from "../../components/article/helpers/save2"; //Класс отвечающий за очереди
import {queueRequest} from "@/helpers/Queue"

export default {
  state: {
    objects: [

    ],
    findTable: {}, //Ассоциативный массив ключ - object.name, значение - index (Линеаризация поиска объекта в store).
    pendingPush: false
  },
  mutations: {
    pushObject(state, object){
      state.objects.push(object)
      state.pendingPush = false
    },
    pendingPush(state, value){
      state.pendingPush = value
    },
    pushFileToObject(state, payload){
      let file = state.objects.find(obj => obj.name == payload.object_name).files_ids.find(item => item.ids[0] == payload.id)
      console.log(file)
      file.ids = payload.ids
      file.isUploaded = true
    },
    pushFileToPreview(state, payload){
      let obj = state.objects.find(obj => obj.name == payload.object_name)
      payload.files.forEach(file => {
        obj.files_ids.push(file)
      })
    },
    deleteObject(state, payload){
      state.objects = state.objects.filter(obj => obj.name != payload)
    }
  },
  getters: {
    objects(state){
      return state.objects
    },
    pendingPush(state){
      return state.pendingPush
    }
  },
  actions: {
    pushObject(ctx){
      ctx.commit('pendingPush', true)
      postObject().then(response => {
        ctx.commit('pushObject', response)
      })
    },
    pushFileToObject(ctx, payload){
      console.log(payload)
      let queue = new queueRequest() //Не стоит переживать - это singleTone класс.
      /*queue.push(
        new Promise((resolve,reject)=> {

        })
      )*/
      let func = function () {
        return new Promise((resolve, reject) => {
          postFileToObject(payload.file, payload.object_name).then(response => {
            console.log(response)
            ctx.commit('pushFileToObject', {id: response.ids[0], object_name: payload.object_name, ids: response.ids})
            resolve('200')
          }).catch(onerror => {
            reject(onerror)
          })
        })
      }
      queue.push(func)
    },
    pushFileToPreview(ctx, payload) {
      console.log(payload)
      ctx.commit('pushFileToPreview', payload)
      payload.files.forEach(file => {
        console.log('dispFile', file)
        this.dispatch('pushFileToObject', {file: file, object_name: payload.object_name})
      })
    },
    deleteObject(ctx, payload){
      ctx.commit('deleteObject', payload)
    }
  }
}
