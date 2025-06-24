<script setup>
  import CarCard from '../components/CarCard.vue'
  import NavBar from '../components/NavBar.vue'
  import { onMounted } from 'vue';
  import { useCarStore } from '@/stores/cars';
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const carStore = useCarStore()
  const cars = ref([])
  const dateError = ref(false)

  onMounted(async () => {
    await carStore.fetchCars()
    await carStore.fetchReservations()
    carsInRange(carStore.fromDate, carStore.toDate)
  })

  const carsInRange = (from, to) => {
    const fromDateObj = new Date(from)
    const toDateObj = new Date(to)

    const notAvailableCarIds = carStore.reservations
      .filter((res) => {
        const resFrom = new Date(res.dateFrom)
        const resTo = new Date(res.dateTo)
        return !(resTo < fromDateObj || resFrom > toDateObj)
      })
      .map(res => Number(res.carID))

    cars.value = carStore.cars.filter(car => !notAvailableCarIds.includes(Number(car.id)))
  }

  const checkDates = (fromDate, toDate) => {
    if(fromDate > toDate){
      dateError.value = true
    }else{
      dateError.value = false;
      carsInRange(fromDate, toDate)
    }
  }

  function goToReserve(car) {
    carStore.selectCar(car)
    localStorage.setItem('car', JSON.stringify(car))
    router.push('/reserve')
  }

  function scrollToCarList() {
    const el = document.getElementById('carlist')
    if (el && !dateError.value) {
      el.scrollIntoView({ behavior: 'smooth' })
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
          <input type="date" :class="['datepick', {'dateError': dateError}]" v-model="carStore.fromDate">
          <input type="date" :class="['datepick', {'dateError': dateError}]" v-model="carStore.toDate">
        </div>
        <button @click="checkDates(carStore.fromDate, carStore.toDate); scrollToCarList()" class="dateSearch"><strong class="has-text-dark">Search</strong></button>
      </div>
    </section>
  </div>
  <div class="columns is-multiline p-6">
    <div id="carlist" class="column is-one-third-tablet is-one-quarter-widescreen is-one-fifth-fullhd" v-for="car in cars" :key="car.id">
      <CarCard :brand="car.brand" :model="car.model" :daily_price_huf="car.daily_price_huf" :image="car.image" @reserve="goToReserve(car)"/>
    </div>
  </div>
</template>

