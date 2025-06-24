  import { ref } from 'vue'
  import { defineStore } from 'pinia'

  export const useCarStore = defineStore('cars', () => {
    const cars = ref([]);
    const reservations = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const selectedCar = ref(null)
    const date = new Date()
    let day = String(date.getDate()).padStart(2, '0')
    let toDay = date.getDate() + 2
    let month = String(date.getMonth() + 1).padStart(2, '0')
    let year = date.getFullYear()
    const fromDate = ref(`${year}-${month}-${day}`)
    const toDate = ref(`${year}-${month}-${toDay}`)

    async function fetchCars(){
      loading.value = true
      error.value = null

      try{
        const res = await fetch('http://127.0.0.1:3000/cars');
        if (!res.ok) throw new Error('Failed to load data');
        cars.value = await res.json()
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
        const res = await fetch('http://localhost:3000/reservations');
        if(!res.ok) throw new Error('Failed to load data');
        reservations.value = await res.json()
        console.log('Reservations:', reservations.value)
      }catch(err){
        error.value = err;
      }finally{
        loading.value = false;
      }
    }

    async function saveReservation(name, email, address, phone) {
      const response = await fetch('http://localhost:3000/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: String(reservations.value.length + 1),
          name,
          email,
          address,
          mobile: phone,
          dateFrom: fromDate.value,
          dateTo: toDate.value,
          carID: selectedCar.value.id
        })
      })

      if (response.ok) {
        console.log('Reservation saved!')
        await fetchReservations()
      } else {
        console.error('Error submitting reservation')
      }
    }


    function selectCar(car) {
      selectedCar.value = car
    }

    async function saveCar(brand, model, year, transmission, fuel_type, passengers, price, image){
      const response = await fetch('http://localhost:3000/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: String(cars.value.length + 1),
          brand,
          model,
          year,
          transmission,
          fuel_type,
          passengers,
          daily_price_huf: price,
          image
        })
      })

      if (response.ok) {
        console.log('Car added!')
        await fetchReservations()
      } else {
        console.error('Error while adding car!')
      }
    }

    async function updateCar(id, brand, model, year, transmission, fuel_type, passengers, price, image){
      const response = await fetch(`http://localhost:3000/cars/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          brand,
          model,
          year,
          transmission,
          fuel_type,
          passengers,
          daily_price_huf: price,
          image
        })
      })

      if (response.ok) {
        console.log('Car updated!')
        await fetchReservations()
      } else {
        console.error('Error while updating car!')
      }
    }

    return {cars, fetchCars, loading, error, fetchReservations, reservations, selectCar, selectedCar, fromDate, toDate, saveReservation, saveCar, updateCar}
  })

  export const useProfileStore = defineStore('admin', () => {
    const loading = ref(false);
    const error = ref(null);
    const admin = ref(null)

    async function fetchAdmin(){
      loading.value = true
      error.value = null
      try{
        const res = await fetch('http://127.0.0.1:3000/admin');
        if (!res.ok) throw new Error('Failed to load data');
        admin.value = await res.json()
      }catch(err){
        error.value = err;
      }finally{
        loading.value = false;
      }
    }

    return {fetchAdmin, admin, error, loading}
  })
