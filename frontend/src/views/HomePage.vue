<template lang="pug">
.col-md-10.offset-md-1
  .d-flex.justify-content-center.justify-content-sm-end.align-items-end.flex-wrap
    .px-3
      Search.mx-auto.pt-4.pt-md-0(
        @searchKeyword='searchInput',
        placeholder='Search for a wishlist'
      )
    .px-3.mt-3.mt-sm-0
      h6 Sort by:
      select.form-select(aria-label='sortCriteria', v-model='sortCriteria')
        option(selected, value='createdAt') Date
        option(value='title') Title
    .px-3
      h6 Sort order:
      select.form-select(aria-label='sortOrder', v-model='sortOrder')
        option(selected, value='asc') Ascending
        option(value='desc') Descending
  h4.h4(v-if='!wishlists[0]') No wishlists added so far. Create one&nbsp
    router-link.here(:to='{ name: "AddWishlist" }') here
  .col(v-for='(wishlist, index) in wishlists', :key='index')
    WishlistPreview(:wishlist='wishlist')
  .d-flex.justify-content-center.mb-5.mt-3
    Pagination(
      @pageNumber='changePageNumber',
      :paginationParams='paginationParams'
    )
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import Pagination from '../components/Pagination.vue';
import WishlistPreview from '../components/WishlistPreview.vue';
import Search from '../components/Search.vue';
import { wishlistService } from '@/services/wishlistService.js';
import { useRoute, useRouter } from 'vue-router';

export default {
  components: { WishlistPreview, Pagination, Search },
  setup() {
    const route = useRoute();
    const router = useRouter();

    var wishlists = ref([]);
    const wishlistsParams = ref({});
    const paginationParams = ref({});
    const updated = ref(false);
    const sortCriteria = ref('createdAt');
    const sortOrder = ref('asc');

    if (route.query.pageSize) {
      wishlistsParams.value['pageSize'] = route.query.pageSize;
    }
    if (route.query.pageNumber) {
      wishlistsParams.value['pageNumber'] = route.query.pageNumber;
    }
    if (route.query.search) {
      wishlistsParams.value['search'] = route.query.search;
    }

    const wishlistsRequest = async () => {
      wishlistsParams.value['sortCriteria'] = sortCriteria.value;
      wishlistsParams.value['sortOrder'] = sortOrder.value;

      const response = await wishlistService.getWishlists(
        wishlistsParams.value
      );
      wishlists.value = response.data;
      paginationParams.value = JSON.parse(response.headers['x-pagination']);
    };

    onMounted(async () => await wishlistsRequest());
    watch(
      [updated, sortCriteria, sortOrder],
      async () => await wishlistsRequest()
    );

    const changePageNumber = (pageNumber) => {
      try {
        wishlistsParams.value['pageNumber'] = pageNumber;
        router.push({
          name: 'HomePage',
          query: { ...wishlistsParams.value }
        });
        updated.value = !updated.value;
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        });
      }
    };

    const searchInput = (keyword) => {
      wishlistsParams.value['search'] = keyword;
      router.push({
        name: 'HomePage',
        query: { ...wishlistsParams.value }
      });
      updated.value = !updated.value;
    };

    watch(
      () => route.params,
      () => {
        location.reload();
      },
      { deep: true }
    );

    return {
      wishlists,
      paginationParams,
      changePageNumber,
      searchInput,
      sortCriteria,
      sortOrder
    };
  }
};
</script>

<style lang="stylus" scoped>
@require "../assets/styles/colors.styl"

select
  min-width: 137px
</style>
