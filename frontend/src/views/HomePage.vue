<template lang="pug">
.col-md-10.offset-md-1
  .col(v-for='(wishlist, index) in wishlists', :key='index')
    WishlistPreview(:wishlist='wishlist')
</template>

<script>
import { onMounted, ref, onBeforeMount } from 'vue';
import WishlistPreview from '../components/WishlistPreview.vue';
import { wishlistService } from '@/services/wishlistService.js';

export default {
  components: { WishlistPreview },
  setup() {
    var wishlists = ref([]);
    onMounted(async () => {
      const response = await wishlistService.getWishlists({ pageSize: 5 });
      wishlists.value = response.data;
    });

    return {
      wishlists
    };
  }
};
</script>

<style lang="stylus" scoped>

</style>
