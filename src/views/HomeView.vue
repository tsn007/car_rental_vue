<script setup>
  import CarCard from '../components/CarCard.vue'
  import NavBar from '../components/NavBar.vue'
  import { onMounted } from 'vue';
  import { useCarStore } from '@/stores/cars';

  const carStore = useCarStore()

  onMounted(() => {
    carStore.fetchCars()
  })
</script>

<template>
  <nav>
    <NavBar/>
  </nav>
  <div class="pestPic is-flex is-flex-direction-column is-justify-content-center is-align-items-center mt-6">
    <p class="has-text-centered welcome animate__animated animate__fadeInUp">Experience the freedom of driving <br> Rent your car in seconds!</p>
    <section class="section datepicker">
      <h1>hallo</h1>
    </section>
  </div>
  <div class="columns is-multiline p-6">
    <div class="column is-one-third-tablet is-one-quarter-widescreen is-one-fifth-fullhd" v-for="car in carStore.cars" :key="car.id">
      <CarCard :brand="car.brand" :model="car.model" :daily_price_huf="car.daily_price_huf" :image="car.image"/>
    </div>
  </div>
</template>

