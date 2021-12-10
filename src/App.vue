<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { type TemplateState } from '../template'

const props = defineProps<{ state: TemplateState }>()

const { state } = toRefs(props)


interface Circle {
  cx: string
  cy: string
  r: number
  fill: string
}

let circles = ref<Circle[]>([])


times(state.value.numCircles, num => {
  setTimeout(addCircle, num * 50)
})


watch(
  () => state.value.numCircles,

  () => {
    const newCount = state.value.numCircles
    if (newCount > circles.value.length) {
      times(newCount - circles.value.length, (num) => {
        setTimeout(addCircle, num * 50)
      })
    } else {
      times(circles.value.length - newCount, (num) => {
        setTimeout(() => circles.value.pop(), num * 50)
      })
    }
  }
)

function addCircle() {
  circles.value.push({
    cx: Math.floor(10 + Math.random() * 85) + '%',
    cy: Math.floor(10 + Math.random() * 75) + '%',
    r: Math.floor(Math.random() * 100),
    fill: `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`
  })
}

function times(num: number, func: (n: number) => void) {
  return Array.from({ length: num }, (_, i) => func(i))
}
</script>

<template>
  <main :class="{
    light: state.theme === 'light',
    dark: state.theme === 'dark',
  }">
    <svg width="100%" height="100%">
      <g>
        <circle
          v-for="(circle, index) in circles"
          :key="index"
          v-bind="circle"
          :data-index="index"
        />
      </g>
    </svg>
  </main>
</template>

<style>
html,
body,
main {
  height: 100%;
}

main.light {
  background-color: lightyellow;
}

main.dark {
  background-color: darkblue;
}

svg {
  display: block;
}

svg > g {
  transform-origin: 400px 400px;
}
</style>
