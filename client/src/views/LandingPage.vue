<template lang="pug">
.center-container.col-10.offset-1.col-sm-8.offset-sm-2.col-md-6.offset-md-3.col-xl-6.offset-xl-3
  h1.h1 All of your products in one place.
  h4.h4 Create a wishlist for your desired purchases now.
  .mt-4.mb-5
    button.button.py-3.h4(@click='register') Register Now
</template>

<script>
import { useRouter } from 'vue-router';
import { onBeforeMount, onUnmounted } from 'vue';
export default {
  setup() {
    const router = useRouter();

    const register = () => {
      router.push({ name: 'Register' });
    };

    onBeforeMount(() => {
      document
        .querySelector('#app')
        .setAttribute(
          'style',
          "background-image: url('http://localhost:3000/landingpage-background.png');"
        );
    });

    onUnmounted(() => {
      document
        .querySelector('#app')
        .setAttribute('style', 'background-image: none);');
    });

    return { register };
  }
};
</script>

<style lang="stylus" scoped>

</style>