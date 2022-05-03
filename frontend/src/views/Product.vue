<template lang="pug">
.row.product-container.gx-5
  .col-lg-4.col-12.mt-5
    img.img-fluid.rounded.mx-auto.d-block(
      :src='product.picture',
      width='400',
      height='400'
    )
  .info.col-lg-8.col-12.mt-5
    h3.h3 {{ product.name }}
    h5.my-0 Description:
    p.mb-4 {{ product.description }}
    p(v-if='product.purchased') Product is purchased
    button.button(v-else, @click='setPurchased') Set as purchased
    .d-flex.justify-content-between.my-5
      router-link(:to='{ name: "EditProduct" }') Edit product
      a(:href='product.url') Go to website ↗
</template>

<script>
import { ref } from 'vue';
import { onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { productService } from '@/services/productService';

export default {
  setup() {
    const route = useRoute();
    const product = ref({});

    onMounted(async () => {
      const response = await productService.getProduct(route.params.id);
      product.value = response.data;
    });

    const setPurchased = async () => {
      const response = await productService.editProduct(product.value._id, {
        purchased: true
      });
      product.value = response.data;
    };

    return {
      product,
      setPurchased
    };
  }
};
</script>

<style lang="stylus" scoped>

.product-container
  height calc(100vh - 130px)
  padding 0 7%
</style>