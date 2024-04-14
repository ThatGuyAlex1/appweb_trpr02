<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { shipService } from '../services/shipService'
import type Ship from '../scripts/ship'
import GameActions from '../components/GameActions.vue'
import GameMission from '../components/GameMission.vue'
import GamePlayer from '../components/GamePlayer.vue'
import GameEnemy from '../components/GameEnemy.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const ships = ref([] as Ship[])
const isLoading = ref(false)

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
</script>

<!-- Ce composant est associé à la route "/". Ceci présente la liste de vaisseaux et le form pour commencer la partie-->
<template>
  <div class="container">
    <div class="row">

      <GameActions />
      <GameMission />
      <GamePlayer />
      <GameEnemy />

    </div>
    </div>
</template>