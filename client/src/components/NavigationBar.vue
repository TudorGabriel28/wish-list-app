<template lang="pug">
nav.navbar.navbar-expand-md.navbar-light.pt-4.pb-5
  router-link.navbar-brand(:to='{ name: "Login" }' v-if='!isLoggedIn')
    img.navbar-logo(src='../assets/images/logo.svg')
  .container-fluid.flex-wrap(v-if='isLoggedIn')
    button.navbar-toggler(
      type='button',
      data-bs-toggle='collapse',
      data-bs-target='#navbarNav',
      aria-controls='navbarNav',
      aria-expanded='false',
      aria-label='Toggle navigation'
    )
      span.navbar-toggler-icon

    router-link.navbar-brand.mx-auto(:to='{ name: "HomePage" }')
      img.navbar-logo(src='../assets/images/logo.svg')

    #navbarNav.collapse.navbar-collapse.mt-3.mt-md-0.px-5.order-1.order-md-0
      ul.navbar-nav.me-auto.mb-0.mb-lg-0
        li.nav-item
          router-link.nav-link.pe-4(:to='{ name: "HomePage" }') Home
        li.nav-item
          router-link.nav-link.pe-4(:to='{ name: "AddWishlist" }') Add Wishlist
        li.nav-item
          router-link.nav-link.pe-1.text-nowrap(:to='{ name: "AddProduct" }') Add Product

    Search.mx-auto.pt-4.pt-md-0.break-searchbar(
      @searchKeyword='searchInput',
      placeholder='Search for a product'
    )
    .dropdown
      i#user-icon.fas.fa-user-circle.ps-4(
        type='button',
        data-bs-toggle='dropdown',
        aria-expanded='false'
      )
      ul#dropdown-menu.dropdown-menu(aria-labelledby='navbarDropdown')
        li
          router-link.dropdown-item(:to='{ name: "Login" }') Edit profile
        li
          hr.dropdown-divider
        li
          button.dropdown-item(@click='logout') Logout
</template>

<script>
import Search from './Search.vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { clickOutside } from '../directives/clickOutside';
export default {
  name: 'NavigationBar',
  components: { Search },
  directives: {
    clickOutside
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const logout = async () => {
      await store.dispatch('logout');
      router.push({ name: 'Login' });
    };

    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    const searchInput = (keyword) => {
      if (keyword) {
        router.push({
          name: 'Wishlist',
          query: {
            search: keyword,
            wishlistTitle: `Search Results for '${keyword}'`
          }
        });
      }
    };

    return {
      logout,
      isLoggedIn,
      searchInput
    };
  }
};
</script>

<style lang="stylus" scoped>
@require "../assets/styles/colors.styl"
@require "../assets/styles/utils.styl"

.navbar
  padding: 0 6%
#user-icon
  font-size 36px
.dropdown-menu
  left -34px !important
.dropdown-item
  color $text-black !important
.dropdown-item:active
  background-color $primary-purple;
  border-color: #fff;

.navbar-logo
  width: remify(170px)
  min-width: remify(170px)

.container-fluid
  padding: 0px

@media (min-width: 768px) and (max-width: 1092px) {
  .break-searchbar {
    order: 1
    flex-basis: 70%
    margin-top: remify(10px)
  }
}

@media (max-width: 767px) {
  .break-searchbar {
    order: 2
    flex-basis: 100%
  }
}

</style>