<template lang="pug">
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { accountService } from '../services/accountService';
import { onMounted } from 'vue';
import { Toast } from '../utils/toastAlert';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    onMounted(async () => {
      try {
        await accountService.activateAccount(route.params.token);
        Toast.fire({
          icon: 'success',
          title: 'Your account has been activated successfully'
        });
        router.push({
          name: 'Login'
        });
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Link has expired'
        });
        router.push({
          name: 'Login'
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
