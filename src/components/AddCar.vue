<template>
  <div class="is-flex is-justify-content-center">
    <form>
      <div class="is-flex is-flex-direction-column reserveForm">
        <label for="name">Brand</label>
        <input type="text" placeholder="Brand" class="reserveInput">
        <label for="email" class="mt-4">Model</label>
        <input type="text" placeholder="Model" class="reserveInput">
        <label for="address" class="mt-4">Year</label>
        <input type="text" placeholder="Year" class="reserveInput">
        <label for="mobile" class="mt-4">Transmission</label>
        <input type="text" placeholder="Transmission" class="reserveInput">
        <label for="days" class="mt-4">Fuel type</label>
        <input type="text" placeholder="Fuel" class="reserveInput has-text-white">
        <label for="mobile" class="mt-4">Passengers</label>
        <input type="text" placeholder="Passengers" class="reserveInput">
        <label for="mobile" class="mt-4">Price</label>
        <input type="text" placeholder="Price" class="reserveInput">
        <label for="mobile" class="mt-4">Image</label>
        <input type="text" placeholder="Image" class="reserveInput">
        <button type="submit" class="button mt-6">Add car</button>
      </div>
    </form>
  </div>
</template>
