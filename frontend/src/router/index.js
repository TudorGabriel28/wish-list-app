import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import store from '../store';
import { Toast } from '../utils/toastAlert';

const routes = [
  {
    path: '/',
    beforeEnter: (to, from) => {
      if (store.getters.isLoggedIn) {
        return {
          path: '/home'
        };
      } else {
        return {
          path: '/welcome'
        };
      }
    }
  },
  {
    path: '/welcome',
    name: 'LandingPage',
    component: () =>
      import(/* webpackChunkName: "LandingPage" */ '../views/LandingPage.vue'),
    meta: { forVisitor: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
    meta: { forVisitor: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "Register" */ '../views/Register.vue'),
    meta: { forVisitor: true }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () =>
      import(
        /* webpackChunkName: "ForgotPassword" */ '../views/ForgotPassword.vue'
      ),
    meta: { forVisitor: true }
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: () =>
      import(
        /* webpackChunkName: "ResetPassword" */ '../views/ResetPassword.vue'
      )
  },
  {
    path: '/verify-email/:token',
    name: 'AccountActivation',
    component: () =>
      import(
        /* webpackChunkName: "AccountActivation" */ '../views/AccountActivation.vue'
      )
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () =>
      import(/* webpackChunkName: "Wishlist" */ '../views/Wishlist.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () =>
      import(/* webpackChunkName: "Product" */ '../views/Product.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-product/:id',
    name: 'EditProduct',
    component: () =>
      import(/* webpackChunkName: "Product" */ '../views/EditProduct.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: () =>
      import(/* webpackChunkName: "AddProduct" */ '../views/AddProduct.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/add-wishlist',
    name: 'AddWishlist',
    component: () =>
      import(/* webpackChunkName: "AddWishlist" */ '../views/AddWishlist.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () =>
      import(/* webpackChunkName: "PageNotFound" */ '../views/PageNotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    return {
      path: '/login'
    };
  }

  if (to.meta.forVisitor && store.getters.isLoggedIn) {
    return {
      path: '/home'
    };
  }

  if (
    store.getters.isLoggedIn &&
    ((store.getters.isAdmin && to.meta.forUser) ||
      (store.getters.isUser && to.meta.forAdmin))
  ) {
    Toast.fire({
      icon: 'error',
      title: 'Not Authorized.'
    });
    return {
      path: from.path
    };
  }

  return true;
});

export default router;
