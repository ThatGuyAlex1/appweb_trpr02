<script setup lang="ts">
import { gameService } from '../services/gameService'
import { ref,defineProps, computed } from 'vue'
import { useRouter, onBeforeRouteLeave  } from 'vue-router'
import ConfirmModal from '../components/ConfirmModal.vue'
import type Ship from '../scripts/ship'
import type Character from '../scripts/character'
import GameActions from '../components/GameActions.vue'
import GameMission from '../components/GameMission.vue'
import GamePlayer from '../components/GamePlayer.vue'
import GameEnemy from '../components/GameEnemy.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
const MAX_LIFE_POINT: number = 200;
const PLAYER_BASE_EXPERIENCE: number = 4;
let ennemiesRef = ref<Character[]>([]);
let errorMessage: string;
let currentPlayerLife = ref<number>(0);
currentPlayerLife.value+=MAX_LIFE_POINT;
let currentEnnemyLife = ref<number>(0);
let currentMission = ref<number>(1);
let currentPlayerCG = ref<number>(0);
let setupIsDone = ref(false);

const props = defineProps({
  name: String,
  selectedShip: String
})

async function fetchEnnemies(){
  try {
  const gameResponse: Character[] = await gameService.getCharacters();
  const selectedEnnemies: Character[] = [];
  //aidé par chatGPT
  const indices: number[] = [];
    while (indices.length < 5) {
      const randomIndex = Math.floor(Math.random() * gameResponse.length);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
        selectedEnnemies.push(gameResponse[randomIndex]);
      }
    }
  ennemiesRef.value = selectedEnnemies;
  } catch (error) {
  errorMessage = 'Error fetching ennemies:' + error
  }
}




//aidé de chatGPT
const selectedShip = computed(() => {
  const shipData = props.selectedShip;
  return shipData ? JSON.parse(shipData) as Ship : null;
})

async function setup(){
  await fetchEnnemies();
  setupEnnemyLife();
  setupIsDone.value = true;
}

function setupEnnemyLife(){
  currentEnnemyLife.value = ennemiesRef.value[currentMission.value-1].ship.vitality;
}

const router = useRouter()

function nextMission(){
  if(currentMission.value == 5){
    //TODO popup de partie gagné, envoyer le résultat a la database et rediriger vers la page de score
  }
  else{
    currentMission.value++;
    setupEnnemyLife();
  }
}

function handleUpdateLife(playerLife: number, ennemyLife: number){
  if(playerLife <= 0){
    //TODO popup message de game over et retour au home
  }
  else{
    currentPlayerLife.value = playerLife;
  }

  if(ennemyLife <= 0){
    currentPlayerCG.value+=ennemiesRef.value[currentMission.value-1].credit
    nextMission();
  }
  else{
    currentEnnemyLife.value = ennemyLife;
  }
}

function handleFinishMissionAndRepair(playerLife: number, CGPlayer: number){
  currentPlayerCG.value = CGPlayer;
  currentPlayerLife.value = playerLife;
  nextMission();
}

function handleErrorUpdate(error: string){
  errorMessage = error;
}

setup();
</script>
<template>
  <div class="container">
    <div class="row">
      <GameActions v-if="setupIsDone" :playerLife="currentPlayerLife" :maxPlayerLife="MAX_LIFE_POINT" :playerExperience="PLAYER_BASE_EXPERIENCE" :ennemyLife="currentEnnemyLife" :maxEnnemyLife="ennemiesRef[currentMission-1].ship.vitality" :ennemyExperience="ennemiesRef[currentMission-1].experience" :currentPlayerCG="currentPlayerCG" @updateLife="handleUpdateLife" @updateFinishMission="nextMission" @updateFinishMissionAndRepair="handleFinishMissionAndRepair" @errorUpdate="handleErrorUpdate" />
      <GameMission v-if="setupIsDone" />
      <GamePlayer v-if="setupIsDone" />
      <GameEnemy v-if="setupIsDone" />
    </div>
  </div>
</template>