<template lang="pug">
.d-flex
  input.my-0.input-small(:placeholder='placeholder', v-model='keyword')
  button.button-small.px-3.ms-2(@click='searchKeyword', type='button') Search
</template>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
  name: 'Search',
  emits: ['searchKeyword'],
  props: ['placeholder'],
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