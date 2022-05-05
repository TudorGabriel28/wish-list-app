<template lang="pug">
.col-md-10.offset-md-1
  h3.h3.mb-4 {{ titleList }}
  .d-flex.flex-row.flex-wrap.justify-content-center
    router-link.product-preview.align-top.me-3.my-3(
      :to='{ path: `/product/${product._id}` }',
      v-for='(product, index) in products',
      :key='index'
    )
      img.purchased-overlay(
        src='../assets/images/purchased-overlay.png',
        v-if='product.purchased'
      )
      img.product-picture.mx-auto.d-block(:src='product.picture')
      p.product-title-preview.mt-4 {{ product.name }}

.d-flex.justify-content-center.mb-5.mt-3
  Pagination(
    @pageNumber='changePageNumber',
    :paginationParams='paginationParams'
  )
</template>

<script>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { productService } from '../services/productService';
import { ref, watch } from 'vue';
import Pagination from '../components/Pagination.vue';

export default {
  components: { Pagination },
  setup() {
    const route = useRoute();
    const router = useRouter();

    let titleList = ref(route.query.wishlistTitle);

    const paginationParams = ref({});
    const products = ref([]);

    const productParams = ref({});
    if (route.query.wishlistId) {
      productParams.value['wishlistId'] = route.query.wishlistId;
    }
    if (route.query.pageSize) {
      productParams.value['pageSize'] = route.query.pageSize;
    }
    if (route.query.pageNumber) {
      productParams.value['pageNumber'] = route.query.pageNumber;
    }
    if (route.query.search) {
      productParams.value['search'] = route.query.search;
    }
    const updated = ref(false);

    const changePageNumber = (pageNumber) => {
      try {
        productParams.value['pageNumber'] = pageNumber;
        router.push({
          name: 'Wishlist',
          query: { ...productParams.value, wishlistTitle: titleList.value }
        });
        updated.value = !updated.value;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(async () => await productsRequest());

    watch(updated, async () => await productsRequest());

    const productsRequest = async () => {
      const response = await productService.getProducts(productParams.value);

      paginationParams.value = JSON.parse(response.headers['x-pagination']);

      products.value = response.data;
    };

    return {
      titleList,
      products,
      paginationParams,
      changePageNumber
    };
  }
};
</script>

<style lang="stylus" scoped>
@require "../assets/styles/colors.styl"

.full-container
  padding: 0 5rem

.product-preview
  position: relative
  background-color: white;
  padding: 1rem 0.5rem
  border-radius: 5px

.product-title-preview
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-weight: normal

.product-picture
  width: 200px
  height: 200px
  object-fit: cover

.purchased-overlay
  width: 100%
  height: 100%
  object-fit: cover

</style>