<template lang="pug">
.row
  .col-2.d-flex.align-items-center
    p Filter by:
  .col
    span Category
    select.input(v-model='selectedCategory')
      option(value='' selected) All
      option(v-for='(category, index) in categories', :key='index') {{category}}
  .col
    span Status
    select.input(v-model='selectedStatus')
      option(value='' selected) All
      option(v-for='(status, index) in statuses', :key='index') {{status}}
</template>

<script>
import { watch , ref } from 'vue'

export default {
  name: 'Filters',
  emits: ['categoryFilter', 'statusFilter'],
  setup(props, context) {
    const selectedCategory = ref('');
    const selectedStatus = ref('');

    const categories = [
      'Office Furniture',
      'Peripherals',
      'Desktop Hardware',
      'Notebook',
      'Software and Services',
      'Office Accessories',
      'Furniture',
      'Books and Courses'
    ];
    const statuses = ['accepted', 'rejected', 'cancelled', 'pending'];

    watch(selectedCategory, () => {
      context.emit('categoryFilter', selectedCategory.value)
    })

    watch(selectedStatus, () => {
      context.emit('statusFilter', selectedStatus.value)
    })

    return {
      categories,
      statuses,
      selectedCategory,
      selectedStatus,
    }
  }
}
</script>

<style lang="stylus">

</style>