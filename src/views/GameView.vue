<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { shipService } from '../services/shipService'
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
    <div class="row ">

      <div class="card col-lg-4 col-md-12">
        <div class="card-body">
            <h5 class="card-title">Actions</h5>
            <button type="button" class="btn btn-primary">Combattre</button>
            <button type="button" class="btn btn-primary">Terminer la mission</button>
            <button type="button" class="btn btn-primary">Terminer la mission et réparer le vaisseau</button>
        </div>
      </div>

      <div class="card col-lg-4 col-md-6">
        <div class="card-body">
            <h5 class="card-title">Mission en cours</h5>
            <p class="card-text">1 / 5</p>
            <p class="card-text">Objectif: survivre à 5 missions en obtenant le plus de crédits</p>
        </div>
      </div>

      <div class="card col-lg-4 col-md-6"> 
        <div class="card-body">
            <h5 class="card-title">Test</h5>
            <p class="card-text">Maître - 0 CG</p>
            <div class="progress mb-2">
                <div class="progress-bar" role="progressbar" style="width: 97%;" aria-valuenow="97" aria-valuemin="0" aria-valuemax="100">X-wing 97%</div>
            </div>
        </div>
      </div>

      <div class="card col-lg-4 col-md-6"> 
        <div class="card-body">
            <h5 class="card-title">Bib Fortuna</h5>
            <p class="card-text">Expert - 120 CG</p>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 94%;" aria-valuenow="94" aria-valuemin="0" aria-valuemax="100">A-wing 94%</div>
            </div>
        </div>
      </div>

    </div>
    </div>

    <div class="container py-3">
    <!-- Card for Actions -->
    <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title">Actions</h5>
            <button type="button" class="btn btn-primary">Combattre</button>
            <button type="button" class="btn btn-primary">Terminer la mission</button>
            <button type="button" class="btn btn-primary">Terminer la mission et réparer le vaisseau</button>
        </div>
    </div>

    <!-- Card for Mission Status -->
    <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title">Mission en cours</h5>
            <p class="card-text">1 / 5</p>
            <p class="card-text">Objectif: survivre à 5 missions en obtenant le plus de crédits</p>
        </div>
    </div>

    <!-- Card for Player Status -->
    <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title">Test</h5>
            <p class="card-text">Maître - 0 CG</p>
            <div class="progress mb-2">
                <div class="progress-bar" role="progressbar" style="width: 97%;" aria-valuenow="97" aria-valuemin="0" aria-valuemax="100">X-wing 97%</div>
            </div>
        </div>
    </div>

    <!-- Card for Player Status -->
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Bib Fortuna</h5>
            <p class="card-text">Expert - 120 CG</p>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 94%;" aria-valuenow="94" aria-valuemin="0" aria-valuemax="100">A-wing 94%</div>
            </div>
        </div>
    </div>
</div>
</template>