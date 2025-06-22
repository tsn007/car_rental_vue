<script setup>
  import NavBar from '@/components/NavBar.vue';
  import { useCarStore } from '@/stores/cars'

  const carStore = useCarStore()
  const car = carStore.selectedCar || JSON.parse(localStorage.getItem('car'))

  const from = new Date(carStore.fromDate)
  const to = new Date(carStore.toDate)
  const diffTime = Math.abs(to-from)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
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
      <div class="is-flex is-flex-direction-column" style="width: 50%;">
        <p class="detailtext">Year of manufacturing: {{ car.year }}</p>
        <p class="detailtext">Passengers: {{ car.passengers }}</p>
      </div>
      <div class="is-flex is-flex-direction-column" style="width: 50%;">
        <p class="detailtext">Transmission: {{ car.transmission }}</p>
        <p class="detailtext">Fuel type: {{ car.fuel_type }}</p>
      </div>
    </div>
    <hr class="line">
    <form>
      <div class="is-flex is-flex-direction-column reserveForm">
        <label for="name">Name</label>
        <input type="text" placeholder="Name" class="reserveInput">
        <label for="email" class="mt-4">Email</label>
        <input type="text" placeholder="Email" class="reserveInput">
        <label for="address" class="mt-4">Address</label>
        <input type="text" placeholder="Address" class="reserveInput">
        <label for="mobile" class="mt-4">Phone Number</label>
        <input type="text" placeholder="Phone" class="reserveInput">
        <label for="days" class="mt-4">Reserved days</label>
        <input type="number" class="reserveInput has-text-white" disabled :value="diffDays">
        <hr>
        <div class="is-flex is-justify-content-space-between">
          <p class="has-text-white">Total:</p>
          <p class="has-text-white">{{ (diffDays * car.daily_price_huf).toLocaleString('hu-HU') }} Ft</p>
        </div>
        <hr>
        <button class="button mt-2">Confirm reservation</button>
      </div>
    </form>
  </div>
</template>
