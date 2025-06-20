import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCarStore = defineStore('cars', () => {
  const cars = ref([]);
  const reservations = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchCars(){
    loading.value = true
    error.value = null

    try{
      const res = await fetch('http://127.0.0.1:8000/cars');
      if (!res.ok) throw new Error('Failed to load data');
      const result = await res.json()
      cars.value = result.cars
      //console.log('Fetched cars:', cars.value)
    }catch(err){
      error.value = err;
    }finally{
      loading.value = false;
    }
  }

  async function fetchReservations(){
    loading.value = true
    error.value = null
    try{
      const res = await fetch('http://localhost:8000/reservations');
      if(!res.ok) throw new Error('Failed to load data');
      const result = await res.json()
      reservations.value = result.reservations
    }catch(err){
      error.value = err;
    }finally{
      loading.value = false;
    }
  }

  return {cars, fetchCars, loading, error, fetchReservations, reservations}
})
