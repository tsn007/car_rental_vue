<script setup>
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const admin = ref(null)
  const router = useRouter();

  onMounted(() => {
    admin.value = localStorage.getItem('admin');
  });

  function logout(){
    localStorage.removeItem('admin');
    admin.value = null;
    router.push('/');
  }
</script>

<template>
  <nav class="navbar is-fixed-top p-4 is-flex is-justify-content-space-between is-align-items-center is-flex-direction-row is-flex-wrap-nowrap">
    <a href="/" class="is-size-4-tablet navtitle">Car Rental</a>
    <div class="is-flex is-align-items-center">
      <a v-if="!admin" href="/login" class="is-size-5-tablet user">User</a>
      <div v-else class="adminNavDiv">
        <a href="/admin" class="is-size-5-tablet user">Admin Dashboard</a>
        <a @click="logout" class="is-size-5-tablet user">Log out</a>
      </div>
    </div>
  </nav>
</template>
