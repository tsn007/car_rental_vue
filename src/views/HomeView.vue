<script setup>
  import CarCard from '../components/CarCard.vue'
  import NavBar from '../components/NavBar.vue'
  import { onMounted } from 'vue';
  import { useCarStore } from '@/stores/cars';
  import { ref } from 'vue'

  const carStore = useCarStore()
  const fromDate = ref("2025-06-01")
  const toDate = ref("2025-06-02")
  const cars = ref([])
  const dateError = ref(false)

  onMounted(async () => {
    await carStore.fetchCars()
    await carStore.fetchReservations()
    cars.value = carStore.cars
  })

  const carsInRange = (from, to) => {
    const notAvailableCarIds = carStore.reservations.filter((res) => !(res.dateTo < from || res.dateFrom > to)).map(res => res.carID)
    cars.value = carStore.cars.filter((car) => !notAvailableCarIds.includes(car.id))
  }

  const checkDates = (fromDate, toDate) => {
    if(fromDate > toDate){
      dateError.value = true
    }else{
      dateError.value = false;
      carsInRange(fromDate, toDate)
    }
  }
</script>

<template>
  <nav>
    <NavBar/>
  </nav>
  <div class="pestPic is-flex is-flex-direction-column is-justify-content-center is-align-items-center mt-6">
    <p class="has-text-centered welcome animate__animated animate__fadeInUp">Experience the freedom of driving <br> Rent your car in seconds!</p>
    <section class="section datepicker animate__animated animate__fadeInUp">
      <div class="is-flex is-flex-direction-column">
        <div class="is-flex is-justify-content-space-between">
          <input type="date" :class="['datepick', {'dateError': dateError}]" v-model="fromDate">
          <input type="date" :class="['datepick', {'dateError': dateError}]" v-model="toDate">
        </div>
        <button @click="checkDates(fromDate, toDate)" class="dateSearch"><strong class="has-text-dark">Search</strong></button>
      </div>
    </section>
  </div>
  <div class="columns is-multiline p-6">
    <div class="column is-one-third-tablet is-one-quarter-widescreen is-one-fifth-fullhd" v-for="car in cars" :key="car.id">
      <CarCard :brand="car.brand" :model="car.model" :daily_price_huf="car.daily_price_huf" :image="car.image"/>
    </div>
  </div>
</template>

