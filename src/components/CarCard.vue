<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-16by9">
        <img
          :src="image"
          alt="Placeholder image"
        />
      </figure>
    </div>
    <div class="card-content is-flex is-flex-direction-row is-justify-content-space-between is-align-items-end card-bg">
      <div class="is-flex is-flex-direction-column">
        <div class="media">
            <div class="media-content" style="overflow: hidden;">
              <p class="title">{{brand}} {{ model }}</p>
            </div>
        </div>
        <div class="content">
          <p class="is-size-6">{{daily_price_huf}} Ft/day</p>
        </div>
      </div>
      <div>
        <button @click="$emit('reserve')" class="carbtn">Reserve</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CarCard',
    props: {
      brand: String,
      model: String,
      daily_price_huf: Number,
      image: String
    }
  }
</script>
