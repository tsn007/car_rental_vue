<script setup>
  import { useCarStore } from '@/stores/cars';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter()
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

  async function handleSubmit(event) {
    event.preventDefault()
    if(!model.value || !brand.value || !year.value || !transmission.value || !fuel.value || !passengers.value || !price.value){
      error.value = true
    }else{
      error.value = false
      await carStore.saveCar(brand.value, model.value, year.value, transmission.value, fuel.value, passengers.value, price.value, image.value)
      router.push('/')
    }
  }
</script>

<template>
  <div class="is-flex is-justify-content-center">
    <form @submit="handleSubmit">
      <div class="is-flex is-flex-direction-column reserveForm">
        <label for="name">Brand</label>
        <input v-model="brand" type="text" placeholder="Brand" :class="['reserveInput', {'loginError': error}]">
        <label for="email" class="mt-4">Model</label>
        <input v-model="model" type="text" placeholder="Model" :class="['reserveInput', {'loginError': error}]">
        <label for="address" class="mt-4">Year</label>
        <input v-model="year" type="number" placeholder="Year" :class="['reserveInput', {'loginError': error}]">
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
        <input v-model="passengers" type="number" placeholder="Passengers" :class="['reserveInput', {'loginError': error}]">
        <label for="mobile" class="mt-4">Price</label>
        <input v-model="price" type="number" min="0" placeholder="Price" class="reserveInput">
        <label for="mobile" class="mt-4">Image</label>
        <input v-model="image" type="text" placeholder="Image" class="reserveInput">
        <div class="is-flex is-justify-content-center">
          <button type="submit" class="button mt-6">Add car</button>
        </div>
      </div>
    </form>
  </div>
</template>
