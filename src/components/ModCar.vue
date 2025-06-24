<script setup>
  import { useCarStore } from '@/stores/cars';
  import { ref } from 'vue';
  import { watch } from 'vue'

  const carStore = useCarStore()
  const model = ref('');
  const brand = ref('');
  const year = ref('');
  const transmission = ref('Manual');
  const fuel = ref('Petrol');
  const passengers = ref('');
  const price = ref(0);
  const image = ref('');
  const error = ref(false);
  const selectedCarId = ref('');

  watch(selectedCarId, (newId) => {
    const selectedCar = carStore.cars.find(car => car.id === newId);
    if (selectedCar) {
      model.value = selectedCar.model;
      brand.value = selectedCar.brand;
      year.value = selectedCar.year;
      transmission.value = selectedCar.transmission;
      fuel.value = selectedCar.fuel_type;
      passengers.value = selectedCar.passengers;
      price.value = selectedCar.daily_price_huf;
      image.value = selectedCar.image;
    }
  });

  async function handleSubmit(event) {
    event.preventDefault()
    if(!model.value || !brand.value || !year.value || !transmission.value || !fuel.value || !passengers.value || !price.value){
      error.value = true
    }else{
      error.value = false
      await carStore.updateCar(Number(selectedCarId.value), brand.value, model.value, year.value, transmission.value, fuel.value, passengers.value, price.value, image.value)
    }
  }
</script>

<template>
  <div class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
    <div class="mb-5">
      <select v-model="selectedCarId" name="carid" id="carid" class="reserveInput">
        <option value="" disabled selected>Select a car</option>
        <option v-for="car in carStore.cars" :key="car.id" :value="car.id">
          {{ car.id }} -- {{ car.brand }} {{ car.model }}
        </option>
      </select>
    </div>
    <form v-if="selectedCarId" @submit="handleSubmit">
      <div class="is-flex is-flex-direction-column reserveForm">
        <label for="name">Brand</label>
        <input v-model="brand" type="text" placeholder="Brand" class="reserveInput">
        <label for="email" class="mt-4">Model</label>
        <input v-model="model" type="text" placeholder="Model" class="reserveInput">
        <label for="address" class="mt-4">Year</label>
        <input v-model="year" type="number" placeholder="Year" class="reserveInput">
        <label for="mobile" class="mt-4">Transmission</label>
        <select v-model="transmission" name="transmission" id="transmission" class="reserveInput">
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>
        <label for="days" class="mt-4">Fuel type</label>
        <select v-model="fuel" name="fuel" id="fuel" class="reserveInput">
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
        </select>
        <label for="mobile" class="mt-4">Passengers</label>
        <input v-model="passengers" type="number" placeholder="Passengers" class="reserveInput">
        <label for="mobile" class="mt-4">Price</label>
        <input v-model="price" type="number" min="0" placeholder="Price" class="reserveInput">
        <label for="mobile" class="mt-4">Image</label>
        <input v-model="image" type="text" placeholder="Image" class="reserveInput">
        <button type="submit" class="button mt-6">Update car</button>
      </div>
    </form>
  </div>
</template>
