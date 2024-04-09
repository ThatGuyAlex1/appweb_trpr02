<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { playerScoreService } from '../services/playerScoreService'
import type Score from '../scripts/playerScore'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const scores = ref([] as Score[])
const isLoading = ref(false)

//onMounted est utilisée pour exécuter du code spécifiquement après que le composant a été monté dans le DOM (Document Object Model).
onMounted(async () => {
  isLoading.value = true

  try 
  {
    scores.value = await playerScoreService.getScores()
    scores.value = scores.value.slice().sort((a, b) => b.score - a.score)
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

<!-- Ce composant est associé à la route "/". Il affiche la liste des publications de l'utilisateur. Lorsque l'utilisateur clique sur l'un des liens "Éditer" associés à une publication, il est redirigé vers la route "/posts/:id" (voir fichier src/router/routes.js). -->
<template>
  <div>
    <h1 class="centered-h1">Pointage</h1>
    <ul class="list-group list-group-flush">
      <!-- On parcourt la liste des publications. Pour chaque publication, on affiche le titre et un lien d'édition est créé avec RouterLink -->
      <li class="list-group-item" v-for="score in scores" v-bind:key="score.id">
        {{ score.name }} - {{ score.score }} CG
      </li>
    </ul>
    <!-- La libraire vue-loading-overlay a été installée dans ce projet avec npm. C'est une librairie qui facilite la mise en place d'un indicateur de chargement. Pour plus d'information sur son utilisation voir https://github.com/ankurk91/vue-loading-overlay. -->
    <Loading :active="isLoading" />
  </div>
</template>

<style>
.centered-h1 {
  text-align: center;
}
</style>