<script setup lang="ts">
import { computed } from 'vue'
import {ref, onMounted } from 'vue';

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
  if (page < 1 && page <= totalPages.value) {
    emit('PageChanged', page)
  }
}
</script>

<template>


<div class="flex justify-center gap-2 mt-4">

  <button
    @click ="ChangePage(currentPage - 1)" :disabled="currentPage === 1"
    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-gray-300">

  Previous</button>


  <button
    @click="ChangePage(currentPage + 1)"
    :disabled="currentPage === totalPages || totalPages === 0"
    class="px-4 py-2 bg-blue-500 text-white rounded "
    >
   Next
  </button>

</div>

</template>
<style>
</style>
