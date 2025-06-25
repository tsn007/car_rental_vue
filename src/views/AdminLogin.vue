<script setup>
  import NavBar from '@/components/NavBar.vue';
  import { useProfileStore } from '@/stores/cars';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const email = ref('');
  const password = ref('');
  const error = ref(false);
  const profileStore = useProfileStore();
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault()
    await profileStore.fetchAdmin();
    if(profileStore.admin.email === email.value && profileStore.admin.password === password.value){
      error.value = false;
      localStorage.setItem('admin', 'true')
      router.push('/')
    }else{
      error.value = true;
    }
  }
</script>

<template>
  <NavBar />
  <div class="loginMainDiv">
    <form @submit="handleSubmit">
        <div class="is-flex is-flex-direction-column reserveForm">
          <h1 class="has-text-centered is-size-2">Admin login</h1>
          <label for="email" class="mt-4">Email</label>
          <input type="text" :class="['reserveInput', {'loginError': error}]" placeholder="Email" v-model="email">
          <label for="email" class="mt-4">Password</label>
          <input type="password" placeholder="Password" :class="['reserveInput', {'loginError': error}]" v-model="password">
          <div class="is-flex is-justify-content-center">
            <button type="submit" class="button mt-5">Log in</button>
          </div>
        </div>
      </form>
  </div>
</template>
