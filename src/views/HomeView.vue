<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { shipService } from '../services/shipService'
import type Ship from '../scripts/ship'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { useRouter } from 'vue-router'

const ships = ref([] as Ship[])
const isLoading = ref(false)
const playerName = ref('') 
const selectedShipName = ref()

//onMounted est utilisée pour exécuter du code spécifiquement après que le composant a été monté dans le DOM (Document Object Model).
onMounted(async () => {
  isLoading.value = true

  try 
  {
    ships.value = await shipService.getShips()
  } 
  catch (error) 
  {
    useToast().error(
      `Erreur avec le service: ${(error as Error).message}. Est-ce que vous avez démarré le backend localement ?`,
      { duration: 6000 }
    )
  } 
  finally 
  {
    isLoading.value = false
  }
})

const router = useRouter()

const handleSubmit = () => {
  const selectedShip = ships.value.find(ship => ship.name === selectedShipName.value)
  router.push({
    name: 'Game',
    params: {
      name: playerName.value,
      selectedShip: JSON.stringify(selectedShip)
    }
  })
}
</script>

<!-- Ce composant est associé à la route "/". Ceci présente la liste de vaisseaux et le form pour commencer la partie-->
<template>
  <div>
    <h1 class="text-center">Star Wars - Simulateur de combat spatiaux</h1>
    <div class="col d-flex justify-content-center">
        <form @submit.prevent="handleSubmit" class="bg-dark text-white p-3 mt-4">
          <div class="form-group pt-2 pb-3">
            <label for="name">Entrez votre nom :</label>
            <input type="text" id="name" name="name" class="form-control" v-model="playerName">
          </div>
          <div class="form-group pb-4">
            <label for="ship-select">Choisir votre vaisseau :</label>
            <select name="ships" id="ship-select" class="form-select" v-model="selectedShipName">
                <option v-for="ship in ships" v-bind:key="ship.id">
                    {{ ship.name }}
                </option>
            </select>
          </div>
            <button type="submit" class="btn btn-primary">Commencer votre aventure !</button>
        </form>
        <!-- La libraire vue-loading-overlay a été installée dans ce projet avec npm. C'est une librairie qui facilite la mise en place d'un indicateur de chargement. Pour plus d'information sur son utilisation voir https://github.com/ankurk91/vue-loading-overlay. -->
        <Loading :active="isLoading" />
    </div>
  </div>
</template>