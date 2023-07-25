<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from './stores/message';
import { storeToRefs } from 'pinia';
import './assets/style.css';
const store = useMessageStore();
const { message } = storeToRefs(store);
</script>

<template>
  <header class="max-h-screen leading-normal">
    <div id="flashMessage" v-if="message" class="animate-yellowfade">
      <h4>{{ message }}</h4>
    </div>
    <nav class="p-8">
      <RouterLink :to="{ name: 'EventList' }" class="font-bold text-gray-700 hover:text-green-600">Home</RouterLink> | 
      <RouterLink :to="{ name: 'about' }" class="font-bold text-gray-700 hover:text-green-600">About</RouterLink> |
      <RouterLink :to="{ name: 'Menu' }" class="font-bold text-gray-700 hover:text-green-600">Menu</RouterLink> |
      <RouterLink :to="{ name: 'Student' }" class="font-bold text-gray-700 hover:text-green-600">Student</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
#app {
  @apply font-sans text-center text-gray-700;
}

.logo {
  @apply block mx-auto mb-8;
}

.page-sizes {
  @apply flex gap-4;
}

.page-sizes a {
  @apply mx-4;
}

@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation: yellowfade 3s ease-in-out;
}
</style>
