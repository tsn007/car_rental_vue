<script setup>
  import { useCarStore } from '@/stores/cars';
  import { ref } from 'vue';

  const opened = ref([]);
  const carStore = useCarStore()

  function toggle(id) {
    if (opened.value.includes(id)) {
      opened.value = opened.value.filter(x => x !== id);
    } else {
      opened.value.push(id);
    }
  }
</script>

<template>
  <div v-for="res in carStore.reservations" :key="res.id">
    <div class="box">
      <div class="is-flex is-justify-content-space-between is-align-items-center">
        <strong>Reservation: #{{ res.id }}</strong>
        <button class="button is-small" @click="toggle(res.id)">
          {{ opened.includes(res.id) ? 'Close' : 'Open' }}
        </button>
      </div>

      <transition name="slide">
        <div v-show="opened.includes(res.id)" class="mt-3">
          <p><strong>Car:</strong> {{ carStore.cars.find(car => Number(car.id) === Number(res.carID))?.brand }} {{ carStore.cars.find(car => Number(car.id) === Number(res.carID))?.model }}</p>
          <p><strong>Name:</strong> {{ res.name }}</p>
          <p><strong>Email:</strong> {{ res.email }}</p>
          <p><strong>Address:</strong> {{ res.address }}</p>
          <p><strong>Mobile:</strong> {{ res.mobile }}</p>
          <p><strong>Date:</strong> {{ res.dateFrom }} → {{ res.dateTo }}</p>
          <p><strong>Car ID:</strong> {{ res.carID }}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
  .slide-enter-active, .slide-leave-active {
    transition: max-height 0.3s ease, opacity 0.3s ease;
    overflow: hidden;
  }
  .slide-enter-from, .slide-leave-to {
    max-height: 0;
    opacity: 0;
  }
  .slide-enter-to, .slide-leave-from {
    max-height: 500px;
    opacity: 1;
  }
</style>
