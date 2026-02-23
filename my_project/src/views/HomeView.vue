<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Card_Pokemon from '@/components/Card_Pokemon.vue'
import Pagination from '@/components/Pagination.vue'
import axios from 'axios'

const pokemonList = ref<{ results: Array<{ name: string; url: string }> }>({ results: [] })
const originalList = ref<Array<{ name: string; url: string }>>([])
const currentPage = ref(1)
const itemsPerPage = 20
const totalItems = ref(0)
const searchText = ref('')
const isloading = ref(false)

const loadPokemon = async () => {
  try {
    isloading.value = true
    const startTime = Date.now()
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
    originalList.value = response.data.results || []
    totalItems.value = response.data.count || 0
    loadPaginationData(1)

    const elapsed = Date.now() - startTime
    const minimumDelay = 800
    if (elapsed < minimumDelay) {
      await new Promise((resolve) => setTimeout(resolve, minimumDelay - elapsed))
    }
  } catch (error) {
    console.error('Error loading Pokémon:', error)
  } finally {
    isloading.value = false
  }
}

const loadPaginationData = (page: number) => {
  const offset = (page - 1) * itemsPerPage
  pokemonList.value.results = originalList.value.slice(offset, offset + itemsPerPage)
  currentPage.value = page
}

const handleSearch = () => {
  if (searchText.value === '') {
    loadPaginationData(1)
    totalItems.value = originalList.value.length
  } else {
    const filteredResults = originalList.value.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchText.value.toLowerCase()),
    )
    pokemonList.value.results = filteredResults
    totalItems.value = filteredResults.length
    currentPage.value = 1
  }
}

let searchTimeout: number
watch(searchText, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    handleSearch()
  }, 300) // Debounce for 300ms
})

const handlePageChange = (newPage: number) => {
  if (searchText.value) {
    return
  }
  loadPaginationData(newPage)
}

onMounted(() => {
  loadPokemon()
})

const getPokemonImage = (url: string) => {
  const id = url.split('/')[6]
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}
</script>

<template>
  <div>
    <form class="max-w-xl mx-auto" @submit.prevent="handleSearch">
      <div class="relative">
        <input
          type="search"
          id="default-search"
          v-model="searchText"
          @keyup="handleSearch"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-black rounded-full bg-white"
          placeholder=" Search..."
          required
        />
        <button
          type="submit"
          class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </form>

    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-center my-6">Pokémon List</h1>

      <p v-if="isloading" class="text-center text-blue-600 text-2xl font-bold my-10">Loading...</p>

      <p
        v-else-if="searchText && pokemonList.results.length === 0"
        class="text-center text-red-600 text-2xl font-bold my-10"
      >
        ไม่พบ Pokémon ที่ค้นหา
      </p>

      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-10 my-4"
      >
        <Card_Pokemon
          v-for="pokemon in pokemonList.results"
          :key="pokemon.name"
          :coverimage="getPokemonImage(pokemon.url)"
          :name="pokemon.name"
          :url="pokemon.url"
          class="max-w-xs"
        />
      </div>
    </div>

    <Pagination
      v-if="!isloading && pokemonList.results.length > 0 && !searchText"
      :currentPage="currentPage"
      :itemsPerPage="itemsPerPage"
      :totalItems="totalItems"
      @PageChanged="handlePageChange"
    />
  </div>
</template>
