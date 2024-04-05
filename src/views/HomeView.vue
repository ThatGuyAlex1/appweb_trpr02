<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gameService } from '../services/gameService'
import type Ship from '../scripts/ship'
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
    ships.value = await gameService.getShips()
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
  <div>
    <h1>Star Wars - Ship Battle Simulator</h1>
    <form action="GameView.vue">
        <label for="name">Player name :</label><br>
        <input type="text" id="name" name="name" value=""><br>
        <label for="ship-select">Choose a ship :</label><br>
        <select name="ships" id="ship-select"><br>
            <option v-for="ship in ships" v-bind:key="ship.id">
                {{ ship.name }}
            </option>
        </select><br>
        <input type="submit" value="Start your adventure">
    </form>
    <!-- La libraire vue-loading-overlay a été installée dans ce projet avec npm. C'est une librairie qui facilite la mise en place d'un indicateur de chargement. Pour plus d'information sur son utilisation voir https://github.com/ankurk91/vue-loading-overlay. -->
    <Loading :active="isLoading" />
  </div>
</template>