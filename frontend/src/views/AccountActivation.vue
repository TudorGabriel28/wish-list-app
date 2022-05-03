<template lang="pug">
h2.h2.d-flex.align-items-center.justify-content-center(data-test-id='title') Your account has been activated.
  h4 Go to
    router-link(:to='{ name: "Login" }') login
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { accountService } from '../services/accountService';
import { onMounted } from 'vue';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    onMounted(async () => {
      try {
        await accountService.activateAccount(route.params.token);
      } catch (error) {
        router.push({
          name: 'Login',
          params: {
            alert: true,
            alertMessage: 'Link has expired.',
            alertIcon: 'error'
          }
        });
      }
    });
  }
};
</script>

<style lang="stylus" scoped>
h2
  height 100vh
</style>
