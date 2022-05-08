<template lang="pug">
.col-10.offset-1
  .d-flex.justify-content-between.mb-4.flex-wrap
    .titleList.d-flex.align-items-center.px-5
      .d-flex.flex-row.flex-nowrap.align-items-center(v-if='!edit')
        h3.h3 {{ titleList }}
        i.fa-solid.fa-pen-to-square.ps-3(
          @click='edit = true',
          alt='Edit wishlist',
          v-if='isSearch'
        )
      .d-flex.flex-row.flex-nowrap.align-items-center(v-if='edit && isSearch')
        input.input-small.col-md-4(
          placeholder='Enter title',
          v-model='titleList'
        )
        i.fa-solid.fa-check.ps-2(@click='changeTitle')
        a.delete-wishlist.mx-auto.ps-3(href='#', @click='deleteWishlist') Delete wishlist
      a.fa-solid.fa-file-export.px-3(
        title='Export wishlist',
        type='button',
        @click='exportWishlist',
        v-if='isSearch'
      )
    .d-flex.flex-wrap.justify-content-center.align-items-center
      .px-3.d-flex.flex-row.align-items-center.my-3.my-sm-0
        h6.text-nowrap.pe-2 Sort by:
        select.form-select(aria-label='sortCriteria', v-model='sortCriteria')
          option(selected, value='createdAt') Date
          option(value='name') Name
      .px-3.d-flex.flex-row.align-items-center
        h6.text-nowrap.pe-2 Sort order:
        select.form-select(aria-label='sortOrder', v-model='sortOrder')
          option(selected, value='asc') Ascending
          option(value='desc') Descending

  .d-flex.flex-row.flex-wrap.justify-content-center
    h4.h4(v-if='!products[0]') No products added so far. Add one&nbsp
      router-link.here(:to='{ name: "AddProduct" }') here
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
import { wishlistService } from '@/services/wishlistService';
import { Toast } from '../utils/toastAlert';
import download from 'downloadjs';

export default {
  components: { Pagination },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const paginationParams = ref({});
    const products = ref([]);
    const titleList = ref();
    const isSearch = ref(false);
    const sortCriteria = ref('createdAt');
    const sortOrder = ref('asc');

    const productParams = ref({});
    if (route.query.wishlistId) {
      productParams.value['wishlistId'] = route.query.wishlistId;
      isSearch.value = true;
    }
    if (route.query.pageSize) {
      productParams.value['pageSize'] = route.query.pageSize;
    }
    if (route.query.pageNumber) {
      productParams.value['pageNumber'] = route.query.pageNumber;
    }
    if (route.query.search) {
      productParams.value['search'] = route.query.search;
      titleList.value = route.query.search;
    }
    const updated = ref(false);

    const changePageNumber = (pageNumber) => {
      try {
        productParams.value['pageNumber'] = pageNumber;
        router.push({
          name: 'Wishlist',
          query: { ...productParams.value }
        });
        updated.value = !updated.value;
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        });
      }
    };

    onMounted(async () => {
      await productsRequest();
      await wishlistRequest();
    });

    watch(
      [updated, sortCriteria, sortOrder],
      async () => await productsRequest()
    );

    const productsRequest = async () => {
      productParams.value['sortCriteria'] = sortCriteria.value;
      productParams.value['sortOrder'] = sortOrder.value;

      const response = await productService.getProducts(productParams.value);
      paginationParams.value = JSON.parse(response.headers['x-pagination']);
      products.value = response.data;
    };

    const wishlistRequest = async () => {
      try {
        if (productParams.value.wishlistId) {
          const response = await wishlistService.getWishlist(
            productParams.value.wishlistId
          );
          titleList.value = response.data.title;
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        });
      }
    };

    const edit = ref(false);
    const changeTitle = async () => {
      try {
        edit.value = false;
        await wishlistService.updateWishlist(productParams.value.wishlistId, {
          title: titleList.value
        });
        router.push({
          name: 'Wishlist',
          query: { ...productParams.value }
        });
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        });
      }
    };

    const deleteWishlist = async () => {
      try {
        await wishlistService.deleteWishlist(productParams.value.wishlistId);
        Toast.fire({
          icon: 'success',
          title: 'Wishlist deleted successfully'
        });
        router.push({
          name: 'HomePage'
        });
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        });
      }
    };

    const exportWishlist = async () => {
      const response = await wishlistService.exportWishlist(
        productParams.value.wishlistId
      );
      download(
        JSON.stringify(response.data),
        `${titleList.value}.json`,
        'plain/text'
      );
    };

    watch(
      () => route.params,
      () => {
        location.reload();
      },
      { deep: true }
    );

    return {
      titleList,
      products,
      paginationParams,
      changePageNumber,
      changeTitle,
      edit,
      deleteWishlist,
      sortCriteria,
      sortOrder,
      exportWishlist,
      isSearch
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

i
  cursor: pointer

.hide
  opacity: 0

.titleList:hover
  .hide
    opacity: 1

.delete-wishlist
  color: $primary-red !important
.delete-wishlist:hover
  color: $hover-red !important
.delete-wishlist:active
  color: $active-red !important

select
  min-width: 137px
</style>