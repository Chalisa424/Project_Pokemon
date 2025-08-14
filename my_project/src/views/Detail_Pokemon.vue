<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

interface PokemonDetail {
  name: string
  sprites: {
    front_default: string
  }
  abilities: Array<{
    ability: {
      name: string
    }
  }>
}

const route = useRoute()
const pokemon = ref<PokemonDetail | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const fetchPokemonDetail = async (id: string) => {
  try {
    loading.value = true
    error.value = null
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    pokemon.value = response.data
  } catch (err) {
    error.value = 'Failed to load Pokémon details'
    if (import.meta.env.DEV) {
      console.log('Error fetching Pokémon detail:', err)
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (route.params.id) {
    fetchPokemonDetail(route.params.id as string)
  }
})
</script>

<template>
  <div>
    <div class="pokemon-detail">
      <div v-if="loading" class="loading">Loading....</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="pokemon" class="detail-container">
        <h1 class="text-3xl font-bold mb-6 text-center capitalize">{{ pokemon.name }}</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="image-container">
            <img
              :src="pokemon.sprites.front_default"
              :alt="pokemon.name"
              class="mx-auto w-64 h-64 object-contain"
            />
          </div>
          <div class="info-container">
            <h2 class="text-2xl font-semibold mb-4">Abilities</h2>
            <ul class="abilities-list">
              <li
                v-for="(ability, index) in pokemon.abilities"
                :key="index"
                class="capitalize py-2 px-4 bg-gray-100 rounded-lg mb-2"
              >
                {{ ability.ability.name }}
              </li>
            </ul>
          </div>
        </div>
        <router-link
          to="/"
          class="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>


.pokemon-detail {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  text-transform: capitalize;
  color: #333;
}

.loading,
.error {
  @apply text-center text-xl py-10;
}

.detail-container {
  @apply max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8;
}

.image-container {
  @apply flex items-center justify-center;
}

.info-container {
  @apply flex flex-col justify-center;
}

.abilities-list {
  @apply list-none;
}
</style>
