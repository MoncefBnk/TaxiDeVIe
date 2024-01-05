<template>
  <div class="home-container">
    <NavbarHome />
    <MainHome />
    <FAQCompo />
    <FooterHome />
  </div>
</template>

<script>
import NavbarHome from '@/components/Home/NavbarHome.vue';
import MainHome from '@/components/Home/MainHome.vue';
import FAQCompo from '@/components/Home/FAQCompo.vue';
import FooterHome from '@/components/Home/FooterHome.vue';

export default {
  components: {
    NavbarHome,
    MainHome,
    FAQCompo,
    FooterHome,
  },
};
</script>

<style scoped>
</style>
