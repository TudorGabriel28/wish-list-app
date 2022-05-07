<template lang="pug">
.mx-3
  .row.pt-5.mt-5.offset-sm-1.offset-lg-2
    h4.h4.pb-3 Pick a name for the wishlist:
    .col-9.col-sm-8.col-lg-6
      input.input.mt-0(
        type='text',
        placeholder='Wishlist name',
        v-model='wishlistName'
      )

    button.button.col-3.col-sm-2(@click='addWishlist') Create
</template>

<script>
import { wishlistService } from '@/services/wishlistService';
import { ref } from 'vue';
import { Toast } from '../utils/toastAlert';

export default {
  setup() {
    const wishlistName = ref('');

    const addWishlist = async () => {
      try {
        await wishlistService.addWishlist({
          title: wishlistName.value
        });
        Toast.fire({
          icon: 'success',
          title: 'Wishlist added successfully'
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: 'Failed to add wishlist'
        });
      }
    };

    return {
      addWishlist,
      wishlistName
    };
  }
};
</script>

<style lang="stylus" scoped>
@require "../assets/styles/colors.styl"

.input
  background $background-white-input
  color $text-black

input::placeholder
 color $text-gray


</style>