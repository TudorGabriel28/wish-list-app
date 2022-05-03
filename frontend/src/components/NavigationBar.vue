<template lang="pug">
nav.navbar.navbar-expand-lg.navbar-light.pt-4.pb-5
  .navbar-brand.me-5(v-if='!isLoggedIn')
    img.navbar-logo(src='../assets/images/logo.svg')
  .container-fluid(v-if='isLoggedIn')
    button.navbar-toggler(
      type='button',
      data-bs-toggle='collapse',
      data-bs-target='#navbarTogglerDemo02',
      aria-controls='navbarTogglerDemo02',
      aria-expanded='false',
      aria-label='Toggle navigation'
    )
      span.navbar-toggler-icon

    #navbarTogglerDemo02.collapse.navbar-collapse.pt-3.pt-lg-0
      router-link.navbar-brand.me-5(:to='{ name: "HomePage" }')
        img.navbar-logo(src='../assets/images/logo.svg')

      ul.navbar-nav.me-auto.mb-2.mb-lg-0
        li.nav-item
          router-link.nav-link.pe-4(:to='{ name: "HomePage" }') Home
        li.nav-item
          router-link.nav-link.pe-4(:to='{ name: "AddProduct" }') About
        li.nav-item
          router-link.nav-link.pe-1.text-nowrap(:to='{ name: "AddProduct" }') Add Product

      form.d-flex
        Search.px-5(@searchKeyword='searchInput')

    .dropdown
      i#user-icon.fas.fa-user-circle(
        type='button',
        data-bs-toggle='dropdown',
        aria-expanded='false'
      )
      ul#dropdown-menu.dropdown-menu
        li
          router-link.dropdown-item(:to='{ name: "Login" }') Edit profile
        li
          hr.dropdown-divider
        li
          button.dropdown-item(@click='logout') Logout
</template>

<script>
import Search from './Search.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';
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


.dropdown
  position absolute
  right: 0px
  top: 5px
i
  font-size 36px
.dropdown-menu
  left remify(-60px)
.dropdown-item
  color $text-black !important
.dropdown-item:active
  background-color $primary-purple;
  border-color: #fff;

.navbar
  padding: 0 6%

.navbar-logo
  width: 170px

.container-fluid
  position: relative
  padding-right: remify(70px);

</style>
