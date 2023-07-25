<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import Cac from '../components/CaC.vue'

import type { EventItem } from '@/type'
import '/src/assets/style.css'
import { computed, ref} from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import type { Ref } from 'vue'
import axios, { type AxiosResponse } from 'axios'
import EventService from '@/services/EventService'
import NProgress from 'nprogress'
import { useRouter } from 'vue-router'

const events = ref<EventItem[]>([])

const totalEvents = ref<number>(0)

const router = useRouter()

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: false,
    default: 8
  }
})

EventService.getEvent(props.size, props.page).then((response: AxiosResponse<EventItem[]>) => {
  events.value = response.data
})

EventService.getEvent(8,props.page).then((response: AxiosResponse<EventItem[]>) => {
  events.value = response.data
  totalEvents.value = response.headers['x-total-count']
}).catch((error) => {
  router.push({ name: 'NetworkError' })
})

onBeforeRouteUpdate((to, from, next) => {
  const topage = Number(to.query.page)
  
  EventService.getEvent(8, topage).then((response: AxiosResponse<EventItem[]>) => {
    events.value = response.data
    totalEvents.value = response.headers['x-total-count']
    next()
  }).catch(() => {
    next({ name: 'NetworkError' })
  })
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / props.size)
  return props.page.valueOf() < totalPages
})
</script>

<template>
  <h1>Event For Good</h1>

  <main class="flex flex-col items-center">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <div class="pagination flex w-72">
      <RouterLink
        :to="{ name: 'EventList', query: { page: props.page - 1, size: props.size } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
        class="flex-1 text-gray-700 no-underline text-left"
      >
        prev page
      </RouterLink>
      <RouterLink
        :to="{ name: 'EventList', query: { page: props.page + 1, size: props.size } }"
        rel="next"
        v-if="hasNextPage"
        id="page-next"
        class="flex-1 text-gray-700 no-underline text-right"
      >
        Next page
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
h1 {
  @apply text-5xl;
}
</style>

