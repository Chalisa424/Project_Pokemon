<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'PaginationControl'
})

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
    default: 0,
  },
})

const emit = defineEmits(['PageChanged'])

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage)
})

const ChangePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('PageChanged', page)
  }
}
</script>

<template>


<div class="flex justify-center gap-5 mt-4">

  <button
    @click ="ChangePage(currentPage - 1)" :disabled="currentPage === 1"
    class="text-white  bg-blue-700 hover:bg-blue-800 font-medium rounded text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700">

  Previous</button>


  <button
    @click="ChangePage(currentPage + 1)"
    :disabled="currentPage === totalPages || totalPages === 0"
    class="text-white  bg-blue-700 hover:bg-blue-800 font-medium rounded text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
    >
   Next
  </button>

</div>

</template>
<style>
</style>
