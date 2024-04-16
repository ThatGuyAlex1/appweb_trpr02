<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { useRouter, onBeforeRouteLeave  } from 'vue-router'
import ConfirmModal from '../components/ConfirmModal.vue'
import type Ship from '../scripts/ship'
import GameActions from '../components/GameActions.vue'
import GameMission from '../components/GameMission.vue'
import GamePlayer from '../components/GamePlayer.vue'
import GameEnemy from '../components/GameEnemy.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const props = defineProps({
  name: String,
  selectedShip: String
})

//aidé de chatGPT
const selectedShip = computed(() => {
  const shipData = props.selectedShip;
  return shipData ? JSON.parse(shipData) as Ship : null;
})

const router = useRouter()
</script>
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