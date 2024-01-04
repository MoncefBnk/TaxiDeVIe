<template>
  <div class="home-container">
    <HomeCompo />
    <FAQCompo />
  </div>
</template>

<script>
import HomeCompo from '@/components/Home/HomeCompo.vue';
import FAQCompo from '@/components/Home/FAQCompo.vue';

export default {
  components: {
    HomeCompo,
    FAQCompo,
  },
};
</script>

<style scoped>
</style>
