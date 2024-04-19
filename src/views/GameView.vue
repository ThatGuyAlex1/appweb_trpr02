<script setup lang="ts">
import { gameService } from '../services/gameService'
import { ref, onMounted, defineProps, computed } from 'vue'
import { useRouter  } from 'vue-router'
import ConfirmModal from '../components/ConfirmModal.vue'
import NotifyModal from '../components/NotifyModal.vue'
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
let currentPlayerLife = ref<number>(0);
currentPlayerLife.value+=MAX_LIFE_POINT;
let currentEnnemyLife = ref<number>(0);
let currentMission = ref<number>(1);
let currentPlayerCG = ref<number>(0);
const isLoading = ref(true)
const triggerDeathModal = ref(0)
const triggerWinModal = ref(0)

const props = defineProps({
  name: String,
  selectedShip: String
})

onMounted(async () => {
  try {
    await setup();
  } catch (error) {
    useToast().error(
      `Erreur avec le service: ${(error as Error).message}. Oups, le backend a lâché !`,
      { duration: 6000 }
    )
  } finally {
    isLoading.value = false
  }
})

async function fetchEnnemies(){
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
}

//aidé de chatGPT
const selectedShip = computed(() => {
  const shipData = props.selectedShip;
  return shipData ? JSON.parse(shipData) as Ship : null;
})

async function setup(){
  await fetchEnnemies();
  await setupEnnemyLife();
}

async function setupEnnemyLife(){
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

</script>
<template>
  <div class="container">
      <div class="row">
        <GameActions v-if="!isLoading" :playerLife="currentPlayerLife" :maxPlayerLife="MAX_LIFE_POINT" :playerExperience="PLAYER_BASE_EXPERIENCE" :ennemyLife="currentEnnemyLife" :maxEnnemyLife="ennemiesRef[currentMission-1].ship.vitality" :ennemyExperience="ennemiesRef[currentMission-1].experience" :currentPlayerCG="currentPlayerCG" @updateLife="handleUpdateLife" @updateFinishMission="nextMission" @updateFinishMissionAndRepair="handleFinishMissionAndRepair"/>
        <GameMission v-if="!isLoading"/>
        <GamePlayer v-if="!isLoading"/>
        <GameEnemy v-if="!isLoading"/>
      </div>
    <NotifyModal
      @onModalConfirmed=""
      :trigger="triggerDeathModal, triggerWinModal"
      title="Attention"
      body="Vos changements seront perdus. Voulez-vous vraiment quitter cette page ? "
      dismissButton="Ok"
    />
    <Loading :active="isLoading" />
  </div>
</template>