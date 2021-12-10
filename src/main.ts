import { createApp, ref } from 'vue'
import App from './App.vue'
import { type TemplateState } from '../template'

let state: TemplateState = {
  numCircles: 25,
  theme: 'light',
}

let stateRef = ref({ ...state })

let template = {
  data: {},

  state,

  update() {
    stateRef.value = { ...state }
  },

  draw() {
    createApp(App, { state: stateRef }).mount('#app')
  }
}

window.template = template
