<script setup>
  import { onMounted, ref } from 'vue';
  import NavBar from '@/components/NavBar.vue';
  import { useCarStore } from '@/stores/cars';
  import AllReservations from '@/components/AllReservations.vue';
  import AddCar from '@/components/AddCar.vue';
import ModCar from '@/components/ModCar.vue';

  const admin = ref(null)
  const carStore = useCarStore()
  const isReservations = ref(false)
  const isAddCar = ref(false)
  const isModifyCar = ref(false)

  onMounted(() => {
    admin.value = localStorage.getItem('admin')
    if (admin.value) {
      carStore.fetchReservations()
      carStore.fetchCars()
    }
  });

  function handleResClick() {
    isReservations.value = true;
    isAddCar.value = false;
    isModifyCar.value = false;
  }

  function handleAddClick() {
    isReservations.value = false;
    isAddCar.value = true;
    isModifyCar.value = false;
  }

  function handleModClick() {
    isReservations.value = false;
    isAddCar.value = false;
    isModifyCar.value = true;
  }
</script>

<template>
  <div v-if="!admin" class="is-flex is-justify-content-center is-align-items-center" style="height: 100vh;">
    Not authorized!
  </div>
  <div v-else class="reservations">
    <NavBar/>
    <h1 class="is-flex is-justify-content-center is-size-2 restitle">Admin Dashboard</h1>
    <div class="is-flex is-justify-content-center adminbuttons">
      <button @click="handleResClick" class="button">Reservations</button>
      <button @click="handleAddClick" class="button">Add car</button>
      <button @click="handleModClick" class="button">Modify Car</button>
    </div>
    <div v-if="isReservations">
      <AllReservations/>
    </div>
    <div v-else-if="isAddCar">
      <AddCar />
    </div>
    <div v-else-if="isModifyCar">
      <ModCar />
    </div>
  </div>
</template>
