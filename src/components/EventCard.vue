<template>
  <RouterLink class="text-gray-700 no-underline" :to="{name: 'event-detail', params:{id: event?.id}}">
    <div class="my-2">
      <div class="p-5 w-64 cursor-pointer border border-gray-700 transform hover:scale-105 hover:shadow-lg">
        <span>@{{ event?.time }} on {{ event?.date }}</span>
        <h4>{{ event?.title }}</h4>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { EventItem } from '@/type'
import type { PropType } from 'vue'
import '/src/assets/style.css'
const props = defineProps({
  event: {
    type: Object as PropType<EventItem>,
    required: true
  }
})
</script>

<style scoped>
h4 {
  @apply text-xl;
}
</style>
