<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { useRouter, onBeforeRouteLeave  } from 'vue-router'
import ConfirmModal from '../components/ConfirmModal.vue'
import type Ship from '../scripts/ship'

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
    <h1 class="title">Ship Details</h1>
    <p>{{ name }}</p>
    <div v-if="selectedShip">
      <p><strong>Name:</strong> {{ selectedShip.name }}</p>
      <p><strong>ID:</strong> {{ selectedShip.id }}</p>
      <!-- Add more properties as needed -->
    </div>
    <div v-else>
      <p>No ship selected. Go back to home to select a ship</p>
    </div>
  </div>
  </template>