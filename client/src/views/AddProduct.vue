<template lang="pug">
.mx-3
  .row.pt-5.mt-5.offset-sm-1.offset-lg-2
    h4.h4 Paste the url of desired product.
    .col-9.col-sm-8.col-lg-6
      input.input.mt-0(
        type='text',
        placeholder='Paste url here',
        v-model='productUrl'
      )

    button.button.col-3.col-sm-2(@click='addProduct') Create
  .row.py-5.offset-sm-1.offset-lg-2
    h4.h4.font-italic Choose a wishlist:
    .col-12.col-sm-10.col-lg-8
      select.form-select(aria-label='wishlist', v-model='wishlistId')
        option(disabled, selected, value='') Select a wishlist
        option(
          v-for='(wishlist, index) in wishlists',
          :key='index',
          :value='wishlist._id'
        ) {{ wishlist.title }}
</template>

<script>
import { productService } from '@/services/productService';
import { ref, onBeforeMount, onMounted } from 'vue';
import { Toast } from '../utils/toastAlert';
import { wishlistService } from '@/services/wishlistService';

export default {
  setup() {
    const productUrl = ref('');
    const wishlistId = ref('');

    const addProduct = async () => {
      try {
        await productService.addProduct({
          productUrl: productUrl.value,
          wishlistId: wishlistId.value
        });
        Toast.fire({
          icon: 'success',
          title: 'Product added successfully'
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: 'Failed to add product'
        });
      }
    };

    const wishlists = ref([]);
    onMounted(async () => {
      const response = await wishlistService.getWishlists({ onlyTitles: true });
      wishlists.value = response.data;
    });

    return {
      addProduct,
      productUrl,
      wishlists,
      wishlistId
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