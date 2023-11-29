<template>
  <header>
    <!-- Content specific to your header, excluding the navigation bar -->
  </header>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const user = ref(null);

    // Fetch user after component is mounted
    onMounted(async () => {
      await store.dispatch('fetchUser');
      user.value = store.state.user;
    });

    // Define the logout method
    const logout = async () => {
      await store.dispatch('logout');
      user.value = null;
    };

    return {
      user,
      logout,
    };
  },
};
</script>

<style scoped>
header {
  background-color: #ffffff;
  padding: 1rem;
}

/* Additional styling specific to your header can be added here */
</style> 