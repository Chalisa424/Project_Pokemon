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
    <div class="pokemon-detail max-auto py-8">
      <p v-if="loading" class="text-center text-blue-600 text-2xl font-bold">Loading...</p>
      <div
        v-if="pokemon"
        class="detail-container max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8"
      >
        <h1 class="text-3xl font-bold mb-6 text-center capitalize">{{ pokemon.name }}</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="image-container">
            <img
              :src="pokemon.sprites.front_default"
              :alt="pokemon.name"
              class="mx-auto w-80 h-80 object-contain flex items-center justify-center"
            />
          </div>
          <div class="info-container flex flex-col justify-center">
            <h2 class="text-3xl font-bold mb-4">Abilities</h2>
            <ul class="abilities-list list-none">
              <li
                v-for="(ability, index) in pokemon.abilities"
                :key="index"
                class="capitalize py-2 px-4 text-2xl bg-gray-100 rounded-lg mb-2"
              >
                {{ ability.ability.name }}
              </li>
            </ul>
          </div>
        </div>
        <router-link
          to="/"
          class="mt-6 inline-block px-4 py-2 bg-blue-600 text-2xl font-bold text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>
