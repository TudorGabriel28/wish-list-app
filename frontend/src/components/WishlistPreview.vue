<template lang="pug">
h4.h4.my-3 {{ wishlist.title }}
.row
  p.mb-4(v-if='!wishlist.products') No products added in this list so far.
  .scroll-list(v-else)
    router-link.product-preview.align-top.mx-2(
      :to='{ path: `/product/${product._id}` }',
      v-for='(product, index) in wishlist.products',
      :key='index'
    )
      img.purchased-overlay(
        src='../assets/images/purchased-overlay.png',
        v-if='product.purchased'
      )
      img.product-image.mx-auto.d-block(:src='product.picture')
      p.product-title-preview.mt-3 {{ product.name }}

  router-link.view-more.pt-2(
    :to='{ name: "Wishlist", query: { wishlistId: wishlist._id, wishlistTitle: wishlist.title } }'
  ) View More
</template>

<script>
export default {
  name: 'WishlistPreview',
  props: ['wishlist']
};
</script>

<style lang="stylus" scoped>
@require "../assets/styles/colors.styl"
@require "../assets/styles/utils.styl"

.scroll-list
  overflow: auto
  white-space: nowrap

.scroll-list::-webkit-scrollbar
  display: none
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;

.view-more
  text-align: right

.product-preview
  position: relative
  background-color: white;
  padding: 1.5rem 0.5rem
  border-radius: 5px

.product-title-preview
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-weight: normal

.purchased-overlay
  width: 100%
  height: 100%
  object-fit: cover

.product-image
  width: 140px
  height: 140px
  object-fit: cover

</style>
