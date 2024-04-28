<script setup lang="ts">
import { gameService } from '../services/gameService'
import { ref, onMounted, defineProps, computed } from 'vue'
import { onBeforeRouteLeave, useRouter, type RouteRecordName  } from 'vue-router'
import DeathModal from '../components/DeathModal.vue'
import RewardModal from '../components/RewardModal.vue'
import WinModal from '../components/WinModal.vue'
import LeaveModal from '../components/LeaveModal.vue'
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
const isLoading = ref(true);
const triggerDeathModal = ref(false);
const triggerRewardModal = ref(false);
const triggerWinModal = ref(false);
const triggerLeaveModal = ref(0);
const leaveConfirmed = ref(false);
let ennemyCG = ref(0);
let destination : RouteRecordName;

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

async function nextMission(){
  if(currentMission.value == 5){
    //Popup de partie gagné, envoyer le résultat a la database et rediriger vers la page de score
    triggerWinModal.value = true;
    triggerRewardModal.value = false;
    let playerName = props.name;
    await gameService.postRanking(playerName!, currentPlayerCG.value);
  }
  else{
    currentMission.value++;
    setupEnnemyLife();
  }
}

function updateCurrentEnnemyCG()
{
  ennemyCG.value = ennemiesRef.value[currentMission.value - 1].credit;
}

function handleUpdateLife(playerLife: number, ennemyLife: number){
  if(playerLife <= 0){
    triggerDeathModal.value = true;
  }
  else{
    currentPlayerLife.value = playerLife;
  }

  if(ennemyLife <= 0){
    updateCurrentEnnemyCG();
    triggerRewardModal.value = true;
    currentPlayerCG.value+=ennemiesRef.value[currentMission.value-1].credit;
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

onBeforeRouteLeave((to, from, next) => {
  if (triggerDeathModal.value || triggerWinModal.value || leaveConfirmed.value) {
    next()
  } 
  else {
    //aidé par chatGPT
    destination = to.name || "Home";
    triggerLeaveModal.value++;
    next(false)
  }
})

function returnToHome() {
  router.push({ name: 'Home' })
}

function finishGame() {
  router.push({ name: 'Score' })
}

function leaveConfirm() {
  leaveConfirmed.value = true;
  router.push({ name: destination })
}

function resetRewardModal() {
  triggerRewardModal.value = false;
}

</script>
<template>
  <div class="container pt-5 ps-0 pe-0">
    <div class="row">
      <GameActions v-if="!isLoading" :playerLife="currentPlayerLife" :maxPlayerLife="MAX_LIFE_POINT" :playerExperience="PLAYER_BASE_EXPERIENCE" :ennemyLife="currentEnnemyLife" :maxEnnemyLife="ennemiesRef[currentMission-1].ship.vitality" :ennemyExperience="ennemiesRef[currentMission-1].experience" :currentPlayerCG="currentPlayerCG" @updateLife="handleUpdateLife" @updateFinishMission="nextMission" @updateFinishMissionAndRepair="handleFinishMissionAndRepair" />
      <GameMission v-if="!isLoading" :currentMission="currentMission" />
      <GamePlayer v-if="!isLoading" :playerName="props.name" :playerShip="selectedShip!.name"  :playerLife="currentPlayerLife" :maxPlayerLife="MAX_LIFE_POINT" :playerExperience="PLAYER_BASE_EXPERIENCE" :currentPlayerCG="currentPlayerCG" />
      <GameEnemy v-if="!isLoading" :ennemyName="ennemiesRef[currentMission-1].name" :ennemyShip="ennemiesRef[currentMission-1].ship.name" :ennemyLife="currentEnnemyLife" :maxEnnemyLife="ennemiesRef[currentMission-1].ship.vitality" :ennemyExperience="ennemiesRef[currentMission-1].experience" :ennemyCG="ennemiesRef[currentMission-1].credit" />
    </div>

    <!--Modal de fin partie (mort)-->
    <DeathModal
      @onDeathConfirmed="returnToHome"
      :trigger="triggerDeathModal"
      title="Partie terminée"
      body="Vous avez péri lors d'un combat. Retour au menu principal."
      dismissButton="Accueil"
    />
    <!--Modal de victoire (mission)-->
    <RewardModal
      @onRewardConfirmed="resetRewardModal"
      :trigger="triggerRewardModal"
      title="Ennemi vaincu"
      body1="Vous avez gagnez le combat. Vous remportez "
      :credits="ennemyCG"
      body2=" crédits"
      dismissButton="Prochain combat"
    />
    <!--Modal de victoire (partie)-->
    <WinModal
      @onWinConfirmed="finishGame"
      :trigger="triggerWinModal"
      title="Victoire !"
      body1="Vous avez complété 5 mission. Vous terminez avec "
      :credits=currentPlayerCG
      body2=" crédits."
      dismissButton="Voir le classement"
    />
    <!--Modal d'abandon de donnée-->
    <LeaveModal
      @onLeaveConfirmed="leaveConfirm"
      :trigger="triggerLeaveModal"
      title="Attention"
      body="Vous êtes sur le point de quitter le jeu. Vos données seront perdues."
      confirmButton="Quitter"
      cancelButton="Annuler"
    />
    <Loading :active="isLoading" />
  </div>
</template>