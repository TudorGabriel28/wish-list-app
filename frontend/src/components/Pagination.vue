 <template lang="pug">
.pointer(@click='back', v-if='paginationParams.hasPrevious')
  i.fas.fa-angle-double-left
  span.mx-1 Back
.pointer(@click='next', v-if='paginationParams.hasNext')
  span.mx-1 Next
  i.fas.fa-angle-double-right
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  name: 'Pagination',
  props: ['paginationParams'],
  emits: ['pageNumber'],
  setup(props, context) {
    let pageNumber = ref();

    const back = () => {
      pageNumber.value = props.paginationParams.pageNumber;
      if (pageNumber.value > 1) {
        pageNumber.value--;
      }
      context.emit('pageNumber', pageNumber.value);
    };

    const next = () => {
      pageNumber.value = props.paginationParams.pageNumber;
      if (pageNumber.value < props.paginationParams.totalPages) {
        pageNumber.value++;
      }
      context.emit('pageNumber', pageNumber.value);
    };

    return {
      next,
      back
    };
  }
};
</script>

<style lang="stylus" scoped>
.pointer
  cursor pointer

</style>