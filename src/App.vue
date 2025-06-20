<script setup>
  import HomeView from './views/HomeView.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <router-view />
    </div>
  </header>
</template>

<script>
  export default {
    name: 'App'
  }
</script>
