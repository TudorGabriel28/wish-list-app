<template lang="pug">
.row.mx-3
  .center-container.offset-sm-1.col-sm-10.offset-lg-2.col-lg-8.offset-xxl-3.col-xxl-6
    h4 Product name:
    input.input.mb-4(placeholder='Product title', v-model='name')
    h4 Product description:
    input.input.mb-4(placeholder='Description', v-model='description')
    .form-check.mb-4
      input#flexCheckDefault.form-check-input(
        type='checkbox',
        value='',
        v-model='purchased'
      )
      label.form-check-label(for='flexCheckDefault') purchased
    .d-flex.justify-content-between
      button.button(@click='editProduct') Save Changes
      button.button.delete-product(href='#', @click='deleteProduct') Delete product
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import { productService } from '@/services/productService';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { Toast } from '../utils/toastAlert';
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const purchased = ref();
    const name = ref();
    const description = ref();

    onMounted(async () => {
      const response = await productService.getProduct(route.params.id);
      name.value = response.data.name;
      description.value = response.data.description;
      purchased.value = response.data.purchased;
    });

    const editProduct = async () => {
      try {
        if (
          name.value == '' ||
          description.value == '' ||
          purchased.value == undefined
        ) {
          throw new Error();
        }
        await productService.editProduct(route.params.id, {
          name: name.value,
          description: description.value,
          purchased: purchased.value
        });
        Toast.fire({
          icon: 'success',
          title: 'Saved product changes.'
        });
        router.push({ path: `/product/${route.params.id}` });
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Fields are not correct.'
        });
      }
    };

    const deleteProduct = async () => {
      try {
        await productService.deleteProduct(route.params.id);
        Toast.fire({
          icon: 'success',
          title: 'Product deleted successfully'
        });
        router.push({ name: 'HomePage' });
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.response.data.message
        });
      }
    };

    return {
      name,
      description,
      purchased,
      editProduct,
      deleteProduct
    };
  }
};
</script>

<style lang="stylus" scoped>
@require "../assets/styles/colors.styl"

.delete-product
  background-color: $primary-red !important
.delete-product:hover
  background-color: $hover-red !important
.delete-product:active
  background-color: $active-red !important

</style>