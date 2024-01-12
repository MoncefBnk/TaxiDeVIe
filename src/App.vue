<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const user = ref(null);

    onBeforeMount(async () => {
      await store.dispatch('fetchUser');
      user.value = store.state.user;
    });

    store.watch(
      () => store.state.user,
      (newUser) => {
        user.value = newUser;
      }
    );

    return { user };
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
