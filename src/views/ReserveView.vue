<script setup>
  import NavBar from '@/components/NavBar.vue';
  import { useCarStore } from '@/stores/cars'
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter()
  const carStore = useCarStore()
  const car = carStore.selectedCar || JSON.parse(localStorage.getItem('car'))

  const from = new Date(carStore.fromDate)
  const to = new Date(carStore.toDate)
  const diffTime = Math.abs(to-from)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  const name = ref('')
  const email = ref('')
  const address = ref('')
  const phone = ref('')
  const error = ref(false)

  async function handleSubmit(event) {
    event.preventDefault()
    if(!name.value || !email.value || !address.value || !phone.value){
      error.value = true
    }else{
      error.value = false
      await carStore.saveReservation(name.value, email.value, address.value, phone.value)
      localStorage.removeItem('car')
      router.push('/')
    }
  }
</script>

<template>
  <NavBar />
  <div class="is-flex is-flex-direction-column is-align-items-center mainDivReserve">
    <div class="is-flex is-flex-direction-column is-align-items-center is-justify-content-center is-relative">
      <img :src="car.image" alt="Car image" class="image is-16by9 carImage">
      <div class="pricetag">{{ car.daily_price_huf.toLocaleString('hu-HU') }} Ft<span class="per-day">/day</span></div>
    </div>
    <h2>{{car.brand}} {{ car.model }}</h2>
    <div class="is-flex details">
      <div class="is-flex is-flex-direction-column detailDiv">
        <p class="detailtext">Year of manufacturing: {{ car.year }}</p>
        <p class="detailtext">Passengers: {{ car.passengers }}</p>
      </div>
      <div class="is-flex is-flex-direction-column detailDiv">
        <p class="detailtext">Transmission: {{ car.transmission }}</p>
        <p class="detailtext">Fuel type: {{ car.fuel_type }}</p>
      </div>
    </div>
    <hr class="line">
    <form @submit="handleSubmit">
      <div class="is-flex is-flex-direction-column reserveForm">
        <label for="name">Name</label>
        <input type="text" placeholder="Name" :class="['reserveInput', {'loginError': error}]" v-model="name">
        <label for="email" class="mt-4">Email</label>
        <input type="text" placeholder="Email" :class="['reserveInput', {'loginError': error}]" v-model="email">
        <label for="address" class="mt-4">Address</label>
        <input type="text" placeholder="Address" :class="['reserveInput', {'loginError': error}]" v-model="address">
        <label for="mobile" class="mt-4">Phone Number</label>
        <input type="text" placeholder="Phone" :class="['reserveInput', {'loginError': error}]" v-model="phone">
        <label for="days" class="mt-4">Reserved days</label>
        <input type="number" class="reserveInput has-text-white" disabled :value="diffDays">
        <hr>
        <div class="is-flex is-justify-content-space-between">
          <p class="has-text-white">Total:</p>
          <p class="has-text-white">{{ (diffDays * car.daily_price_huf).toLocaleString('hu-HU') }} Ft</p>
        </div>
        <hr>
        <div class="is-flex is-justify-content-center">
          <button type="submit" class="button mt-2">Confirm reservation</button>
        </div>
      </div>
    </form>
  </div>
</template>
