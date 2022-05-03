<template lang="pug">
.row
  .col-8.my-0
    input.my-0.input-small(placeholder='Search a product', v-model='keyword')
  .col-4
    button.button-small.px-3(@click='searchKeyword', type='button') Search
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'Search',
  emits: ['searchKeyword'],
  setup(props, context) {
    const keyword = ref('');

    function searchKeyword() {
      context.emit('searchKeyword', keyword.value);
    }
    return {
      keyword,
      searchKeyword
    };
  }
};
</script>

<style lang="stylus" scoped>
@require "../assets/styles/colors.styl"

.input-small
  background $background-white-input
  color $text-black
input::placeholder
 color $text-gray



</style>